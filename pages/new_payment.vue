<template lang="pug">
</template>

<script>
export default {
  head () {
    return {
      title: 'Уведомление'
    }
  },
  layout: 'none',
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
    let price = params.query.price
    const robokassa = require('node-robokassa')
    const robokassaHelper = new robokassa.RobokassaHelper({
      // REQUIRED OPTIONS:
      merchantLogin: 'HAC',
      hashingAlgorithm: 'md5',
      password1: 'Xb4YbRf1De0L94IsqDoE',
      password2: 'FVh9B9MEIHj77Q4uuNFf',
      IncCurrLabel: 'BankCard',

      // OPTIONAL CONFIGURATION
      testMode: true, // Whether to use test mode globally
      resultUrlRequestMethod: 'POST' // HTTP request method selected for "ResultURL" requests

    })
    const outSum = price
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
      email: email, // E-Mail of the paying user
      incCurrLabel: 'BankCard',
      outSumCurrency: 'RUR', // Transaction currency
      isTest: true, // Whether to use test mode for this specific transaction
      userData: userData
    }

    const paymentUrl = robokassaHelper.generatePaymentUrl(outSum, invDesc, options)

    // console.log(paymentUrl + '&IncCurrLabel=BankCard')
    return params.redirect(paymentUrl + '&IncCurrLabel=BankCard')
  }
}
</script>
