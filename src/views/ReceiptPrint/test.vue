<template>
  <div class="pagerReceiptBgCover">
    <el-button type="primary" class="coverbtn" @click="coverPrintBtn"
      >打印</el-button
    >
    <section class="sectionContent" v-for="(its, inx) in itsArray" :key="inx">
      <div class="logo_title">
        <img src="~@/assets/comImgs/trlogo.png" /><strong>收款收据</strong>
      </div>
      <div class="title1">
        <span>服务中心：{{ formList.GLCNAME }}</span
        ><span>开具日期：{{ formList.SKPZ_RZSJ }}</span
        ><span>收付方式：{{ formList.SKMX_SKFS }}</span
        ><span>票据号：{{ formList.PJLYMX_PJH }}</span>
      </div>
      <div class="title2">
        <span>客户名称：{{ formList.PJLYMX_KHMC }}</span
        ><span>房号/车位号：{{ formList.PJLYMX_FJID }}</span>
      </div>
      <div class="tablediv">
        <table
          width="900"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="border: 1px solid #000"
        >
          <thead>
            <tr>
              <th>收费项目</th>
              <th>费用期间</th>
              <th>上期读数</th>
              <th>本期读数</th>
              <th>面积/用量</th>
              <th>单位</th>
              <th>单价</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in its" :key="index" style="height: 20px">
              <td align="center">{{ item.sfxm }}</td>
              <td align="center">{{ item.zy }}</td>
              <td align="center">{{ item.sqds }}</td>
              <td align="center">{{ item.bqds }}</td>
              <td align="center">{{ item.ylmj }}</td>
              <td align="center">{{ item.dw }}</td>
              <td align="center">{{ item.dj }}</td>
              <td align="center">{{ item.sfje }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">
                <span class="UpperMoney"
                  >合计金额（大写）：{{ formList.je | NumberToChinese }}</span
                >
              </td>
              <td>&nbsp;</td>
              <td colspan="4">
                <span class="LowerMoney"
                  >合计金额（小写）：{{ formList.je }}</span
                >
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="footer_bzskr">
        <span class="bz">备注：</span
        ><span class="skr">收款人：{{ formList.PJLYMX_SKR }}</span>
      </div>
      <!--分页标识-->
      <div class="pageBreak"></div>
    </section>
  </div>
</template>
<script>
import { TangrenReceiptCoverApi } from "@/api/Ticket/index";
export default {
  data() {
    return {
      formList: {},
      TicketList: [],
      TicketListx: [
        //接口返回的数据
        {
          bqds: 1.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 2.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 3.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 4.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 5.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 6.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 7.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 8.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 9.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 10.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 11.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 12.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 13.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 14.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 15.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 16.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 17.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 18.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 19.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 20.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
        {
          bqds: 21.0,
          dw: "",
          dj: 0.0,
          sqds: 0.0,
          ylmj: 0.0,
          PJMX_SKFS: "现金",
          sfje: 11.0,
          sort: 1,
          sfxm: "车位公共维修金",
          zy: "2020-08至2020-08",
        },
      ],
      pageSize: 10, //每页显示10条数据
      currentPage: 1, //当前页码
      count: 0, //总记录条数
      itsArray: [], //分页数组数据
      items: [], //每页的数据
      itemindex0: [],
      itemindex1: [],
      itemindex2: [],
      itemindex3: [],
      itemindex4: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      //收据查询
      var _this = this;
      TangrenReceiptCoverApi(
        this.$route.query.PJLYMX_ZJ,
        this.$route.query.X_Token
      ).then((response) => {
        // console.log(response);
        if (response) {
          _this.formList = response.data; //表单数据
          _this.TicketList = response.data.listDetail;

          _this.TicketList.forEach((item, index, arr) => {
            if (index <= 9) {
              _this.itemindex0.push(item);
            }
            if (index > 9 && index <= 19) {
              _this.itemindex1.push(item);
            }
            if (index > 19 && index <= 29) {
              _this.itemindex2.push(item);
            }
            if (index > 29 && index <= 39) {
              _this.itemindex3.push(item);
            }
            if (index > 39 && index <= 49) {
              _this.itemindex4.push(item);
            }
          });

          if (_this.itemindex0.length) {
            if (_this.itemindex0.length < _this.pageSize) {
              for (var i = 0; i < _this.itemindex0.length; i++) {
                if (_this.itemindex0.length == _this.pageSize) break;
                var obj = {};
                _this.itemindex0.push(obj);
              }
            }
            _this.itsArray.push(_this.itemindex0);
          }
          if (_this.itemindex1.length) {
            if (_this.itemindex1.length < _this.pageSize) {
              for (var i = 0; i < _this.itemindex1.length; i++) {
                if (_this.itemindex1.length == _this.pageSize) break;
                var obj = {};
                _this.itemindex1.push(obj);
              }
            }
            _this.itsArray.push(_this.itemindex1);
          }
          if (_this.itemindex2.length) {
            if (_this.itemindex2.length < _this.pageSize) {
              for (var i = 0; i < _this.itemindex2.length; i++) {
                if (_this.itemindex2.length == _this.pageSize) break;
                var obj = {};
                _this.itemindex2.push(obj);
              }
            }
            _this.itsArray.push(_this.itemindex2);
          }
          if (_this.itemindex3.length) {
            if (_this.itemindex3.length < _this.pageSize) {
              for (var i = 0; i < _this.itemindex3.length; i++) {
                if (_this.itemindex3.length == _this.pageSize) break;
                var obj = {};
                _this.itemindex3.push(obj);
              }
            }
            _this.itsArray.push(_this.itemindex3);
          }
          if (_this.itemindex4.length) {
            if (_this.itemindex4.length < _this.pageSize) {
              for (var i = 0; i < _this.itemindex4.length; i++) {
                if (_this.itemindex4.length == _this.pageSize) break;
                var obj = {};
                _this.itemindex4.push(obj);
              }
            }
            _this.itsArray.push(_this.itemindex4);
          }

          console.log(this.itsArray);
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
.pagerReceiptBgCover {
  display: block;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  @media print {
    /* 打印去掉页眉页脚 */
    @page {
      size: auto A4 landscape;
      margin: 3mm;
    }
    .coverbtn {
      display: none;
    }
  }
  .pageBreak {
    page-break-after: always;
    display: block;
  }

  .sectionContent {
    width: 900px;
    margin: 0 auto;
    text-align: center;
    padding-top: 0px;
    height: 140mm;
    border-bottom: 0px solid red;
    table {
      border-collapse: collapse;
    } //针对针式打印表格问题
    .logo_title {
      text-align: center;
      display: inline-block;
      width: 100%;
      img {
        float: left;
        display: inline;
      }
      strong {
        float: left;
        display: inline;
        font-size: 32px;
        margin-left: 160px;
        padding-top: 66px;
      }
    }
    .title1 {
      display: inline-block;
      width: 100%;
      text-align: left;
      span {
        width: 25%;
        display: inline-block;
      }
    }
    .title2 {
      display: inline-block;
      width: 100%;
      text-align: left;
      span {
        width: 25%;
        display: inline-block;
      }
    }

    .UpperMoney {
      text-align: left;
      float: left;
    }
    .LowerMoney {
      text-align: left;
      float: left;
    }

    .footer_bzskr {
      margin-top: 25px;
      text-align: left;
      .bz {
        float: left;
        width: 50%;
        margin-left: 48px;
      }
      .skr {
        float: left;
      }
    }
  }
}
</style>
