<template lang="pug">
  .walls
    .wall
      .title История бронирования
    .wall.order(v-for="order in orders")
      .order__content
        .order__content__part
          .order__content__part__time
            div {{dateFormat(order.flight_date)}} {{timeFormat(order.flight_date)}}
          .order__content__part__fio
            div {{order.last_name}} {{order.first_name}}
        .order__content__part
          .order__content__part__title Номер рейса
          .order__content__part__fio
            div {{order.flight_number}}

</template>

<script>
import ButtonItem from '../components/buttonItem'
import moment from 'moment'

export default {
  components: {
    ButtonItem
  },
  head () {
    return {
      title: 'История бронирования'
    }
  },
  name: 'history',
  async asyncData (params) {
    let orders = []
    await params.$axios.get('history', {})
      .then(function (response) {
        orders = response.data
      })
      .catch(function (error) {
        console.error(error)
      })
    return { orders: orders }
  },
  methods: {
    dateFormat: function (dateString) {
      moment.locale('ru')
      return moment(dateString, 'YYYY-MM-DD').format('LL')
    },
    timeFormat: function (dateString) {
      moment.locale('ru')
      return moment(dateString, 'YYYY-MM-DD HH:mm').format('LT')
    }
  }
}
</script>

<style scoped lang="scss">
  .order:nth-child(even) {
    background-color: #fff7e0;
  }
  .order {
    &__content {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      &__part {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        &__time, &__title {
          font-size: 12px;
        }
        &__fio {
          font-weight: bold;
          color: #000;
        }
      }
    }
  }

  .wall {
    display: flex;
    justify-content: center;
    padding: 25px !important;
  }

  .title {
    color: #e0a80a;
    padding-top: 0;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
  }

</style>
