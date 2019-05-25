<template lang="pug">
  .page-rules
    .logo-background
    .section-1
      | Компания
      b {{' High Aviation Club '}}
      | предлагает вам воспользоваться
      span.colored {{' новым терминалом класса VIP '}}
      | в новом здании аэровокзала Международного аэропорта «Домодедово».
    .img
      img(src="images/pic/about-1.png")
    .section-2 Расположение вдали от основного здания аэровокзала и других аэропортовых сооружений обеспечивает максимальную уединенность, конфиденциальность и безопасность пассажиров. Терминал оборудован отдельной регистрационной стойкой и таможенным пунктом; вы можете прибыть в любое время, без формальностей пройти регистрацию и на своем личном или предоставленном нашей компанией транспорте подъехать к трапу самолета.
    .img
      img(src="images/pic/about-2.png")
    .section-2 После оформления на рейс, мы предлагаем вам скрасить ожидание вылета в комфортных залах или одной из переговорных комнат нашего бизнес-терминала. Приятно провести время и отдохнуть вы можете в нашем уютном баре. В зоне ожидания расположен DVD-кинотеатр, оборудованный 3-хместными кабинками с удобными креслами, широкоформатными телеэкранами, плеерами и наушниками. Круглосуточно работает интернет-центр с беспроводной сетью Wi-Fi, покрывающий всю территорию аэропорта. Картинная галерея Domodedovo, расположенная в зале ожидания, сотрудничает с известными фотохудожниками.
    .img
      img(src="images/pic/about-3.png")
    .section-2 VIP терминал организует встречу пассажиров, прилетающих в аэропорт «Домодедово» регулярными рейсами. Вас доставят в "Domodedovo Business Aviation Center" на комфортабельном транспорте, здесь Вы сможете пройти процедуры пограничного и таможенного оформления, а также получите свой багаж.

</template>

<script>
export default {
  layout: 'no-padding',
  head () {
    return {
      title: 'Правила пользования'
    }
  },
  name: 'rules'
}
</script>

<style scoped lang="scss">
  @import "~/assets/css/constants.scss";

  .page-rules {
    font-family: Montserrat, sans-serif;
    .img {
      margin-top: 15px;
      margin-bottom: 15px;
      img {
        width: 100%;
        height: auto;
      }
    }

    .section-2 {
      font-size: 16px;
      line-height: 22px;
      padding: 0 30px;
    }

    .section-1 {
      padding-top: 15px;
      padding-left: 30px;
      padding-right: 30px;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 28px;
      b {
        font-weight: 600;
      }
      .colored {
        color: $main-color-3;
      }
    }
    .logo-background {
      opacity: 0.1;
      width: 100%;
      height: 1000px;
      background: url('../static/images/main-logo2.svg') no-repeat;
      background-size: contain;
      right: -37%;
      position: absolute;
      top: 60px;
      overflow: hidden;
    }
  }

</style>
