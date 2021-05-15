<template>
  <div class="detailDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-table
        ref="singleTable"
        :data="tableData"
        height="450"
        border
        style="width: 100%"
        @row-click="rowclick"
      >
        <el-table-column label="选择" width="50" fixed>
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="PJLYMX_PJH"
          label="票据号"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_PJZT"
          label="票据状态"
          width="100"
        ></el-table-column>
        <el-table-column label="票据类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.PJMX_LX == 101 ? "纸质发票" : "" }}
            {{ scope.row.PJMX_LX == 102 ? "电子发票" : ""
            }}{{ scope.row.PJMX_LX == 201 ? "纸质收据" : ""
            }}{{ scope.row.PJMX_LX == 202 ? "电子收据" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="PJLYMX_KCY" label="可重用" width="110">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.PJLYMX_KCY" disabled></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="打印状态" width="150">
          <template slot-scope="scope">
            {{ scope.row.sfkp == 0 ? "未打印" : "" }}
            {{ scope.row.sfkp == 1 ? "已打印" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="PJLYMX_JE" label="金额"></el-table-column>
        <el-table-column
          prop="PJLYMX_FJID"
          label="资源代码"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_KHMC"
          label="客户名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_SKR"
          label="开票人"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_SKRQ"
          label="开票日期"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_JKR"
          label="交款人"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_PZLB"
          label="凭证类别"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_ZFR"
          label="作废人"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_ZFSJ"
          label="作废时间"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_ZFYY"
          label="作废原因"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_SJFPH"
          label="实际发票号"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_NSRMC"
          label="纳税人名称"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_NSRSBH"
          label="纳税人识别号"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_NSRDZDH"
          label="地址电话"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_KHHJZH"
          label="开户行及账号"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_ZZSFPFL"
          label="增值税发票分类"
          width="150"
        ></el-table-column>
      </el-table>

      <!-- 分页begin -->
      <div class="block" v-if="returnTotal > TableForm.pageSize">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :pager-count="5"
          :page-size="TableForm.pageSize"
          layout="prev, pager, next, jumper"
          :total="returnTotal"
        >
        </el-pagination>
      </div>
      <div v-else style="height: 40px"></div>
      <!-- 分页end -->
      <div class="BillTitle">票据明细</div>
      <el-table
        ref="detailTable"
        :data="tableDetail"
        height="150"
        border
        style="width: 100%"
      >
        <el-table-column prop="PJMX_XH" label="序号" width="150">
        </el-table-column>
        <el-table-column prop="PJMX_SFXMMC" label="收费项目名称" width="150">
        </el-table-column>
        <el-table-column prop="PJMX_SFBZ" label="收费币种" width="150">
        </el-table-column>
        <el-table-column prop="PJMX_SFJE" label="收费金额(含税)" width="150">
        </el-table-column>
        <el-table-column prop="PJMX_ZSJE" label="折算金额(含税)" width="150">
        </el-table-column>
        <el-table-column prop="PJMX_ZY" label="摘要" width="450">
        </el-table-column>
        <el-table-column prop="PJMX_SL" label="税率(%)" width="150">
        </el-table-column>
        <el-table-column prop="PJMX_BHSJE" label="金额(不含税)" width="150">
        </el-table-column>
        <el-table-column prop="PJMX_SE" label="税额" width="150">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="invalid"
          :disabled="invaliddisable"
          v-has="'BillCancelBill_has'"
          >作废
        </el-button>
        <el-button
          type="primary"
          @click="Reuse"
          :disabled="Reusedisable"
          v-has="'BillReuse_has'"
          >重用</el-button
        >
        <el-button
          type="primary"
          @click="print"
          :disabled="printdisable"
          v-has="'BillPrinting_has'"
          >打印</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      title="作废原因"
      :visible.sync="DialogVisible"
      width="30%"
      style="text-align: center"
    >
      <el-date-picker
        class="reason"
        type="date"
        placeholder="作废日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        v-model="invalidTime"
        clearable
      ></el-date-picker>
      <el-input
        class="reason"
        type="textarea"
        :rows="2"
        placeholder="作废原因"
        v-model="invalidval"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="invalidfunc()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryBillBookMessage,
  queryBillMessage,
  queryCancelBill,
  judgmentInvalid,
  queryBillReuse,
  cancelinv,
  submitInvoice,
} from "@/api/FeeManagement/BillManagement";
import { queryInvoiceResultsApi } from "@/api/FeeManagement/CollectionCredentials";
import { getPrintType } from "@/api/FeeManagement/TicketBill"; //票据
import { getToken } from "@/utils/Auth"; // 验权
import { queryBillPrintTypeApi } from "@/api/FeeManagement/TicketBill";
export default {
  data() {
    return {
      visible: this.detailshow,
      title: "票据本明细", //标题
      TableForm: {
        PJLY_ZJ: "",
        pageIndex: 0,
        pageSize: 10,
      },
      currentPage: 1, //当前页
      returnTotal: 10, //总共条数
      tableData: [],
      tableDetail: [],
      radio: "", //单选按钮
      tableRow: {}, //选中数据
      invaliddisable: true,
      Reusedisable: true,
      printdisable: true,
      DialogVisible: false,
      invalidTime: "",
      invalidval: "",
    };
  },
  props: {
    detailshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    detailshow() {
      this.visible = this.detailshow;
    },
  },
  methods: {
    isPJMX_LX(row, column) {
      if (row.PJMX_LX == 101) {
        return "纸质发票";
      } else if (row.PJMX_LX == 102) {
        return "电子发票";
      } else if (row.PJMX_LX == 201) {
        return "纸质收据";
      } else if (row.PJMX_LX == 202) {
        return "电子收据";
      }
    },
    rowclick(row) {
      //单行点击单选按钮选中
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      this.getDetail(row);
    },
    //分页函数
    handleCurrentChange(currentPage) {
      this.TableForm.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = 0;
    },
    //   判断新增，修改
    getPartitionData(data) {
      this.TableForm.PJLY_ZJ = data;
      this.TableForm.pageIndex = 0;
      this.currentPage = 1;
      this.radio = 0;
      this.getTableData();
    },
    // 表数据
    getTableData() {
      queryBillBookMessage(this.TableForm).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.tableRow = this.tableData[0];
        this.getDetail(this.tableData[0]);
      });
    },
    // 表数据
    getDetail(val) {
      if (val.PJLYMX_PJZT == "作废" && !val.PJLYMX_KCY) {
        this.Reusedisable = false;
      } else {
        this.Reusedisable = true;
      }
      if (val.PJLYMX_PJZT == "作废") {
        this.invaliddisable = true;
      } else {
        this.invaliddisable = false;
      }
      if (val.PJLYMX_PJZT == "已用") {
        if (val.PJMX_LX == 201 || val.PJMX_LX == 202) {
          this.printdisable = false;
        } else if (val.PJMX_LX == 101 || val.PJMX_LX == 102) {
          if (val.PJLYMX_SFKP === 5) {
            this.printdisable = true;
          } else {
            this.printdisable = false;
          }
        } else {
          this.printdisable = true;
        }
      } else {
        this.printdisable = true;
      }

      queryBillMessage(val).then((response) => {
        this.tableDetail = response;
      });
    },
    //作废
    invalid() {
      judgmentInvalid(this.tableRow).then((response) => {
        if (response.returnStatus == "FAIL") {
          this.$message({
            message: "往月开具的票据不允许作废！",
            type: "warning",
          });
        } else {
          this.$confirm(
            "请确认是否作废票据" + this.tableRow.PJLYMX_PJH,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              var day = new Date();
              var datatime =
                day.getFullYear() +
                "-" +
                ((day.getMonth() + 1 + "").length == 1
                  ? "0" + (day.getMonth() + 1)
                  : day.getMonth() + 1) +
                "-" +
                ((day.getDate() + "").length == 1
                  ? "0" + day.getDate()
                  : day.getDate());
              this.invalidTime = datatime;
              this.invalidval = "";
              this.DialogVisible = true;
            })
            .catch(() => {
              this.radio = ""; //清空选中
            });
        }
      });
    },
    invalidfunc() {
      if (this.invalidTime == "" || this.invalidTime == null) {
        this.$message.error("没有选择日期，请检查！");
        return;
      }
      if (this.invalidval == "") {
        this.$message.error("没有填写原因，请检查！");
        return;
      }
      this.tableRow.ZFSJ = this.invalidTime;
      this.tableRow.ZFYY = this.invalidval;

      if (this.tableRow.PJMX_LX == 101) {
        var infokind;
        switch (this.tableRow.PJLYMX_ZZSFPFL) {
          case "专用发票":
            infokind = 0;
            break;
          case "普通发票":
            infokind = 2;
            break;
        }
        queryCancelBill(this.tableRow).then((response) => {
          this.DialogVisible = false;
          queryBillBookMessage(this.TableForm).then((response) => {
            this.radio = "";
            this.tableData = response.data;
            this.invaliddisable = true;
          });
        });

        if (this.tableRow.PJLYMX_ZZSFPFL == "增值税普通发票") {
          this.tableRow.infokind = 2;
        } else if (this.tableRow.PJLYMX_ZZSFPFL == "增值税专用发票") {
          this.tableRow.infokind = 0;
        } else {
          this.tableRow.infokind = 1;
        }

        $.ajax({
          type: "post",
          url: "http://localhost:8091/api/cancelinv",
          data: {
            invoice: {
              infokind: this.tableRow.infokind,
              infotypecode: this.tableRow.PJLYMX_FPDM
                ? this.tableRow.PJLYMX_FPDM
                : "",
              infonumber: this.tableRow.PJLYMX_FPHM
                ? this.tableRow.PJLYMX_FPHM
                : "",
            },
          },
          success: function (json) {},
          error: function () {
            // _this.$message({
            //   message: "请确认是否开启金税盘?",
            //   type: "warning"
            // });
          },
        });
      } else {
        queryCancelBill(this.tableRow).then((response) => {
          this.DialogVisible = false;
          queryBillBookMessage(this.TableForm).then((response) => {
            this.radio = "";
            this.tableData = response.data;
            this.invaliddisable = true;
          });
        });
      }
    },
    //重用
    Reuse() {
      this.$confirm("请确认是否将票据设置为可重用？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          queryBillReuse(this.tableRow).then((response) => {
            this.radio = "";
            this.getTableData();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    queryInvoiceRequest() {
      //查询电子发票
      var that = this;
      queryInvoiceResultsApi(this.tableRow.PJLYMX_ZJ).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          clearTimeout(that.timer);
          window.open(`http://${response.data[0].invoiceImageUrl}`);
        } else {
          if (that.count >= 12) {
            clearTimeout(that.timer);
          } else {
            that.timer = setTimeout(function () {
              that.count++;
              that.queryInvoiceRequest();
            }, 5000);
          }
        }
      });
    },
    BillCoverPrint() {
      //收据套打
      var routeData;
      routeData = this.$router.resolve({
        path: "ReceiptPrint/pwy_test_jjshequ_com",
        name: "收据套打",
        //query: this.formList.delId
        //params:{id:params.id}
      });
      window.open(
        routeData.href +
          "?PJLYMX_ZJ=" +
          this.tableRow.PJLYMX_ZJ +
          "&X_Token=" +
          getToken(),
        "_blank"
      ); //新窗口打开页面
    },
    //打印
    print() {
      //打印票据
      var routeData;
      if (this.tableRow.PJMX_LX == 101) {
        routeData = this.$router.resolve({
          path: "Ticket",
          name: "开票预览",
          //query: this.formList.delId
          //params:{id:params.id}
        });
        window.open(
          routeData.href +
            "?PJLYMX_ZJ=" +
            this.tableRow.PJLYMX_ZJ +
            "&X_Token=" +
            getToken(),
          "_blank"
        ); //新窗口打开页面
      } else if (this.tableRow.PJMX_LX == 102) {
        if (this.tableRow.PJLYMX_SFKP == 2) {
          window.open(`http://${this.tableRow.PJLYMX_DZFPURL}`);
        } else {
          this.queryInvoiceRequest();
          // submitInvoice(this.tableRow).then(response => {
          //   if (response.returnStatus == "SUCCESS") {
          //     that.queryInvoiceRequest();
          //   }
          // });
        }
      } else if (this.tableRow.PJMX_LX == 201) {
        getPrintType().then((response) => {
          if (response.orgPrintType) {
            this.BillCoverPrint(); //套打
          } else {
            queryBillPrintTypeApi(this.tableRow.PJLYMX_ZJ).then((response) => {
              if (response.billPrintType == "CommonReceiptTemp") {
                //三明城发纸质收据带表格
                routeData = this.$router.resolve({
                  path: "/ReceiptPrint/smctwy",
                  name: "收据预览",
                });
                window.open(
                  routeData.href +
                    "?PJLYMX_ZJ=" +
                    this.tableRow.PJLYMX_ZJ +
                    "&X_Token=" +
                    getToken(),
                  "_blank"
                ); //新窗口打开页面
              } else if (response.billPrintType == "jindiReceiptTemp") {
                //金帝物业纸质收据带表格
                routeData = this.$router.resolve({
                  path: "/ReceiptPrint/jindiwy",
                  name: "收据预览",
                });
                window.open(
                  routeData.href +
                    "?PJLYMX_ZJ=" +
                    this.tableRow.PJLYMX_ZJ +
                    "&X_Token=" +
                    getToken(),
                  "_blank"
                ); //新窗口打开页面
              } else if (response.billPrintType == "TangrenReceiptTemp") {
                //唐人物业纸质收据不带表格
                routeData = this.$router.resolve({
                  path: "/ReceiptPrint/tangren",
                  name: "收据预览",
                });
                window.open(
                  routeData.href +
                    "?PJLYMX_ZJ=" +
                    this.tableRow.PJLYMX_ZJ +
                    "&X_Token=" +
                    getToken(),
                  "_blank"
                ); //新窗口打开页面
              } else {
                routeData = this.$router.resolve({
                  path: "Receipt",
                  name: "收据预览",
                });
                window.open(
                  routeData.href +
                    "?PJLYMX_ZJ=" +
                    this.tableRow.PJLYMX_ZJ +
                    "&X_Token=" +
                    getToken(),
                  "_blank"
                ); //新窗口打开页面
              }
            });
          }
        });
      } else {
        routeData = this.$router.resolve({
          path: "elReceipt",
          name: "收据预览",
          //query: this.formList.delId
          //params:{id:params.id}
        });
        window.open(
          routeData.href +
            "?PJLYMX_ZJ=" +
            this.tableRow.PJLYMX_ZJ +
            "&X_Token=" +
            getToken(),
          "_blank"
        ); //新窗口打开页面
      }
    },
    // 取消
    cancle() {
      this.$emit("update:detailshow", false);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.block {
  height: 43px;
  text-align: right;
  padding-top: 2px;
}
.BillTitle {
  text-align: left;
  height: 24px;
  line-height: 24px;
  padding-left: 10px;
}
.reason {
  width: 80%;
  margin-top: 15px;
}
</style>

<style>
.TableDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.TableDialog .el-input-number {
  width: 100%;
}

.TableDialog .el-input-number input {
  text-align: left;
}

.detailDialog .el-dialog__body {
  padding-top: 0;
}
</style>
