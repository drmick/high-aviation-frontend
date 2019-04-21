<template lang="pug">
  .walls
    | {{paymentUrl}}
</template>

<script>
export default {
  head () {
    return {
      title: 'Уведомление'
    }
  },
  name: 'message',
  async asyncData (params) {
    let firstName = params.query.first_name
    let lastName = params.query.last_name
    let middleName = params.query.middle_name
    let phone = params.query.phone
    let email = params.query.email
    let flightNumber = params.query.flight_number
    let flightFrom = params.query.flight_from
    let flightTo = params.query.flight_to
    let guid = params.query.guid
    let orderId = params.query.order_id

    const robokassa = require('node-robokassa')
    const robokassaHelper = new robokassa.RobokassaHelper({
      // REQUIRED OPTIONS:
      merchantLogin: 'HAC',
      hashingAlgorithm: 'md5',
      password1: 'IYH1tBreYtU32TAb6AN5',
      password2: 'YFqK6OIbh1Ea080guVDn',

      // OPTIONAL CONFIGURATION
      testMode: true, // Whether to use test mode globally
      resultUrlRequestMethod: 'POST' // HTTP request method selected for "ResultURL" requests

    })
    const outSum = 380
    const invDesc = `Платеж №${orderId}. Оплата услуг сайта highaviation.ru`

    let userData = {
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName === null ? undefined : middleName,
      phone: phone,
      email: email,
      flight_number: flightNumber,
      flight_from: flightFrom,
      flight_to: flightTo,
      guid: guid,
      order_id: orderId
    }

    if (!middleName) {
      delete userData.middle_name
    }

    // Optional options.
    const options = {
      invId: orderId, // Your custom order ID
      email: 'infiltrator53@gmail.com', // E-Mail of the paying user
      outSumCurrency: 'USD', // Transaction currency
      isTest: true, // Whether to use test mode for this specific transaction
      userData: userData
    }

    const paymentUrl = robokassaHelper.generatePaymentUrl(outSum, invDesc, options)

    return params.redirect(paymentUrl)
  }
}
</script>
