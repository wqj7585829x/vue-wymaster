<template>
  <div class="container ChargeManagement" ref="heightRef">
    <!--头部切换-->
    <div class="el-content">
      <div class="nav_barHeight">
        <ul class="nav-bar">
          <li
            class="nav-li"
            @click="NavSwich('ParameterSetRealtor', 1)"
            v-if="this.ChargeParameterSet_has()"
          >
            <span :class="{ on: isCheck == 1 }">参数设置</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('CalculationClause', 2)"
            v-if="this.ChargeCalcula_has()"
          >
            <span :class="{ on: isCheck == 2 }">计费条款</span>
          </li>
          <!-- <li class="nav-li" @click="NavSwich('GenerateReceipt',3)">
            <span :class="{'on':isCheck == 3}">生成收款单</span>
          </li> -->
          <li
            class="nav-li"
            @click="NavSwich('Feeregistration', 4)"
            v-if="this.ChargeFeeregistration_has()"
          >
            <span :class="{ on: isCheck == 4 }">收费登记</span>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
    <!-- 各个模块组件 -->
    <!-- <keep-alive> -->
    <component :is="skzxcomp" ref="NavCompChildrens"></component>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import ParameterSetRealtor from "./components/ParameterSetRealtor"; //参数设置
import CalculationClause from "../CalculationClause"; //计费条款
import Feeregistration from "./components/Feeregistration"; //收费登记
// import GenerateReceipt from "./components/GenerateReceipt"; //生成收款单
export default {
  name: "ChargeManagement",
  components: {
    ParameterSetRealtor,
    CalculationClause,
    Feeregistration,
    // GenerateReceipt
  },
  data() {
    return {
      skzxcomp: "ParameterSetRealtor", //默认选中参数设置
      isCheck: 1,
    };
  },
  mounted() {
    this.isCheck = this.ChargeParameterSet_has()
      ? 1
      : this.ChargeCalcula_has()
      ? 2
      : this.ChargeFeeregistration_has()
      ? 3
      : "";
    this.skzxcomp = this.ChargeParameterSet_has()
      ? "ParameterSetRealtor"
      : this.ChargeCalcula_has()
      ? "CalculationClause"
      : this.ChargeFeeregistration_has()
      ? "Feeregistration"
      : "";
  },
  methods: {
    /**标签选项切换*/
    NavSwich(val, index) {
      this.skzxcomp = val;
      this.isCheck = index;
    },
    ChargeParameterSet_has() {
      //参数设置
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ChargeParameterSet_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ChargeCalcula_has() {
      //计费条款
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ChargeCalcula_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ChargeFeeregistration_has() {
      //收费登记
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ChargeFeeregistration_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.ChargeManagement {
  padding: 0 !important;
  background: #fff;
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
