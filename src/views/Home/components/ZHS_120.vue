<template>
  <div class="zhs_120">
    <div class="value">
      <span class="text"
        ><span class="sign"></span>{{ value
        }}<span class="unit">(户)</span></span
      >
    </div>
    <div class="title">
      <span class="text">总户数</span>
    </div>
    <div class="click" @click="tozhsshow"></div>
    <img :src="require(`@/assets/homeImgs/wave.png`)" class="wave" alt="" />
    <img :src="require(`@/assets/homeImgs/ZHS.png`)" class="ZHS" alt="" />
  </div>
</template>
<script>
import { getTotalNumOfHousehold, isLeader } from "@/api/Home/Home";
import ZHS_1 from "./Popup/ZHS_1"; //弹窗
import ZHS_2 from "./Popup/ZHS_2"; //弹窗
export default {
  data() {
    return {
      value: 0,
      isLeader: false,
      zhsshow: false,
    };
  },
  mounted() {
    isLeader().then((response) => {
      this.isLeader = response.isLeader;
    });
    getTotalNumOfHousehold().then((response) => {
      var data = response.totalNumOfHousehold;
      this.value = data;
    });
  },
  methods: {
    tonum(value) {
      return (parseFloat(value) / 10000.0).toFixed(2);
    },
    tozhsshow() {
      if (this.isLeader) {
        this.$router.push({ path: "HomePage/ZHS_1" });
      } else {
        this.$router.push({ path: "HomePage/ZHS_2" });
      }
    },
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 1366px) {
  .zhs_120 {
    width: 100%;
    height: 120px;
    padding-top: 20px;
    border-radius: 8px;
    background: linear-gradient(135deg, #e95050, #ff6767);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    .wave {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .ZHS {
      width: 100%;
      position: absolute;
      right: -4px;
      bottom: -6px;
      width: 60px;
      height: 60px;
    }
    .click {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }
    .click:hover {
      cursor: pointer;
    }
    .title {
      font-size: 16px;
      height: 17px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 1;
      margin-top: 15px;
      color: #fff;
      .text {
        position: relative;
        left: 10%;
      }
    }
    .value {
      font-size: 36px;
      font-weight: 500;
      color: #fff;
      .text {
        position: relative;
        left: 10%;
        .sign {
          font-size: 20px;
          position: relative;
          top: -1px;
          margin-right: 3px;
        }
        .unit {
          font-size: 20px;
          position: relative;
          top: -3px;
          margin-left: 10px;
        }
      }
    }
  }
}
@media screen and (max-width: 1366px) {
  .zhs_120 {
    width: 100%;
    height: 90px;
    padding-top: 15px;
    border-radius: 6px;
    background: linear-gradient(135deg, #e95050, #ff6767);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    .wave {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .ZHS {
      width: 100%;
      position: absolute;
      right: -3.7px;
      bottom: -4.5px;
      width: 45px;
      height: 45px;
    }
    .click {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }
    .click:hover {
      cursor: pointer;
    }
    .title {
      font-size: 12px;
      height: 12.5px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 1;
      margin-top: 15px;
      color: #fff;
      .text {
        position: relative;
        left: 10%;
      }
    }
    .value {
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      .text {
        position: relative;
        left: 10%;
        .sign {
          font-size: 13px;
          position: relative;
          top: -1px;
          margin-right: 2.4px;
        }
        .unit {
          font-size: 13px;
          position: relative;
          top: -1.4px;
          margin-left: 7.5px;
        }
      }
    }
  }
}
</style>
