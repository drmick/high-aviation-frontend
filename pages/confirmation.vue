<template lang="pug">
  .walls
    .wall
      .wall__content
        .wall__content__title
          template(v-if="!result") Не удалось подтвердить почту

</template>

<script>
import MultiLangRouterLink from '../components/multiLangRouterLink'

export default {
  head () {
    return {
      title: 'Подтверждение почты'
    }
  },
  name: 'confirmation',
  components: { MultiLangRouterLink },
  async asyncData (params) {
    let confirmationNumber = params.query.confirmation_token
    await params.$axios.get('users/confirmation?confirmation_token=' + confirmationNumber, {})
      .then(function (response) {
        params.redirect('/sign_in')
        return { result: true }
      })
      .catch(function (error) {
        console.error(error, error.response.data)
        return { result: false, text: error.response.data }
      })
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
