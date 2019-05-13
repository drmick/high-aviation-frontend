<template lang="pug">
  div
    .walls(v-if="flight === null")
      .wall
        p Рейс не найден
    .walls(v-else)
      .wall.wall-1
        .title Ваш рейс
      .wall.wall-2
        fizik(:flight="flight", :data="fizik",)

</template>

<script>
import ButtonItem from '../../components/buttonItem'
import Fizik from '../../components/fizik'
import moment from 'moment'

export default {
  components: {
    ButtonItem,
    Fizik
  },
  head () {
    return {
      title: 'Бронирование'
    }
  },
  name: 'flight',
  data: function () {
    return {
      flight: this.$route.params.flight,
      user: {
        email: ''
      },
      fizik: {},
      order: {},
      flight_number: '',
      loading: false
    }
  },
  // async asyncData (params) {
  //   let flightNumber = params.route.params.flight
  // },
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

<style lang="scss">
  @import "~/assets/css/constants.scss";
  .walls {
    min-height: calc(100vh - 90px);
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

</style>
