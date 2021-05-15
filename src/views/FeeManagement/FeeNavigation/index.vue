<template>
  <!-- 收费管理导航 -->
  <div>
    <section class="container feeNavigation_content">
      <div class="feeNavcontent feeNav2">
        <span>
          <!--<img src="@/assets/feeImgs/FeeNavigation2.png">
        <a href="javascript:void(0)" class="MeterReadIcon" title="抄表录入" @click="MeterReadIconClick"></a>
        <a href="javascript:void(0)" class="ApportionTableEntryIcon" title="分摊录入及计算" @click="ApportionTableEntryIconClick"></a>
        <a href="javascript:void(0)" class="ChargeGenerationIcon" title="费用生成" @click="ChargeGenerationIconClick"></a>
        <a href="javascript:void(0)" class="PrepaidRechargeIcon" title="预交充值管理" @click="PrepaidRechargeIconClick"></a>
        <a href="javascript:void(0)" class="CollectionRegIcon" title="收款登记" @click="CollectionRegIconClick"></a>
        <a href="javascript:void(0)" class="ApplicationPayIcon" title="交款管理" @click="ApplicationPayIconClick"></a>
        <a href="javascript:void(0)" class="ChargeMonthIcon" title="收费月结" @click="ChargeMonthIconClick"></a>-->
        </span>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "FeeNavigation",
  methods: {},
};
</script>
<style lang="scss" scoped>
.feeNavigation_content {
  margin-bottom: 15px;
}
.feeNavTitle {
  margin-top: -10px;
  margin-bottom: 20px;
  font-size: 20px;
  color: #666;
}
.feeNavcontent {
  margin: 0 auto;
  text-align: center;
}
.feeNav1 {
  //初始化阶段
  span {
    position: relative;
    display: block;
    width: 1001px;
    margin: 0 auto;
    .FinancialSetIcon {
      position: absolute;
      top: 0;
      left: 0;
      width: 102px;
      height: 127px;
      background: rgba(255, 255, 255, 0);
    }
    .StandardDefineIcon {
      position: absolute;
      top: 0;
      left: 224px;
      width: 102px;
      height: 127px;
      background: rgba(255, 255, 255, 0);
    }
    .StandardSelectionIcon {
      position: absolute;
      top: 0;
      left: 450px;
      width: 102px;
      height: 127px;
      background: rgba(255, 255, 255, 0);
    }
    .ApportionTableSettingIcon {
      position: absolute;
      top: 0;
      left: 680px;
      width: 102px;
      height: 127px;
      background: rgba(255, 255, 255, 0);
    }
    .BillCenterIcon {
      position: absolute;
      top: 0;
      left: 910px;
      width: 102px;
      height: 127px;
      background: rgba(255, 255, 255, 0);
    }
  }
}
.feeNav2 {
  //日常使用阶段
  span {
    position: relative;
    display: block;
    width: 998px;
    margin: 0 auto;
    .MeterReadIcon {
      position: absolute;
      top: 0;
      left: 65px;
      width: 130px;
      height: 139px;
      background: rgba(255, 255, 255, 0);
    }
    .ApportionTableEntryIcon {
      position: absolute;
      top: 143px;
      left: 65px;
      width: 130px;
      height: 139px;
      background: rgba(255, 255, 255, 0);
    }
    .ChargeGenerationIcon {
      position: absolute;
      top: 50px;
      left: 375px;
      width: 130px;
      height: 139px;
      background: rgba(255, 255, 255, 0);
    }
    .PrepaidRechargeIcon {
      position: absolute;
      top: 60px;
      left: 615px;
      width: 130px;
      height: 139px;
      background: rgba(255, 255, 255, 0);
    }
    .CollectionRegIcon {
      position: absolute;
      top: 200px;
      right: 0px;
      width: 140px;
      height: 170px;
      background: rgba(255, 255, 255, 0);
    }
    .ApplicationPayIcon {
      position: absolute;
      bottom: 0px;
      right: 230px;
      width: 130px;
      height: 139px;
      background: rgba(255, 255, 255, 0);
    }
    .ChargeMonthIcon {
      position: absolute;
      bottom: 0px;
      right: 490px;
      width: 130px;
      height: 139px;
      background: rgba(255, 255, 255, 0);
    }
  }
}
</style>
