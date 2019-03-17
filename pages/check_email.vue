<template lang="pug">
  .walls
    .wall
      .wall__content
        .wall__content__title На ваш почтовый ящик отправлена ссылка для подтверждения почты
</template>

<script>
import MultiLangRouterLink from '../components/multiLangRouterLink'

export default {
  head () {
    return {
      title: 'Подтверждение почты'
    }
  },
  name: 'check_email',
  components: { MultiLangRouterLink }
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
