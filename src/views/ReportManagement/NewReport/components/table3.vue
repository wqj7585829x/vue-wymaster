<template>
  <div class="NewReport">
    <!-- 搜索框begin -->
    <div class="select" ref="select">
      <el-form label-width="85px">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="统计方式:">
              <el-select v-model="searchList.type" @change="changetime">
                <el-option label="年月" :value="1"></el-option>
                <el-option label="年度" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item
              :label="searchList.type === 1 ? '开始年月：' : '开始年份：'"
              :rules="[{ required: true }]"
            >
              <el-date-picker
                :type="searchList.type === 1 ? 'month' : 'year'"
                :placeholder="
                  searchList.type === 1 ? '选择开始月份' : '选择开始年'
                "
                :format="searchList.type === 1 ? 'yyyy-MM' : 'yyyy'"
                :value-format="searchList.type === 1 ? 'yyyy-MM' : 'yyyy'"
                v-model="searchList.KSNY"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item
              :label="searchList.type === 1 ? '截止年月：' : '截止年份：'"
              :rules="[{ required: true }]"
            >
              <el-date-picker
                :type="searchList.type === 1 ? 'month' : 'year'"
                :placeholder="
                  searchList.type === 1 ? '选择结束月份' : '选择结束年'
                "
                :format="searchList.type === 1 ? 'yyyy-MM' : 'yyyy'"
                :value-format="searchList.type === 1 ? 'yyyy-MM' : 'yyyy'"
                v-model="searchList.JZNY"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="收费项目：">
              <el-select
                v-model="searchList.SFXM_ZJ"
                multiple
                collapse-tags
                clearable
              >
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.SFXM_SFXMMC"
                  :value="item.SFXM_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="楼栋：">
              <el-select
                v-model="searchList.index"
                multiple
                collapse-tags
                reserve-keyword
                filterable
                clearable
                @change="buildingchange"
              >
                <el-option
                  v-for="(unit, i) in options1"
                  :key="i"
                  :label="unit.DLDA_DLMC"
                  :value="i"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="房间：">
              <el-select
                v-model="searchList.FJDA_ZJ"
                multiple
                collapse-tags
                reserve-keyword
                filterable
                clearable
              >
                <el-option
                  v-for="(unit, i) in options2"
                  :key="i"
                  :label="unit.FJDA_FJMC"
                  :value="unit.FJDA_ZJ"
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
    <div style="margin-bottom: 5px">
      <span
        v-for="(item, index) in total"
        style="margin-right: 20px"
        :key="index"
        >{{ item.FYSQ_SFXMMC }}:{{ item.FYSQ_YSJE }}</span
      >
    </div>
    <!-- 报表标题 -->
    <div class="ReportTitleDIV"><strong>实际应收明细报表</strong></div>
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
          :prop="item.columnName"
          :label="getlable(item.columnName)"
          :width="columnwidth(item.columnName)"
          v-for="(item, index) in column"
          :key="index"
        >
          <template slot-scope="scope">
            <span
              v-if="judgecolumn(item.columnName)"
              @click="popupShow(scope.row, scope.column.property)"
              class="pointer"
              >{{ scope.row[scope.column.property] }}</span
            >
            <span v-else>{{ scope.row[scope.column.property] }}</span>
          </template>
        </u-table-column>
      </u-table>
    </div>
    <!--  表 end -->
    <table3Popup :show.sync="show" ref="table3Popup"></table3Popup>
  </div>
</template>

<script>
import {
  queryAllPayItems,
  queryAllReceivableDetailsReportApi,
  exportApi,
  queryBuildingMessage,
  queryRoomMessage,
} from "@/api/ReportManagement/QueryReport";
import { UTable, UTableColumn } from "umy-ui";
import { Message } from "element-ui";
import table3Popup from "./table3Popup";
export default {
  data() {
    return {
      tableData: [], //列表参数
      searchList: {
        KSNY: "",
        JZNY: "",
      },
      choosetime: [],
      options: [],
      type: true,
      column: [],
      total: [],
      allcheck: "",
      options1: [],
      options2: [],
      roomlist: [],
      tableheight: 0,
      show: false,
    };
  },
  components: {
    UTable,
    UTableColumn,
    table3Popup,
  },
  mounted() {
    this.$nextTick(() => {
      this.tableheight =
        document.querySelectorAll(".el-body")[0].offsetHeight -
        50 -
        this.$refs.select.offsetHeight;
    });
    this.getbuilding();
    this.getroom();
  },
  methods: {
    popupShow(data, name) {
      this.$refs.table3Popup.getPartitionData({
        FJDA_FJID: data.FJDA_FJID,
        FYSQ_SSNY: name,
        FYSQ_SFXMMC: data.FYSQ_SFXMMC,
        year: this.searchList.type == 2 ? 1 : "",
      });
      this.show = true;
    },
    judgecolumn(name) {
      var value = name.replace("-");
      return !isNaN(parseInt(value));
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
        if (
          !values.every((value) => isNaN(value)) &&
          this.column[index].canSum
        ) {
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
    buildingchange(index) {
      this.$forceUpdate();
      if (index.length > 0) {
        var DLDA_ZJ = [];
        for (var i in index) {
          DLDA_ZJ.push(this.options1[index[i]].DLDA_ZJ);
        }
        this.searchList.DLDA_ZJ = DLDA_ZJ.join(",");
        var data = this.roomlist;
        this.options2 = [];
        for (var i in data) {
          if (DLDA_ZJ.indexOf(data[i].FJDA_DLWJ) > -1) {
            this.options2.push(data[i]);
          }
        }
        this.searchList.FJDA_ZJ = [];
      } else {
        this.options2 = [];
        this.searchList.FJDA_ZJ = [];
      }
    },
    getbuilding() {
      //获取楼栋列表
      queryBuildingMessage().then((response) => {
        this.options1 = response;
      });
    },
    getroom() {
      //获取房间列表
      queryRoomMessage().then((response) => {
        this.roomlist = response;
      });
    },
    changetime() {
      this.$forceUpdate();
      this.searchList.KSNY = "";
      this.searchList.JZNY = "";
    },
    setData() {
      this.searchList = {
        KSNY: "",
        JZNY: "",
        type: 1,
        DLDA_ZJ: "",
        FJDA_ZJ: [],
        SFXM_ZJ: [],
      };
      this.getRelatedFees();
    },
    getTableData() {
      if (this.searchList.KSNY == "") {
        Message({
          message: "请选择开始日期",
          type: "warning",
          duration: 2 * 1000,
        });
        return;
      }
      if (this.searchList.JZNY == "") {
        Message({
          message: "请选择结束日期",
          type: "warning",
          duration: 2 * 1000,
        });
        return;
      }
      var data = {
        type: this.searchList.type,
        KSNY: this.searchList.KSNY,
        JZNY: this.searchList.JZNY,
        SFXM_ZJ: this.searchList.SFXM_ZJ.join(","),
        DLDA_ZJ: this.searchList.DLDA_ZJ,
        FJDA_ZJ: this.searchList.FJDA_ZJ.join(","),
      };
      queryAllReceivableDetailsReportApi(data).then((response) => {
        this.column = response.column;
        this.tableData = response.list;
        this.total = response.total;
      });
    },
    getRelatedFees() {
      queryAllPayItems().then((response) => {
        this.options = response;
      });
    },
    columnwidth(value) {
      var width = value.length * 18;
      return width < 150 ? 150 : width;
    },
    getlable(key) {
      switch (key) {
        case "DLDA_DLMC":
          return "大楼名称";
          break;
        case "FJDA_FJMC":
          return "资源名称";
          break;
        case "FJDA_FJID":
          return "资源代码";
          break;
        case "FJDA_DZ":
          return "资源地址";
          break;
        case "KHDA_YZID":
          return "业主代码";
          break;
        case "KHDA_YZMC":
          return "业主名称";
          break;
        case "KHDA_ZHID":
          return "租户代码";
          break;
        case "KHDA_ZHMC":
          return "租户名称";
          break;
        case "FYSQ_SFXMMC":
          return "收费项目";
          break;
        case "FYSQ_HJ":
          return "合计";
          break;
        case "FJDA_SFMJ":
          return "收费面积";
          break;
        default:
          return key;
          break;
      }
    },
    downloadModel() {
      if (this.searchList.KSNY == "") {
        Message({
          message: "请选择开始日期",
          type: "warning",
          duration: 2 * 1000,
        });
        return;
      }
      if (this.searchList.JZNY == "") {
        Message({
          message: "请选择结束日期",
          type: "warning",
          duration: 2 * 1000,
        });
        return;
      }
      //下载模板
      var data = {
        type: this.searchList.type,
        KSNY: this.searchList.KSNY,
        JZNY: this.searchList.JZNY,
        SFXM_ZJ: this.searchList.SFXM_ZJ.join(","),
        DLDA_ZJ: this.searchList.DLDA_ZJ,
        FJDA_ZJ: this.searchList.FJDA_ZJ.join(","),
        reportType: 3,
      };
      exportApi(data).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `实际应收明细报表.xls`;
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

  .pointer:hover {
    cursor: pointer;
    text-decoration: underline;
    color: rgb(40, 40, 253);
  }
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
