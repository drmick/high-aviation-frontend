<template lang="pug">
  .page-2
    .walls(v-if="flight === null")
      .wall
        p Рейс не найден
    .walls(v-else)
      .wall.wall-1
        .title Ваш рейс
      .wall.wall-2
        .flight
          .flight__info
            .flight__info__detail
              .flight__info__detail__title Вылет
              .flight__info__detail__airport {{flight.departure.iataCode}}
              .flight__info__detail__airport__detail {{flight.departure.airportInfo.nameAirport}}, {{flight.departure.airportInfo.nameCountry}}
              .flight__info__detail__date {{ dateFormat(flight.departure.scheduledTime)  }}
              .flight__info__detail__time {{ timeFormat(flight.departure.scheduledTime)  }}
          .flight__icon
            img(src="/images/flight.svg")
          .flight__info
            .flight__info__detail
              .flight__info__detail__title Прилет
              .flight__info__detail__airport {{flight.arrival.iataCode}}
              .flight__info__detail__airport__detail {{flight.arrival.airportInfo.nameAirport}}, {{flight.arrival.airportInfo.nameCountry}}
              .flight__info__detail__date {{ dateFormat(flight.arrival.scheduledTime)  }}
              .flight__info__detail__time {{ timeFormat(flight.arrival.scheduledTime)  }}
      .wall.wall-3
        .flight-common
          .flight-common__airlines
            .flight-common__airlines__title Авиакомпания
            .flight-common__airlines__name {{ flight.airline.name }}
          .flight-common__time
            .flight-common__time__title В пути
            .flight-common__time__value {{ betweenDates(flight.arrival.scheduledTime, flight.departure.scheduledTime, flight.arrival.airportInfo.GMT, flight.departure.airportInfo.GMT) }}
      button-item(@click="createOrder")
        .next-button ЗАБРОНИРОВАТЬ VIP
      multi-lang-router-link(to="/rules")
        .rules Правила использования

</template>

<script>
import ButtonItem from '../components/buttonItem'
import Fizik from '../components/fizik'
import moment from 'moment'
import MultiLangRouterLink from '../components/multiLangRouterLink'

export default {
  components: {
    MultiLangRouterLink,
    ButtonItem,
    Fizik
  },
  head () {
    return {
      title: 'Бронирование'
    }
  },
  name: 'search',
  data: function () {
    return {
      flight: null,
      user: {
        email: ''
      },
      fizik: {},
      order: {},
      flight_number: '',
      loading: false
    }
  },
  async asyncData (params) {
    // console.log(context.app.params)
    let flightNumber = params.query.flight
    let uri = 'flight/' + flightNumber
    let flight = null
    await params.$axios.get(uri, {})
      .then(function (response) {
        flight = response.data
      })
      .catch(function (error) {
        console.error(error)
      })
    return { flight: flight, flight_number: flightNumber }
  },
  methods: {
    createOrder: function () {
      let that = this
      this.$axios.post('orders', { order: { flight_number: this.flight_number,
        flight_date: this.flight.departure.scheduledTime,
        flight_from: this.flight.departure.iataCode,
        flight_to: this.flight.arrival.iataCode } }, {
        before: this.loading = true
      }).then(function (response) {
        that.$router.push({
          path: '/register_vip/' + response.data.guid
        })
      }).catch(function (response) {
      }).finally(() => {
        this.loading = false
      })
      // :to="'/register_vip/' + flight_number"
    },
    dateFormat: function (dateString) {
      moment.locale('ru')
      return moment(dateString, 'YYYY-MM-DD').format('LL')
    },
    timeFormat: function (dateString) {
      moment.locale('ru')
      return moment(dateString, 'YYYY-MM-DD HH:mm').format('LT')
    },
    betweenDates: function (from, to, fromGMT, toGMT) {
      moment.locale('ru')
      let momentFrom = moment(from, 'YYYY-MM-DD HH:mm:ss').add(-fromGMT, 'hours')
      let momentTo = moment(to, 'YYYY-MM-DD HH:mm:ss').add(-toGMT, 'hours')
      return moment.utc(momentFrom.diff(momentTo)).format('H:mm')
    }
  }
}
</script>

<style lang="scss">
  @import "~/assets/css/constants.scss";
  .page-2 {
    .walls {
      min-height: calc(100vh - 60px) !important;
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

    .wall.wall-1, .wall.wall-3 {
      background: #FAFAFA;
    }

    .wall-3 {
      border-bottom: 0 !important;
    }

    .wall-2 {
      flex-grow: 1;
      justify-content: space-between;
      padding: 20px;
      flex-direction: column;
    }

    .next-button {
      height: 83px;
      background-color: $main-color-3;
      width: 100%;
      border-radius: 5px;
      font-family: Montserrat, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 18px;
      display: flex;
      align-items: center;
      text-align: center;
      text-transform: uppercase;
      justify-content: space-around;
      color: white;
    }

    .title {
      height: 63px;
      color: $main-color-3;
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      text-align: center;
      text-transform: uppercase;
      padding-top: 21px;
    }

    .rules {
      height: 38px;
      text-align: center;
      line-height: 38px;
      color: $main-color-3;
      font-size: 12px;
    }

    .flight {
      font-family: Montserrat, sans-serif;
      display: flex;
      justify-content: space-between;
      padding: 10px 10px;
      &__icon {
        padding-top: 28px;
      }

      &__info {
        flex-basis: 110px;
        &__detail {
          &__title {
            font-size: 14px;
            color: #828282;
          }

          &__airport {
            font-size: 50px;
            font-weight: 700;
            margin-left: -3px;
            margin-top: -10px;
            &__detail {
              font-weight: 600;
              font-size: 12px;
              line-height: 1.2em;
              margin-top: -8px;
            }
          }

          &__date {
            margin-top: 30px;
            color: black;
            font-size: 12px;
          }

          &__time {

            font-size: 26px;
            font-weight: 800;
            margin-top: -5px;
          }
        }
      }
    }

    .flight-common {
      padding: 20px;
      display: flex;
      justify-content: space-between;

      &__airlines {
        flex-basis: 110px;
        max-width: 70%;
        overflow: hidden;

        &__title {
          color: #828282;
          font-size: 12px;
        }

        &__name {
          font-size: 20px;
          font-weight: bold;
        }
      }

      &__time {
        flex-basis: 110px;
        display: inline-block;

        &__title {
          color: #828282;
          font-size: 12px;
        }

        &__value {
          font-size: 20px;
          font-weight: 800;
        }
      }
    }
  }

</style>
