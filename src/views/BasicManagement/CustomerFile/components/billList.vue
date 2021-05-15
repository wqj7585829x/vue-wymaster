<template>
  <div class="UserDialog billList">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form label-width="85px">
        <el-row :gutter="30">
          <el-col :span="4" style="width: 300px">
            <el-form-item label="纳税人名称：" label-width="85px">
              <el-input v-model="searchList.invoiceNsrmc" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4" style="width: 300px">
            <el-form-item label="纳税人识别号：" label-width="105px">
              <el-input v-model="searchList.invoiceNsrsbh" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-button type="primary" @click="gettable">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="button buttonBox">
        <el-button type="primary" @click="addbill">新增</el-button>
        <el-button :disabled="disablebutton" type="primary" @click="editbill"
          >修改</el-button
        >
        <el-button :disabled="disablebutton" type="danger" @click="deletebill"
          >删除</el-button
        >
        <el-button type="primary" @click="upload()" :disabled="disabledupdate"
          >上传证明资料</el-button
        >
        <el-button type="primary" @click="view()" :disabled="disabledupdate"
          >查看证明资料</el-button
        >
      </div>
      <el-table
        ref="detailTable"
        :data="tableData"
        height="300"
        border
        style="width: 100%"
        @row-click="rowclick"
      >
        <el-table-column label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="invoiceNsrmc" label="纳税人名称" width="150">
        </el-table-column>
        <el-table-column prop="invoiceNsrsbh" label="纳税人识别号" width="200">
        </el-table-column>
        <el-table-column prop="invoiceKhhjzh" label="开户行及账号" width="200">
        </el-table-column>
        <el-table-column prop="invoiceNsrdzdh" label="地址电话" width="200">
        </el-table-column>
        <el-table-column prop="invoiceMobile" label="手机号码" width="150">
        </el-table-column>
        <el-table-column prop="invoiceIsUsable" label="是否有效" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.invoiceIsUsable === 0">无效</span>
            <span v-if="scope.row.invoiceIsUsable === 1">有效</span>
          </template>
        </el-table-column>
        <el-table-column prop="startDate" label="起始日期" width="150">
        </el-table-column>
        <el-table-column prop="endDate" label="终止日期" width="150">
        </el-table-column>
        <el-table-column
          prop="invoiceRemindDate"
          label="提前提醒天数"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="invoiceIsRemind"
          label="是否提前提醒"
          width="150"
        >
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.invoiceIsRemind"
              :disabled="true"
            ></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancle">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
    <billDialog
      :Tshow.sync="Tshow"
      ref="billDialog"
      @RefreshItem="refreshList"
    ></billDialog>
    <UploadDialog
      :showdialogUpload.sync="showdialogUpload"
      ref="PopChildren_Upload"
      @RefreshItem="refreshList"
    >
    </UploadDialog>
    <ViewUploadDialog
      :showdialogView.sync="showdialogView"
      ref="PopChildren_View"
      @RefreshItem="refreshList"
    >
    </ViewUploadDialog>
  </div>
</template>

<script>
import {
  queryInvoiceInformation,
  deleteInvoiceInformation,
  uploadFile,
} from "@/api/BasicManagement/CustomerFile";
import UploadDialog from "./UploadDialog";
import billDialog from "./billDialog";
import ViewUploadDialog from "./ViewUploadDialog";
export default {
  data() {
    return {
      visible: this.billshow,
      title: "我的开票资料", //标题
      tableData: [],
      Tshow: false,
      tableRow: [],
      radio: "",
      KHDA_ZJ: "",
      FKGX_ZJ: "",
      searchList: {},
      disablebutton: true,
      KHDA_SJ: "",
      showdialogUpload: false,
      disabledupdate: true,
      showdialogView: false,
    };
  },
  props: {
    billshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    billshow() {
      this.visible = this.billshow;
    },
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        this.disabledupdate = false;
      } else {
        this.disabledupdate = true;
      }
    },
  },
  methods: {
    upload() {
      //上传
      if (Object.keys(this.tableRow) != "") {
        this.showdialogUpload = true;
        this.$refs.PopChildren_Upload.getTableRow(this.tableRow, 1);
      }
    },
    view() {
      //查看
      if (Object.keys(this.tableRow) != "") {
        this.showdialogView = true;
        this.$refs.PopChildren_View.getTableRow(this.tableRow, 1);
      }
    },
    //   外部调用弹窗
    getPartitionData(KHDA_SJ, KHDA_ZJ) {
      this.KHDA_SJ = KHDA_SJ;
      this.radio = "";
      this.searchList = {
        KHDA_SJ: KHDA_SJ,
        KHDA_ZJ: KHDA_ZJ,
      };
      this.disablebutton = true;
      this.gettable();
    },
    // 查询我的票据列表
    gettable() {
      this.disablebutton = true;
      this.radio = "";
      queryInvoiceInformation(this.searchList).then((response) => {
        this.tableData = response.data;
      });
    },
    //点击列表触发事件
    rowclick(row) {
      if (row.isOpenBill === 0) {
        this.disablebutton = false;
      } else {
        this.disablebutton = true;
      }
      this.tableRow = row;

      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    //新增票据
    addbill() {
      this.Tshow = true;
      this.$refs.billDialog.getPartitionData(
        { invoiceMobile: this.KHDA_SJ, invoiceKhdawj: this.searchList.KHDA_ZJ },
        0
      );
    },
    //修改票据
    editbill() {
      this.Tshow = true;
      this.$refs.billDialog.getPartitionData(this.tableRow, 1);
    },
    //删除票据
    deletebill() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteInvoiceInformation(this.tableRow).then((response) => {
            this.radio = ""; //选择后清空选中表格按钮
            this.disablebutton = true;
            this.tableRow = {}; //选择后清空选中表格数据
            this.refreshList();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
          this.disablebutton = true;
          this.tableRow = {}; //选择后清空选中表格数据
        });
    },
    // 取消
    cancle() {
      this.$emit("update:billshow", false);
    },
    //弹窗回调，刷新列表
    refreshList() {
      queryInvoiceInformation(this.searchList).then((response) => {
        this.tableData = response.data;
        this.tableRow = this.tableData[this.radio];
      });
    },
  },
  components: {
    billDialog,
    UploadDialog,
    ViewUploadDialog,
  },
};
</script>

<style scope>
.billList .el-dialog__body {
  padding: 10px 20px 40px 20px;
}

.billList .buttonBox {
  text-align: left;
  margin-top: 5px;
}

.billList .el-dialog__footer {
  /* text-align: right;
  padding-right: 40px; */
}

.billList .el-dialog-treble .el-row {
  margin: 0 -15px !important;
  padding: inherit !important;
}
</style>
