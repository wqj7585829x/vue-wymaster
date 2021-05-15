<template>
  <div class="billDetaill">
    <div class="tip">
      <img src="~@/assets/comImgs/tips_icon.png" alt="" />长按票据可保存图片
    </div>
    <img class="real_pic" :src="dataURL" />
    <div class="bg"></div>
    <section class="pngContainer" ref="imageWrapper" v-show="show">
      <div class="pngTable">
        <div class="pngTitle"><span>资金往来统一票据</span></div>
        <div class="pngTop">
          <span class="ptopname">交款单位（个人）：{{ data.PJLYMX_KHMC }}</span
          ><span class="ptopdate">{{ data.PJLYMX_SKRQ }}</span
          ><span class="ptopcode"
            ><em>票据代码：</em><em>票据号码：{{ data.PJLYMX_PJH }}</em></span
          >
        </div>
        <table width="100%" border="1" cellpadding="1" cellspacing="1">
          <thead>
            <tr>
              <td rowspan="2">收款项目</td>
              <td rowspan="2">收费期间</td>
              <td rowspan="2">房间号</td>
              <td rowspan="2">单位</td>
              <td rowspan="2">数量</td>
              <td rowspan="2">单价</td>
              <td rowspan="2">金额（人民币）</td>
              <td colspan="4">外汇</td>
            </tr>
            <tr>
              <td>币种</td>
              <td>外币金额</td>
              <td>汇率</td>
              <td>人民币</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listDetail" :key="index">
              <td>{{ item.PJMX_SFXMMC }}</td>
              <td>{{ item.PJMX_ZY }}</td>
              <td>{{ item.FJDA_FJMC }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ item.PJMX_ZSJE }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="11">
                <div class="moneyCount">
                  <span class="moneyzh"
                    >合计人民币（大写）：<i id="moneyUpper">{{
                      data.totalmoney | NumberToChinese
                    }}</i></span
                  ><span class="moneynum"
                    >¥：<em>{{ data.moneyTotal }}</em></span
                  >
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="11">
                <div class="tableBz">备注：{{ data.PJMX_KPBZ }}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pngBottom">
          <span class="kpname">开票单位（盖章）：</span
          ><span class="kpperson">开票人：{{ data.PJLYMX_SKR }}</span
          ><span class="skr">收款人：{{ data.PJLYMX_SKR }}</span>
        </div>
        <div class="pngCompanyseal">
          <img :src="`data:image/png;base64,${data.imageToBase64ByOnline}`" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { posPrintPreviewPrint } from "@/api/Common/bill";
import Format from "@/utils/Format";
import html2canvas from "html2canvas";
import { parse } from "path";
export default {
  data() {
    return {
      dataURL: "",
      show: true,
      data: {},
      listDetail: {},
    };
  },
  mounted() {
    posPrintPreviewPrint({
      sess_plotDbName: this.$route.query.sess_plotDbName,
      sess_plotId: this.$route.query.sess_plotId,
      sess_yxdId: this.$route.query.sess_yxdId,
      PJLYMX_ZJ: this.$route.query.PJLYMX_ZJ,
    }).then((response) => {
      this.data = response.data;
      this.data.PJLYMX_SKRQ = this.formatdate(this.data.PJLYMX_SKRQ);
      this.data.totalmoney = this.data.moneyTotal;
      this.listDetail = this.data.listDetail;
      var data = this.data.listDetail;
      this.data.PJMX_KPBZ = "";
      for (var i in data) {
        this.data.PJMX_KPBZ = data[i].PJMX_KPBZ;
      }
      this.$nextTick(() => {
        this.toImage();
      });
    });
  },
  methods: {
    toImage() {
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: "#fff",
      }).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        this.dataURL = dataURL;
        this.show = false;
      });
    },
    formatdate(date) {
      var value = date.split(" ");
      return `${value[0]}${value[1]}${value[2]}${value[3]}${value[4]}${value[6]}`;
    },
  },
};
</script>
<style lang="scss">
.billDetaill {
  // height: 100%;
  // overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  .tip {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100%;
    height: 25px;
    display: flex;
    width: 100%;
    background: #f79ba4;
    color: #fff;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    img {
      height: 13px;
      margin-right: 4px;
    }
  }
  .real_pic {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    margin-top: 40px;
  }

  .bg {
    background: #ffffff;
    position: relative;
    z-index: 3;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .pngContainer {
    position: relative;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    width: 750px;
    color: #000;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.6;
    padding-bottom: 60px;
    position: relative;
  }

  .pngTable {
    width: 690px;
    margin: 0 auto;
  }

  .pngTable table {
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .pngTitle {
    text-align: center;
  }

  .pngTitle span {
    border-bottom: 1px solid #000;
    font-size: 28px;
    font-weight: bold;
  }

  .pngTop {
    display: flex;
    width: 100%;
    align-items: flex-end;
  }

  .ptopname {
    flex: 1;
  }

  .ptopdate {
    margin-right: 90px;
  }

  .ptopcode {
    display: flex;
    flex-direction: column;
    width: 200px;
    flex: 0 0 200px;
  }

  .moneyCount {
    display: flex;
    text-align: left;
    padding: 10px 20px;
  }

  .moneyzh {
    flex: 1;
  }

  .moneynum {
    margin-right: 30px;
  }

  .moneynum em {
    border-bottom: 1px solid #000;
  }

  .tableBz {
    text-align: left;
    padding: 10px 20px;
  }

  .pngBottom {
    display: flex;
  }

  .kpname {
    flex: 1;
  }

  .kpperson {
    flex: 1;
  }

  .skr {
    flex: 1;
  }

  em,
  i,
  strong {
    font-weight: normal;
    font-style: normal;
  }

  .pngCompanyseal {
    position: absolute;
    left: 10%;
    bottom: 0;
  }

  .pngCompanyseal img {
    width: 40%;
  }
}
</style>
