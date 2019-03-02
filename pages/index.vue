<template lang="pug">
  section.container
    <!--div-->
      <!--p Enter Flight ID:-->
    <!--div-->
      <!--input(v-model="inputText")-->
    <!--div-->
      <!--button(@click="loadStatus") Get flight detail-->
    <!--div.result-->
      <!--| {{result}}-->
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      inputText: '',
      result: ''
    }
  },
  components: {
  },
  asyncData (context) {
  },
  created () {
  },
  methods: {
    loadStatus: function () {
      let uri = 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/' + this.inputText
      let that = this
      axios.get(uri, {
        params: {
          appId: '5bf6ab55',
          appKey: 'af8dcc69453fdafb6eb13e5ad2933522'
        }
      })
        .then(function (response) {
          that.result = response
        })
        .catch(function (error) {
          that.result = error
        })
        .then(function () {
          that.result = '{}'
        })
    }
  }
}
</script>
<style>
  .container {
    padding: 30px;
    min-height: 100vh;
    align-items: center;
    text-align: center;
  }

  .container > div {
    margin-bottom: 15px;
  }

  .container > div > button {
    margin-left: 15px;
  }
</style>
