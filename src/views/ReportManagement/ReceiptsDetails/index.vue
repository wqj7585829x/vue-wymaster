<template>
  <div class="container ReceiptsDetails">
    <!-- 按钮begin -->
    <el-form label-width="85px">
      <el-row :gutter="30">
        <el-col :span="5" style="width: 300px">
          <el-form-item label="管理处名称:" label-width="80px">
            <el-select v-model="searchList.GLQDA_GLQMC" clearable>
              <el-option
                v-for="(item, index) in options1"
                :key="index"
                :label="item.GLQDA_GLQMC"
                :value="item.GLQDA_GLQMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="大楼名称:" label-width="70px">
            <el-select v-model="searchList.DLDA_DLMC" clearable>
              <el-option
                v-for="(item, index) in options2"
                :key="index"
                :label="item.DLDA_DLMC"
                :value="item.DLDA_DLMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="收费项目名称:" label-width="100px">
            <el-select v-model="searchList.FYSQ_SFXMMC" clearable>
              <el-option
                v-for="(item, index) in options3"
                :key="index"
                :label="item.SFXM_SFXMMC"
                :value="item.SFXM_SFXMMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="客户名称:" label-width="80px">
            <el-select
              v-model="searchList.KHDA_KHMC"
              clearable
              filterable
              multiple
              collapse-tags
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

        <el-col :span="5" style="width: 300px">
          <el-form-item label="所属年月:" label-width="70px">
            <el-date-picker
              type="month"
              placeholder="请选择所属年月"
              v-model="searchList.FYSQ_SSNY"
              format="yyyy-MM"
              value-format="yyyy-MM"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="备注:">
            <el-input v-model="searchList.FYSQ_BZ" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button type="primary" @click="getdata" style="float: left"
        >查询</el-button
      >
      <el-button type="primary" icon="el-icon-download" @click="downloadModel"
        >导出
      </el-button>
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <pl-table
        ref="singleTable"
        max-height="480"
        :data="tableData"
        border
        use-virtual
        :row-height="35"
      >
        <pl-table-column prop="GLQDA_GLQMC" label="管理区名称" width="200">
        </pl-table-column>
        <pl-table-column prop="DLDA_DLID" label="大楼代码" width="200">
        </pl-table-column>
        <pl-table-column prop="DLDA_DLMC" label="大楼名称" width="200">
        </pl-table-column>
        <pl-table-column prop="FJDA_FJID" label="房间代码" width="200">
        </pl-table-column>
        <pl-table-column prop="FJDA_FJMC" label="房间名称" width="200">
        </pl-table-column>
        <pl-table-column prop="FJDA_SFMJ" label="收费面积" width="200">
        </pl-table-column>
        <pl-table-column prop="KHDA_KHID" label="客户代码" width="200">
        </pl-table-column>
        <pl-table-column prop="KHDA_KHMC" label="客户名称" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_SCRQ" label="生成日期" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_SQRQ" label="收清日期" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_SSNY" label="所属年月" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_TZSM" label="调整说明" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_ZY" label="摘要" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_SFXMMC" label="收费项目名称" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_YSJE" label="应收金额" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_SSJE" label="实收金额" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_QSJE" label="欠收金额" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_JMJE" label="减免金额" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_ZKJE" label="折扣金额" width="200">
        </pl-table-column>
        <pl-table-column prop="FYSQ_BZ" label="备注" width="200">
        </pl-table-column>
      </pl-table>
      <div class="totalmoney">
        <div class="span1">应收金额:{{ priceList.FYSQ_YSJE }}</div>
        <div class="span1">欠收金额:{{ priceList.FYSQ_QSJE }}</div>
        <div class="span1">减免金额:{{ priceList.FYSQ_JMJE }}</div>

        <div class="span1">实收金额:{{ priceList.FYSQ_SSJE }}</div>
        <div class="span1">折扣金额:{{ priceList.FYSQ_ZKJE }}</div>
      </div>
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
  </div>
</template>
<script>
import {
  queryPartition,
  queryBuildingMessage,
  queryAllPayItems,
  queryCostDetails,
  queryCostTotal,
  exportCostDetails,
  queryClientAll,
  queryDistinctBuildingNames,
} from "@/api/ReportManagement/ReceiptsDetails";
import { PlTable, PlTableColumn, PlxTableGrid, PlxTableColumn } from "pl-table";
export default {
  name: "MonthlyCarList",
  data() {
    return {
      tableData: [],
      searchList: {
        pageIndex: 0,
        pageSize: 1000,
        GLQDA_GLQMC: "",
        DLDA_DLMC: "",
        FJDA_FJMC: "",
        KHDA_KHMC: "",
        FYSQ_SFXMMC: "",
        FYSQ_SSNY: "",
      },
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      priceList: {},
    };
  },
  watch: {},
  mounted() {
    // this.getTableData()
    queryPartition().then((response) => {
      this.options1 = response;
    });
    queryDistinctBuildingNames().then((response) => {
      this.options2 = response;
    });
    queryAllPayItems().then((response) => {
      this.options3 = response;
    });
    queryClientAll().then((response) => {
      this.options4 = response;
    });
  },
  components: {
    PlTable,
    PlTableColumn,
  },
  methods: {
    downloadModel() {
      var data = JSON.parse(JSON.stringify(this.searchList));
      data.KHDA_KHMC = data.KHDA_KHMC.join(",");
      exportCostDetails(data).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `收款明细.xls`;
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
    getdata() {
      this.searchList.pageIndex = 0;
      this.getTableData();
      var data = JSON.parse(JSON.stringify(this.searchList));
      data.KHDA_KHMC = data.KHDA_KHMC.join(",");
      queryCostTotal(data).then((response) => {
        this.priceList = response;
      });
    },
    handleCurrentChange(currentPage) {
      this.searchList.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = null; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    getTableData() {
      var data = JSON.parse(JSON.stringify(this.searchList));
      data.KHDA_KHMC = data.KHDA_KHMC.join(",");
      queryCostDetails(data).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
  },
};
</script>
<style lang="scss">
.block {
  text-align: right;
}

.ReceiptsDetails .el-select {
  width: 100%;
}

.ReceiptsDetails .el-date-editor {
  width: 100%;
}

.ReceiptsDetails .totalmoney {
  border-left: 1px solid #d5d6db;
  border-right: 1px solid #d5d6db;
  border-bottom: 1px solid #d5d6db;
  height: 30px;
  line-height: 30px;
  text-align: left;
  position: relative;
  .span1 {
    float: left;
    margin-left: 30px;
  }
}
</style>
