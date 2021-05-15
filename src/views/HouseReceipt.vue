<!-- 收据打印 -->
<template>
  <section class="ReceiptBody">
    <div class="ReceiptContent">
      <section class="buttonBox buttonAuto noprint">
        <el-button type="primary" @click="OpenReceipt_Print()"
          >票据打印</el-button
        >
      </section>
      <!-- 收据页面start -->
      <section class="ReceiptSection">
        <section class="header_wrap">
          <div class="title">资金往来统一票据</div>
          <div class="header">
            <div class="flex_payer flex_p">
              <span
                >交款单位(个人)：<span class="payer_txt">{{
                  formList.payer
                }}</span></span
              >
            </div>
            <div class="flex_date flex_p">
              <span class="year_number">{{ formList.year }}</span
              >年 <span class="month_number">{{ formList.month }}</span
              >月 <span class="day_number">{{ formList.day }}</span
              >日
            </div>
            <div class="flex_bill_wrap flex_p">
              <!-- <div>票据代码：<span class="bill_code"></span></div> -->
              <div>
                票据号码：<span class="bill_number">{{
                  formList.billNum
                }}</span>
              </div>
            </div>
          </div>
        </section>
        <section class="table_wrap">
          <el-table
            :data="tabledata"
            border
            class="table0"
            :fit="false"
            :span-method="arraySpanMethod"
            :highlight-current-row="false"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="sfxm"
              label="收款项目"
              width="169"
            ></el-table-column>
            <el-table-column
              prop="zy"
              :fit="false"
              label="单位"
              width="50"
            ></el-table-column>
            <el-table-column
              label="数量"
              :fit="false"
              width="50"
            ></el-table-column>
            <el-table-column
              label="单价"
              :fit="false"
              width="50"
            ></el-table-column>
            <el-table-column prop="sfje" label="金额(人民币)" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.sfje | rounding }}</span>
              </template>
            </el-table-column>
            <el-table-column label="外汇">
              <el-table-column label="币种" width="50"></el-table-column>
              <el-table-column label="外币金额" width="100"></el-table-column>
              <el-table-column label="汇率" width="50"></el-table-column>
              <el-table-column label="人民币" width="80"></el-table-column>
            </el-table-column>
          </el-table>
        </section>
        <section class="table_wrap table1">
          <el-table
            :data="tabledata2"
            border
            :show-header="false"
            :span-method="mergeAction"
            :highlight-current-row="false"
          >
            <el-table-column label="收款项目" width="100">
              <template slot-scope="scope">
                <div class="font_wrap">
                  <div class="rmb_capital">
                    <span
                      >合计人民币(大写)<span class="rmb_txt">{{
                        scope.row.je | NumberToChinese
                      }}</span></span
                    >
                  </div>
                  <div class="rmb_digital">
                    <span
                      >￥：<span class="rmb_num">{{ scope.row.je }}</span></span
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column></el-table-column>
            <el-table-column></el-table-column>
            <el-table-column></el-table-column>
            <el-table-column></el-table-column>
            <el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
            </el-table-column>
          </el-table>
        </section>
        <section class="table_wrap table2">
          <el-table
            :data="tabledata2"
            border
            :show-header="false"
            :span-method="mergeAction"
            :highlight-current-row="false"
          >
            <el-table-column>
              <template prop="value1">
                <div class="remart_wrap font_wrap">
                  <span>备注：</span
                  ><span class="rmb_txt">{{ formList.remark }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column></el-table-column>
            <el-table-column></el-table-column>
            <el-table-column></el-table-column>
            <el-table-column></el-table-column>
            <el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
            </el-table-column>
          </el-table>
        </section>
        <section class="bill_message">
          <div class="dw_wrap bill_wrap">
            <span>开票单位(盖章):<span></span></span>
          </div>
          <div class="kpr_wrap bill_wrap">
            <span
              >开票人:<span>{{ formList.payee }}</span></span
            >
          </div>
          <div class="skr_wrap bill_wrap">
            <span
              >收款人:<span>{{ formList.payee }}</span></span
            >
          </div>
        </section>
      </section>
    </div>
  </section>
</template>
<script>
import { updatePrintTimes } from "@/api/FeeManagement/TicketBill"; //票据打印
import { paperReceiptPrintApi } from "@/api/Realtor/TicketList"; //房屋租凭票据列表api
export default {
  data() {
    return {
      ReceiptTab: "",
      tabledata: [], //表格数据
      tabledata2: [
        {
          je: "",
        },
      ],
      formList: {
        payer: "", //交款人，
        payee: "", //收款人
        billNum: "", //票据号
        year: "",
        month: "",
        day: "",
        remark: "",
      },
    };
  },
  mounted() {
    this.tabledata = [];
    this.getReciptData();
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return "tabRowHeight";
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //合并行
      if (rowIndex % 2 === 0) {
        if (columnIndex === 1) {
          return [1, 3];
        } else if (columnIndex === 2) {
          return [0, 0];
        } else if (columnIndex === 3) {
          return [0, 0];
        }
      } else {
        if (columnIndex === 1) {
          return [1, 3];
        } else if (columnIndex === 2) {
          return [0, 0];
        } else if (columnIndex === 3) {
          return [0, 0];
        }
      }
    },
    mergeAction(val, rowIndex, colData) {
      return [9, 9];
    },
    getReciptData() {
      paperReceiptPrintApi(
        this.$route.query.PJLYMX_ZJ,
        this.$route.query.dbName,
        this.$route.query.X_Token
      ).then((response) => {
        //console.log(response);
        //this.ReceiptTab = response;
        this.tabledata = response.data.listDetail;

        if (this.tabledata.length > 0) {
          switch (this.tabledata.length) {
            case 1:
              for (var i = 0; i < 4; i++) {
                var obj = {};
                this.tabledata.push(obj);
              }
              break;
            case 2:
              for (var i = 0; i < 3; i++) {
                var obj = {};
                this.tabledata.push(obj);
              }
              brea;
            case 3:
              for (var i = 0; i < 2; i++) {
                var obj = {};
                this.tabledata.push(obj);
              }
              break;
            case 4:
              for (var i = 0; i < 1; i++) {
                var obj = {};
                this.tabledata.push(obj);
              }
              break;
          }
        }
        this.formList.payer = response.data.payer; //交款人，
        this.formList.payee = response.data.payee; //收款人
        this.formList.billNum = response.data.billNum; //票据号
        this.formList.year = response.data.year;
        this.formList.month = response.data.month;
        this.formList.day = response.data.day;
        this.tabledata2[0].je = response.data.je; //总金额
        this.formList.remark = response.data.remark; //备注
      });
    },
    //收据打印
    OpenReceipt_Print() {
      this.UpdatebillPrintStatus();
      window.print();
    },
    //打印状态修改
    UpdatebillPrintStatus() {
      updatePrintTimes(this.$route.query.PJLYMX_ZJ).then((response) => {});
    },
  },
  filters: {
    //过滤器
    rounding(value, roundWay, preciseDigit) {
      if (value) {
        if (roundWay == undefined) {
          return value.toFixed(2);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header_wrap {
  margin-top: 50px;
  .title {
    text-align: center;
    font-size: 20px;
  }
  .header {
    width: 100%;
    margin: 30px 0 10px 0;
    float: left;
    font-size: 12px;
    .flex_payer {
      text-align: left !important;
      padding-left: 50px;
    }
    .flex_bill_wrap {
      text-align: left !important;
      padding-left: 50px;
    }
    .flex_p {
      float: left;
      width: 33.3%;
      text-align: center;
    }
  }
}
.bill_message {
  margin-top: 20px;
  font-size: 12px;
  .dw_wrap {
    text-align: left !important;
    padding-left: 50px;
  }
  .skr_wrap {
    text-align: left !important;
    padding-left: 50px;
  }
  .bill_wrap {
    float: left;
    float: left;
    width: 33.3%;
    text-align: center;
  }
}
.table_wrap {
  .rmb_capital {
    float: left;
    /* margin-right: 10%; */
    margin-left: 50px;
    font-size: 12px;
    .rmb_txt {
      margin-left: 20px;
    }
  }
  .rmb_digital {
    float: right;
    /* margin-right: 10%; */
    text-align: left;
  }
  .remart_wrap {
    margin-left: 50px;
    text-align: left;
    .rmb_txt {
      margin-left: 20px;
      font-size: 12px;
    }
  }
  .font_wrap {
    font-size: 12px;
    color: #000;
  }
}
</style>

<style lang="scss">
.ReceiptBody {
  /* 打印css */
  @media print {
    .noprint {
      visibility: hidden;
    }
    .table1 {
      border-right: 1px solid #000 !important;
    }
    .table2 {
      border-right: 1px solid #000 !important;
      border-bottom: 1px solid #000 !important;
    }
    .el-table_1_column_6 {
      //border-top: 1px solid #000 !important;
      border-left: 1px solid #000 !important;
      border-right: 2px solid #000 !important;
    }
    .el-table_1_column_6_column_10 {
      border-right: 2px solid #000 !important;
    }
    .table0 {
      border-right: 2px solid #000 !important;
    }
    .el-table--border {
      border: 1px solid #000 !important;
    }
    .el-table th.is-leaf {
      border: 1px solid #000 !important;
    }
    .el-table tr td {
      //border: 1px solid #000 !important;
    }
  }
  /* 打印去掉页眉页脚 */
  @page {
    size: auto A4 landscape;
    margin: 3mm;
  }
  .ReceiptContent {
    width: 750px;
    margin: 0 auto;
  }
  .buttonAuto {
    margin: 20px auto;
    text-align: center;
  }
  // .el-table td,
  // .el-table th.is-leaf {
  //   border-bottom: 1px solid #000 !important;
  // }
  // .table0 {
  //   border-top: 1px solid #000 !important;
  //   border-left: 1px solid #000 !important;
  //   border-right: 1px solid #000 !important;
  // }
  // .el-table--border td,
  // .el-table--border th,
  // .el-table__body-wrapper
  //   .el-table--border.is-scrolling-left
  //   ~ .el-table__fixed {
  //   border-right: 1px solid #000 !important;
  // }
  // .el-table--border th,
  // .el-table__fixed-right-patch {
  //   border-bottom: 1px solid #000 !important;
  // }
  // .table1 {
  //   border: 1px solid #000 !important;
  // }
  // .table2 {
  //   border-bottom: 1px solid #000;
  //   border-left: 1px solid #000;
  //   border-right: 1px solid #000;
  // }
  .el-table tbody tr:nth-child(even) {
    background: #fff !important;
  }
  .tabRowHeight {
    height: 20px;
    border: none;
  }
  .el-table td,
  .el-table th {
    padding: 4px 0 !important;
    font-size: 12px !important;
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden !important;
  }
}
</style>
