<template lang="pug">
  div#main
    .container
      nuxt
</template>

<script>

export default {
  name: 'home',
  head () {
    return {
      titleTemplate: '%s | ' + this.$t('siteName'),
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('description') },
        { name: 'og:locale', content: this.$i18n.locale },
        { name: 'og:type', content: 'article' },
        { name: 'og:description', content: this.$t('description') },
        { name: 'og:site_name', content: this.$t('siteName') }
      ]
    }
  }
}
</script>
