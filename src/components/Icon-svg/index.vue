<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "icon-svg",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
  },
};
</script>
<style scoped>
.svg-icon {
  width: 20px;
  height: 20px;
  filter: drop-shadow(red 80px 0px);
  z-index: 10;
}
.svg-icon:hover {
  filter: drop-shadow(red 0px 0px);
}
</style>
