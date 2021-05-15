<template>
  <div class="NewReport">
    <!-- 搜索框begin -->
    <div class="select" ref="select">
      <el-form label-width="85px">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="开始日期:" :rules="[{ required: true }]">
              <el-date-picker
                type="date"
                placeholder="选择开始时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="searchList.startDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="截止日期:" :rules="[{ required: true }]">
              <el-date-picker
                type="date"
                placeholder="选择开始时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="searchList.endDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label-width="0px">
              <el-button type="success" @click="getTableData">查询</el-button>
              <el-button type="success" @click="downloadModel"
                >导出报表</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 搜索框end -->
    <div style="margin-bottom: 5px">
      <span
        v-for="(item, index) in total"
        style="margin-right: 20px"
        :key="index"
        >{{ index }}:{{ item }}</span
      >
    </div>
    <!-- 报表标题 -->
    <div class="ReportTitleDIV"><strong>收款开票明细报表</strong></div>
    <!--  表begin -->
    <div class="resoureTable">
      <u-table
        ref="multipleTable"
        :max-height="tableheight"
        :data="tableData"
        border
        show-summary
        :summary-method="getSummaries"
        use-virtual
        :row-height="35"
      >
        <u-table-column
          :prop="item"
          :label="item"
          :width="columnwidth(item)"
          v-for="(item, index) in column"
          :key="index"
        >
        </u-table-column>
      </u-table>
    </div>
    <!--  表 end -->
  </div>
</template>

<script>
import {
  queryGatheringOpenBillReconciliation,
  ReportExcel,
} from "@/api/ReportManagement/QueryReport";
import { Message } from "element-ui";
import { UTable, UTableColumn } from "umy-ui";
export default {
  data() {
    return {
      tableData: [], //列表参数
      searchList: {
        startDate: "",
        endDate: "",
      },
      choosetime: [],
      type: true,
      column: [],
      allcheck: "",
      options1: [],
      options2: [],
      roomlist: [],
      tableheight: 0,
      total: [],
    };
  },
  components: {
    UTable,
    UTableColumn,
  },
  mounted() {
    this.$nextTick(() => {
      this.tableheight =
        document.querySelectorAll(".el-body")[0].offsetHeight -
        60 -
        this.$refs.select.offsetHeight;
    });
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        const values = this.tableData.map((item) =>
          Number(item[column.property])
        );
        var dataNaN = JSON.stringify(values);
        if (dataNaN.indexOf("null") > -1) {
          sums[index] = "";
          return;
        }
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index].toFixed(2);
        } else {
          sums[index] = "";
        }
      });
      return [sums];
    },
    setData() {
      this.searchList = {
        startDate: "",
        endDate: "",
        type: 1,
        DLDA_ZJ: "",
        FJDA_ZJ: [],
        SFXM_ZJ: [],
      };
    },
    getTableData() {
      if (this.searchList.startDate == "") {
        Message({
          message: "请选择开始日期",
          type: "warning",
          duration: 2 * 1000,
        });
        return;
      }
      if (this.searchList.endDate == "") {
        Message({
          message: "请选择结束日期",
          type: "warning",
          duration: 2 * 1000,
        });
        return;
      }
      var data = {
        startDate: this.searchList.startDate,
        endDate: this.searchList.endDate,
      };
      queryGatheringOpenBillReconciliation(data).then((response) => {
        this.column = response.data.column;
        this.tableData = response.data.list;
        this.total = response.data.total;
      });
    },
    columnwidth(value) {
      var width = value.length * 18;
      return width < 150 ? 150 : width;
    },
    downloadModel() {
      if (this.searchList.startDate == "") {
        Message({
          message: "请选择开始日期",
          type: "warning",
          duration: 2 * 1000,
        });
        return;
      }
      if (this.searchList.endDate == "") {
        Message({
          message: "请选择结束日期",
          type: "warning",
          duration: 2 * 1000,
        });
        return;
      }
      //下载模板
      var data = {
        startDate: this.searchList.startDate,
        endDate: this.searchList.endDate,
      };
      ReportExcel(data).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `收款开票明细报表.xls`;
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
  },
};
</script>

<style lang="scss" scoped>
.NewReport {
  margin-top: 20px;
  .el-select {
    width: 100%;
  }

  .el-date-editor {
    width: 100%;
  }
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
