<template>
  <div class="NYYE container" ref="NYYE">
    <!-- 按钮begin -->
    <el-form label-width="60px" ref="NYYEForm">
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
    <div class="myEchart" ref="myEchart1" :style="`height:${height}px`"></div>
    <div class="myEchart" ref="myEchart2" :style="`height:${height}px`"></div>
  </div>
</template>

<script>
import Chart from "echarts";
import {
  queryChargeByMethod,
  queryChargeByProject,
  isLeader,
  annualSalesVolumeExcel,
} from "@/api/Home/Home";
import { mapGetters } from "vuex";
export default {
  name: "NYYE",
  data() {
    return {
      title: "年营业额",
      index: 0,
      data: {},
      chart1: "",
      chart2: "",
      plotlist: [
        {
          sess_plotId: "",
          GLCNAME: "全部",
          sess_yxdId: "",
          sess_plotDbName: "",
        },
      ],
      height: 0,
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
    GLCchange(index) {
      this.data = {
        sess_plotDbName: this.plotlist[index].dbName,
        sess_plotId: this.plotlist[index].GLCID,
        sess_yxdId: this.plotlist[index].YXDID,
      };
      this.gettable1();
      this.gettable2();
    },
    getPartitionData() {
      this.height =
        this.$refs.NYYE.offsetHeight -
        this.$refs.NYYEForm.$el.offsetHeight -
        75;
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
          this.data = {
            sess_plotDbName: this.plotlist[0].dbName,
            sess_plotId: this.plotlist[0].GLCID,
            sess_yxdId: this.plotlist[0].YXDID,
          };
        } else {
          _this.index = index;
          this.data = {
            sess_plotDbName: this.plotlist[index].dbName,
            sess_plotId: this.plotlist[index].GLCID,
            sess_yxdId: this.plotlist[index].YXDID,
          };
        }
        this.gettable1();
        this.gettable2();
        var myDate = new Date();
        var tYear = myDate.getFullYear();
        this.title = `${tYear}年营业额`;
      });
    },
    gettable1() {
      this.chart1 = "";
      var _this = this;
      queryChargeByMethod(this.data).then((response) => {
        var item = response.data;
        this.data.method = JSON.stringify(item);
        var title = [];
        var datalist = [];
        for (var i in item) {
          title.push(i);
          datalist.push({
            name: i,
            data: item[i],
            type: "line",
          });
        }

        this.$nextTick(() => {
          _this.chart1 = Chart.init(this.$refs.myEchart1);
          window.addEventListener("resize", function () {
            _this.chart1.resize();
          });
          var option = {
            title: {
              text: "年营业额--收款方式（元）",
              x: "left",
              y: 0,
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985",
                },
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
              ],
            },
            yAxis: {
              type: "value",
            },
            legend: {
              data: title,
              textStyle: {
                //图例文字的样式
                fontSize: 16,
              },
              top: "7%",
            },
            grid: {
              left: "4%",
              right: "4%",
              top: "25%",
              bottom: "5%",
              containLabel: true,
            },
            series: datalist,
          };
          this.chart1.setOption(option, true);
        });
      });
    },
    gettable2() {
      this.chart2 = "";
      var _this = this;
      queryChargeByProject(this.data).then((response) => {
        var item = response.data;
        this.data.project = JSON.stringify(item);
        var title = [];
        var datalist = [];
        for (var i in item) {
          title.push(i);
          datalist.push({
            name: i,
            data: item[i],
            type: "line",
          });
        }

        this.$nextTick(() => {
          _this.chart2 = Chart.init(this.$refs.myEchart2);
          window.addEventListener("resize", function () {
            _this.chart2.resize();
          });
          var option = {
            title: {
              text: "年营业额--费用项目（元）",
              x: "left",
              y: 0,
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985",
                },
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
              ],
            },
            yAxis: {
              type: "value",
            },
            legend: {
              data: title,
              textStyle: {
                //图例文字的样式
                fontSize: 16,
              },
              top: "7%",
            },
            grid: {
              left: "4%",
              right: "4%",
              top: title.length < 11 ? "30%" : "38%",
              bottom: "5%",
              containLabel: true,
            },
            series: datalist,
          };
          this.chart2.setOption(option, true);
        });
      });
    },
    downloData() {
      annualSalesVolumeExcel(this.data).then((response) => {
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
.NYYE .el-dialog__body {
  padding: 30px 20px;
}

.NYYE .myEchart {
  width: 50%;
  float: left;
}

.NYYE .myEchart {
  margin-top: 15px;
}

.NYYE .el-dialog-double .el-row {
  margin: 0 !important;
  padding: 0 !important;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
