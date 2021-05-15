<template>
  <div class="container">
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form label-width="85px">
          <el-row :gutter="30">
            <el-col :span="3" style="width: 200px">
              <el-form-item label="" label-width="0">
                <el-select v-model="tableParameter.ZT" @change="statusChange">
                  <el-option label="当前" :value="1"></el-option>
                  <el-option label="历史" :value="2"></el-option>
                  <el-option label="更改方案" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 400px">
              <el-form-item label="" label-width="0">
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="timeChange"
                  :clearable="false"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 200px">
              <el-form-item label-width="0px">
                <el-input v-model="tableParameter.keyword" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'RepairPlanQuery_has'"
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
              :disabled="disabledAdd"
              @click="addRepairPlan"
              v-has="'RepairPlanADD_has'"
              >新增</el-button
            >
            <el-button
              type="primary"
              :disabled="disabledShow"
              @click="updateRepairPlan"
              v-has="'RepairPlanUpdate_has'"
              >修改</el-button
            >
            <el-button
              type="primary"
              :disabled="disabledShow"
              @click="sinnatureClick"
              v-has="'RepairPlanSinnature_has'"
              >业主签字</el-button
            >
            <el-button
              type="primary"
              :disabled="disabledShow"
              @click="submitReview"
              v-has="'RepairPlanReview_has'"
              >提交审核</el-button
            >
            <el-button
              type="danger"
              :disabled="disabledShow"
              @click="delRePlan"
              v-has="'RepairPlanDel_has'"
              >删除</el-button
            >
          </el-col>
        </el-row>
      </section>
      <!-- 按钮区域end -->
      <!-- 表格列表start -->
      <section>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          class="tableContent"
          @row-click="rowClick"
        >
          <el-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="WXFA_NO"
            label="方案编号"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="WXFA_BZR"
            label="编制人"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXFA_BZRQ"
            label="编制日期"
            width="160"
          ></el-table-column>
          <el-table-column prop="WXFA_XMMC" label="项目名称"></el-table-column>
          <el-table-column
            prop="WXFA_XCCKJL"
            label="现场查看记录"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="WXFA_FASM"
            label="方案说明"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="WXFA_FTBZ"
            label="分摊标准"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="WXFA_YSFY"
            label="预算费用"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXFA_YSR"
            label="预算人"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXFA_YZFY"
            label="预支费用"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXFA_GCBQM"
            label="工程签名"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXFA_GLCQM"
            label="管理部签名"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXFA_YZWYQM"
            label="业主委员签名"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXFA_YZWYYJ"
            label="业主委员会意见"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="WXFA_BZ"
            label="备注"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXFA_SPWTGYY"
            label="审批未通过原因"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="WXFA_TJSJ"
            label="提交时间"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXFA_SPYJ"
            label="审批意见"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="WXFA_SHBZ"
            label="审批备注"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="WXFA_SPR"
            label="审批人"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="WXFA_SPSJ"
            label="审批时间"
            width="100"
          ></el-table-column>
        </el-table>
      </section>
      <!-- 明细 -->
      <section class="buttonBox footerbuttonbox">
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              :disabled="disableddysq"
              :title="updateTitle()"
              @click="dysqClick"
              >对应申请单</el-button
            >
            <el-button
              type="primary"
              :disabled="disabledyzqz"
              :title="updateTitle()"
              @click="yzqzClick"
              >签字业主</el-button
            >
          </el-col>
        </el-row>
      </section>
    </div>
    <!-- 维修方案 新增/修改弹窗start -->
    <RepairPlanDialog
      :showdialog.sync="showdialog"
      @RefreshItem="RefreshList"
      ref="PopChildren"
    ></RepairPlanDialog>
    <!-- 维修方案 新增/修改弹窗end -->

    <!-- 对应申请单start -->
    <RequisitionDialog
      :showProgressdialog.sync="showProgressdialog"
      ref="ReChildren"
    ></RequisitionDialog>
    <!-- 对应申请单end -->

    <!-- 业主签字明细start -->
    <SignatureDetailDialog
      :showAcceptdialog.sync="showAcceptdialog"
      ref="SignatureChildren"
    ></SignatureDetailDialog>
    <!-- 业主签字明细end -->

    <!-- 业主签字保存start -->
    <SignatureSaveDialog
      :showsingSavedialog.sync="showsingSavedialog"
      ref="SignSaveChildren"
    ></SignatureSaveDialog>
    <!-- 业主签字保存end -->
  </div>
</template>
<script>
import {
  queryMaintenanceProposal,
  submitApproval,
  deleteMaintenanceProposal,
} from "@/api/PublicRepairManager/RepairPlan"; //维修方案
import RepairPlanDialog from "./components/RepairPlanDialog"; //维修方案 新增、修改 弹窗
import RequisitionDialog from "./components/RequisitionDialog"; //对应申请单明细 弹窗
import SignatureDetailDialog from "./components/SignatureDetailDialog"; //业主签字明细 弹窗
import SignatureSaveDialog from "./components/SignatureSaveDialog"; //业主签字保存 弹窗
import { currDate, getCurrMonthFirstDay } from "@/utils/global.js";
export default {
  data() {
    return {
      radio: "",
      tableData: [], //表格数据
      DetailtableData: [], //开票明细表格数据
      listStatus: 1, //搜索条件 1.当前 2.历史 3.更改方案
      tableParameter: {
        //搜索列表参数
        KSRQ: "",
        JSRQ: "",
        keyword: null,
        ZT: 1,
      },
      showdialog: false, //默认新增/修改弹窗隐藏
      showProgressdialog: false, //默认对应申请单明细弹窗隐藏
      showAcceptdialog: false, //默认业主签字明细弹窗隐藏
      showsingSavedialog: false, //默认业主签字保存弹出隐藏
      disableddysq: true,
      disabledyzqz: true,
      detailRow: {}, //选中票据data
      disabledShow: true,
      disabledAdd: false, //新增默认可点击
      time: [],
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disableddysq = false;
        this.disabledyzqz = false;
        if (this.detailRow.SPZT == "未提交" || this.detailRow.SPZT == "驳回") {
          this.disabledShow = false;
        } else {
          this.disabledShow = true;
        }
      } else {
        this.disabledShow = true;
        this.disableddysq = true;
        this.disabledyzqz = true;
      }
    },
  },
  mounted() {
    this.tableParameter.KSRQ = getCurrMonthFirstDay();
    this.tableParameter.JSRQ = currDate(true); //当前日期
    this.time.push(this.tableParameter.KSRQ);
    this.time.push(this.tableParameter.JSRQ);
    this.getTableList();
  },
  methods: {
    rowClick(row) {
      this.detailRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    timeChange(val) {
      this.tableParameter.KSRQ = val[0];
      this.tableParameter.JSRQ = val[1];
    },
    submit() {
      this.radio = "";
      this.detailRow = "";
      this.DetailtableData = [];
      this.getTableList();
    },
    getTableList() {
      //维修方案列表
      queryMaintenanceProposal(this.tableParameter).then((response) => {
        this.tableData = response;
      });
    },
    statusChange(val) {
      //状态查询
      if (val == 2 || val == 3) {
        //历史状态下新增按钮不可点击
        this.disabledAdd = true;
      } else {
        this.disabledAdd = false;
      }
      this.radio = "";
      this.detailRow = "";
      this.DetailtableData = [];
      this.getTableList();
    },
    dysqClick() {
      this.showProgressdialog = true;
      this.$refs.ReChildren.getData(this.detailRow.WXFA_ZJ);
    },
    yzqzClick() {
      //业主签字明细弹窗点击事件
      this.showAcceptdialog = true;
      this.$refs.SignatureChildren.getData(this.detailRow.WXFA_ZJ);
    },
    addRepairPlan() {
      //新增维修方案
      this.radio = "";
      this.showdialog = true;
      this.$refs.PopChildren.getData({}, 1);
    },
    updateRepairPlan() {
      //修改维修方案
      this.showdialog = true;
      this.$refs.PopChildren.getData(this.detailRow, 2);
    },
    sinnatureClick() {
      //业主签字保存按钮点击事件
      this.showsingSavedialog = true;
      this.$refs.SignSaveChildren.getData(this.detailRow.WXFA_ZJ);
    },
    submitReview() {
      //提交审核
      this.$confirm("是否确定提交审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          submitApproval(this.detailRow.WXFA_ZJ).then((response) => {
            this.getTableList();
            this.radio = ""; //清空选中
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    delRePlan() {
      //删除维修方案
      this.$confirm("是否确定删除此记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMaintenanceProposal(this.detailRow.WXFA_ZJ).then((response) => {
            this.getTableList();
            this.radio = ""; //清空选中
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    RefreshList(newRowObj) {
      //刷新
      this.detailRow = newRowObj; //弹窗确定后更新表格选中值
      this.getTableList();
    },
    updateTitle() {
      //修改标题提示
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
    clearTable() {
      this.DetailtableData = []; //清空票据本明细
      this.detailRow = {};
      this.radio = "";
    },
  },
  components: {
    RepairPlanDialog,
    RequisitionDialog,
    SignatureDetailDialog,
    SignatureSaveDialog,
  },
};
</script>
<style lang="scss" scoped>
.footerbuttonbox {
  margin: 30px 0;
}
.detailBox {
  padding: 16px 0 0 0;
  h2 {
    color: #666;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 0;
    padding: 0;
    border-top: 4px solid #eff0f0;
    padding: 16px 0 10px 0;
  }
}
.el-date-editor.el-input__inner {
  width: 100%;
}

// .el-date-editor.el-input,
// .el-date-editor.el-input__inner {
//   width: 100%;
// }
</style>
