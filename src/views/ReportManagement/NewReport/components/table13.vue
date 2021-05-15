<template>
  <div class="NewReport">
    <!-- 搜索框begin -->
    <div class="select" ref="select">
      <el-form label-width="85px">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="统计年份:" :rules="[{ required: true }]">
              <el-date-picker
                type="year"
                placeholder=""
                format="yyyy"
                value-format="yyyy"
                v-model="searchList.N"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="收费项目：">
              <el-select v-model="searchList.SFXM" clearable>
                <el-option
                  v-for="(item, index) in options1"
                  :key="index"
                  :label="item.FYSQ_SFXMMC"
                  :value="item.FYSQ_SFXMMC"
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
    <div class="ReportTitleDIV"><strong>本年收费率</strong></div>
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
          label="本年度回收率"
          prop="HSL"
          width="200"
        ></u-table-column>
        <u-table-column
          label="预收以后年度"
          prop="YSYHND"
          width="200"
        ></u-table-column>
        <u-table-column
          label="实收款小计"
          prop="SSKXJ"
          width="200"
        ></u-table-column>
        <u-table-column
          label="应收账款小计"
          prop="YSZKXJ"
          width="200"
        ></u-table-column>
        <u-table-column
          label="收回往年欠款"
          prop="SHWNQK"
          width="200"
        ></u-table-column>
        <u-table-column
          label="收回本年应收款"
          prop="SHBNYSK"
          width="200"
        ></u-table-column>
        <u-table-column
          label="以前年度欠费率"
          prop="YQNDQFL"
          width="200"
        ></u-table-column>
        <u-table-column
          label="全年应收款"
          prop="QNYSK"
          width="200"
        ></u-table-column>
        <u-table-column
          label="未收款小计"
          prop="WSKXJ"
          width="200"
        ></u-table-column>
        <u-table-column
          label="以前年度预收本年度"
          prop="YSBND"
          width="200"
        ></u-table-column>
        <u-table-column
          label="往年应收款"
          prop="WNYSK"
          width="200"
        ></u-table-column>
        <u-table-column
          label="本年未收"
          prop="BNWS"
          width="200"
        ></u-table-column>
        <u-table-column
          label="本年综合收费率"
          prop="BNZHSFL"
          width="200"
        ></u-table-column>
        <u-table-column
          label="收费项目名称"
          prop="FYSQ_SFXMMC"
          width="200"
        ></u-table-column>
      </u-table>
    </div>
    <!--  表 end -->
  </div>
</template>

<script>
import {
  queryAnnualFeeRate,
  exportAnnualFeeRateYear,
  queryChargeRateSfxm,
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
    this.$nextTick(() => {
      this.tableheight =
        document.querySelectorAll(".el-body")[0].offsetHeight -
        60 -
        this.$refs.select.offsetHeight;
    });
    queryChargeRateSfxm().then((response) => {
      this.options1 = response;
    });
  },
  methods: {
    setData() {
      var date = new Date();
      var year = date.getFullYear();
      this.searchList = {
        N: `${year}`,
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
      if (this.searchList.N == "") {
        Message({
          message: "请选择年",
          type: "warning",
          duration: 2 * 1000,
        });
        return;
      }
      queryAnnualFeeRate(this.searchList).then((response) => {
        this.tableData = response;
      });
    },
    columnwidth(value) {
      var width = value.length * 18;
      return width < 150 ? 150 : width;
    },
    downloadModel() {
      //下载模板
      if (this.searchList.N == "") {
        Message({
          message: "请选择年",
          type: "warning",
          duration: 2 * 1000,
        });
        return;
      }
      exportAnnualFeeRateYear(this.searchList).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `本年收费率.xls`;
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
