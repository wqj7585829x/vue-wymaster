<template>
  <div class="nyte_360">
    <div class="myEchart" ref="myEchart"></div>
    <div class="more" @click="tonyyeshow" v-if="moreshow">
      查看更多
      <img class="arrow_white" :src="require(`@/assets/homeImgs/youjiantou_blue.png`)">
    </div>
  </div>
</template>
<script>
import * as Chart from "echarts";
import { queryCharge } from "@/api/Home/Home";
export default {
  data() {
    return {
      value: 0,
      chart: "",
      moreshow: false,
    };
  },
  methods: {
    tonyyeshow() {
      this.$router.push({ path: "HomePage/NYYE" });
    },
  },
  mounted() {
    queryCharge().then((response) => {
      var item = response.data;
      var year1 = item[0];
      var year2 = item[1];
      var y1, y2;
      var value1, value2;
      for (var i in year1) {
        y1 = i;
        value1 = year1[i];
      }
      for (var j in year2) {
        y2 = j;
        value2 = year2[j];
      }

      this.chart = Chart.init(this.$refs.myEchart);

      window.addEventListener("resize",  ()=>{
        this.chart.resize();
      });

      var option = {
        title: {
          text: "年营业额（万元）",
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
          data: [`${y1}年`, `${y2}年`],
          textStyle: {
            //图例文字的样式
            fontSize: 16,
          },
          right: "4%",
        },
        color: ["#FE798D", "#667BE6"],
        series: [
          {
            name: `${y1}年`,
            data: value1,
            type: "line",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3,
                  type: "dotted", //'dotted'虚线 'solid'实线
                  color: "#FE798D",
                },
              },
            },
            areaStyle: {
              normal: {
                color: {
                  type: "linear", //设置线性渐变
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#FE798D", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFF9FA", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
          },
          {
            name: `${y2}年`,
            data: value2,
            type: "line",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3,
                  type: "solid", //'dotted'虚线 'solid'实线
                  color: "#667BE6",
                },
              },
            },
            areaStyle: {
              normal: {
                color: {
                  type: "linear", //设置线性渐变
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#667BE6", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFF9FA", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
          },
        ],
      };
      this.chart.setOption(option);
      this.moreshow = true;
    });
  },
  destroyed() {
    //销毁echar，防止占用资源容易内存泄漏
    this.chart = null;
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 1366px) {
  .nyte_360 {
    width: 100%;
    height: 360px;
    border-radius: 8px;
    background: rgba(256, 256, 256, 1);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05);
    padding: 10px;
    position: relative;
    .myEchart {
      height: 100%;
      position: relative;
      // z-index: 1;
    }
    .more {
      color: #667ce6;
      z-index: 2;
      position: absolute;
      top: 18px;
      left: 165px;
      font-size: 14px;
      img {
        height: 14px;
        width: 14px;
        position: relative;
        top: 2px;
      }
    }
    .more:hover {
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 1366px) {
  .nyte_360 {
    width: 100%;
    height: 270px;
    border-radius: 6px;
    background: rgba(256, 256, 256, 1);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
    padding: 7.5px;
    position: relative;
    .myEchart {
      height: 100%;
      position: relative;
      // z-index: 1;
    }
    .more {
      color: #389bf9;
      z-index: 2;
      position: absolute;
      top: 17px;
      left: 160px;
      font-size: 9.5px;
      img {
        height: 9.5px;
        width: 9.5px;
        position: relative;
        top: 1.5px;
      }
    }
    .more:hover {
      cursor: pointer;
    }
  }
}
</style>
