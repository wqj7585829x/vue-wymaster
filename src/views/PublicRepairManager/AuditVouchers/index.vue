<template>
  <div class="container AuditVouchers">
    <!--头部切换-->
    <div class="el-content">
      <div class="nav_barHeight">
        <ul class="nav-bar">
          <li
            class="nav-li"
            @click="NavSwich('NonFinancialAudit', 1)"
            v-if="this.PublicRepairNonFinancialAudit_has()"
          >
            <span :class="{ on: isCheck == 1 }">非财务审核</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('FinancialAudit', 2)"
            v-if="this.PublicRepairFinancialAudit_has()"
          >
            <span :class="{ on: isCheck == 2 }">财务审核</span>
          </li>
        </ul>
      </div>
      <div>
        <!-- 各个模块组件 -->
        <!-- <keep-alive> -->
        <component :is="skzxcomp" ref="NavCompChildren"></component>
        <!-- </keep-alive> -->
      </div>
    </div>
  </div>
</template>
<script>
import NonFinancialAudit from "./NonFinancialAudit"; //非财务审核
import FinancialAudit from "./FinancialAudit"; //财务审核
export default {
  name: "AuditVouchers",
  data() {
    return {
      skzxcomp: "NonFinancialAudit", //默认选中收费日期参数设置
      isCheck: 1,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.$refs.NavCompChildren.getRowTable();
    });
  },
  methods: {
    PublicRepairNonFinancialAudit_has() {
      //非财务审核
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("PublicRepairNonFinancialAudit_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    PublicRepairFinancialAudit_has() {
      //财务审核
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("PublicRepairFinancialAudit_has") > -1
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
    NonFinancialAudit,
    FinancialAudit,
  },
};
</script>
<style lang="scss">
.AuditVouchers {
  padding: 0 !important;
  .el-content {
    padding: 0;
    .nav_barHeight {
      height: 48px;
    }
    .nav-bar {
      background: #fff;
      margin: 0;
      padding: 0;
      height: 36px;
      line-height: 36px;
      background: #ebecf2;
      z-index: 10000;
      .nav-li {
        position: relative;
        list-style-type: none;
        float: left;
        width: 148px;
        height: 36px;
        text-align: center;
        font-size: 14px;
        color: rgba(77, 77, 77, 1);
        background: rgba(214, 215, 220, 1);
        .on {
          display: block;
          width: 148px;
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
