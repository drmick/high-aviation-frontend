<template lang="pug">
  .page-3
    .walls
      .wall.wall-1
        .wall-1__title ЗАБРОНИРОВАТЬ VIP
        span.wall-1__step.active.bordered ШАГ 1
        span.wall-1__step ШАГ 2
      .wall.wall-2(v-for="(passenger, index) in activePassengers")
        passenger(:data="passenger", :key="index", :index="index")
        .wall-2__remove-passenger-buttom(v-if="activePassengers.length>1")
          button-item(@click="removePassenger(index)")
            img(src="/images/close-red.svg")
            | Удалить пассажира
        .wall-2__add-passenger-buttom(v-if="activePassengers.length === index + 1")
          button-item(@click="addPassenger")
            img(src="/images/new-passenger.svg")
            | Добавить пассажира
      .wall.wall-3
        .wall-3__calc {{Number(price).toLocaleString('ru')}} &#8381;
        .wall-3__next-button
          button-item(@click="next")
            | ПЕРЕЙТИ К ОПЛАТЕ
      multi-lang-router-link(to="/rules")
        .rules Правила использования
</template>

<script>
import ButtonItem from '../../components/buttonItem'
import MultiLangRouterLink from '../../components/multiLangRouterLink'
import Passenger from '../../components/passenger'

export default {
  components: {
    MultiLangRouterLink,
    Passenger,
    ButtonItem
  },
  head () {
    return {
      title: 'Бронирование'
    }
  },
  name: 'guid',
  async asyncData (params) {
    let course = null
    let passengers = [{}]
    let guid = params.params.guid
    await params.$axios.get('dollar_course', {})
      .then(function (response) {
        course = response.data.value.replace(',', '.')
      })

    await params.$axios.get('orders/' + guid, {})
      .then(function (response) {
        passengers = response.data.passengers
        if (passengers.length === 0) {
          passengers = [{}]
        }
      })

    return {
      passengers: passengers,
      order: {},
      loading: false,
      dollar_course: course,
      guid: guid
    }
  },
  methods: {
    next: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.updateOrder()
        } else {
          let firstError = document.getElementsByClassName('is-invalid')[0]
          // console.log(firstError)
          // let key = Object.keys(this.$validator.errors).reduce((k, l) => {
          //   return (document.getElementsByName(k)[0].offsetTop < document.getElementsByName(l)[0].offsetTop) ? k : l
          // })
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

      this.$axios.put('orders/' + this.guid, { order: { passengers_attributes: that.passengers } }, {
        before: this.loading = true
      })
        .then(function (response) {
          that.order = response.data
          that.$router.push({
            path: '/register_vip/pay/' + response.data.guid
          })
        })
        .catch(function (response) {
          console.error(response)
        }).finally(() => {
          this.loading = false
        })
    },
    addPassenger: function () {
      this.passengers.push({})
    },
    removePassenger: function (index) {
      this.$set(this.activePassengers[index], '_destroy', true)
      // this.passengers.splice(index, 1)
    }
  },
  computed: {
    activePassengers: function () {
      console.log(this.passengers.filter(it => it['_destroy'] !== true))
      return this.passengers.filter(it => it['_destroy'] !== true)
    },
    price: function () {
      return Math.round(this.activePassengers.filter(it => it.age2).length * 390 / 2 * Number(this.dollar_course), 0) +
        Math.round(this.activePassengers.filter(it => !it.age1 && !it.age2).length * 390 * Number(this.dollar_course), 0)
    }
  }
}
</script>

<style lang="scss">
  @import "~/assets/css/constants.scss";
  .page-3 {
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
