<template lang="pug">
v-menu(ref="menuDate" v-model="menuDate" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px")
  template(v-slot:activator="{ on }")
    v-text-field(v-model="dateFormatted" :label="label" persistent-hint prepend-icon="event" readonly v-on="on")
  v-date-picker(v-model="date" no-title @input="updateDate()")
</template>

<script>
export default {
  name: 'DateSelect',
  props: {
    label: String,
    value: String
  },

  data() {
    return {
      date: this.value, 
      menuDate: false
    }
  },

  watch: {
    value(val) {
      this.date = val;
    }
  },

  computed: {
    dateFormatted() {
      return this.formatDate(this.date)
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },

    parseDate(date) {
      if (!date) return null

      const [day, month, year] = date.split('.')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

    updateDate() {
      this.menuDate = false
      this.$emit('input', this.date)
    }
  }
}
</script>
