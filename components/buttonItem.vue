<template lang="pug">
  nuxt-link(:to="to", :event="(disabled || loading)? '' : 'click'", v-if="to !== null")
    .btn-wrapper
      .spinner(v-if="loading")
        spinner
      slot(v-else)
  a(v-else, @click="!(disabled || loading)? $emit('click') : ''")
    .btn-wrapper
      .spinner(v-if="loading")
        spinner
      slot(v-else)
</template>

<script>
import Spinner from './spinner'

export default {
  name: 'buttonItem',
  components: { Spinner },
  props: {
    to: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<style scoped lang="scss">
  @import '~/assets/css/constants.scss';

  .spinner {
    height: 14px;
    width: 14px;
  }
  a, a:hover {
    color: white !important;
    text-decoration: none;
    cursor: pointer;

    .btn-wrapper {
      position: relative;
      padding: 0 10px;
      height: 100%;
      border-radius: 4px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $main-color-3;
      font-family: Montserrat,sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 18px;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
</style>
