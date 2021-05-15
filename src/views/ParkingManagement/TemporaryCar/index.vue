<template>
  <div class="container">
    <!-- 按钮begin -->
    <el-form label-width="75px">
      <el-row :gutter="30">
        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="车牌号：">
            <el-input v-model="searchList.carCode" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="车辆颜色：">
            <el-input v-model="searchList.carColor" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="手机号：">
            <el-input v-model="searchList.mobile" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="车主姓名：">
            <el-input v-model="searchList.ownerName" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="getdata()"
              v-has="'MonthlyCarSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button
        type="primary"
        :disabled="radio === null"
        @click="updateReport"
        v-has="'MonthlyCarEdit_has'"
        >临时车编辑</el-button
      >
      <el-button
        type="danger"
        :disabled="radio === null"
        @click="deleteReport"
        v-has="'MonthlyCarDelete_has'"
        >临时车删除</el-button
      >
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table
        ref="singleTable"
        max-height="480"
        :data="tableData"
        border
        @row-click="rowclick"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="carCode" label="车牌号" width="200">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="250">
        </el-table-column>
        <el-table-column prop="ownerName" label="车主姓名" width="200">
        </el-table-column>
        <el-table-column prop="carColor" label="车辆颜色" width="200">
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column
          prop="sendWxMessage"
          label="是否公众号通知"
          width="300"
        >
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.sendWxMessage"
              :disabled="true"
            ></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > searchList.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="searchList.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->
    <TemporaryDialog
      :show.sync="show"
      ref="TemporaryDialog"
      @RefreshItem="RefreshList"
    ></TemporaryDialog>
  </div>
</template>
<script>
import {
  queryTemporaryCarPage,
  delTemporaryCar,
} from "@/api/ParkingManagement/TemporaryCar";
import TemporaryDialog from "./components/TemporaryDialog";
export default {
  name: "TemporaryCar",
  data() {
    return {
      tableData: [],
      searchList: {
        pageIndex: 0,
        pageSize: 10,
        carCode: "",
        carColor: "",
        mobile: "",
        ownerName: "",
      },
      show: false,
      radio: null,
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
    };
  },
  watch: {},
  mounted() {
    this.getTableData();
  },
  methods: {
    getdata() {
      this.searchList.pageIndex = 0;
      this.getTableData();
    },
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    handleCurrentChange(currentPage) {
      this.searchList.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = null; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    getTableData() {
      queryTemporaryCarPage(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    updateReport() {
      this.show = true;
      this.$refs.TemporaryDialog.getReportData(this.tableRow);
    },
    deleteReport() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delTemporaryCar(this.tableRow).then((response) => {
            this.searchList.pageIndex = 0;
            this.currentPage = 1;
            this.radio = null; //选择后清空选中表格按钮
            this.RefreshList({});
          });
        })
        .catch(() => {
          this.radio = null; //清空选中
        });
    },
    //刷新表数据
    RefreshList(newobj) {
      queryTemporaryCarPage(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.tableRow = this.tableData[this.radio];
      });
    },
  },
  components: {
    TemporaryDialog,
  },
};
</script>
<style lang="scss">
.block {
  text-align: right;
}
</style>
