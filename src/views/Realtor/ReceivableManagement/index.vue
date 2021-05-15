<template>
  <!--应收管理-->
  <div class="container ReceivableManagement">
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select" ref="selectRef">
        <el-form label-width="120px">
          <el-row :gutter="30">
            <el-col :span="6" style="width: 300px">
              <el-form-item label="项目名称:" label-width="100px">
                <el-select
                  v-model="projectName"
                  @change="PlotChange"
                  multiple
                  collapse-tags
                >
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
              <el-form-item label="合同编号:" label-width="100px">
                <el-select
                  v-model="tableParameter.contractNum"
                  @change="contractChange"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in proChargeData"
                    :key="item.contract_id"
                    :value="item.contract_num"
                    :label="item.contract_num"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 300px">
              <el-form-item label="房间名称:" label-width="100px">
                <el-select
                  v-model="tableParameter.FJDA_FJMC"
                  @change="fjChange"
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
              <el-form-item label="客户名称:" label-width="100px">
                <el-input v-model="tableParameter.KHDA_KHMC"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="width: 300px">
              <el-form-item label="所属开始年月:" label-width="100px">
                <el-date-picker
                  type="month"
                  placeholder="选择年月"
                  value-format="yyyy-MM"
                  v-model="tableParameter.FYSQ_SSNY_start"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="width: 300px">
              <el-form-item label="所属结束年月:" label-width="100px">
                <el-date-picker
                  type="month"
                  placeholder="选择年月"
                  value-format="yyyy-MM"
                  v-model="tableParameter.FYSQ_SSNY_end"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="width: 0">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'ReceivableManagementQuery_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 按钮begin -->
      <div class="buttonBox" v-if="activeName == '2'">
        <el-button
          type="primary"
          :disabled="disableAdd"
          @click="adjAdd"
          v-has="'ReceivableManagementAdd_has'"
          >新增</el-button
        >
        <el-button
          type="primary"
          :disabled="disableUpdate"
          @click="adjUpdate"
          v-has="'ReceivableManagementUpdate_has'"
          >修改</el-button
        >
        <el-button
          type="danger"
          :disabled="disableDel"
          @click="adjDelete"
          v-has="'ReceivableManagementDel_has'"
          >删除
        </el-button>
      </div>
      <div class="buttonBox" v-if="activeName == '3'">
        <el-button
          type="primary"
          :disabled="disableSure"
          @click="sureClick"
          v-has="'ReceivableManagementSure_has'"
          >确认本月应收</el-button
        >
      </div>
      <!-- 按钮end -->
      <!-- 表格列表start -->
      <section>
        <el-tabs v-model="activeName" type="card" @tab-click="tabclick">
          <el-tab-pane label="应收列表" name="1">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              max-height="550"
              row-key="id"
              :tree-props="{ children: 'children' }"
              class="tableContent"
              :summary-method="getSummaries"
              :show-summary="true"
            >
              <el-table-column
                label="项目名称"
                prop="GLCNAME"
                width="200"
              ></el-table-column>
              <el-table-column
                label="合同编号"
                prop="contractNum"
                width="200"
              ></el-table-column>
              <el-table-column
                label="房间名称"
                prop="FJDA_FJMC"
                width="200"
              ></el-table-column>
              <el-table-column
                label="出租面积"
                prop="rentalArea"
                width="200"
              ></el-table-column>
              <el-table-column
                label="单价"
                prop="priceUnit"
                width="200"
              ></el-table-column>
              <el-table-column
                label="客户名称"
                prop="KHDA_KHMC"
                width="200"
              ></el-table-column>
              <el-table-column
                label="所属年月"
                prop="FYSQ_SSNY"
                width="200"
              ></el-table-column>
              <el-table-column
                label=" 租金(含税)"
                prop="totalAmount"
                width="200"
              ></el-table-column>
              <el-table-column
                label="租金(不含税)"
                prop="amount"
                width="200"
              ></el-table-column>
              <el-table-column
                label="税率"
                prop="taxRate"
                width="200"
              ></el-table-column>
            </el-table>
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
          </el-tab-pane>
          <el-tab-pane label="调整列表" name="2">
            <el-table
              :data="adjFeeData"
              border
              style="width: 100%"
              max-height="550"
              class="tableContent"
              @row-click="rowClick1"
              :summary-method="getSummaries"
              :show-summary="true"
            >
              <el-table-column label="选择" width="50" fixed>
                <template slot-scope="scope">
                  <el-radio :label="scope.$index" v-model="radio"
                    >&nbsp;</el-radio
                  >
                </template>
              </el-table-column>
              <el-table-column
                label="项目名称"
                prop="GLCNAME"
                width="200"
              ></el-table-column>
              <el-table-column
                label="合同编号"
                prop="contractNum"
                width="200"
              ></el-table-column>
              <el-table-column
                label="房间名称"
                prop="FJDA_FJMC"
                width="200"
              ></el-table-column>
              <el-table-column
                label="出租面积"
                prop="rentalArea"
                width="200"
              ></el-table-column>
              <el-table-column
                label="单价"
                prop="priceUnit"
                width="200"
              ></el-table-column>
              <el-table-column
                label="客户名称"
                prop="KHDA_KHMC"
                width="200"
              ></el-table-column>
              <el-table-column
                label="所属年月"
                prop="FYSQ_SSNY"
                width="200"
              ></el-table-column>
              <el-table-column
                label="租金(含税)"
                prop="totalAmount"
                width="200"
              ></el-table-column>
              <el-table-column
                label="租金(不含税)"
                prop="amount"
                width="200"
              ></el-table-column>
              <el-table-column
                label="税率"
                prop="taxRate"
                width="200"
              ></el-table-column>
              <el-table-column prop="" fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    class="button-text"
                    :disabled="scope.row.FYSQ_ZT != 0"
                    @click.stop="checkcontract(scope.row)"
                    >审核</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
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
          </el-tab-pane>
          <el-tab-pane label="实际应收列表" name="3">
            <el-table
              :data="adjRealData"
              border
              style="width: 100%"
              max-height="550"
              class="tableContent"
              row-key="id"
              :tree-props="{ children: 'children' }"
              @selection-change="changeFun"
              @row-click="rowclick2"
              :cell-class-name="checkbox"
              ref="realRef"
              :summary-method="getSummaries"
              :show-summary="true"
            >
              <el-table-column
                label="选择"
                type="selection"
                @selection-change="changeFun"
                :selectable="IsSelectionban"
                fixed
                width="50"
              ></el-table-column>
              <el-table-column
                label="项目名称"
                prop="GLCNAME"
                width="200"
              ></el-table-column>
              <el-table-column
                label="合同编号"
                prop="contractNum"
                width="200"
              ></el-table-column>
              <el-table-column
                label="房间名称"
                prop="FJDA_FJMC"
                width="200"
              ></el-table-column>
              <el-table-column
                label="出租面积"
                prop="rentalArea"
                width="200"
              ></el-table-column>
              <el-table-column
                label="单价"
                prop="priceUnit"
                width="200"
              ></el-table-column>
              <el-table-column
                label="客户名称"
                prop="KHDA_KHMC"
                width="200"
              ></el-table-column>
              <el-table-column
                label="所属年月"
                prop="FYSQ_SSNY"
                width="200"
              ></el-table-column>
              <el-table-column
                label="实际租金"
                prop="totalAmount"
              ></el-table-column>
              <el-table-column
                label=" 租金(含税)"
                prop="totalAmount"
                width="200"
              ></el-table-column>
              <el-table-column
                label="租金(不含税)"
                prop="amount"
                width="200"
              ></el-table-column>
              <el-table-column
                label="税率"
                prop="taxRate"
                width="200"
              ></el-table-column>
              <el-table-column label="是否已确认" width="200">
                <template slot-scope="scope">
                  <el-checkbox
                    v-if="!scope.row.canConfirm"
                    disabled
                  ></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row>
              <div class="el-paginationR" v-show="returnTotal">
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
          </el-tab-pane>
        </el-tabs>
      </section>
    </div>
    <!-- 调整弹框 begin -->
    <AdjustmentDialog
      :showAdj.sync="showAdj"
      ref="PopAdjChildren"
      @RefreshItem="RefreshList"
    ></AdjustmentDialog>
    <!-- 调整 弹框 end -->
  </div>
</template>
<script>
import {
  queryReceivableCostListApi,
  queryZLRoomApi,
  queryAllChargeItemApi,
  queryAdjustFeeListApi,
  deleteReceivableApi,
  queryRealReceivableCostListApi,
  auditReceivableApi,
  freezeApi,
} from "@/api/Realtor/ReceivableManagement"; //房屋租凭应收管理api
import AdjustmentDialog from "./components/AdjustmentDialog";
import { mapGetters } from "vuex";
export default {
  name: "ReceivableManagement",
  computed: {
    ...mapGetters(["currentPlot", "userPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  components: {
    AdjustmentDialog,
  },
  data() {
    return {
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      tableParameter: {
        //搜索列表参数
        pageIndex: 0,
        pageSize: 20,
      },
      tableData: [], //应收列表数据
      adjFeeData: [], //调整列表数据
      adjRealData: [], //实际应收列表数据
      resourceData: [], //资源名称数据
      proChargeData: [], //合同管理主键
      multipleSelection: [], //表格选中数据
      activeName: "1", //默认选中应收列表
      disableAdd: true, //新增按钮默认不可点击
      disableUpdate: true, //修改按钮默认不可点击
      disableDel: true, //删除按钮默认不可点击
      disableSure: true, //确认应收按钮默认不可点击
      radio: "",
      tableRow: {},
      showAdj: false, //调整新增弹窗默认隐藏
      projectName: [], //项目名称多多选
      dbList: [],
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disableUpdate = false;
        this.disableDel = false;
      } else {
        this.disableUpdate = true;
        this.disableDel = true;
      }
    },
    currentPlot() {
      this.tableParameter.name = this.currentPlot;
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
            this.queryChargeItemRequest(); //合同编号查询
            this.getTableList(); //列表数据查询
          });
        }
      });
    },
    multipleSelection() {
      if (this.multipleSelection.length > 0) {
        this.disableSure = false;
      } else {
        this.disableSure = true;
      }
    },
  },
  mounted() {
    /**项目名称 */
    this.tableParameter.name = this.currentPlot;
    this.userPlot.forEach((item) => {
      if (item.GLCNAME == this.currentPlot) {
        this.tableParameter.dbName = item.dbName;
        this.tableParameter.GLCID = item.GLCID;
        this.tableParameter.YXDID = item.YXDID;
        let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
        this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
        this.$nextTick(() => {
          this.queryChargeItemRequest(); //合同编号查询
          this.getTableList(); //列表数据查询
        });
      }
    });
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.tableParameter.pageIndex = currentPage - 1;
      if (this.activeName == "1") {
        this.getTableList();
      } else if (this.activeName == "2") {
        this.getAdjustFeeList();
      } else {
        this.getqueryRealReceivableCostList();
      }
    },
    queryChargeItemRequest() {
      //合同编码查询
      queryAllChargeItemApi(this.dbList).then((response) => {
        this.proChargeData = response;
      });
    },
    queryResoureceRequest() {
      //房间名称查询
      queryZLRoomApi(this.tableParameter, this.dbList).then((response) => {
        this.resourceData = response;
      });
    },
    getTableList() {
      //应收列表数据查询
      queryReceivableCostListApi(this.tableParameter, this.dbList).then(
        (response) => {
          this.tableData = response.data;
          this.returnTotal = response.total;
        }
      );
    },
    getAdjustFeeList() {
      //调整列表数据查询
      queryAdjustFeeListApi(this.tableParameter, this.dbList).then(
        (response) => {
          this.adjFeeData = response.data;
          this.returnTotal = response.total;
        }
      );
    },
    getqueryRealReceivableCostList() {
      //实际应收列表数据查询
      queryRealReceivableCostListApi(this.tableParameter, this.dbList).then(
        (response) => {
          this.adjRealData = response.data;
          this.returnTotal = response.total;
        }
      );
    },
    rowClick1(row) {
      this.tableRow = row;
      this.radio = this.adjFeeData.indexOf(row); //单行点击单选按钮选中
    },
    PlotChange(val) {
      //项目名称改变事件
      this.dbList = [];
      this.tableParameter.contractNum = "";
      this.tableParameter.FJDA_FJMC = "";
      this.tableParameter.KHDA_KHMC = "";
      this.tableParameter.chargeItem = "";
      if (val.length > 0) {
        this.userPlot.forEach((item) => {
          val.forEach((item2) => {
            if (item.GLCNAME == item2) {
              var obj = {};
              obj.dbName = item.dbName;
              obj.GLCID = item.GLCID;
              obj.YXDID = item.YXDID;
              this.dbList.push(obj);
            }
          });
        });
      } else {
        this.dbList = [];
        this.resourceData = [];
        this.proChargeData = [];
      }
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址

      this.queryChargeItemRequest(); //合同编号查询
    },
    contractChange(val) {
      //合同编码改变事件
      this.tableParameter.FJDA_FJMC = "";
      this.tableParameter.KHDA_KHMC = "";
      if (val) {
        var obj = this.proChargeData.find((item) => {
          //这里的userList就是上面遍历的数据源
          return item.contract_num === val; //筛选出匹配数据
        });
        this.tableParameter.contract_id = obj.contract_id;
        this.tableParameter.KHDA_KHMC = obj.KHDA_KHMC;
        this.tableParameter.KHDA_ZJ = obj.KHDA_ZJ;
        this.queryResoureceRequest(); //资源名称查询
      } else {
        this.resourceData = [];
      }
    },
    changeFun(val) {
      this.multipleSelection = val;
    },
    fjChange(val) {
      //房间名称改变事件
      if (val) {
        var obj = this.resourceData.find((item) => {
          //这里的userList就是上面遍历的数据源
          return item.FJDA_FJMC === val; //筛选出匹配数据
        });
        this.tableParameter.FJDA_ZJ = obj.FJDA_ZJ;
        let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
        this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      }
    },
    tabclick(data) {
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      switch (this.activeName) {
        case "1":
          this.disableAdd = true;
          this.disableUpdate = true;
          this.disableDel = true;
          this.disableSure = true;
          this.getTableList();
          break;
        case "2":
          this.radio = "";
          this.tableRow = {};
          this.disableAdd = false;
          this.disableSure = true;
          this.getAdjustFeeList();
          break;
        case "3":
          this.disableAdd = true;
          this.disableUpdate = true;
          this.disableDel = true;
          this.getqueryRealReceivableCostList();
          break;
      }
    },
    checkcontract(data) {
      //审核
      this.$confirm("审核是否通过?", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "审核通过",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          auditReceivableApi(data).then((response) => {
            this.radio = ""; //清空选中
            this.getAdjustFeeList();
          });
        })
        .catch((action) => {});
    },
    adjAdd() {
      //调整新增事件
      this.radio = "";
      this.showAdj = true;
      var data = {};
      data.dbName = this.tableParameter.dbName;
      data.GLCID = this.tableParameter.GLCID;
      data.YXDID = this.tableParameter.YXDID;
      this.$refs.PopAdjChildren.getData(data, 1);
    },
    adjUpdate() {
      //调整修改事件
      this.showAdj = true;
      this.$refs.PopAdjChildren.getData(this.tableRow, 2);
    },
    adjDelete() {
      //调整删除
      if (Object.keys(this.tableRow) != "") {
        this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteReceivableApi(this.tableRow).then((response) => {
              this.radio = ""; //清空选中
              this.getAdjustFeeList();
            });
          })
          .catch(() => {
            this.radio = ""; //清空选中
          });
      }
    },
    RefreshList() {
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      this.radio = "";
      this.tableRow = {};
      this.getAdjustFeeList();
    },
    sureClick() {
      //确认应收
      var fyzj = "";
      var data = {};
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((item) => {
          if (item.children.length > 0) {
            item.children.forEach((item2) => {
              fyzj += item2.FYSQ_ZJ + ",";
            });
          }
        });
        fyzj = fyzj.substring(0, fyzj.length - 1);
      }
      data.FYSQ_ZJ = fyzj;
      data.dbName = this.tableParameter.dbName;
      data.GLCID = this.tableParameter.GLCID;
      data.YXDID = this.tableParameter.YXDID;
      freezeApi(data).then((response) => {
        this.radio = ""; //清空选中
        this.multipleSelection = [];
        this.getqueryRealReceivableCostList();
      });
    },
    submit() {
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      if (this.activeName == "1") {
        this.getTableList();
      } else if (this.activeName == "2") {
        this.getAdjustFeeList();
      } else {
        this.getqueryRealReceivableCostList();
      }
    },
    checkbox(row) {
      if (row.row.isChildren === 1) {
        return "mycell";
      }
    },
    IsSelectionban(row) {
      //多选按钮是否可选
      return row.canConfirm;
    },
    rowclick2(row) {
      if (row.isChildren !== 1) {
        this.$refs.realRef.toggleRowSelection(row); //单击表格复选框选中
      }
    },
    getSummaries(param) {
      //合计
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (column.label == "税率") {
          sums[index] = "";
          return;
        } else if (column.label == "合同编号") {
          sums[index] = "";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return this.$math.add(prev, curr);
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
  },
};
</script>
<style lang="scss">
.ReceivableManagement {
  .el-textarea__inner {
    height: 50px;
  }
  .el-tabs__nav {
    background: #ffffff;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item {
    border-bottom: none;
    color: #4d4d4d;
    background: #ffffff;
    text-align: center;
    border: 1px solid #eee !important;
    font-size: 12px;
  }
  .el-tabs__item.is-active {
    background: #2e8ad7 !important;
    color: #ffffff !important;
    border-top-right-radius: 10px;
  }

  .el-tabs__header {
    margin-bottom: 0;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .el-tabs__item {
    height: 30px !important;
    line-height: 30px !important;
  }
  .buttonBox {
    margin-bottom: 10px;
  }
  .button-text {
    min-width: 30px;
    margin: 0 !important;
  }
  .select {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 190px;
    }
    .el-input {
      width: 190px;
    }
  }
  .mycell .el-checkbox__input {
    display: none !important;
  }
}
</style>
