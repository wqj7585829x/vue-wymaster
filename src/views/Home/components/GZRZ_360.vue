<template>
  <div class="gzrz_360">
    <div class="grid-title">
      <div class="title">工作日志</div>
      <div class="more">
        更多<img
          class="arrow_white"
          :src="require(`@/assets/homeImgs/arrow_gray.png`)"
          alt=""
        />
      </div>
    </div>
    <div class="grid-ul">
      <ul>
        <li v-for="(item, index) in value" :key="index" :title="item.message">
          {{ item.message }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { queryWorkLog } from "@/api/Home/Home";
export default {
  data() {
    return {
      value: [],
    };
  },
  mounted() {
    queryWorkLog().then((response) => {
      var data = response;
      this.value = data;
    });
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 1366px) {
  .gzrz_360 {
    border-radius: 4px;
    height: 360px;
    background: #ffffff;
    position: relative;
    .grid-title {
      width: 100%;
      font-weight: 700;
      color: #333;
      padding-top: 20px;
      padding-left: 20px;
      padding-right: 20px;
      font-size: 18px;
      font-family: sans-serif;
      height: 40px;
      .title {
        float: left;
      }
      .more {
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
  .gzrz_360 {
    border-radius: 3px;
    height: 270px;
    background: #ffffff;
    position: relative;
    .grid-title {
      width: 100%;
      font-weight: 700;
      color: #333;
      padding-top: 15px;
      padding-left: 15px;
      padding-right: 15px;
      font-size: 12.5px;
      font-family: sans-serif;
      height: 30px;
      .title {
        float: left;
      }
      .more {
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
