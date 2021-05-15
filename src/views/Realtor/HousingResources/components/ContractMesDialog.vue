<template>
  <div class="ContractMesDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-table ref="multipleTable" height="405" :data="tableData1" border>
        <el-table-column prop="contractNum" label="合同编号"> </el-table-column>
        <el-table-column prop="roomName" label="房间名称"> </el-table-column>
        <el-table-column prop="KHDA_KHMC" label="客户名称"> </el-table-column>
        <el-table-column prop="rentalArea" label="出租面积"> </el-table-column>
        <el-table-column prop="contractStart" label="合同开始日期">
        </el-table-column>
        <el-table-column prop="contractEnd" label="合同截止日期">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { queryContractMessage } from "@/api/Realtor/Customer";
export default {
  data() {
    return {
      visible: this.Contractshow,
      title: "合同信息查询", //标题
      tableData1: [],
      subscribeDetailId: "",
      subscribeBillId: "",
      multipleSelection: [],
    };
  },
  props: {
    Contractshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Contractshow() {
      this.visible = this.Contractshow;
    },
  },
  methods: {
    getReportData(data) {
      queryContractMessage({
        dbName: data.dbName,
        contractId: data.contractId,
      }).then((response) => {
        this.tableData1 = response.data;
      });
    },
    cancle() {
      this.$emit("update:Contractshow", false);
    },
  },
};
</script>

<style lang="scss" scope>
.ContractMesDialog .el-dialog {
  height: 450px;
  .el-dialog__body {
    padding: 5px;
  }
}
</style>
