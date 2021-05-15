<template>
  <div class="resoureRight" v-show="ZoneShow">
    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button type="primary" :disabled="true" v-has="'HouAdd_has'"
        >新增</el-button
      >
      <el-button
        type="primary"
        @click="BatchAccounting"
        v-has="'HouBatchAdd_has'"
        >批量建账</el-button
      >
      <el-button
        type="primary"
        @click="updatePartition"
        :disabled="disabledupdate"
        v-has="'HouEdit_has'"
        >修改</el-button
      >
      <el-button
        type="danger"
        @click="deletePartition"
        :disabled="disabledelete"
        v-has="'HouDel_has'"
        >删除</el-button
      >
    </div>
    <!-- 按钮end -->

    <!-- 分区名称 表 begin -->
    <div class="resoureTable">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        @row-click="rowclick"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="HZ_ZH" label="户帐账户" width="200">
        </el-table-column>
        <el-table-column prop="HZ_SFMJ" label="收费面积" width="150">
        </el-table-column>
        <el-table-column prop="HZ_YE" label="余额" width="100">
        </el-table-column>
        <el-table-column prop="HZ_KYJE" label="可用金额" width="150">
        </el-table-column>
        <el-table-column prop="HZ_JZRQ" label="建帐日期" width="250">
        </el-table-column>
        <el-table-column prop="HZ_KHMC" label="客户名称"> </el-table-column>
      </el-table>
    </div>
    <!-- 分区名称 表 end -->

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > queryZonePage.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :pager-count="5"
        :page-size="queryZonePage.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->

    <!-- 弹框 begin -->
    <ResourceDialog
      :show.sync="show"
      ref="ResourceDialog"
      @RefreshItem="RefreshList"
    ></ResourceDialog>
    <Accounting
      :Ashow.sync="Ashow"
      ref="Accounting"
      @RefreshItem="RefreshList"
    ></Accounting>
    <!-- 弹框 end -->
  </div>
</template>

<script>
import ResourceDialog from "./ResourceDialog"; //新增,删除
import Accounting from "./Accounting"; //批量
import {
  queryHouseholdAccountUnderBuilding,
  deleteHouseholdAccount,
} from "@/api/PublicRepairManager/HouseAccounts";

export default {
  data() {
    return {
      disabledupdate: true, //修改
      disabledelete: true, //删除
      ZoneShow: false,
      show: false, // 弹框 显示
      Ashow: false,
      title: "", // 标题
      currentPage: 1, //当前页
      returnTotal: 10, //总共条数
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      tableData: [], //列表参数
      queryZonePage: {
        GLCID: "",
        YXDID: "",
        GLQDA_GLQMC: "",
        pageIndex: 0,
        pageSize: 10,
      },
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disabledupdate = false;
        this.disabledelete = false;
      } else {
        this.disabledupdate = true;
        this.disabledelete = true;
      }
    },
  },
  methods: {
    //分页函数
    handleCurrentChange(currentPage) {
      this.queryZonePage.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    // 获取  table  数据
    getTableDataList(val) {
      this.queryZonePage = {
        FCDM_GLQZJ: val.data.FCDM_GLQZJ,
        DLZJ: val.data.DLZJ,
        pageIndex: 0,
        pageSize: 10,
      };
      this.ZoneShow = true;
      this.currentPage = 1;
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.getTableData();
    },
    // 表数据
    getTableData() {
      queryHouseholdAccountUnderBuilding(this.queryZonePage).then(
        (response) => {
          this.tableData = response.data;
          this.returnTotal = response.total;
        }
      );
    },
    // 修改管理分区
    updatePartition() {
      this.show = true;
      this.$refs.ResourceDialog.getResourceData(this.tableRow, 1);
    },
    // 删除管理分区
    deletePartition() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteHouseholdAccount(this.tableRow).then((response) => {
            this.queryZonePage.pageIndex = 0;
            this.currentPage = 1;
            this.radio = ""; //选择后清空选中表格按钮
            this.RefreshList({});
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    BatchAccounting() {
      this.Ashow = true;
      this.$refs.Accounting.getPartitionData(this.queryZonePage, 1);
    },
    //刷新表数据
    RefreshList(newobj) {
      this.tableRow = newobj;
      this.getTableData();
    },
  },
  components: {
    ResourceDialog,
    Accounting,
  },
};
</script>

<style lang="scss" scoped>
.resoureTable {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
