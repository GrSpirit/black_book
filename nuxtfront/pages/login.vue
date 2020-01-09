<template lang="pug">
v-layout(row wrap align="center")
  v-flex
    v-card(v-if="$auth.loggedIn" max-width="500")
      v-alert(type="error" :value="error") {{error}}
      v-card-text Logged in as {{$auth.$state.user.email}}
      v-card-actions
        v-btn(@click="logout" default) Log out
    v-card(v-else max-width="500")
      v-alert(type="error" :value="error") {{error}}
      v-card-text
        v-form(id="login-form" @submit.prevent="login")
          v-text-field(v-model="email" label="Email")
          v-text-field(v-model="password" label="Password" type="password")
        v-card-actions
          v-btn(type="submit" form="login-form") Log in
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    login() {
      this.$auth.login({
        data: {
          user: {
            email: this.email,
            password: this.password
          }
        }
      }).catch(e => {this.error = e + ''})
    },
    logout() {
      this.$auth.logout().catch(e => {this.error = e + ''})
    }
  }
}
</script>
