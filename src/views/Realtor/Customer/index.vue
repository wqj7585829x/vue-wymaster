<template>
  <div class="container Customer">
    <!-- 按钮begin -->
    <el-form label-width="75px">
      <el-row :gutter="30">
        <el-col :span="6" style="width: 300px">
          <el-form-item label="项目名称:">
            <el-select
              v-model="searchList.index"
              @change="plotChange"
              clearable
            >
              <el-option
                v-for="(item, index) in plot_List"
                :key="index"
                :label="item.plotName"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="客户名称:">
            <el-input v-model="searchList.KHDA_KHMC" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="6" style="width: 300px">
          <el-form-item label="手机号:">
            <el-input v-model="searchList.KHDA_SJ" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="证件号:">
            <el-input v-model="searchList.KHDA_ZJHM" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="handleCurrentChange(1)"
              v-has="'RealtorCusSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button type="primary" @click="addReport" v-has="'RealtorCusAdd_has'"
        >新增</el-button
      >
      <el-button
        type="primary"
        @click="updateReport"
        v-has="'RealtorCusEdit_has'"
        :disabled="radio === null"
        >修改
      </el-button>
      <el-button
        type="danger"
        @click="deleteReport"
        v-has="'RealtorCusDelete_has'"
        :disabled="radio === null"
        >删除
      </el-button>
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table
        ref="singleTable"
        :data="tableData"
        max-height="450"
        border
        @row-click="rowclick"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="FJDA_ZCFL" label="资产分类" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.FJDA_ZCFL === 1">自有</div>
            <div v-if="scope.row.FJDA_ZCFL === 2">代管</div>
            <div v-if="scope.row.FJDA_ZCFL === 3">经营性</div>
            <div v-if="scope.row.FJDA_ZCFL === 4">临时经营性</div>
            <div v-if="scope.row.FJDA_ZCFL === 5">其他</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="KHDA_XMMC"
          label="项目名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="KHDA_KHID"
          label="客户代码"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="KHDA_KHMC"
          label="客户名称"
          width="120"
        ></el-table-column>
        <el-table-column prop="FKGX_ZT" label="客户类型" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.FKGX_ZT === 1">当前</div>
            <div v-if="scope.row.FKGX_ZT === 2">历史</div>
            <div v-if="scope.row.FKGX_ZT === 3">待退</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="tenantState"
          label="租户状态"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="KHDA_LXR"
          label="联系人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="KHDA_LXDH"
          label="联系电话"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="KHDA_SJ"
          label="手机"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="KHDA_JTDH"
          label="家庭电话"
          width="120"
        ></el-table-column>

        <el-table-column
          prop="KHDA_CYMC"
          label="曾用名称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="KHDA_ZJMC"
          label="证件名称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="KHDA_ZJHM"
          label="证件号码"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="KHDA_TQTXTS"
          label="提前提醒天数"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="KHDA_RKS"
          label="人口数"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="KHDA_DZYX"
          label="电子邮箱"
          width="180"
        ></el-table-column>
        <el-table-column prop="KHDA_SDBZ" label="锁定标志" width="80">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.KHDA_SDBZ"
              :disabled="true"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          prop="KHDA_NSRMC"
          label="纳税人名称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="KHDA_DWMC"
          label="单位名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="KHDA_BZ"
          label="备注"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="KHDA_NSRDZDH"
          label="地址电话"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="KHDA_KHHJZH"
          label="开户行及账号"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="KHDA_NSRSBH"
          label="纳税人识别号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="KHDA_ZZSFPFL"
          label="增值税发票分类"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="FJDA_FJMC"
          label="房间名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="FJDA_FJID"
          label="资源代码"
          width="150"
        ></el-table-column>
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
      ></el-pagination>
    </div>

    <!-- 分页end -->
    <CustomerDialog
      :show.sync="show"
      ref="CustomerDialog"
      @RefreshItem="RefreshList"
    ></CustomerDialog>
  </div>
</template>
<script>
import {
  queryCustomerProfile,
  queryPlotsWithAuthority,
  deleteCustomerProfile,
} from "@/api/Realtor/Customer";
import CustomerDialog from "./components/CustomerDialog";
export default {
  name: "MonthlyCar",
  data() {
    return {
      tableData: [],
      searchList: {
        pageIndex: 0,
        pageSize: 10,
        KHDA_KHMC: "",
        KHDA_SJ: "",
        KHDA_ZJHM: "",
        plotDbName: "",
        GLCID: "",
        YXDID: "",
        JT_ZJ: "",
        index: "",
      },
      show: false,
      radio: null,
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      Familyshow: false,
      plot_List: [],
    };
  },
  watch: {},
  mounted() {
    this.getTableData();
    queryPlotsWithAuthority().then((response) => {
      this.plot_List = response;
    });
  },
  methods: {
    plotChange(index) {
      if (index === "") {
        this.searchList.plotDbName = "";
        this.searchList.GLCID = "";
        this.searchList.YXDID = "";
        this.searchList.JT_ZJ = "";
      } else {
        this.searchList.plotDbName = this.plot_List[index].plotDbName;
        this.searchList.GLCID = this.plot_List[index].GLCID;
        this.searchList.YXDID = this.plot_List[index].YXDID;
        this.searchList.JT_ZJ = this.plot_List[index].JT_ZJ;
      }
    },
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
      this.currentPage = currentPage;
      this.getTableData(); //获取表格数据
      this.radio = null; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    getTableData() {
      queryCustomerProfile(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    addReport() {
      this.show = true;
      this.$refs.CustomerDialog.getReportData({}, 0);
    },
    updateReport() {
      this.show = true;
      this.$refs.CustomerDialog.getReportData(this.tableRow, 1);
    },
    deleteReport() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCustomerProfile({
            KHDA_ZJ: this.tableRow.KHDA_ZJ,
            plotDbName: this.tableRow.plotDbName,
            GLCID: this.tableRow.GLCID,
            YXDID: this.tableRow.YXDID,
          }).then((response) => {
            this.getTableData(); //获取表格数据
            this.radio = null; //选择后清空选中表格按钮
            this.tableRow = {}; //选择后清空选中表格数据
          });
        })
        .catch(() => {
          this.radio = null; //清空选中
        });
    },
    //刷新表数据
    RefreshList(newobj) {
      queryCustomerProfile(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.tableRow = this.tableData[this.radio];
      });
    },
  },
  components: {
    CustomerDialog,
  },
};
</script>
<style lang="scss">
.block {
  text-align: right;
}

.Customer .el-select {
  width: 100%;
}
</style>
