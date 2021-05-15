<template>
  <div class="ndzj_360">
    <div class="body">
      <div class="titlename">{{ year }}年度指标</div>
      <div class="myEchart" ref="myEchart"></div>
      <div class="click" @click="tondzjshow"></div>
      <div class="left_div">
        <div class="value">
          <img :src="require(`@/assets/homeImgs/left_bg.png`)" alt="" />{{
            formatMoney(target)
          }}
        </div>
        <div class="title">指标金额(万)</div>
      </div>
      <div class="right_div">
        <div class="value">
          <img :src="require(`@/assets/homeImgs/right_bg.png`)" alt="" />{{
            formatMoney(totalIncome)
          }}
        </div>
        <div class="title">完成金额(万)</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Chart from "echarts";
import { getTarget, isLeader } from "@/api/Home/Home";
import { formatMoney } from "@/utils/global.js";
export default {
  data() {
    return {
      value: 0,
      chart: "",
      year: "",
      totalIncome: "",
      target: "",
      isLeader: true,
    };
  },
  mounted() {
    var _this = this;
    isLeader().then((response) => {
      this.isLeader = response.isLeader;
    });
    getTarget().then((response) => {
      this.year = response.year;
      this.target =
        response.target === 0 ? 0 : parseFloat(response.target) / 10000.0; //指标金额
      this.totalIncome = parseFloat(response.totalIncome) / 10000.0; //完成金额

      var handred = this.target;

      var targetPerce =
        response.target === 0
          ? 0
          : (
              (parseFloat(response.totalIncome) / parseFloat(response.target)) *
              100
            ).toFixed(2); //比例

      _this.chart = Chart.init(this.$refs.myEchart);
      window.onresize = () => {
        // 基于准备好的dom，初始化echarts实例
        _this.chart.resize();
      };

      // var data = 308; //数值大小
      // var max = 500; //满刻度大小

      // let point = 66

      var option = {
        title: [
          {
            text: targetPerce,
            x: "center",
            top: "40%",
            textStyle: {
              color: "#1A1A1A",
              fontSize: window.screen.width > 1366 ? 37 : 27,
              fontWeight: "700",
            },
          },
          {
            text: "完成率(%)",
            x: "center",
            top: "55%",
            textStyle: {
              fontSize: "15",
              color: "#1A1A1A",
              fontFamily: "Lato",
              foontWeight: "100",
            },
          },
        ],
        series: [
          {
            type: "pie",
            radius: ["0", "55%"],
            center: ["50%", "50%"],
            z: 0,
            itemStyle: {
              normal: {
                color: new Chart.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#e4e6fb",
                  },
                  {
                    offset: 0.5,
                    color: "#e4e6fb",
                  },
                  {
                    offset: 1,
                    color: "#e4e6fb",
                  },
                ]),
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            label: {
              normal: {
                position: "center",
              },
            },
            data: [100],
          },
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            roundCap: true,
            radius: ["68%", "74%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: this.totalIncome / this.target, //完成数/目标数
                name: "占比",
                itemStyle: {
                  normal: {
                    color: {
                      // 颜色渐变
                      colorStops: [
                        {
                          offset: 0,
                          color: "#667BE6", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#7EBAFF", // 100% 处的颜色1
                        },
                      ],
                    },
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "剩余数",
                value:
                  1 - this.totalIncome / this.target <= 0
                    ? 0
                    : 1 - this.totalIncome / this.target, //1-(完成数/目标数) <=0?0:1-(完成数/目标数)
                itemStyle: {
                  normal: {
                    color: "#E8EBFB",
                  },
                },
              },
            ],
          },
        ],
      };
      _this.chart.setOption(option);
    });
  },
  methods: {
    formatMoney(data) {
      return data >= 0
        ? formatMoney(data, true)
        : `-${formatMoney(0 - data, true)}`;
    },
    tondzjshow() {
      if (this.isLeader) {
        this.$router.push({ path: "HomePage/NDZJ_1" });
      } else {
        this.$router.push({ path: "HomePage/NDZJ_2" });
      }
    },
  },
  destroyed() {
    //销毁echar，防止占用资源容易内存泄漏
    this.chart = null;
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 1366px) {
  .ndzj_360 {
    width: 100%;
    height: 360px;
    padding-top: 150px;
    border-radius: 8px;
    background: rgba(256, 256, 256, 1);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    .body {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      overflow: hidden;
      .click {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
      }
      .click:hover {
        cursor: pointer;
      }
      .titlename {
        font-size: 19px;
        font-weight: bold;
        color: #333333;
        position: absolute;
        top: 11px;
        left: 13px;
      }
      .myEchart {
        height: 100%;
        position: relative;
        z-index: 1;
        top: 0;
      }
      .left_bg {
        width: 150px;
        height: 100px;
        position: absolute;
        top: 100px;
        left: 10%;
        z-index: 2;
      }
      .right_bg {
        width: 150px;
        height: 100px;
        position: absolute;
        top: 100px;
        right: 10%;
        z-index: 2;
      }
      .left_div {
        width: 150px;
        height: 100px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        .value {
          font-size: 24px;
          font-family: DIN;
          font-weight: 500;
          line-height: 29px;
          color: #f98591;
          text-align: left;
          position: relative;
          left: 60px;
          img {
            height: 20px;
            width: 20px;
            margin-right: 5px;
          }
        }
        .title {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 300;
          line-height: 21px;
          color: #1a1a1a;
          text-align: right;
          position: relative;
          top: 5px;
        }
      }
      .right_div {
        width: 150px;
        height: 100px;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 2;
        .value {
          font-size: 24px;
          font-family: DIN;
          font-weight: 500;
          line-height: 29px;
          color: #667be6;
          text-align: left;
          img {
            height: 20px;
            width: 20px;
            margin-right: 5px;
          }
        }
        .title {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 300;
          line-height: 21px;
          color: #1a1a1a;
          text-align: left;
          position: relative;
          top: 5px;
        }
      }
    }
  }
}
@media screen and (max-width: 1366px) {
  .ndzj_360 {
    width: 100%;
    height: 270px;
    padding-top: 112.5px;
    border-radius: 6px;
    background: rgba(256, 256, 256, 1);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    .body {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      overflow: hidden;
      .click {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
      }
      .click:hover {
        cursor: pointer;
      }
      .titlename {
        font-size: 14.5px;
        font-weight: bold;
        color: #333333;
        position: absolute;
        top: 8.5px;
        left: 9.25px;
      }
      .myEchart {
        height: 100%;
        position: relative;
        z-index: 1;
        top: 0;
      }
      .left_bg {
        width: 112.5px;
        height: 75px;
        position: absolute;
        top: 75px;
        left: 10%;
        z-index: 2;
      }
      .right_bg {
        width: 112.5px;
        height: 75px;
        position: absolute;
        top: 75px;
        right: 10%;
        z-index: 2;
      }
      .left_div {
        width: 112.5px;
        height: 75px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        .value {
          font-size: 18px;
          font-family: DIN;
          font-weight: 500;
          line-height: 21.5px;
          color: #f98591;
          text-align: left;
          position: relative;
          left: 45px;
          img {
            height: 15px;
            width: 15px;
            margin-right: 3.7px;
          }
        }
        .title {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 300;
          line-height: 21px;
          color: #1a1a1a;
          text-align: right;
          position: relative;
          top: 3.7px;
        }
      }
      .right_div {
        width: 112.5px;
        height: 75px;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 2;
        .value {
          font-size: 18px;
          font-family: DIN;
          font-weight: 500;
          line-height: 21.5px;
          color: #667be6;
          text-align: left;
          img {
            height: 15px;
            width: 15px;
            margin-right: 3.7px;
          }
        }
        .title {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 300;
          line-height: 15.5px;
          color: #1a1a1a;
          text-align: left;
          position: relative;
          top: 3.7px;
        }
      }
    }
  }
}
</style>
