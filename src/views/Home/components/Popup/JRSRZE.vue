<template>
  <div class="JRSRZE container" ref="JRSRZE">
    <!-- 按钮begin -->
    <el-form label-width="60px" ref="JRSRZEForm">
      <el-row :gutter="30">
        <el-col :span="5" style="width: 250px">
          <el-form-item label="管理处：">
            <el-select v-model="index" @change="GLCchange">
              <el-option
                v-for="(item, index) in plotlist"
                :key="index"
                :label="item.GLCNAME"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 250px">
          <el-form-item label="类别:">
            <el-select v-model="data.category" @change="gettable">
              <el-option label="收款方式" :value="1"></el-option>
              <el-option label="收费项目" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="5"
          style="width: 250px; padding-right: 0; padding-top: 2px"
        >
          <el-button type="success" @click="downloData">导出excel</el-button>
          <el-button type="success" @click="todailyshow">实收日报表</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->
    <div class="table">
      <el-table
        ref="multipleTable"
        :max-height="height"
        :data="tabledata"
        border
      >
        <el-table-column
          :prop="item"
          :label="item"
          :min-width="columnwidth(item)"
          v-for="(item, index) in column"
          :key="index"
        >
          <template slot-scope="scope">
            {{
              formatMoney(
                scope.row[scope.column.property],
                scope.column.property
              )
            }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="chart">
      <div class="title">今日收入总额饼状图</div>
      <div class="myEchart" ref="myEchart"></div>
    </div>

    <DailyDetail :dailyshow.sync="dailyshow" ref="DAILY"></DailyDetail>
  </div>
</template>

<script>
import Chart from "echarts";
import {
  queryTotalDailyIncome,
  isLeader,
  exportExcelOfTotalDailyIncome,
} from "@/api/Home/Home";
import { mapGetters } from "vuex";
import DailyDetail from "./components/DailyDetail"; //弹窗
import { formatMoney } from "@/utils/global.js";
export default {
  name: "JRSRZE",
  data() {
    return {
      title: "今日收费总额",
      index: 0,
      data: {
        category: "",
      },
      chart: "",
      tabledata: [],
      plotlist: [
        {
          GLCID: "",
          GLCNAME: "全部",
          YXDID: "",
          dbName: "",
        },
      ],
      dailyshow: false,
      height: 150,
      column: [],
    };
  },
  components: {
    DailyDetail,
  },
  computed: {
    ...mapGetters(["userPlot"]),
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getPartitionData();
      }, 1000);
    });
  },
  methods: {
    columnwidth(value) {
      var width = value.length * 18;
      return width < 150 ? 150 : width;
    },
    formatMoney(data) {
      if (typeof data == "number" || typeof data == "undefined") {
        if (data) {
          return data >= 0
            ? formatMoney(data, true)
            : `-${formatMoney(0 - data, true)}`;
        } else {
          return 0;
        }
      } else {
        return data;
      }
    },
    GLCchange(index) {
      this.data.plotName = this.plotlist[index].GLCNAME;
      this.data.plotDbName = this.plotlist[index].dbName;
      this.data.GLCID = this.plotlist[index].GLCID;
      this.data.YXDID = this.plotlist[index].YXDID;
      this.gettable();
    },
    getPartitionData() {
      this.height =
        this.$refs.JRSRZE.offsetHeight -
        this.$refs.JRSRZEForm.$el.offsetHeight -
        60;
      this.index = 0;
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var currentdate = year + "-" + month + "-" + strDate;

      this.data = {};
      this.chart = "";
      this.tabledata = [];

      this.plotlist = [
        {
          GLCID: "",
          GLCNAME: "全部",
          YXDID: "",
          dbName: "",
        },
      ];

      this.plotlist = this.plotlist.concat(this.userPlot);
      var parent = this.plotlist;
      var children;
      var index;
      if (sessionStorage.getItem("plotItem") == null) {
        index = 1;
      } else {
        children = JSON.parse(sessionStorage.getItem("plotItem"));
        index = parent.findIndex(
          (d) =>
            d.GLCID === children.GLCID &&
            d.YXDID === children.YXDID &&
            d.dbName === children.dbName
        ); //寻找data的索引
      }
      var _this = this;
      isLeader().then((response) => {
        if (response.isLeader) {
          _this.data = {
            plotName: _this.plotlist[0].GLCNAME,
            plotDbName: _this.plotlist[0].dbName,
            GLCID: _this.plotlist[0].GLCID,
            YXDID: _this.plotlist[0].YXDID,
            DQRQ: currentdate,
            category: 1,
          };
        } else {
          _this.index = index;
          _this.data = {
            plotName: _this.plotlist[index].GLCNAME,
            plotDbName: _this.plotlist[index].dbName,
            GLCID: _this.plotlist[index].GLCID,
            YXDID: _this.plotlist[index].YXDID,
            DQRQ: currentdate,
            category: 1,
          };
        }
        this.gettable();
      });
    },
    gettable() {
      queryTotalDailyIncome(this.data).then((response) => {
        this.column = ["管理处名称"].concat(response.data.title);
        this.tabledata = response.data.data;
        var item = this.tabledata;
        var column = response.data.title;
        this.data.title = JSON.stringify(this.column);
        this.data.datalist = JSON.stringify(this.tabledata);
        var datalist = [];
        let total = new Array(column.length).fill(0);
        for (var i in item) {
          for (var j in column) {
            if (column[j] != `管理处名称`) {
              total[j] += item[i][column[j]] ? item[i][column[j]] : 0;
            }
          }
        }
        for (var k in column) {
          if (column[k] != `管理处名称`) {
            datalist.push({
              value: total[k].toFixed(2),
              name: column[k],
            });
          }
        }

        this.chart = Chart.init(this.$refs.myEchart);
        var option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            left: 2,
            data: column,
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius:
                window.screen.width > 1025 ? ["50%", "70%"] : ["30%", "50%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center",
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold",
                  },
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: datalist,
            },
          ],
        };
        this.chart.setOption(option, true);
      });
    },
    downloData() {
      exportExcelOfTotalDailyIncome(this.data).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `${this.title}.xls`;
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
    todailyshow() {
      this.dailyshow = true;
      this.$refs.DAILY.getPartitionData();
    },
  },
};
</script>
<style scope>
.JRSRZE .el-dialog__body {
  padding: 20px;
  overflow: auto;
  height: 700px;
}

.JRSRZE .table {
  width: 63%;
  float: left;
  margin-right: 2%;
}

.JRSRZE .chart {
  width: 35%;
  height: 380px;
  float: left;
  border: 1px solid rgba(214, 215, 220, 1);
}

.JRSRZE .chart .title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: rgba(214, 215, 220, 1);
  font-size: 14px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.JRSRZE .chart .myEchart {
  width: 100%;
  height: 350px;
  float: left;
}

.JRSRZE .el-dialog-fourfold .el-row {
  margin: 0 !important;
  padding: 0 !important;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
