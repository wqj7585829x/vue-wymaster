<template>
  <div class="container contract">
    <!-- 按钮begin -->
    <el-form label-width="75px">
      <el-row :gutter="30">
        <el-col :span="6" style="width: 300px">
          <el-form-item label="项目名称:">
            <el-select v-model="contractForm.plot_id" clearable>
              <el-option
                v-for="(item, index) in plot_List"
                :key="index"
                :label="item.GLCNAME"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="资源名称:">
            <el-input v-model="contractForm.room_name" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="客户名称:">
            <el-input v-model="contractForm.KHDA_KHMC" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="6" style="width: 300px">
          <el-form-item label="合同状态:">
            <el-select v-model="contractForm.status" clearable>
              <el-option label="编辑中" value="0"></el-option>
              <el-option label="审核中" value="1"></el-option>
              <el-option label="审核通过" value="11"></el-option>
              <el-option label="审核不通过" value="21"></el-option>
              <el-option label="历史合同" value="28"></el-option>
              <el-option label="合同取消" value="29"></el-option>
              <el-option label="退租申请" value="31"></el-option>
              <el-option label="正常验收" value="32"></el-option>
              <el-option label="正常退租" value="33"></el-option>
              <el-option label="入住" value="34"></el-option>
              <el-option label="提前退租申请" value="41"></el-option>
              <el-option label="部分验收" value="42"></el-option>
              <el-option label="提前退租" value="43"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="合同类型:">
            <el-select v-model="contractForm.contract_type" clearable>
              <el-option label="租赁合同" :value="1"></el-option>
              <el-option label="销售合同" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="合同编号:">
            <el-input v-model="contractForm.contract_num" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="handleCurrentChange(1)"
              v-has="'ContractSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button type="primary" @click="addcontract" v-has="'ContractAdd_has'"
        >新增</el-button
      >
      <el-button
        type="primary"
        @click="editcontract"
        :disabled="editlimit"
        v-has="'ContractEdit_has'"
        >修改</el-button
      >
      <el-button
        type="danger"
        :disabled="deletelimit"
        @click="deletecontract"
        v-has="'ContractDelete_has'"
        >删除
      </el-button>

      <el-upload
        :name="'filedata'"
        accept=".xlc,.xlm,.xls,.xlt,.xlw"
        :action="UploadUrl()"
        :before-upload="beforeFileUpload"
        :show-file-list="false"
        style="display: inline-block"
      >
        <el-button
          type="primary"
          icon="el-icon-upload"
          size="mini"
          @click="uploadModel"
          >导入模板</el-button
        >
      </el-upload>
      <el-button type="primary" @click="downloadFile">下载模板</el-button>

      <el-button
        type="success"
        style="float: right"
        @click="building"
        v-has="'ContractTaxsource_has'"
        >税源信息报告</el-button
      >
      <el-button
        type="primary"
        style="float: right"
        @click="eventcontract"
        :disabled="multipleSelection.length != 1"
        v-has="'ContractEvent_has'"
        >合同事件
      </el-button>
      <el-button
        type="primary"
        style="float: right"
        @click="examinecontract"
        :disabled="editlimit"
        v-has="'ContractCheck_has'"
        >提交审核</el-button
      >
    </div>
    <!-- 按钮end -->
    <div class="resoureTable">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        v-if="maxheight"
        :max-height="maxheight"
        @row-click="rowClick"
      >
        <el-table-column
          fixed
          label="选择"
          type="selection"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="GLCNAME"
          label="项目名称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="contract_num"
          label="合同编号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="KHDA_KHMC"
          label="客户名称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="company_name"
          label="出租方"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="manager"
          label="经办人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="signing_date"
          label="签约日期"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="contract_start"
          label="合同起始"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="contract_end"
          label="合同截止"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="lease_cycle"
          label="租赁周期"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="rent_free_period"
          label="免租期"
          width="120"
        ></el-table-column>
        <el-table-column prop="rent_free_unit" label="免租期单位" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.rent_free_unit == 1">天</div>
            <div v-if="scope.row.rent_free_unit == 2">月</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="fee_start"
          label="费用计费开始日"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="fee_end"
          label="费用计费截止日"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="rental_area"
          label="出租面积"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="total_amount"
          label="合同总金额"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="down_payment"
          label="首付金额"
          width="120"
        ></el-table-column>
        <el-table-column prop="pay_cycle" label="收款周期" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.pay_cycle == 1">自然时间周期</div>
            <div v-if="scope.row.pay_cycle == 2">合同时间周期</div>
          </template>
        </el-table-column>
        <el-table-column prop="pay_cycle_detail" label="周期明细" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.pay_cycle_detail == 1">月</div>
            <div v-if="scope.row.pay_cycle_detail == 2">季度</div>
            <div v-if="scope.row.pay_cycle_detail == 3">半年</div>
            <div v-if="scope.row.pay_cycle_detail == 4">年</div>
          </template>
        </el-table-column>
        <el-table-column prop="contract_type" label="合同类型" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.contract_type == 1">租赁合同</div>
            <div v-if="scope.row.contract_type == 2">销售合同</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="contract_description"
          label="合同描述"
          width="120"
        ></el-table-column>
        <el-table-column prop="status" fixed="right" label="状态" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 0">编辑中</div>
            <div v-if="scope.row.status == 1">审核中</div>
            <div v-if="scope.row.status == 11">审核通过</div>
            <div v-if="scope.row.status == 21">审核不通过</div>
            <div v-if="scope.row.status == 28">历史合同</div>
            <div v-if="scope.row.status == 29">合同取消</div>
            <div v-if="scope.row.status == 31">退租申请</div>
            <div v-if="scope.row.status == 32">正常验收</div>
            <div v-if="scope.row.status == 33">正常退租</div>
            <div v-if="scope.row.status == 34">入住</div>
            <div v-if="scope.row.status == 41">提前退租申请</div>
            <div v-if="scope.row.status == 42">部分验收</div>
            <div v-if="scope.row.status == 43">提前退租</div>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          fixed="right"
          label="操作"
          :width="
            ContractDocheck_has() && ContractDownload_has()
              ? 200
              : !ContractDocheck_has() && !ContractDownload_has()
              ? 100
              : 150
          "
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              class="button-text"
              @click.stop="
                checkcontract(scope.row.contract_id, scope.row.plot_id)
              "
              :disabled="scope.row.status != 1"
              v-if="ContractDocheck_has()"
              >审核</el-button
            >
            <el-button
              type="text"
              class="button-text"
              @click="showcontract(scope.row)"
              >查看</el-button
            >
            <el-button
              type="text"
              class="button-text"
              @click="downloadcontract(scope.row)"
              v-if="
                scope.row.status != 0 &&
                scope.row.status != 21 &&
                scope.row.status != 29 &&
                ContractDownload_has()
              "
              >下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > contractForm.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="contractForm.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->

    <contractDialog
      :show.sync="show"
      ref="contractDialog"
      @RefreshItem="RefreshItem()"
    ></contractDialog>
    <TaxDialog :Taxshow.sync="Taxshow" ref="TaxDialog"></TaxDialog>
    <showDialog :datashow.sync="datashow" ref="showDialog"></showDialog>
    <eventDialog :Eventshow.sync="Eventshow" ref="eventDialog"></eventDialog>
  </div>
</template>

<script>
import contractDialog from "./components/contractDialog";
import TaxDialog from "./components/TaxDialog";
import showDialog from "./components/showDialog";
import eventDialog from "./components/eventDialog";
import { mapGetters } from "vuex";
import config from "@/utils/config";
import {
  queryContractMessage,
  deleteContractMessage,
  updateContractStatusSuccess,
  updateContractStatusFail,
  queryZLPlot,
  submitContract,
  download,
  importContractExcelTemplateData,
} from "@/api/Realtor/Contract";
export default {
  name: "",
  data() {
    return {
      contractForm: {
        plot_id: "",
        contract_num: "",
        KHDA_KHMC: "",
        status: "",
        contract_name: "",
        room_name: "",
        pageIndex: 0,
        pageSize: 10,
      },
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      show: false,
      Taxshow: false,
      tableData: [],
      multipleSelection: [],
      editlimit: true,
      deletelimit: true,
      plot_List: [],
      datashow: false,
      Eventshow: false,
      maxheight: 0,
    };
  },
  created() {
    this.maxheight = window.screen.width > 1025 ? 600 : 180;
  },
  mounted() {
    this.getTableData();

    queryZLPlot().then((response) => {
      this.plot_List = response;
    });
  },
  computed: {
    ...mapGetters(["userPlot"]),
  },
  methods: {
    ContractDownload_has() {
      //
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ContractDownload_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ContractDocheck_has() {
      //
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ContractDocheck_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    building() {
      this.$message({
        message: "建设中...",
      });
    },
    RefreshItem(type) {
      if (type == 0) {
        this.handleCurrentChange(1);
      } else {
        this.getTableData();
      }
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.contractForm.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.$refs.multipleTable.clearSelection();
      this.multipleSelection = []; //选择后清空选中表格数据
    },
    getTableData() {
      queryContractMessage(this.contractForm).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    handleSelectionChange(val) {
      //多选选中时则判断权限
      if (val.length == 1) {
        if (val[0].status == 0 || val[0].status == 21) {
          this.editlimit = false;
        } else {
          this.editlimit = true;
        }
      } else {
        this.editlimit = true;
      }
      if (val.length >= 1) {
        if (val[0].status != 11 && val[0].status != 29) {
          this.deletelimit = false;
        } else {
          this.deletelimit = true;
        }
      } else {
        this.deletelimit = true;
      }
      this.multipleSelection = val;
    },
    examinecontract() {
      this.$confirm("此操作将审核对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          submitContract({
            contract_id: this.multipleSelection[0].contract_id,
            plot_id: this.multipleSelection[0].plot_id,
          }).then((response) => {
            this.getTableData(); //获取表格数据
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    addcontract() {
      this.show = true;
      this.$refs.contractDialog.getReportData({}, 0);
    },
    editcontract() {
      this.show = true;
      this.$refs.contractDialog.getReportData(this.multipleSelection[0]);
    },
    showcontract(data) {
      this.datashow = true;
      this.$refs.showDialog.getReportData(data, 1);
    },
    downloadcontract(data) {
      download({
        dbName: data.db_name,
        GLCID: data.GLCID,
        YXDID: data.YXDID,
        contractId: data.contract_id,
      }).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `合同.doc`;
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
    eventcontract() {
      this.Eventshow = true;
      this.$refs.eventDialog.getReportData(this.multipleSelection[0]);
    },
    deletecontract() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var data = this.multipleSelection;
          var deletedata = [];
          var deleteplot = [];
          for (var i in data) {
            deletedata.push(data[i].contract_id);
            deleteplot.push(data[i].plot_id);
          }
          var deletejson1 = deletedata.join(",");
          var deletejson2 = deleteplot.join(",");
          deleteContractMessage({
            contract_id: deletejson1,
            plot_id: deletejson2,
          }).then((response) => {
            this.contractForm.pageIndex = 0;
            this.getTableData(); //获取表格数据
            this.$refs.multipleTable.clearSelection();
            this.multipleSelection = []; //选择后清空选中表格数据
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    checkcontract(contract_id, plot_id) {
      this.$confirm("您将对该笔合同进行审核, 是否通过?", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "审核通过",
        cancelButtonText: "审核不通过",
        type: "warning",
      })
        .then(() => {
          updateContractStatusSuccess({
            contract_id: contract_id,
            plot_id: plot_id,
          }).then((response) => {
            this.getTableData(); //获取表格数据
          });
        })
        .catch((action) => {
          if (action === "cancel") {
            updateContractStatusFail({
              contract_id: contract_id,
              plot_id: plot_id,
            }).then((response) => {
              this.getTableData(); //获取表格数据
            });
          }
        });
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row); //单击表格复选框选中
    },
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    beforeFileUpload(file) {
      //导入模板
      let index = 0;
      let fd = new FormData();
      fd.append("filedata", file);
      this.formD = fd;
      importContractExcelTemplateData(this.formD).then((response) => {
        var blobReader = new Response(response).json();
        blobReader.then((res) => {
          if (res.returnStatus == "SUCCESS") {
            this.$message({
              message: res.message,
              type: "success",
              duration: 2 * 1000,
            });
            this.getTableData(); //获取表格数据
          } else {
            this.$message({
              message: res.message,
              type: "warning",
              duration: 2 * 1000,
            });
          }
        });
      });
    },
    uploadModel() {
      //导入数据
    },
    downloadFile() {
      //下载模板
      var url = config.BASE_API + "/template/contract_message_template.xls";
      var alink = document.createElement("a");
      alink.href = url;
      alink.click();
    },
  },
  components: {
    contractDialog,
    TaxDialog,
    showDialog,
    eventDialog,
  },
};
</script>

<style lang="scss">
.contract {
  .el-select {
    width: 100%;
  }
  .el-title {
    padding: 0;
  }
  .title {
    padding-top: 36px;
    .title-top {
      margin-top: -36px;
      height: 36px;
      width: 100%;
      .tt-tab {
        float: left;
        height: 36px;
        width: 50%;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(77, 77, 77, 1);
        background: rgba(223, 224, 230, 1);
      }
      .tt-check {
        font-weight: bold;
        color: rgba(46, 138, 215, 1);
        background: rgb(255, 255, 255);
      }
    }
    .title-body {
      width: 100%;
      height: 98%;
      padding: 0 10px;
      overflow: auto;
      .ztree_content_wrap {
        margin-top: 10px;
        text-align: center;
        .el-input__inner {
          width: 190px;
          height: 28px;
          background: rgba(223, 224, 230, 1);
          border-radius: 4px;
          margin: 0 !important;
          margin-bottom: 14px;
        }
        .el-tree {
          margin-top: 10px;
        }
      }
      .el-input {
        .el-input__inner {
          margin-bottom: 10px;
        }
      }
    }
  }
  .button-text {
    min-width: 30px;
    margin: 0 !important;
    text-decoration: underline;
  }
}
</style>
