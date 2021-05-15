<template>
  <div class="NDZJ_1 container" ref="NDZJ_1">
    <!-- 按钮begin -->
    <el-form label-width="60px" ref="NDZJ_1Form">
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
        <el-col :span="5" style="padding-right: 0; padding-top: 2px">
          <el-button type="success" @click="downloData">导出excel</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->
    <div class="table">
      <el-table ref="multipleTable" :data="tabledata" border :height="height">
        <el-table-column prop="GLCNAME" label="管理处名称"> </el-table-column>
        <el-table-column prop="indexMoney" label="指标金额(万)">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.indexMoney) }}
          </template>
        </el-table-column>
        <el-table-column prop="accomplishMoney" label="完成金额(万)">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.accomplishMoney) }}
          </template>
        </el-table-column>
        <el-table-column prop="residueMoney" label="剩余金额(万)">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.residueMoney) }}
          </template>
        </el-table-column>
        <el-table-column prop="percentageComplete" label="完成率">
        </el-table-column>
      </el-table>
    </div>
    <div class="chart">
      <div class="title">年度指标</div>
      <div class="myEchart1" ref="myEchart1"></div>
    </div>
  </div>
</template>

<script>
import Chart from "echarts";
import {
  queryIndexAchievingStatusLead,
  annualTargetExcel,
} from "@/api/Home/Home";
import { mapGetters } from "vuex";
import { formatMoney } from "@/utils/global.js";
export default {
  name: "NDZJ_1",
  data() {
    return {
      title: "年度指标",
      index: 0,
      data: {},
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
      height: 150,
    };
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
    formatMoney(data) {
      return data >= 0
        ? formatMoney(data, true)
        : `-${formatMoney(0 - data, true)}`;
    },
    GLCchange(index) {
      this.data.plotDbName = this.plotlist[index].dbName;
      this.data.GLCID = this.plotlist[index].GLCID;
      this.data.YXDID = this.plotlist[index].YXDID;
      this.gettable();
    },
    getPartitionData() {
      this.height =
        this.$refs.NDZJ_1.offsetHeight -
        this.$refs.NDZJ_1Form.$el.offsetHeight -
        60;
      this.index = 0;
      this.plotlist = [
        {
          GLCID: "",
          GLCNAME: "全部",
          YXDID: "",
          dbName: "",
        },
      ];
      this.plotlist = this.plotlist.concat(this.userPlot);
      this.data = {
        plotDbName: this.plotlist[0].dbName,
        GLCID: this.plotlist[0].GLCID,
        YXDID: this.plotlist[0].YXDID,
      };
      this.gettable();
    },
    gettable() {
      var _this = this;
      queryIndexAchievingStatusLead(this.data).then((response) => {
        this.tabledata = response.data;
        var item = this.tabledata;
        this.data.list = JSON.stringify(item);

        var accomplishMoney = 0;
        var target = 0;
        for (var i in item) {
          accomplishMoney += item[i].accomplishMoney;
          target += item[i].residueMoney;
        }

        this.$nextTick(() => {
          _this.chart = Chart.init(this.$refs.myEchart1);
          window.addEventListener("resize", function () {
            _this.chart.resize();
          });
          var option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            legend: {
              orient: "vertical",
              left: 2,
              data: ["未完成", "指标完成"],
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                radius: ["50%", "70%"],
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
                data: [
                  { value: target, name: "未完成" },
                  { value: accomplishMoney, name: "指标完成" },
                ],
              },
            ],
          };
          _this.chart.setOption(option);
        });
      });
    },
    downloData() {
      annualTargetExcel(this.data).then((response) => {
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
  },
};
</script>
<style>
.NDZJ_1 .el-dialog__body {
  padding: 20px;
  overflow: auto;
  height: 700px;
}

.NDZJ_1 .table {
  width: 63%;
  float: left;
  margin-right: 2%;
}

.NDZJ_1 .chart {
  width: 35%;
  height: 380px;
  float: left;
  border: 1px solid rgba(214, 215, 220, 1);
}

.NDZJ_1 .chart .title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: rgba(214, 215, 220, 1);
  font-size: 14px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.NDZJ_1 .chart .myEchart1 {
  width: 100%;
  height: 350px;
  float: left;
}

.NDZJ_1 .el-dialog-fourfold .el-row {
  margin: 0 !important;
  padding: 0 !important;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
