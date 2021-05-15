<template>
  <div class="container ProjectSettlement" ref="conRef">
    <div class="el-do" ref="selectRef">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form label-width="85px">
          <el-row :gutter="30">
            <el-col :span="3" style="width: 200px">
              <el-form-item label="" label-width="0">
                <el-select
                  v-model="tableParameter.CONDITION"
                  @change="statusChange"
                >
                  <el-option label="当前" :value="1"></el-option>
                  <el-option label="历史" :value="2"></el-option>
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
                <el-input v-model="tableParameter.PRM" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'ProjectSettlementQuery_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- 按钮区域start -->
    <section class="buttonBox footerbuttonbox" ref="buttonRef">
      <el-row>
        <el-col :span="24">
          <el-button
            type="primary"
            @click="dealClick"
            :disabled="disableShow"
            v-has="'ProjectSettlementDeal_has'"
          >
            {{ butTxt }}</el-button
          >
        </el-col>
      </el-row>
    </section>
    <!-- 按钮区域end -->
    <div class="el-body" :style="styleObj">
      <!-- 左边数：按资源与按客户 -->
      <div class="el-title" style="height: 100%">
        <el-radio-group v-model="TreeNavBar" @change="TreeNavSwich" class="nav">
          <el-radio-button :label="1">大项目</el-radio-button>
          <el-radio-button :label="2">小项目</el-radio-button>
        </el-radio-group>
        <div v-show="TreeNavBar == 1" class="guest_wrap">
          <el-table
            :data="bigTableData"
            style="width: 100%"
            max-height="350"
            border
            @row-click="bigRowClick"
            highlight-current-row
            ref="bigChildren"
            class="guest_table"
          >
            <el-table-column
              label="维修方案编号"
              prop="WXFA_NO"
              width="150"
            ></el-table-column>
            <el-table-column
              label="维修项目"
              prop="WXFA_XMMC"
              width="150"
            ></el-table-column>
            <el-table-column
              label="已预支金额"
              prop="WXFA_YYZJE"
              width="150"
            ></el-table-column>
            <el-table-column
              label="预支费用"
              prop="WXFA_YZFY"
            ></el-table-column>
          </el-table>
        </div>
        <section v-show="TreeNavBar == 2" class="guest_wrap">
          <el-table
            :data="smallTableData"
            style="width: 100%"
            max-height="350"
            border
            @row-click="smallRowClick"
            highlight-current-row
            ref="smallChildren"
            class="guest_table"
          >
            <el-table-column
              label="登记号"
              prop="WXDJ_NO"
              width="150"
            ></el-table-column>
            <el-table-column
              label="报修日期"
              prop="WXDJ_BXRQ"
              width="150"
            ></el-table-column>
            <el-table-column
              label="维修项目"
              prop="WXDJ_XMMC"
            ></el-table-column>
            <el-table-column
              label="预算费用"
              prop="WXDJ_YSFY"
            ></el-table-column>
            <el-table-column label="位置" prop="WXDJ_BXDZ"></el-table-column>
            <el-table-column
              label="维修进度"
              prop="WXDJ_WXJD"
            ></el-table-column>
          </el-table>
        </section>
      </div>
      <!-- 右边模块 orgAdd-->
      <div class="el-content">
        <div>
          <!-- <keep-alive> -->
          <component
            :is="skzxcomp"
            ref="NavCompChildren"
            @RefreshItem="RefreshTab"
          ></component>
          <!-- </keep-alive> -->
        </div>
      </div>
    </div>
    <!-- 凭证弹窗 单列布局start -->
    <DealWithDialog
      :showdialog.sync="showdialog"
      @RefreshItem="RefreshList"
      ref="PopChildren"
    ></DealWithDialog>
  </div>
</template>
<script>
import {
  queryBigProject,
  querySmallProject,
} from "@/api/PublicRepairManager/ProjectSettlement"; //工程结算Api
import { currDate, getCurrMonthFirstDay } from "@/utils/global.js";
import EngineeringProgress from "./EngineeringProgress"; //工程进展
import DealWithDialog from "./components/DealWithDialog";
export default {
  name: "ProjectSettlement",
  data() {
    return {
      skzxcomp: "EngineeringProgress", //默认选中未收清款项NotReceipted
      isCheck: 1, //1.预算分摊 2.预算不足用户
      TreeNavBar: 1, //1.大项目，2.小项目
      tableParameter: {
        WXFA_QSRQ: null,
        WXFA_JSRQ: null,
        PRM: null,
        CONDITION: 1,
      },
      time: [],
      bigTableData: [], //大项目数据
      smallTableData: [], //小项目数据
      parameObj: {},
      butTxt: "产生凭证",
      disableShow: false,
      showdialog: false,
      styleObj: {
        height: "",
      },
    };
  },
  watch: {
    parameObj() {
      if (this.parameObj.CODE == "false") {
        this.disableShow = true;
      } else {
        this.disableShow = false;
      }
      if (this.parameObj.SHOW == "true") {
        this.butTxt = "修改凭证";
      } else {
        this.butTxt = "产生凭证";
      }
    },
  },
  mounted() {
    this.styleObj.height =
      this.$refs.conRef.offsetHeight -
      this.$refs.selectRef.offsetHeight -
      this.$refs.buttonRef.offsetHeight -
      15 +
      "px";
    this.tableParameter.WXFA_QSRQ = getCurrMonthFirstDay();
    this.tableParameter.WXFA_JSRQ = currDate(true); //当前日期
    this.time.push(this.tableParameter.WXFA_QSRQ);
    this.time.push(this.tableParameter.WXFA_JSRQ);
    this.tableParameter.state = 1;
    this.getBigTableData();
  },
  methods: {
    getBigTableData() {
      //大项目查询
      queryBigProject(this.tableParameter).then((response) => {
        this.bigTableData = response;
        if (this.bigTableData.length > 0) {
          this.parameObj = this.bigTableData[0];
        } else {
          this.parameObj = {};
        }
        this.$refs.bigChildren.setCurrentRow(this.parameObj); //默认选中列表第一个
        this.$nextTick(() => {
          this.$refs.NavCompChildren.RecequeryByPage(
            this.parameObj,
            this.TreeNavBar
          );
        });
      });
    },
    getSmallTableData() {
      //小项目查询
      querySmallProject(this.tableParameter).then((response) => {
        this.smallTableData = response;
        if (this.smallTableData.length > 0) {
          this.parameObj = this.smallTableData[0];
        } else {
          this.parameObj = {};
        }
        this.$refs.smallChildren.setCurrentRow(this.parameObj); //默认选中列表第一个
        this.$nextTick(() => {
          this.$refs.NavCompChildren.RecequeryByPage(
            this.parameObj,
            this.TreeNavBar
          );
        });
      });
    },
    timeChange(val) {
      this.tableParameter.WXFA_QSRQ = val[0];
      this.tableParameter.WXFA_JSRQ = val[1];
    },
    submit() {
      //搜索
      if (this.TreeNavBar == 1) {
        this.getBigTableData(1);
      } else {
        this.getSmallTableData(1);
      }
    },
    statusChange(val) {
      //状态查询
      this.isCheck = 1;
      if (this.TreeNavBar == 1) {
        this.getBigTableData(1);
      } else {
        this.getSmallTableData(1);
      }
    },
    /**大项目/小项目 导航切换 */
    TreeNavSwich(index) {
      //index:1大项目，2小项目
      this.TreeNavBar = index;
      if (this.TreeNavBar == 1) {
        this.tableParameter.state = 1;
        this.getBigTableData();
      } else {
        this.tableParameter.state = 2;
        this.getSmallTableData();
      }
    },
    /**标签选项切换 预算分摊、预算不足用户*/
    NavSwich(val, index) {
      this.skzxcomp = val;
      this.isCheck = index;
    },
    bigRowClick(row) {
      //大项目点击事件
      this.parameObj = row;
      this.$nextTick(() => {
        this.$refs.NavCompChildren.RecequeryByPage(row, this.TreeNavBar);
      });
    },
    smallRowClick(row) {
      //小项目点击事件
      this.parameObj = row;
      this.$nextTick(() => {
        this.$refs.NavCompChildren.RecequeryByPage(row, this.TreeNavBar);
      });
    },
    dealClick() {
      //凭证按钮点击时间
      this.showdialog = true;
      this.$refs.PopChildren.getData(this.parameObj, this.TreeNavBar);
    },
    RefreshTab(len) {
      if (len <= 0) {
        this.disableShow = true;
      }
    },
    RefreshList(type, newRowObj) {
      //刷新
      this.tableParameter.WXFA_QSRQ = getCurrMonthFirstDay();
      this.tableParameter.WXFA_JSRQ = currDate(true); //当前日期

      if (type == 1) {
        this.tableParameter.state = 1;
        this.bigTableData.forEach((item) => {
          if (item.WXFA_ZJ == newRowObj.WXFA_ZJ) {
            this.$refs.bigChildren.setCurrentRow(item);
          }
        });
        this.getBigTableData();
      } else {
        this.tableParameter.state = 2;
        this.smallTableData.forEach((item) => {
          if (item.WXDJ_ZJ == newRowObj.WXDJ_ZJ) {
            this.$refs.smallChildren.setCurrentRow(item);
          }
        });
        this.getSmallTableData();
      }
    },
  },
  components: {
    EngineeringProgress,
    DealWithDialog,
  },
};
</script>
<style lang="scss">
.ProjectSettlement {
  padding: 0;
  .el-do {
    padding: 30px 30px 20px 30px;
  }
  .el-body {
    padding-left: 300px;
    border-top: 1px solid #f1f1f1;
    border-radius: 0;
    height: auto;
    .el-title {
      width: 300px;
      margin-left: -300px;
      padding: 0;
    }
  }
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .footerbuttonbox {
    display: block;
    padding-left: 30px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .nav {
    width: 100%;
    margin-bottom: 20px;
    .el-radio-button__inner {
      border: none !important;
      border-radius: 0 !important;
      width: 100% !important;
      color: #4d4d4d;
      font-weight: 700;
      font-size: 14px;
      background: rgba(214, 215, 220, 1);
      padding: 0;
      line-height: 36px;
    }
    .el-radio-button {
      width: 50%;
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: #2e8ad7;
      background: #fff;
      box-shadow: none;
      font-weight: 700;
      font-size: 14px;
    }
  }
  .guest_wrap {
    padding: 0 20px;
  }
}
</style>
