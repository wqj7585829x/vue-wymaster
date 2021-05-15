<template>
  <div class="container CashCollection">
    <!-- 按钮begin -->
    <el-form label-width="110px">
      <el-row :gutter="30">
        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="到账开始日期：">
            <el-date-picker
              type="date"
              v-model="searchList.accountStartDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="到账截止日期：">
            <el-date-picker
              type="date"
              v-model="searchList.accountEndDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="房间名称：">
            <el-input v-model="searchList.room_name" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="客户名称：">
            <el-input v-model="searchList.customer_name" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="收款日期：">
            <el-date-picker
              type="date"
              v-model="searchList.receipt_date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="min-width: 220px">
          <el-form-item label="收款方式：">
            <el-select v-model="searchList.receipt_method" clearable>
              <el-option
                v-for="item in ListData"
                :key="item.SFKM_SKFS"
                :label="item.SFKM_SKFS"
                :value="item.SFKM_SKFS"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="getdata()"
              v-has="'CashCollectionSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <!-- <el-button type="primary" @click="addReport" style="float:left" v-has="'CashCollectionAdd_has'">新增</el-button> -->
      <el-button
        type="primary"
        :disabled="multipleSelection.length != 1"
        @click="updateReport"
        style="float: left"
        v-has="'CashCollectionEdit_has'"
      >
        修改</el-button
      >
      <el-button
        type="danger"
        :disabled="multipleSelection.length === 0"
        @click="deleteReport"
        style="float: left"
        v-has="'CashCollectionDelete_has'"
        >删除
      </el-button>
      <el-button
        type="primary"
        @click="dobutton"
        style="float: left"
        v-has="'CashCollectionAR_has'"
        >认账</el-button
      >
      <el-upload
        :name="'filedata'"
        accept=".xlc,.xlm,.xls,.xlt,.xlw"
        :action="UploadUrl()"
        :before-upload="beforeFileUpload"
        :show-file-list="false"
        style="float: left"
        v-has="'CashCollectionImport_has'"
      >
        <el-button
          type="primary"
          icon="el-icon-upload"
          size="mini"
          @click="uploadModel"
          >导入</el-button
        >
      </el-upload>
      <el-button
        type="success"
        v-has="'CashCollectionDataDown_has'"
        @click="downloData()"
        >导出excel</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-download"
        @click="dialogVisible = true"
        v-has="'CashCollectionDataDown_has'"
      >
        现金收款模板
      </el-button>
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table
        ref="singleTable"
        max-height="480"
        :data="tableData"
        border
        @row-click="rowclick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            <span class="tableindex">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="receipt_date" label="收款日期" width="120">
        </el-table-column>
        <el-table-column prop="build_name" label="大楼名称" width="150">
        </el-table-column>
        <el-table-column prop="room_name" label="房间代码" width="150">
        </el-table-column>
        <el-table-column prop="receiver" label="收款人" width="120">
        </el-table-column>
        <el-table-column prop="receipt_method" label="收款方式" width="120">
        </el-table-column>
        <el-table-column prop="deposit_method" label="存款方式" width="120">
        </el-table-column>
        <el-table-column prop="account_date" label="到账日期" width="120">
        </el-table-column>
        <el-table-column prop="payer" label="缴存人" width="120">
        </el-table-column>
        <el-table-column prop="deposit_date" label="存款日期" width="120">
        </el-table-column>
        <el-table-column prop="account_money" label="金额" width="120">
        </el-table-column>
        <el-table-column prop="appreciator_status" label="认账状态" width="120">
        </el-table-column>
        <el-table-column prop="account_bank" label="到账银行" width="120">
        </el-table-column>
        <el-table-column prop="appreciator_type" label="认账方式" width="120">
        </el-table-column>
        <el-table-column prop="appreciator" label="认账人" width="120">
        </el-table-column>
        <el-table-column prop="appreciator_date" label="认账时间" width="120">
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-dialogDrag
      title="模板下载"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label-width="0" required style="margin: 0 15px">
          <el-col :span="11">
            <el-form-item prop="startDate">
              <el-date-picker
                type="date"
                placeholder="选择开始日期"
                v-model="ruleForm.startDate"
                style="width: 100%"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endDate">
              <el-date-picker
                type="date"
                placeholder="选择结束日期"
                v-model="ruleForm.endDate"
                style="width: 100%"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadModel">下 载</el-button>
      </span>
    </el-dialog>

    <TemporaryDialog
      :show.sync="show"
      ref="TemporaryDialog"
      @RefreshItem="RefreshList"
    ></TemporaryDialog>
  </div>
</template>
<script>
import {
  cashImport,
  cashAutoMatch,
  queryCashData,
  queryReceiptMethod,
  deleteCashData,
  downloadCash,
  getMaxImportDate,
  exportCashData,
} from "@/api/BankReconciliation/CashCollection";
import TemporaryDialog from "./components/TemporaryDialog";
import config from "@/utils/config";
import { Message } from "element-ui";
export default {
  name: "TemporaryCar",
  data() {
    return {
      tableData: [],
      searchList: {},
      show: false,
      radio: null,
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      formD: {},
      ListData: [],
      dialogVisible: false,
      ruleForm: {
        startDate: "",
        endDate: "",
      },
      rules: {
        startDate: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        endDate: [{ required: true, message: "请选择时间", trigger: "change" }],
      },
      timeoptions: [],
      multipleSelection: [],
    };
  },
  watch: {},
  mounted() {
    var date = new Date();
    var year = date.getFullYear(); //获取完整的年份(4位)
    var month =
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth(); //获取当前月份(0-11,0代表1月)
    var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(); //获取当前日(1-31)
    this.searchList = {
      accountStartDate: `${year}-${month}-01`,
      accountEndDate: `${year}-${month}-${day}`,
      pageIndex: 0,
      pageSize: 10,
      room_name: "",
      customer_name: "",
      receipt_date: "",
      receipt_method: "",
    };
    this.getTableData();
    queryReceiptMethod().then((response) => {
      this.ListData = response;
    });
  },
  methods: {
    downloData() {
      exportCashData(this.searchList).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `现金列表.xls`;
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
    downloadModel() {
      //下载模板
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          downloadCash(this.ruleForm).then((response) => {
            this.dialogVisible = false;
            const content = response;
            const blob = new Blob([content]);
            const fileName = `现金模版.xls`;
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
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    beforeFileUpload(file) {
      let index = 0;
      let fd = new FormData();
      fd.append("file", file);
      this.formD = fd;
      cashImport(this.formD).then((response) => {
        var blobReader = new Response(response).json();
        blobReader.then((res) => {
          if (res.returnStatus == "SUCCESS") {
            Message({
              message: res.message,
              type: "success",
              duration: 2 * 1000,
            });
            this.getTabList();
          } else {
            Message({
              message: res.message,
              type: "warning",
              duration: 2 * 1000,
            });
          }
        });
        this.radio = null; //选择后清空选中表格按钮
        this.tableRow = {};
        this.RefreshList({});
      });
    },
    uploadModel() {
      //导入数据
    },
    dobutton() {
      cashAutoMatch().then((response) => {
        this.getdata();
      });
    },
    getdata() {
      this.getTableData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    rowclick(row) {
      this.$refs.singleTable.toggleRowSelection(row); //单击表格复选框选中
    },
    getTableData() {
      queryCashData(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    addReport() {
      this.show = true;
      this.$refs.TemporaryDialog.getReportData({}, 0);
    },
    updateReport() {
      this.show = true;
      this.$refs.TemporaryDialog.getReportData(this.multipleSelection[0], 1);
    },
    deleteReport() {
      var val = this.multipleSelection;
      var id = [];
      for (var i in val) {
        id.push(val[i].id);
      }
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCashData({
            id: id.join(","),
          }).then((response) => {
            this.searchList.pageIndex = 0;
            this.currentPage = 1;
            this.radio = null; //选择后清空选中表格按钮
            this.tableRow = {};
            this.RefreshList({});
          });
        })
        .catch(() => {
          this.radio = null; //清空选中
        });
    },
    //刷新表数据
    RefreshList(newobj) {
      queryCashData(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.tableRow = this.tableData[this.radio];
      });
    },
  },
  components: {
    TemporaryDialog,
  },
};
</script>
<style lang="scss">
.block {
  text-align: right;
}

.CashCollection .el-date-editor {
  width: 100% !important;
}

.CashCollection .buttonBox {
  overflow: auto;
}

.CashCollection .line {
  text-align: center;
}
</style>
