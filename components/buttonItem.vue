<template lang="pug">
  nuxt-link(:to="to", :event="disabled ? '' : 'click'")
    .btn-wrapper
      slot
</template>

<script>
export default {
  props: ['to', 'disabled'],
  name: 'buttonItem'
}
</script>

<style scoped lang="scss">
  a, a:hover {
    color: white !important;
    text-decoration: none;

    .btn-wrapper {
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
  }
</style>
