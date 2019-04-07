<template lang="pug">
  .walls
    .wall
      .title О клубе
      | contact@highaviation.ru

</template>

<script>
export default {
  head () {
    return {
      title: 'О клубе'
    }
  },
  name: 'About'
}
</script>

<style scoped lang="scss">
  .wall {
    display: flex;
    flex-direction: column;
    padding: 25px !important;
    text-align: center;
  }

  .title {
    color: #e0a80a;
    padding-top: 0;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
  }

</style>
