<template lang="pug">
  .help-modal(v-if="visible")
    img.help-modal__logo(src="/images/main-logo.svg")
    .help-modal__body
      div
        .help-modal__body__row
          div
            img(src="/images/help-icon-1.svg")
          div Прилетайте и улетайте из персонального аэровокзала «Домодедово» с максимальным комфортом и удобством
        .help-modal__body__row
          div
            img(src="/images/help-icon-2.svg")
          div Проходите таможенное оформление без лишней головной боли
        .help-modal__body__row
          div
            img(src="/images/help-icon-3.svg")
          div Воспользуйтесь персональным автомобилем до вашего самолёта
      button-item.help-modal__body__close-button(@click="close")
        img(src="/images/close-icon.svg")
        | ЗАКРЫТЬ
</template>

<script>
import ButtonItem from './buttonItem'
export default {
  name: 'help-modal',
  props: ['visible'],
  model: {
    prop: 'visible',
    event: 'close'
  },
  components: { ButtonItem },
  methods: {
    close: function () {
      this.$emit('close', false)
    }
  }
}

</script>

<style lang="scss">
  @import "~/assets/css/constants.scss";
  .help-modal {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: $main-color-1;

    &__logo {
      position: absolute;
      width: 189px;
      height: 142px;
      left: calc(50% - 189px / 2);
      top: 50px;
    }

    &__body {
      height: 100%;
      background-color: $main-color-1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 235px 31px 23px;

      &__row {
        margin-top: 16px;

        :first-child {
          min-width: 77px;
        }

        :last-child {
          font-family: Montserrat, sans-serif;
          font-style: normal;
          font-weight: 300;
          font-size: 16px;
          line-height: 22px;
        }

        img {
          margin-top: 10px;
          width: auto;
          min-width: auto !important;
        }

        display: flex;
        justify-content: left;
      }
      &__close-button {
        height: 46px;
        padding-left: 26px;
        padding-right: 26px;
        margin-top: 15px;

        .btn-wrapper {
          font-size: 14px !important;
          height: 46px !important;
          color: $main-color-3;
          background-color: transparent !important;

          img {
            margin-right: 14px;
          }
        }
      }

    }
  }

</style>
