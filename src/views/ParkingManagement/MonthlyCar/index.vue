<template>
  <div class="container MonthlyCar">
    <!-- 按钮begin -->
    <el-form label-width="85px">
      <el-row :gutter="30">
        <el-col :span="4" style="width: 220px">
          <el-form-item label="车牌号：" label-width="65px">
            <el-input v-model="searchList.CLXX_CPH" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 220px">
          <el-form-item label="车主手机号：" label-width="90px">
            <el-input v-model="searchList.KHDA_SJ" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 220px" label-width="70px">
          <el-form-item label="所属客户：">
            <el-input v-model="searchList.KHDA_KHMC" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 220px">
          <el-form-item label="开始时间:" label-width="70px">
            <el-date-picker
              type="datetime"
              placeholder="到期开始时间"
              v-model="searchList.startDate"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 220px">
          <el-form-item label="截止时间:" label-width="70px">
            <el-date-picker
              type="datetime"
              placeholder="到期截止时间"
              v-model="searchList.endDate"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button
        type="success"
        @click="getdata()"
        v-has="'TemporaryCarSearch_has'"
        >查询</el-button
      >
      <el-button
        type="primary"
        :disabled="radio === null"
        @click="updateReport"
        v-has="'TemporaryCarEdit_has'"
        >月租车编辑
      </el-button>
      <el-button
        type="danger"
        :disabled="radio === null"
        @click="deleteReport"
        v-has="'TemporaryCarDelete_has'"
        >月租车删除
      </el-button>
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table
        ref="singleTable"
        :data="tableData"
        max-height="480"
        border
        @row-click="rowclick"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="FJDA_FJMC" label="所属资源" width="200">
        </el-table-column>
        <el-table-column prop="KHDA_KHMC" label="所属客户" width="200">
        </el-table-column>
        <el-table-column prop="CLXX_CPH" label="车牌号" width="200">
        </el-table-column>
        <el-table-column prop="CLXX_CZ" label="车主" width="200">
        </el-table-column>
        <el-table-column prop="CLXX_CZSJH" label="车主手机号" width="200">
        </el-table-column>
        <el-table-column prop="CGBZ_BZMC" label="缴费类型" width="200">
        </el-table-column>
        <el-table-column prop="CLXX_DQRQ" label="到期日期" width="200">
        </el-table-column>
        <el-table-column prop="CLXX_ZT" label="状态" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.CLXX_ZT === 0">停用</span>
            <span v-if="scope.row.CLXX_ZT === 1">可用</span>
            <span v-if="scope.row.CLXX_ZT === 2">退租</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > searchList.pageSize">
      <div class="totalmoney">金额合计：{{ totalmoney }}</div>
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
    <MonthlyCarDialog
      :show.sync="show"
      ref="MonthlyCarDialog"
      @RefreshItem="RefreshList"
    ></MonthlyCarDialog>
  </div>
</template>
<script>
import {
  queryMonthlyCarPage,
  deleteMonthlyCar,
  getMonthlyCarTotalMoney,
} from "@/api/ParkingManagement/TemporaryCar";
import MonthlyCarDialog from "./components/MonthlyCarDialog";
export default {
  name: "MonthlyCar",
  data() {
    return {
      tableData: [],
      searchList: {
        pageIndex: 0,
        pageSize: 10,
        CLXX_CPH: "",
        KHDA_SJ: "",
        KHDA_KHMC: "",
        startDate: "",
        endDate: "",
      },
      show: false,
      radio: null,
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      totalmoney: "",
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
      queryMonthlyCarPage(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
      getMonthlyCarTotalMoney().then((response) => {
        this.totalmoney = response.totalMoney;
      });
    },
    updateReport() {
      this.show = true;
      this.$refs.MonthlyCarDialog.getReportData(this.tableRow);
    },
    deleteReport() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMonthlyCar(this.tableRow).then((response) => {
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
      queryMonthlyCarPage(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.tableRow = this.tableData[this.radio];
      });
    },
  },
  components: {
    MonthlyCarDialog,
  },
};
</script>
<style lang="scss">
.block {
  text-align: right;
}

.MonthlyCar .totalmoney {
  float: left;
  font-size: 16px;
  position: relative;
  top: 6px;
  left: 19px;
  color: #606266;
}

.MonthlyCar .el-date-editor {
  width: 100%;
}
</style>
