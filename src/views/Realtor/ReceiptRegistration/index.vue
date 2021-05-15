<template>
  <!--未收清费用-->
  <div class="ReceiptRegistration">
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form label-width="120px">
          <el-row :gutter="30">
            <el-col :span="6" style="width: 300px">
              <el-form-item label="项目名称:" label-width="70px">
                <el-select v-model="tableParameter.name" @change="PlotChange">
                  <el-option
                    v-for="(item, index) in userPlot"
                    :key="index"
                    :value="item.GLCNAME"
                    :label="item.GLCNAME"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 300px">
              <el-form-item label="合同编号:" label-width="70px">
                <el-select
                  v-model="tableParameter.FYSQ_HTWJ"
                  @change="contractChange"
                  clearable
                >
                  <el-option
                    v-for="item in proChargeData"
                    :key="item.contract_id"
                    :value="item.contract_id"
                    :label="item.contract_num"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 300px">
              <el-form-item label="资源名称:" label-width="70px">
                <el-select
                  v-model="tableParameter.roomName"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in resourceData"
                    :key="item.FJDA_ZJ"
                    :value="item.FJDA_FJMC"
                    :label="item.FJDA_FJMC"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 300px">
              <el-form-item label="业主名称:" label-width="70px">
                <el-select
                  v-model="tableParameter.ownerName"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in ownerData"
                    :key="item.KHDA_ZJ"
                    :value="item.KHDA_KHMC"
                    :label="item.KHDA_KHMC"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6" style="width:300px">
              <el-form-item label="房间状态:" label-width="70px">
                <el-select v-model="tableParameter.isVacant" clearable>
                  <el-option label="空置" :value="1"></el-option>
                  <el-option label="入住" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="6" style="width: 300px">
              <el-form-item label="费用项目:" label-width="70px">
                <el-select v-model="tableParameter.chargeItem" clearable>
                  <el-option
                    v-for="item in projectData"
                    :key="item.chargeItem"
                    :value="item.chargeItem"
                    :label="item.chargeItem"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="width: 0">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'ReceiptRegistrationQuery_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 按钮区域start -->
      <section class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              :disabled="ReceiptedSeldisabledBtn"
              @click="ReceiptedSelectDialog"
              v-has="'ReceiptRegistrationCollection_has'"
              >收款</el-button
            >
            <el-button
              type="primary"
              @click="CostAdjustmentDialog"
              v-has="'ReceiptRegistrationCostAd_has'"
              >费用调整
            </el-button>
            <!-- <el-button type="primary" title="开发中" disabled>批量收款</el-button> -->
            <!-- <el-button type="primary" @click="RefreshList" v-has="'ReceiptRegistrationRefresh_has'">刷新</el-button> -->
            <!-- <el-button type="warning" title="开发中" disabled>栏位配置</el-button>
            <el-button type="success" title="开发中" disabled>导出Excel</el-button> -->
          </el-col>
        </el-row>
      </section>
      <!-- 按钮区域end -->
      <!-- 表格列表start -->
      <section>
        <u-table
          :data="tableData"
          border
          style="width: 100%"
          max-height="500"
          class="tableContent"
          ref="NotResingleTable"
          @selection-change="changeFun"
          @row-click="rowClick"
          use-virtual
          :row-height="30"
        >
          <u-table-column label="选择" type="selection" fixed></u-table-column>
          <u-table-column
            label="合同编号"
            prop="contractNum"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            label="资源代码"
            prop="FJDA_FJID"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            label="资源名称"
            prop="FJDA_FJMC"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            label="类型"
            prop="KHDA_KHLX"
            width="100"
          ></u-table-column>
          <u-table-column
            label="姓名"
            prop="KHDA_KHMC"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            label="费用项目"
            prop="FYSQ_SFXMMC"
            width="150"
            show-overflow-tooltip
          ></u-table-column>
          <u-table-column
            label="所属年月"
            prop="FYSQ_SSNY"
            width="80"
          ></u-table-column>
          <u-table-column
            label="应收金额（含税）"
            prop="FYSQ_YSJE"
            width="120"
          ></u-table-column>
          <u-table-column
            label="已收金额"
            prop="FYSQ_SSJE"
            width="80"
          ></u-table-column>
          <u-table-column
            label="欠收金额"
            prop="FYSQ_QSJE"
            width="80"
          ></u-table-column>
          <u-table-column
            label="税率"
            prop="FYSQ_YSSL"
            width="60"
          ></u-table-column>
          <u-table-column
            label="应收不含税"
            prop="FYSQ_YSBHS"
            width="100"
          ></u-table-column>
          <u-table-column label="费用期间">
            <template slot-scope="scope">
              <el-input
                type="textarea"
                style="height: 50px"
                v-model="scope.row.FYSQ_ZY"
                @change="zyChange(scope.row)"
                @click.stop.native
              >
              </el-input>
            </template>
          </u-table-column>
        </u-table>
        <!-- 分页 -->
        <el-row>
          <div class="el-paginationR" v-if="returnTotal">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="tableParameter.pageSize"
              layout="total,prev, pager, next, jumper"
              :total="returnTotal"
            >
            </el-pagination>
          </div>
        </el-row>
      </section>
    </div>
    <!-- 快速收款弹窗start -->
    <ReceiptedSelectDialog
      :showdialog.sync="showdialog"
      @RefreshItem="RefreshList"
      ref="ReceiptedSelectPopChildren"
    >
    </ReceiptedSelectDialog>
    <!-- 快速收款弹窗end -->
    <!-- 费用调整弹窗start -->
    <CostAdjustmentDialog
      :showdialogCost.sync="showdialogCost"
      @RefreshItem="RefreshList"
      ref="costChildren"
    >
    </CostAdjustmentDialog>
    <!-- 费用调整弹窗end -->
  </div>
</template>
<script>
import {
  queryUncollectedFeesApi,
  queryAllChargeItemApi,
  queryContractListApi,
  queryZLRoomApi,
  updateSummary,
  queryZLCustomerApi,
} from "@/api/Realtor/ReceiptRegistration"; //房屋租凭收款登记api
import ReceiptedSelectDialog from "./components/ReceiptedSelectDialog"; //快速收款弹窗
import CostAdjustmentDialog from "./components/CostAdjustmentDialog"; //费用调整
import { mapGetters } from "vuex";
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "ReceiptRegistration",
  computed: {
    ...mapGetters(["currentPlot", "userPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  components: {
    ReceiptedSelectDialog,
    CostAdjustmentDialog,
    UTable,
    UTableColumn,
  },
  data() {
    return {
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      tableParameter: {
        //搜索列表参数
        pageIndex: 0,
        pageSize: 10,
        roomName: "",
        chargeItem: "",
        isVacant: "",
        ownerName: "",
        dbName: "",
        GLCID: "",
        YXDID: "",
      },
      tableData: [],
      resourceData: [], //资源名称数据
      projectData: [], //费用项目数据
      proChargeData: [], //合同数据
      ownerData: [], //业主名称数据
      ReceiptedSeldisabledBtn: true, //默认禁用
      multipleSelection: [], //表格选中数据
      showdialog: false,
      showdialogCost: false,
    };
  },
  watch: {
    multipleSelection() {
      //选中表格复选框启用'收清选中按钮,隐藏标题提示'
      if (this.multipleSelection.length) {
        this.ReceiptedSeldisabledBtn = false;
      } else {
        this.ReceiptedSeldisabledBtn = true;
      }
    },
    currentPlot() {
      this.tableParameter.name = this.currentPlot; //监听//当前选中的小区
    },
    userPlot() {
      this.userPlot.forEach((item) => {
        if (item.GLCNAME == this.currentPlot) {
          this.tableParameter.dbName = item.dbName;
          this.tableParameter.GLCID = item.GLCID;
          this.tableParameter.YXDID = item.YXDID;
          let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
          this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
          this.$nextTick(() => {
            this.queryProjectRequest(); //收费项目查询
            this.queryResoureceRequest(); //资源名称查询
            this.getTableList(); //列表数据查询
          });
        }
      });
    },
  },
  mounted() {
    if (sessionStorage.getItem("GLCNAME")) {
      this.tableParameter.name = sessionStorage.getItem("GLCNAME"); //当前选中的小区
    } else {
      this.tableParameter.name = this.currentPlot; //当前选中的小区
    }
    this.userPlot.forEach((item) => {
      if (item.GLCNAME == this.tableParameter.name) {
        this.tableParameter.dbName = item.dbName;
        this.tableParameter.GLCID = item.GLCID;
        this.tableParameter.YXDID = item.YXDID;
        let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
        this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
        this.$nextTick(() => {
          this.queryProjectRequest(); //收费项目查询
          this.queryContractListRequest(); //合同编码查询
          this.queryResoureceRequest(); //资源名称查询
          this.queryCustomerRequest(); //业主名称查询
          this.getTableList(); //列表数据查询
        });
      }
    });
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.tableParameter.pageIndex = currentPage - 1;
      this.getTableList();
    },
    queryProjectRequest() {
      //收费项目查询
      queryAllChargeItemApi(this.tableParameter).then((response) => {
        this.projectData = response;
      });
    },
    queryContractListRequest() {
      //合同编码查询
      queryContractListApi(this.tableParameter).then((response) => {
        this.proChargeData = response;
      });
    },
    queryResoureceRequest() {
      //资源名称查询
      queryZLRoomApi(this.tableParameter).then((response) => {
        this.resourceData = response;
      });
    },
    queryCustomerRequest() {
      //业主名称查询
      queryZLCustomerApi(this.tableParameter).then((response) => {
        this.ownerData = response;
      });
    },
    getTableList() {
      //列表数据查询
      queryUncollectedFeesApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    contractChange(val) {
      //合同编码改变事件
      // this.tableParameter.roomName = '';
      // if (val) {
      //   this.queryResoureceRequest();//资源名称查询
      // } else {
      //   this.resourceData = [];
      // }
    },
    ReceiptedSelectDialog() {
      //快速收款
      this.showdialog = true;
      this.$refs.ReceiptedSelectPopChildren.getReceiptedSelect(
        this.multipleSelection
      ); //传递给弹窗数据
    },
    CostAdjustmentDialog() {
      //点击费用调整弹窗显示
      this.showdialogCost = true;
      this.$refs.costChildren.getData(this.tableParameter); //传递给弹窗数据
    },
    changeFun(val) {
      //表格选择选
      this.multipleSelection = val;
    },
    rowClick(row) {
      this.$refs.NotResingleTable.toggleRowSelection(row); //单击表格复选框选中
    },
    zyChange(val) {
      //修改摘要
      updateSummary(val).then((response) => {
        if (response.returnStatus == "SUCCESS") {
        }
      });
    },
    PlotChange(val) {
      //项目名称改变事件
      this.tableParameter.roomName = "";
      this.tableParameter.chargeItem = "";
      this.tableParameter.FYSQ_HTWJ = "";
      this.tableParameter.ownerName = "";
      if (val) {
        this.userPlot.forEach((item) => {
          if (item.GLCNAME == val) {
            this.tableParameter.dbName = item.dbName;
            this.tableParameter.GLCID = item.GLCID;
            this.tableParameter.YXDID = item.YXDID;
            sessionStorage.setItem("GLCNAME", val);
          }
        });
      } else {
        this.tableParameter.dbName = "";
        this.tableParameter.GLCID = "";
        this.tableParameter.YXDID = "";
        this.resourceData = [];
        this.projectData = [];
        this.proChargeData = [];
        this.ownerData = [];
      }
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      this.queryProjectRequest(); //收费项目查询
      this.queryContractListRequest(); //合同编码查询
      this.queryResoureceRequest(); //资源名称查询
      this.queryCustomerRequest(); //业主名称查询
    },
    RefreshList() {
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      this.getTableList();
    },
    submit() {
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      this.getTableList();
    },
  },
};
</script>
<style lang="scss">
.ReceiptRegistration {
  .el-textarea__inner {
    height: 50px;
  }
  .el-form-item {
    margin-bottom: 10px !important;
  }
  .select {
    .el-input {
      width: 170px !important;
    }
  }
  .cell {
    .el-textarea {
      height: auto !important;
      .el-textarea__inner {
        min-height: 25px !important;
        height: 28px;
        padding: 0 15px;
        resize: none;
      }
    }
  }
}
</style>
