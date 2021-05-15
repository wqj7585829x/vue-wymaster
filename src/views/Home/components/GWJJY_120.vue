<template>
  <div class="gwjyy_120">
    <div class="title">
      <span class="text">公维金余额</span>
    </div>
    <div class="value">
      <span class="text"
        ><span class="sign">¥</span>{{ tonum(value)
        }}<span class="unit">(万)</span></span
      >
    </div>
    <div class="click" @click="togwjjyshow"></div>
  </div>
</template>
<script>
import { queryOverage } from "@/api/Home/Home";
export default {
  data() {
    return {
      value: 0,
    };
  },
  mounted() {
    queryOverage().then((response) => {
      var data = response.overage;
      this.value = data;
    });
  },
  methods: {
    tonum(value) {
      return (parseFloat(value) / 10000.0).toFixed(2);
    },
    togwjjyshow() {
      this.$router.push({ path: "HomePage/GWJJY" });
    },
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 1366px) {
  .gwjyy_120 {
    width: 100%;
    height: 120px;
    padding-top: 33px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05);
    position: relative;
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
      color: #000;
      .text {
        position: relative;
        left: 20%;
      }
    }
    .value {
      font-size: 36px;
      font-weight: 500;
      margin-top: 10px;
      color: #000;
      .text {
        position: relative;
        left: 20%;
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
  .gwjyy_120 {
    width: 100%;
    height: 90px;
    padding-top: 24.5px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
    position: relative;
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
      color: #000;
      .text {
        position: relative;
        left: 20%;
      }
    }
    .value {
      font-size: 24px;
      font-weight: 500;
      margin-top: 7.5px;
      color: #000;
      .text {
        position: relative;
        left: 20%;
        .sign {
          font-size: 15px;
          position: relative;
          top: -1px;
          margin-right: 2.4px;
        }
        .unit {
          font-size: 15px;
          position: relative;
          top: -2.4px;
          margin-left: 7.5px;
        }
      }
    }
  }
}
</style>
