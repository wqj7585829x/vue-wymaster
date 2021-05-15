<template>
  <div class="container ParameterSettings">
    <!--头部切换-->
    <div class="el-content">
      <div class="nav_barHeight">
        <ul class="nav-bar">
          <li
            class="nav-li"
            @click="NavSwich('ChargeDateparam', 1)"
            v-if="this.ParameChargeDateparam_has()"
          >
            <span :class="{ on: isCheck == 1 }">收费日期类设定</span>
          </li>
          <li class="nav-li" @click="NavSwich('ChargeControl', 5)">
            <span :class="{ on: isCheck == 5 }">收费控制</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('Noticenote', 2)"
            v-if="this.ParameNoticenote_has()"
          >
            <span :class="{ on: isCheck == 2 }">通知单备注设定</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('PaymentMethod', 3)"
            v-if="this.ParamePaymentMethod_has()"
          >
            <span :class="{ on: isCheck == 3 }">收款方式设置</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('Initialize', 4)"
            v-if="this.ParameInitialize_has()"
          >
            <span :class="{ on: isCheck == 4 }">收费参数初始化</span>
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
import ChargeDateparam from "./ChargeDateparam"; //收费日期参数设置
import ChargeControl from "./ChargeControl"; //收费控制
import Noticenote from "./Noticenote"; //通知单备注设置
import PaymentMethod from "./PaymentMethod"; //收款方式设置
import Initialize from "./Initialize"; //收费参数初始化
export default {
  name: "ParameterSettings",
  data() {
    return {
      skzxcomp: "ChargeDateparam", //默认选中收费日期参数设置
      isCheck: 1,
    };
  },
  mounted() {
    this.isCheck = this.ParameChargeDateparam_has()
      ? 1
      : this.ParameNoticenote_has()
      ? 2
      : this.ParamePaymentMethod_has()
      ? 3
      : this.ParameInitialize_has()
      ? 4
      : this.ParameChargeControlparam_has()
      ? 5
      : "";
    this.skzxcomp = this.ParameChargeDateparam_has()
      ? "ChargeDateparam"
      : this.ParameNoticenote_has()
      ? "Noticenote"
      : this.ParamePaymentMethod_has()
      ? "PaymentMethod"
      : this.ParameInitialize_has()
      ? "Initialize"
      : this.ParameChargeControlparam_has()
      ? "ChargeControl"
      : "";
    if (this.isCheck != "") {
      this.$nextTick(function () {
        this.$refs.NavCompChildren.getRowTable();
      });
    }
  },
  methods: {
    ParameChargeDateparam_has() {
      //收费日期参数设置
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ParameChargeDateparam_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ParameNoticenote_has() {
      //通知单备注设置
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ParameNoticenote_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ParamePaymentMethod_has() {
      //通知单备注设置
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ParamePaymentMethod_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ParameInitialize_has() {
      //通知单备注设置
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ParameInitialize_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ParameChargeControlparam_has() {
      //收费控制
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ParameChargeControlparam_has") > -1
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
    ChargeDateparam,
    ChargeControl,
    Noticenote,
    PaymentMethod,
    Initialize,
  },
};
</script>
<style lang="scss" scoped>
.ParameterSettings {
  padding: 0 !important;
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
          width: 120px;
          background: #2e8ad7;
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
