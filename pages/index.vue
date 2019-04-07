<template lang="pug">
  .sections
    section.sections__section-1
      p.main HIGH AVIATION CLUB
      p.descr предлагает вам прилетать и улетать из аэропорта «Домодедово» с  максимальным комфортом и удобством
    section.sections__section-3
      p.main Введите номер вашего рейса,
      p.descr {{$t('home.section-3.descr')}}
    section.sections__section-4
      .sections__section-4__input
        vue-bootstrap-typeahead(v-model="searchString", :data="flightList", placeholder="№ рейса", ref="typeahead")
      .sections__section-4__button
        button-item(:to="'/search/?flight=' + searchString", :disabled="searchString.length < 1") искать
      .sections__section-4__loading(v-if="loading")
        spinner
    section.sections__section-2
      ul
        li(:style="{ backgroundImage: 'url(/images/pic1.png)' }")
          p.main Персональное здание аэровокзала Домодедово
        li(:style="{ backgroundImage: 'url(/images/pic2.png)' }")
          p.main Упрощенное прохождение таможенного оформления
        li(:style="{ backgroundImage: 'url(/images/pic3.png)' }")
          p.main Персональный автомобиль до самолета
</template>

<script>
import ButtonItem from '../components/buttonItem'
import Spinner from '../components/spinner'

export default {
  head () {
    return {
      title: 'Главная'
    }
  },
  asyncData: function () {
    return {
      searchString: '',
      flight: null,
      flightList: [],
      loading: false
    }
  },
  components: {
    Spinner,
    ButtonItem
  },
  watch: {
    searchString: function (newVal) {
      newVal = newVal.split(' ').join('')
      if (newVal.length <= 1) return
      this.$refs.typeahead.inputValue = newVal
      let that = this
      let uri = 'filter/' + newVal
      this.$axios.get(uri, {}, {
        before: this.loading = true
      })
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
        }).finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
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
      position: relative;
      &__input {
        position: relative;
        margin-bottom: 6px;
      }

      &__loading {
        z-index: 9999;
        top: 9px;
        right: 35px;
        position: absolute;
        .lds-ring div {
          border-color: #e0a80a transparent transparent transparent;
        }
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
