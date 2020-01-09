<template lang="pug">
div(id="app")
  v-app
    v-toolbar(app dark)
      v-toolbar-title Black book
      v-spacer
      v-toolbar-items
        v-btn(icon nuxt @click="logout" v-if="$auth.loggedIn")
          v-icon exit_to_app
        v-btn(icon nuxt href="/")
          v-icon home
    v-content
      v-container(fluid)
        nuxt
</template>
<script>
export default {
    methods: {
      logout() {
        this.$auth.logout()
        window.location = '/'
      }
    }
}
</script>
