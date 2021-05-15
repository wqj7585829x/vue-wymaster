<template>
  <div class="container UnmatchedReconciliation">
    <!-- 按钮begin -->
    <el-form label-width="110px">
      <el-row :gutter="30">
        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="记账开始日期">
            <el-date-picker
              type="date"
              v-model="searchList.keepStartDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="记账结束日期">
            <el-date-picker
              type="date"
              v-model="searchList.keepEndDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="导入开始日期：">
            <el-date-picker
              type="date"
              v-model="searchList.importStartDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="导入结束日期：">
            <el-date-picker
              type="date"
              v-model="searchList.importEndDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="认账状态：">
            <el-select
              v-model="searchList.claim"
              placeholder="请选择"
              clearable
            >
              <el-option label="未认账" :value="0"></el-option>
              <el-option label="已认账" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="到账银行：">
            <el-select v-model="searchList.bank" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.bank"
                :label="item.bank"
                :value="item.bank"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="清算日期：">
            <el-date-picker
              type="date"
              v-model="searchList.keepDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="账单类型：">
            <el-select
              v-model="searchList.billType"
              placeholder="请选择"
              clearable
            >
              <el-option label="pos刷卡" value="pos刷卡"></el-option>
              <el-option
                label="pos微信/支付宝"
                value="pos微信/支付宝"
              ></el-option>
              <el-option label="微信支付" value="微信支付"></el-option>
              <el-option label="APP对账" value="APP对账"></el-option>
              <el-option label="转账" value="转账"></el-option>
              <el-option label="扫码盒子" value="扫码盒子"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="部门：">
            <el-select
              v-model="searchList.department"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in departmentoptions"
                :key="item.id"
                :label="item.GLCName"
                :value="item.GLCName"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button type="primary" @click="getdata()" v-has="'URSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button
        type="primary"
        @click="UrDO1"
        :disabled="disabled1"
        v-has="'URLockAR_has'"
        >锁定认账
      </el-button>
      <el-button
        type="primary"
        @click="UrDO6"
        :disabled="disabled2"
        v-has="'URCancelAR_has'"
        >取消锁定
      </el-button>
      <el-button type="primary" @click="UrDO2" :disabled="disabled3"
        >登记收款
      </el-button>
      <el-button
        type="primary"
        @click="UrDO3"
        :disabled="disabled4"
        v-has="'URRegisteredAR_has'"
        >已登记收款认账
      </el-button>
      <el-button
        type="primary"
        @click="UrDO4"
        :disabled="disabled5"
        v-has="'URAddAR_has'"
      >
        去增加收款认账</el-button
      >
      <el-button
        type="primary"
        @click="UrDO5"
        :disabled="disabled6"
        v-has="'URTicketAR_has'"
        >先票认账
      </el-button>
      <el-button
        type="success"
        @click="downloData()"
        v-has="'URTicketExcel_has'"
        >导出excel</el-button
      >
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table
        ref="singleTable"
        max-height="480"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
        :tree-props="{ children: 'children' }"
        row-key="subscribeBillId"
        :cell-class-name="checkbox"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            <span class="tableindex">{{ getindex(scope) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="keepDate" label="记账日期" width="140">
        </el-table-column>
        <el-table-column prop="tranDate" label="交易时间" width="150">
        </el-table-column>
        <el-table-column prop="lockAmount" label="已锁定金额" width="150">
        </el-table-column>
        <el-table-column prop="notLockAmount" label="可锁定余额" width="150">
        </el-table-column>
        <el-table-column prop="creditAmount" label="货方发生额" width="120">
        </el-table-column>
        <el-table-column prop="otherName" label="对方户名" width="240">
        </el-table-column>
        <el-table-column prop="summary" label="摘要" width="120">
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="300">
        </el-table-column>
        <el-table-column prop="importDate" label="导入日期" width="120">
        </el-table-column>
        <el-table-column prop="billType" label="银行进账类型" width="120">
        </el-table-column>
        <el-table-column prop="bank" label="到账银行" width="120">
        </el-table-column>
        <el-table-column prop="paymentMethod" label="收款方式" width="120">
        </el-table-column>
        <el-table-column prop="department" label="部门" width="120">
        </el-table-column>
        <el-table-column prop="publisher" label="发布人" width="150">
        </el-table-column>
        <el-table-column prop="publishDate" label="发布时间" width="150">
        </el-table-column>
        <el-table-column prop="status" label="认账状态" width="120">
        </el-table-column>
        <el-table-column prop="appreciatorType" label="认账方式" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.appreciatorType == 1">自动认账</div>
            <div v-if="scope.row.appreciatorType == 2">手动认账</div>
            <div v-if="scope.row.appreciatorType == 3">其他</div>
          </template>
        </el-table-column>
        <el-table-column prop="appreciator" label="认账人" width="120">
        </el-table-column>
        <el-table-column prop="appreciatorDate" label="认账时间" width="120">
        </el-table-column>
      </el-table>
      <div class="arrears">
        已勾选金额: <span class="andmoney">{{ arrears }}</span
        >货方发生额合计:<span
          >{{ totaltableData ? totaltableData.toFixed(2) : 0 }}
        </span>
      </div>
    </div>

    <el-dialog
      v-dialogDrag
      title="锁定认账"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div v-for="(item, index) in selectlist" :key="index">
        {{ index + 1 }}、<el-input-number
          v-model="item.value"
          :precision="2"
          :step="0.01"
          :min="0"
          :max="maxmoney"
          :controls="false"
          @change="selectchange()"
          @paste.native="pastevalue"
          :ref="`lockAmount${index}`"
        >
        </el-input-number>
        <i class="el-icon-delete" @click="deletemoney(index)"></i><br />
      </div>
      <div class="showmoney">
        总锁定金额:<span class="money1">{{ formatData(maxmoney) }}</span>
        本次锁定金额:<span class="money2">{{ formatData(nowmoney) }}</span>
        可锁定余额:<span class="money2">{{ formatData(surplusmoney) }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addmoney">新 增</el-button>
        <el-button type="primary" @click="cleanmoney">清 空</el-button>
        <el-button type="primary" @click="Lockaccount">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <Reconciliation
      :Reconciliationshow.sync="Reconciliationshow"
      ref="Reconciliation"
      @RefreshItem="getTableData()"
    >
    </Reconciliation>
    <TableDialog
      :Tableshow.sync="Tableshow"
      ref="TableDialog"
      @RefreshItem="getTableData()"
    ></TableDialog>
  </div>
</template>
<script>
import {
  queryUnmatchReconciliation,
  queryUnmatchReconciliationTotal,
  updateLockAmount,
  recogniseConfirmation,
  stoneToCancel,
  queryPlotDb,
  queryImportDate,
  unlocked,
  exportUnmatchReconciliation,
} from "@/api/BankReconciliation/UnmatchedReconciliation";
import { queryBankPulldownSelect } from "@/api/BankReconciliation/POSPayCard";
import Reconciliation from "./components/Reconciliation";
import TableDialog from "./components/TableDialog";
import { mapGetters } from "vuex";
export default {
  name: "UnmatchedReconciliation",
  data() {
    return {
      tableData: [],
      searchList: {
        pageIndex: 0,
        pageSize: 10,
        importDate: "",
        bank: "",
        summary: "",
        keepDate: "",
        GLCNAME: "",
        billType: "",
        department: "",
        claim: 0,
      },
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      options: [],
      departmentoptions: [],
      totaltableData: "",
      dialogVisible: false,
      account: {},
      multipleSelection: [],
      Reconciliationshow: false,
      Tableshow: false,
      maxmoney: 0,
      nowmoney: 0,
      surplusmoney: 0,
      disabled1: true,
      disabled2: true,
      disabled3: true,
      disabled4: true,
      disabled5: true,
      disabled6: true,
      timeoptions: [],
      selectlist: [
        {
          value: 0,
        },
      ],
      arrears: 0,
      leftwidth: 0,
    };
  },
  components: {
    Reconciliation,
    TableDialog,
  },
  computed: {
    ...mapGetters(["currentPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  created() {
    var leftwidth = window.screen.width > 1025 ? 500 : 0;
  },
  mounted() {
    var date = new Date();
    var year = date.getFullYear(); //获取完整的年份(4位)
    var month =
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth(); //获取当前月份(0-11,0代表1月)
    var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(); //获取当前日(1-31)
    this.searchList = {
      keepStartDate: `${year}-${month}-01`,
      keepEndDate: `${year}-${month}-${day}`,
      GLCNAME: this.currentPlot,
      claim: 0,
    };

    queryBankPulldownSelect().then((response) => {
      this.options = response;
    });
    queryPlotDb().then((response) => {
      this.departmentoptions = response;
    });
    this.getTableData();
  },
  methods: {
    downloData() {
      exportUnmatchReconciliation(this.searchList).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `未匹配对账列表.xls`;
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    formatData(data) {
      return data.toFixed(2);
    },
    addmoney() {
      this.selectlist.push({
        value: 0,
      });
    },
    cleanmoney() {
      this.selectlist = [];
      var value = this.selectlist;
      let count = 0;
      for (var i in value) {
        count += parseFloat(value[i].value ? value[i].value : 0);
      }
      this.nowmoney = count;
      this.surplusmoney = count >= this.maxmoney ? 0 : this.maxmoney - count;
    },
    deletemoney(index) {
      this.selectlist.splice(index, 1);
      var value = this.selectlist;
      let count = 0;
      for (var i in value) {
        count += parseFloat(value[i].value ? value[i].value : 0);
      }
      this.nowmoney = count;
      this.surplusmoney = count >= this.maxmoney ? 0 : this.maxmoney - count;
    },
    pastevalue(e) {
      //剪贴板直接导入数据
      var clipboardData = e.clipboardData || window.clipboardData;
      var content =
        clipboardData.getData("Text") || clipboardData.getData("text/plain"); // Text兼容ie   text/plain兼容火狐谷歌
      if (content != null) {
        var textArry = content.split("\n"); //\n换行
        if (textArry.length > 1) {
          //剪切板大于一条才执行多行粘贴
          var datalist = this.selectlist;
          this.selectlist = [];
          this.$nextTick(() => {
            for (var i = 0; i < textArry.length; i++) {
              if (textArry[i]) {
                this.selectlist.push({
                  value:
                    parseFloat(textArry[i]) >= 0 ? parseFloat(textArry[i]) : 0,
                });
              }
            }
            this.selectlist = datalist.concat(this.selectlist);
            var value = this.selectlist;
            let count = 0;
            for (var i in value) {
              count += parseFloat(value[i].value ? value[i].value : 0);
            }
            this.nowmoney = count;
            this.surplusmoney =
              count >= this.maxmoney ? 0 : this.maxmoney - count;
          });
        }
      }
    },
    selectchange() {
      var value = this.selectlist;
      let count = 0;
      for (var i in value) {
        count += parseFloat(value[i].value ? value[i].value : 0);
      }
      this.nowmoney = count;
      this.surplusmoney = count >= this.maxmoney ? 0 : this.maxmoney - count;
    },
    getindex(scope) {
      return this.tableData.indexOf(scope.row) + 1;
    },
    checkbox(row) {
      if (row.row.parentLevel === 2) {
        return "mycell";
      }
    },
    UrDO1() {
      if (this.multipleSelection.length > 1) {
        var data = this.multipleSelection;
        var subscribeBillIdlist = [];
        for (var i in data) {
          subscribeBillIdlist.push(data[i].subscribeBillId);
        }
        updateLockAmount({
          subscribeBillId: subscribeBillIdlist.join(","),
          GLCNAME: this.currentPlot,
        }).then((response) => {
          this.getdata();
          this.maxmoney = 0;
        });
      } else {
        this.selectlist = [
          {
            value: this.maxmoney,
          },
        ];
        this.nowmoney = 0;
        this.surplusmoney = 0;
        this.dialogVisible = true;
      }
    },
    UrDO2() {
      var data = this.multipleSelection;
      var total = 0;
      var subscribeBillId = [];
      for (var i in data) {
        total += data[i].creditAmount;
        subscribeBillId.push(data[i].subscribeBillId);
      }
      sessionStorage.setItem("subscribeBillId", subscribeBillId.join(","));
      this.$router.push({
        path: "/HomePage/KSSF",
        query: {
          type: 1,
          total: total,
        },
      });
    },
    UrDO3() {
      this.Reconciliationshow = true;
      this.$refs.Reconciliation.getReportData(this.multipleSelection);
    },
    UrDO4() {
      this.Tableshow = true;
      this.$refs.TableDialog.getReportData(this.multipleSelection);
    },
    UrDO5() {},
    UrDO6() {
      var data = this.multipleSelection;
      var subscribeBillIdlist = [];
      for (var i in data) {
        subscribeBillIdlist.push(data[i].subscribeBillId);
      }
      unlocked({
        subscribeBillId: subscribeBillIdlist.join(","),
      }).then((response) => {
        this.getdata();
      });
    },
    Lockaccount() {
      if (this.selectlist.length == 1 && this.selectlist[0].value == 0) {
        this.$message({
          message: "锁定金额未填写！",
          type: "warning",
        });
        return;
      }
      var data = this.multipleSelection;
      var subscribeBillIdlist = [];
      for (var i in data) {
        subscribeBillIdlist.push(data[i].subscribeBillId);
      }
      var money = this.selectlist;
      var conut = [];
      var totalconut = 0;
      for (var j in money) {
        if (money[j].value != 0) {
          conut.push(money[j].value ? money[j].value : 0);
        }
        totalconut += money[j].value ? money[j].value : 0;
      }
      if (totalconut > this.maxmoney) {
        this.$message({
          message: "拆分金额合计大于总锁定金额！",
          type: "warning",
        });
        return;
      }
      if (conut.length == 0) {
        this.$message({
          message: "未进行拆分设置！",
          type: "warning",
        });
        return;
      }
      updateLockAmount({
        lockAmount: conut.join(","),
        subscribeBillId: subscribeBillIdlist.join(","),
        GLCNAME: this.currentPlot,
      }).then((response) => {
        this.getdata();
        this.dialogVisible = false;
        this.maxmoney = 0;
        this.account.lockAmount = 0;
      });
    },
    handleSelectionChange(val) {
      //选择
      this.multipleSelection = val;

      var count = 0;
      for (var j in val) {
        count += val[j].creditAmount;
      }
      this.arrears = count.toFixed(2);

      if (val.length > 0) {
        this.maxmoney = this.multipleSelection[0].notLockAmount;
        this.account.lockAmount = this.maxmoney;

        var parentLevel = [];
        var tranDate = [];
        var code = [];
        var parentId = [];

        for (var i in val) {
          if (parentLevel.indexOf(val[i].parentLevel) === -1) {
            parentLevel.push(val[i].parentLevel);
          }

          if (tranDate.indexOf(val[i].tranDate.split(" ")[0]) === -1) {
            tranDate.push(val[i].tranDate.split(" ")[0]);
          }

          if (code.indexOf(val[i].code) === -1) {
            code.push(val[i].code);
          }

          if (val[i].parentId) {
            if (parentId.indexOf(val[i].parentId) === -1) {
              parentId.push(val[i].parentId);
            }
          }
        }

        if (parentLevel.length === 1) {
          //按钮权限为一个字符串，拆分后按顺序对应操作按钮权限，0为无权限操作，1为有权限操作
          switch (parentLevel[0]) {
            case 0: //不包含子集的父级元素
              if (tranDate.length === 1 && code.length === 1) {
                var unit = code[0].split("");
                this.disabled3 = unit[2] === "1" ? false : true;
                this.disabled4 = unit[3] === "1" ? false : true;
                this.disabled5 = unit[4] === "1" ? false : true;
                this.disabled6 = unit[5] === "1" ? false : true;
              } else {
                this.disabled3 = true;
                this.disabled4 = true;
                this.disabled5 = true;
                this.disabled6 = true;
              }
              if (code.length === 1) {
                var unit = code[0].split("");
                this.disabled1 = unit[0] === "1" ? false : true;
                this.disabled2 = unit[1] === "1" ? false : true;
              } else {
                this.disabled1 = true;
                this.disabled2 = true;
              }
              break;
            case 1: //包含子集的父级元素
              if (val.length === 1) {
                var unit = code[0].split("");
                this.disabled3 = unit[2] === "1" ? false : true;
                this.disabled4 = unit[3] === "1" ? false : true;
                this.disabled5 = unit[4] === "1" ? false : true;
                this.disabled6 = unit[5] === "1" ? false : true;
              } else {
                this.disabled3 = true;
                this.disabled4 = true;
                this.disabled5 = true;
                this.disabled6 = true;
              }
              if (val.length === 1) {
                var unit = code[0].split("");
                this.disabled1 = unit[0] === "1" ? false : true;
                this.disabled2 = unit[1] === "1" ? false : true;
              } else {
                this.disabled1 = true;
                this.disabled2 = true;
              }
              break;
            case 2: //子集元素
              if (
                tranDate.length === 1 &&
                code.length === 1 &&
                parentId.length === 1
              ) {
                var unit = code[0].split("");
                this.disabled3 = unit[2] === "1" ? false : true;
                this.disabled4 = unit[3] === "1" ? false : true;
                this.disabled5 = unit[4] === "1" ? false : true;
                this.disabled6 = unit[5] === "1" ? false : true;
              } else {
                this.disabled3 = true;
                this.disabled4 = true;
                this.disabled5 = true;
                this.disabled6 = true;
              }
              if (
                tranDate.length === 1 &&
                code.length === 1 &&
                parentId.length === 1
              ) {
                var unit = code[0].split("");
                this.disabled1 = unit[0] === "1" ? false : true;
                this.disabled2 = unit[1] === "1" ? false : true;
              } else {
                this.disabled1 = true;
                this.disabled2 = true;
              }
              break;
          }
        } else {
          this.disabled1 = true;
          this.disabled2 = true;
          this.disabled3 = true;
          this.disabled4 = true;
          this.disabled5 = true;
          this.disabled6 = true;
        }
      } else {
        this.maxmoney = 0;
        this.account.lockAmount = 0;
        this.disabled1 = true;
        this.disabled2 = true;
        this.disabled3 = true;
        this.disabled4 = true;
        this.disabled5 = true;
        this.disabled6 = true;
      }
    },
    getdata() {
      this.getTableData();
    },
    getTableData() {
      queryUnmatchReconciliation(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.maxmoney = 0;
      });
      queryUnmatchReconciliationTotal(this.searchList).then((response) => {
        this.totaltableData = response.total;
      });
    },
    rowClick(row) {
      this.tableData2 = [];
      this.$refs.singleTable.toggleRowSelection(row); //单击表格复选框选中
    },
  },
};
</script>
<style lang="scss">
.UnmatchedReconciliation .mycell .tableindex {
  display: none !important;
}

.UnmatchedReconciliation .showmoney {
  padding: 5px 10px;
  text-align: left;
  .money1 {
    color: #222222;
    margin-right: 15px;
    margin-left: 5px;
    font-weight: 700;
  }
  .money2 {
    color: #222222;
    font-weight: 700;
    margin-left: 5px;
  }
}

.UnmatchedReconciliation .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.UnmatchedReconciliation .el-input {
  width: 100% !important;
}

.UnmatchedReconciliation .totalmoney {
  border-left: 1px solid #d5d6db;
  border-right: 1px solid #d5d6db;
  border-bottom: 1px solid #d5d6db;
  height: 30px;
  line-height: 30px;
  padding-left: 730px;
}

.UnmatchedReconciliation .arrears {
  font-size: 16px;
  padding: 5px 15px;
  span {
    font-weight: 700;
  }
  .andmoney {
    margin-right: 30px;
  }
}
</style>
