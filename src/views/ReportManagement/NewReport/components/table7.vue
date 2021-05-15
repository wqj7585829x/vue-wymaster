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
    <!-- 报表标题 -->
    <div class="ReportTitleDIV"><strong>实收款明细报表（收入类）</strong></div>
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
          :prop="index"
          :label="index"
          :min-width="columnwidth(index)"
          v-for="(item, index) in column"
          :key="index"
        >
          <u-table-column
            :prop="unit"
            :label="unit"
            :min-width="columnwidth(index)"
            v-for="(unit, i) in item"
            :key="i"
            v-if="typeof item == 'object'"
          >
          </u-table-column>
        </u-table-column>
      </u-table>
    </div>
    <!--  表 end -->
  </div>
</template>

<script>
import {
  queryAllPayItems,
  queryActualAccountIncome,
  exportActualAccountIncome,
  queryBuildingMessage,
  queryRoomMessage,
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
      options: [],
      type: true,
      column: [],
      allcheck: "",
      options1: [],
      options2: [],
      roomlist: [],
      tableheight: 0,
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
        30 -
        this.$refs.select.offsetHeight;
    });
    this.getbuilding();
    this.getroom();
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
      this.searchList.startDate = "";
      this.searchList.endDate = "";
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
      this.getRelatedFees();
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
        type: this.searchList.type,
        startDate: this.searchList.startDate,
        endDate: this.searchList.endDate,
        SFXM_ZJ: this.searchList.SFXM_ZJ.join(","),
        DLDA_ZJ: this.searchList.DLDA_ZJ,
        FJDA_ZJ: this.searchList.FJDA_ZJ.join(","),
      };
      queryActualAccountIncome(data).then((response) => {
        this.column = response.data.column;
        this.tableData = response.data.list;
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
        type: this.searchList.type,
        startDate: this.searchList.startDate,
        endDate: this.searchList.endDate,
        SFXM_ZJ: this.searchList.SFXM_ZJ.join(","),
        DLDA_ZJ: this.searchList.DLDA_ZJ,
        FJDA_ZJ: this.searchList.FJDA_ZJ.join(","),
      };
      exportActualAccountIncome(data).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `实收款明细报表（收入类）.xls`;
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
