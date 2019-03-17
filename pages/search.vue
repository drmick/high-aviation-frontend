<template lang="pug">
  div
    .walls(v-if="flight === null")
      .wall
        p Рейс не найден
    .walls(v-else)
      .wall
        .title Ваш рейс
        .flight
          .flight__info
            .flight__info__detail
              .flight__info__detail__title Вылет
              .flight__info__detail__airport {{flight.departure.iataCode}}
              .flight__info__detail__airport__detail {{flight.departure.airportInfo.nameAirport}}, {{flight.departure.airportInfo.nameCountry}}

              .flight__info__detail__date {{ dateFormat(flight.departure.scheduledTime)  }}
              .flight__info__detail__time {{ timeFormat(flight.departure.scheduledTime)  }}
          .flight__icon
            img(src="/images/flight.png")
          .flight__info
            .flight__info__detail
              .flight__info__detail__title Прилет
              .flight__info__detail__airport {{flight.arrival.iataCode}}
              .flight__info__detail__airport__detail {{flight.arrival.airportInfo.nameAirport}}, {{flight.arrival.airportInfo.nameCountry}}
              .flight__info__detail__date {{ dateFormat(flight.arrival.scheduledTime)  }}
              .flight__info__detail__time {{ timeFormat(flight.arrival.scheduledTime)  }}
      .wall
        .flight-common
          .flight-common__airlines
            .flight-common__airlines__title Авиакомпания
            .flight-common__airlines__name {{ flight.airline.name }}
          .flight-common__time
            .flight-common__airlines__title Время в пути
            .flight-common__airlines__name {{ betweenDates(flight.arrival.scheduledTime, flight.departure.scheduledTime, flight.arrival.airportInfo.GMT, flight.departure.airportInfo.GMT) }}
      .wall.yellow.register
        b-nav(tabs)
          b-nav-item(active) Частное лицо
        fizik(:data="fizik")

</template>

<script>
import Fizik from '../components/fizik'
import moment from 'moment'
import axios from '../.nuxt/axios'

export default {
  components: { Fizik },
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
      fizik: {}
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
    return { flight: flight }
  },
  methods: {
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
      return moment.utc(momentFrom.diff(momentTo)).format('HH:mm:ss')
    }
  }
}
</script>

<style scoped lang="scss">

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

  .title {
    color: #e0a80a;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    padding-top: 25px;
  }

  .flight {
    display: flex;
    justify-content: space-between;
    padding: 20px;

    &__icon {
      padding-top: 28px;
    }

    &__info {
      flex-basis: 110px;
      &__detail {
        &__title {
          font-size: 12px;
          color: #828282;
        }

        &__airport {
          font-size: 48px;
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
          color: #828282;
          font-size: 12px;
        }

        &__time {
          font-size: 24px;
          font-weight: 700;
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
        font-size: 16px;
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
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

</style>
