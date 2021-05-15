<template>
  <div class="cdiv" v-show="dialogvisible">
    <span class="txt tt">弹窗</span>
    <el-button @click="submit">确定</el-button>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogvisible: this.show,
    };
  },
  watch: {
    show() {
      this.dialogvisible = this.show;
    },
  },
  mounted() {
    console.log(9);
  },
  methods: {
    submit() {
      this.$emit("update:show", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.test1content {
  .cdiv {
    .txt.tt {
      color: red;
    }
  }
}
</style>
