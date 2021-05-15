<template>
  <div class="container AllocationSettings">
    <div class="el-content">
      <div class="nav_barHeight">
        <ul class="nav-bar">
          <li
            class="nav-li"
            @click="NavSwich('Settlement', 1)"
            v-if="FeeSettlement_has()"
          >
            <span :class="{ on: isCheck == 1 }">结算领用</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('advance', 2)"
            v-if="FeeAdvance_has()"
          >
            <span :class="{ on: isCheck == 2 }">预支</span>
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
import Settlement from "./Settlement"; //走表分摊
import advance from "./advance"; //总表设置
export default {
  name: "AllocationSettings",
  data() {
    return {
      skzxcomp: "Settlement", //默认选中走表分摊
      isCheck: 1,
    };
  },
  mounted() {
    this.isCheck = this.FeeSettlement_has()
      ? 1
      : this.FeeAdvance_has()
      ? 2
      : "";
    this.skzxcomp = this.FeeSettlement_has()
      ? "Settlement"
      : this.FeeAdvance_has()
      ? "advance"
      : "";
    this.$nextTick(function () {
      this.$refs.NavCompChildren.getRowTable();
    });
  },
  methods: {
    FeeSettlement_has() {
      //维修登记权限
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("FeeSettlement_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    FeeAdvance_has() {
      //维修项目权限
      if (
        sessionStorage.getItem("buttenpremissions").indexOf("FeeAdvance_has") >
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
    Settlement,
    advance,
  },
};
</script>
<style lang="scss" scoped>
.AllocationSettings {
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
      right: 0;
      margin: 0;
      padding: 0;
      height: 36px;
      line-height: 36px;
      min-width: 600px;
      background: #ebecf2;
      z-index: 10;
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
