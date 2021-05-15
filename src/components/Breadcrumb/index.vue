<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="item in levelList"
      :key="item.name"
      v-if="item.name != '首页'"
      >{{ item.name }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>
<script>
export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name); //$route.matched 将会是一个包含从上到下的所有对象 (副本),match()方法可在字符串内检索返回指定的值
      this.levelList = matched;
    },
  },
};
</script>
