<template>
  <div class="EngineeringProgress">
    <!-- 右边内容区域 -->
    <div class="el-content">
      <!-- 表格 -->
      <el-row class="sysCon_Mt">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="350"
          border
          class="tableContent"
          ref="singleTable"
        >
          <el-table-column
            prop="SSGC_WXDJNO"
            label="维修登记号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="SSGC_FXMC"
            label="分项名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="SSGC_BW"
            label="部位"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="SSGC_DJ"
            label="单价"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="SSGC_SL"
            label="数量"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="SSGC_ZJQ"
            label="总价"
            width="100"
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
            width="200"
          ></el-table-column>
          <el-table-column prop="SSGC_HD" label="核定"></el-table-column>
        </el-table>
      </el-row>
    </div>
  </div>
</template>
<script>
import { queryProjectProgress } from "@/api/PublicRepairManager/ProjectSettlement"; //工程结算Api
export default {
  name: "EngineeringProgress",
  data() {
    return {
      tableData: [],
      tableRow: {}, //修改数据
      showdialog: false,
      tableParameter: {},
      optType: 1, //1大项目  2小项目
      showdialogSet: false,
    };
  },
  methods: {
    RecequeryByPage(data, type) {
      this.optType = type;
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      this.tableParameter.CHECK = this.optType;
      if (this.optType == 1) {
        this.tableParameter.SSGC_WXWJ = this.tableParameter.WXFA_ZJ;
      } else {
        this.tableParameter.SSGC_WXWJ = this.tableParameter.WXDJ_ZJ;
      }
      this.getTableList();
    },
    getTableList() {
      //表格数据查询
      queryProjectProgress(this.tableParameter).then((response) => {
        this.tableData = response;
        this.$emit("RefreshItem", this.tableData.length);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-body {
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-paginationR {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
