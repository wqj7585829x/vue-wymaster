<template>
  <div class="tags-view-container" v-if="showTags">
    <div tag="ul" style="height: 100%" class="tags-view-wrapper">
      <router-link
        :to="tag.path"
        tag="li"
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        >{{ tag.name }}<span @click.prevent.stop="delSelectTag(tag)"></span
      ></router-link>
    </div>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown" class="tagviewDropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    visitedViews() {
      return this.$store.state.tagsview.visitedviews;
    },
    showTags() {
      return this.visitedViews.length > 0;
    },
  },
  watch: {
    $route() {
      this.addViewTags();
    },
  },
  mounted() {
    this.addViewTags();
  },
  methods: {
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.$store.dispatch("addVisitedViews", route);
    },
    isActive(route) {
      return route.path == this.$route.path || route.name === this.$route.name;
    },
    delSelectTag(route) {
      console.log(route);
      //先提交删除数据的方法,数组删除出掉数据后，如果关闭的是当前打开的路由需要将路由改为数组最后一次push进去的路由
      this.$store.dispatch("delVisitedViews", route).then((views) => {
        if (this.isActive(route)) {
          //只有在关闭当前打开的标签页才会有影响
          let lastView = views.slice(-1)[0]; //选取路由数组中的最后一位
          console.log(lastView);
          if (lastView) {
            this.$router.push(lastView);
          } else {
            this.$router.push("/");
          }
        }
      });
    },
    handleTags(command) {
      //标签选项tagview
      command === "other" ? this.closeOther() : this.closeAll();
    },
    // 关闭其他标签
    closeOther() {
      this.$store
        .dispatch("delOtherVisitedViews", this.$route)
        .then((views) => {});
    },
    // 关闭全部标签
    closeAll() {
      this.$store.dispatch("delAllVisitedViews").then((views) => {});
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.tags-view-container {
  margin-top: 0px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding-right: 90px;
  .tags-view-wrapper {
    width: 100%;
    // min-width: 1000px;
    height: 32px;
    // overflow: auto;
    overflow-y: auto;
    white-space: nowrap;
    font-size: 12px;
    // background: #fff;
    li {
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #fff;
      color: #262626;
      display: inline-block;
      padding: 0 38px 0 24px;
      position: relative;
      border-radius: 4px 4px 0 0;
      &:after {
        content: "";
        background: #e4e6ed;
        position: absolute;
        right: 0;
        top: 10%;
        width: 1px;
        height: 80%;
      }
      span {
        background: url("../../../assets/comImgs/closedefault.png") no-repeat
          10px 10px;
        width: 10px;
        height: 10px;
        position: absolute;
        right: 14px;
        top: 35%;
      }
    }
    li.active {
      // background: #2e8ad7;
      color: #fff;
      &:after {
        width: 0px;
      }
      span {
        background: url("../../../assets/comImgs/closehover.png") no-repeat;
      }
    }
    li:hover {
      // background: #64b8ff;
      color: #fff;
      &:after {
        width: 0px;
      }
      span {
        background: url("../../../assets/comImgs/closehover.png") no-repeat;
      }
    }
  }

  .tags-close-box {
    position: absolute;
    right: 10px;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 90px;
    height: 30px;
    z-index: 10;
  }
}
</style>
<style lang="scss">
.tagviewDropdown {
  .el-dropdown-menu__item:hover {
    color: #fff !important;
  }
}
</style>
