<template lang="pug">
  aside(:class="{ 'hidden-in-mobile': hiddenInMobile }")
    //.list-group(itemscope="", itemtype="http://www.schema.org/SiteNavigationElement")
      meta(itemprop="name", :content="$t('categories')")
      sidebar-item(:items="tags", :activeItem="activeTag", @select="select", :locale="locale")
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from '~/components/sidebarItem'

export default {
  props: {
    hiddenInMobile: {
      type: Boolean,
      required: true
    }
  },
  components: { SidebarItem },
  created () {
    // let tagPath = ''
    // if (this.$route.params.level_1) {
    //   tagPath += '/' + this.$route.params.level_1
    // }
    // if (this.$route.params.level_2) {
    //   tagPath += '/' + this.$route.params.level_2
    // }
    // if (this.$route.params.level_3) {
    //   tagPath += '/' + this.$route.params.level_3
    // }
    // this.select(tagPath)
  },
  computed: {
    locale: function () {
      return this.$i18n.locale
    },
    ...mapGetters(
      {
        tags: 'tag/getTags',
        activeTag: 'tag/getActiveTag'
      }
    ),
    routes () {
      return this.$router.options.routes
    }
  },
  methods: {
    select: function (tag) {
      // this.$store.dispatch('tag/setActiveTag', tag)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '~/assets/css/constants.scss';

  aside {
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
      width: 100%;
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
    }
  }

  #sidebar i {
    margin-right: 6px;
  }
</style>
