<template>
  <div class="container UncollectedSure">
    <!-- 按钮begin -->
    <el-form label-width="75px">
      <el-row :gutter="30">
        <el-col :span="6" style="width: 300px">
          <el-form-item label="批次号:">
            <el-input v-model="searchList.payOrder" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="楼栋名称:">
            <el-select
              v-model="searchList.index2"
              filterable
              clearable
              @change="buildingchange"
            >
              <el-option
                v-for="(item, index) in options2"
                :key="index"
                :label="item.DLDA_DLMC"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="房间名称:">
            <el-select
              v-model="searchList.index3"
              filterable
              clearable
              :disabled="searchList.index2 === ''"
              @change="roomchange"
            >
              <el-option
                v-for="(item, index) in options3"
                :key="index"
                :label="item.FJDA_FJMC"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="客户名称:">
            <el-select
              v-model="searchList.KHDA_KHMC"
              filterable
              clearable
              :disabled="searchList.index3 === ''"
            >
              <el-option
                v-for="(item, index) in options4"
                :key="index"
                :label="item.KHDA_KHMC"
                :value="item.KHDA_KHMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="申请开始日期:" label-width="105px">
            <el-date-picker
              type="date"
              placeholder="选择时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="searchList.KSSJ"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="申请截止日期:" label-width="105px">
            <el-date-picker
              type="date"
              placeholder="选择时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="searchList.JZSJ"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="开票状态:" label-width="105px">
            <el-select
              v-model="searchList.applyInvoiceState"
              filterable
              clearable
            >
              <el-option label="未开票" :value="0"></el-option>
              <el-option label="已开票" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="审核状态:" label-width="105px">
            <el-select v-model="searchList.applyStatus" filterable clearable>
              <el-option label="物业未审核" :value="1"></el-option>
              <el-option label="物业审核通过" :value="2"></el-option>
              <el-option label="物业审核不通过" :value="3"></el-option>
              <el-option label="集团审核中" :value="4"></el-option>
              <el-option label="集团审核通过" :value="5"></el-option>
              <el-option label="集团审核不通过" :value="6"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="状态:" label-width="105px">
            <el-select v-model="searchList.status" filterable clearable>
              <el-option label="有效" :value="1"></el-option>
              <el-option label="取消" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="getdata()"
              v-has="'BGUncollectedSureSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <div class="button buttonBox">
      <el-button
        type="primary"
        @click="checkbill"
        :disabled="disablebutton"
        v-has="'BGUncollectedSureCheck_has'"
        >审核
      </el-button>
      <el-button
        type="primary"
        @click="checkbillCancel"
        :disabled="disablebuttonCancel"
        >取消审核
      </el-button>
      <el-button
        type="primary"
        @click="checkbillCancelApply"
        :disabled="disablebuttonCancelApply"
        >取消申请
      </el-button>
      <el-button
        type="primary"
        @click="billdetail"
        :disabled="disabledbill"
        v-has="'BGUncollectedSureView_has'"
        >查看开票资料
      </el-button>
      <el-button
        type="primary"
        @click="invoice"
        :disabled="disableddobill"
        v-has="'BGUncollectedSureApply_has'"
        >开票
      </el-button>
      <!-- <el-button type="primary" @click="cancelbill" :disabled="disabledcanlebill">作废
      </el-button> -->
    </div>

    <!-- 客户详情begin -->
    <div class="customedetail">
      <div class="billtitle">开票申请</div>
      <el-table
        ref="singleTable"
        max-height="300"
        :data="tableData"
        border
        @row-click="rowclick"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">有效</span>
            <span v-if="scope.row.status === 2">取消</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyInvoiceState" label="开票状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.applyInvoiceState === 0">未开票</span>
            <span v-if="scope.row.applyInvoiceState === 1">已开票</span>
          </template>
        </el-table-column>
        <el-table-column prop="payOrder" label="申请批次号" width="200">
        </el-table-column>
        <el-table-column prop="KHDA_KHMC" label="客户名称" width="100">
        </el-table-column>
        <el-table-column prop="orderDate" label="申请日期" width="150">
        </el-table-column>
        <el-table-column prop="applyAmount" label="申请金额" width="100">
        </el-table-column>
        <el-table-column prop="wyApplyStatus" label="物业审核状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.wyApplyStatus === 0">未审核</span>
            <span v-if="scope.row.wyApplyStatus === 1">审核中</span>
            <span v-if="scope.row.wyApplyStatus === 2">审核通过</span>
            <span v-if="scope.row.wyApplyStatus === 3">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="wyApplyPeople" label="物业审核人" width="200">
        </el-table-column>
        <el-table-column
          prop="wyApplyExplan"
          label="物业不通过理由"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="jtApplyStatus" label="集团审核状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.jtApplyStatus === 0">未审核</span>
            <span v-if="scope.row.jtApplyStatus === 1">审核中</span>
            <span v-if="scope.row.jtApplyStatus === 2">审核通过</span>
            <span v-if="scope.row.jtApplyStatus === 3">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="jtApplyPeople" label="集团审核人" width="200">
        </el-table-column>
        <el-table-column
          prop="jtApplyExplan"
          label="集团不通过理由"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="payStatus" label="收清状态">
          <template slot-scope="scope">
            <span v-if="scope.row.payStatus === 0">未收清</span>
            <span v-if="scope.row.payStatus === 1">已收清</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyInvoiceType" label="票据类型">
          <template slot-scope="scope">
            <span v-if="scope.row.applyInvoiceType === 2">电子</span>
            <span v-if="scope.row.applyInvoiceType === 1">纸质</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="作废原因" width="200">
        </el-table-column>
        <el-table-column prop="isJtApply" label="是否集团审核">
          <template slot-scope="scope">
            <span v-if="scope.row.isJtApply">是</span>
            <span v-if="!scope.row.isJtApply">否</span>
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

    <div class="customedetail">
      <div class="billtitle">开票申请明细</div>
      <el-table ref="singleTable1" max-height="200" :data="tableData1" border>
        <el-table-column prop="DLDA_DLMC" label="楼栋名称" width="150">
        </el-table-column>
        <el-table-column prop="FJDA_FJMC" label="资源名称" width="200">
        </el-table-column>
        <el-table-column prop="chargeItem" label="收款项目" width="150">
        </el-table-column>
        <el-table-column prop="chargeYear" label="所属年月" width="200">
        </el-table-column>
        <el-table-column prop="payMethod" label="收款方式" width="200">
        </el-table-column>
        <el-table-column
          prop="taxIncludeAmount"
          label="金额（含税）"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="taxRate" label="税率（%）" width="200">
        </el-table-column>
        <el-table-column prop="taxFreeAmount" label="金额（不含税）">
        </el-table-column>
      </el-table>
    </div>

    <billDialog
      :show.sync="show"
      ref="billDialog"
      @RefreshItem="getTableData"
    ></billDialog>
    <OpenBillDialog
      :OBshow.sync="OBshow"
      ref="ticketChilren"
      @PopCancelEmit="getTableData"
    ></OpenBillDialog>

    <el-dialog
      v-dialogDrag
      :title="checktitle"
      class="el-dialog-single"
      :visible.sync="dialogVisible"
      @close="dialogVisible = false"
      :close-on-click-modal="false"
    >
      <el-form label-width="125px" ref="ruleForm">
        <el-row>
          <el-col>
            <el-form-item label="不通过理由：">
              <el-input type="textarea" v-model="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="billdocheck">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      title="作废"
      class="el-dialog-single"
      :visible.sync="dialogVisiblecanle"
      @close="dialogVisiblecanle = false"
      :close-on-click-modal="false"
    >
      <el-form label-width="125px" ref="ruleForm">
        <el-row>
          <el-col>
            <el-form-item label="请输入作废说明：">
              <el-input type="textarea" v-model="textareacanle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancellation">确 定</el-button>
        <el-button @click="dialogVisiblecanle = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryBuildingMessage,
  queryRoomMessage,
  queryClientForRoom,
  queryUnpaidConfirmApplicationForms,
  queryApplicationFormDetails,
  updateApplyBillSuccess,
  updateApplyBillFail,
  unpaidInvoice,
  xpApplyNoPayCancellation,
  updateApplyBillCancelApi,
  checkbillCancelApplyApi,
} from "@/api/TicketPayment/Bill";
import OpenBillDialog from "./../components/OpenBillDialog";
import billDialog from "./components/billDialog";
import { mapGetters } from "vuex";
export default {
  name: "UncollectedSures",
  data() {
    return {
      tableData: [],
      tableData1: [],
      searchList: {
        pageIndex: 0,
        pageSize: 100,
        index2: "",
        index3: "",
        KHDA_KHMC: "",
      },
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      multipleSelection: [],
      show: false,
      OBshow: false,
      disablebutton: true,
      disablebuttonCancel: true,
      disabledbill: true,
      disableddobill: true,
      textarea: "",
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      options2: [],
      options3: [],
      options4: [],
      dialogVisible: false,
      checktitle: "",
      textarea: "",
      dialogVisiblecanle: false,
      textareacanle: "",
      disabledcanlebill: true,
      disablebuttonCancelApply: true,
    };
  },
  components: {
    billDialog,
    OpenBillDialog,
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disabledbill = false;
        if (
          this.tableRow.status == 1 &&
          this.tableRow.canCancel &&
          this.tableRow.payStatus != 1
        ) {
          this.disabledcanlebill = false;
        }
        if (this.tableRow.wyApplyStatus === 0 && this.tableRow.status != 2) {
          //物业审核状态0 未审核 才可以点击取消申请
          this.disablebuttonCancelApply = false;
        } else {
          this.disabledcanlebill = true;
          this.disablebuttonCancelApply = true;
        }
      } else {
        this.disabledbill = true;
        this.disabledcanlebill = true;
        this.disablebuttonCancelApply = true;
      }
    },
  },
  mounted() {
    this.getTableData();
    queryBuildingMessage().then((response) => {
      this.options2 = response;
    });
  },
  methods: {
    cancelbill() {
      if (this.tableRow.applyInvoiceState === 1) {
        this.$confirm("票据号将同步作废,是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.dialogVisiblecanle = true;
          })
          .catch(() => {});
      } else {
        this.dialogVisiblecanle = true;
      }
    },
    cancellation() {
      xpApplyNoPayCancellation({
        applyId: this.tableRow.applyId,
        remark: this.textareacanle,
      }).then((response) => {
        this.radio = ""; //选择后清空选中表格按钮
        this.dialogVisiblecanle = false;
        this.handleCurrentChange(1);
      });
    },
    invoice() {
      this.OBshow = true;
      this.$refs.ticketChilren.getData(this.tableRow, 1);
    },
    billdetail() {
      this.show = true;
      this.$refs.billDialog.getReportData(this.tableRow);
    },
    checkbill() {
      this.textarea = "";
      this.$confirm("此操作将审核对应数据, 是否继续?", "提示", {
        confirmButtonText: "通过",
        cancelButtonText: "不通过",
        type: "warning",
      })
        .then(() => {
          updateApplyBillSuccess({
            applyId: this.tableRow.applyId,
            applySource: this.tableRow.applySource,
            wyApplyExplan: this.textarea,
          }).then((response) => {
            this.getTableData(); //获取表格数据
          });
        })
        .catch(() => {
          this.checktitle = "不通过审核说明";
          this.dialogVisible = true;
        });
    },
    checkbillCancel() {
      //取消审核
      this.$confirm("此操作将取消审核对应数据, 是否继续?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
      })
        .then(() => {
          updateApplyBillCancelApi({
            applyId: this.tableRow.applyId,
          }).then((response) => {
            this.getTableData(); //获取表格数据
          });
        })
        .catch((action) => {});
    },
    checkbillCancelApply() {
      //取消申请
      this.$confirm("此操作将取消申请对应数据, 是否继续?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
      })
        .then(() => {
          checkbillCancelApplyApi({
            applyId: this.tableRow.applyId,
          }).then((response) => {
            this.getTableData(); //获取表格数据
          });
        })
        .catch((action) => {});
    },
    billdocheck() {
      updateApplyBillFail({
        applyId: this.tableRow.applyId,
        wyApplyExplan: this.textarea,
      }).then((response) => {
        this.getTableData(); //获取表格数据
      });
      this.dialogVisible = false;
    },
    buildingchange(index) {
      this.options3 = [];
      this.searchList.index3 = "";
      this.searchList.KHDA_KHMC = "";
      this.searchList.FJDA_ZJ = "";
      this.searchList.DLDA_ZJ =
        index === "" ? "" : this.options2[index].DLDA_ZJ;
      queryRoomMessage({
        DLDA_ZJ: this.options2[index].DLDA_ZJ,
      }).then((response) => {
        this.options3 = response;
      });
    },
    roomchange(index) {
      this.options4 = [];
      this.searchList.KHDA_KHMC = "";
      this.searchList.FJDA_ZJ =
        index === "" ? "" : this.options3[index].FJDA_ZJ;
      queryClientForRoom({
        FJDA_ZJ: this.options3[index].FJDA_ZJ,
      }).then((response) => {
        this.options4 = response;
      });
    },
    getdata() {
      this.handleCurrentChange(1);
      this.tableData1 = [];
    },
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中

      this.disablebutton =
        row.wyApplyStatus === 0 && row.status == 1 ? false : true;
      this.disablebuttonCancel =
        (row.isJtApply === false && row.wyApplyStatus == 2) ||
        (row.isJtApply === false && row.wyApplyStatus == 3) ||
        (row.isJtApply === true && row.wyApplyStatus == 2) ||
        (row.isJtApply === true && row.wyApplyStatus == 3)
          ? false
          : true; //是否集团审核否
      this.disableddobill = row.canInvoice && row.status == 1 ? false : true;

      this.tableData1 = [];
      queryApplicationFormDetails({
        applyId: row.applyId,
      }).then((response) => {
        this.tableData1 = response.data;
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.searchList.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据

      this.tableRow = []; //选择后清空选中表格数据
    },
    getTableData() {
      queryUnpaidConfirmApplicationForms(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.disablebutton = true;
        this.disableddobill = true;
        this.disablebuttonCancel = true;
        this.radio = "";

        if (response.data.length > 0) {
          queryApplicationFormDetails({
            applyId: response.data[0].applyId,
          }).then((response) => {
            this.tableData1 = response.data;
          });
        } else {
          this.tableData1 = [];
        }
      });
    },
  },
};
</script>
<style lang="scss" scope>
.UncollectedSure .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.UncollectedSure .el-input {
  width: 100% !important;
}

.UncollectedSure .totalmoney {
  float: left;
  font-size: 16px;
  position: relative;
  top: 6px;
  left: 19px;
  color: #606266;
}

.UncollectedSure .billtitle {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 36px;
}

.UncollectedSure .el-select {
  width: 100%;
}
</style>
