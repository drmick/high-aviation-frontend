<template lang="pug">
  div
    template(v-for="item in items")
      //.list-group-item(:class="[{'active': isActive(parentItem + '/' + item.name)}]")
          multi-lang-router-link.no-text-link(@click.native="select('/' + item.name)",
          //:to="prefix+ '/' + item.name", itemprop="url") {{item.content.translates[locale].label}}

</template>

<script>

export default {
  name: 'sidebar-item',
  props: {
    items: {
      type: Array,
      required: true
    },
    parentItem: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 1
    },
    activeItem: {
      type: String,
      required: true
    },
    locale: {
      type: String,
      required: true
    },
    prefix: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      opened: true,
      openedAlways: true
    }
  },
  methods: {
    isOpen: function (path) {
      return this.openedAlways || (this.opened && this.activeItem.startsWith(path)) || this.level === 1
    },
    select: function (itemName, level) {
      if (this.activeItem === itemName && level === 2) {
        this.opened = !this.opened
      }
    },
    isActive: function (path) {
      return this.activeItem === path
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~/assets/css/constants.scss";

  .list-group-item {
    color: #ccc;
    border: 0;
    border-radius: 0;
    white-space: nowrap;
    text-align: left;
    font-family: 'Roboto', sans-serif;
    padding: 8px 0;
    margin-bottom: 0;
    border-radius: 0 !important;

    &.active.level-2, &.active.level-3 {
      background-color: $main-color-2 !important;

      .text, .line-1, .line-2 {
        color: white !important;
      }
    }

    .list-group-container {
      display: flex;

      .image {
        text-align: center;
        flex: 0 0 42px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        img {
          max-height: 24px;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        line-height: 1em;
        justify-content: center;
        white-space: normal;
      }
    }

    &.level-1 {
      border-top: 1px solid $background-color-elements;
      text-transform: uppercase;
      background-color: transparent;
      color: $main-color-1;
      font-size: 14px;
      font-weight: bold;
      line-height: 26px;

      a:hover {
        color: $main-color-2 !important;
      }

      a:visited, a {
        color: $main-color-1;
      }

      &.active {
        a {
          color: $main-color-2 !important;
        }
      }

      @media (max-width: $displaySizeSmall) {
        padding-left: 10px;
      }
    }

    &.level-2 {
      background-color: $main-color-1;
      text-transform: uppercase !important;

      a:hover, a:visited, a {
        color: white;
      }

      font-size: 14px;
      font-weight: 400;

      .list-group-container {
        &::after {
          position: absolute;
          right: 10px;
          top: 10px;
          content: ">";
        }

        &[aria-expanded="true"] {
          &::after {
            transform: rotate(90deg);
          }
        }

        .text {
          line-height: 26px;
        }
      }
    }

    &.level-3 {
      background-color: white;
      border-bottom: 1px solid silver;

      .list-group-container {
        .text {
          font-family: 'Open Sans', sans-serif;
          font-size: 12px;
          line-height: 13px;

          .line-1 {
            color: black;
            font-weight: 600;
            padding: 1px 0;
          }

          .line-2 {
            color: silver;
          }
        }
      }
    }
  }

  .collapse.show {
    visibility: visible;
  }
</style>
