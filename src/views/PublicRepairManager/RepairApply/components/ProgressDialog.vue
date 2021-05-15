<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="工程进度"
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
            prop="SSGC_WXDJNO"
            label="维修登记号"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="SSGC_FXMC"
            label="分项名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="SSGC_BW"
            label="部位"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="SSGC_DJ"
            label="单价"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="SSGC_SL"
            label="数量"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="SSGC_ZJQ"
            label="总价"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="SSGC_DW"
            label="单位"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="SSGC_KSRQ"
            label="开始日期"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="SSGC_JZRQ"
            label="截止日期"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="SSGC_SM"
            label="说明"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="SSGC_HD"
            label="核定"
            width="100"
          ></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
// import { QueryOpenBillDeailList } from "@/api/Financial/BillManagement";
export default {
  props: ["showProgressdialog"],
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
    getData(data) {
      this.tableData = data;
    },
  },
};
</script>
