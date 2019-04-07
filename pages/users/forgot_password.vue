<template lang="pug">
  .walls
    .wall
      .wall__content
        .wall__content__title ВОССТАНОВЛЕНИЕ ПАРОЛЯ
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
        .wall__content__sign-in
          button-item(@click="submit", :loading="loading") восстановить
        .wall__content__error(v-if="error") {{error}}
</template>

<script>
import ButtonItem from '../../components/buttonItem'

import MultiLangRouterLink from '../../components/multiLangRouterLink'

export default {
  head () {
    return {
      title: 'Повторная отправка подтверждения почты'
    }
  },
  name: 'new_confirmation',
  components: {
    ButtonItem,
    MultiLangRouterLink
  },
  asyncData: function () {
    return {
      error: null,
      user: {},
      loading: false
    }
  },
  methods: {
    submit: function () {
      this.$validator.validateAll().then((result) => {
        if (result) this.sendConfirmation()
      }).catch((e) => {
      })
    },
    sendConfirmation: function () {
      let veeErrors = this.errors
      let router = this.$router
      this.$axios.post('users/password', { user: this.user }, {
        before: this.loading = true
      })
        .then(function (response) {
          router.push({
            path: '/message',
            query: { message: 'На ваш почтовый ящик отправлена ссылка для восстановления пароля' }
          })
        })
        .catch(function (e) {
          try {
            if (e.response) {
              let error = e.response.data
              if (error.hasOwnProperty('error')) {
                this.error = error.error
              }
              if (error.hasOwnProperty('errors')) {
                let errors = error.errors
                Object.entries(errors).forEach(entry => {
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

  .forgot-password {
    font-size: 12px;
    color: #e0a80a;
  }
</style>
