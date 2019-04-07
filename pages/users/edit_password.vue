<template lang="pug">
  .walls
    .wall
      .wall__content
        .wall__content__title СМЕНА ПАРОЛЯ
        b-form
          b-form-group(label="Пароль" label-for="password")
            b-form-input(
            :class="{ 'is-invalid': errors.has('password') }"
            name="password"
            type="password"
            v-model="password"
            v-validate="'required'"
            placeholder="Введите пароль")
            span.error {{ errors.first('password') }}
          b-form-group(label="Подтверждение пароля" label-for="password_confirmation")
            b-form-input(
            :class="{ 'is-invalid': errors.has('password_confirmation') }"
            name="password_confirmation"
            type="password"
            v-model="password_confirmation"
            v-validate="'required'"
            placeholder="Повторите пароль")
            span.error {{ errors.first('password_confirmation') }}
        .wall__content__sign-up
          button-item(@click="submit", :loading="loading") сменить
        .wall__content__error(v-if="pageError") {{pageError}}
</template>

<script>
import ButtonItem from '../../components/buttonItem'
import MultiLangRouterLink from '../../components/multiLangRouterLink'

export default {
  head () {
    return {
      title: 'Смена пароля'
    }
  },
  name: 'sign_in',
  components: { ButtonItem, MultiLangRouterLink },
  asyncData: function () {
    return {
      password: null,
      password_confirmation: null,
      pageError: null,
      loading: false
    }
  },
  mounted () {
  },
  methods: {
    submit: function () {
      this.$validator.validateAll().then((result) => {
        if (result) this.changePassword()
      }).catch((e) => {
        console.error(e)
      })
    },
    changePassword: function () {
      let router = this.$router
      let resetPasswordToken = this.$route.query.reset_password_token
      let veeErrors = this.errors
      let that = this
      this.$axios.put('/users/password', {
        user: {
          password: this.password,
          password_confirmation: this.password_confirmation,
          reset_password_token: resetPasswordToken
        }
      }, {
        before: this.loading = true
      })
        .then(function (response) {
          router.push({
            path: '/message',
            query: { message: 'Пароль успешно изменен' }
          })
        })
        .catch(function (e) {
          try {
            if (e.response) {
              let error = e.response.data
              if (error.hasOwnProperty('error')) {
                that.pageError = error.error
              }
              if (error.hasOwnProperty('errors')) {
                let errors = error.errors
                Object.entries(errors).forEach(entry => {
                  if (entry[0] === 'reset_password_token') {
                    that.pageError = 'Токен устарел! Запросите изменения пароля заново.'
                  }
                  veeErrors.add({
                    field: entry[0],
                    msg: entry[1].join(', ')
                  })
                })
              }
            }
          } catch (ee) {
            console.error(ee)
          }
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

      &__sign-up {
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

  .yellow_link {
    font-size: 12px;
    color: #e0a80a;
  }
</style>
