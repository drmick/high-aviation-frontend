<template lang="pug">
  b-form
    b-form-group(label="Имя" label-for="firstName", class="label")
      b-form-input(
      :class="{ 'is-invalid': errors.has('firstName') }"
      name="firstName"
      type="text"
      v-model="data.first_name"
      v-validate="'required'"
      placeholder="Введите имя")
      span.error {{ errors.first('firstName') }}
    b-form-group(label="Фамилия" label-for="lastName")
      b-form-input(
      :class="{ 'is-invalid': errors.has('lastName') }"
      name="lastName"
      type="text"
      v-model="data.last_name"
      v-validate="'required'"
      placeholder="Введите фамилию")
      span.error {{ errors.first('lastName') }}
    b-form-group(label="Отчество" label-for="middleName")
      b-form-input(
      :class="{ 'is-invalid': errors.has('middleName') }"
      name="middleName"
      type="text"
      v-model="data.middle_name"
      placeholder="Введите отчество")
      span.error {{ errors.first('middleName') }}
    b-form-group(label="Email" label-for="email")
      b-form-input(
      :class="{ 'is-invalid': errors.has('email') }"
      type="email"
      name="email"
      v-model="data.email"
      v-validate="'email|required'"
      placeholder="Введите email")
      span.error {{ errors.first('email') }}
    b-form-group(
    label="Телефон"
    label-for="phone")
      b-form-input(
      :class="{ 'is-invalid': errors.has('phone') }"
      type="text"
      name="phone"
      v-model="data.phone"
      v-validate="'required'"
      placeholder="Введите номер телефона")
      span.error {{ errors.first('phone') }}
</template>

<script>

export default {
  name: 'fizik',
  props: ['data']
}
</script>

<style lang="scss">
  form {
    .form-group {
      label {
        font-size: 12px !important;
        font-family: "Open Sans", sans-serif;
        color: #121e2a;
        margin-bottom: 5px;
      }

      span.error {
        color: #dc3545;
        font-size: 12px;
      }
      margin-bottom: 10px;
    }
  }

</style>
