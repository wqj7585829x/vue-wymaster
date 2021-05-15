<template>
  <div class="UserDialog table4Popup">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-table
        ref="detailTable"
        :data="tableData"
        height="300"
        border
        style="width: 100%"
      >
        <el-table-column prop="SKMX_SKFYMC" label="收费项目" width="200">
        </el-table-column>
        <el-table-column prop="SKPZ_TZRQ" label="收款日期" width="200">
        </el-table-column>
        <el-table-column prop="SKMX_SKFS" label="收款方式" width="200">
        </el-table-column>
        <el-table-column prop="SKMX_SKJE" label="收款金额" width="200">
        </el-table-column>
        <el-table-column prop="SKMX_SL" label="税率" width="200">
        </el-table-column>
        <el-table-column prop="SKMX_BHSJE" label="不含税金额" width="200">
        </el-table-column>
        <el-table-column prop="SKMX_KPJE" label="开票金额" width="200">
        </el-table-column>
        <el-table-column prop="SKMX_PJH" label="票据号" width="200">
        </el-table-column>
        <el-table-column prop="SKMX_SKZY" label="费用区间" width="200">
        </el-table-column>
        <el-table-column prop="SKMX_BZ" label="备注" width="200">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryReceivedDetails } from "@/api/ReportManagement/QueryReport";
export default {
  data() {
    return {
      visible: this.show,
      title: "已收款明细", //标题
      tableData: [],
      Tshow: false,
      tableRow: [],
      radio: "",
      KHDA_ZJ: "",
      FKGX_ZJ: "",
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
  methods: {
    //   判断新增，修改
    getPartitionData(data) {
      queryReceivedDetails(data).then((response) => {
        this.tableData = response.data;
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
.table4Popup .el-dialog__body {
  padding: 10px !important;
}
</style>
