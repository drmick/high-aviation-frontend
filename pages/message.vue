<template lang="pug">
  .walls
    .wall
      .wall__content
        .wall__content__title {{message}}
</template>

<script>
export default {
  head () {
    return {
      title: 'Уведомление'
    }
  },
  name: 'message',
  async asyncData (params) {
    return { message: params.query.message }
  }
}
</script>

<style lang="scss">
  .wall {
    &__content {
      padding: 20px 0;

      &__title {
        color: #e0a80a;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        text-transform: uppercase;
      }
    }
  }
</style>
