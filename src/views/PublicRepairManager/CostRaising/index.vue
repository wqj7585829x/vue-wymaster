<template>
  <div class="container CostRaising" ref="conRef">
    <div class="el-do" ref="selectRef">
      <!-- 搜索框begin -->
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
                  v-has="'CostRaisingQuery_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <section class="buttonBox footerbuttonbox" ref="buttonRef">
      <el-button
        type="primary"
        @click="budgetSetClick"
        :disabled="disabledSet"
        v-has="'CostRaisingbudgetSet_has'"
        >预算设置
      </el-button>
      <el-button
        type="primary"
        @click="budgetInClick"
        :disabled="disabledFT"
        v-has="'CostRaisingBudgetIn_has'"
        >预算分摊
      </el-button>
    </section>
    <div class="el-body" :style="styleObj">
      <!-- 左边数：按资源与按客户 -->
      <div class="el-title" style="height: 100%">
        <el-radio-group
          v-model="TreeNavBar"
          @change="TreeNavSwich"
          class="cost_nav"
        >
          <el-radio-button :label="1">大项目</el-radio-button>
          <el-radio-button :label="2">小项目</el-radio-button>
        </el-radio-group>
        <div v-show="TreeNavBar == 1" class="guest_wrap">
          <el-table
            :data="bigTableData"
            style="width: 100%"
            border
            @row-click="bigRowClick"
            highlight-current-row
            ref="bigChildren"
          >
            <el-table-column
              label="维修方案编号"
              prop="WXFA_NO"
              width="150"
            ></el-table-column>
            <el-table-column
              label="维修项目"
              prop="WXFA_XMMC"
            ></el-table-column>
            <el-table-column
              label="编制日期"
              prop="WXFA_BZRQ"
              width="150"
            ></el-table-column>
          </el-table>
        </div>
        <section v-show="TreeNavBar == 2" class="guest_wrap">
          <el-table
            :data="smallTableData"
            style="width: 100%"
            border
            @row-click="smallRowClick"
            highlight-current-row
            ref="smallChildren"
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
            <el-table-column label="位置" prop="WXDJ_BXDZ"></el-table-column>
          </el-table>
        </section>
      </div>
      <!-- 右边模块 orgAdd-->
      <div class="el-content">
        <div class="nav_barHeight">
          <ul class="nav-bar">
            <li class="nav-li" @click="NavSwich('BudgetAllocation', 1)">
              <span :class="{ on: isCheck == 1 }">预算分摊</span>
            </li>
            <li class="nav-li" @click="NavSwich('BudgetInsUser', 2)">
              <span :class="{ on: isCheck == 2 }">预算不足用户</span>
            </li>
          </ul>
        </div>
        <div>
          <!-- 各个模块组件 -->
          <!-- <keep-alive> -->
          <component :is="skzxcomp" ref="NavCompChildren"></component>
          <!-- </keep-alive> -->
        </div>
      </div>
    </div>
    <!-- 预算设置 弹窗start -->
    <BudgetSetDialog
      :showdialog.sync="showdialog"
      ref="PopChildren"
      @RefreshItem="RefreshList"
    ></BudgetSetDialog>
    <!-- 预算设置 弹窗end -->
  </div>
</template>
<script>
import BudgetAllocation from "./BudgetAllocation"; //预算分摊
import BudgetInsUser from "./BudgetInsUser"; //预算不足用户
import BudgetSetDialog from "./components/BudgetSetDialog"; //预算设置
import {
  queryBigProject,
  querySmallProject,
  budgetDistributionForBigProject,
  budgetDistributionForSmallProject,
  isBudgetDistributionForBigProject,
  queryUnderbudgetUser,
} from "@/api/PublicRepairManager/CostRaising"; //费用筹集Api
import { currDate, getCurrMonthFirstDay } from "@/utils/global.js";
export default {
  name: "CostRaising",
  data() {
    return {
      skzxcomp: "BudgetAllocation", //默认选中未收清款项NotReceipted
      isCheck: 1, //1.预算分摊 2.预算不足用户
      TreeNavBar: 1, //1.大项目，2.小项目
      disabledSet: true, //默认预算设置按钮不可点击
      disabledFT: true, //默认预算分摊按钮不可点击
      showdialog: false, //默认预算设置弹窗隐藏
      tableParameter: {
        beginDate: null,
        endDate: null,
        likeCondition: null,
        ZT: 0,
      },
      bigTableData: [], //大项目数据
      smallTableData: [], //小项目数据
      parameObj: {},
      isCan: true, //判断大项目预算分摊是否可以点击
      time: [],
      yfsf: 0,
      inUserLen: 0, //预算不足用户数据为空
      styleObj: {
        height: "",
      },
    };
  },
  watch: {
    parameObj() {
      if (this.TreeNavBar == 1) {
        //判断如果是点击的是大项目   则预算设置按钮不可点击
        this.disabledSet = true;
      } else {
        //if (this.parameObj.WXDJ_WXJD == "费用筹集") {
        //this.disabledSet = false;
        // } else {
        //   this.disabledSet = true;
        //   this.disabledFT = true;
        // }
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
    this.tableParameter.beginDate = getCurrMonthFirstDay();
    this.tableParameter.endDate = currDate(true); //当前日期
    this.time.push(this.tableParameter.beginDate);
    this.time.push(this.tableParameter.endDate);
    this.getBigTableData();
  },
  methods: {
    timeChange(val) {
      this.tableParameter.beginDate = val[0];
      this.tableParameter.endDate = val[1];
    },
    getBigTableData() {
      //大项目查询
      queryBigProject(this.tableParameter).then((response) => {
        this.bigTableData = response;
        if (this.bigTableData.length > 0) {
          this.parameObj = this.bigTableData[0];
          this.getIsBudget();
        } else {
          this.disabledFT = true;
          this.parameObj = {};
        }
        this.$refs.bigChildren.setCurrentRow(this.parameObj); //默认选中列表第一个
        this.$nextTick(() => {
          this.$refs.NavCompChildren.RecequeryByPage(this.parameObj);
        });
      });
    },
    getSmallTableData() {
      //小项目查询
      querySmallProject(this.tableParameter).then((response) => {
        this.smallTableData = response;
        if (this.smallTableData.length > 0) {
          this.parameObj = this.smallTableData[0];
          if (this.parameObj.WXDJ_SFYS) {
            this.disabledSet = true;
            this.disabledFT = true;
          } else {
            this.disabledSet = false;
            this.disabledFT = false;
          }
        } else {
          this.disabledFT = true;
          this.parameObj = {};
        }
        this.$refs.smallChildren.setCurrentRow(this.parameObj); //默认选中列表第一个
        this.$nextTick(() => {
          this.$refs.NavCompChildren.RecequeryByPage(this.parameObj);
        });
      });
    },
    getIsBudget() {
      //大项目是否可以预算分摊
      isBudgetDistributionForBigProject(this.parameObj).then((response) => {
        this.isCan = response.isCan;
        if (this.isCan) {
          this.disabledFT = false;
        } else {
          this.disabledFT = true;
        }
      });
    },
    getBudgetUser() {
      // queryUnderbudgetUser(this.parameObj).then(response => {
      //   if (response.length > 0) {
      //     this.$alert("注:维修金余额不足,需要筹集资金!", "公维金管理", {
      //       confirmButtonText: "确定"
      //     });
      //     return;
      //   }
      if (this.TreeNavBar == 1) {
        this.yfsf = this.parameObj.WXFA_YSFY;
        this.parameObj.XMMC = this.parameObj.WXFA_XMMC;
      } else {
        this.yfsf = this.parameObj.WXDJ_YSFY;
        this.parameObj.XMMC = this.parameObj.WXDJ_XMMC;
      }
      if (this.yfsf == 0) {
        this.$alert("预算金额为0,请先设置预算金额", "公维金管理", {
          confirmButtonText: "确定",
        });
      } else {
        if (this.TreeNavBar == 1) {
          budgetDistributionForBigProject(this.parameObj).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$nextTick(function () {
                this.$refs.NavCompChildren.RecequeryByPage(this.parameObj);
              });
            }
          });
        } else {
          this.parameObj.FTJE = this.parameObj.WXDJ_YSFY;
          budgetDistributionForSmallProject(this.parameObj).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$nextTick(function () {
                this.$refs.NavCompChildren.RecequeryByPage(this.parameObj);
              });
            }
          });
        }
      }
      // });
    },
    /**大项目/小项目 导航切换 */
    TreeNavSwich(index) {
      //index:1大项目，2小项目
      this.TreeNavBar = index;
      if (this.TreeNavBar == 1) {
        this.getBigTableData();
      } else {
        this.getSmallTableData();
      }
    },
    /**标签选项切换 预算分摊、预算不足用户*/
    NavSwich(val, index) {
      this.skzxcomp = val;
      this.isCheck = index;
      this.$nextTick(function () {
        this.$refs.NavCompChildren.RecequeryByPage(this.parameObj);
      });
    },
    budgetSetClick() {
      //预算设置点击事件
      this.showdialog = true;
      this.$refs.PopChildren.getData(this.parameObj);
    },
    budgetInClick() {
      this.getBudgetUser();
      //预算分摊
    },
    bigRowClick(row) {
      //大项目点击事件
      this.parameObj = row;
      this.$nextTick(() => {
        this.getIsBudget();
        this.$refs.NavCompChildren.RecequeryByPage(row);
      });
    },
    smallRowClick(row) {
      //小项目点击事件
      this.parameObj = row;
      if (row.WXDJ_SFYS) {
        this.disabledSet = true;
        this.disabledFT = true;
      } else {
        this.disabledSet = false;
        this.disabledFT = false;
      }
      this.$nextTick(() => {
        this.$refs.NavCompChildren.RecequeryByPage(row);
      });
    },
    submit() {
      //搜索
      if (this.TreeNavBar == 1) {
        this.getBigTableData();
      } else {
        this.getSmallTableData();
      }
    },
    statusChange(val) {
      //状态查询
      if (this.TreeNavBar == 1) {
        this.getBigTableData();
      } else {
        this.getSmallTableData();
      }
    },
    RefreshList(newRowObj) {
      this.parameObj = newRowObj;
      this.smallTableData.forEach((item) => {
        if (item.WXDJ_ZJ == newRowObj.WXDJ_ZJ) {
          this.$refs.smallChildren.setCurrentRow(item);
        }
      });
      this.getSmallTableData();
    },
  },
  components: {
    BudgetAllocation,
    BudgetInsUser,
    BudgetSetDialog,
  },
};
</script>
<style lang="scss">
.CostRaising {
  border-radius: 4px;
  padding: 0;
  .el-body {
    padding-left: 330px;
    border-top: 1px solid #f1f1f1;
    border-radius: 0;
    .el-title {
      width: 330px;
      margin-left: -330px;
      padding: 0;
    }
    .el-content {
      padding: 0;
      .nav_barHeight {
        height: 48px;
      }
      .nav-bar {
        margin: 0;
        padding: 0;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        .nav-li {
          position: relative;
          list-style-type: none;
          float: left;
          width: 148px;
          height: 36px;
          text-align: center;
          font-size: 14px;
          color: rgba(77, 77, 77, 1);
          background: rgba(214, 215, 220, 1);
          .on {
            display: block;
            position: absolute;
            width: 148px;
            background: #2e8ad7;
            top: 0;
            left: 0;
            height: 36px;
            background: rgba(255, 255, 255, 1);
            overflow: hidden;
            color: #2e8ad7;
          }
        }
      }
    }
  }
  .el-do {
    padding: 30px 30px 20px 30px;
    .select {
      .el-row {
        margin-left: 0px !important;
        margin-right: 0px !important;
      }
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
  .cost_nav {
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
