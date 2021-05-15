<template>
  <section class="container_fixed">
    <div class="container_404">
      <span><img src="@/assets/comImgs/404.png" /></span>
      <p class="textColor">抱歉，您访问的页面不存在!</p>
      <span
        ><el-button type="primary" @click="BackGo">返回</el-button
        ><el-button @click="BackHome">首页</el-button></span
      >
    </div>
  </section>
</template>
<script>
export default {
  methods: {
    BackGo() {
      //返回上一级
      window.history.go(-1);
    },
    BackHome() {
      //返回首页
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.container_fixed {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
}
.container_404 {
  margin: 60px auto 0;
  text-align: center;
  .textColor {
    color: #606266;
  }
}
</style>
