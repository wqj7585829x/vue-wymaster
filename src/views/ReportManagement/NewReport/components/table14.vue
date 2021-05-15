<template>
  <div class="NewReport">
    <!-- 搜索框begin -->
    <div class="select" ref="select">
      <el-form label-width="100px">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="开票开始日期:">
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
            <el-form-item label="开票结束日期:">
              <el-date-picker
                type="date"
                placeholder=""
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="searchList.SKJS"
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
    <!-- 报表标题 -->
    <div class="ReportTitleDIV"><strong>票据汇总</strong></div>
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
          :label="getlable(item)"
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
  queryNoteSumReport,
  exportNoteSumReport,
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
  },
  methods: {
    setData() {
      this.searchList = {
        SKKS: "",
        SKJS: "",
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
        if (column.label == "票据号") {
          sums[index] = "";
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
      queryNoteSumReport(this.searchList).then((response) => {
        this.tableData = response.list;
        this.column = response.positionMap[0];
      });
    },
    columnwidth(value) {
      var width = value.length * 18;
      return width < 150 ? 150 : width;
    },
    getlable(key) {
      switch (key) {
        case "DlDA_DLMC":
          return "大楼名称";
          break;
        case "PJLYMX_SKR":
          return "收款人";
          break;
        case "FJDA_FJID":
          return "房间代码";
          break;
        case "KHDA_KHMC":
          return "客户名称";
          break;
        case "PJLYMX_PJH":
          return "票据号";
          break;
        case "PJMX_LX_NAME":
          return "票据类型名称";
          break;
        case "PJLYMX_JE":
          return "金额";
          break;
        case "PJLYMX_SKRQ":
          return "开票日期";
          break;
        case "SKPZ_TZRQ":
          return "收款日期";
          break;
        case "PJMX_LX":
          return "票据类型";
          break;
        case "PJMX_SKFS":
          return "收款方式";
          break;
        case "PJMX_SFXMMC":
          return "收费项目名称";
          break;
        default:
          return key;
          break;
      }
    },
    downloadModel() {
      //下载模板
      exportNoteSumReport(this.searchList).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `票据汇总.xls`;
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
