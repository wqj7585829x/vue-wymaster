<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="收费相关信息"
      class="el-dialog-treble ChargeInformationDialog"
      :visible.sync="visible"
      @close="$emit('update:showdialogCharge', false)"
      :close-on-click-modal="false"
    >
      <section class="content_wrap">
        <h2></h2>
        <el-row>
          <!-- 表格 -->
          <el-table
            :data="RecetableData"
            border
            style="width: 100%"
            max-height="300"
            class="payment_table"
          >
            <el-table-column
              prop="SKPZ_TZRQ"
              label="交款日期"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="receiptWay"
              label="凭证号"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="SKPZ_JKR"
              label="交款人"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="SKMX_SKFYMC"
              label="收费项目名称"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="SKMX_SKJE"
              label="收款金额(含税)"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="SKMX_ZSJE"
              label="折算金额(含税)"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="SKMX_SL"
              label="税率(%)"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="SKMX_BHSJE"
              label="金额(不含税)"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="SKMX_SKFS"
              label="收款方式"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="SKPZ_PJMC"
              label="票据名"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="SKMX_SKFSLX"
              label="收款方式类型"
              width="100"
            ></el-table-column>
          </el-table>
        </el-row>
      </section>
      <section class="WXD_WRAP">
        <el-row>
          <!-- 表格 -->
          <el-table
            :data="WalktableData"
            border
            style="width: 100%"
            max-height="300"
            class="walk_table"
          >
            <el-table-column
              prop="ZBJS_BMC"
              label="表名称"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="SSNY"
              label="所属年月"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="ZBJS_BYDS"
              label="本月读数"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ZBJS_BYXD"
              label="本月行度"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ZBJS_SSYDS"
              label="上上月读数"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ZBJS_FTJE"
              label="分摊金额"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ZBJS_FTYL"
              label="分摊用量"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ZBJS_ZBDS"
              label="转表读数"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="ZBJS_ZBBZMC"
              label="走表标准名称"
            ></el-table-column>
          </el-table>
        </el-row>
      </section>
    </el-dialog>
  </div>
</template>
<script>
import {
  querReceiptList,
  querWalkList,
} from "@/api/FeeManagement/NotReceipted"; //未收清款项Api
export default {
  props: ["showdialogCharge", "tableRow", "FKGX_ZJ"],
  data() {
    return {
      title: "新增",
      visible: this.showdialogCharge,
      RecetableData: [], //交款明细
      WalktableData: [], //走表读数
    };
  },
  watch: {
    showdialogCharge() {
      this.visible = this.showdialogCharge;
      if (this.visible) {
        this.RecetableData = [];
        this.WalktableData = [];
        this.getReceiptData();
        this.getWalkData();
      }
    },
  },
  methods: {
    getReceiptData() {
      //交款明细
      querReceiptList(this.tableRow.FYSQ_ZJ).then((response) => {
        this.RecetableData = response;
      });
    },
    getWalkData() {
      //走表读数
      querWalkList(this.FKGX_ZJ, this.tableRow.FYSQ_SFXMWJ).then((response) => {
        this.WalktableData = response;
      });
    },
  },
};
</script>
<style lang="scss">
.ChargeInformationDialog {
  .WXD_WRAP {
    margin-top: 20px;
  }
}
</style>
