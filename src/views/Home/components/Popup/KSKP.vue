<template>
  <div class="KSKP container" ref="KSKP">
    <!-- 按钮begin -->
    <el-form label-width="75px" :model="kskpForm" :rules="rules" ref="kskpForm">
      <el-row :gutter="30">
        <el-col :span="4" style="width: 600px">
          <el-form-item
            label="资源名称："
            prop="FJDA_FJMC"
            :title="kskpForm.FJDA_FJMC"
            class="kskpForm"
          >
            <el-autocomplete
              v-model="kskpForm.FJDA_MC"
              :title="kskpForm.FJDA_MC"
              :fetch-suggestions="querySearch"
              popper-class="my-autocomplete"
              @select="FJDA_ZJchange"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-edit-outline"
                @click="RoomChoose"
              ></el-button>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 250px">
          <el-form-item label="交款人：">
            <el-input v-model="kskpForm.SKPZ_JKR" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 250px">
          <el-form-item label="来源：" prop="SKPZ_LY">
            <el-select v-model="kskpForm.SKPZ_LY" filterable clearable>
              <el-option label="pc端" :value="1"></el-option>
              <el-option label="微信端" :value="2"></el-option>
              <el-option label="POS机" :value="3"></el-option>
              <el-option label="其他" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 250px">
          <el-form-item label="制单开始日期:" label-width="90px">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="kskpForm.start_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 250px">
          <el-form-item label="制单截止日期:" label-width="90px">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="kskpForm.end_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col
          :span="4"
          style="padding-right: 0; padding-top: 2px; width: 150px"
        >
          <el-button
            type="success"
            @click="handleCurrentChange(1)"
            style="float: left"
            >查询</el-button
          >
        </el-col>
      </el-row>

      <div class="buttonBox">
        <el-button
          type="primary"
          @click="TicketDialog"
          :disabled="
            multipleSelection.length == 0 || multipleSelection.length > 1
          "
          >开票
        </el-button>
        <el-button
          type="primary"
          @click="TicketDialog"
          :disabled="
            multipleSelection.length == 0 || multipleSelection.length == 1
          "
          >合并开票
        </el-button>
        <el-button
          type="primary"
          @click="building"
          :disabled="multipleSelection.length == 0"
          :loading="ticketloading"
          v-if="buildingShow"
        >
          批量开电子票
        </el-button>
        <el-button type="success" @click="downloadData" :loading="exceltype"
          >导出excel</el-button
        >
      </div>
    </el-form>
    <!-- 按钮end -->

    <!--  表begin -->
    <div class="resoureTable">
      <u-table
        ref="tipleTable"
        :data="tableData"
        border
        height="300"
        @row-click="rowClick"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        element-loading-text="数据加载中，请耐心等待..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(200, 200, 200, 0.5)"
        empty-text="　"
        highlight-current-row
        use-virtual
        big-data-checkbox
        :row-height="30"
      >
        <u-table-column type="selection" width="55"> </u-table-column>
        <u-table-column prop="FKGX_FJID" label="资源代码" width="120">
        </u-table-column>
        <u-table-column prop="FJDA_FJMC" label="资源名称" width="150">
        </u-table-column>
        <u-table-column prop="SKPZ_RZSJ" label="收款日期" width="100">
        </u-table-column>
        <u-table-column prop="SKPZ_TZRQ" label="制单日期" width="100">
        </u-table-column>
        <u-table-column prop="SKPZ_JKR" label="交款人" width="100">
        </u-table-column>
        <u-table-column prop="SKMX_SKFS" label="收款方式" width="150">
        </u-table-column>
        <u-table-column prop="SKPZ_SKJE" label="金额" width="110">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.SKPZ_SKJE) }}
          </template>
        </u-table-column>
        <u-table-column prop="SKPZ_SKR" label="收款人" width="150">
        </u-table-column>
        <u-table-column prop="SKPZ_DZSJ" label="到账时间" width="150">
        </u-table-column>
        <u-table-column prop="SKPZ_DZYH" label="到账银行" width="100">
        </u-table-column>
        <u-table-column prop="SKPZ_SKNY" label="收款年月" width="100">
        </u-table-column>
        <u-table-column prop="SKPZ_LY" label="收款凭证来源" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.SKPZ_LY == 1">pc端</span>
            <span v-if="scope.row.SKPZ_LY == 2">微信端</span>
            <span v-if="scope.row.SKPZ_LY == 3">POS机</span>
            <span v-if="scope.row.SKPZ_LY == 4">其他</span>
          </template>
        </u-table-column>
        <u-table-column prop="SKPZ_BZ" label="备注"> </u-table-column>
      </u-table>
    </div>
    <!--  表 end -->

    <!-- 分页begin -->
    <div class="block" ref="current">
      <el-button
        type="success"
        @click="downloadDetailData"
        style="float: left"
        :disabled="detailData.length === 0"
        >导出excel
      </el-button>

      <div class="block_right">
        <!-- <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
          :page-size="kskpForm.pageSize" layout="total, prev, pager, next, jumper" :total="returnTotal">
        </el-pagination> -->
      </div>
    </div>
    <!-- 分页end -->

    <!--  表begin -->
    <div class="resoureTable">
      <el-table ref="multipleTable" :data="detailData" border :height="height">
        <el-table-column prop="SKMX_SKFYMC" label="收款费用" width="150">
        </el-table-column>
        <el-table-column prop="SKMX_FYSSNY" label="所属年月" width="100">
        </el-table-column>
        <el-table-column prop="SKMX_SKFS" label="收款方式" width="120">
        </el-table-column>
        <el-table-column prop="SKMX_SKJE" label="收款金额(含税)" width="120">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.SKMX_SKJE) }}
          </template>
        </el-table-column>
        <el-table-column prop="SKMX_SL" label="税率(%)" width="80">
        </el-table-column>
        <el-table-column prop="SKMX_BHSJE" label="金额(不含税)" width="100">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.SKMX_BHSJE) }}
          </template>
        </el-table-column>
        <el-table-column prop="SKMX_SE" label="税额" width="100">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.SKMX_SE) }}
          </template>
        </el-table-column>
        <el-table-column prop="SKMX_KPJE" label="开票金额" width="200">
        </el-table-column>
        <el-table-column prop="SKMX_PJH" label="票据号" width="200">
        </el-table-column>
        <el-table-column prop="SKMX_SKZY" label="费用期间" width="200">
        </el-table-column>
        <el-table-column prop="SKMX_BZ" label="备注"> </el-table-column>
      </el-table>
    </div>
    <!--  表 end -->

    <TicketDialog
      :showTicket.sync="showTicket"
      @PopCancelEmit="handleCurrentChange(1)"
      ref="ticketChilren"
    >
    </TicketDialog>

    <!-- <el-dialog v-dialogDrag title="纳税人信息选择" class="el-dialog-single" :visible.sync="dialogVisible"
      @close="dialogVisible = false" :close-on-click-modal="false">
      <el-form label-width="115px" ref="ruleForm" :model="nsrform" :rules="nsrrules">
        <el-row>
          <el-col>
            <el-form-item label="开票对象：" prop="index">
              <el-select v-model="nsrform.index" filterable clearable @change="nsrchange">
                <el-option v-for="(item,index) in nsrtable" :key="index" :label="item.invoice_object" :value="index">
                </el-option>
              </el-select>

            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="纳税人：">
              <el-input v-model="nsrform.invoice_nsrmc" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="纳税人识别号：">
              <el-input v-model="nsrform.invoice_nsrsbh" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="开户行及账号：">
              <el-input v-model="nsrform.invoice_khhjzh" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="纳税人地址电话：">
              <el-input v-model="nsrform.invoice_nsrdzdh" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="billdocheck">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog> -->

    <Resource
      :Rshow.sync="Rshow"
      ref="Resource"
      @getResource="getResource"
    ></Resource>
  </div>
</template>

<script>
import {
  queryRoom,
  queryPayingProve,
  queryPayingProveDetails,
  exportExcelOfQuicklyOpenBilling,
  BatchToMakeInvoice,
  exportExcel,
  queryInvoiceInformation,
  makeElectronicInvoiceAndElectronicReceiptBatch,
  isBatchElectronicInvoice,
} from "@/api/Home/Home";
import { queryisCanBill } from "@/api/FeeManagement/CollectionCredentials"; //收款凭证Api
import TicketDialog from "@/views/FeeManagement/ReceivablesRegister/components/TicketDialog"; //开票弹窗
import { formatMoney } from "@/utils/global.js";
import Resource from "./components/Resource";
import { Loading } from "element-ui";
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "KSKP",
  data() {
    return {
      title: "快速开票", //标题
      tableData: [],
      detailData: [],
      kskpForm: {
        FJDA_ZJ: "",
        SKPZ_JKR: "",
        LY: "",
        pageIndex: 0,
        pageSize: 300,
      },
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      time: "",
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      rules: {},
      nsrrules: {
        index: [{ required: true, trigger: "blur" }],
      },
      showTicket: false, //开票弹窗默认隐藏
      disabledTicket: true,
      multipleSelection: [],
      height: 150,
      loading: false,
      exceltype: false,
      dialogVisible: false,
      nsrtable: [],
      nsrform: {},
      Rshow: false,
      ticketloading: false,
      buildingShow: false,
    };
  },
  components: {
    TicketDialog,
    Resource,
    UTable,
    UTableColumn,
  },
  mounted() {
    isBatchElectronicInvoice().then((response) => {
      this.buildingShow = response.isBatchElectronicInvoice;
    });
    this.$nextTick(() => {
      setTimeout(() => {
        this.getPartitionData();
      }, 1000);
    });
  },
  methods: {
    FJDA_ZJchange(val) {
      this.kskpForm.FJDA_ZJ = val.FJDA_ZJ;
    },
    querySearch(queryString, cb) {
      var restaurants = this.xmdata;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        );
      };
    },
    RoomChoose() {
      this.Rshow = true;
    },
    getResource(data) {
      this.kskpForm.FJDA_ZJ = data.list.join(",");
      this.kskpForm.FJDA_MC = data.name.join(",");
    },
    // billdocheck() {
    //   this.$refs['ruleForm'].validate(valid => {
    //     if (valid) {
    //       this.$refs.ticketChilren.homegetCientData(
    //         this.multipleSelection,
    //         this.nsrform
    //       );
    //       this.dialogVisible = false
    //       //开票弹窗
    //       this.showTicket = true;
    //     } else {
    //       return false
    //     }
    //   })
    // },
    // nsrchange(index) {
    //   if (typeof index == 'number') {
    //     this.nsrform.invoice_nsrmc = this.nsrtable[index].invoice_nsrmc
    //     this.nsrform.invoice_nsrsbh = this.nsrtable[index].invoice_nsrsbh
    //     this.nsrform.invoice_khhjzh = this.nsrtable[index].invoice_khhjzh
    //     this.nsrform.invoice_nsrdzdh = this.nsrtable[index].invoice_nsrdzdh
    //     this.nsrform.invoice_object = this.nsrtable[index].invoice_object

    //     this.nsrform.JKR = this.nsrtable[index].JKR
    //     this.nsrform.RZSJ = this.nsrtable[index].RZSJ
    //     this.nsrform.FJID = this.nsrtable[index].FJID
    //     this.nsrform.LDMC = this.nsrtable[index].LDMC
    //     this.nsrform.FJMC = this.nsrtable[index].FJMC
    //   } else {
    //     this.nsrform.invoice_nsrmc = ''
    //     this.nsrform.invoice_nsrsbh = ''
    //     this.nsrform.invoice_khhjzh = ''
    //     this.nsrform.invoice_nsrdzdh = ''
    //     this.nsrform.invoice_object = ''

    //     this.nsrform.JKR = ''
    //     this.nsrform.RZSJ = ''
    //     this.nsrform.FJID = ''
    //     this.nsrform.LDMC = ''
    //     this.nsrform.FJMC = ''
    //   }

    // },
    formatMoney(data) {
      return data >= 0
        ? formatMoney(data, true)
        : `-${formatMoney(0 - data, true)}`;
    },
    building() {
      var loading = Loading.service({
        target: document.querySelector(".loadingtext"),
        lock: true,
        fullscreen: false,
        text: "数据加载中,请稍等...",
        background: "rgba(0,0,0,0)",
      });
      // this.ticketloading = true
      var SKPZ_ZJ = [];
      var FKGX_ZJ = [];
      var JKR = [];
      var RZSJ = [];
      this.multipleSelection.forEach((item) => {
        SKPZ_ZJ.push(item.SKPZ_ZJ);
        FKGX_ZJ.push(item.FKGX_ZJ);
        JKR.push(item.SKPZ_JKR);
        RZSJ.push(item.SKPZ_RZSJ);
      });
      makeElectronicInvoiceAndElectronicReceiptBatch({
        SKPZ_ZJ: SKPZ_ZJ.join(","),
        FKGX_ZJ: FKGX_ZJ.join(","),
        JKR: JKR.join(","),
        RZSJ: RZSJ.join(","),
      }).then((response) => {
        this.handleCurrentChange(1);
        // this.ticketloading = false
        loading.close();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    rowClick(row) {
      this.$refs.tipleTable.toggleRowSelection(row);
      if (
        this.multipleSelection.length == 1 &&
        this.multipleSelection.indexOf(row) > -1
      ) {
        queryisCanBill(row.SKPZ_ZJ).then((response) => {
          if (response.isCan == "true") {
            //true 可开票
            this.disabledTicket = false;
          } else {
            this.disabledTicket = true;
          }
        });
      } else {
        this.disabledTicket = true;
      }

      queryPayingProveDetails({ SKPZ_ZJ: row.SKPZ_ZJ }).then((response) => {
        this.detailData = response.data;
      });

      if (this.multipleSelection.indexOf(row) == -1) {
        this.detailData = [];
      }
    },
    //   判断新增，修改
    getPartitionData(data) {
      this.loading = false;
      this.height =
        this.$refs.KSKP.offsetHeight -
        this.$refs.kskpForm.$el.offsetHeight -
        this.$refs.current.offsetHeight -
        this.$refs.tipleTable.$el.offsetHeight -
        65;
      this.tableData = [];
      this.detailData = [];
      this.kskpForm = {
        FJDA_ZJ: "",
        SKPZ_JKR: "",
        LY: "",
        pageIndex: 0,
        pageSize: 300,
      };
      this.multipleSelection = [];
      this.$nextTick(() => {
        this.getTableData();
      });
      queryRoom().then((response) => {
        var data = response;
        data.forEach((item) => {
          item.value = item.FJDA_FJMC;
        });
        this.xmdata = data;
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.kskpForm.pageIndex = currentPage - 1;
      this.multipleSelection = [];
      this.getTableData(); //获取表格数据
      this.tableRow = {}; //选择后清空选中表格数据
    },
    getTableData() {
      this.$refs["kskpForm"].validate((valid) => {
        if (valid) {
          this.radio = "";
          this.loading = true;
          queryPayingProve(this.kskpForm).then((response) => {
            var data = response.data;
            if (data) {
              this.tableData = data;
              this.returnTotal = response.total;
              this.loading = false;
              this.$refs.tipleTable.setCurrentRow(data[0]);
              queryPayingProveDetails({ SKPZ_ZJ: data[0].SKPZ_ZJ }).then(
                (response) => {
                  this.detailData = response.data;
                }
              );
            }
          });
        } else {
          return false;
        }
      });
    },
    TicketDialog() {
      if (this.multipleSelection.length == 1) {
        this.$refs.ticketChilren.getData(
          this.multipleSelection[0],
          this.multipleSelection[0].FKGX_ZJ,
          2
        );
        //开票弹窗
        this.showTicket = true;
      } else {
        this.$refs.ticketChilren.homegetCientData(this.multipleSelection);
        //开票弹窗
        this.showTicket = true;
      }
    },
    batchTicketDialog() {
      var data = this.multipleSelection;
      var SKPZ_ZJ = [];
      var FKGX_ZJ = [];
      for (var i in data) {
        SKPZ_ZJ.push(data[i].SKPZ_ZJ);
        FKGX_ZJ.push(data[i].FKGX_ZJ);
      }
      BatchToMakeInvoice({
        SKPZ_ZJ: SKPZ_ZJ.join(","),
        FKGX_ZJ: FKGX_ZJ.join(","),
      }).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.handleCurrentChange(1);
        }
      });
    },
    downloadData() {
      this.exceltype = true;
      this.$refs["kskpForm"].validate((valid) => {
        if (valid) {
          exportExcelOfQuicklyOpenBilling(this.kskpForm).then((response) => {
            this.exceltype = false;
            const content = response;
            const blob = new Blob([content]);
            const fileName = `${this.title}.xls`;
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
        } else {
          return false;
        }
      });
    },
    downloadDetailData() {
      exportExcel({
        name: "首页凭证明细",
        list: JSON.stringify(this.detailData),
      }).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `首页票据明细.xls`;
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
  },
};
</script>
<style lang="scss">
.KSKP .block {
  padding: 10px 0 10px 0 !important;
  overflow: auto;
  .block_right {
    float: right;
    position: relative;
    right: 60px;
  }
}

.KSKP .el-loading-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.KSKP .el-select {
  width: 100%;
}

.KSKP .el-input {
  width: 100% !important;
}

.KSKP .el-loading-spinner {
  top: 50% !important;
  position: absolute;
}

.KSKP .kskpForm .el-input {
  padding-top: 3px;
}

.KSKP .kskpForm .el-input-group__append {
  padding: 0;
}

.KSKP .kskpForm .el-button--default {
  min-width: 0;
  margin-right: 0 !important;
}

.KSKP .el-table th.gutter {
  display: table-cell !important;
}

.KSKP .el-autocomplete {
  width: 100%;
}
</style>
