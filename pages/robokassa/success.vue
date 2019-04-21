<template lang="pug">
  .walls
    .wall
      .wall__content
        .wall__content__title Ожидание зачисления платежа
        .spn
          spinner-big
</template>

<script>
import md5 from 'md5'
import SpinnerBig from '../../components/spinner-big'
export default {
  components: { SpinnerBig },
  head () {
    return {
      title: 'Завершение оплаты'
    }
  },
  name: 'success',
  asyncData (params) {
    let orderId = params.query.inv_id
    let guid = params.query.Shp_guid
    let merchantLogin = 'HAC'
    let password2 = 'YFqK6OIbh1Ea080guVDn'
    let hash = md5(`${merchantLogin}:${orderId}:${password2}`)
    return { signature: hash, orderId: orderId, merchantLogin: merchantLogin, guid: guid }
  },

  mounted () {
    setTimeout(function () { this.successPayment() }.bind(this), 3000)
  },
  methods: {
    successPayment: function () {
      let that = this
      this.$axios.put('orders/' + this.guid, { order: { status: 'payed' } }, {
        before: this.loading = true
      })
        .then(function (response) {
          that.$router.push({
            path: '/message',
            query: { message: 'Оплата успешно завершена!' }
          })
        })
        .catch(function (response) {
          console.error(response)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .spn {
    margin-top: 30px;
    text-align: center;
  }

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
