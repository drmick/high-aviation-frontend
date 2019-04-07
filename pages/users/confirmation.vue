<template lang="pug">
  div
</template>

<script>
export default {
  head () {
    return {
      title: 'Подтверждение почты'
    }
  },
  name: 'confirmation',
  async asyncData (params) {
    let confirmationNumber = params.query.confirmation_token
    await params.$axios.get('users/confirmation?confirmation_token=' + confirmationNumber, {})
      .then(function (response) {
        console.log(222, response.data.email)
        try {
          params.redirect({ path: '/sign_in', query: { email: response.data.email } })
        } catch (e) {
          console.log(1111, e)
        }
      })
      .catch(function (error) {
        try {
          params.redirect({ path: '/message', query: { message: error.response.data.email[0] } })
        } catch (e) {
          console.error(111, e, error)
        }
      })
  }
}
</script>
