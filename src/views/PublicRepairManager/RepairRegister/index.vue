<template>
  <div class="container RepairRegister">
    <div class="el-content">
      <div class="nav_barHeight">
        <ul class="nav-bar">
          <li
            class="nav-li"
            @click="NavSwich('register', 1)"
            v-if="RepRegister_has()"
          >
            <span :class="{ on: isCheck == 1 }">维修登记</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('project', 2)"
            v-if="RepProject_has()"
          >
            <span :class="{ on: isCheck == 2 }">维修项目</span>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
    <div class="bar-body">
      <!-- 各个模块组件 -->
      <!-- <keep-alive> -->
      <component :is="skzxcomp" ref="NavCompChildren"></component>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>
<script>
import register from "./register"; //走表分摊
import project from "./project"; //总表设置
export default {
  name: "RepairRegister",
  data() {
    return {
      skzxcomp: "register", //默认选中走表分摊
      isCheck: 1,
    };
  },
  mounted() {
    this.isCheck = this.RepRegister_has() ? 1 : this.RepProject_has() ? 2 : "";
    this.skzxcomp = this.RepRegister_has()
      ? "register"
      : this.RepProject_has()
      ? "project"
      : "";
    this.$nextTick(function () {
      this.$refs.NavCompChildren.getRowTable();
    });
  },
  methods: {
    RepRegister_has() {
      //维修登记权限
      if (
        sessionStorage.getItem("buttenpremissions").indexOf("RepRegister_has") >
        -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    RepProject_has() {
      //维修项目权限
      if (
        sessionStorage.getItem("buttenpremissions").indexOf("RepProject_has") >
        -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**标签选项切换*/
    NavSwich(val, index) {
      this.skzxcomp = val;
      this.isCheck = index;
      this.$nextTick(function () {
        this.$refs.NavCompChildren.getRowTable();
      });
    },
  },
  components: {
    register,
    project,
  },
};
</script>
<style lang="scss" scoped>
.RepairRegister {
  padding: 0 !important;
  overflow: hidden;
  .el-content {
    padding: 0;
    .nav_barHeight {
      height: 36px;
    }
    .nav-bar {
      position: absolute;
      z-index: 10;
      left: 10px;
      right: 10px;
      margin: 0;
      padding: 0;
      height: 36px;
      line-height: 36px;
      min-width: 600px;
      background: #ebecf2;
      z-index: 999;
      .nav-li {
        position: relative;
        list-style-type: none;
        float: left;
        width: 120px;
        height: 36px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: rgba(77, 77, 77, 1);
        background: rgba(214, 215, 220, 1);
        .on {
          display: block;
          width: 120px;
          background: #2e8ad7;
          height: 36px;
          background: rgba(255, 255, 255, 1);
          border-radius: 0px 8px 0px 0px;
          overflow: hidden;
          color: #2e8ad7;
        }
      }
      :nth-child(2) {
        border-top-right-radius: 8px;
      }
    }
  }
}
</style>
