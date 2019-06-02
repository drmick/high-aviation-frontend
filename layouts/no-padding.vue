<template lang="pug">
  div#main
    #top(ref="top")
      navbar(v-model="sidebarEnabled")
    .container#main-container
      sidebar(:hiddenInMobile="!sidebarEnabled")
      #main-block
        #main-block-content
          nuxt
</template>

<script>
import Navbar from '~/components/layouts/navbar'
import Sidebar from '../components/layouts/sidebar'

export default {
  name: 'no-padding',
  data: function () {
    return {
      sidebarEnabled: false
    }
  },
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
        { name: 'og:site_name', content: this.$t('siteName') },
        { name: 'og:url', content: process.env.baseUrl + this.$route.fullPath },
        { name: 'og:image', content: process.env.baseUrl + '/images/537.png' } ]
    }
  },
  components: {
    Sidebar,
    'navbar': Navbar
  },
  watch: {
    $route (to, from) {
      this.sidebarEnabled = false
    }
  }
}
</script>

<style scoped lang="scss">
  //noinspection CssUnknownTarget
  @import '~/assets/css/constants.scss';

  #main {
    background-color: $background-color;
    color: white;
    font-family: "Montserrat", sans-serif;
    min-height: 100vh;
  }

  #top {
    position: fixed;
    width: 100%;
    z-index: 30;
  }

  #main-container {
    overflow-x: hidden;
    position: relative;
    padding: 60px 0 20px 0;
  }

</style>
