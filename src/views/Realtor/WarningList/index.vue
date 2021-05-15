<template>
  <div class="container LessorInformation">
    <!-- 右边内容区域 -->
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form label-width="120px">
          <el-row :gutter="30">
            <el-col :span="6" style="width: 300px">
              <el-form-item label="项目名称:" label-width="100px">
                <el-select v-model="tableParameter.plotId" clearable>
                  <el-option
                    v-for="item in projectNameData"
                    :key="item.plotId"
                    :value="item.plotId"
                    :label="item.plotName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="width: 0">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'WarningListSearch_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 按钮区域start -->
      <el-row class="sysCon_Mt">
        <el-table
          :data="tableData"
          style="width: 80%"
          border
          class="tableContent"
          ref="singleTable"
          @row-click="rowClick"
        >
          <el-table-column prop="message" label="预警信息"></el-table-column>
        </el-table>
      </el-row>
    </div>
  </div>
</template>
<script>
import {
  queryContractEarlyWarning,
  queryPlotsWithAuthority,
} from "@/api/Realtor/Contractwarning";
export default {
  name: "LessorInformation",
  data() {
    return {
      disabledAdd: false, //新增
      disabledupdate: true, //修改
      disabledelete: true, //删除
      radio: "", //选中
      tableData: [],
      projectNameData: [],
      tableRow: {},
      showdialog: false,
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      tableParameter: {
        pageIndex: 0,
        pageSize: 10,
        plotId: "",
      },
    };
  },
  mounted() {
    this.queryAuthtorquest(); //项目名称查询
  },
  methods: {
    handleCurrentChange(currentPage) {
      //分页点击
      this.tableParameter.pageIndex = currentPage - 1;
      this.queryOrgan();
      this.radio = ""; //清空选中
    },
    rowClick(row) {
      //表格单行点击
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },

    queryOrgan() {
      //查询表格数据
      queryContractEarlyWarning(this.tableParameter).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    queryAuthtorquest() {
      //项目名称
      queryPlotsWithAuthority().then((response) => {
        this.projectNameData = response;
        if (sessionStorage.getItem("plotItem") == null) {
          this.tableParameter.plotId = "";
          this.queryOrgan(); //查询列表
        } else {
          var parent = this.projectNameData;
          var children = JSON.parse(sessionStorage.getItem("plotItem"));
          var index = parent.findIndex(
            (d) =>
              d.GLCID === children.GLCID &&
              d.YXDID === children.YXDID &&
              d.dbName === children.dbName
          ); //寻找data的索引
          this.tableParameter.plotId = index >= 0 ? parent[index].plotId : "";
          this.queryOrgan(); //查询列表
        }
      });
    },
    submit() {
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      this.radio = "";
      this.tableRow = "";
      this.queryOrgan();
    },
  },
};
</script>
<style lang="scss">
.LessorInformation {
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
