<template lang="pug">
  .list-group-item
    multi-lang-router-link.no-text-link(:to="url", itemprop="url") {{label}}
</template>

<script>

import MultiLangRouterLink from './multiLangRouterLink'

export default {
  components: { MultiLangRouterLink },
  name: 'sidebar-item',
  props: {
    url: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      opened: true,
      openedAlways: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~/assets/css/constants.scss";

  .list-group-item:first-child {
    border-top: 1px dashed #3e434e;
  }
  .list-group-item {
    a {
      color: white !important;
    }
    border: 0;
    border-radius: 0;
    white-space: nowrap;
    text-align: left;
    font-family: 'Montserrat', sans-serif;
    padding: 10px 15px;
    margin-bottom: 0;
    background-color: transparent;
    border-bottom: 1px dashed #3e434e;
    text-decoration: none;

  }

  .collapse.show {
    visibility: visible;
  }
</style>
