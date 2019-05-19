<template lang="pug">
  b-form(method="POST")
    b-form-group(label="Фамилия", :label-for="'lastName_' + index")
      b-form-input(
      :class="{ 'is-invalid': errors.has('lastName_'+index) }",
      :name="'lastName_'+ index",
      :key="'lastName_'+ index",
      type="text"
      label="Фамилия"
      v-model="data.last_name"
      v-validate="'required'")
      span.error {{ errors.first('lastName_' + index) }}

    b-form-group(label="Имя", :label-for="'firstName_' + index")
      b-form-input(
      :class="{ 'is-invalid': errors.has('firstName_'+index) }",
      :name="'firstName_'+ index",
      :key="'firstName_'+ index",
      type="text"
      label="Имя"
      v-model="data.first_name"
      v-validate="'required'")
      span.error {{ errors.first('firstName_' + index) }}

    b-form-group(label="Отчество", :label-for="'middle_name_' + index")
      b-form-input(
      :class="{ 'is-invalid': errors.has('middle_name_' + index) }"
      name="Отчество"
      type="text"
      v-model="data.middle_name")
      span.error {{ errors.first('middle_name_' + index) }}
    .checkboxes
      checkbox-item(label='0-6 лет', v-model='data.age1')
      checkbox-item(label='7-12 лет', v-model='data.age2')
</template>

<script>

import ButtonItem from './buttonItem'
import CheckboxItem from './checkboxItem'

export default {
  components: { ButtonItem, CheckboxItem },
  data () {
    return {
      order: {},
      loading: false,
      age1: false,
      age2: false
    }
  },
  name: 'passenger',
  props: ['data', 'index'],
  inject: ['$validator'],
  methods: {

  },

  watch: {
    'data.age1': function (newVal, oldVal) {
      if (newVal) {
        this.$set(this.data, 'age2', false)
      }
    },
    'data.age2': function (newVal, oldVal) {
      if (newVal) {
        this.$set(this.data, 'age1', false)
      }
    }
  }
}
</script>

<style lang="scss">

  .checkboxes {
    display: flex;
    label.wrapper {
      margin-right: 50px;
    }
  }
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
