<template>
  <div class="container TemporaryCarList">
    <!-- 按钮begin -->
    <el-form label-width="85px">
      <el-row :gutter="30">
        <el-col :span="5" style="min-width: 300px">
          <el-form-item label="车牌号：">
            <el-input v-model="searchList.carCode" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="min-width: 300px">
          <el-form-item label="手机号：">
            <el-input v-model="searchList.mobile" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="min-width: 300px">
          <el-form-item label="入场开始：">
            <el-date-picker
              type="datetime"
              placeholder="请输入入场开始时间"
              v-model="searchList.inStartTime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="min-width: 300px">
          <el-form-item label="入场截止：">
            <el-date-picker
              type="datetime"
              placeholder="请输入入场截止时间"
              v-model="searchList.inEndTime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="min-width: 300px">
          <el-form-item label="出场开始：">
            <el-date-picker
              type="datetime"
              placeholder="请输入出场开始时间"
              v-model="searchList.outStartTime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="min-width: 300px">
          <el-form-item label="出场截止：">
            <el-date-picker
              type="datetime"
              placeholder="请输入出场截止时间"
              v-model="searchList.outEndTime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="min-width: 300px">
          <el-form-item label="支付开始：">
            <el-date-picker
              type="datetime"
              placeholder="请输入支付开始时间"
              v-model="searchList.payStartTime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="min-width: 300px">
          <el-form-item label="支付截止：">
            <el-date-picker
              type="datetime"
              placeholder="请输入支付截止时间"
              v-model="searchList.payEndTime"
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
        @click="getdata"
        v-has="'MonthlyCarListSearch_has'"
        >查询</el-button
      >
      <el-button
        type="success"
        @click="downloData"
        style="float: right"
        v-has="'MonthlyCarListDownload_has'"
        >导出excel</el-button
      >
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table ref="singleTable" max-height="480" :data="tableData" border>
        <el-table-column prop="car_code" label="车牌号" width="200">
        </el-table-column>
        <el-table-column prop="in_time" label="入场时间" width="200">
        </el-table-column>
        <el-table-column prop="out_time" label="出场时间" width="200">
        </el-table-column>
        <el-table-column prop="pay_time" label="支付时间" width="200">
        </el-table-column>
        <el-table-column prop="in_gate_name" label="入场道闸名称" width="200">
        </el-table-column>
        <el-table-column prop="out_gate_name" label="出场道闸名称" width="200">
        </el-table-column>
        <el-table-column prop="pay_money" label="支付金额" width="200">
        </el-table-column>
        <el-table-column prop="service_charge" label="预估手续费" width="200">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="200">
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
  </div>
</template>
<script>
import {
  queryTemporaryCarRecordPage,
  getTemporaryCarTotalMoney,
  exportTemporaryCar,
} from "@/api/ParkingManagement/TemporaryCar";
export default {
  name: "TemporaryCarList",
  data() {
    return {
      tableData: [],
      searchList: {
        pageIndex: 0,
        pageSize: 10,
        carCode: "",
        mobile: "",
        inStartTime: "",
        inEndTime: "",
        outStartTime: "",
        outEndTime: "",
        payStartTime: "",
        payEndTime: "",
      },
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
    handleCurrentChange(currentPage) {
      this.searchList.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = null; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    getTableData() {
      queryTemporaryCarRecordPage(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
      getTemporaryCarTotalMoney().then((response) => {
        this.totalmoney = response.totalMoney;
      });
    },
    downloData() {
      exportTemporaryCar(this.searchList).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `临时车缴费记录.xls`;
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
  },
};
</script>
<style lang="scss">
.TemporaryCarList .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.TemporaryCarList .el-input {
  width: 100% !important;
}

.TemporaryCarList .totalmoney {
  float: left;
  font-size: 16px;
  position: relative;
  top: 6px;
  left: 19px;
  color: #606266;
}
</style>
