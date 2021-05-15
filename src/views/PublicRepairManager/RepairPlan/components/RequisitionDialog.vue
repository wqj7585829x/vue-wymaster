<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="对应申请单"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="$emit('update:showProgressdialog', false)"
      :close-on-click-modal="false"
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
            prop="WXD_WXDJNO"
            label="登记单号"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="WXD_NO"
            label="维修单号"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="WXD_XMMC"
            label="维修项目"
            width="150"
          ></el-table-column>
          <el-table-column prop="SPZT" label="审批状态"></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { queryRequisition } from "@/api/PublicRepairManager/RepairPlan"; //维修方案
export default {
  props: ["showProgressdialog", "WXDJ_ZJ"],
  data() {
    return {
      visible: this.showProgressdialog,
      tableData: [],
    };
  },
  watch: {
    showProgressdialog() {
      this.visible = this.showProgressdialog;
    },
  },
  methods: {
    getData(WXFA_ZJ) {
      this.getTableList(WXFA_ZJ);
    },
    getTableList(val) {
      //对应申请单列表
      queryRequisition(val).then((response) => {
        this.tableData = response;
      });
    },
  },
};
</script>
