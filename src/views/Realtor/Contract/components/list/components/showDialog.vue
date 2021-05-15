<template>
  <div class="showDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="75px"
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="合同编号:" prop="contract_num">
              <span v-html="TableForm.contract_num"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="项目名称:" prop="GLCNAME">
              <span v-html="TableForm.GLCNAME"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="租赁方:" prop="KHDA_KHMC">
              <span v-html="TableForm.KHDA_KHMC"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="出租方:" prop="company_name">
              <span v-html="TableForm.company_name"></span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="签约日期:" prop="signing_date">
              <span v-html="TableForm.signing_date"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="经办人:" prop="manager">
              <span v-html="TableForm.manager"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="合同起始:" prop="contract_start">
              <span v-html="TableForm.contract_start"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="合同截止:" prop="contract_end">
              <span v-html="TableForm.contract_end"></span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="租赁周期:" prop="lease_cycle">
              <span v-html="TableForm.lease_cycle"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="免租期:">
              <span v-html="TableForm.rent_free_period"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="免租期单位:">
              <span v-if="TableForm.rent_free_unit === 1">天</span>
              <span v-if="TableForm.rent_free_unit === 2">月</span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="费用起计:">
              <span v-html="TableForm.fee_start"></span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="费用截止:">
              <span v-html="TableForm.fee_end"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="出租面积:">
              <span v-html="TableForm.rental_area"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="租赁总额:">
              <span v-html="TableForm.total_amount"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="首付金额:">
              <span v-html="TableForm.down_payment"></span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="押金总额:">
              <span v-html="TableForm.deposit_total"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="付款方式:">
              <span v-html="TableForm.SFKM_SKFS"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="装修起始:">
              <span v-html="TableForm.decorate_start"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="装修截止:">
              <span v-html="TableForm.decorate_end"></span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="合同类型:">
              <span v-if="TableForm.contract_type === 1">租赁合同</span>
              <span v-if="TableForm.contract_type === 2">销售合同</span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="预警天数:">
              <span v-html="TableForm.warning_days"></span>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="收款周期:">
              <span v-if="TableForm.pay_cycle === 1">自然时间周期</span>
              <span v-if="TableForm.pay_cycle === 2">合同时间周期</span>
            </el-form-item>
          </el-col>

          <el-col
            :span="6"
            style="min-width: 220px"
            v-if="TableForm.pay_cycle == 2"
          >
            <el-form-item label="周期明细:">
              <span v-if="TableForm.pay_cycle_detail === 1">月</span>
              <span v-if="TableForm.pay_cycle_detail === 2">季度</span>
              <span v-if="TableForm.pay_cycle_detail === 3">半年</span>
              <span v-if="TableForm.pay_cycle_detail === 4">年</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="12" style="min-width: 220px">
            <el-form-item label="合同描述:">
              <span v-html="TableForm.contract_description"></span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs v-model="activeName" type="card" @tab-click="tabclick">
        <el-tab-pane label="费用条款" name="1" :disabled="tabLimit">
          <div class="resoureTable">
            <el-table
              ref="multipleTable1"
              height="300"
              :data="SigningTable"
              border
            >
              <el-table-column
                prop="GLQDA_GLQMC"
                label="分区名称"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="DLDA_DLMC"
                label="楼栋名称"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="roomName"
                label="房间名称"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="constructionArea"
                label="建筑面积"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="rentalArea"
                label="出租面积"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="chargeItem"
                label="费用项目"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="price"
                label="单价"
                width="60"
              ></el-table-column>
              <el-table-column
                prop="priceUnitStr"
                label="单价单位"
                width="120"
              ></el-table-column>

              <el-table-column
                prop="priceTypeStr"
                label="单价类型"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="startTime"
                label="开始时间"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="endTime"
                label="截止时间"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="adjustmentIncreasingStart"
                label="递增开始时间"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="adjustmentIncreasingCutoff"
                label="递增截止时间"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="adjustmentIncreasingCycle"
                label="递增周期"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="adjustmentIncreasingRangeType"
                label="递增幅度类型"
                width="120"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.adjustmentIncreasingRangeType == 0"
                    >百分比</span
                  >
                  <span v-if="scope.row.adjustmentIncreasingRangeType == 1"
                    >金额</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="adjustmentIncreasingPercentage"
                label="递增百分比"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="adjustmentIncreasingPrice"
                label="递增金额"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                width="120"
              ></el-table-column>
            </el-table>
            <!-- <div class="totalamount">总金额：{{totalamount}}</div> -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="押金/保证金" name="2" :disabled="tabLimit">
          <div class="resoureTable">
            <el-table
              ref="multipleTable2"
              height="300"
              :data="ContractList"
              border
            >
              <el-table-column
                prop="roomName"
                label="房间名称"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="payDate"
                label="缴费日期"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="payAmount"
                label="缴费金额"
                width="120"
              ></el-table-column>
              <!-- <el-table-column prop="payableAmount" label="应缴金额" width="120"></el-table-column> -->
              <el-table-column
                prop="SFKM_SKFS"
                label="收款方式"
                width="240"
              ></el-table-column>
              <el-table-column
                prop="SFXM_SFXMMC"
                label="收费项目"
                width="120"
              ></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="费用清单" name="3" :disabled="tabLimit">
          <div class="resoureTable">
            <el-table
              ref="multipleTable"
              :height="270"
              :data="InventoryList"
              border
              row-key="id"
            >
              <el-table-column
                prop="date_price"
                label="日单价"
                width="160"
              ></el-table-column>
              <el-table-column
                prop="cost_days"
                label="天数"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="charge_item"
                label="计价条款"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="cost_period"
                label="费用期次"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="room_name"
                label="资源代码"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="charge_item"
                label="收费项目名称"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="receivable_date"
                label="应收日期"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="price"
                label="金额"
                width="130"
              ></el-table-column>
              <el-table-column
                prop="deduction_price"
                label="减免金额"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="begin_date"
                label="期初日期"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="end_date"
                label="期末日期"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="summary"
                label="摘要"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                width="120"
              ></el-table-column>
            </el-table>
            <div class="totalamount">总金额：{{ totalamount }}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="违约条框" name="4" :disabled="tabLimit">
          <el-table
            ref="multipleTable3"
            :height="DefaultreturnTotal > DefaultFrom.pageSize ? 245 : 300"
            :data="DefaultList"
            border
          >
            <el-table-column
              prop="clause_name"
              label="条款名称"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="clause_content"
              label="条款内容"
            ></el-table-column>
          </el-table>
          <!-- 分页begin -->
          <div class="block" v-if="DefaultreturnTotal > DefaultFrom.pageSize">
            <el-pagination
              @current-change="DefaulthandleCurrentChange"
              :current-page.sync="DefaultcurrentPage"
              :page-size="DefaultFrom.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="DefaultreturnTotal"
            >
            </el-pagination>
          </div>
          <!-- 分页end -->
        </el-tab-pane>
        <el-tab-pane label="合同附件" name="5" :disabled="tabLimit">
          <div class="filelist">
            <div
              class="unit"
              @mouseover="mouseOver(index)"
              @mouseleave="mouseLeave(index)"
              v-for="(item, index) in fileList"
            >
              <img
                class="fileimg"
                :src="require(`@/assets/homeImgs/file.png`)"
                alt=""
              />
              <span>{{ item.attachmentName }}</span>

              <img
                class="closeimg"
                v-if="fileindex === index"
                @click="downloadFile(item)"
                :src="require(`@/assets/homeImgs/download.png`)"
                alt=""
              />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import {
  addContractMessage,
  updateContractMessage,
  queryZLCustomer,
  queryZLLessor,
  queryContractCostList,
  createCostList,
  queryZLPlot,
  getClauseAPi,
  deleteClauseAPi,
  depositAPi3,
  querySecurityDepositList,
  deleteSecurityDeposit,
  queryContractCostAmount,
  queryBreachClause,
  queryContractAccessory,
} from "@/api/Realtor/Contract";
export default {
  data() {
    return {
      visible: this.datashow,
      title: "详情", //标题
      categoryList: "",
      rules: {},
      TableForm: {
        contract_name: "",
        contract_num: "",
        plot_index: "",
        plot_id: "",
        KHDA_ZJ: "",
        lessor_id: "",
        manager: "",
        signing_date: "",
        contract_start: "",
        contract_end: "",
        lease_cycle: "",
        rent_free_period: "",
        rent_free_unit: "",
        fee_start: "",
        fee_end: "",
        rental_area: "",
        total_amount: "",
        down_payment: "",
        deposit_total: "",
        pay_method: "",
        contract_type: "",
        contract_description: "",
      },
      activeName: "1",
      activeNamecheck: "1",
      tableData: [],
      Reliefplanshow: false,
      contract_id: "",
      ZLCustomer: [],
      ZLLessor: [],
      fileList: [],
      tabLimit: true,
      InventoryList: [],
      InventoryFrom: {
        pageIndex: 0,
        pageSize: 10,
      },
      DefaultFrom: {
        pageIndex: 0,
        pageSize: 10,
        plotDbName: "",
        GLCID: "",
        YXDID: "",
        contract_id: "",
      },
      plot_List: [],
      SigningTable: [],
      buttonname: "",
      multipleSelection: [],
      plot_id: "",
      options3: [],
      ContractList: "",
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      totalamount: 0,
      DefaultcurrentPage: 1, //当前页
      DefaultreturnTotal: 0, //总共条数
      fileList: [],
      DefaultList: [],
      fileindex: null,
    };
  },
  props: {
    datashow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    datashow() {
      this.visible = this.datashow;
    },
  },
  mounted() {
    queryZLPlot().then((response) => {
      this.plot_List = response;
    });
  },
  methods: {
    mouseOver(index) {
      this.fileindex = index;
    },
    mouseLeave() {
      this.fileindex = null;
    },
    downloadFile(file) {
      var link = document.createElement("a");
      link.setAttribute("download", "");
      link.href = file.attachmentUrl;
      link.click();
    },
    handleCurrentChange(currentPage) {
      this.InventoryFrom.pageIndex = currentPage - 1;
      this.getInventory(); //获取表格数据
    },
    DefaulthandleCurrentChange(currentPage) {
      this.DefaultFrom.pageIndex = currentPage - 1;
      this.getDefault(); //获取表格数据
    },
    ZLchange() {
      this.$forceUpdate();
    },
    plotChange(index) {
      this.TableForm.plot_id = this.plot_List[index].id;
      this.TableForm.KHDA_ZJ = "";
      this.TableForm.lessor_id = "";
      depositAPi3({
        plot_id: this.plot_List[index].id,
      }).then((response) => {
        this.options3 = response;
      });
      queryZLCustomer({
        dbName: this.plot_List[index].dbName,
        GLCID: this.plot_List[index].GLCID,
        YXDID: this.plot_List[index].YXDID,
      }).then((response) => {
        this.ZLCustomer = response;
      });
      queryZLLessor({
        dbName: this.plot_List[index].dbName,
        GLCID: this.plot_List[index].GLCID,
        YXDID: this.plot_List[index].YXDID,
      }).then((response) => {
        this.ZLLessor = response;
      });
    },
    tabclick(data) {
      if (this.activeNamecheck == data.name) return;
      this.activeNamecheck = data.name;

      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable1.clearSelection();
      this.$refs.multipleTable2.clearSelection();
      this.multipleSelection = []; //选择后清空选中表格数据
    },
    getReportData(data, type) {
      this.contract_id = data.contract_id;
      this.plot_id = data.plot_id;
      var _this = this;
      const parent = this.plot_List;
      const id = data.plot_id;
      data.plot_index = parent.findIndex((d) => d.id === id); //寻找data的索引

      this.DefaultFrom.plotDbName = this.plot_List[data.plot_index].dbName;
      this.DefaultFrom.GLCID = this.plot_List[data.plot_index].GLCID;
      this.DefaultFrom.YXDID = this.plot_List[data.plot_index].YXDID;
      this.DefaultFrom.contract_id = data.contract_id;

      queryZLCustomer({
        dbName: this.plot_List[data.plot_index].dbName,
        GLCID: this.plot_List[data.plot_index].GLCID,
        YXDID: this.plot_List[data.plot_index].YXDID,
      }).then((response) => {
        this.ZLCustomer = response;
      });
      queryZLLessor({
        dbName: this.plot_List[data.plot_index].dbName,
        GLCID: this.plot_List[data.plot_index].GLCID,
        YXDID: this.plot_List[data.plot_index].YXDID,
      }).then((response) => {
        this.ZLLessor = response;
        this.TableForm = JSON.parse(JSON.stringify(data));
        this.getClause();
        this.getDeposit();
        this.getInventory();
        this.getDefault();
        this.getFile();
      });
      depositAPi3({
        plot_id: data.plot_id,
      }).then((response) => {
        this.options3 = response;
      });

      this.tabLimit = false;
      this.activeName = "1";
      this.activeNamecheck = "1";

      queryContractCostAmount({
        contract_id: this.contract_id,
        plot_id: this.plot_id,
      }).then((response) => {
        this.totalamount = response.data.Amount;
      });
    },
    Generatinglist() {
      createCostList({
        contract_id: this.contract_id,
        plot_id: this.TableForm.plot_id,
      }).then((response) => {
        this.getInventory();
      });
    },
    getClause() {
      getClauseAPi({
        contractId: this.contract_id,
        id: this.TableForm.plot_id,
      }).then((response) => {
        this.SigningTable = response.data;
      });
    },
    getDeposit() {
      querySecurityDepositList({
        contractId: this.contract_id,
        id: this.TableForm.plot_id,
      }).then((response) => {
        this.ContractList = response;
      });
    },
    getInventory() {
      this.InventoryFrom.contract_id = this.contract_id;
      this.InventoryFrom.plot_id = this.plot_id;
      queryContractCostList(this.InventoryFrom).then((response) => {
        var data = response;
        var list = [];
        var repeat = [];
        var i = -1;
        var id = 1;
        for (var j in data) {
          if (
            repeat.indexOf(
              `${data[j].cost_period}${data[j].room_name}${data[j].charge_item}`
            ) == -1
          ) {
            list.push({});
            repeat.push(
              `${data[j].cost_period}${data[j].room_name}${data[j].charge_item}`
            );
            i++;
            list[i].children = [];
            list[i].children.push(data[j]);
          } else {
            list[
              repeat.indexOf(
                `${data[j].cost_period}${data[j].room_name}${data[j].charge_item}`
              )
            ].children.push(data[j]);
          }
        }
        for (var k in list) {
          var children = list[k].children;
          list[k].GLCID = 1;
          list[k].JT_ZJ = "xm_tfjt";
          list[k].YXDID = "";
          list[k].begin_date = children[0].begin_date;
          list[k].charge_item = children[0].charge_item;
          list[k].contract_id = "";
          list[k].cost_days = 0;
          list[k].cost_id = "";
          list[k].cost_period = children[0].cost_period;
          list[k].create_date = "";
          list[k].create_user = "";
          list[k].date_price = "";
          list[k].deduction_price = 0;
          list[k].end_date = children[children.length - 1].end_date;
          list[k].price = 0;
          list[k].receivable_date = children[0].receivable_date;
          list[k].resources_id = "";
          list[k].room_name = children[0].room_name;
          list[k].summary = `${children[0].begin_date} 至 ${
            children[children.length - 1].end_date
          }`;
          list[k].whether_pass = 0;
          list[k].id = id;
          id++;
          for (var index in children) {
            list[k].cost_days += parseFloat(children[index].cost_days);
            list[k].price += parseFloat(children[index].price);
            list[k].deduction_price += parseFloat(
              children[index].deduction_price
            );
            list[k].children[index].id = id;
            id++;
          }
        }
        this.InventoryList = JSON.parse(JSON.stringify(list));
      });
    },
    getDefault() {
      queryBreachClause(this.DefaultFrom).then((response) => {
        this.DefaultList = response.data;
        this.DefaultreturnTotal = response.total;
      });
    },
    getFile() {
      queryContractAccessory({
        dbName: this.DefaultFrom.plotDbName,
        contractId: this.DefaultFrom.contract_id,
      }).then((response) => {
        this.fileList = response;
      });
    },
    cancle() {
      this.$emit("RefreshItem", 0);
      this.$emit("update:datashow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style lang="scss">
.showDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.showDialog .el-date-editor {
  width: 100% !important;
  text-align: left;
}

.showDialog .buttonBox {
  text-align: left;
  padding-left: 20px;
}

.showDialog .el-input-number {
  width: 100%;
}

.showDialog .el-input-number input {
  text-align: left;
}

.showDialog .el-tabs {
  padding: 0 20px;
}

.showDialog .el-tabs__nav {
  background: #ffffff;
  border-top-right-radius: 10px !important;
}

.showDialog .el-tabs--card > .el-tabs__header .el-tabs__item {
  border-left: none;
  border-bottom: none;
  color: #4d4d4d;
  background: #ffffff;
  font-weight: bold;
  border-top-right-radius: 10px !important;
  border-right: 1px solid #e4e7ed;
}

.showDialog .el-tabs__item.is-active {
  background: #2e8ad7 !important;
  color: #ffffff !important;
  border-top-right-radius: 10px;
}

.showDialog .el-tabs__header {
  margin-bottom: 0;
}

.showDialog .updata {
  width: 100%;
  height: 300px;
  border: 1px solid #e4e7ed;
  text-align: left;
  padding: 10px;
}

.showDialog .el-form-item {
  margin-bottom: 5px;
}

.showDialog .totalamount {
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding: 0 20px;
}

.showDialog .filelist {
  width: 100%;
  height: 300px;
  padding: 10px;
  overflow: auto;
  border: 1px solid #e4e7ed;
  .unit {
    width: 100%;
    height: 40px;
    padding: 10px;
    .fileimg {
      height: 20px;
      display: inline-block;
      float: left;
    }
    span {
      line-height: 20px;
      font-size: 16px;
      display: inline-block;
      float: left;
      margin-left: 5px;
    }
    .closeimg {
      height: 16px;
      display: inline-block;
      float: right;
      position: relative;
      top: 2px;
    }
    .closeimg:active {
      opacity: 0.7;
    }
  }
  .unit:hover {
    background: #eeeeee;
  }
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
