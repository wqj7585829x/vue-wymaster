<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="公维金使用记录"
      class="el-dialog-double"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="$emit('update:showUseRecord', false)"
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
            prop="pubProjectName"
            label="维修项目"
          ></el-table-column>
          <el-table-column
            prop="repairDate"
            label="报修日期"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="money"
            label="分摊金额"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="shareDate"
            label="分摊日期"
            width="200"
          ></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { PubRepFundShare_Select } from "@/api/PublicRepair/HouseholdAccountManage"; //js
export default {
  data() {
    return {
      visible: this.showUseRecord,
      tableData: [],
    };
  },
  props: {
    showUseRecord: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showUseRecord() {
      this.visible = this.showUseRecord;
    },
  },
  methods: {
    getData(fundAccountID) {
      this.getTableData(fundAccountID);
    },
    // 获取 表 数据
    getTableData(fundAccountID) {
      var data = { fundAccountID: fundAccountID };
      PubRepFundShare_Select(data).then((response) => {
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
