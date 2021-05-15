<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reloadParent, //父级
    };
  },
  data() {
    return {
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
  mounted() {},
  methods: {
    reloadParent() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true; //再打开
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-loading-spinner {
  top: 500px !important;
  position: fixed;
}
#nprogress .spinner-icon {
  display: none;
}

/* 解决element-ui的table表格控件表头与内容列不对齐问题 */
/* .el-table__body, .el-table__footer, .el-table__header{
  table-layout:auto;
} */

.ReportTitleDIV {
  display: block;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 5px 0;
  strong {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
  }
}
</style>
