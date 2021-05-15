<template>
  <div class="container BillingApplication">
    <div class="el-content">
      <div class="nav_barHeight">
        <ul class="nav-bar">
          <li
            class="nav-li"
            @click="NavSwich('Uncollected', 1)"
            v-if="BAUncollected_has()"
          >
            <span :class="{ on: isCheck == 1 }">未收款开票</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('UncollectedSure', 2)"
            v-if="BAUncollectedSure_has()"
          >
            <span :class="{ on: isCheck == 2 }">未收款确认收入开票</span>
          </li>
          <!-- <li class="nav-li" @click="NavSwich('ImportUncollected',3)" v-if="BAImportUncollected_has()">
            <span :class="{'on':isCheck == 3}">导入未收款开票</span>
          </li>
          <li class="nav-li" @click="NavSwich('ImportReceived',4)" v-if="BAImportReceived_has()">
            <span :class="{'on':isCheck == 4}">导入已收款开票</span>
          </li>
          <li class="nav-li" @click="NavSwich('Received',5)" v-if="BAReceived_has()">
            <span :class="{'on':isCheck == 5}">已收款开票</span>
          </li> -->
          <li
            class="nav-li"
            @click="NavSwich('NotInvoiced', 6)"
            v-if="BANotInvoiced_has()"
          >
            <span :class="{ on: isCheck == 6 }">全部未交款未开票</span>
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
import ImportReceived from "./components/ImportReceived";
import ImportUncollected from "./components/ImportUncollected";
import Received from "./components/Received";
import Uncollected from "./components/Uncollected";
import UncollectedSure from "./components/UncollectedSure";
import NotInvoiced from "./components/NotInvoiced";
export default {
  name: "BillinGexamine",
  data() {
    return {
      skzxcomp: "Uncollected", //默认选中走表分摊
      isCheck: 1,
    };
  },
  mounted() {
    this.$nextTick(function () {
      // this.$refs.NavCompChildren.getRowTable();
    });
  },
  methods: {
    BAUncollected_has() {
      //
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("BAUncollected_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    BAUncollectedSure_has() {
      //
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("BAUncollectedSure_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    BAImportUncollected_has() {
      //
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("BAImportUncollected_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    BAImportReceived_has() {
      //
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("BAImportReceived_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    BAReceived_has() {
      //
      if (
        sessionStorage.getItem("buttenpremissions").indexOf("BAReceived_has") >
        -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    BANotInvoiced_has() {
      //
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("BANotInvoiced_has") > -1
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
    ImportReceived,
    ImportUncollected,
    Received,
    Uncollected,
    UncollectedSure,
    NotInvoiced,
  },
};
</script>
<style lang="scss" scoped>
.BillingApplication {
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
        width: 150px;
        height: 36px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: rgba(77, 77, 77, 1);
        background: rgba(214, 215, 220, 1);
        .on {
          display: block;
          position: absolute;
          width: 150px;
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
