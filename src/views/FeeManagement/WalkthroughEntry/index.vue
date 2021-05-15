<template>
  <div class="container WalkthroughEntry" ref="elContentH">
    <!--头部切换-->
    <div class="el-content">
      <div class="nav_barHeight">
        <ul class="nav-bar">
          <li
            class="nav-li"
            @click="NavSwich('ChargeEntry', 1)"
            v-if="this.WalthroughChargeEntry_has()"
          >
            <span :class="{ on: isCheck == 1 }">走表录入</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('TotalreadingEntry', 2)"
            v-if="this.WalthroughTotalreadingEntry_has()"
          >
            <span :class="{ on: isCheck == 2 }">分摊录入</span>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
    <!-- 各个模块组件 -->
    <!-- <keep-alive> -->
    <component :is="skzxcomp" ref="NavCompChildren"></component>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import ChargeEntry from "./ChargeEntry"; //收费数据录入
import TotalreadingEntry from "./TotalreadingEntry"; //总表读数录入
export default {
  name: "WalkthroughEntry",
  data() {
    return {
      skzxcomp: "ChargeEntry", //默认选中收费数据录入
      isCheck: 1,
    };
  },
  mounted() {
    this.isCheck = this.WalthroughChargeEntry_has()
      ? 1
      : this.WalthroughTotalreadingEntry_has()
      ? 2
      : "";
    this.skzxcomp = this.WalthroughChargeEntry_has()
      ? "ChargeEntry"
      : this.WalthroughTotalreadingEntry_has()
      ? "TotalreadingEntry"
      : "";
    if (this.isCheck != "") {
      this.$nextTick(function () {
        this.$refs.NavCompChildren.getRowTable();
      });
    }
  },
  methods: {
    WalthroughChargeEntry_has() {
      //收费数据录入
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("WalthroughChargeEntry_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    WalthroughTotalreadingEntry_has() {
      //总表读数录入
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("WalthroughChargeEntry_has") > -1
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
    ChargeEntry,
    TotalreadingEntry,
  },
};
</script>
<style lang="scss" scoped>
.WalkthroughEntry {
  padding: 0 !important;
  overflow: hidden;
  .el-content {
    padding: 0;
    .nav_barHeight {
      height: 36px;
    }
    .nav-bar {
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
          position: absolute;
          width: 120px;
          background: #2e8ad7;
          top: 0;
          left: 0;
          height: 36px;
          background: rgba(255, 255, 255, 1);
          border-radius: 0px 8px 0px 0px;
          overflow: hidden;
          color: #2e8ad7;
        }
      }
      :last-child {
        border-top-right-radius: 8px;
      }
    }
  }
}
</style>
