<template lang="pug">
  b-form(action="https://demomoney.yandex.ru/quickpay/confirm.xml" method="POST")
    b-form-group(label="Фамилия" label-for="lastName")
      b-form-input(
      :class="{ 'is-invalid': errors.has('lastName') }"
      name="lastName"
      key="lastName",
      type="text"
      label="Фамилия"
      v-model="data.last_name"
      v-validate="'required'")
      span.error {{ errors.first('lastName') }}

    b-form-group(label="Имя" label-for="firstName", class="label")
      b-form-input(
      :class="{ 'is-invalid': errors.has('firstName') }"
      name="firstName"
      type="text"
      v-model="data.first_name"
      v-validate="'required'")
      span.error {{ errors.first('firstName') }}

    b-form-group(label="Отчество" label-for="middleName")
      b-form-input(
      :class="{ 'is-invalid': errors.has('middleName') }"
      name="middleName"
      type="text"
      v-model="data.middle_name")
      span.error {{ errors.first('middleName') }}

    b-form-group(label="Email" label-for="email")
      b-form-input(
      :class="{ 'is-invalid': errors.has('email') }"
      type="email"
      name="email"
      v-model="data.email"
      v-validate="'required|email'")
      span.error {{ errors.first('email') }}

    b-form-group(label="Телефон" label-for="phone")
      b-form-input(
      :class="{ 'is-invalid': errors.has('phone') }"
      type="text"
      name="phone"
      v-model="data.phone"
      v-validate="'required'")
      span.error {{ errors.first('phone') }}

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
  inject: ['$validator'],
  name: 'fizPayer',
  props: ['data']
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
