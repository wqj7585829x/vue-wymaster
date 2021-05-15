<template>
  <div class="zmj_120">
    <div class="value">
      <span class="text"
        ><span class="sign"></span>{{ tonum(value)
        }}<span class="unit">(万m²)</span></span
      >
    </div>
    <div class="title">
      <span class="text">总面积</span>
    </div>
    <img :src="require(`@/assets/homeImgs/wave.png`)" class="wave" alt="" />
    <img :src="require(`@/assets/homeImgs/ZMJ.png`)" class="ZMJ" alt="" />
    <div class="click" @click="tozmjshow"></div>
  </div>
</template>
<script>
import { queryArea } from "@/api/Home/Home";
export default {
  data() {
    return {
      value: 0,
    };
  },
  mounted() {
    queryArea().then((response) => {
      var data = response.area;
      this.value = data;
    });
  },
  methods: {
    tonum(value) {
      return (parseFloat(value) / 10000.0).toFixed(2);
    },
    tozmjshow() {
      this.$router.push({ path: "HomePage/ZMJ" });
    },
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 1366px) {
  .zmj_120 {
    width: 100%;
    height: 120px;
    padding-top: 20px;
    border-radius: 8px;
    background: linear-gradient(135deg, #4460fb, #2d8af6);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    .wave {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .ZMJ {
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
  .zmj_120 {
    width: 100%;
    height: 90px;
    padding-top: 15px;
    border-radius: 6px;
    background: linear-gradient(135deg, #4460fb, #2d8af6);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    .wave {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .ZMJ {
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
      height: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 1;
      margin-top: 11.5px;
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
          top: -1.5px;
          margin-left: 7.5px;
        }
      }
    }
  }
}
</style>
