<template>
  <div class="container PubRepair_ParameterSetting">
    <!--头部切换-->
    <div class="el-content">
      <div class="nav_barHeight">
        <ul class="nav-bar">
          <li
            class="nav-li"
            @click="NavSwich('AdvanceSet', 1)"
            v-if="this.ParameAdvanceSet_has()"
          >
            <span :class="{ on: isCheck == 1 }">预支设置</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('DeliveryfeeWaySet', 2)"
            v-if="this.ParameDeliveryfeeWaySet_has()"
          >
            <span :class="{ on: isCheck == 2 }">传递费用设置</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('FormSet', 3)"
            v-if="this.ParameFormSet_has()"
          >
            <span :class="{ on: isCheck == 3 }">表单设置</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('CostSet', 4)"
            v-if="this.ParameCostSet_has()"
          >
            <span :class="{ on: isCheck == 4 }">费用设置</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('Initialize', 5)"
            v-if="this.ParameInitialize_has()"
          >
            <span :class="{ on: isCheck == 5 }">公维金参数初始化</span>
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
import AdvanceSet from "./AdvanceSet"; //预支设置
import DeliveryfeeWaySet from "./DeliveryfeeWaySet"; //传递费用方式设置
import FormSet from "./FormSet"; //表单设置
import CostSet from "./CostSet"; //费用设置
import Initialize from "./Initialize"; //参数初始化
export default {
  name: "ParameterSetting",
  data() {
    return {
      skzxcomp: "AdvanceSet", //默认选中收费日期参数设置
      isCheck: 1,
    };
  },
  mounted() {
    this.isCheck = this.ParameAdvanceSet_has()
      ? 1
      : this.ParameDeliveryfeeWaySet_has()
      ? 2
      : this.ParameFormSet_has()
      ? 3
      : this.ParameCostSet_has()
      ? 4
      : "";
    this.skzxcomp = this.ParameAdvanceSet_has()
      ? "AdvanceSet"
      : this.ParameDeliveryfeeWaySet_has()
      ? "DeliveryfeeWaySet"
      : this.ParameFormSet_has()
      ? "FormSet"
      : this.ParameCostSet_has()
      ? "CostSet"
      : "";
    if (this.isCheck != "") {
      this.$nextTick(function () {
        this.$refs.NavCompChildren.getRowTable();
      });
    }
  },
  methods: {
    ParameAdvanceSet_has() {
      //预支设置
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ParameAdvanceSet_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ParameDeliveryfeeWaySet_has() {
      //传递费用方式设置
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ParameDeliveryfeeWaySet_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ParameFormSet_has() {
      //表单设置
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ParameFormSet_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ParameInitialize_has() {
      //公维金初始化
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
    ParameCostSet_has() {
      //费用设置
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ParameCostSet_has") > -1
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
    AdvanceSet,
    DeliveryfeeWaySet,
    FormSet,
    CostSet,
    Initialize,
  },
};
</script>
<style lang="scss" scoped>
.PubRepair_ParameterSetting {
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
