<template>
  <div class="container FeeAdjustment" ref="FeeAdjustment">
    <!-- 按钮begin -->
    <el-form label-width="105px" ref="ELForm">
      <el-row :gutter="30">
        <el-col :span="6" style="width: 250px">
          <el-form-item label="所属年月:">
            <el-date-picker
              type="month"
              placeholder=""
              v-model="searchList.subordinateYears"
              format="yyyy-MM"
              value-format="yyyy-MM"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 250px">
          <el-form-item label="调整标题:">
            <el-input v-model="searchList.adjustmentTitle" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 250px">
          <el-form-item label="调整起始日期:">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="searchList.auditStartTime"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 250px">
          <el-form-item label="调整截止日期:">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="searchList.auditEndTime"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 250px">
          <el-form-item label="审核状态:">
            <el-select v-model="searchList.status" clearable>
              <el-option label="编辑中" :value="0"></el-option>
              <el-option label="申请中" :value="1"></el-option>
              <el-option label="审核通过" :value="2"></el-option>
              <el-option label="审核不通过" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button type="success" @click="getTableData()">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <div class="button buttonBox">
      <el-button type="primary" @click="FeeAdd">新增 </el-button>
      <el-button type="primary" @click="FeeEdit" :disabled="Fdisableds"
        >修改
      </el-button>
      <el-button type="danger" @click="FeeDelete" :disabled="Fdisableds"
        >删除</el-button
      >
      <el-button type="primary" @click="FeeView" :disabled="Fdisabled"
        >电子文件
      </el-button>
      <el-button type="primary" @click="FeeList" :disabled="Fdisabled"
        >预览调整清单
      </el-button>
      <el-button type="primary" @click="FeeCheck" :disabled="Ckeckdisabled"
        >提交审核
      </el-button>
      <el-button
        type="primary"
        @click="PerformAdjustment"
        :disabled="PAdisabled"
        >执行调整
      </el-button>
    </div>

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table
        ref="singleTable"
        :height="height"
        :data="tableData"
        border
        @row-click="rowclick"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="subordinateYears" label="所属年月" width="100">
        </el-table-column>
        <el-table-column
          prop="adjustmentTitle"
          label="调整标题"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="adjustmentDescribe"
          label="调整内容"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="adjustmentMoney" label="合计" width="120">
        </el-table-column>
        <el-table-column prop="status" label="审核状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">编辑中</span>
            <span v-if="scope.row.status === 1">申请中</span>
            <span v-if="scope.row.status === 2">审核通过</span>
            <span v-if="scope.row.status === 3">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="auditTime" label="审核日期" width="120">
        </el-table-column>
        <el-table-column prop="applyTime" label="申请日期" width="150">
        </el-table-column>
        <el-table-column prop="adjustmentTime" label="调整日期" width="150">
        </el-table-column>
        <el-table-column prop="applyUser" label="申请人"> </el-table-column>
        <el-table-column prop="reason" label="不通过理由" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <FeeDialog
      :show.sync="show"
      ref="FeeDialog"
      @RefreshItem="RefreshItem"
    ></FeeDialog>
    <AdjustmentListDialog
      :Ashow.sync="Ashow"
      ref="AdjustmentListDialog"
    ></AdjustmentListDialog>
    <ViewUploadDialog
      :showdialogView.sync="showdialogView"
      ref="PopChildren_View"
    ></ViewUploadDialog>
  </div>
</template>
<script>
import FeeDialog from "./components/FeeDialog";
import AdjustmentListDialog from "./components/AdjustmentListDialog";
import ViewUploadDialog from "./components/ViewUploadDialog";
import {
  queryBatchAdjustmentList,
  deleteBatchAdjustment,
  submitAudit,
  performAdjustment,
} from "@/api/FeeManagement/FeeAdjustment";
export default {
  name: "FeeAdjustments",
  data() {
    return {
      tableData: [],
      searchList: {},
      show: false,
      Ashow: false,
      showdialogView: false,
      radio: null,
      tableRow: {},
      Fdisabled: true,
      Fdisableds: true,
      Ckeckdisabled: true,
      PAdisabled: true,
      height: 0,
    };
  },
  components: {
    FeeDialog,
    AdjustmentListDialog,
    ViewUploadDialog,
  },
  mounted() {
    this.getTableData();
    this.$nextTick(() => {
      this.height =
        this.$refs.FeeAdjustment.offsetHeight -
        this.$refs.ELForm.$el.offsetHeight -
        60;
    });
  },
  watch: {
    radio() {
      if (this.radio !== null) {
        this.Fdisabled = false;
        if (this.tableRow.status == 0) {
          this.Ckeckdisabled = false;
        } else {
          this.Ckeckdisabled = true;
        }
        if (this.tableRow.status != 2) {
          this.Fdisableds = false;
        } else {
          this.Fdisableds = true;
        }
        if (
          this.tableRow.status == 2 &&
          this.tableRow.adjustmentTime == undefined
        ) {
          this.PAdisabled = false;
        } else {
          this.PAdisabled = true;
        }
      } else {
        this.Fdisableds = true;
        this.Fdisabled = true;
        this.Ckeckdisabled = true;
      }
    },
  },
  methods: {
    PerformAdjustment() {
      //执行调整
      this.$confirm("此操作将对应数据执行调整, 是否继续?", "提示", {
        confirmButtonText: "执行",
        cancelButtonText: "不执行",
        type: "warning",
      })
        .then(() => {
          performAdjustment(this.tableRow).then((response) => {
            this.getTableData(); //获取表格数据
          });
        })
        .catch(() => {});
    },
    FeeCheck() {
      //提交审核
      this.$confirm("此操作将审核对应数据, 是否继续?", "提示", {
        confirmButtonText: "提交",
        cancelButtonText: "不提交",
        type: "warning",
      })
        .then(() => {
          submitAudit(this.tableRow).then((response) => {
            this.getTableData(); //获取表格数据
          });
        })
        .catch(() => {});
    },
    FeeAdd() {
      //新增
      this.show = true;
      this.$refs.FeeDialog.getReportData({}, 0);
    },
    FeeEdit() {
      //编辑
      this.show = true;
      this.$refs.FeeDialog.getReportData(this.tableRow, 1);
    },
    FeeDelete() {
      //修改
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteBatchAdjustment(this.tableRow).then((response) => {
            this.radio = null; //选择后清空选中表格按钮
            this.getTableData({});
          });
        })
        .catch(() => {
          this.radio = null; //清空选中
        });
    },
    FeeView() {
      //查看
      if (Object.keys(this.tableRow) != "") {
        this.showdialogView = true;
        this.$refs.PopChildren_View.getTableRow(this.tableRow, 1);
      }
    },
    FeeList() {
      //预览清单
      this.Ashow = true;
      this.$refs.AdjustmentListDialog.getReportData(this.tableRow);
    },
    getTableData() {
      //查询列表
      queryBatchAdjustmentList(this.searchList).then((response) => {
        this.tableData = response;
        this.tableRow = {};
        this.radio = null;
      });
    },
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    RefreshItem(type) {
      queryBatchAdjustmentList(this.searchList).then((response) => {
        this.tableData = response;
        this.tableRow = {};
        this.radio = [];
      });
    },
  },
};
</script>
<style lang="scss" scope>
.FeeAdjustment .el-input {
  width: 100% !important;
}

.FeeAdjustment .el-select {
  width: 100%;
}
</style>
