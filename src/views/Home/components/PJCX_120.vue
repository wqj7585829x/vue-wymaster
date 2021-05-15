<template>
  <div class="pjcx_120">
    <div class="block_1" @click="topjcxshow">
      <div class="name">
        <img :src="require(`@/assets/homeImgs/search.png`)" alt="" />
        <span>票据查询</span>
        <img
          class="arrow_white"
          :src="require(`@/assets/homeImgs/arrow_white.png`)"
          alt=""
        />
      </div>
      <img
        :src="require(`@/assets/homeImgs/circle.png`)"
        class="circle"
        alt=""
      />
    </div>
    <div class="block_2">
      <div class="tips">
        <p>{{ value.electronicInvoice }}</p>
        <p>电子发票</p>
      </div>
      <div class="tips">
        <p>{{ value.paperInvoice }}</p>
        <p>纸质发票</p>
      </div>
      <div class="tips">
        <p>{{ value.electronicReceipt }}</p>
        <p>电子收据</p>
      </div>
      <div class="tips">
        <p>{{ value.paperReceipt }}</p>
        <p>纸质收据</p>
      </div>
    </div>
    <img
      class="billimg"
      :src="require(`@/assets/homeImgs/bill_bg.png`)"
      alt=""
    />
  </div>
</template>
<script>
import { queryBillNum } from "@/api/Home/Home";
export default {
  data() {
    return {
      value: 0,
    };
  },
  mounted() {
    queryBillNum().then((response) => {
      var data = response;
      this.value = data;
    });
  },
  methods: {
    topjcxshow() {
      this.$router.push({ path: "HomePage/PJCX" }); //
      //this.$router.push({ path: "HomePage/PJCX_201111" }); // 微信/pos票据作废需审核
    },
    tonum(value) {
      return (parseFloat(value) / 10000.0).toFixed(2);
    },
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 1366px) {
  .pjcx_120 {
    width: 100%;
    height: 120px;
    border-radius: 8px;
    background: rgba(256, 256, 256, 1);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05);
    text-align: center;
    padding-right: 20px;
    position: relative;
    overflow: hidden;
    .billimg {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
    }
    .block_1 {
      height: 100%;
      width: 32.5%;
      border-radius: 8px;
      background: #4861f8;
      padding-top: 44px;
      float: left;
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
    .block_1:hover {
      cursor: pointer;
    }
    .block_2 {
      float: left;
      height: 100%;
      width: 60%;
      padding-left: 20px;
      .tips {
        height: 100%;
        width: 25%;
        float: left;
        p:nth-child(1) {
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #667be6;
          margin: 0px;
          margin-top: 34px;
        }
        p:nth-child(2) {
          text-align: center;
          margin-top: 14px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
        }
      }
    }
  }
}
@media screen and (max-width: 1366px) {
  .pjcx_120 {
    width: 100%;
    height: 90px;
    border-radius: 6px;
    background: rgba(256, 256, 256, 1);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
    text-align: center;
    padding-right: 15px;
    position: relative;
    .billimg {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
    }
    .block_1 {
      height: 100%;
      width: 32.5%;
      border-radius: 6px;
      background: rgba(93, 139, 243, 1);
      padding-top: 33px;
      float: left;
      .circle {
        height: 82.5px;
        width: 46.5px;
        position: absolute;
        right: 0;
        bottom: -4.5px;
      }
      .name {
        height: 24px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        img {
          height: 30px;
          position: relative;
          top: -3.75px;
        }
        span {
          margin: 0 15px 0 7.5px;
          height: 100%;
          font-size: 18px;
          line-height: 24px;
          position: relative;
          top: -12.5px;
        }
        .arrow_white {
          height: 7.5px;
          position: relative;
          top: -15px;
        }
      }
    }
    .block_1:hover {
      cursor: pointer;
    }
    .block_2 {
      float: left;
      height: 100%;
      width: 60%;
      padding-left: 15px;
      .tips {
        height: 100%;
        width: 25%;
        float: left;
        p:nth-child(1) {
          text-align: center;
          font-size: 15px;
          font-weight: bold;
          margin: 0px;
          margin-top: 24.5px;
        }
        p:nth-child(2) {
          text-align: center;
          margin-top: 9.5px;
          font-size: 9.5px;
          font-family: Microsoft YaHei;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
