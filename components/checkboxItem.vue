<template lang="pug">
  label.wrapper(:disabled="disabled")
    input(type='checkbox',
    :checked="checked",
    @change="$emit('change', $event.target.checked)",
    :disabled="disabled"
    )
    span.checkmark
    span.label {{label}}
</template>

<script>
export default {
  name: 'checkbox-item',
  props: ['label', 'checked', 'disabled'],
  model: {
    prop: 'checked',
    event: 'change'
  }
}
</script>

<style scoped lang="scss">
  @import "~/assets/css/constants.scss";

  label.wrapper {
    mso-ansi-font-weight: 400;
    height: 26px;
    font-size: 20px;
    font-weight: 300;
    margin-right: 10px;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    span {
      position: relative;
      &.label {
        margin-left: 10px;
        line-height: 1em;
      }
      &.checkmark {
        display: inline-block;
        position: relative;
        min-height: 26px;
        min-width: 26px;
        border: 1px solid #CCCCCC;
      }
      &.checkmark:after {
        left: 10px;
        top: 6px;
        width: 7px;
        height: 12px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
    input:checked ~ .checkmark {
      background-color: $main-color-2;
    }

    .checkmark1:after {
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      content: "";
      position: absolute;
      display: none;
    }

    input:checked ~ .checkmark:after {
      display: block;
    }

    &[disabled=disabled] {
      cursor: not-allowed;
      .checkmark {
        background-color: silver !important;
        cursor: not-allowed;
      }
    }
  }
</style>
