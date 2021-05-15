<template>
  <div class="container UncollectedSure">
    <!-- 按钮begin -->
    <el-form label-width="105px">
      <el-row :gutter="30">
        <el-col :span="4" style="width: 320px">
          <el-form-item label="房间名称:" class="uForm">
            <el-input
              v-model="searchList.FJDA_MC"
              :title="searchList.FJDA_MC"
              clearable
              :disabled="true"
            >
              <el-button
                slot="append"
                icon="el-icon-edit-outline"
                @click="RoomChoose"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 320px">
          <el-form-item label="客户名称:">
            <el-select
              v-model="searchList.KHDA_KHMC"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(item, index) in options4"
                :key="index"
                :label="item.KHDA_KHMC"
                :value="item.KHDA_KHMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 320px">
          <el-form-item label="所属年月起:">
            <el-date-picker
              type="month"
              placeholder="请输入起始所属年月"
              v-model="searchList.FYSQ_KSSSNY"
              format="yyyy-MM"
              value-format="yyyy-MM"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 320px">
          <el-form-item label="所属年月止:">
            <el-date-picker
              type="month"
              placeholder="请输入截止所属年月"
              v-model="searchList.FYSQ_JZSSNY"
              format="yyyy-MM"
              value-format="yyyy-MM"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="4" style="width: 320px">
          <el-form-item label="收费项目:">
            <el-select
              v-model="searchList.SFXM_ZJ"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(item, index) in options2"
                :key="index"
                :label="item.SFXM_SFXMMC"
                :value="item.SFXM_ZJ"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="4" style="width:320px">
          <el-form-item label="先票开票状态:" label-width="105px">
            <el-select v-model="searchList.FYSQ_XPKPZT" filterable clearable>
              <el-option label="未申请" :value="1"></el-option>
              <el-option label="申请中" :value="2"></el-option>
              <el-option label="未开票" :value="11"></el-option>
              <el-option label="已开票" :value="12"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="handleCurrentChange(1)"
              v-has="'BAUncollectedSureSearch_has'"
              >查询
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button
        type="primary"
        @click="ApplyInvoice"
        :disabled="multipleSelection.length == 0"
        v-has="'BAUncollectedSureApply_has'"
      >
        申请开票
      </el-button>
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <pl-table
        ref="singleTable"
        height="500"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
        use-virtual
        :row-height="35"
      >
        <pl-table-column
          label="选择"
          type="selection"
          :selectable="selectInit"
          width="50"
        >
        </pl-table-column>
        <pl-table-column prop="DLDA_DLMC" label="大楼名称" width="200">
        </pl-table-column>
        <pl-table-column prop="FJDA_FJMC" label="房间名称" width="200">
        </pl-table-column>
        <pl-table-column prop="KHDA_KHMC" label="客户名称" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_SSNY" label="所属年月" width="100">
        </pl-table-column>
        <pl-table-column prop="FYSQ_SFXMMC" label="收费项目" width="200">
        </pl-table-column>
        <!-- <pl-table-column prop="FYSQ_XPKPZT" label="开票状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.FYSQ_XPKPZT===1">未申请</span>
            <span v-if="scope.row.FYSQ_XPKPZT===2">申请中</span>
            <span v-if="scope.row.FYSQ_XPKPZT===11">未开票</span>
            <span v-if="scope.row.FYSQ_XPKPZT===12">已开票</span>
          </template>
        </pl-table-column> -->
        <pl-table-column prop="FYSQ_YSJE" label="应收金额（含税）" width="120">
        </pl-table-column>
        <pl-table-column prop="FYSQ_YSSL" label="税率" width="120">
        </pl-table-column>
        <pl-table-column
          prop="FYSQ_YSBHS"
          label="应收金额（不含税）"
          width="140"
        >
        </pl-table-column>
        <pl-table-column prop="FYSQ_YSSE" label="税额" width="120">
        </pl-table-column>
        <pl-table-column prop="FYSQ_SSJE" label="实收金额" width="120">
        </pl-table-column>
        <pl-table-column prop="FYSQ_QSJE" label="欠收金额" width="120">
        </pl-table-column>
        <pl-table-column prop="FYSQ_XPKPLX" label="开票类型" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.FYSQ_XPKPLX === '1'">发票</span>
            <span v-if="scope.row.FYSQ_XPKPLX === '2'">收据</span>
          </template>
        </pl-table-column>
      </pl-table>
    </div>

    <checkDialog
      :show.sync="show"
      ref="checkDialog"
      @RefreshItem="handleCurrentChange(1)"
    ></checkDialog>
    <Resource
      :Rshow.sync="Rshow"
      ref="Resource"
      @getResource="getResource"
    ></Resource>
  </div>
</template>
<script>
import {
  queryBuildingMessage,
  queryRoomMessage,
  queryClientForRoom,
  queryUncollectedConfirmApplyBill,
  queryXPAllPayItems,
} from "@/api/TicketPayment/Bill";
import checkDialog from "./components/checkDialog";
import { PlTable, PlTableColumn, PlxTableGrid, PlxTableColumn } from "pl-table";
import Resource from "./../components/Resource";
export default {
  name: "UncollectedSure",
  data() {
    return {
      tableData: [],
      tableData1: [],
      searchList: {
        index2: "",
        index3: "",
        KHDA_ZJ: "",
      },
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      radio: null,
      tableRow: {}, //修改数据
      multipleSelection: [],
      show: false,
      disabledbutton: true,
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      Rshow: false,
    };
  },
  components: {
    checkDialog,
    PlTable,
    PlTableColumn,
    Resource,
  },
  watch: {},
  mounted() {
    this.getTableData();
    queryXPAllPayItems({}).then((response) => {
      this.options2 = response;
    });
    queryClientForRoom({}).then((response) => {
      this.options4 = response;
    });
  },
  methods: {
    selectInit(row, index) {
      if (row.FYSQ_XPKPYE == 0) {
        return false; //可勾选
      } else {
        return true; //不可勾选
      }
    },
    RoomChoose() {
      this.Rshow = true;
    },
    getResource(data) {
      this.searchList.FJDA_ZJ = data.list.join(",");
      this.searchList.FJDA_MC = data.name.join(",");
    },
    ApplyInvoice() {
      this.show = true;
      this.$refs.checkDialog.getReportData(this.multipleSelection);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.searchList.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.$refs.singleTable.clearSelection();
      this.multipleSelection = []; //选择后清空选中表格数据
    },
    rowClick(row) {
      if (row.row.FYSQ_XPKPYE === 0) {
        return;
      }
      this.$refs.singleTable.toggleRowSelection([
        {
          row: row,
        },
      ]); //单击表格复选框选中
    },
    handleSelectionChange(val) {
      var data = val;

      this.disabledbutton = false;

      this.multipleSelection = val;
    },
    getTableData() {
      var data = JSON.parse(JSON.stringify(this.searchList));
      data.SFXM_ZJ = data.SFXM_ZJ.join(",");
      data.KHDA_KHMC = data.KHDA_KHMC.join(",");
      queryUncollectedConfirmApplyBill(data).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.disabledbutton = true;
      });
    },
  },
};
</script>
<style lang="scss" scope>
.UncollectedSure .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.UncollectedSure .el-input {
  width: 100% !important;
}

.UncollectedSure .totalmoney {
  float: left;
  font-size: 16px;
  position: relative;
  top: 6px;
  left: 19px;
  color: #606266;
}

.UncollectedSure .el-select {
  width: 100%;
}

.UncollectedSure .uForm .el-input {
  padding-top: 3px;
}

.UncollectedSure .uForm .el-input-group__append {
  padding: 0;
}

.UncollectedSure .uForm .el-button--default {
  min-width: 0;
  margin-right: 0 !important;
}
</style>
