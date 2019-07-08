<template lang="pug">
v-layout
  v-flex(xs12 sm8 md10)
    v-toolbar(flat color="white")
      v-toolbar-title Deposits
      v-divider(class="mx-2" inset vertical)
      v-spacer

      v-dialog(v-model="dialog" max-width="500px")
        template(v-slot:activator="{ on }")
          v-btn(color="primary" dark class="mb-2" v-on="on") New Deposit

        v-card
          v-card-title
            span(class="headline") {{ formTitle }}
          v-card-text
            v-container(grid-list-md)
              v-layout(wrap)
                v-flex(xs12 sm6 md4)
                  v-text-field(v-model="editedDeposit.bank" label="Bank name")
                v-flex(xs12 sm6 md4)
                  v-text-field(v-model="editedDeposit.amount" label="Amount")
                v-flex(xs12 sm6 md4)
                  v-text-field(v-model="editedDeposit.percent" label="Percent")
                v-flex(xs12 sm6 md4)
                  date-select(v-model="editedDeposit.date_start" label="Date start")
                v-flex(xs12 sm6 md4)
                  date-select(v-model="editedDeposit.date_end" label="Date end")
          v-card-actions
            v-spacer
            v-btn(color="blue darken-1" flat @click="close") Cancel
            v-btn(color="blue darken-1" flat @click="save") Save
            
    v-data-table(:headers="headers" :items="deposits" class="elevation-1")
      template(v-slot:items="props")
        td {{ props.item.bank }}
        td(class="text-xs-right") {{ props.item.amount }}
        td(class="text-xs-right") {{ props.item.percent }}
        td(class="text-xs-right") {{ props.item.date_start }}
        td(class="text-xs-right") {{ props.item.date_end }}
        td(class="justify-center layout px-0")
          v-icon(small class="mr-2" @click="editDeposit(props.item)") edit
          v-icon(small @click="deleteDeposit(props.item)") delete

</template>
<script>
import DateSelect from '~/components/DateSelect.vue';

export default {
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: 'Bank name',
          align: 'left',
          value: 'bank'
        },
        { text: 'Amount', value: 'amount' },
        { text: 'Percent', value: 'percent' },
        { text: 'Date start', value: 'date_start' },
        { text: 'Date end', value: 'date_end' },
        { text: 'Actions', value: 'id', sortable: false }
      ],

      deposits: [],
      editedIndex: -1,
      editedDeposit: { bank: '', amount: 0, percent: 0.0, date_start: '', date_end: '' },
      defaultDeposit: { bank: '', amount: 0, percent: 0.0, date_start: '', date_end: '' },
      menuDateStart: false,
      dateStartFormatted: '2019-09-01'
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex == -1 ? 'New Deposit' : 'Edit Deposit'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  components: {
    'date-select': DateSelect
  },
  methods: {
    async loadDeposits() {
      /*this.deposits = [
      {
        bank: 'Tink',
        date_start: '2019-09-01',
        date_end: '2019-09-02',
        amount: 1000,
        percent: 6.9
      },
      {
        bank: 'Pochta',
        date_start: '2019-06-01',
        date_end: '2019-06-02',
        amount: 200,
        percent: 7.3
      }]*/
      this.deposits = await this.$axios.$get('/deposits')
    },

    editDeposit(deposit) {
      this.editedIndex = this.deposits.indexOf(deposit)
      this.editedDeposit = Object.assign({}, deposit)
      this.dialog = true
    },

    deleteDeposit(deposit) {
      confirm('Are you sure want to delete this item?') && this.destroyDeposit(deposit)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedDeposit = Object.assign({}, this.defaultDeposit)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        this.updateDeposit(this.editedDeposit)
      }
      else {
        this.createDeposit(this.editedDeposit)
      }
      this.close()
    },

    async createDeposit(deposit) {
      const newDeposit = await this.$axios.$post('/deposits', deposit)
      this.deposits.push(newDeposit)
    },

    async updateDeposit(deposit) {
      const newDeposit = await this.$axios.$patch(`/deposits/${deposit.id}`, deposit)
      Object.assign(this.deposits[this.editedIndex], newDeposit)
    },

    async destroyDeposit(deposit) {
      await this.$axios.$delete(`/deposits/${deposit.id}`)
      const index = this.deposits.indexOf(deposit)
      this.deposits.splice(index, 1)
    }
  },
  mounted() {
    this.loadDeposits()
  }
}
</script>
