<template>
  <div class="NewReport">
    <!-- 搜索框begin -->
    <div class="select" ref="select">
      <el-form label-width="85px">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="开始日期:">
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
            <el-form-item label="截止日期:">
              <el-date-picker
                type="date"
                placeholder="选择开始时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="searchList.endDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="收费项目：">
              <el-select v-model="searchList.YJFA_ZJ" clearable>
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.YJFA_FAMC"
                  :value="item.YJFA_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label-width="0px">
              <el-button type="success" @click="getTableData">查询</el-button>
              <el-button
                type="success"
                @click="downloadModel"
                v-if="tableData.length == 0"
                >导出报表</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 搜索框end -->
    <!-- 报表标题 -->
    <div class="ReportTitleDIV"><strong>预交明细报表</strong></div>
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
          :label="index"
          :width="columnwidth(index)"
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
  queryPrepaymentDetail,
  exportExcelData,
  queryPrepaymentProject,
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
      options: [],
    };
  },
  components: {
    UTable,
    UTableColumn,
  },
  mounted() {
    queryPrepaymentProject().then((response) => {
      this.options = response.data;
    });
    this.$nextTick(() => {
      this.tableheight =
        document.querySelectorAll(".el-body")[0].offsetHeight -
        60 -
        this.$refs.select.offsetHeight;
    });
  },
  methods: {
    setData() {
      this.searchList = {
        startDate: "",
        endDate: "",
      };
    },
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
    getTableData() {
      queryPrepaymentDetail(this.searchList).then((response) => {
        this.column = response.data.title;
        this.tableData = response.data.data;
      });
    },
    columnwidth(value) {
      var width = value.length * 18;
      return width < 150 ? 150 : width;
    },
    downloadModel() {
      //下载模板
      exportExcelData({
        fileName: "预交明细报表",
        title: JSON.stringify(this.column),
        data: JSON.stringify(this.tableData),
      }).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `预交明细报表.xls`;
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
