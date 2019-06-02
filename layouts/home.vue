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
        { hid: 'description', property: 'description', content: this.$t('description') },
        { property: 'og:locale', content: this.$i18n.locale },
        { property: 'og:type', content: 'article' },
        { property: 'og:description', content: this.$t('description') },
        { property: 'og:site_name', content: this.$t('siteName') },
        { property: 'og:url', content: process.env.baseUrl + this.$route.fullPath },
        { property: 'og:image', content: process.env.baseUrl + '/images/537.png' }
      ]
    }
  }
}
</script>
