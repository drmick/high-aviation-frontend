<template lang="pug">
  .walls
    .wall
      .wall__content
        .wall__content__title ВОЙТИ
        b-form(ref="form")
          b-form-group(label="Email" label-for="email", class="label")
            b-form-input(
            :class="{ 'is-invalid': errors.has('email') }"
            name="email"
            type="email"
            v-model="user.email"
            v-validate="'required|email'"
            placeholder="Введите Email"
            ref="email",
            autocomplete="email username")
            span.error {{ errors.first('email') }}
          b-form-group(label="Пароль" label-for="password")
            b-form-input(
            :class="{ 'is-invalid': errors.has('password') }"
            name="password"
            type="password"
            v-model="user.password"
            v-validate="'required'"
            placeholder="Введите пароль"
            ref="password",
            autocomplete="password"
            )
            span.error {{ errors.first('password') }}
        multi-lang-router-link.yellow_link(to="/users/forgot_password") Забыли пароль?
        br
        multi-lang-router-link.yellow_link(to="/sign_up") Регистрация
        br
        multi-lang-router-link.yellow_link(to="/users/new_confirmation") Не пришло подтверждение на почту?
        .wall__content__sign-in
          button-item(@click="submit", :loading="loading") войти
        .wall__content__error(v-if="error") {{error}}
    //.wall
      .wall__content
        .wall__content__title ВОЙТИ С ПОМОЩЬЮ СОЦСЕТЕЙ
        .wall__content__social
          multi-lang-router-link(to="#")
            img(src="/images/fb.png")
          multi-lang-router-link(to="#")
            img(src="/images/vk.png")
</template>

<script>
import ButtonItem from '../components/buttonItem'

import MultiLangRouterLink from '../components/multiLangRouterLink'

export default {
  head () {
    return {
      title: 'Вход'
    }
  },
  name: 'sign_in',
  components: {
    ButtonItem,
    MultiLangRouterLink
  },
  asyncData: function (params) {
    return {
      error: null,
      user: {
        email: params.route.query.email
      },
      loading: false
    }
  },
  mounted () {
    if (this.user.email) {
      this.$refs.password.$el.focus()
    } else {
      this.$refs.email.$el.focus()
    }
  },
  methods: {
    submit: function () {
      this.$validator.validateAll().then((result) => {
        if (result) this.auth()
      }).catch((e) => {
      })
    },
    auth: function () {
      this.loading = true
      this.$auth.loginWith('local', {
        data: {
          user: {
            email: this.user.email,
            password: this.user.password
          }
        }
      }).catch(e => {
        this.error = e.response.data.error
      }).then((profile) => {
        // if (window.PasswordCredential) {
        //   let c = navigator.credentials.create({ password: this.$refs.form })
        //   return navigator.credentials.store(c)
        // } else {
        //   return Promise.resolve(profile)
        // }
        // this.$refs.form.submit()
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
  .wall {
    &__content {
      padding: 20px 0;
      &__error {
        color: red;
        padding-top: 10px;
        font-size: 12px;
        text-align: center;
      }

      &__sign-in {
        min-width: 150px;
        height: 30px;
        margin-top: 25px;
        text-align: center;
        display: flex;
        justify-content: center;
        .btn-wrapper {
          padding: 0 30px;
          min-width: 150px;
        }
      }

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

  .yellow_link {
    font-size: 12px;
    color: #e0a80a;
  }
</style>
