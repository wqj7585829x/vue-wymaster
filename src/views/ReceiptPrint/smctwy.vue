<template>
  <div class="PaperReceiptContent">
    <!-- 三明城发纸质收据带表格打印 -->
    <el-button type="primary" class="printBtn" @click="ReceiptbtnPrint"
      >打印</el-button
    >
    <section class="ReceiptSection">
      <div class="title">{{ formList.billPrintName }}</div>
      <div class="ReceiptNameNo">
        <em>收费凭证</em><b>NO:{{ formList.billNum }}</b>
      </div>
      <!-- 表格 -->
      <section class="ReceiptTable">
        <table width="750" border="1" cellspacing="0" cellpadding="5">
          <thead>
            <tr>
              <td>楼号\铺号</td>
              <td colspan="2">{{ formList.shopFloor }}</td>
              <td>房屋面积</td>
              <td colspan="2">{{ formList.floorSpace }}</td>
              <td>打印时间</td>
              <td>{{ nowDateString() }}</td>
              <td>收费单位</td>
              <td>{{ formList.chargeTheUnit }}</td>
            </tr>
            <tr>
              <td>客户名称</td>
              <td colspan="2">{{ formList.client }}</td>
              <td>摘要</td>
              <td colspan="6">{{ formList.remark }}</td>
              <!-- <td>费用期间</td>
                    <td>{{formList.period}}</td> -->
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 120px">费用项目</td>
              <td style="width: 80px">收款方式</td>
              <td style="width: 60px">单价</td>
              <td style="width: 60px">上月读数</td>
              <td style="width: 60px">本月读数</td>
              <td style="width: 60px">本月用量</td>
              <td style="width: 60px">金额小计</td>
              <td colspan="2">费用期间</td>
              <td>备注</td>
            </tr>
            <tr
              v-for="(item, index) in formList.listDetail"
              :key="index"
              style="height: 20px"
            >
              <td>{{ item.sfxm }}</td>
              <td>{{ item.SKMX_SKFS }}</td>
              <td>{{ item.dj }}</td>
              <td>{{ item.zbjs_syds }}</td>
              <td>{{ item.zbjs_byds }}</td>
              <td>{{ item.zbjs_byxd }}</td>
              <td>{{ item.sfje }}</td>
              <td colspan="2">{{ item.zy }}</td>
              <td></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="10">
                <div class="SumDetail">
                  <span
                    ><em>应收金额合计(大写)：</em
                    ><b>{{ formList.je | NumberToChinese }}</b></span
                  >
                  <span
                    ><em>(小写)：¥</em><b>{{ formList.je }}</b></span
                  >
                  <span
                    ><em>收款人：</em><b>{{ formList.payee }}</b></span
                  >
                  <span
                    ><em>收款时间：</em
                    ><b
                      >{{ formList.year }}-{{ formList.month }}-{{
                        formList.day
                      }}</b
                    ></span
                  >
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="10">
                <div class="Summary">
                  <strong>说明：</strong>
                  <span>
                    <em
                      >1.费用项目中管理费等常规费用属于本月费用，水电费等抄表类代收费用属于上月费用；</em
                    >
                    <em>2.如需发票，请于本年携带此收费凭证开具。</em>
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </section>
  </div>
</template>
<script>
import { getNowFormatDate } from "@/utils/global.js";
import { ReceiptChargingVoucherSmcfApi } from "@/api/Ticket/index.js";
export default {
  data() {
    return {
      formList: {}, //列表数据
    };
  },
  created() {
    this.ReceiptChargingVoucher(); //收据收费凭证
  },
  watch: {},
  methods: {
    //打印
    ReceiptbtnPrint() {
      window.print();
    },
    //当前日期--打印时间
    nowDateString() {
      return getNowFormatDate();
    },
    ReceiptChargingVoucher() {
      ReceiptChargingVoucherSmcfApi(
        this.$route.query.PJLYMX_ZJ,
        this.$route.query.X_Token
      ).then((response) => {
        if (response.data) {
          this.formList = response.data;
          this.formList.listDetail = response.data.listDetail;
          if (this.formList.listDetail.length < 5) {
            for (var i = 0; i < 5 - this.formList.listDetail.length; i++) {
              this.$nextTick(() => {
                this.formList.listDetail.push({});
              });
            }
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
.PaperReceiptContent {
  font-size: 12px;
  margin: 0 auto;
  width: 750px;
  text-align: center;
  color: #000;
  @media print {
    /* 打印去掉页眉页脚 */
    @page {
      size: auto A4 landscape;
      margin: 3mm;
    }
    .printBtn {
      display: none;
    }
  }
  table {
    border-collapse: collapse;
    border: 1px solid #000;
  } //针对针式打印表格问题
  td {
    border: 1px solid #000;
  } //针对针式打印表格问题
  .printBtn {
    margin: 20px auto;
  }
  .ReceiptSection {
    padding-top: 30px;
    .title {
      font-size: 36px;
      margin-bottom: 20px;
    }
    .ReceiptNameNo {
      position: relative;
      margin: 0 auto;
      text-align: center;
      em {
        font-size: 24px;
      }
      b {
        position: absolute;
        right: 0px;
        top: 15px;
      }
    }
    .ReceiptTable {
      margin-top: 20px;
      .SumDetail {
        text-align: left;
        span {
          margin-right: 30px;
          em {
            margin-right: 15px;
          }
          b {
            text-decoration: underline;
          }
        }
      }
      .Summary {
        text-align: left;
        strong {
          float: left;
        }
        span {
          float: left;
          em {
            display: block;
          }
        }
      }
    }
  }
}
</style>
