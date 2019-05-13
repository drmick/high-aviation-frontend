<template lang="pug">
  b-form(action="https://demomoney.yandex.ru/quickpay/confirm.xml" method="POST")
    b-form-group(label="Фамилия" label-for="Фамилия")
      b-form-input(
      :class="{ 'is-invalid': errors.has('Фамилия') }"
      name="Фамилия"
      key="lastName",
      type="text"
      label="Фамилия"
      v-model="data.last_name"
      v-validate="'required'")
      span.error {{ errors.first('Фамилия') }}

    b-form-group(label="Имя" label-for="Имя", class="label")
      b-form-input(
      :class="{ 'is-invalid': errors.has('Имя') }"
      name="Имя"
      type="text"
      v-model="data.first_name"
      v-validate="'required'")
      span.error {{ errors.first('Имя') }}

    b-form-group(label="Отчество" label-for="Отчество")
      b-form-input(
      :class="{ 'is-invalid': errors.has('Отчество') }"
      name="Отчество"
      type="text"
      v-model="data.middle_name")
      span.error {{ errors.first('Отчество') }}

    b-form-group(label="Email" label-for="Email")
      b-form-input(
      :class="{ 'is-invalid': errors.has('Email') }"
      type="email"
      name="Email"
      v-model="data.email"
      v-validate="'email|required'")
      span.error {{ errors.first('Email') }}

    <!--b-form-group(-->
    <!--label="Телефон"-->
    <!--label-for="Телефон")-->
      <!--b-form-input(-->
      <!--:class="{ 'is-invalid': errors.has('Телефон') }"-->
      <!--type="text"-->
      <!--name="Телефон"-->
      <!--v-model="data.phone"-->
      <!--v-validate="'required'")-->
      <!--span.error {{ errors.first('Телефон') }}-->

    input(name="receiver" type="hidden" value="4100325939851" )
    //input(name="formcomment" type="hidden" value=("Проект «Железный человек»: реактор холодного ядерного синтеза") )
    //input(name="short-dest" type="hidden" value=("Проект «Железный человек»: реактор холодного ядерного синтеза") )
    input(name="label" type="hidden" value="$order_id" )
    input(name="quickpay-form" type="hidden" value="donate" )
    input(name="targets" type="hidden" value=("транзакция {order_id}") )
    input(data-type="number" name="sum" type="hidden" value="1000" )
    //input(name="comment" type="hidden" value=("Хотелось бы получить дистанционное управление.") )
    <!--input(name="need-fio" type="hidden" value="true" )-->
    <!--input(name="need-email" type="hidden" value="true" )-->
    <!--input(name="need-phone" type="hidden" value="true" )-->
    <!--input(name="need-address" type="hidden" value="false" )-->
    input(name="paymentType" type="hidden" value="AC")
    .commit-btn
      //input(type="submit")
      button-item(@click.native="submit", :loading="loading") Забронировать VIP

      //form

        label
          input name="paymentType" type="radio" value="PC" >/
          | Яндекс.Деньгами
        label
          input name="paymentType" type="radio" value="AC" >/
          | Банковской картой
        input type="submit" value="Перевести" /

    //iframe(src="https://money.yandex.ru/quickpay/button-widget?targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%20%D0%B1%D1%80%D0%BE%D0%BD%D0%B8&default-sum=15000&button-text=11&any-card-payment-type=on&button-size=m&button-color=orange&successURL=localhost%3A3000&quickpay=small&account=410019147518806&" width="184" height="36" frameborder="0" allowtransparency="true" scrolling="no")
</template>

<script>

import ButtonItem from './buttonItem'
// import uuidv1 from 'uuid/v1'

export default {
  components: { ButtonItem },
  data () {
    return {
      order: {},
      loading: false
    }
  },
  name: 'fizik',
  props: ['data', 'flight', 'flight_number'],
  methods: {

    submit: function () {
      this.$validator.validateAll().then((result) => {
        if (result) this.pushOrder()
      }).catch((e) => {
        console.error(e)
      })
    },
    createOrder: function (guid, id) {
      this.order = {
        first_name: this.data.first_name,
        last_name: this.data.last_name,
        middle_name: this.data.middle_name,
        phone: this.data.phone,
        email: this.data.email,
        // flight_number: this.flight_number,
        // flight_date: this.flight.departure.scheduledTime,
        // flight_from: this.flight.departure.iataCode,
        // flight_to: this.flight.arrival.iataCode,
        // full_data: this.flight,
        flight: this.flight,
        external_key: 'test',
        id: id,
        guid: guid
      }
    },
    pushOrder: function () {
      // if (!this.$auth.loggedIn) {
      //   this.$notify({ group: 'simple-notification', text: 'Необходимо авторизоваться!' })
      // } else {
      let that = this
      if (this.order.guid) {
        this.createOrder(this.order.guid, this.order.id)
        this.$axios.put('orders/' + this.order.guid, { order: this.order }, {
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
      } else {
        this.createOrder(this.order.guid, this.order.id)
        this.$axios.post('orders', { order: this.order }, {
          before: this.loading = true
        })
          .then(function (response) {
            that.order.guid = response.data.guid
            that.order.id = response.data.id
            that.successPushOrder(that.order)
          })
          .catch(function (response) {
            // console.log(response)
          }).finally(() => {
            this.loading = false
          })
      }
    },
    successPushOrder: function (order) {
      this.$router.push({
        path: '/new_payment',
        query: { type: 'fizik',
          first_name: order.first_name,
          last_name: order.last_name,
          middle_name: order.middle_name,
          phone: order.phone,
          email: order.email,
          // flight_number: order.flight_number,
          // flight_date: order.flight_date,
          // flight_from: order.flight_from,
          // flight_to: order.flight_to,
          flight: order.flight,
          guid: order.guid,
          order_id: order.id }
      })
    }
  }
}
</script>

<style lang="scss">
  .commit-btn {
    margin-top: 15px;
    height: 40px;
    width: 100%;
    .btn-wrapper {
      border-radius: 4px;
      font-size: 16px !important;
    }
    .spinner {
      height: auto;
      width: auto;
    }
  }

  form {

    .form-group {
      position: relative;
      padding-bottom: 5px;
      input {
        height: 46px;
        border-radius: 0;
        border: 1px solid #CCCCCC;
        &:focus {
          box-shadow: none !important;
        }
      }
      input.is-invalid {
        background-image: none;
      }
      label {
        font-family: Montserrat, sans-serif !important;
        background-color: white;
        position: absolute;
        top: -7px;
        left: 10px;
        padding-left: 3px;
        padding-right: 3px;
        font-size: 12px !important;
        color: #828282 !important;
        margin-bottom: 5px;
      }

      span.error {
        color: #dc3545;
        font-size: 12px;
        position: absolute;
        background: white;
        bottom: -3px;
        right: 10px;
        padding-left: 3px;
        padding-right: 3px;
      }
      margin-bottom: 10px;
    }
  }

</style>
