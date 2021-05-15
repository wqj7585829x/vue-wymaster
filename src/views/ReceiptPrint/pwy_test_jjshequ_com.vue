<template>
  <div class="elReceiptBgCover">
    <div @click="coverPrintBtn" class="coverbtn">套打打印</div>
    <div class="tdbg"></div>
    <section class="pngContainer">
      <div class="pngTable">
        <div class="pngTitle"><span>资金往来统一票据</span></div>
        <div class="pngRoomNumber">
          <span>{{ formList.roomNumber }}</span>
        </div>
        <div class="pngTop">
          <span class="ptopname">{{ formList.payer }}</span
          ><span class="ptopdate"
            ><span class="dateyear">{{ formList.year }}</span
            ><span class="datemonth">{{ formList.month }}</span
            ><span class="dateday">{{ formList.day }}</span></span
          ><span class="ptopcode"><em>票据代码：</em><em>票据号码：</em></span>
        </div>
        <table width="482" border="0" cellpadding="1" cellspacing="1">
          <thead>
            <tr></tr>
            <!-- <tr>
                          <td rowspan="2">收款项目</td>
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
                      </tr> -->
          </thead>
          <tbody class="tbodyTr">
            <tr v-for="(item, index) in TicketList" :key="index">
              <td style="width: 240px; text-align: left">
                <span
                  style="
                    width: 70px;
                    display: inline;
                    float: left;
                    margin-left: 0px;
                  "
                  >{{ item.sfxm }}</span
                ><span
                  style="
                    width: 150px;
                    display: inline;
                    float: left;
                    margin-left: 10px;
                  "
                  >{{ item.zy }}</span
                >
              </td>
              <!-- <td></td>
                          <td></td>                          
                          <td></td> -->
              <td style="width: 95px">{{ item.sfje }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td colspan="11">
                <div class="moneyCount">
                  <span class="moneyzh"
                    ><i id="moneyUpper">{{
                      formList.je | NumberToChinese
                    }}</i></span
                  ><span class="moneynumT"
                    ><em>{{ formList.je }}</em></span
                  >
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="11">
                <div class="tableBz">
                  {{ formList.PJMX_KPBZ
                  }}<em v-if="formList.billRemarks != ''"
                    ><br />{{ formList.billRemarks }}</em
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pngBottom">
          <span class="kpname">开票单位（盖章）：</span
          ><span class="kpperson">开票人：</span
          ><span class="skrT">{{ formList.payee }}</span>
        </div>
      </div>
      <!-- <div class="pageBreak"></div> -->
    </section>
  </div>
</template>
<script>
import { ReceiptCoverApi } from "@/api/Ticket/index";
export default {
  data() {
    return {
      formList: {},
      TicketList: [],
      paidNotTaxllcount: "",
      taxCount: "",
      levied_count: "",
      taxInfo: {},
      pages: 1, //打印分页
      onePageRow: 5, //一页几条
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      //收据查询
      ReceiptCoverApi(
        this.$route.query.PJLYMX_ZJ,
        this.$route.query.X_Token
      ).then((response) => {
        // console.log(response);
        if (response) {
          this.formList = response.data; //表单数据
          this.TicketList = response.data.listDetail;
          console.log(this.TicketList);
          var sylen = 5 - this.TicketList.length;
          for (var i = 0; i < sylen; i++) {
            var obj = {};
            this.TicketList.push(obj);
          }
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
        }
      });
    },
    coverPrintBtn() {
      //套打打印
      window.print();
    },
  },
};
</script>

<style lang="scss" scoped>
/* 打印按钮隐藏 */
//  @page {size: auto; margin: 0mm; }
.elReceiptBgCover {
  display: block;
  width: 100%;
  @media print {
    .coverbtn {
      display: none;
    }
  }
  .coverbtn {
    margin: 0 auto;
    text-align: center;
    background: #2e8ad7;
    width: 106px;
    color: #fff;
    border-radius: 4px;
    padding: 10px 0;
    cursor: pointer;
  }
  .pngRoomNumber {
    position: absolute;
    top: 60px;
  }
  .pageBreak {
    page-break-after: always;
    display: block;
  }
  table {
    font-size: 12px;
  }
  table thead tr {
    height: 75px;
    visibility: hidden;
  }
  .tbodyTr {
    position: absolute;
    top: 180px;
  }
  .tbodyTr tr {
    height: 26px;
    line-height: 1;
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
    width: 638px;
    color: #000;
    font-size: 12px;
    line-height: 1;
    margin: 0 auto;
    position: relative;
  }
  .tdbg {
    background: url("../../assets/comImgs/kp.png") 100% 100%;
    background-size: 100% 100%;
    width: 780px;
    height: 490px;
    position: absolute;
    top: 35px;
    left: 480px;
    display: none;
  }
  .pngTable {
    width: 482px;
    margin-left: 20px;
  }
  .pngTable table {
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .pngTitle {
    text-align: center;
    visibility: hidden;
    margin-top: 15px;
    margin-bottom: 28px;
  }
  .pngTitle span {
    border-bottom: 1px solid #000;
    font-size: 28px;
    font-weight: bold;
  }

  .pngTop {
    display: block;
    width: 100%;
    margin-top: 15px;
    position: absolute;
    top: 65px;
  }
  // .ptopname{width:120px; display: inline;float: left;margin-top:10px;margin-left:58px; }
  .ptopname {
    width: 120px;
    display: inline;
    float: left;
    margin-top: 10px;
    margin-left: 70px;
  }

  .ptopdate {
    display: inline;
    float: left;
    text-align: center;
    margin-top: 10px;
  }
  .dateyear {
  }
  .datemonth {
    margin-left: 30px;
  }
  .dateday {
    margin-left: 40px;
  }
  .ptopcode {
    display: none;
    float: left;
  }
  .ptopcode em {
    display: block;
  }

  .moneyCount {
    display: block;
    text-align: left;
    padding: 12px 20px;
    overflow: auto;
  }
  .moneyzh {
    position: absolute;
    top: 344px;
    left: 118px;
  }
  .moneynumT {
    position: absolute;
    top: 344px;
    right: 130px;
  }
  .moneynumT em {
    border-bottom: 0px solid #000;
  }
  .tableBz {
    text-align: left;
    line-height: 1;
    padding-left: 40px;
    padding-top: 4px;
    padding-bottom: 4px;
    width: 560px;
    height: 30px;
    overflow: hidden;
    position: absolute;
    top: 374px;
    left: 0px;
    word-break: break-all;
  }

  // .pngBottom{display:block;width: 100%;margin-top:8px;overflow: hidden;}
  .kpname {
    visibility: hidden;
  }
  .kpperson {
    visibility: hidden;
  }
  // .skrT{position: absolute;top:428px; right: 120px; }//第一版错误
  .skrT {
    position: absolute;
    top: 424px;
    right: 90px;
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
