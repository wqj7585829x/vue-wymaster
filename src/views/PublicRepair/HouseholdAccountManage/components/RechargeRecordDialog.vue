<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="公维金充值明细"
      class="el-dialog-double"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="$emit('update:showRechargeRecord', false)"
    >
      <el-row>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          class="tableContent"
        >
          <el-table-column
            prop="money"
            label="充值金额"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="createDate"
            label="充值日期"
            width="200"
          ></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { PubRepFundRecharge_Select } from "@/api/PublicRepair/HouseholdAccountManage"; //js

export default {
  data() {
    return {
      visible: this.showRechargeRecord,
      tableData: [],
    };
  },
  props: {
    showRechargeRecord: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showRechargeRecord() {
      this.visible = this.showRechargeRecord;
    },
  },
  methods: {
    getData(fundAccountID) {
      this.getTableData(fundAccountID);
    },
    // 获取 表 数据
    getTableData(fundAccountID) {
      var data = { fundAccountID: fundAccountID };
      PubRepFundRecharge_Select(data).then((response) => {
        this.tableData = response.returnData;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.tableContent {
  max-height: 400px;
  overflow: auto;
}
</style>
