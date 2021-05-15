<template>
  <div class="TableDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="105px"
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="批次号:" prop="payOrder">
              <el-input v-model="TableForm.payOrder"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="纳税人名称" prop="index">
              <el-select v-model="TableForm.index" @change="changeoption">
                <el-option
                  v-for="(item, index) in ListData"
                  :key="index"
                  :label="item.invoiceObject"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="票据类型:" prop="applyInvoiceType">
              <el-select
                v-model="TableForm.applyInvoiceType"
                @change="applyInvoiceChange"
              >
                <el-option label="纸质" :value="1"></el-option>
                <el-option label="电子" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="增值税发票分类:"
              prop="applyaddedValueTax"
              label-width="105px"
            >
              <el-select
                v-model="TableForm.applyaddedValueTax"
                :disabled="!(lxvalue && TableForm.applyInvoiceType == 1)"
                @change="applyaddedValueTaxChange"
              >
                <el-option label="专票" :value="1"></el-option>
                <el-option label="普票" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item
              label="纳税人识别号:"
              prop="invoiceNsrsbh"
              label-width="105px"
            >
              <el-input
                v-model="TableForm.invoiceNsrsbh"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="开户行及地址:"
              prop="invoiceKhhjzh"
              label-width="105px"
            >
              <el-input
                v-model="TableForm.invoiceKhhjzh"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="地址电话:" prop="invoiceNsrdzdh">
              <el-input
                v-model="TableForm.invoiceNsrdzdh"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="是否部分开票:"
              prop="SFBFXP"
              label-width="105px"
            >
              <el-select v-model="TableForm.SFBFXP">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50" v-if="TableForm.SFBFXP == 1">
          <el-col :span="12">
            <el-form-item label="开票金额:" prop="price" label-width="105px">
              <el-input
                v-model="TableForm.price"
                @change="inputChangePrice"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="tabledetail" v-if="TableForm.SFBFXP == 1">
        <el-table
          ref="singleTable"
          max-height="300"
          :data="tableData"
          border
          :summary-method="getSummaries"
          show-summary
        >
          <el-table-column
            prop="FJDA_FJMC"
            label="房间名称"
            width="150"
            show-overflow-tooltip
            sortable
          >
          </el-table-column>
          <el-table-column prop="KHDA_KHMC" label="客户名称" width="100">
          </el-table-column>
          <el-table-column
            prop="FYSQ_SFXMMC"
            label="收费项目"
            width="140"
            show-overflow-tooltip
            sortable
          >
          </el-table-column>
          <el-table-column prop="FYSQ_QSJE" label="欠收金额"> </el-table-column>
          <el-table-column prop="FYSQ_XPKPYE" label="先票开票余额">
          </el-table-column>
          <el-table-column prop="price" label="开票金额">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.price"
                :precision="scope.row.FYSQ_JQWS"
                :step="mathchange(scope.row.FYSQ_JQWS)"
                :min="0"
                :max="scope.row.FYSQ_XPKPYE"
                :controls="false"
              >
              </el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryInvoiceInformation1,
  uncollectedApplyForBill,
} from "@/api/TicketPayment/Bill";
export default {
  data() {
    return {
      visible: this.show,
      title: "申请开票", //标题
      categoryList: "",
      rules: {
        index: [{ required: true, message: "请选择开票对象", trigger: "blur" }],
        applyInvoiceType: [
          { required: true, message: "请选择票据类型", trigger: "blur" },
        ],
        applyaddedValueTax: [{ required: true, trigger: "blur" }],
        invoiceNsrsbh: [{ required: false, trigger: "blur" }],
        invoiceKhhjzh: [{ required: false, trigger: "blur" }],
        invoiceNsrdzdh: [{ required: false, trigger: "blur" }],
        invoiceNsrdzdh: [{ required: false, trigger: "blur" }],
        payOrder: [{ required: true, trigger: "blur" }],
      },
      TableForm: {},
      tableData: [],
      ListData: [],
      lxvalue: false,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      this.visible = this.show;
    },
  },
  mounted() {},
  methods: {
    inputChangePrice() {
      //开票金额输入框事件
      let priceAmount = this.TableForm.price;
      this.tableData.forEach((item, index) => {
        if (item.FYSQ_XPKPYE) {
          if (item.FYSQ_XPKPYE <= priceAmount) {
            this.$set(item, "price", item.FYSQ_XPKPYE);
          }
          if (item.FYSQ_XPKPYE > priceAmount) {
            this.$set(item, "price", priceAmount);
            if (priceAmount <= 0) {
              this.$set(item, "price", undefined);
            }
          }
          priceAmount = priceAmount - item.FYSQ_XPKPYE;
        }
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        if (index === 1) {
          sums[index] = "";
          return;
        }
        if (index === 2) {
          sums[index] = "";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return this.$math.add(prev, curr);
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    mathchange(val) {
      return parseFloat(Math.pow(0.1, val).toFixed(val));
    },
    applyInvoiceChange(val) {
      if (val == 2) {
        this.$set(this.TableForm, "applyaddedValueTax", 2);
        this.$set(this.rules, "invoiceNsrsbh", [
          { required: false, trigger: "blur" },
        ]);
        this.$set(this.rules, "invoiceKhhjzh", [
          { required: false, trigger: "blur" },
        ]);
        this.$set(this.rules, "invoiceNsrdzdh", [
          { required: false, trigger: "blur" },
        ]);
      } else {
        if (!this.lxvalue) {
          this.$set(this.TableForm, "applyaddedValueTax", 2);
        }
      }
    },
    applyaddedValueTaxChange(val) {
      if (val == 1) {
        this.$set(this.rules, "invoiceNsrsbh", [
          { required: true, trigger: "blur" },
        ]);
        this.$set(this.rules, "invoiceKhhjzh", [
          { required: true, trigger: "blur" },
        ]);
        this.$set(this.rules, "invoiceNsrdzdh", [
          { required: true, trigger: "blur" },
        ]);
      } else {
        this.$set(this.rules, "invoiceNsrsbh", [
          { required: false, trigger: "blur" },
        ]);
        this.$set(this.rules, "invoiceKhhjzh", [
          { required: false, trigger: "blur" },
        ]);
        this.$set(this.rules, "invoiceNsrdzdh", [
          { required: false, trigger: "blur" },
        ]);
      }
    },
    changeoption(index) {
      this.$set(this.TableForm, "invoiceId", this.ListData[index].invoiceId);
      this.$set(
        this.TableForm,
        "invoiceNsrsbh",
        this.ListData[index].invoiceNsrsbh
      );
      this.$set(
        this.TableForm,
        "invoiceKhhjzh",
        this.ListData[index].invoiceKhhjzh
      );
      this.$set(
        this.TableForm,
        "invoiceNsrdzdh",
        this.ListData[index].invoiceNsrdzdh
      );
      this.$set(this.TableForm, "KHDA_ZJ", this.ListData[index].KHDA_ZJ);
    },
    //   判断新增，修改
    getReportData(data) {
      data.forEach((item) => {
        this.$set(item, "price", undefined);
      }); //开票金额输入框重置为空,undefined表示空
      this.tableData = data;
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      var day = now.getDay(); //得到周几
      var hour = now.getHours(); //得到小时
      var minu = now.getMinutes(); //得到分钟
      var sec = now.getSeconds(); //得到秒
      var MS = now.getMilliseconds(); //获取毫秒
      var week;
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;
      if (MS < 100) MS = "0" + MS;
      var time = "";
      time = year + month + date + hour + minu + sec + MS;

      this.lxvalue = false;
      var FYSQ_ZJ = [];
      var KHDA_ZJ = [];
      for (var i in data) {
        FYSQ_ZJ.push(data[i].FYSQ_ZJ);
        KHDA_ZJ.push(data[i].KHDA_ZJ);
        if (data[i].FYSQ_XPKPLX == 1) {
          this.lxvalue = true;
        }
      }
      this.TableForm = {
        index: "",
        FYSQ_ZJ: FYSQ_ZJ.join(","),
        KHDA_ZJ: "",
        applyInvoiceType: "",
        payOrder: time,
        SFBFXP: 0,
      };
      queryInvoiceInformation1({
        KHDA_ZJ: KHDA_ZJ.join(","),
      }).then((response) => {
        this.ListData = response.data;
      });
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (
          !this.TableForm.invoiceNsrsbh &&
          this.TableForm.applyaddedValueTax == 1
        ) {
          this.$message({
            message: "请输入纳税人识别号",
            type: "warning",
          });
          return;
        }
        if (
          !this.TableForm.invoiceKhhjzh &&
          this.TableForm.applyaddedValueTax == 1
        ) {
          this.$message({
            message: "请输入开户行",
            type: "warning",
          });
          return;
        }
        if (
          !this.TableForm.invoiceNsrdzdh &&
          this.TableForm.applyaddedValueTax == 1
        ) {
          this.$message({
            message: "请输入地址",
            type: "warning",
          });
          return;
        }
        if (
          !this.TableForm.invoiceNsrdzdh &&
          this.TableForm.applyaddedValueTax == 1
        ) {
          this.$message({
            message: "请输入电话",
            type: "warning",
          });
          return;
        }
        if (valid) {
          if (this.TableForm.SFBFXP == 1) {
            var data = this.tableData;
            var list = [];
            for (var i in data) {
              if (data[i].price == undefined || data[i].price <= 0) continue;
              else {
                list.push({
                  FYSQ_ZJ: data[i].FYSQ_ZJ,
                  price: data[i].price,
                });
              }
            }
            this.TableForm.list = JSON.stringify(list);
          }
          uncollectedApplyForBill(_this.TableForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              _this.$emit("RefreshItem");
              _this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

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

.TableDialog .tabledetail {
  padding: 10px 20px;
}
</style>
