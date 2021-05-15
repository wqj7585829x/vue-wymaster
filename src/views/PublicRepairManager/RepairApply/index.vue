<template>
  <div class="container RepairApply" ref="conRef">
    <div class="el-do" ref="selectRef">
      <div class="select">
        <el-form label-width="85px">
          <el-row :gutter="30">
            <el-col :span="3" style="width: 200px">
              <el-form-item label="" label-width="0">
                <el-select v-model="tableParameter.ZT" @change="statusChange">
                  <el-option label="当前" :value="0"></el-option>
                  <el-option label="历史" :value="1"></el-option>
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
                <el-input
                  v-model="tableParameter.likeCondition"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'RepairApplyQuery_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="el-body" :style="styleObj">
      <div class="el-title">
        <!--维修登记列表数据 start-->
        <div>
          <el-table
            :data="RegisterData"
            border
            @row-click="RegisterRowClick"
            highlight-current-row
            ref="regChildren"
            class="guest_table"
          >
            <el-table-column
              label="维修登记号"
              prop="WXDJ_NO"
              width="200"
            ></el-table-column>
            <el-table-column
              label="维修项目"
              prop="WXDJ_XMMC"
            ></el-table-column>
          </el-table>
        </div>
        <!--维修登记列表数据 end-->
      </div>

      <!-- 右边内容区域 -->
      <div class="el-content">
        <!-- 按钮操作 start-->
        <section class="buttonBox">
          <el-row>
            <el-col :span="24">
              <el-button
                type="primary"
                @click="add()"
                :disabled="disabledAdd"
                :title="addTitle"
                v-has="'RepairApplyAdd_has'"
                >新增</el-button
              >
              <el-button
                type="primary"
                @click="update()"
                :disabled="disabledupdate"
                :title="updateTitle()"
                v-has="'RepairApplyUpdate_has'"
                >修改</el-button
              >
              <el-button
                type="danger"
                @click="deleteTab()"
                :disabled="disabledelete"
                :title="detelteTitle()"
                v-has="'RepairApplyDel_has'"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </section>
        <!-- 按钮操作 end-->

        <!-- 表格 start-->
        <el-row class="sysCon_Mt">
          <el-table
            :data="tableData"
            style="width: 100%"
            border
            class="tableContent"
            ref="singleTable"
            @row-click="rowClick"
          >
            <el-table-column label="选择" width="50">
              <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio"
                  >&nbsp;</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="WXD_NO"
              label="维修单号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_WXDJNO"
              label="维修登记号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_YSFY"
              label="预算费用"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="WXD_KDR"
              label="开单人"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_KDSJ"
              label="开单日期"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_JDR"
              label="接单人"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="WXD_JDSJ"
              label="接单日期"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_YYXWSJ"
              label="预约维修日期"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="WXD_KGSJ"
              label="完工日期"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_WGSJ"
              label="完工日期"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_GCSM"
              label="工程说明"
              width="250"
            ></el-table-column>
          </el-table>
        </el-row>
        <!-- 表格 end-->

        <!-- 工程进度/工程验收 start -->
        <section class="buttonBox footerbuttonbox">
          <el-row>
            <el-col :span="24">
              <el-button
                type="primary"
                @click="progressClick"
                v-has="'RepairApplyProgress_has'"
                >工程进度</el-button
              >
              <el-button
                type="primary"
                @click="acceptClick"
                v-has="'RepairApplyAccept_has'"
                >工程验收</el-button
              >
            </el-col>
          </el-row>
        </section>
        <!-- 工程进度/工程验收  end -->
      </div>
      <!-- 新增、修改弹窗 单列布局start -->
      <RepairApplyDialog
        :showdialog.sync="showdialog"
        @RefreshItem="RefreshList"
        ref="RepairChildren"
      >
      </RepairApplyDialog>
      <!-- 新增、修改弹窗 单列布局end -->

      <!-- 工程进度start -->
      <ProgressDialog
        :showProgressdialog.sync="showProgressdialog"
        ref="progressChildren"
      ></ProgressDialog>
      <!-- 工程进度end -->

      <!-- 工程验收start -->
      <AcceptanceDialog
        :showAcceptdialog.sync="showAcceptdialog"
        ref="acceptChildren"
      ></AcceptanceDialog>
      <!-- 工程验收end -->
    </div>
  </div>
</template>
<script>
import {
  queryRepairRegister,
  queryRepairBill,
  queryProjectProgress,
  delRepairApply,
} from "@/api/PublicRepairManager/RepairApply";
import RepairApplyDialog from "./components/RepairApplyDialog"; //新增修改弹出
import ProgressDialog from "./components/ProgressDialog"; //工程进度
import AcceptanceDialog from "./components/AcceptanceDialog"; //工程验收
import { currDate, getCurrMonthFirstDay } from "@/utils/global.js";
export default {
  name: "Institutional",
  data() {
    return {
      disabledAdd: true, //新增 默认不可点击
      addTitle: "", //新增标题提示
      disabledupdate: true, //修改
      disabledelete: true, //删除
      RegisterData: [], //维修登记列表数据
      tableData: [], //维修单表格数据
      progressData: [], //工程进度数据
      showdialog: false, //新增修改弹窗默认隐藏
      showProgressdialog: false, //工程进度默认隐藏
      showAcceptdialog: false, //工程验收默认隐藏
      radio: "",
      tableParameter: {
        //搜索列表参数
        beginDate: "",
        endDate: "",
        likeCondition: null,
        ZT: 0,
      },
      parameObj: {}, //维修单查询参数
      tableRow: {},
      time: [],
      styleObj: {
        height: "",
      },
    };
  },
  components: {
    RepairApplyDialog,
    ProgressDialog,
    AcceptanceDialog,
  },
  mounted() {
    this.tableParameter.beginDate = getCurrMonthFirstDay();
    this.tableParameter.endDate = currDate(true); //当前日期
    this.time.push(this.tableParameter.beginDate);
    this.time.push(this.tableParameter.endDate);
    this.queryRegData();
    this.styleObj.height =
      this.$refs.conRef.offsetHeight - this.$refs.selectRef.offsetHeight + "px";
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        if (this.progressData.length > 0 || this.tableRow.WXD_SPZT == 2) {
          this.disabledupdate = true;
          this.disabledelete = true;
        } else {
          this.disabledupdate = false;
          this.disabledelete = false;
        }
      } else {
        this.disabledupdate = true;
        this.disabledelete = true;
      }
    },
  },
  methods: {
    add() {
      this.showdialog = true;
      this.$refs.RepairChildren.getData(this.parameObj, {}, 1);
    },
    update() {
      if (Object.keys(this.tableRow) != "") {
        this.showdialog = true;
        this.$refs.RepairChildren.getData(this.parameObj, this.tableRow, 2);
      }
    },
    timeChange(val) {
      this.tableParameter.beginDate = val[0];
      this.tableParameter.endDate = val[1];
    },
    submit() {
      //查询
      this.radio = "";
      this.tableRow = "";
      this.queryRegData();
    },
    statusChange(val) {
      //状态查询
      this.radio = "";
      this.tableRow = "";
      this.queryRegData();
    },
    rowClick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    RefreshList(newRowObj) {
      this.tableRow = newRowObj; //弹窗确定后更新表格选中值
      this.parameObj = newRowObj;
      this.RegisterData.forEach((item) => {
        if (item.WXDJ_ZJ == newRowObj.WXDJ_ZJ) {
          this.$refs.regChildren.setCurrentRow(item);
        }
      });
      this.getRegBillData();
      this.getProgressData();
    },
    queryRegData() {
      //维修登记查询
      queryRepairRegister(this.tableParameter).then((response) => {
        this.RegisterData = response;
        if (this.RegisterData.length > 0) {
          this.parameObj = this.RegisterData[0];
          this.$refs.regChildren.setCurrentRow(this.parameObj); //默认选中维修登记列表第一个
          this.$nextTick(() => {
            this.getRegBillData();
            this.getProgressData();
          });
        }
      });
    },
    getRegBillData() {
      //维修单查询
      queryRepairBill(this.parameObj.WXDJ_ZJ).then((response) => {
        this.tableData = response;
        if (this.tableData.length > 0) {
          this.disabledAdd = true;
        } else {
          this.disabledAdd = false;
        }
      });
    },
    getProgressData() {
      //查询工程进度
      queryProjectProgress(this.parameObj.WXDJ_ZJ).then((response) => {
        this.progressData = response;
      });
    },
    RegisterRowClick(row) {
      //维修
      this.radio = "";
      this.parameObj = row;
      this.getRegBillData();
      this.getProgressData();
    },
    deleteTab() {
      //删除选中表格数据
      if (Object.keys(this.tableRow) != "") {
        this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delRepairApply(this.parameObj.WXDJ_ZJ, this.tableRow.WXD_ZJ).then(
              (response) => {
                this.getRegBillData();
                this.radio = ""; //清空选中
              }
            );
          })
          .catch(() => {
            this.radio = ""; //清空选中
          });
      }
    },
    progressClick() {
      //工程进度点击
      this.showProgressdialog = true;
      this.$refs.progressChildren.getData(this.progressData);
    },
    acceptClick() {
      //工程验收
      this.showAcceptdialog = true;
      this.$refs.acceptChildren.getData(this.parameObj.WXDJ_ZJ);
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
.RepairApply {
  padding: 0;
  .el-do {
    padding: 30px 30px 20px 30px;
  }
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .footerbuttonbox {
    display: block;
    padding: 0 30px 30px 30px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-content {
    padding: 10px 30px 0 30px;
  }
}
.el-body {
  padding-left: 350px;
  border-top: 1px solid #f1f1f1;
  .el-title {
    width: 350px;
    margin-left: -350px;
    .el-radio-group {
      width: 250px;
      margin: 20px auto 20px auto;
      text-align: center;
      .el-radio-button__inner {
        padding: 10px 12px !important;
      }
    }
    .guest_table {
      margin-top: 20px;
    }
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .footerbuttonbox {
    margin-top: 30px;
  }
}
</style>
