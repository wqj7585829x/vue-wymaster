<template>
  <div class="container Received">
    <!-- 按钮begin -->
    <el-form label-width="75px">
      <el-row :gutter="30">
        <el-col :span="6" style="width: 320px">
          <el-form-item label="房间名称:">
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

        <el-col :span="6" style="width: 320px">
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

        <el-col :span="6" style="width: 320px">
          <el-form-item label="交款人:">
            <el-input v-model="searchList.SKPZ_JKR" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="6" style="width: 320px">
          <el-form-item label="收款开始日期:" label-width="105px">
            <el-date-picker
              type="date"
              placeholder="选择时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="searchList.KSSJ"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 320px">
          <el-form-item label="收款截止日期:" label-width="105px">
            <el-date-picker
              type="date"
              placeholder="选择时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="searchList.JZSJ"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 320px">
          <el-form-item label="先票开票状态:" label-width="105px">
            <el-select v-model="searchList.SKPZ_XPKPZT" filterable clearable>
              <el-option label="未申请" :value="1"></el-option>
              <el-option label="申请中" :value="2"></el-option>
              <el-option label="未开票" :value="11"></el-option>
              <el-option label="已开票" :value="12"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="getdata()"
              v-has="'BAReceivedSearch_has'"
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
        @click="ApplyInvoice"
        :disabled="disabledbutton"
        v-has="'BAReceivedApply_has'"
        >申请开票
      </el-button>
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <pl-table
        ref="singleTable"
        height="300"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        highlight-current-row
        @row-click="rowClick"
        use-virtual
        :row-height="35"
      >
        <pl-table-column type="selection" width="55"> </pl-table-column>
        <pl-table-column prop="DLDA_DLMC" label="大楼名称" width="150">
        </pl-table-column>
        <pl-table-column prop="FJDA_FJMC" label="房间名称" width="150">
        </pl-table-column>
        <pl-table-column prop="KHDA_KHMC" label="客户名称" width="200">
        </pl-table-column>
        <pl-table-column prop="SKPZ_JKR" label="交款人" width="200">
        </pl-table-column>
        <pl-table-column prop="SKPZ_ZFSJ" label="收款日期" width="150">
        </pl-table-column>
        <pl-table-column prop="SKPZ_SKJE" label="收款金额" width="200">
        </pl-table-column>
        <pl-table-column prop="SKPZ_SKR" label="收款人" width="200">
        </pl-table-column>
        <pl-table-column prop="SKPZ_XPKPZT" label="开票状态">
          <template slot-scope="scope">
            <span v-if="scope.row.SKPZ_XPKPZT === 1">未申请</span>
            <span v-if="scope.row.SKPZ_XPKPZT === 2">申请中</span>
            <span v-if="scope.row.SKPZ_XPKPZT === 11">未开票</span>
            <span v-if="scope.row.SKPZ_XPKPZT === 12">已开票</span>
          </template>
        </pl-table-column>
        <pl-table-column prop="SKPZ_DZSJ" label="到账时间" width="200">
        </pl-table-column>
        <pl-table-column prop="SKPZ_DZYH" label="到账银行" width="200">
        </pl-table-column>
      </pl-table>
    </div>

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

    <div class="customedetail">
      <pl-table
        ref="singleTable1"
        height="200"
        :data="tableData1"
        border
        use-virtual
        :row-height="35"
      >
        <pl-table-column prop="SKMX_SKFYMC" label="收款费用" width="180">
        </pl-table-column>
        <pl-table-column prop="SKMX_SSNY" label="所属年月" width="120">
        </pl-table-column>
        <pl-table-column prop="SKMX_SKFS" label="收款方式" width="140">
        </pl-table-column>
        <pl-table-column prop="SKMX_SKJE" label="收款金额（含税）" width="150">
        </pl-table-column>
        <pl-table-column prop="SKMX_SL" label="税率" width="120">
        </pl-table-column>
        <pl-table-column prop="SKMX_BHSJE" label="金额（不含税）" width="140">
        </pl-table-column>
        <pl-table-column prop="SKMX_KPJE" label="开票金额" width="120">
        </pl-table-column>
        <pl-table-column prop="SKMX_PJH" label="票据号" width="120">
        </pl-table-column>
        <pl-table-column prop="SKMX_SKZY" label="费用期间" width="180">
        </pl-table-column>
        <el-table-column prop="SKMX_BZ" label="备注"> </el-table-column>
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
  queryCollectedApplyBill,
  queryCollectionDetail,
} from "@/api/TicketPayment/Bill";
import checkDialog from "./components/checkDialog";
import { PlTable, PlTableColumn, PlxTableGrid, PlxTableColumn } from "pl-table";
import Resource from "./../components/Resource";
export default {
  name: "Received",
  data() {
    return {
      tableData: [],
      tableData1: [],
      searchList: {
        pageIndex: 0,
        pageSize: 100,
        index2: "",
        index3: "",
        KHDA_ZJ: "",
      },
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      multipleSelection: [],
      show: false,
      disabledbutton: true,
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
  mounted() {
    this.getTableData();
    queryBuildingMessage().then((response) => {
      this.options2 = response;
    });
    queryRoomMessage({}).then((response) => {
      this.options3 = response;
    });
    queryClientForRoom({}).then((response) => {
      this.options4 = response;
    });
  },
  methods: {
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
    getdata() {
      this.searchList.pageIndex = 0;
      this.getTableData();
    },
    handleSelectionChange(val) {
      var data = val;
      var SKPZ_XPKPZT = [];
      for (var i in data) {
        if (SKPZ_XPKPZT.indexOf(data[i].SKPZ_XPKPZT) == -1) {
          SKPZ_XPKPZT.push(data[i].SKPZ_XPKPZT);
        }
      }

      this.disabledbutton =
        SKPZ_XPKPZT.length === 1 && SKPZ_XPKPZT[0] === 1 ? false : true;

      this.multipleSelection = val;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.searchList.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.$refs.singleTable.clearSelection();
      this.multipleSelection = []; //选择后清空选中表格数据
    },
    rowClick(row) {
      this.$refs.singleTable.toggleRowSelection([
        {
          row: row,
        },
      ]); //单击表格复选框选中
      this.tableData1 = [];
      queryCollectionDetail({
        SKPZ_ZJ: row.SKPZ_ZJ,
      }).then((response) => {
        this.tableData1 = response.data;
      });
    },
    getTableData() {
      var data = JSON.parse(JSON.stringify(this.searchList));
      data.KHDA_KHMC = data.KHDA_KHMC.join(",");
      queryCollectedApplyBill(data).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.disabledbutton = true;
      });
    },
  },
};
</script>
<style lang="scss" scope>
.Received .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.Received .el-input {
  width: 100% !important;
}

.Received .totalmoney {
  float: left;
  font-size: 16px;
  position: relative;
  top: 6px;
  left: 19px;
  color: #606266;
}

.Received .el-select {
  width: 100% !important;
}

.Received .el-input-group__append {
  padding: 0;
}

.Received .el-button--default {
  min-width: 0;
  margin-right: 0 !important;
}
</style>
