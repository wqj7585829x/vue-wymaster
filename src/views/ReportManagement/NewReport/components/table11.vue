<template>
  <div class="NewReport">
    <!-- 搜索框begin -->
    <div class="select" ref="select">
      <el-form label-width="100px">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="收款开始日期:">
              <el-date-picker
                type="date"
                placeholder=""
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="searchList.SKKS"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="收款结束日期:">
              <el-date-picker
                type="date"
                placeholder=""
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="searchList.SKJS"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="收费项目：">
              <el-select v-model="searchList.SFXM" clearable>
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.SFXM_SFXMMC"
                  :value="item.SFXM_SFXMMC"
                >
                </el-option>
              </el-select>
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
    <!-- 报表标题 -->
    <div class="ReportTitleDIV"><strong>一次性费用明细表</strong></div>
    <!--  表begin -->
    <div class="resoureTable">
      <u-table
        :data="tableData"
        border
        highlight-current-row
        style="width: 100%"
        :max-height="tableheight"
        class="tableContent"
        ref="singleTable"
        use-virtual
        :row-height="30"
        show-summary
        :summary-method="getSummaries"
      >
        <u-table-column
          label="楼栋名称"
          prop="DLDA_DLMC"
          width="200"
        ></u-table-column>
        <u-table-column
          label="资源代码"
          prop="FJDA_FJID"
          width="200"
        ></u-table-column>
        <u-table-column
          label="资源名称"
          prop="FJDA_FJMC"
          width="200"
        ></u-table-column>
        <u-table-column
          label="收费面积"
          prop="FJDA_SFMJ"
          width="200"
        ></u-table-column>
        <u-table-column
          label="业主代码"
          prop="YZID"
          width="200"
        ></u-table-column>
        <u-table-column
          label="业主名称"
          prop="YZMC"
          width="200"
        ></u-table-column>
        <u-table-column
          label="租户代码"
          prop="ZHID"
          width="200"
        ></u-table-column>
        <u-table-column
          label="租户名称"
          prop="ZHMC"
          width="200"
        ></u-table-column>
        <u-table-column
          label="收款日期"
          prop="YCXSF_SFRQ"
          width="200"
        ></u-table-column>
        <u-table-column
          label="收款方式"
          prop="YCXSF_SKFS"
          width="200"
        ></u-table-column>
        <u-table-column
          label="交款人"
          prop="YCXSF_JKR"
          width="200"
        ></u-table-column>
        <u-table-column
          label="收费项目"
          prop="YCXSF_SFXMMC"
          width="200"
        ></u-table-column>
        <u-table-column
          label="收款金额"
          prop="YCXSF_SFJE"
          width="200"
        ></u-table-column>
        <u-table-column
          label="退款日期"
          prop="YCXSF_TKRQ"
          width="200"
        ></u-table-column>
        <u-table-column
          label="退款金额"
          prop="YCXSF_TKJE"
          width="200"
        ></u-table-column>
        <u-table-column
          label="退款方式"
          prop="YCXSF_TKFS"
          width="200"
        ></u-table-column>
        <u-table-column
          label="退款余额"
          prop="YCXSF_TKYE"
          width="200"
        ></u-table-column>
      </u-table>
    </div>
    <!--  表 end -->
  </div>
</template>

<script>
import {
  queryOneCostReport,
  exportOneCostReport,
  queryOneCostReportSfxm,
} from "@/api/ReportManagement/QueryReport";
import { Message } from "element-ui";
import { UTable, UTableColumn } from "umy-ui";
export default {
  data() {
    return {
      tableData: [], //列表参数
      searchList: {},
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
    queryOneCostReportSfxm().then((response) => {
      this.options = response;
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
        SKKS: "",
        SKJS: "",
        SFXM: "",
      };
    },
    getSummaries({ columns, data }) {
      //合计
      const means = []; // 合计
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means[columnIndex] = "合计";
        } else if (
          column.label == "收费面积" ||
          column.label == "业主代码" ||
          column.label == "业主名称" ||
          column.label == "租户代码" ||
          column.label == "租户名称" ||
          column.label == "交款人" ||
          column.label == "退款方式"
        ) {
          means[columnIndex] = "";
        } else {
          const values = data.map((item) => Number(item[column.property]));
          // 合计
          if (!values.every((value) => isNaN(value))) {
            means[columnIndex] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return this.$math.add(prev, curr); //相加
              } else {
                return prev;
              }
            }, 0);
          } else {
            means[columnIndex] = "";
          }
        }
      });
      // 返回一个二维数组的表尾合计(不要平均值，你就不要在数组中添加)
      return [means];
    },
    getSummariesx(param) {
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
      queryOneCostReport(this.searchList).then((response) => {
        this.tableData = response;
      });
    },
    columnwidth(value) {
      var width = value.length * 18;
      return width < 150 ? 150 : width;
    },
    downloadModel() {
      //下载模板
      exportOneCostReport(this.searchList).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `一次性费用明细表.xls`;
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
