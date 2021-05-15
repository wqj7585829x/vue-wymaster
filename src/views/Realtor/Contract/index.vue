<template>
  <div class="container RepairRegister">
    <div class="el-content">
      <div class="nav_barHeight">
        <ul class="nav-bar">
          <li
            class="nav-li"
            @click="NavSwich('list', 1)"
            v-if="ContractList_has()"
          >
            <span :class="{ on: isCheck == 1 }">合同列表</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('live', 2)"
            v-if="ContractLive_has()"
          >
            <span :class="{ on: isCheck == 2 }">入住移交</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('change', 3)"
            v-if="ContractChange_has()"
          >
            <span :class="{ on: isCheck == 3 }">合同变更</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('Apply', 4)"
            v-if="ContractApply_has()"
          >
            <span :class="{ on: isCheck == 4 }">退租申请</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('test', 5)"
            v-if="ContractTest_has()"
          >
            <span :class="{ on: isCheck == 5 }">验房</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('Settlement', 6)"
            v-if="ContractSettlement_has()"
          >
            <span :class="{ on: isCheck == 6 }">结算清单</span>
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
import Apply from "./components/Apply";
import change from "./components/change";
import list from "./components/list";
import live from "./components/live";
import Settlement from "./components/Settlement";
import test from "./components/test";
export default {
  name: "RepairRegister",
  data() {
    return {
      skzxcomp: "list", //默认选中走表分摊
      isCheck: 1,
    };
  },
  mounted() {
    this.$nextTick(function () {
      // this.$refs.NavCompChildren.getRowTable();
    });
  },
  methods: {
    ContractList_has() {
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ContractList_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ContractLive_has() {
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ContractLive_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ContractChange_has() {
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ContractChange_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ContractApply_has() {
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ContractApply_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ContractTest_has() {
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ContractTest_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ContractSettlement_has() {
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ContractSettlement_has") > -1
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
        // this.$refs.NavCompChildren.getRowTable();
      });
    },
  },
  components: {
    Apply,
    change,
    list,
    live,
    Settlement,
    test,
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
      background: #eceef2;
    }
    .nav-bar {
      position: absolute;
      z-index: 10;
      left: 10px;
      right: 10px;
      margin: 0;
      padding: 0;
      border-bottom: 1px solid #eceef2;
      height: 36px;
      line-height: 36px;
      min-width: 750px;
      background: #eceef2;
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
      :nth-child(6) {
        border-top-right-radius: 8px;
      }
    }
  }
}
</style>
