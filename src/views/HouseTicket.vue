<template>
  <section class="TicketBody">
    <div class="TicketContent">
      <!-- <div class="card_Info">{{card_Info}}</div> -->
      <section class="buttonBox buttonAuto">
        <!-- <el-button type="primary" @click='OpenCard_kp()' :disabled="kpdisabled" v-if="kpshow">开具</el-button> -->
        <el-button
          type="primary"
          @click="OpenCard_Print()"
          :disabled="kpdisabled ? false : true"
          v-if="printshow"
          >打印
        </el-button>
        <!-- <el-button type="danger">取消</el-button> -->
      </section>
      <p class="TicketTips">
        请认真核对下面预览界面与装入打印机的纸质发票的发票代码，发票号码是否一致。<br />
        若一致，点击开具按钮开具真实发票并打印
      </p>
      <!-- 发票页面start -->
      <section class="TicketSection">
        <!--显示增值税普通发票0增值税专用发票2 InfoKind-->
        <section class="Ticket_infoname">{{ formList.PJLYMX_ZZSFPFL }}</section>
        <!--发票头部显示start-->
        <section class="Ticket_top">
          <em>{{ Jspinfo.infotypecode }}</em>
          <b>{{
            kpdisabled
              ? formList.PJLYMX_FPHM
              : PrefixInteger(Jspinfo.infonumber, 8)
          }}</b>
        </section>
        <!--发票头部显示end-->
        <!--右上角角落开票日期-->
        <section class="Ticket_date">
          <em>{{ Jspinfo.infotypecode }}</em
          ><b>{{
            kpdisabled
              ? formList.PJLYMX_FPHM
              : PrefixInteger(Jspinfo.infonumber, 8)
          }}</b
          ><i>{{ nowDate }}</i>
        </section>
        <!--购买方（包括名称，纳税人识别号，地址电话，开户行及账号）-->
        <ul class="buy_NO">
          <li class="buy_NO1">{{ formList.PJLYMX_NSRMC }}</li>
          <li class="buy_NO2">{{ formList.PJLYMX_NSRSBH }}</li>
          <li class="buy_NO3">{{ formList.PJLYMX_NSRDZDH }}</li>
          <li class="buy_NO4">{{ formList.PJLYMX_KHHJZH }}</li>
        </ul>
        <!-- 货物列表start -->
        <section class="TicketTable">
          <el-table
            :data="TicketList"
            :show-header="false"
            :highlight-current-row="false"
            height="137px"
            class="commonTable"
          >
            <el-table-column
              label="货物或应税劳务名称"
              prop="PJMX_SFXMMC"
              width="232"
            ></el-table-column>
            <el-table-column label="规格型号" width="112"></el-table-column>
            <el-table-column label="单位" width="53"></el-table-column>
            <el-table-column label="数量" width="92"></el-table-column>
            <el-table-column label="单价" width="88"></el-table-column>
            <el-table-column label="金额" prop="PJMX_BHSJE" width="134">
              <template slot-scope="scope">
                {{ scope.row.PJMX_BHSJE.toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column label="税率" prop="PJMX_SL" width="44">
              <template slot-scope="scope"> {{ scope.row.PJMX_SL }}% </template>
            </el-table-column>
            <el-table-column label="税额" prop="PJMX_SE" width="134">
              <template slot-scope="scope">
                {{ scope.row.PJMX_SE.toFixed(2) }}
              </template>
            </el-table-column>
          </el-table>
        </section>
        <!-- 货物列表end -->
        <!--货物清单 合计-->
        <div class="price_count">
          <em>{{ paidNotTaxllcount }}</em
          ><i></i><b>{{ taxCount }}</b>
        </div>
        <!--价税合计（大写）-->
        <div class="price_num">
          <em>{{ levied_count | NumberToChinese }}</em
          ><b>{{ levied_count }}</b>
        </div>
        <!--销售方（名称，纳税人识别号，地址电话，开户行及账号）-->
        <div class="sales_list">
          <ul>
            <li class="sales_name1">{{ taxInfo.kk_mc }}</li>
            <li class="sales_name2">{{ taxInfo.kk_sh }}</li>
            <li class="sales_name3">{{ taxInfo.kk_dz }} {{ taxInfo.kk_dh }}</li>
            <li class="sales_name4">
              {{ taxInfo.kk_khhdz }} {{ taxInfo.kk_yhzh }}
            </li>
          </ul>
        </div>
        <!--备注-->
        <div class="train_bz">{{ formList.PJMX_KPBZ }}</div>
        <!--收款人一栏-->
        <div class="kp_person">
          <em>{{ formList.PJLYMX_SKR }}</em
          ><i></i><b>{{ formList.PJLYMX_SKR }}</b>
        </div>
      </section>
      <!-- 发票页面end -->
    </div>
  </section>
</template>
<script>
// import { uccessWriteBackDataApi } from "@/api/Ticket/index";
import { billPrintDataApi } from "@/api/Realtor/TicketList"; //房屋租凭票据列表api
export default {
  data() {
    return {
      kpdisabled: true,
      printdisabled: false,
      kpshow: true, //开具默认显示
      printshow: true, //打印默认显示
      formList: {},
      Jspinfo: {}, //金税盘库存信息
      //  card_Info:'',//金税盘开启状态
      //  InfoTypeCode:'',//开具发票的十位代码
      //  InfoNumber:'',
      nowDate: "", //当前时间
      paidNotTaxllcount: "", //总金额（不含税）
      taxCount: "", //总税额
      levied_count: "", //价税合计小写
      TicketList: [],
      taxInfo: {}, //销售方
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //数据查询
    getData() {
      billPrintDataApi(
        this.$route.query.PJLYMX_ZJ,
        this.$route.query.dbName,
        this.$route.query.X_Token
      ).then((response) => {
        // console.log(response);
        //  if(response.message=="不允许重复开票"){this.kpdisabled=true}
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

          this.nowData(); //查询当前时间
          this.getinfo(); //税盘信息
        }
      });
    },
    //当前日期
    nowData() {
      var nowData = new Date();
      this.nowDate =
        nowData.getFullYear() +
        "年" +
        (nowData.getMonth() + 1) +
        "月" +
        nowData.getDate() +
        "日";
    },
    //开具发票调用接口
    getinfo() {
      var _this = this;
      // eslint-disable-next-line no-undef
      $.ajax({
        type: "post",
        url: "http://localhost:8091/api/getinfo",
        data: {
          infokind: _this.formList.PJLYMX_ZZSFPFL == "增值税专用发票" ? 0 : 2,
        },
        success: function (json) {
          _this.Jspinfo = json.info;
        },
        error: function () {
          _this.$message({ message: "请确认是否开启金税盘?", type: "warning" });
        },
      });
    },
    //开具发票   10301050104   30.0
    OpenCard_kp() {
      this.kpdisabled = true;
      var detail = [];
      this.TicketList.forEach((item) => {
        var obj = {};
        (obj.listgoodsname = item.PJMX_SFXMMC), //商品名称--修改输入
          (obj.listtaxitem = ""), //税目
          (obj.liststandard = ""), //规格型号名称
          (obj.listunit = ""), //计量单位号码
          (obj.listnumber = ""), //数量
          (obj.listprice = ""), //单价
          (obj.listpricekind = 0), //含税价标志
          (obj.listamount = item.PJMX_BHSJE), //金额--修改输入
          (obj.listtaxamount = item.PJMX_SE), //税额--修改输入
          (obj.infotaxrate = item.PJMX_SL), //税率-----有flbmxml.txt文件不用传，自己用调用flbmxml.txt里面的参数
          (obj.goodsnover = ""), //编码版本号--固定33--有flbmxml.txt文件不用传，自己用调用flbmxml.txt里面的参数 33
          (obj.goodstaxno = ""), //税收分类编码--国税要求必须----有flbmxml.txt文件不用传，自己用调用flbmxml.txt里面的参数10301050104
          (obj.taxpre = ""), //是否享受税收优惠政策 0：不享受，1：享受
          (obj.taxprecon = ""), //享受税收优惠政策内容
          (obj.zerotax = ""), //零税率标识 空：非零税率，0：出口退税，1：免税，2：不征税，3：普通零税率
          (obj.cropgoodsno = ""), //企业自编码
          (obj.taxdeduction = ""); //扣除额
        detail.push(obj);
      });
      var order = {
        infokind: this.formList.PJLYMX_ZZSFPFL == "增值税专用发票" ? 0 : 2, //专票0，普票2
        infoclientname: this.formList.PJLYMX_NSRMC, //纳税人名称--必填
        infoclienttaxcode:
          this.formList.PJLYMX_ZZSFPFL == "增值税专用发票"
            ? this.formList.PJLYMX_NSRSBH
            : "", //纳税人识别号--专票必填
        infoclientaddressphone:
          this.formList.PJLYMX_ZZSFPFL == "增值税专用发票"
            ? this.formList.PJLYMX_NSRDZDH
            : "", //纳税人地址电话--专票必填
        infoclientbankaccount:
          this.formList.PJLYMX_ZZSFPFL == "增值税专用发票"
            ? this.formList.PJLYMX_KHHJZH
            : "", //纳税人开户行及账号--专票必填
        infoselleraddressphone: this.taxInfo.kk_dz + " " + this.taxInfo.kk_dh, //销售方地址，电话
        infosellerbankaccount:
          this.taxInfo.kk_khhdz + " " + this.taxInfo.kk_yhzh, //销售方开户行及账号
        infonotes:
          this.formList.PJMX_KPBZ == undefined ? "" : this.formList.PJMX_KPBZ, //备注
        infoinvoicer: this.formList.PJLYMX_SKR, //开票人
        infochecker: "", //复核人
        infocashier: this.formList.PJLYMX_SKR, //收款人
        infolistname: "", //清单字样--可不输
        infobillnumber: "", //销售单据编号--可不输
        detail: detail,
      };
      var option = {
        checkform: 0, //是否弹窗校验0代表不弹窗，1弹窗
      };
      //开具发票调用接口
      var _this = this;
      // eslint-disable-next-line no-undef
      $.post(
        "http://localhost:8091/api/invoice",
        { order: order, option: option },
        function (json) {
          if (json.code == "4011") {
            _this.$set(_this.formList, "PJLYMX_FPDM", json.info.infotypecode);
            _this.$set(
              _this.formList,
              "PJLYMX_FPHM",
              _this.PrefixInteger(json.info.infonumber, 8)
            );
            _this.kpdisabled = true;
            _this.$message({
              message: "开具成功，如需打印点击‘打印’",
              type: "success",
            });
          } else {
            _this.kpdisabled = false;
            _this.$message({ message: JSON.stringify(json), type: "warning" });
          }
          _this.setData(
            json.code,
            _this.Jspinfo.infotypecode,
            _this.PrefixInteger(_this.Jspinfo.infonumber, 8)
          ); //打印回写传入数据到服务器
        },
        "json"
      );
    },
    //打印发票
    OpenCard_Print() {
      this.printv();
    },
    printv() {
      var _this = this;
      var inv = {
        infokind: _this.formList.PJLYMX_ZZSFPFL == "增值税专用发票" ? 0 : 2,
        infotypecode: _this.formList.PJLYMX_FPDM,
        infonumber: _this.formList.PJLYMX_FPHM,
        goodslistflag: 0,
        infoshowprtdlg: 1,
        dyjmc: "",
        qddyfs: "",
        left: "",
        top: "",
      };
      // eslint-disable-next-line no-undef
      $.post(
        "http://localhost:8091/api/printinv",
        { invoice: inv },
        function (json) {
          // console.log(JSON.stringify(json));
          _this.$message({ message: JSON.stringify(json), type: "success" });
        },
        "json"
      );
    },
    //打印回写传入数据到服务器
    // setData(RetCode, infotypecode, infonumber) {
    //   successWriteBackDataApi(
    //     this.$route.query.PJLYMX_ZJ,
    //     this.$route.query.X_Token,
    //     RetCode,
    //     this.formList.PJLYMX_ZZSFPFL,
    //     infotypecode,
    //     infonumber
    //   ).then(() => {
    //   });
    // },
    //前面数字补0
    PrefixInteger(num, length) {
      return (Array(length).join("0") + num).slice(-length);
    },
  },
};
</script>
<style lang="scss" scoped>
.TicketBody {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
}
.TicketContent {
  width: 954px;
  margin: 0 auto;
  .card_Info {
    margin: 30px auto;
    text-align: center;
    color: #5a9af7;
    font-weight: bold;
  }
  .buttonAuto {
    margin: 20px auto;
    text-align: center;
  }
  .TicketTips {
    margin: 20px auto;
    text-align: center;
  }
  .TicketSection {
    background: url("../assets/ticketImgs/print_bg.jpg");
    height: 620px;
    position: relative;
  }

  .Ticket_infoname {
    position: absolute;
    top: 10px;
    right: 20px;
    color: #888;
  }
  .Ticket_top {
    position: absolute;
    top: 25px;
    left: 136px;
    em {
      width: 200px;
      font-weight: bold;
      float: left;
      font-size: 24px;
    }
    b {
      float: right;
      color: #86b2ed;
      width: 200px;
      margin-left: 376px;
      font-size: 22px;
    }
  }
  .Ticket_date {
    position: relative;
    em {
      text-align: right;
      display: block;
      position: absolute;
      top: 48px;
      right: 50px;
    }
    b {
      text-align: right;
      display: block;
      position: absolute;
      top: 65px;
      right: 50px;
    }
    i {
      text-align: right;
      display: block;
      position: absolute;
      top: 85px;
      right: 50px;
    }
  }
  .buy_NO {
    position: absolute;
    top: 119px;
    left: 178px;
    li {
      line-height: 24px;
      height: 24px;
    }
  }
  .TicketTable {
    margin: 0 25px 0 38px;
    position: absolute;
    top: 240px;
    left: 0px;
  }
  .price_count {
    position: relative;
    em {
      width: 100px;
      float: left;
      position: absolute;
      left: 650px;
      top: 388px;
    }
    i {
      width: 42px;
      float: left;
      margin-left: 5px;
    }
    b {
      width: 95px;
      float: left;
      margin-left: 40px;
      position: absolute;
      left: 800px;
      top: 388px;
    }
  }
  .price_num {
    position: absolute;
    top: 417px;
    left: 309px;
    em {
      width: 362px;
      float: left;
    }
    b {
      width: 156px;
      float: left;
      margin-left: 95px;
    }
  }
  .sales_list {
    position: absolute;
    top: 450px;
    left: 183px;
    li {
      line-height: 20px;
      height: 20px;
    }
  }
  .train_bz {
    position: absolute;
    top: 452px;
    left: 585px;
    width: 336px;
    height: 75px;
  }
  .kp_person {
    position: absolute;
    top: 540px;
    left: 122px;
    em {
      width: 184px;
      float: left;
      height: 30px;
    }
    i {
      width: 140px;
      float: left;
      height: 30px;
      margin-left: 53px;
    }
    b {
      width: 140px;
      float: left;
      height: 30px;
      margin-left: 63px;
    }
  }
}
</style>
