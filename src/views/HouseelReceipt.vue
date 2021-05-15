<template>
  <div class="elReceiptBg">
    <div class="imageWrapper" ref="imageWrapper">
      <img class="real_pic" :src="dataURL" />
      <slot></slot>
    </div>
    <div class="Tomail">
      <input
        type="text"
        placeholder="请输入正确邮箱"
        id="tomail"
        v-model="toEmail"
      />
      <button @click="sendTomail()">发送邮箱</button>
    </div>
    <section
      class="pngContainer"
      id="jsTablePng"
      ref="jsTablePng"
      v-show="showBoolean"
    >
      <div class="pngTable">
        <div class="pngTitle"><span>资金往来统一票据</span></div>
        <div class="pngTop">
          <span class="ptopname"
            >交款单位（个人）：{{ formList.PJLYMX_KHMC }}</span
          ><span class="ptopdate">{{ formList.invoiceDate }}</span
          ><span class="ptopcode"
            ><em>票据代码：</em
            ><em>票据号码：{{ formList.PJLYMX_PJH }}</em></span
          >
        </div>
        <table width="690" border="1" cellpadding="1" cellspacing="1">
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
            <tr v-for="(item, index) in TicketList" :key="index">
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
                      formList.moneyTotal | NumberToChinese
                    }}</i></span
                  ><span class="moneynum"
                    >¥：<em>{{ formList.moneyTotal }}</em></span
                  >
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="11">
                <div class="tableBz">备注：{{ formList.PJMX_KPBZ }}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pngBottom">
          <span class="kpname">开票单位（盖章）：</span
          ><span class="kpperson">开票人：{{ formList.PJLYMX_SKR }}</span
          ><span class="skr">收款人：{{ formList.PJLYMX_SKR }}</span>
        </div>
        <div class="pngCompanyseal">
          <img :src="'data:image/png;base64,' + taxInfo.imageBase64" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import { sendEmailApi } from "@/api/Ticket/index";
import { billPrintDataApi } from "@/api/Realtor/TicketList"; //房屋租凭票据列表api
export default {
  data() {
    return {
      dataURL: "",
      formList: {},
      TicketList: [],
      paidNotTaxllcount: "",
      taxCount: "",
      levied_count: "",
      taxInfo: {},
      showBoolean: true,
      toEmail: "", //邮箱
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      //电子收据查询
      billPrintDataApi(
        this.$route.query.PJLYMX_ZJ,
        this.$route.query.dbName,
        this.$route.query.X_Token
      ).then((response) => {
        // console.log(response);
        if (response) {
          this.formList = response.data; //表单数据
          this.TicketList = response.data.listChargeItem;
          var paidNotTaxllcount = 0;
          var taxCount = 0;
          this.TicketList.forEach((item) => {
            paidNotTaxllcount += item.PJMX_BHSJE;
            taxCount += item.PJMX_SE;
          });
          this.paidNotTaxllcount = paidNotTaxllcount.toFixed(2);
          this.taxCount = taxCount.toFixed(2);
          this.levied_count = (paidNotTaxllcount + taxCount).toFixed(2);
          this.taxInfo = response.data.taxInfo;
          // this.img2base64("http://img2.imgtn.bdimg.com/it/u=3094834337,4262922045&fm=214&gp=0.jpg")//如果是外网地址，服务器必须允许跨域 图片才可以生成base64
          this.$nextTick(() => {
            this.htmlPng(); //生成png图片
          });
        }
      });
    },
    htmlPng() {
      //生成png图片
      html2canvas(this.$refs.jsTablePng, {
        backgroundColor: "#fff", // 【useCORS】公章图片开启跨域配置
      }).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        this.dataURL = dataURL;
        this.showBoolean = false;
      });
    },
    sendTomail() {
      var reg = new RegExp(
        "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$"
      );
      if (this.toEmail == "") {
        this.$message({ message: "请输入邮箱格式", type: "warning" });
        return;
      } else if (!reg.test(this.toEmail)) {
        this.$message({ message: "输入邮箱格式有错误", type: "warning" });
        return;
      }
      var imgurl = this.dataURL.split(",")[1];
      sendEmailApi(imgurl, this.toEmail).then((response) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.elReceiptBg {
  display: block;
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  margin: 0 auto;
  margin-top: -8px;
  padding-top: 20px;
  table {
    font-size: 12px;
  }
  .imageWrapper {
    text-align: center;
  }

  .invoiceTips {
    margin: 10px auto;
    display: block;
    text-align: center;
  }
  .invoiceM {
    margin: 0 auto;
    margin-top: 10px;
    text-align: center;
  }
  .invoiceM img {
  }
  .invoiceTips {
    text-align: center;
    font-size: 16px;
    color: red;
  }

  .pngContainer {
    width: 750px;
    color: #000;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.6;
    padding-bottom: 60px;
    margin: 0 auto;
    position: relative;
    min-height: 350px;
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
    display: block;
    width: 100%;
    overflow: auto;
  }
  .ptopname {
    width: 30%;
    display: inline;
    float: left;
    margin-top: 20px;
  }
  .ptopdate {
    width: 35%;
    display: inline;
    float: left;
    text-align: center;
    margin-top: 20px;
  }
  .ptopcode {
    width: 210px;
    display: inline;
    float: left;
  }
  .ptopcode em {
    display: block;
  }

  .moneyCount {
    display: block;
    text-align: left;
    padding: 10px 20px;
    overflow: auto;
  }
  .moneyzh {
    display: inline;
    float: left;
  }
  .moneynum {
    margin-right: 30px;
    display: inline;
    float: right;
  }
  .moneynum em {
    border-bottom: 1px solid #000;
  }
  .tableBz {
    text-align: left;
    padding: 10px 20px;
  }

  .pngBottom {
    display: block;
    width: 100%;
    overflow: auto;
  }
  .kpname {
    display: inline;
    float: left;
    width: 40%;
  }
  .kpperson {
    display: inline;
    float: left;
    width: 30%;
  }
  .skr {
    display: inline;
    float: left;
    width: 30%;
  }

  .pngCompanyseal {
    position: absolute;
    left: 10%;
    bottom: 0;
  }
  .pngCompanyseal img {
    width: 40%;
  }

  .Tomail {
    margin: 0 auto;
    text-align: center;
  }
  .Tomail input {
    width: 200px;
    height: 30px;
    border: 1px solid #5a98de;
    border-radius: 4px;
    text-indent: 5px;
  }
  .Tomail button {
    background: #5a98de;
    color: #fff;
    height: 30px;
    border: 0;
    border-radius: 4px;
  }

  .elinvoiceDiv {
    display: block;
    overflow: auto;
    margin-top: 10px;
    margin-bottom: 2px;
  }
  .guestInput {
    width: 150px;
    height: 30px;
    border: 1px solid #5a98de;
    border-radius: 4px;
    text-indent: 5px;
  }
  .elsearch {
    background: #5a98de;
    color: #fff;
    height: 30px;
    border: 0;
    margin-left: 10px;
  }
  .kpelUL {
    display: block;
    margin: 10px auto;
    text-align: center;
    width: 300px;
  }
  .kpelUL li {
    background: rgba(238, 238, 238, 0.98);
    color: #000;
    display: inline;
    float: left;
    height: 30px;
    line-height: 30px;
    padding: 4px;
    border-right: 1px solid #fff;
    border-radius: 4px;
  }
  .kpelUL li:last-child {
    border: 0;
  }
  .kpelUL li.active {
    background: #5a98de;
    color: #fff;
  }
}
</style>
