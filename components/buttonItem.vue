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
      font-family: 'Open Sans', sans-serif;
      font-weight: 400;
      height: 100%;
      border-radius: 4px;
      text-align: center;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f4cc66+0,f8ba0b+100 */
      background: rgb(244, 204, 102); /* Old browsers */
      background: -moz-linear-gradient(top, rgba(244, 204, 102, 1) 0%, rgb(214, 160, 9) 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top, rgba(244, 204, 102, 1) 0%, rgb(214, 160, 9) 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom, rgba(244, 204, 102, 1) 0%, rgb(214, 160, 9) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f4cc66', endColorstr='#f8ba0b', GradientType=0); /* IE6-9 */
    }
  }
</style>
