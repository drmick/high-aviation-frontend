<template lang="pug">
  .walls
    .wall
      .wall__content
        .wall__content__title РЕГИСТРАЦИЯ
        b-form
          b-form-group(label="Email" label-for="email", class="label")
            b-form-input(
            :class="{ 'is-invalid': errors.has('email') }"
            name="email"
            type="email"
            v-model="user.email"
            v-validate="'required|email'"
            placeholder="Введите Email")
            span.error {{ errors.first('email') }}
          b-form-group(label="Пароль" label-for="password")
            b-form-input(
            :class="{ 'is-invalid': errors.has('password') }"
            name="password"
            type="password"
            v-model="user.password"
            v-validate="'required'"
            placeholder="Введите пароль")
            span.error {{ errors.first('password') }}
          b-form-group(label="Пароль" label-for="password_confirmation")
            b-form-input(
            :class="{ 'is-invalid': errors.has('password_confirmation') }"
            name="password_confirmation"
            type="password"
            v-model="user.password"
            v-validate="'required'"
            placeholder="Повторите пароль")
            span.error {{ errors.first('password_confirmation') }}
        a.button(@click="submit") зарегистрироваться
    .wall
      .wall__content
        .wall__content__title ВОЙТИ С ПОМОЩЬЮ СОЦСЕТЕЙ
        .wall__content__social
          multi-lang-router-link.forgot-password(to="#")
            img(src="/images/fb.png")
          multi-lang-router-link.forgot-password(to="#")
            img(src="/images/vk.png")

</template>

<script>
import MultiLangRouterLink from '../components/multiLangRouterLink'

export default {
  head () {
    return {
      title: 'Регистрация'
    }
  },
  name: 'sign_in',
  components: { MultiLangRouterLink },
  asyncData: function () {
    return {
      user: {}
    }
  },
  methods: {
    submit: function () {
      this.$validator.validateAll().then((result) => {
        if (result) this.register()
      }).catch((e) => {
        console.error(e)
      })
    },
    register: function () {
      this.$axios.post('users', { user: this.user })
        .then(function (response) {
          this.$router.push('/check_email')
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="scss">
  .wall {
    &__content {
      padding: 20px 0;

      &__title {
        color: #e0a80a;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        text-transform: uppercase;
      }

      &__social {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          margin: 8px;
        }
      }

      a.button {
        min-height: 30px;
        margin-top: 10px;
      }
    }
  }

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

  .forgot-password {
    font-size: 12px;
    color: #e0a80a;
  }
</style>
