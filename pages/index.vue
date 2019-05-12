<template lang="pug">
  .page
    help-modal(v-model="helpVisible")
    img.page__logo(src="/images/main-logo.png")
    .page__title
      | VIP терминал аэропорта
      strong «Домодедово»
    .page__search(:class="{'page__search__error': notFound}")
      vue-bootstrap-typeahead(v-model="searchString", :data="flightList", placeholder="№ рейса", ref="typeahead")
      .page__search__errortext
        | рейс не найден
    .page__button
      button-item(:to="'/search/?flight=' + searchString", :disabled="notFound || searchString.length === 0") поиск
    .page__help
      .page__help__arrow
      .page__help__text
        | Введите
        br
        | номер вашего рейса,
        br
        | чтобы начать бронирование
    .page__help-button
      button-item(@click="visibleHelpBtn")
        img(src="/images/question-icon.png")
        | Справка

</template>

<script>
import ButtonItem from '../components/buttonItem'
import HelpModal from '../components/helpModal'
import Spinner from '../components/spinner'

export default {
  layout: 'home',
  head () {
    return {
      title: 'Главная'
    }
  },
  asyncData: function () {
    return {
      searchString: '',
      flight: null,
      flightList: [],
      loading: false,
      notFound: false,
      helpVisible: false
    }
  },
  components: {
    HelpModal,
    Spinner,
    ButtonItem
  },
  methods: {
    visibleHelpBtn: function () {
      this.helpVisible = true
    }
  },
  watch: {
    searchString: function (newVal) {
      newVal = newVal.split(' ').join('')
      if (newVal.length <= 1) {
        this.notFound = true
        return
      }
      this.$refs.typeahead.inputValue = newVal
      let that = this
      let uri = 'filter/' + newVal
      this.$axios.get(uri, {}, {
        before: this.loading = true
      })
        .then(function (response) {
          let data = response.data

          that.flightList = data.map((it) => {
            if (it.flight && it.flight.iataNumber) {
              return it.flight.iataNumber
            }
          })
          that.notFound = !that.flightList.includes(newVal)
        })
        .catch(function (error) {
          console.error(error)
          that.flightList = []
        }).finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
  @import "~/assets/css/constants.scss";
  .page {
    overflow-x: hidden;
    min-height: 620px;
    position: absolute;
    height: 100vh;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    backdrop-filter: blur(10px);
    background: rgba(15, 22, 41, 0.71) url("/images/main-background.png") no-repeat center;
    background-size: cover;

    &__logo {
      position: absolute;
      width: 189px;
      height: 142px;
      left: calc(50% - 189px / 2);
      top: 50px;
    }

    &__title {
      position: absolute;
      width: 275px;
      height: 90px;
      left: calc(50% - 275px / 2);
      top: 234px;
      font-style: normal;
      font-size: 18px;
      line-height: 27px;
      text-align: center;
      color: #FFFFFF;
      font-weight: 300;

      strong {
        display: block;
        font-weight: 500;
      }
    }

    &__button {
      position: absolute;
      top: 378px;
      height: 46px;
      left: 26px;
      right: 26px;
      .btn-wrapper {
        border-radius: 3px;
        font-size: 16px;
        padding-bottom: 2px;
      }
    }

    &__help {
      &__arrow {
        position: absolute;
        width: 50px;
        height: 50px;
        left: 65px;
        top: 440px;
        background: url("/images/arrow.png");
      }
      &__text {
        position: absolute;
        width: 210px;
        height: 90px;
        top: 463px;
        font-family: Montserrat, sans-serif;
        font-style: italic;
        font-size: 14px;
        line-height: 18px;
        left: 130px;
        font-weight: 300;
      }
    }

    &__search {
      position: absolute;
      height: 46px;
      left: 26px;
      right: 26px;
      top: 320px;

      &__errortext {
        display: none;
      }
      .list-group {
        max-height: 200px;
        border-radius: 0;
      }

      input[type=search] {
        border: 1px solid #FFFFFF;
        box-sizing: border-box;
        border-radius: 0 !important;
        font-family: Arial, sans-serif;
        font-size: 20px;
        background: transparent;
        color: white;
        &:focus {
          box-shadow: none !important;
        }

        &::placeholder {
          color: white;
        }
      }
    }

    &__search__error {
      border: 1px solid $main-color-4;
      input[type=search] {
        border: 1px solid $main-color-4 !important;
      }
      &__errortext {
        display: block;
        position: absolute;
        bottom: 15px;
        right: 10px;
        color: $main-color-4;
        font-family: Montserrat, sans-serif;
        font-size: 11px;
      }
    }

    &__help-button {
      bottom: 23px;
      height: 46px;
      position: absolute;
      left: 26px;
      right: 26px;
      .btn-wrapper {
        color: $main-color-3;
        background-color: transparent !important;
        border: 2px solid $main-color-3 !important;
        img {
          margin-right: 14px;
        }
      }
    }

    &__loading {
      z-index: 9999;
      top: 9px;
      right: 35px;
      position: absolute;

      .lds-ring div {
        border-color: #e0a80a transparent transparent transparent;
      }
    }
  }
</style>
