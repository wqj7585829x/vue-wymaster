<template>
  <div class="xgxx_360">
    <div class="grid-title">
      <div class="title">相关信息</div>
      <div class="more" @click="toxgxxshow">
        更多<img
          class="arrow_white"
          :src="require(`@/assets/homeImgs/arrow_gray.png`)"
          alt=""
        />
      </div>
    </div>
    <div class="grid-ul">
      <ul>
        <li
          v-for="(item, index) in messageList"
          :key="index"
          :title="item.message"
        >
          {{ item.message }}
        </li>
      </ul>
    </div>
    <XGXX :xgxxshow.sync="xgxxshow" ref="XGXX"></XGXX>
  </div>
</template>
<script>
import { queryExpirationTimeOfContract } from "@/api/Home/Home";
import XGXX from "./Popup/XGXX"; //弹窗
export default {
  data() {
    return {
      messageList: [],
      xgxxshow: false,
    };
  },
  mounted() {
    queryExpirationTimeOfContract(0).then((response) => {
      var item = response;
      this.messageList = item;
    });
  },
  methods: {
    toxgxxshow() {
      this.xgxxshow = true;
      this.$refs.XGXX.getPartitionData();
    },
  },
  components: {
    XGXX,
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 1366px) {
  .xgxx_360 {
    border-radius: 4px;
    height: 360px;
    background: #ffffff;
    .grid-title {
      width: 100%;
      font-weight: 700;
      color: #333;
      padding-top: 20px;
      padding-left: 20px;
      font-size: 18px;
      font-family: sans-serif;
      padding-right: 20px;
      height: 40px;
      .title {
        float: left;
      }
      .more {
        cursor: pointer;
        float: right;
        font-size: 16px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        img {
          height: 16px;
          width: 16px;
          position: relative;
          top: 3px;
        }
      }
    }
    .grid-ul {
      margin: 20px;
      height: 280px;
      overflow: hidden;
      ul {
        li {
          height: 56px;
          line-height: 56px;
          padding: 0 15px;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        li:nth-child(2n + 1) {
          background: #eceef2;
        }
      }
    }
  }
}
@media screen and (max-width: 1366px) {
  .xgxx_360 {
    border-radius: 3px;
    height: 270px;
    background: #ffffff;
    .grid-title {
      width: 100%;
      font-weight: 700;
      color: #333;
      padding-top: 15px;
      padding-left: 15px;
      font-size: 13.5px;
      font-family: sans-serif;
      padding-right: 15px;
      height: 30px;
      .title {
        float: left;
      }
      .more {
        cursor: pointer;
        float: right;
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        img {
          height: 12px;
          width: 12px;
          position: relative;
          top: 2.4px;
        }
      }
    }
    .grid-ul {
      margin: 15px;
      height: 210px;
      overflow: hidden;
      ul {
        li {
          height: 42px;
          line-height: 42px;
          padding: 0 11.5px;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        li:nth-child(2n + 1) {
          background: #eceef2;
        }
      }
    }
  }
}
</style>
