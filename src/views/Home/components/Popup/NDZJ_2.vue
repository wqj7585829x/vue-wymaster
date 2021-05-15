<template>
  <div class="NDZJ_2 container" ref="NDZJ_2">
    <!-- 按钮begin -->
    <el-form label-width="60px" ref="NDZJ_2Form">
      <el-row :gutter="30">
        <el-col :span="5" style="width: 250px">
          <el-form-item label="管理处：">
            <el-select v-model="index" @change="GLCchange">
              <el-option
                v-for="(item, index) in userPlot"
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
      <el-table
        ref="multipleTable"
        :data="tabledata"
        :height="height"
        show-summary
        border
      >
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
        <el-table-column prop="percentageComplete" label="完成率(%)">
        </el-table-column>
      </el-table>
    </div>
    <div class="chart" :style="`height:${maxheight + 50}px`">
      <div class="title">年度指标</div>
      <div
        class="myEchart2"
        ref="myEchart2"
        :style="`height:${maxheight}px`"
      ></div>
      <div class="left_div" :style="`top:${top}px`">
        <div class="titles" :style="`font-size: ${fontsize - 8}px`">
          指标金额（万）
        </div>
        <div
          class="value"
          :style="`font-size: ${fontsize}px;padding-left: ${padding}px;`"
        >
          {{ formatMoney(totalIncome) }}
        </div>
      </div>
      <div class="right_div" :style="`top:${top}px`">
        <div class="titles" :style="`font-size: ${fontsize - 8}px`">
          完成金额（万）
        </div>
        <div
          class="value"
          :style="`font-size: ${fontsize}px;padding-right: ${padding}px;`"
        >
          {{ formatMoney(target) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "echarts";
import {
  queryIndexAchievingStatusStaff,
  annualTargetExcel,
} from "@/api/Home/Home";
import { mapGetters } from "vuex";
import { formatMoney } from "@/utils/global.js";
export default {
  name: "NDZJ_2",
  data() {
    return {
      title: "年度指标",
      index: 0,
      data: {},
      chart: "",
      tabledata: [],
      totalIncome: 0,
      target: 0,
      height: 150,
      maxheight: 0,
      top: 180,
      fontsize: 24,
      padding: 16,
    };
  },
  computed: {
    ...mapGetters(["userPlot"]),
  },
  created() {
    this.maxheight = window.screen.width > 1025 ? 250 : 130;
    this.top = window.screen.width > 1025 ? 180 : 90;
    this.fontsize = window.screen.width > 1025 ? 24 : 20;
    this.padding = window.screen.width > 1025 ? 16 : 36;
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
      this.data.plotDbName = this.userPlot[index].dbName;
      this.data.GLCID = this.userPlot[index].GLCID;
      this.data.YXDID = this.userPlot[index].YXDID;
      this.gettable();
    },
    getPartitionData() {
      this.height =
        this.$refs.NDZJ_2.offsetHeight -
        this.$refs.NDZJ_2Form.$el.offsetHeight -
        (window.screen.width > 1025 ? 400 : 250);
      this.data = {
        plotDbName: this.userPlot[0].dbName,
        GLCID: this.userPlot[0].GLCID,
        YXDID: this.userPlot[0].YXDID,
      };
      this.gettable();
    },
    gettable() {
      var _this = this;
      queryIndexAchievingStatusStaff(this.data).then((response) => {
        this.tabledata = response.data;
        var item = this.tabledata;
        this.data.list = JSON.stringify(item);

        var totalIncome = 0;
        var target = 0;
        for (var i in item) {
          totalIncome += item[i].indexMoney;
          target += item[i].accomplishMoney;
        }
        this.totalIncome = parseFloat(totalIncome).toFixed(2);
        this.target = parseFloat(target).toFixed(2);

        var target =
          totalIncome === 0
            ? 0
            : parseFloat(
                ((parseFloat(target) / parseFloat(totalIncome)) * 100).toFixed(
                  2
                )
              );
        this.$nextTick(() => {
          _this.chart = Chart.init(this.$refs.myEchart2);
          window.addEventListener("resize", function () {
            _this.chart.resize();
          });
          var option = {
            title: {
              text: "完成率(%)",
              x: "center",
              y: "10px",
              textStyle: {
                fontSize: window.screen.width > 1025 ? 26 : 13,
                fontWeight: "normal",
                color: ["#1B95FA"],
              },
            },
            backgroundColor: "#fff",
            series: [
              {
                type: "gauge",
                center: ["50%", "90%"],
                radius: window.screen.width > 1025 ? "100%" : "50%",
                min: 0,
                max: 1000,
                splitNumber: 6, //刻度数量
                startAngle: 180,
                endAngle: 0,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 1,
                    color: [[1, "rgba(256,256,256,1)"]],
                  },
                }, //仪表盘轴线
                axisLabel: {
                  show: false,
                  color: "#fff",
                  distance: 30,
                }, //刻度标签。
                axisTick: {
                  show: true,
                  splitNumber: 10,
                  lineStyle: {
                    color: "#1B95FA",
                    width: 2,
                  },
                  length: -18,
                }, //刻度样式
                splitLine: {
                  show: true,
                  length: -30,
                  lineStyle: {
                    color: "#1B95FA",
                  },
                }, //分隔线样式
                detail: {
                  show: false,
                },
                pointer: {
                  show: false,
                },
              },
              {
                type: "gauge",
                radius: "90%",
                center: ["50%", "90%"],
                splitNumber: 0, //刻度数量
                startAngle: 180,
                endAngle: 0,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 5,
                    color: [[1, "#1B95FA"]],
                  },
                },
                //分隔线样式。
                splitLine: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                pointer: {
                  show: false,
                },
                title: {
                  show: false,
                  offsetCenter: [0, "10"], // x, y，单位px
                  textStyle: {
                    color: "#000",
                    fontSize: 20,
                  },
                },
                //仪表盘详情，用于显示数据。
                detail: {
                  show: false,
                  offsetCenter: [0, "16%"],
                  color: "#000",
                  formatter: function (params) {
                    return params;
                  },
                  textStyle: {
                    fontSize: 44,
                  },
                },
              },
              {
                type: "gauge",
                radius: "80%",
                center: ["50%", "90%"],
                splitNumber: 0, //刻度数量
                startAngle: 180,
                endAngle: 0,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 15,
                    color: [
                      [
                        target / 100,
                        new Chart.graphic.LinearGradient(0, 0, 1, 0, [
                          {
                            offset: 0,
                            color: "#1B95FA",
                          },
                          {
                            offset: 1,
                            color: "#6DC3FD",
                          },
                        ]),
                      ],
                      [1, "rgba(65,62,84,0)"],
                    ],
                  },
                },
                //分隔线样式。
                splitLine: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                pointer: {
                  show: false,
                },
                title: {
                  show: true,
                  offsetCenter: [0, "32%"], // x, y，单位px
                  textStyle: {
                    color: "#FA8232",
                    fontSize: 20,
                  },
                },
                //仪表盘详情，用于显示数据。
                detail: {
                  show: true,
                  offsetCenter: [0, "-5px"],
                  color: "#1B95FA",
                  formatter: function (params) {
                    return params;
                  },
                  textStyle: {
                    fontSize: 24,
                    color: "#1B95FA",
                  },
                },
                data: [
                  {
                    value: target,
                    label: {
                      normal: {
                        formatter: "{d}%",
                        position: "center",
                        show: true,
                        textStyle: {
                          fontSize: "35",
                          fontWeight: "normal",
                          color: "#fff",
                        },
                      },
                    },
                    itemStyle: {
                      normal: {
                        color: "#f74369",
                        shadowColor: "#f74369",
                        shadowBlur: 10,
                      },
                    },
                  },
                ],
              },
            ],
          };
          this.chart.setOption(option);
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
<style lang="scss">
.NDZJ_2 {
  .left_div {
    width: 150px;
    height: 100px;
    position: absolute;
    top: 180px;
    left: 20%;
    z-index: 3;
    .titles {
      font-size: 16px;
      font-weight: 400;
      color: rgba(77, 77, 77, 1);
      text-align: center;
      padding-top: 20px;
    }
    .value {
      font-size: 24px;
      font-weight: 500;
      color: #1b95fa;
      text-align: left;
      padding-left: 16px;
      padding-top: 5px;
    }
  }
  .right_div {
    width: 150px;
    height: 100px;
    position: absolute;
    top: 180px;
    right: 20%;
    z-index: 2;
    .titles {
      font-size: 16px;
      font-weight: 400;
      color: rgba(77, 77, 77, 1);
      text-align: center;
      padding-top: 20px;
      position: relative;
      left: 7px;
    }
    .value {
      font-size: 24px;
      font-weight: 500;
      color: #1b95fa;
      text-align: right;
      padding-right: 16px;
      padding-top: 5px;
    }
  }
}

.NDZJ_2 .el-dialog__body {
  padding: 20px;
  overflow: auto;
  height: 700px;
}

.NDZJ_2 .table {
  margin-top: 20px;
}

.NDZJ_2 .chart {
  border: 1px solid rgba(214, 215, 220, 1);
  margin-top: 20px;
  position: relative;
}

.NDZJ_2 .chart .title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: rgba(214, 215, 220, 1);
  font-size: 14px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.NDZJ_2 .chart .myEchart2 {
  width: 100%;
  float: left;
}

.NDZJ_2 .el-dialog-fourfold .el-row {
  margin: 0 !important;
  padding: 0 !important;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
