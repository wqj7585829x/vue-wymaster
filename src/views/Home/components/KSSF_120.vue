<template>
  <div class="kssf_120">
    <div class="name">
      <img :src="require(`@/assets/homeImgs/charge.png`)" alt="" />
      <span>快速收费</span>
      <img
        class="arrow_white"
        :src="require(`@/assets/homeImgs/arrow_white.png`)"
        alt=""
      />
    </div>
    <div class="click" @click="tokssfshow"></div>
    <img :src="require(`@/assets/homeImgs/circle.png`)" class="circle" alt="" />
  </div>
</template>
<script>
import KSSF from "./Popup/KSSF"; //弹窗
export default {
  data() {
    return {};
  },
  methods: {
    tokssfshow() {
      this.$router.push({ path: "HomePage/KSSF" });
    },
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 1366px) {
  .kssf_120 {
    width: 100%;
    height: 120px;
    border-radius: 8px;
    background: #eb5656;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05);
    text-align: center;
    padding-top: 44px;
    position: relative;
    .circle {
      height: 110px;
      width: 62px;
      position: absolute;
      right: 0;
      bottom: -6px;
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
    .name {
      height: 32px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      img {
        height: 40px;
        position: relative;
        top: -5px;
      }
      span {
        margin: 0 20px 0 10px;
        height: 100%;
        font-size: 24px;
        line-height: 32px;
        position: relative;
        top: -17px;
      }
      .arrow_white {
        height: 10px;
        position: relative;
        top: -20px;
      }
    }
  }
}
@media screen and (max-width: 1366px) {
  .kssf_120 {
    width: 100%;
    height: 90px;
    border-radius: 6px;
    background: rgba(228, 94, 107, 1);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05);
    text-align: center;
    padding-top: 33px;
    position: relative;
    .circle {
      height: 82.5px;
      width: 46.5px;
      position: absolute;
      right: 0;
      bottom: -6px;
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
    .name {
      height: 24px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      img {
        height: 30px;
        position: relative;
        top: -3.7px;
      }
      span {
        margin: 0 15px 0 7.5px;
        height: 100%;
        font-size: 18px;
        line-height: 24px;
        position: relative;
        top: -12.75px;
      }
      .arrow_white {
        height: 7.5px;
        position: relative;
        top: -15px;
      }
    }
  }
}
</style>
