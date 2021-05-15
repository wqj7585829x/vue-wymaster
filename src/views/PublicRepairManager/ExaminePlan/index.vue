<template>
  <div class="container">
    <!-- 右边内容区域 -->
    <div class="el-content">
      <!-- 按钮操作 start-->
      <section class="buttonBox">
        <el-row>
          <el-col :span="24">
            <!-- <el-button type="primary" @click="updateClick()" :disabled="disabledUpdate">修改</el-button> -->
            <el-button
              type="primary"
              @click="passClick()"
              :disabled="disabledShow"
              v-has="'ExaminePlanPass_has'"
              >通过</el-button
            >
            <el-button
              type="primary"
              @click="nopassClick()"
              :disabled="disabledShow"
              v-has="'ExaminePlanNotPass_has'"
              >不通过</el-button
            >
            <el-button
              type="primary"
              @click="wxdjClick()"
              :disabled="disabledShow"
              v-has="'ExaminePlandysq_has'"
              >对应申请单</el-button
            >
            <!-- <el-button type="primary" @click="wxdClick()" :disabled="disabledShow">维修单</el-button>     -->
          </el-col>
        </el-row>
      </section>
      <!-- 按钮操作 end-->

      <!-- 表格 start-->
      <el-row class="sysCon_Mt">
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
            width="150"
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
      </el-row>
      <!-- 表格 end-->
    </div>
    <!-- 审核方案 新增/修改弹窗start -->
    <ExaminePlanDialog
      :showdialog.sync="showdialog"
      @RefreshItem="RefreshList"
      ref="PopChildren"
    ></ExaminePlanDialog>
    <!-- 审核方案 新增/修改弹窗end -->

    <!-- 审核不通过弹窗 start -->
    <ApprovalDialog
      :showNopassdialog.sync="showNopassdialog"
      ref="nopassChildren"
      @RefreshItem="RefreshList"
    ></ApprovalDialog>
    <!-- 审核不通过弹窗end -->

    <!-- 对应申请单明细 start -->
    <RegistrationDialog
      :showWXDJdialog.sync="showWXDJdialog"
      :tableRow="tableRow"
    ></RegistrationDialog>
    <!-- 对应申请单明细end -->
  </div>
</template>
<script>
import {
  queryMaintenanceProposal,
  examinationPassed,
} from "@/api/PublicRepairManager/ExaminePlan"; //审核方案
import ApprovalDialog from "./components/ApprovalDialog"; //审批弹窗
import RegistrationDialog from "./components/RegistrationDialog"; //对应申请单弹窗
import ExaminePlanDialog from "./components/ExaminePlanDialog"; //审核方案 修改 弹窗
export default {
  name: "Institutional",
  data() {
    return {
      radio: "", //选中
      tableData: [],
      tableRow: {}, //修改数据
      disabledShow: true,
      disabledUpdate: true,
      showNopassdialog: false, //默认审核不通过弹窗隐藏
      showWXDJdialog: false,
      showWXDdialog: false,
      showdialog: false, //默认新增/修改弹窗隐藏
    };
  },
  components: {
    ApprovalDialog,
    RegistrationDialog,
    ExaminePlanDialog,
  },
  mounted() {
    this.getTableList();
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        this.disabledShow = false;
        this.disabledUpdate = false;
      } else {
        this.disabledShow = true;
        this.disabledUpdate = true;
      }
    },
  },
  methods: {
    rowClick(row) {
      //表格单行点击
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    RefreshList() {
      //刷新
      this.radio = "";
      this.getTableList();
    },
    getTableList() {
      //查询审核方案列表数据
      queryMaintenanceProposal().then((response) => {
        this.tableData = response;
      });
    },
    updateClick() {
      //修改点击事件
      this.showdialog = true;
      this.$refs.PopChildren.getData(this.tableRow);
    },
    passClick() {
      //审核通过点击事件
      this.showNopassdialog = true;
      this.$refs.nopassChildren.getData(this.tableRow, 1);
    },
    nopassClick() {
      //审核不通过点击事件
      this.showNopassdialog = true;
      this.$refs.nopassChildren.getData(this.tableRow, 2);
    },
    wxdjClick() {
      //维修登记点击
      this.showWXDJdialog = true;
    },
    wxdClick() {
      //维修单明细点击事件
      this.showWXDdialog = true;
    },
    updateTitle() {
      //修改标题提示
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
    detelteTitle() {
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  .el-date-editor.el-input {
    width: 100%;
  }
  .footerbuttonbox {
    margin-top: 30px;
  }
}
</style>
