<template lang="pug">
  .page-4
    .walls
      .wall.wall-1
        .wall-1__title ЗАБРОНИРОВАТЬ VIP
        span.wall-1__step.bordered ШАГ 1
        span.wall-1__step.active ШАГ 2
      .vall
        ul.nav.nav-tabs
          li.nav-item(:class="{ 'active': type===1 }", @click="setType(1)") ЧАСТНОЕ ЛИЦО
          li.nav-item(:class="{ 'active': type===2 }", @click="setType(2)")  ЮРИДИЧЕСКОЕ ЛИЦО
      .wall.wall-2
        fiz-payer(:data="fizik", v-if="type===1")
        ur-payer(:data="urik", v-if="type===2", ref="urik")
      .wall.wall-3
        .wall-3__calc {{Number(price).toLocaleString('ru')}} &#8381;
        .wall-3__next-button
          button-item(@click="next", :loading="loading")
            | ОПЛАТИТЬ
      multi-lang-router-link(to="/rules")
        .rules Правила использования
</template>

<script>
import ButtonItem from '~/components/buttonItem'
import FizPayer from '../../../components/fizPayer'
import MultiLangRouterLink from '~/components/multiLangRouterLink'
import Passenger from '~/components/passenger'
import UrPayer from '../../../components/urPayer'

export default {
  components: {
    UrPayer,
    FizPayer,
    MultiLangRouterLink,
    Passenger,
    ButtonItem
  },
  head () {
    return {
      title: 'Данные о плательщике'
    }
  },
  name: 'guid',
  async asyncData (params) {
    let course = null
    let passengers = [{}]
    let guid = params.params.guid
    let price = 0
    await params.$axios.get('dollar_course', {})
      .then(function (response) {
        course = response.data.value.replace(',', '.')
      })

    let fizik = {}
    let urik = {}
    let type = 1
    await params.$axios.get('orders/' + guid, {})
      .then(function (response) {
        let order = response.data.order
        fizik = {
          first_name: order.first_name,
          last_name: order.last_name,
          middle_name: order.middle_name,
          email: order.email,
          phone: order.phone
        }
        urik = {
          first_name: order.first_name,
          last_name: order.last_name,
          middle_name: order.middle_name,
          email: order.email,
          phone: order.phone,
          inn: order.inn,
          kpp: order.kpp,
          bic: order.bic,
          urName: order.ur_name,
          account: order.account,
          corrAccount: order.corr_account
        }
        type = order.payer_type
        if (passengers.length === 0) {
          passengers = [{}]
        }
        price = response.data.price
      })

    return {
      passengers: passengers,
      order: {},
      loading: false,
      dollar_course: course,
      guid: guid,
      fizik: fizik,
      urik: urik,
      type: type || 1,
      price: price
    }
  },
  methods: {
    setType: function (type) {
      this.type = type
    },
    next: function () {
      this.$refs.urik.check()
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.updateOrder()
        } else {
          let firstError = document.getElementsByClassName('is-invalid')[0]
          firstError.focus()
          window.scrollTo(0, 70)
        }
      })
    },
    updateOrder: function () {
      let that = this
      let count = 0
      let passengerParams = []
      this.passengers.forEach(it => {
        passengerParams.push({ [count]: it })
        count++
      })

      let params = {}
      if (this.type === 1) {
        params = {
          payer_type: this.type,
          first_name: this.fizik.first_name,
          last_name: this.fizik.last_name,
          middle_name: this.fizik.middle_name,
          email: this.fizik.email,
          phone: this.fizik.phone
        }
      }

      if (this.type === 2) {
        params = {
          payer_type: this.type,
          first_name: this.urik.first_name,
          last_name: this.urik.last_name,
          middle_name: this.urik.middle_name,
          email: this.urik.email,
          phone: this.urik.phone,
          inn: this.urik.inn,
          kpp: this.urik.kpp,
          bic: this.urik.bic,
          ur_name: this.urik.urName,
          account: this.urik.account,
          corr_account: this.urik.corrAccount
        }
      }

      this.$axios.put('orders/' + this.guid, { order: params }, {
        before: this.loading = true
      })
        .then(function (response) {
          that.order = response.data
          that.successPushOrder(that.order)
        })
        .catch(function (response) {
          console.error(response)
        }).finally(() => {
          this.loading = false
        })
    },
    successPushOrder: function (order) {
      this.$router.push({
        path: '/new_payment',
        query: {
          type: 'fizik',
          first_name: order.first_name,
          last_name: order.last_name,
          middle_name: order.middle_name,
          phone: order.phone,
          email: order.email,
          flight_number: order.flight_number,
          flight_date: order.flight_date,
          flight_from: order.flight_from,
          flight_to: order.flight_to,
          flight: order.flight,
          guid: order.guid,
          order_id: order.id,
          price: this.price
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "~/assets/css/constants.scss";

  .page-4 {
    ul {
      display: flex;
    }
    ul.nav li {
      &:first-child {
        margin-right: 2px;
      }
      flex-grow: 1;
      padding: 12px 10px;
      background-color: #E0E0E0;
      font-size: 12px;
      color: black;
      font-weight: bold;
      text-align: center;
      height: 40px;
      margin-top: 5px;
      &.active {
        margin-top: 0;
        height: 45px;
        background-color: white;
      }
      .nav-link {
        border: 0 !important;
      }
      border-radius: 5px 5px 0 0;

    }
    .walls {
      min-height: calc(100vh - 60px);
      display: flex;
      flex-direction: column;
    }
    .wall.yellow {
      background-color: #fbbc0b;
      &.register {
        .nav-link.active {
          background-color: #fff7e0;
        }

        form {
          background-color: #fff7e0;
          padding: 20px;

          label.d-block {
            font-size: 12px !important;
            color: #7f828b !important;
          }
        }
      }
    }

    .wall.wall-1 {
      margin-bottom: 10px;
      background: $main-color-3;
      height: 83px;
      color: white;
      text-align: center;
      padding: 5px;
      .wall-1__title {
        font-weight: 700;
        font-size: 20px;
        line-height: 38px;
        padding-top: 5px;
      }
      .wall-1__step {
        color: #FFDF86;
        padding: 0 10px;
        font-size: 14px;
        line-height: 17px;
        font-weight: bold;
        &.active {
          color: white;
        }
        &.bordered {
          border-right: 1px solid white;
        }
      }
    }

    .walls {
      .wall-3 {
        padding: 15px;
        border-bottom: 0 !important;
        &__calc {
          text-align: center;
          color: black !important;
          font-size: 50px;
          line-height: 60px;
          font-weight: bold;
        }
        &__next-button {
          margin-top: 5px;
          height: 46px;
        }
      }

      .wall-2 {
        border-radius: 0 0 4px 4px;
        flex-grow: 1;
        justify-content: space-between;
        flex-direction: column;
        padding: 24px 16px 16px;
        &__add-passenger-buttom {
          height: 46px;
          margin-top: 15px;
          .btn-wrapper {
            color: $main-color-3;
            background-color: transparent !important;
            border: 2px solid $main-color-3 !important;
            img {
              margin-right: 14px;
            }
          }
        }
        &__remove-passenger-buttom {
          height: 46px;
          margin-top: 15px;
          .btn-wrapper {
            color: #BF0000;
            background-color: transparent !important;
            border: 2px solid #BF0000 !important;
            img {
              margin-right: 14px;
            }
          }
        }
      }
    }

    .rules {
      line-height: 38px;
      text-align: center;
      font-size: 12px;
      color: $main-color-3;
    }
  }

</style>
