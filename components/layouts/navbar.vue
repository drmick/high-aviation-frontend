<template lang="pug">
  nav.navbar.navbar-expand-lg
    .container
      span.navbar__burger(@click="burgerClick")
        div
        div.navbar__burger__middle
        div
      span.navbar__logo
        multi-lang-router-link.navbar__logo__image(to="/")
          img(src='/images/logo.svg', alt='Logo')
      span.navbar__buttons
        button-item(to="/sign_in", v-if="(!loggedIn)") вход
        a.button(@click="logout", v-else) выход
</template>

<script>

import buttonItem from '../buttonItem'
import multiLangRouterLink from '../multiLangRouterLink'

export default {
  components: { buttonItem, multiLangRouterLink },
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    loggedIn: function () {
      return this.$auth.loggedIn
    },
    currentLocale: function () {
      return this.$i18n.locale
    },
    locales: function () {
      return this.$store.getters['app/getLocales']
    }
  },
  methods: {
    logout: function () {
      this.$auth.logout().then((result) => {
        // console.log(result)
      }
      )
    },
    changeLocale: function (event) {
      let locale = event.target.value
      this.$i18n.locale = locale
      this.$moment.locale(locale)
      this.$store.dispatch('app/setLocale', locale)
    },
    burgerClick: function () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/css/app.scss';

  $color-1: #bfceda;
  .navbar {
    .container {
      padding: 0;
      height: 100%;
      align-content: stretch;
      min-height: 0;
    }

    z-index: 100;
    background-color: $main-color-1;
    width: 100%;
    padding: 8px 10px;

    height: 60px;

    &__logo {
      flex-grow: 1;
      text-align: center;
      padding-left: 47px;

      &__image {
        display: inline-block;
      }
    }

    &__burger {
      display: none;
      @media (max-width: $displaySizeSmall) {
        display: block;
      }
      position: absolute;
      top: 0;
      left: 0;
      padding: 20px 20px 20px 13px;

      div {
        width: 18px;
        height: 2px;
        background-color: white;
        margin: 3px 0;
        border-radius: 5px;
      }

      /*&__middle {*/
        /*margin-left: 4px !important;*/
      /*}*/
    }

    &__buttons {
      height: 22px;
      font-size: 12px !important;

      a > .btn-wrapper {
        font-size: 12px !important;
        border-radius: 2px;
      }
    }
  }

</style>
