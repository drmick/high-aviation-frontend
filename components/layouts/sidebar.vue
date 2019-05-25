<template lang="pug">
  aside(:class="{ 'hidden-in-mobile': hiddenInMobile }")
    .list-group(itemscope="", itemtype="http://www.schema.org/SiteNavigationElement")
      sidebar-item(url="/", label="Главная")
      sidebar-item(url="/rules", label="О клубе")
      sidebar-item(url="/history", label="История бронирования", v-if="loggedIn")
</template>

<script>
import SidebarItem from '~/components/sidebarItem'

export default {
  props: {
    hiddenInMobile: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    loggedIn: function () {
      return this.$auth.loggedIn
    }
  },
  components: { SidebarItem }
}
</script>

<style scoped lang="scss">
  @import '~/assets/css/constants.scss';

  aside {
    padding-top: 30px;
    float: left;
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 0;
    }

    height: calc(100vh - 150px);
    width: 240px;
    min-width: 240px;
    position: fixed;

    ::-webkit-scrollbar {
      width: 3px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    @media (max-width: $displaySizeSmall) {
      padding: 10px;
      width: 90%;
      overflow-y: auto;
      position: fixed;
      left: 0;
      height: 100%;
      background-color: $background-color;
      z-index: 20;
      margin-top: -15px;
      &.hidden-in-mobile {
        display: none;
      }
      padding-top: 30px;
    }
  }

  #sidebar i {
    margin-right: 6px;
  }
</style>
