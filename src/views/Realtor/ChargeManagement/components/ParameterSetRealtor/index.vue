<template>
  <div class="ParameterSetRealtor">
    <el-tabs v-model="skzxcomp" @tab-click="handleClick">
      <!-- <el-tab-pane label="收费日期类设定" name="ChargeDateparamRealtor"></el-tab-pane> -->
      <el-tab-pane
        label="通知单备注设定"
        name="NoticenoteRealtor"
        v-if="this.ParameNoticenoteRealtor_has()"
      ></el-tab-pane>
      <el-tab-pane
        label="收款方式"
        name="PaymentMethodRealtor"
        v-if="this.ParamePaymentRealtor_has()"
      ></el-tab-pane>
    </el-tabs>
    <!-- 各个模块组件 -->
    <!-- <keep-alive> -->
    <component :is="skzxcomp" ref="NavCompChildren"></component>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import ChargeDateparamRealtor from "./components/ChargeDateparamRealtor"; //收费日期类设定
import NoticenoteRealtor from "./components/NoticenoteRealtor"; //收费日期类设定
import PaymentMethodRealtor from "./components/PaymentMethodRealtor"; //收费日期类设定
export default {
  components: {
    ChargeDateparamRealtor,
    NoticenoteRealtor,
    PaymentMethodRealtor,
  },
  data() {
    return {
      skzxcomp: "NoticenoteRealtor",
    };
  },
  mounted() {
    this.skzxcomp = this.ParameNoticenoteRealtor_has()
      ? "NoticenoteRealtor"
      : this.ParamePaymentRealtor_has()
      ? "PaymentMethodRealtor"
      : "";
  },
  methods: {
    handleClick(tab, event) {
      this.skzxcomp = tab.name;
    },
    ParameNoticenoteRealtor_has() {
      //通知单备注设定
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ParameNoticenoteRealtor_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ParamePaymentRealtor_has() {
      //收款方式
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ParamePaymentRealtor_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
.ParameterSetRealtor {
  margin: 20px 20px 30px;
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__item.is-active {
    color: #2e8ad7;
  }
  .el-tabs__active-bar {
    background-color: #2e8ad7;
    height: 3px;
  }
}
</style>
