<template>
  <div class="CollectionDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :show="show"
      :close-on-click-modal="false"
    >
      <el-form label-width="115px">
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item
              label="开票对象："
              v-if="billData.invoiceObject != undefined"
            >
              <span class="TextColor">{{ billData.invoiceObject }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="开户行："
              v-if="billData.bankAccount != undefined"
            >
              <span class="TextColor">{{ billData.bankAccount }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="收款账号："
              v-if="billData.receiptAccount != undefined"
            >
              <span class="TextColor">{{ billData.receiptAccount }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="合同地址："
              v-if="billData.invoiceContract != undefined"
            >
              <span class="TextColor">{{ billData.invoiceContract }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="纳税人名称："
              v-if="billData.invoiceNsrmc != undefined"
            >
              <span class="TextColor">{{ billData.invoiceNsrmc }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="纳税人识别号："
              v-if="billData.invoiceNsrsbh != undefined"
            >
              <span class="TextColor">{{ billData.invoiceNsrsbh }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="开户行及地址："
              v-if="billData.invoiceKhhjzh != undefined"
            >
              <span class="TextColor">{{ billData.invoiceKhhjzh }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="地址电话："
              v-if="billData.invoiceNsrdzdh != undefined"
            >
              <span class="TextColor">{{ billData.invoiceNsrdzdh }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：" v-if="billData.remark != undefined">
              <span class="TextColor">{{ billData.remark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { queryInvoiceDetaile } from "@/api/TicketPayment/Bill";
export default {
  data() {
    return {
      visible: this.show,
      title: "开票资料", //标题
      tableData: [],
      billData: {},
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
    //   判断新增，修改
    getReportData(data) {
      queryInvoiceDetaile({
        invoiceId: data.applyInvoiceId,
        KHDA_ZJ: data.KHDA_ZJ,
      }).then((response) => {
        this.billData = response.data ? response.data : {};
      });
    },
    // 取消
    cancle() {
      this.$emit("update:show", false);
    },
  },
};
</script>
<style>
.CollectionDialog .el-input-number {
  width: 100%;
}

.CollectionDialog .el-input-number input {
  text-align: left;
}

.CollectionDialog .tabledetail {
  padding: 0 30px 15px;
}
</style>
