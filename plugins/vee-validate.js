import VeeValidate, { Validator } from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru'
import Vue from 'vue'

Vue.use(VeeValidate)
Validator.localize('ru', ru)

const dictionary = {
  ru: {
    messages: {
      required: () => 'Обязательно для заполнения',
      email: () => 'Некорректный email',
      numeric: () => 'Поле должно быть числом'
    }
  }
}

Validator.localize(dictionary)
