<template>
  <div class="kskp_120">
    <div class="name">
      <img :src="require(`@/assets/homeImgs/bill.png`)" alt="" />
      <span>快速开票</span>
      <img
        class="arrow_white"
        :src="require(`@/assets/homeImgs/arrow_white.png`)"
        alt=""
      />
    </div>
    <div class="click" @click="tokskpshow"></div>
    <p class="tips">未开票凭证({{ value }})</p>
    <img :src="require(`@/assets/homeImgs/circle.png`)" class="circle" alt="" />
  </div>
</template>
<script>
import { queryNumOfVoucherNotInvoiced } from "@/api/Home/Home";
export default {
  data() {
    return {
      value: 0,
    };
  },
  mounted() {
    queryNumOfVoucherNotInvoiced().then((response) => {
      var data = response.count;
      this.value = data;
    });
  },
  methods: {
    tonum(value) {
      return (parseFloat(value) / 10000.0).toFixed(2);
    },
    tokskpshow() {
      this.$router.push({ path: "HomePage/KSKP" });
    },
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 1366px) {
  .kskp_120 {
    width: 100%;
    height: 120px;
    border-radius: 8px;
    background: #fc9030;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05);
    text-align: center;
    padding-top: 30px;
    position: relative;
    .circle {
      height: 110px;
      width: 62px;
      position: absolute;
      right: 0;
      bottom: -6px;
    }
    .name {
      height: 32px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      img {
        height: 40px;
        position: relative;
        top: -10px;
      }
      span {
        margin: 0 20px 0 10px;
        height: 100%;
        font-size: 24px;
        line-height: 32px;
        position: relative;
        top: -22px;
      }
      .arrow_white {
        height: 10px;
        position: relative;
        top: -24px;
      }
    }
    .tips {
      text-align: center;
      margin: 0;
      font-size: 16px;
      color: rgba(255, 255, 255, 1);
      margin-top: 2px;
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
  }
}
@media screen and (max-width: 1366px) {
  .kskp_120 {
    width: 100%;
    height: 90px;
    border-radius: 6px;
    background: rgba(245, 156, 97, 1);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
    text-align: center;
    padding-top: 22.5px;
    position: relative;
    .circle {
      height: 82.5px;
      width: 46.5px;
      position: absolute;
      right: 0;
      bottom: -6px;
    }
    .name {
      height: 24px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      img {
        height: 30px;
        position: relative;
        top: -7.5px;
      }
      span {
        margin: 0 15px 0 7.5px;
        height: 100%;
        font-size: 18px;
        line-height: 24px;
        position: relative;
        top: -15.5px;
      }
      .arrow_white {
        height: 7.5px;
        position: relative;
        top: -18px;
      }
    }
    .tips {
      text-align: center;
      margin: 0;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
      margin-top: 1.5px;
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
  }
}
</style>
