<template lang="pug">
  div#main
    #top(ref="top")
      navbar(v-model="sidebarEnabled")
    .container#main-container(:style="mainContainerStyle")
      // sidebar(:hiddenInMobile="!sidebarEnabled")
      #main-block
        #main-block-content
          //breadcrumbs
          nuxt
    //the-bet-modal
    //no-ssr
      notifications(group="simple-notification", position="bottom right")
</template>

<script>
import Navbar from '~/components/layouts/navbar'
// import Sidebar from '~/components/layouts/sidebar'

export default {
  name: 'Viewport',
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
        // { name: 'og:url', content: process.env.baseUrl + this.$route.fullPath },
        // { name: 'og:image', content: process.env.baseUrl + '/logo_180.png' }
      ]
    }
  },
  data () {
    return {
      sidebarEnabled: false,
      headerHeight: 150
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  updated () {
    this.handleResize()
  },
  computed: {
    mainContainerStyle: function () {
      return { 'padding-top': 15 + this.headerHeight + 'px !important' }
    }
  },
  components: {
    'navbar': Navbar,
    // 'sidebar': Sidebar
  },
  methods: {
    handleResize: function () {
      this.headerHeight = this.$refs.top.clientHeight
    }
  },
  watch: {
    $route (to, from) {
      this.sidebarEnabled = false
    }
  }
}
</script>

<style lang="scss">
  //noinspection CssUnknownTarget
  @import '~/assets/css/constants.scss';

  #main {
    background-color: $background-color;
    color: white;
    font-family: "Open Sans", sans-serif;
    min-height: 100vh;
  }

  #top {
    position: fixed;
    width: 100%;
    z-index: 30;
  }

  #main-container {
    padding-top: 50px;
    position: relative;
    @media (max-width: $displaySizeSmall) {
      padding: 10px 10px 10px;
    }
  }

  #main-block {
    display: block;
    padding-left: 260px;
    overflow: auto;
    @media (max-width: $displaySizeSmall) {
      padding-left: 0;
    }

    #main-block-content {
      overflow-x: hidden;
      width: 100%;
      height: 100%;
    }
  }
</style>
