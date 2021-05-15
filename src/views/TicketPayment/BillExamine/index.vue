<template>
  <div class="container BillExamine">
    <el-form label-width="105px">
      <el-row :gutter="30">
        <el-col :span="4" style="width: 300px">
          <el-form-item label="资源名称:">
            <el-select v-model="searchList.FJDA_FJMC" filterable clearable>
              <el-option
                v-for="(item, index) in options1"
                :key="index"
                :label="item.FJDA_FJMC"
                :value="item.FJDA_FJMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 300px">
          <el-form-item label="客户名称:">
            <el-select v-model="searchList.KHDA_KHMC" filterable clearable>
              <el-option
                v-for="(item, index) in options2"
                :key="index"
                :label="item.KHDA_KHMC"
                :value="item.KHDA_KHMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 300px">
          <el-form-item label="纳税人名称:">
            <el-input v-model="searchList.invoiceNsrmc" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 300px">
          <el-form-item label="纳税人识别号:" label-width="105px">
            <el-input v-model="searchList.invoiceNsrsbh" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 300px">
          <el-form-item label="是否有效:" label-width="105px">
            <el-select v-model="searchList.invoiceIsUsable" clearable>
              <el-option label="无效" :value="0"></el-option>
              <el-option label="有效" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="4" style="width: 300px">
          <el-form-item label="状态:" label-width="105px">
            <el-select v-model="searchList.status" clearable>
              <el-option label="编辑中" :value="0"></el-option>
              <el-option label="审核中" :value="1"></el-option>
              <el-option label="审核通过" :value="2"></el-option>
              <el-option label="审核不通过" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 300px">
          <el-form-item label="申请人:" label-width="105px">
            <el-input
              v-model="searchList.invoiceApplicant"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="申请开始时间:" label-width="105px">
            <el-date-picker
              type="date"
              placeholder="选择时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="searchList.startData"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="申请截止时间:" label-width="105px">
            <el-date-picker
              type="date"
              placeholder="选择时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="searchList.endData"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-button
            type="success"
            @click="getdata"
            v-has="'BillExamineSearch_has'"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </el-form>

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button type="primary" @click="downloadFile" v-has="'CusDownload_has'"
        >下载模板
      </el-button>
      <el-upload
        :name="'filedata'"
        accept=".xlc,.xlm,.xls,.xlt,.xlw"
        :action="UploadUrl()"
        :before-upload="beforeFileUpload"
        :show-file-list="false"
        style="display: inline-block"
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

      <el-button type="primary" @click="addbill">新增</el-button>
      <el-button type="primary" @click="update()" :disabled="disabledupdate"
        >修改</el-button
      >
      <el-button type="primary" @click="upload()" :disabled="disabledupdate"
        >上传证明资料</el-button
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
        @row-click="rowClick"
      >
        <el-table-column label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="FJDA_FJID"
          label="资源代码"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="FJDA_FJMC"
          label="资源名称"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="KHDA_KHID" label="客户代码" width="200">
        </el-table-column>
        <el-table-column prop="KHDA_KHMC" label="客户名称" width="200">
        </el-table-column>
        <el-table-column prop="invoiceNsrmc" label="纳税人名称" width="200">
        </el-table-column>
        <el-table-column prop="invoiceNsrsbh" label="纳税人识别号" width="200">
        </el-table-column>
        <el-table-column prop="invoiceKhhjzh" label="开户行及账号" width="250">
        </el-table-column>
        <el-table-column prop="invoiceNsrdzdh" label="地址电话" width="250">
        </el-table-column>
        <el-table-column prop="invoiceMobile" label="手机号码" width="120">
        </el-table-column>
        <el-table-column prop="invoiceIsUsable" label="是否有效" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.invoiceIsUsable === 0">无效</span>
            <span v-if="scope.row.invoiceIsUsable === 1">有效</span>
          </template>
        </el-table-column>
        <el-table-column prop="startDate" label="起始日期" width="130">
        </el-table-column>
        <el-table-column prop="endDate" label="终止日期" width="130">
        </el-table-column>
        <el-table-column prop="invoiceApplicant" label="申请人" width="130">
        </el-table-column>
        <el-table-column
          prop="invoiceApplicantPhone"
          label="申请人账号"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="invoiceApplicantTime"
          label="申请时间"
          width="130"
        >
        </el-table-column>
        <el-table-column prop="status" label="审核状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">编辑中</span>
            <span v-if="scope.row.status === 1">审核中</span>
            <span v-if="scope.row.status === 2">审核通过</span>
            <span v-if="scope.row.status === 3">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="invoiceVerifier" label="审核人" width="150">
        </el-table-column>
        <el-table-column prop="remark" label="不通过理由" width="150">
        </el-table-column>
        <el-table-column prop="invoiceIsConfirm" label="财务确认" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.invoiceIsConfirm === 0">未确认</span>
            <span v-if="scope.row.invoiceIsConfirm === 1">已确认</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="button-text"
              @click="view(scope.row)"
              v-has="'BillExamineMaterial_has'"
              >查看证明材料
            </el-button>
            <el-button
              type="text"
              class="button-text"
              @click="checkbill(scope.row)"
              v-if="scope.row.status == 1"
              v-has="'BillExamineCheck_has'"
              >审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <ViewUploadDialog
      :showdialogView.sync="showdialogView"
      ref="PopChildren_View"
    >
    </ViewUploadDialog>

    <el-dialog
      v-dialogDrag
      title="不通过原因"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogVisible = false"
    >
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入不通过原因"
        v-model="textarea"
        style="width: 90%"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancellation">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > searchList.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="searchList.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->

    <BillDialog
      :Tshow.sync="Tshow"
      ref="billDialog"
      @RefreshItem="refreshList"
    ></BillDialog>

    <UploadDialog
      :showdialogUpload.sync="showdialogUpload"
      ref="PopChildren_Upload"
      @RefreshItem="refreshList"
    ></UploadDialog>
  </div>
</template>
<script>
import {
  queryInvoiceInformation,
  auditInvoiceInformation,
  InvoiceInformationImport,
  queryRoomMessage,
  queryClientByNull,
} from "@/api/TicketPayment/Bill";
import config from "@/utils/config";
import ViewUploadDialog from "./components/ViewUploadDialog";
import BillDialog from "./components/billDialog";
import UploadDialog from "./components/UploadDialog";
import { Message } from "element-ui";
export default {
  name: "MonthlyCarList",
  data() {
    return {
      tableData: [],
      searchList: {
        pageIndex: 0,
        pageSize: 10,
        CLXX_CZ: "",
        YZCCZ_CPH: "",
        CLXX_CZSJH: "",
      },
      radio: "", //选中
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      showdialogView: false,
      dialogVisible: false,
      disabledupdate: true,
      textarea: "",
      options1: [],
      options2: [],
      Tshow: false,
      showdialogUpload: false,
    };
  },
  components: {
    ViewUploadDialog,
    BillDialog,
    UploadDialog,
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        if (this.tableRow.invoiceId) {
          this.disabledupdate = false;
        }
      } else {
        this.disabledupdate = true;
      }
    },
  },
  mounted() {
    this.getTableData();
    queryRoomMessage().then((response) => {
      this.options1 = response;
    });
    queryClientByNull().then((response) => {
      this.options2 = response;
    });
  },
  methods: {
    //新增开票资料
    addbill() {
      this.Tshow = true;
      this.$refs.billDialog.getPartitionData({}, 0);
    },
    update() {
      if (Object.keys(this.tableRow) != "") {
        this.Tshow = true;
        this.$refs.billDialog.getPartitionData(this.tableRow, 1);
      }
    },
    rowClick(row) {
      //表格单行点击
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    upload() {
      //上传
      if (Object.keys(this.tableRow) != "") {
        this.showdialogUpload = true;
        this.$refs.PopChildren_Upload.getTableRow(this.tableRow, 1);
      }
    },
    //刷新表数据
    refreshList(newobj) {
      this.tableRow = {};
      this.getTableData();
    },
    downloadFile() {
      var url = config.BASE_API + "/template/invoice_information.xls";
      var alink = document.createElement("a");
      alink.href = url;
      alink.click();
    },
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    beforeFileUpload(file) {
      let index = 0;
      let fd = new FormData();
      fd.append("filedata", file);
      this.formD = fd;
      InvoiceInformationImport(this.formD).then((response) => {
        var blobReader = new Response(response).json();
        blobReader.then((res) => {
          if (res.returnStatus == "SUCCESS") {
            Message({
              message: res.message,
              type: "success",
              duration: 2 * 1000,
            });
            this.searchList = {
              pageIndex: 0,
              pageSize: 10,
              CLXX_CZ: "",
              YZCCZ_CPH: "",
              CLXX_CZSJH: "",
            };
            this.getTableData();
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
        this.refreshList({});
      });
    },
    uploadModel() {
      //导入数据
    },
    view(data) {
      //查看
      if (Object.keys(data) != "") {
        this.showdialogView = true;
        this.$refs.PopChildren_View.getTableRow(data, 1);
      }
    },
    checkbill(data) {
      this.$confirm("是否通过审核当前开票资料?", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "通过",
        cancelButtonText: "不通过",
        type: "warning",
      })
        .then(() => {
          auditInvoiceInformation({
            invoiceId: data.invoiceId,
            status: 2,
          }).then((response) => {
            this.getTableData(); //获取表格数据
          });
        })
        .catch((action) => {
          if (action === "cancel") {
            this.textarea = "";
            this.dialogVisible = true;
            this.tableRow = data;
          }
        });
    },
    cancellation() {
      auditInvoiceInformation({
        invoiceId: this.tableRow.invoiceId,
        status: 3,
        remark: this.textarea,
      }).then((response) => {
        this.dialogVisible = false;
        this.getTableData(); //获取表格数据
      });
    },
    getdata() {
      this.searchList.pageIndex = 0;
      this.getTableData();
    },
    handleCurrentChange(currentPage) {
      this.searchList.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = null; //选择后清空选中表格按钮
    },
    getTableData() {
      queryInvoiceInformation(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
  },
};
</script>
<style lang="scss" scope>
.block {
  text-align: right;
}

.BillExamine .el-date-editor {
  width: 100% !important;
}
</style>
