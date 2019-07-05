<template lang="pug">
div(id="app")
  v-app
    v-toolbar(app dark)
      v-toolbar-title Black book
      v-spacer
      v-btn(icon nuxt href="/")
        v-icon home
    v-content
      v-container(fluid)
        nuxt
</template>
