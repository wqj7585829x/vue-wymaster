<template>
  <div class="Feeregistration">
    <div ref="tabbarReft">
      <el-tabs v-model="skzxcomp" @tab-click="handleClick">
        <el-tab-pane
          label="未收清费用"
          name="ReceiptRegistration"
          v-if="this.FeeregistrationReceipt_has()"
        ></el-tab-pane>
        <el-tab-pane
          label="已收清费用"
          name="ClearedReceipt"
          v-if="this.FeeregistrationClearedReceipt_has()"
        ></el-tab-pane>
        <el-tab-pane
          label="收款凭证"
          name="CredentialsList"
          v-if="this.FeeregistrationCredentialsList_has()"
        ></el-tab-pane>
        <el-tab-pane
          label="押金/保证金"
          name="SecurityDeposit"
          v-if="this.FeeregistrationSecurityDeposit_has()"
        >
        </el-tab-pane>
        <el-tab-pane
          label="违约金"
          name="LiquidatedDamages"
          v-if="this.FeeregistrationLiquidatedDamages_has()"
        >
        </el-tab-pane>
        <el-tab-pane
          label="票据"
          name="TicketList"
          v-if="this.FeeregistrationTicketList_has()"
        ></el-tab-pane>
        <!-- <el-tab-pane label="电子发票" name="ElectronicTicketList" v-if="this.FeeregistrationElectronicTicketList_has()">
        </el-tab-pane> -->
      </el-tabs>
    </div>

    <!-- 各个模块组件 -->
    <!-- <keep-alive> -->
    <component :is="skzxcomp" ref="NavCompChildren"></component>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import ReceiptRegistration from "../../../ReceiptRegistration"; //未收清费用
import ClearedReceipt from "../../../ClearedReceipt"; //未收清费用
import CredentialsList from "../../../CredentialsList"; //收款凭证
import SecurityDeposit from "../../../SecurityDeposit"; //押金/保证金
import LiquidatedDamages from "../../../LiquidatedDamages"; //违约金
import TicketList from "../../../TicketList"; //票据
import ElectronicTicketList from "../../../ElectronicTicketList"; //电子发票
export default {
  components: {
    ReceiptRegistration,
    ClearedReceipt,
    CredentialsList,
    SecurityDeposit,
    LiquidatedDamages,
    TicketList,
    ElectronicTicketList,
  },
  data() {
    return {
      skzxcomp: "ReceiptRegistration",
    };
  },
  mounted() {
    this.skzxcomp = this.FeeregistrationReceipt_has()
      ? "ReceiptRegistration"
      : this.FeeregistrationClearedReceipt_has()
      ? "ClearedReceipt"
      : this.FeeregistrationCredentialsList_has()
      ? "CredentialsList"
      : this.FeeregistrationSecurityDeposit_has()
      ? "SecurityDeposit"
      : this.FeeregistrationLiquidatedDamages_has()
      ? "LiquidatedDamages"
      : this.FeeregistrationTicketList_has()
      ? "TicketList"
      : this.FeeregistrationElectronicTicketList_has()
      ? "ElectronicTicketList"
      : "";
  },
  methods: {
    handleClick(tab, event) {
      this.skzxcomp = tab.name;
    },
    FeeregistrationReceipt_has() {
      //未收清费用
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("FeeregistrationReceipt_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    FeeregistrationClearedReceipt_has() {
      //已收清费用
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("FeeregistrationClearedReceipt_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    FeeregistrationCredentialsList_has() {
      //收款凭证
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("FeeregistrationCredentialsList_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    FeeregistrationSecurityDeposit_has() {
      //押金/保证金
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("FeeregistrationSecurityDeposit_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    FeeregistrationLiquidatedDamages_has() {
      //违约金
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("FeeregistrationLiquidatedDamages_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    FeeregistrationTicketList_has() {
      //票据
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("FeeregistrationTicketList_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    FeeregistrationElectronicTicketList_has() {
      //电子发票
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("FeeregistrationElectronicTicketList_has") > -1
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
.Feeregistration {
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
