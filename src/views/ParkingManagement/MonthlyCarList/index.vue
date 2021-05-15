<template>
  <div class="container">
    <!-- 按钮begin -->
    <el-form label-width="85px">
      <el-row :gutter="30">
        <el-col :span="5" style="width: 300px">
          <el-form-item label="所属客户:" label-width="80px">
            <el-input v-model="searchList.CLXX_CZ" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="车牌号：" label-width="70px">
            <el-input v-model="searchList.YZCCZ_CPH" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="车主手机号：" label-width="100px">
            <el-input v-model="searchList.CLXX_CZSJH" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-button
            type="success"
            @click="getdata"
            v-has="'TemporaryCarListSearch_has'"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table ref="singleTable" max-height="480" :data="tableData" border>
        <el-table-column prop="FJDA_FJMC" label="所属资源" width="200">
        </el-table-column>
        <el-table-column prop="KHDA_KHMC" label="所属客户" width="200">
        </el-table-column>
        <el-table-column prop="YZCCZ_CPH" label="车牌号" width="200">
        </el-table-column>
        <el-table-column prop="YZCCZ_FYNY" label="费用年月" width="200">
        </el-table-column>
        <el-table-column prop="YZCCZ_JFRQ" label="缴费日期" width="200">
        </el-table-column>
        <el-table-column prop="YZCCZ_YS" label="月份" width="200">
        </el-table-column>
        <el-table-column prop="YZCCZ_JFJE" label="缴费金额" width="200">
        </el-table-column>
        <el-table-column prop="YZCCZ_SXKSSJ" label="生效开始时间" width="250">
        </el-table-column>
        <el-table-column prop="YZCCZ_SXJSSJ" label="生效结束时间" width="250">
        </el-table-column>
        <el-table-column prop="YZCCZ_XFZT" label="下发状态" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.YZCCZ_XFZT === 1">已下发</span>
            <span v-if="scope.row.YZCCZ_XFZT === 2">下发失败</span>
          </template>
        </el-table-column>
        <el-table-column prop="CLXX_CZ" label="车主" width="200">
        </el-table-column>
        <el-table-column prop="CLXX_CZSJH" label="车主手机号" width="250">
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
  </div>
</template>
<script>
import { queryNewMonthlyCarRecordPage } from "@/api/ParkingManagement/TemporaryCar";
export default {
  name: "MonthlyCarList",
  data() {
    return {
      tableData: [],
      searchList: {
        pageIndex: 0,
        pageSize: 10,
        CLXX_CZ: "",
        YZCCZ_CPH: "",
        CLXX_CZSJH: "",
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
      queryNewMonthlyCarRecordPage(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
  },
};
</script>
<style lang="scss">
.block {
  text-align: right;
}
</style>
