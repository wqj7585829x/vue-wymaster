<template>
  <div class="container NotInvoiced">
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
      </el-row>

      <el-row :gutter="30">
        <el-col :span="6" style="width: 320px">
          <el-form-item label="收费项目:">
            <el-select v-model="searchList.SFXM_ZJ" filterable clearable>
              <el-option
                v-for="(item, index) in options5"
                :key="index"
                :label="item.SFXM_SFXMMC"
                :value="item.SFXM_ZJ"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 320px">
          <el-form-item label="所属年月:">
            <el-date-picker
              type="month"
              placeholder="选择所属年月"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              v-model="searchList.FYSQ_SSNY"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 320px">
          <el-form-item label="先票开票状态:" label-width="105px">
            <el-select v-model="searchList.FYSQ_XPKPZT" filterable clearable>
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
              @click="handleCurrentChange(1)"
              v-has="'BANotInvoicedSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <pl-table
        ref="singleTable"
        height="500"
        :data="tableData"
        border
        use-virtual
        :row-height="35"
      >
        <pl-table-column prop="DLDA_DLMC" label="大楼名称" width="200">
        </pl-table-column>
        <pl-table-column prop="FJDA_FJMC" label="房间名称" width="200">
        </pl-table-column>
        <pl-table-column prop="KHDA_KHMC" label="客户名称" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_SSNY" label="所属年月" width="100">
        </pl-table-column>
        <pl-table-column prop="FYSQ_SFXMMC" label="收费项目名称" width="120">
        </pl-table-column>
        <pl-table-column prop="FYSQ_XPKPZT" label="开票状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.FYSQ_XPKPZT === 1">未申请</span>
            <span v-if="scope.row.FYSQ_XPKPZT === 2">申请中</span>
            <span v-if="scope.row.FYSQ_XPKPZT === 11">未开票</span>
            <span v-if="scope.row.FYSQ_XPKPZT === 12">已开票</span>
          </template>
        </pl-table-column>
        <pl-table-column prop="FYSQ_YSJE" label="应收金额（含税）" width="120">
        </pl-table-column>
        <pl-table-column prop="FYSQ_YSSL" label="税率" width="200">
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
            <span v-if="scope.row.FYSQ_XPKPLX === 1">发票</span>
            <span v-if="scope.row.FYSQ_XPKPLX === 2">收据</span>
          </template>
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
  queryXPAllPayItems,
  queryUncollectedApplyBill,
} from "@/api/TicketPayment/Bill";
import { PlTable, PlTableColumn, PlxTableGrid, PlxTableColumn } from "pl-table";
import Resource from "./../components/Resource";
export default {
  name: "NotInvoiced",
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
      radio: null,
      tableRow: {}, //修改数据
      multipleSelection: [],
      disabledbutton: true,
      options2: [],
      options2: [],
      options3: [],
      options4: [],
      options5: [],
      Rshow: false,
    };
  },
  components: {
    PlTable,
    PlTableColumn,
    Resource,
  },
  watch: {},
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
    queryXPAllPayItems().then((response) => {
      this.options5 = response;
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
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.searchList.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.$refs.singleTable.clearSelection();
      this.multipleSelection = []; //选择后清空选中表格数据
    },
    getTableData() {
      var data = JSON.parse(JSON.stringify(this.searchList));
      data.KHDA_KHMC = data.KHDA_KHMC.join(",");
      queryUncollectedApplyBill(data).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
  },
};
</script>
<style lang="scss" scope>
.NotInvoiced .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.NotInvoiced .el-input {
  width: 100% !important;
}

.NotInvoiced .totalmoney {
  float: left;
  font-size: 16px;
  position: relative;
  top: 6px;
  left: 19px;
  color: #606266;
}

.NotInvoiced .el-select {
  width: 100%;
}

.NotInvoiced .el-input-group__append {
  padding: 0;
}

.NotInvoiced .el-button--default {
  min-width: 0;
  margin-right: 0 !important;
}
</style>
