<template lang="pug">
  div#main
    #top(ref="top")
      navbar(v-model="sidebarEnabled")
    .container#main-container
      sidebar(:hiddenInMobile="!sidebarEnabled")
      #main-block
        #main-block-content
          nuxt
    no-ssr
      notifications(group="simple-notification", position="bottom right")
</template>

<script>
import Navbar from '~/components/layouts/navbar'
import Sidebar from '../components/layouts/sidebar'

export default {
  name: 'default',
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
        { property: 'og:title', content: this.$t('title') },
        { property: 'og:site_name', content: this.$t('siteName') },
        { property: 'og:url', content: process.env.baseUrl + this.$route.fullPath },
        { property: 'og:image', content: process.env.baseUrl + '/images/240.png' }
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
  components: {
    Sidebar,
    'navbar': Navbar
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
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill, input.form-group:focus {
    background-color: #fff !important;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }
  //noinspection CssUnknownTarget
  @import '~/assets/css/constants.scss';

  input.form-control[disabled=disabled] {
    border-color: #E7E7E7;
    color: #CCCCCC;
    background-color: white;
  }

  input.form-control:focus {
    border-color: $main-color-3;
  }

  .form-group.disabled {
    label.d-block {
      color: #CCCCCC !important;
    }
  }

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
    padding: 60px 10px 0;
  }

  #main-block {
    display: block;
    padding-left: 260px;
    padding-right: 0;
    overflow: auto;
    @media (max-width: $displaySizeSmall) {
      padding-left: 0;
      padding-right: 0;
    }

    #main-block-content {
      overflow-x: hidden;
      width: 100%;
      height: 100%;
    }
  }

  .walls > {
    .wall {
      border-bottom: 1px dashed silver;
      background: white;
      border-radius: 5px;
      width: 100%;
      color: #151d2e;
      padding: 10px;
    }

    .wall:last-child {
      border-bottom: none;
    }
  }

  a.button {
    cursor: pointer;
    color: white !important;
    padding: 0 10px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    height: 100%;
    border-radius: 2px;
    text-align: center;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f4cc66+0,f8ba0b+100 */
    background: rgb(244, 204, 102); /* Old browsers */
    background: -moz-linear-gradient(top, rgba(244, 204, 102, 1) 0%, rgba(248, 186, 11, 1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(244, 204, 102, 1) 0%, rgba(248, 186, 11, 1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(244, 204, 102, 1) 0%, rgba(248, 186, 11, 1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f4cc66', endColorstr='#f8ba0b', GradientType=0); /* IE6-9 */
  }
</style>
