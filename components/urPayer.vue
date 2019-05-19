<template lang="pug">
  b-form(action="https://demomoney.yandex.ru/quickpay/confirm.xml" method="POST")
    div.search-block(:class="{ 'bad': emptySearch === true }")
      label ИНН
      vue-bootstrap-typeahead(v-model="data.inn", :value="data.inn", :data="organizations", ref="typeahead", :serializer="s => s.displayName", @hit="selectedInn($event)", name="inn", id="search")
      span.error Обязательно для заполнения

    b-form-group(label="БИК" label-for="bic")
      b-form-input(
      :class="{ 'is-invalid': errors.has('bic') }"
      name="bic"
      key="bic",
      type="number"
      v-model="data.bic"
      v-validate="'required|numeric'")
      span.error {{ errors.first('bic') }}

    b-form-group(label="Рассчетный счет" label-for="account")
      b-form-input(
      :class="{ 'is-invalid': errors.has('account') }"
      name="account"
      key="account",
      type="text"
      v-model="data.account"
      v-validate="'required|numeric'")
      span.error {{ errors.first('account') }}

    b-form-group(label="Название" label-for="urName")
      b-form-input(
      :class="{ 'is-invalid': errors.has('urName') }"
      name="urName"
      key="urName",
      type="text",
      disabled=true
      v-model="data.urName"
      v-validate="'required'")
      span.error {{ errors.first('urName') }}

    b-form-group(label="КПП" label-for="kpp")
      b-form-input(
      :class="{ 'is-invalid': errors.has('kpp') }"
      name="kpp"
      key="kpp",
      disabled=true
      type="number"
      v-model="data.kpp"
      v-validate="'required|numeric'")
      span.error {{ errors.first('kpp') }}

    b-form-group(label="Корр. счет" label-for="corrAccount")
      b-form-input(
      :class="{ 'is-invalid': errors.has('corrAccount') }"
      name="corrAccount"
      key="corrAccount",
      type="text"
      v-model="data.corrAccount"
      v-validate="'required|numeric'")
      span.error {{ errors.first('corrAccount') }}

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

export default {
  components: { ButtonItem },
  data () {
    return {
      order: {},
      loading: false,
      organizations: [],
      emptySearch: false
    }
  },
  inject: ['$validator'],
  name: 'urPayer',
  props: ['data'],
  methods: {
    selectedInn: function (data) {
      this.$set(this.data, 'urName', data.name)
      this.$set(this.data, 'inn', data.inn)
      this.$set(this.data, 'kpp', data.kpp)
    },
    checkInn: function () {
      this.emptySearch = this.data.inn.length === 0
    }
  },

  watch: {
    'data.inn': function (newVal) {
      this.checkInn()
      newVal = newVal.split(' ').join('')
      if (newVal.length <= 1) {
        this.notFound = true
        return
      }
      this.$refs.typeahead.inputValue = newVal
      let that = this
      let uri = 'get_urik/' + newVal
      this.$axios.get(uri, {}, {
        before: this.loading = true
      })
        .then(function (response) {
          let data = response.data.values.suggestions
          that.organizations = data.map((it) => {
            return { displayName: it.data.inn + ' - ' + it.value, name: it.value, inn: it.data.inn, kpp: it.data.kpp }
          })
          // that.notFound = !that.organizations.includes(newVal)
        })
        .catch(function (error) {
          console.error(error)
          that.organizations = []
        }).finally(() => {
          this.loading = false
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

  .search-block {
    span.error {
      display: none;
    }
    &.bad {
      span.error {
        display: block;
      }
      input {
        border-color: #dc3545;
      }
    }
    label {
      z-index: 5;
    }
    position: relative;
  }

  input[type=search] {

    border: 1px solid #CCCCCC;
    box-sizing: border-box;
    border-radius: 0 !important;
    background: transparent;
    color: #495057;
    height: 46px;
    &:focus {
      box-shadow: none !important;
    }

    &::placeholder {
      color: white;
    }
  }

  form {
    .form-group, .search-block {
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

      span.error {
        z-index: 5;
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
