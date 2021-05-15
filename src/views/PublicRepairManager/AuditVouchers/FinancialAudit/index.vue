<!-- 表单设置 -->
<template>
  <div class="NonFinancialAudit">
    <div class="el-content">
      <el-row class="buttonBox">
        <el-col :span="24">
          <el-button
            type="primary"
            @click="updateClick()"
            :disabled="disableUpdate"
            v-has="'PublicRepairFinanciaUpdate_has'"
            >修改</el-button
          >
          <el-button
            type="primary"
            @click="passClick()"
            :disabled="disablePass"
            v-has="'PublicRepairFinanciaPass_has'"
            >通过</el-button
          >
          <el-button
            type="primary"
            @click="nopassClick()"
            :disabled="disableNoPass"
            v-has="'PublicRepairFinanciaNotPass_has'"
            >不通过</el-button
          >
        </el-col>
      </el-row>
      <el-row class="sysCon_Mt">
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          class="tableContent"
          @row-click="rowClick"
          max-height="500"
        >
          <el-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="YFPZ_PZBH"
            label="凭证编号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="YFPZ_XMMC"
            label="项目名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="YFPZ_LKZRR"
            label="领款责任人"
            width="150"
          ></el-table-column>
          <el-table-column prop="YFPZ_YSFY" label="预算费用"></el-table-column>
          <el-table-column prop="YFPZ_YZFY" label="预支费用"></el-table-column>
          <el-table-column prop="YFPZ_SJFY" label="实际费用"></el-table-column>
          <el-table-column prop="YFPZ_JMJE" label="减免费用"></el-table-column>
          <el-table-column prop="YFPZ_YXX" label="是否付款"></el-table-column>
          <el-table-column prop="YFPZ_YZJE" label="已支金额"></el-table-column>
          <el-table-column
            prop="YFPZ_TBRQ"
            label="填表日期"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="YFPZ_CWSHBZ"
            label="财务审批备注"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="YFPZ_CWSPSJ"
            label="财务审批时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="YFPZ_CWSPR"
            label="财务审批人"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="YFPZ_CWSPYJ"
            label="财务审批意见"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="YFPZ_SPWTGYY"
            label="审批未通过原因"
            width="250"
          ></el-table-column>
        </el-table>
      </el-row>
    </div>
    <!--新增弹窗 start-->
    <FinancialAuditDialog
      :showdialog.sync="showdialog"
      ref="Popchildren"
      @RefreshItem="RefreshList"
    ></FinancialAuditDialog>
    <!--修改弹窗 end-->

    <!-- 审核不通过弹窗 start -->
    <NonPassDialog
      :showNopassdialog.sync="showNopassdialog"
      ref="nopassChildren"
      @RefreshItem="RefreshList"
    ></NonPassDialog>
    <!-- 审核不通过弹窗end -->
  </div>
</template>
<script>
import NonPassDialog from "./components/NonPassDialog";
import FinancialAuditDialog from "./components/FinancialAuditDialog";
import {
  queryFinancial,
  updateFinancialPass,
} from "@/api/PublicRepairManager/AuditVouchers"; //审核
export default {
  data() {
    return {
      tableOnceData: {},
      radio: "",
      showdialog: false, //默认不弹窗,
      disableUpdate: true, //修改按钮 默认不可用
      disablePass: true, //审核按钮 默认不可用
      disableNoPass: true, //审核不通过按钮 默认不可用
      showNopassdialog: false,
      tableData: [],
      tableParameter: {
        //列表参数
      },
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disableUpdate = false;
        this.disablePass = false;
        this.disableNoPass = false;
      } else {
        this.disableUpdate = true;
        this.disablePass = true;
        this.disableNoPass = true;
      }
    },
  },
  methods: {
    getRowTable() {
      this.getTabList();
    },
    getTabList() {
      //获取列表数据
      queryFinancial().then((response) => {
        this.tableData = response;
      });
    },
    rowClick(row) {
      this.tableOnceData = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    updateClick() {
      //修改
      this.radio = ""; //选择后清空选中表格按钮
      this.showdialog = true;
      this.$refs.Popchildren.getData(this.tableOnceData);
    },
    passClick() {
      //审核通过点击事件
      this.$confirm("确认审批通过所选的应付凭证？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateFinancialPass(this.tableOnceData).then((response) => {
            this.radio = ""; //选择后清空选中表格按钮
            this.tableOnceData = {}; //选择后清空选中表格数据
            this.getTabList();
          });
        })
        .catch(() => {});
    },
    nopassClick() {
      //审核不通过点击事件
      this.showNopassdialog = true;
      this.$refs.nopassChildren.getData(this.tableOnceData.YFPZ_ZJ);
    },
    RefreshList(newobj) {
      //刷新列表
      this.tableOnceData = newobj;
      this.getTabList();
    },
    updateTitle() {
      //设置默认收款方式 修改 删除提示
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
  },
  components: {
    NonPassDialog,
    FinancialAuditDialog,
  },
};
</script>

<style lang="scss" scoped>
.NonFinancialAudit {
  position: relative;
  .el-content {
    padding: 0 30px;
  }
  .el-input__inner {
    width: 100%;
  }
  .el-paginationR {
    text-align: right;
    margin-top: 20px;
  }
  .el-radio__label {
    padding: 0;
  }
  .gb_img {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
  }
}
</style>
