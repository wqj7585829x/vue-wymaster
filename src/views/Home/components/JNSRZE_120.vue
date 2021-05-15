<template>
  <div class="jnsrze_120">
    <div class="value">
      <span class="text"
        ><span class="sign">¥</span>{{ tonum(value)
        }}<span class="unit">(万)</span></span
      >
    </div>
    <div class="title">
      <span class="text">今年收费总额</span>
    </div>
    <img :src="require(`@/assets/homeImgs/wave.png`)" class="wave" alt="" />
    <img :src="require(`@/assets/homeImgs/JNSRZE.png`)" class="JNSRZE" alt="" />
    <div class="click" @click="tosktjbshow"></div>
  </div>
</template>
<script>
import { getTotalIncome } from "@/api/Home/Home";
import { formatMoney } from "@/utils/global.js";
export default {
  data() {
    return {
      value: 0,
    };
  },
  mounted() {
    getTotalIncome().then((response) => {
      var data = response.totalIncome;
      this.value = data;
    });
  },
  methods: {
    formatMoney(data) {
      return data >= 0
        ? formatMoney(data, true)
        : `-${formatMoney(0 - data, true)}`;
    },
    tonum(value) {
      return this.formatMoney((parseFloat(value) / 10000.0).toFixed(2));
    },
    tosktjbshow() {
      this.$router.push({ path: "HomePage/SKTJB" });
    },
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 1366px) {
  .jnsrze_120 {
    width: 100%;
    height: 120px;
    padding-top: 20px;
    border-radius: 8px;
    background: linear-gradient(135deg, #1faea4, #32bbc5);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    .wave {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .JNSRZE {
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
      color: #ffffff;
      .text {
        position: relative;
        left: 10%;
      }
    }
    .value {
      font-size: 36px;
      font-weight: 500;
      color: #ffffff;
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
  .jnsrze_120 {
    width: 100%;
    height: 90px;
    padding-top: 15px;
    border-radius: 6px;
    background: linear-gradient(135deg, #1faea4, #32bbc5);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    .wave {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .JNSRZE {
      width: 100%;
      position: absolute;
      right: -3px;
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
      margin-top: 11.5px;
      color: #ffffff;
      .text {
        position: relative;
        left: 10%;
      }
    }
    .value {
      font-size: 18px;
      font-weight: 500;
      color: #ffffff;
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
