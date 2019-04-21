<template lang="pug">
  .walls
    .wall
      .wall__content
        .wall__content__title Ошибка проведения платежа!
</template>

<script>
export default {
  head () {
    return {
      title: 'Ошибка оплаты'
    }
  },

  async asyncData (params) {
    let guid = params.query.Shp_guid
    await params.$axios.put('orders/' + guid, { order: { status: 'fail' } }, {
    })
      .then(function (response) {
      })
      .catch(function (response) {
      })
  },
  name: 'fail'
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
