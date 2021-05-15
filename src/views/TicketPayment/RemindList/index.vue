<template>
  <div class="container">
    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table
        ref="singleTable"
        max-height="480"
        :data="tableData"
        border
        style="width: 40%"
      >
        <el-table-column prop="message" label="消息"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { queryRemindInvoice } from "@/api/TicketPayment/Bill";
export default {
  name: "MonthlyCarList",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      queryRemindInvoice().then((response) => {
        this.tableData = response.data;
      });
    },
  },
};
</script>
<style lang="scss">
.block {
  text-align: right;
}
</style>
