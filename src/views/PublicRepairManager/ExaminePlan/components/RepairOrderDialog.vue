<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="维修单"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="$emit('update:showWXDdialog', false)"
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
            prop="WXD_NO"
            label="维修单编号"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXD_WXDJNO"
            label="维修单登记号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="WXD_YSFY"
            label="预算费用"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="WXD_KDR"
            label="开单人"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="WXD_KDSJ"
            label="开单日期"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="WXD_JDR"
            label="接单人"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="WXD_JDSJ"
            label="接单日期"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXD_YYXWSJ"
            label="预约维修日期"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXD_KGSJ"
            label="开工时间"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXD_WGSJ"
            label="完工时间"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXD_GCSM"
            label="工程说明"
            width="100"
          ></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getRepairOrder } from "@/api/PublicRepairManager/ExaminePlan"; //审核方案
export default {
  props: ["showAcceptdialog", "tableRow"],
  data() {
    return {
      title: "新增",
      visible: this.showWXDdialog,
      tableData: [],
    };
  },
  watch: {
    showWXDdialog() {
      this.visible = this.showWXDdialog;
      if (this.visible) {
        this.getTableList();
      }
    },
  },
  methods: {
    getTableList() {
      getRepairOrder(this.tableRow.WXFA_ZJ).then((response) => {
        this.tableData = response;
      });
    },
  },
};
</script>
