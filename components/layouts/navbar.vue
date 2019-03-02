<template lang="pug">
  nav.navbar.navbar-expand-lg
    .container
      span.navbar__logo
        multi-lang-router-link.navbar__logo__image(to="/")
          img(src='/logo.png', alt='Logo')
      span.navbar__burger(@click="burgerClick")
        div
        div.navbar__burger__middle
        div
      span.navbar__buttons
        //button-item Вход
</template>

<script>

import buttonItem from '../buttonItem'

export default {
  components: { buttonItem },
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    currentLocale: function () {
      return this.$i18n.locale
    },
    locales: function () {
      return this.$store.getters['app/getLocales']
    }
  },
  methods: {
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

<style scoped lang="scss">
  @import '~/assets/css/app.scss';

  $color-1: #bfceda;
  .navbar {
    height: 70px;
    z-index: 100;
    background-color: $main-color-1;
    width: 100%;

    @media (max-width: $displaySizeSmall) {
      height: 38px;
    }

    &__logo {
      &__image {
        display: inline-block;
      }

      &__burger {
        display: none;
        @media (max-width: $displaySizeSmall) {
          display: block;
        }
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px;

        div {
          width: 16px;
          height: 2px;
          background-color: white;
          margin: 3px 0;
          border-radius: 5px;

          &__middle {
            margin-left: 4px;
          }
        }
      }
    }
  }

</style>
