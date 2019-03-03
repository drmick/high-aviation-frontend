<template lang="pug">
  nuxt-link(:to="newPath+to")
    slot
</template>

<script>

export default {
  name: 'multi-lang-router-link',
  props: ['to'],
  computed: {
    newPath: function () {
      if (this.$i18n.locale !== 'ru') {
        return '/' + this.$i18n.locale
      }
      return ''
    }
  }
}
</script>

<style scoped>

</style>
