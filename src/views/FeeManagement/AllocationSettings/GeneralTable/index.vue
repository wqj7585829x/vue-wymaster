<template>
  <div class="container GeneralTable">
    <!-- 内容区域 -->
    <div class="el-content">
      <!-- 按钮begin -->
      <el-form label-width="85px">
        <el-row :gutter="30">
          <el-col :span="5" style="width: 300px">
            <el-form-item label="总表名称:" label-width="80px">
              <el-input v-model="queryBuildPage.FTZB_ZBMC" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5" style="width: 300px">
            <el-button type="success" @click="handleCurrentChange(1)"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮end -->

      <!-- 按钮begin -->
      <div class="button buttonBox">
        <el-button type="primary" @click="addTable" v-has="'AlloAdd_has'"
          >新增总表</el-button
        >
        <el-button
          type="primary"
          @click="eidtTable"
          :disabled="disableddo"
          v-has="'AlloEdit_has'"
          >修改</el-button
        >
        <el-button
          type="danger"
          @click="deletePartition"
          :disabled="disableddo"
          v-has="'AlloDel_has'"
          >删除</el-button
        >
      </div>
      <!-- 按钮end -->

      <!-- 客户详情begin -->
      <div class="customedetail">
        <el-table
          ref="singleTable"
          :data="tableData"
          max-height="500"
          border
          style="width: 100%"
          @row-click="rowclick"
        >
          <el-table-column label="选择" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="FTZB_ZBMC" label="总表名称" width="300">
          </el-table-column>
          <el-table-column prop="FTZB_FTLB" label="分摊类别" width="180">
          </el-table-column>
          <el-table-column prop="FTZB_FTFS" label="分摊方式" width="210">
          </el-table-column>
          <el-table-column prop="FTZB_SFXMMC" label="分摊项目名称" width="180">
          </el-table-column>
          <el-table-column prop="XSXMMC" label="系数项目名称" width="180">
          </el-table-column>
          <el-table-column prop="FTZB_BBL" label="表倍率" width="90">
          </el-table-column>
          <el-table-column prop="FTZB_FTBL" label="分摊比例" width="120">
          </el-table-column>
          <el-table-column prop="FTZB_ZBJS" label="转表基数"> </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > queryBuildPage.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="queryBuildPage.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->
    <TableDialog
      :show.sync="show"
      ref="TableDialog"
      @RefreshItem="RefreshList"
    ></TableDialog>
  </div>
</template>
<script>
import {
  queryTotalTable,
  deleteTotalTable,
} from "@/api/FeeManagement/AllocationSettings";
import TableDialog from "./components/TableDialog"; //新增总表,修改
export default {
  name: "GeneralTable",
  data() {
    return {
      tableData: [], //列表参数
      disableddo: true,
      radio: "", //单选按钮
      show: false, //新增 弹框 标识
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      queryBuildPage: {
        // 查询表
        pageIndex: 0,
        pageSize: 10,
        FTZB_ZBMC: "",
      },
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disableddo = false;
      } else {
        this.disableddo = true;
      }
    },
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.queryBuildPage.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    getRowTable() {},
    rowclick(row) {
      //单行点击单选按钮选中
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    // 表数据
    getTableData() {
      queryTotalTable(this.queryBuildPage).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    //新增总表
    addTable() {
      this.show = true;
      this.$refs.TableDialog.getPartitionData({}, 0);
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    //编辑总表
    eidtTable() {
      this.show = true;
      this.$refs.TableDialog.getPartitionData(this.tableRow, 1);
    },
    // 删除总表
    deletePartition() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteTotalTable(this.tableRow).then((response) => {
            this.radio = ""; //选择后清空选中表格按钮
            this.tableRow = {}; //选择后清空选中表格数据
            this.RefreshList();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    RefreshList(newobj) {
      queryTotalTable(this.queryBuildPage).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.tableRow = this.tableData[this.radio];
      });
    },
  },
  components: {
    TableDialog,
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
<style>
.container .el-input-number {
  width: auto;
}
</style>
