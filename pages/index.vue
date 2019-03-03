<template lang="pug">
  .sections
    section.sections__section-1
      p.main HIGH AVIATION CLUB
      p.descr предлагает вам прилетать и улетать из аэропорта «Домодедово» с  максимальным комфортом и удобством
    //section.sections__section-2
      ul
        li(:style="{ backgroundImage: 'url(/images/pic1.png)' }")
          p.main Персональное здание аэровокзала Домодедово
        li(:style="{ backgroundImage: 'url(/images/pic2.png)' }")
          p.main Упрощенное прохождение таможенного оформления
        li(:style="{ backgroundImage: 'url(/images/pic3.png)' }")
          p.main Персональный автомобиль до самолета
    section.sections__section-3
      p.main Введите номер вашего рейса,
      p.descr {{$t('home.section-3.descr')}}
    section.sections__section-4
      .sections__section-4__input
        vue-bootstrap-typeahead(v-model="searchString", :data="flightList", placeholder="№ рейса", ref="typeahead")
      .sections__section-4__button
        button-item(:to="'/search/?flight=' + searchString", :disabled="searchString.length < 1") искать
</template>

<script>
import axios from 'axios'
import ButtonItem from '../components/buttonItem'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

export default {
  head () {
    return {
      title: 'Главная'
    }
  },
  data: function () {
    return {
      searchString: '',
      flight: null,
      flightList: []
    }
  },
  components: { ButtonItem, VueBootstrapTypeahead },
  watch: {
    searchString: function (newVal) {
      newVal = newVal.split(' ').join('')
      if (newVal.length <= 1) return
      this.$refs.typeahead.inputValue = newVal
      let that = this
      let uri = 'http://localhost:4000/filter/' + newVal
      axios.get(uri, {})
        .then(function (response) {
          let data = response.data
          that.flightList = data.map((it) => {
            if (it.flight && it.flight.iataNumber) {
              return it.flight.iataNumber
            }
          })
        })
        .catch(function (error) {
          console.error(error)
          that.flightList = []
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .sections {
    section {
      text-align: center;
      margin-bottom: 15px;

      p {
        color: #919bb4;
        font-size: 14px;

        &.main {
          line-height: 1.6em;
          font-weight: 600;
          color: white;
        }

        &.descr {
          padding: 0 15px;
        }

        margin-bottom: 0;
      }
    }

    &__section-2 {
      ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
          background-size: cover;
          padding: 0 30px;
          border-radius: 3px;
          height: 90px;
          line-height: 1em;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    &__section-4 {
      &__input {
        margin-bottom: 6px;
      }

      &__button {
        height: 38px;

        .btn-wrapper {
          border-radius: 3px;
          font-size: 16px;
          padding-bottom: 2px;
        }
      }
    }
  }
</style>
