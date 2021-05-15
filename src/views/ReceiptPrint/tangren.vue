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
          width="700"
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
              <td align="left" style="text-indent: 10px">{{ item.sfxm }}</td>
              <td align="center">{{ item.zy }}</td>
              <td align="center">{{ item.sqds }}</td>
              <td align="center">{{ item.bqds }}</td>
              <td align="center">{{ item.ylmj }}</td>
              <td align="center">
                {{ item.dw != undefined && item.dw == "" ? "-" : item.dw }}
              </td>
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
import Vue from "vue";
import { TangrenReceiptCoverApi } from "@/api/Ticket/index";
export default {
  data() {
    return {
      formList: {},
      TicketList: [
        //接口返回的数据
        //  {"bqds":1.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":2.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":3.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":4.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":5.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":6.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":7.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":8.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":9.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":10.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":11.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":12.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":13.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":14.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":15.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":16.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":17.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":18.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":19.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":20.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":21.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":22.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":23.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":24.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":25.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":26.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":27.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":28.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":29.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
        //  {"bqds":30.0000,"dw":"","dj":0.00000,"sqds":0.0000,"ylmj":0.0000,"PJMX_SKFS":"现金","sfje":11.00000000,"sort":1,"sfxm":"车位公共维修金","zy":"2020-08至2020-08"},
      ],
      pageSize: 10, //每页显示10条数据
      count: 0, //总记录条数
      itsArray: [], //分页数组数据
      objlist: {}, //每页的数组{itemindex0:[{}],itemindex1:[{}],itemindex2:[{}]}
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

          _this.count = _this.TicketList.length; //总条数
          var pageNum = Math.ceil(_this.count / _this.pageSize).toFixed(0); //计算几页
          for (let j = 0; j < pageNum; j++) {
            _this.$set(_this.objlist, "itemindex" + j, []); //有几页创建几个数组{ [{}], [{}], [{}], ...} 对象里面包含数组，访问是用this.objlist["itemindex"+j]
          }

          //把每页数据push到各自的数组里面
          var num = 0;
          _this.TicketList.forEach((item, index, arr) => {
            if (index <= this.pageSize - 1) {
              //判断从0到9索引的数据push到itemindex0的数组里
              _this.objlist["itemindex" + num].push(item);
            }

            if (num > 0) {
              if (
                index > this.pageSize - 1 + (num - 1) * this.pageSize &&
                index <= this.pageSize - 1 + num * this.pageSize
              ) {
                //num=1  //判断从9到19索引的数据push到itemindex1的数组里，num=2 itemindex2，num=3 itemindex3...
                _this.objlist["itemindex" + num].push(item);
              }
            }
            if (_this.objlist["itemindex" + num].length == this.pageSize) {
              //this.objlist["itemindex"+0]=10  this.objlist["itemindex"+1]=10 ....就num++ 继续循环下一个数组数据
              num++;
            }
          });

          //填充每页少于10个的行数
          for (let i = 0; i < pageNum; i++) {
            if (_this.objlist["itemindex" + i].length) {
              if (_this.objlist["itemindex" + i].length < _this.pageSize) {
                //当每页的表格小于10个，填充剩余的行数
                for (
                  let j = 0;
                  j < _this.objlist["itemindex" + i].length;
                  j++
                ) {
                  if (_this.objlist["itemindex" + i].length == _this.pageSize)
                    break;
                  let obj = {};
                  _this.objlist["itemindex" + i].push(obj); //填充剩余的行数
                }
              }
              _this.itsArray.push(_this.objlist["itemindex" + i]);
            }
          }

          //console.log(this.itsArray)
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
  font-size: 13px;
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
    width: 700px;
    margin: 0 auto;
    text-align: center;
    padding-top: 0px;
    height: 130mm;
    border-bottom: 0px solid red; //针式打印尺寸210*140
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
        margin-left: 100px;
        padding-top: 66px;
      }
    }
    .title1 {
      display: inline-block;
      width: 100%;
      text-align: left;
      span {
        display: inline-block;
        margin-right: 5%;
        min-width: 10%;
      }
      span:last-child {
        text-align: right;
        margin-right: 0%;
      } //最后一个span
    }
    .title2 {
      display: inline-block;
      width: 100%;
      text-align: left;
      span {
        display: inline-block;
        margin-right: 5%;
        min-width: 15%;
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
