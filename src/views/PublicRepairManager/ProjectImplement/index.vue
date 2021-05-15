<template>
  <div class="container ProjectImplement" ref="conRef">
    <div class="projectShow_wrap" v-show="financiasetShow">
      <div class="el-do" ref="selectRef">
        <!-- 搜索框begin -->
        <div class="select">
          <el-form label-width="85px">
            <el-row :gutter="30">
              <el-col :span="3" style="width: 200px">
                <el-form-item label="" label-width="0">
                  <el-select
                    v-model="tableParameter.state"
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
                  <el-input
                    v-model="tableParameter.message"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0px">
                  <el-button
                    type="success"
                    @click="submit()"
                    v-has="'ProjectImplementQuery_has'"
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
              @click="engAcceptClick"
              :disabled="disableShow"
              v-has="'ProjectImplementAccept_has'"
              >交付验收</el-button
            >
          </el-col>
        </el-row>
      </section>
      <!-- 按钮区域end -->
      <div class="el-body" :style="styleObj">
        <!-- 左边数：按资源与按客户 -->
        <div class="el-title">
          <el-radio-group
            v-model="TreeNavBar"
            @change="TreeNavSwich"
            class="nav"
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
              class="guest_table"
            >
              <el-table-column
                label="维修方案编号"
                prop="WXFA_NO"
                width="150"
              ></el-table-column>
              <el-table-column
                label="维修单编号"
                prop="WXD_NO"
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
          <!-- 按钮操作 start-->
          <section class="buttonBox">
            <el-row>
              <el-col :span="24">
                <el-button
                  type="primary"
                  @click="add()"
                  :disabled="disabledAdd"
                  v-has="'ProjectImplementAdd_has'"
                  >新增
                </el-button>
                <el-button
                  type="primary"
                  @click="update()"
                  :disabled="disabledupdate"
                  v-has="'ProjectImplementUpdate_has'"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  @click="deleteTab()"
                  :disabled="disabledelete"
                  v-has="'ProjectImplementDel_has'"
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
                prop="SSGC_WXDJNO"
                label="维修登记号"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="SSGC_FXMC"
                label="分项名称"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="SSGC_BW"
                label="部位"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="SSGC_DJ"
                label="单价"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="SSGC_SL"
                label="数量"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="SSGC_ZJQ"
                label="总价"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="SSGC_DW"
                label="单位"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="SSGC_KSRQ"
                label="开始日期"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="SSGC_JZRQ"
                label="截止日期"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="SSGC_SM"
                label="说明"
                width="200"
              ></el-table-column>
              <el-table-column prop="SSGC_HD" label="核定"></el-table-column>
            </el-table>
          </el-row>
          <!-- 表格 end-->
        </div>
      </div>
    </div>
    <!-- 工程进展新增修改弹窗 start -->
    <EngineeringProgressDialog
      :showdialog.sync="showdialog"
      @RefreshItem="RefreshList"
      ref="PopChildren"
    >
    </EngineeringProgressDialog>

    <!--开工时间设置弹窗-->
    <BudgetSetKGDialog
      :showdialogSet.sync="showdialogSet"
      @RefreshItem="RefreshKGTable"
      ref="budgetChildren"
    >
    </BudgetSetKGDialog>

    <!--完工时间设置弹窗-->
    <BudgetSetWGDialog
      :showdialogWGSet.sync="showdialogWGSet"
      @RefreshItem="RefreshWGTable"
      ref="budgetwgChildren"
    >
    </BudgetSetWGDialog>

    <!--交付验收-->
    <EngineeringAccept
      v-show="showdialogAccept"
      @RefreshItem="AcceptRefreshList"
      ref="acceptChildren"
    >
    </EngineeringAccept>
  </div>
</template>
<script>
import {
  queryBigProject,
  queryLittleProject,
  queryBigProjectProgress,
  queryLittleProjectProgress,
  deleteBigProjectProgress,
  deleteLittleProjectProgress,
} from "@/api/PublicRepairManager/ProjectImplement"; //工程实施Api
import { currDate, getCurrMonthFirstDay } from "@/utils/global.js";
import EngineeringProgressDialog from "./components/EngineeringProgressDialog"; //工程进度新增弹窗
import BudgetSetKGDialog from "./components/BudgetSetKGDialog"; //开工时间弹窗
import BudgetSetWGDialog from "./components/BudgetSetWGDialog"; //完工时间弹窗
import EngineeringAccept from "./EngineeringAccept"; //交付验收
export default {
  name: "ProjectImplement",
  data() {
    return {
      TreeNavBar: 1, //1.大项目，2.小项目
      tableParameter: {
        queryTime1: null,
        queryTime2: null,
        message: null,
        state: 1,
      },
      bigTableData: [], //大项目数据
      smallTableData: [], //小项目数据
      tableData: [], //工程进展列表数据
      parameObj: {},
      disabledAdd: false, //新增
      disabledupdate: true, //修改
      disabledelete: true, //删除
      radio: "", //选中
      tableRow: {}, //修改数据
      showdialog: false, //工程进度弹窗默认隐藏
      showdialogSet: false, //开工时间弹窗默认隐藏
      showdialogWGSet: false, //完工时间弹窗默认隐藏
      showdialogAccept: false, //交付验收默认隐藏
      disableShow: true, //交付验收按钮默认不可点击
      financiasetShow: true, //当点击交付验收时   隐藏当前页面
      time: [], //查询时默认的时间数据
      styleObj: {
        height: "",
      },
    };
  },
  watch: {
    tableData() {
      if (this.tableData.length > 0) {
        this.disableShow = false;
      } else {
        this.disableShow = true;
      }
    },
    parameObj() {
      if (this.parameObj.SHOW == "true") {
        this.disabledAdd = false;
      } else {
        this.disabledAdd = true;
      }
    },
    radio() {
      if (this.radio !== "") {
        if (this.parameObj.SHOW == "true") {
          this.disabledupdate = false;
          this.disabledelete = false;
        } else {
          this.disabledupdate = true;
          this.disabledelete = true;
        }
      } else {
        this.disabledupdate = true;
        this.disabledelete = true;
      }
    },
    $route(to, from) {
      if (to.path == "/PublicRepairManager/ProjectImplement") {
        this.radio = "";
        this.showdialogAccept = false;
        this.financiasetShow = true;
        if (this.TreeNavBar == 1) {
          this.getBigTableData(1);
        } else {
          this.getSmallTableData(1);
        }
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
    this.tableParameter.queryTime1 = getCurrMonthFirstDay();
    this.tableParameter.queryTime2 = currDate(true); //当前日期
    this.time.push(this.tableParameter.queryTime1);
    this.time.push(this.tableParameter.queryTime2);
    this.getBigTableData(1);
  },
  methods: {
    timeChange(val) {
      this.tableParameter.queryTime1 = val[0];
      this.tableParameter.queryTime2 = val[1];
    },
    getTableList(val) {
      //工程进度 表格数据查询
      if (this.TreeNavBar == 1) {
        queryBigProjectProgress(val).then((response) => {
          this.tableData = response;
        });
      } else {
        queryLittleProjectProgress(val).then((response) => {
          this.tableData = response;
        });
      }
    },
    getBigTableData(val) {
      var _this = this;
      //大项目查询
      queryBigProject(this.tableParameter).then((response) => {
        this.bigTableData = response;
        if (this.bigTableData.length > 0) {
          if (val == 1) {
            this.parameObj = this.bigTableData[0];
            this.$refs.bigChildren.setCurrentRow(this.parameObj); //默认选中列表第一个
            this.$nextTick(() => {
              this.getTableList(this.parameObj.WXDJ_ZJ);
            });
          } else {
            this.bigTableData.forEach((item) => {
              if (item.WXFA_ZJ == this.parameObj.WXFA_ZJ) {
                this.parameObj = item;
                this.$refs.bigChildren.setCurrentRow(item);
                this.$nextTick(() => {
                  this.getTableList(item.WXDJ_ZJ);
                });
              }
            });
          }
        } else {
          this.disabledAdd = true;
          this.tableData = [];
        }
      });
    },
    getSmallTableData(val) {
      //小项目查询
      queryLittleProject(this.tableParameter).then((response) => {
        this.smallTableData = response;
        if (this.smallTableData.length > 0) {
          if (val == 1) {
            this.parameObj = this.smallTableData[0];
            this.$refs.smallChildren.setCurrentRow(this.parameObj); //默认选中列表第一个
            this.$nextTick(() => {
              this.getTableList(this.parameObj.WXDJ_ZJ);
            });
          } else {
            this.smallTableData.forEach((item) => {
              if (item.WXDJ_ZJ == this.parameObj.WXDJ_ZJ) {
                this.parameObj = item;
                this.$refs.smallChildren.setCurrentRow(item);
                this.$nextTick(() => {
                  this.getTableList(item.WXDJ_ZJ);
                });
              }
            });
          }
        } else {
          this.disabledAdd = true;
          this.tableData = [];
        }
      });
    },
    /**大项目/小项目 导航切换 */
    TreeNavSwich(index) {
      //index:1大项目，2小项目
      this.radio = "";
      this.TreeNavBar = index;
      if (this.TreeNavBar == 1) {
        this.getBigTableData(1);
      } else {
        this.getSmallTableData(1);
      }
    },
    bigRowClick(row) {
      //大项目点击事件
      this.radio = "";
      this.tableRow = {};
      this.parameObj = row;
      this.getTableList(row.WXDJ_ZJ);
    },
    smallRowClick(row) {
      //小项目点击事件
      this.radio = "";
      this.tableRow = {};
      this.parameObj = row;
      this.getTableList(row.WXDJ_ZJ);
    },
    rowClick(row) {
      //表格单行点击
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    add() {
      //工程进展  添加按钮点击事件
      if (this.parameObj.WXDJ_KGSJ == undefined) {
        //如果没有设置开工时间先会弹出设置完工时间弹窗
        this.$alert("工程开工时间没有设置,是否需要设置?", "提示", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.showdialogSet = true;
            this.$refs.budgetChildren.getData(this.parameObj, this.TreeNavBar);
          },
        });
      } else {
        //如果已经设置开工时间 则弹出新增弹出界面
        this.showdialog = true;
        this.$refs.PopChildren.getData({}, this.parameObj, 1, this.TreeNavBar);
        this.radio = ""; //选择后清空选中表格按钮
        this.tableRow = {}; //选择后清空选中表格数据
      }
    },
    update() {
      if (Object.keys(this.tableRow) != "") {
        this.showdialog = true;
        this.$refs.PopChildren.getData(
          this.tableRow,
          this.parameObj,
          2,
          this.TreeNavBar
        );
      }
    },
    deleteTab() {
      //删除选中表格数据
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.TreeNavBar == 1) {
            deleteBigProjectProgress(
              this.parameObj.WXDJ_ZJ,
              this.tableRow
            ).then((response) => {
              this.getBigTableData(2);
              this.radio = ""; //清空选中
            });
          } else {
            deleteLittleProjectProgress(
              this.parameObj.WXDJ_ZJ,
              this.tableRow
            ).then((response) => {
              this.getSmallTableData(2);
              this.radio = ""; //清空选中
            });
          }
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    RefreshList(newRowObj, type) {
      //刷新
      this.TreeNavBar = type;
      this.parameObj = newRowObj;
      this.tableRow = newRowObj;
      if (type == 1) {
        this.getBigTableData(2);
      } else {
        this.getSmallTableData(2);
      }
    },
    AcceptRefreshList(newRowObj, type) {
      //交付验收刷新
      this.showdialogAccept = false;
      this.financiasetShow = true;
      this.TreeNavBar = type;
      this.parameObj = newRowObj;
      this.tableRow = newRowObj;
      if (type == 1) {
        this.getBigTableData(2);
      } else {
        this.getSmallTableData(2);
      }
    },
    RefreshKGTable(newRowObj, type) {
      //开工时间刷新
      this.TreeNavBar = type; //1大项目  2小项目
      this.showdialog = true;
      this.$refs.PopChildren.getData({}, newRowObj, 1, this.TreeNavBar); //注   如果开工时间界面点了取消或者确定按钮 都会弹出新增工程进展页面
    },
    RefreshWGTable(newRowObj, type) {
      //完工时间刷新
      this.TreeNavBar = type; //1大项目  2小项目
      this.showdialogAccept = true;
      this.financiasetShow = false;
      this.$refs.acceptChildren.getData(newRowObj, this.TreeNavBar); //注   如果完工时间界面点了取消或者确定按钮 都会跳转到交付验收页面
    },
    engAcceptClick() {
      //交付验收点击事件
      if (this.parameObj.WXDJ_WGSJ == undefined) {
        //如果没有设置完工时间先会弹出设置完工时间弹窗
        this.$confirm("工程完工时间没有设置,是否需要设置?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            //点击确定设置完工时间
            this.showdialogWGSet = true;
            this.$refs.budgetwgChildren.getData(
              this.parameObj,
              this.TreeNavBar
            );
          })
          .catch(() => {
            this.getTableList();
          });
      } else {
        //如果已经设置了完工  则直接跳转到交付验收界面
        this.showdialogAccept = true;
        this.financiasetShow = false;
        this.$refs.acceptChildren.getData(this.parameObj, this.TreeNavBar);
      }
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
      if (this.TreeNavBar == 1) {
        this.getBigTableData(1);
      } else {
        this.getSmallTableData(1);
      }
    },
  },
  components: {
    EngineeringProgressDialog,
    BudgetSetKGDialog,
    BudgetSetWGDialog,
    EngineeringAccept,
  },
};
</script>
<style lang="scss">
.ProjectImplement {
  padding: 0;
  .el-body {
    padding-left: 300px;
    border-top: 1px solid #f1f1f1;
    border-radius: 0;
    .el-title {
      width: 300px;
      margin-left: -300px;
      padding: 0;
    }
    .el-content {
      padding: 10px 30px 0 30px;
    }
  }
  .projectShow_wrap {
    width: 100%;
    height: 100%;
  }
  .el-do {
    padding: 30px 30px 10px 30px;
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
