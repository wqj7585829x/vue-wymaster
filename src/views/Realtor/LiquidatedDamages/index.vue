<template>
  <!--违约金-->
  <div class="LiquidatedDamages">
    <!-- 搜索框begin -->
    <!-- 搜索框begin -->
    <div class="select">
      <el-form label-width="115px">
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
                v-model="tableParameter.contractId"
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
            <el-form-item label="房间号:" label-width="70px">
              <el-select
                v-model="tableParameter.roomId"
                @change="fjhChange"
                clearable
              >
                <el-option
                  v-for="item in resourceData"
                  :key="item.FJDA_ZJ"
                  :value="item.FJDA_ZJ"
                  :label="item.FJDA_FJMC"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 300px">
            <el-form-item label="客户名称:" label-width="70px">
              <el-select v-model="tableParameter.customerId" clearable>
                <el-option
                  v-for="item in clientData"
                  :key="item.KHDA_ZJ"
                  :value="item.KHDA_ZJ"
                  :label="item.KHDA_KHMC"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 300px">
            <el-form-item label="开始日期:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.startTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 300px">
            <el-form-item label="结束日期:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.endTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="width: 0">
            <el-form-item label-width="0">
              <el-button
                type="success"
                @click="submit()"
                v-has="'LiquidatedDamagesQuery_has'"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 按钮区域start -->
    <section class="buttonBox" ref="elbuttonBox">
      <el-row>
        <el-col :span="24">
          <el-button
            type="primary"
            @click="paymentAction"
            v-has="'LiquidatedDamagesPayment_has'"
            >交款</el-button
          >
          <el-button
            type="danger"
            @click="BillObsolete"
            :disabled="disablecancel"
            v-has="'LiquidatedDamagesObsolete_has'"
            >作废</el-button
          >
        </el-col>
      </el-row>
    </section>
    <!-- 按钮区域end -->
    <div class="standardTable" ref="ListTable">
      <el-table
        ref="multipleTable"
        style="width: 100%"
        max-height="450"
        :data="tableData"
        border
        @row-click="rowclick"
        class="commonTable"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="penaltyEvent" label="违约事项" width="200">
        </el-table-column>
        <el-table-column
          label="违约类型"
          prop="penaltyType"
          width="150"
        ></el-table-column>
        <el-table-column prop="penaltyMoney" label="违约金额" width="150">
        </el-table-column>
        <el-table-column prop="payDate" label="收款时间" width="150">
        </el-table-column>
        <el-table-column prop="createUser" label="操作人" width="150">
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
      </el-table>
    </div>
    <!-- 表 end -->
    <!-- 交款 弹框 begin -->
    <PaymentDialog
      :showPayment.sync="showPayment"
      ref="PopPaymentChildren"
      @RefreshItem="RefreshList"
    ></PaymentDialog>
    <!-- 交款 弹框 end -->
  </div>
</template>
<script>
import {
  queryZLRoomApi,
  queryContractListApi,
  queryClientsApi,
  queryListApi,
  updateStatusApi,
} from "@/api/Realtor/LiquidatedDamages"; //违约金js
import PaymentDialog from "./components/PaymentDamageDialog"; //交款
import { mapGetters } from "vuex";
export default {
  name: "LiquidatedDamages",
  components: {
    PaymentDialog,
  },
  computed: {
    ...mapGetters(["currentPlot", "userPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  data() {
    return {
      radio: "", //单选按钮
      tableParameter: {
        //搜索列表参数
        contractId: "",
        customerId: "",
        roomId: "",
        startTime: "",
        endTime: "",
        dbName: "",
        GLCID: "",
        YXDID: "",
      },
      tableData: [],
      resourceData: [], //房间号数据
      proChargeData: [], //合同管理主键
      clientData: [], //客户名称数据
      showPayment: false, //交款 弹框 显示
      tableRow: {},
      disablecancel: true, //作废
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disablecancel = false;
      } else {
        this.disablecancel = true;
      }
    },
    currentPlot() {
      this.tableParameter.name = this.currentPlot; //监听//当前选中的小区
    },
    userPlot() {
      console.log("userPlot:" + JSON.stringify(this.userPlot));
      this.userPlot.forEach((item) => {
        if (item.GLCNAME == this.currentPlot) {
          this.tableParameter.dbName = item.dbName;
          this.tableParameter.GLCID = item.GLCID;
          this.tableParameter.YXDID = item.YXDID;
          let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
          this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
          this.$nextTick(() => {
            this.queryResoureceRequest(); //资源名称查询
            this.queryContractRequest(); //合同编号查询
            this.queryClientRequest(); //客户查询
            this.getTableData(); //列表数据
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
          this.queryContractRequest(); //合同编号查询
          this.getTableData(); //列表数据
        });
      }
    });
  },
  methods: {
    getTableData() {
      // 获取表数
      queryListApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
      });
    },
    queryResoureceRequest() {
      //资源名称查询
      queryZLRoomApi(this.tableParameter).then((response) => {
        this.resourceData = response;
      });
    },
    queryClientRequest() {
      //客户名称查询
      queryClientsApi(this.tableParameter).then((response) => {
        this.clientData = response;
      });
    },
    queryContractRequest() {
      //合同编码查询
      queryContractListApi(this.tableParameter).then((response) => {
        this.proChargeData = response;
      });
    },
    PlotChange(val) {
      //项目名称改变事件
      this.tableParameter.contractId = "";
      this.tableParameter.roomId = "";
      this.tableParameter.customerId = "";
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
        this.clientData = [];
      }
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      this.queryContractRequest(); //合同编号查询
    },
    contractChange(val) {
      //合同编码改变事件
      this.tableParameter.roomId = "";
      this.tableParameter.customerId = "";
      if (val) {
        this.queryResoureceRequest(); //资源名称查询
      } else {
        this.resourceData = [];
        this.clientData = [];
      }
    },
    fjhChange(val) {
      this.tableParameter.customerId = "";
      if (val) {
        this.resourceData.forEach((item) => {
          if (item.FJDA_FJID == val) {
            this.tableParameter.FJDA_ZJ = item.FJDA_ZJ;
          }
        });
        let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
        this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
        this.queryClientRequest();
      } else {
        this.clientData = [];
      }
    },
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    submit() {
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.getTableData();
    },
    // 交款
    paymentAction() {
      this.showPayment = true;
      this.$refs.PopPaymentChildren.getData(this.tableParameter);
    },
    BillObsolete() {
      //退款明细作废
      this.$confirm("是否作废?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateStatusApi(this.tableParameter, this.tableRow.penaltyId).then(
            (response) => {
              this.radio = ""; //选择后清空选中表格按钮
              this.tableRow = {}; //选择后清空选中表格数据
              this.getTableData();
            }
          );
        })
        .catch(() => {});
    },
    RefreshList() {
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.getTableData();
    },
  },
};
</script>
<style lang="scss">
.LiquidatedDamages {
  .select {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 170px;
    }
  }
}
</style>
