<template>
  <div class="UserDialog table2Popup">
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
        <el-table-column prop="FYSQ_SSNY" label="所属年月" width="200">
        </el-table-column>
        <el-table-column prop="FYSQ_ZY" label="摘要" width="200">
        </el-table-column>
        <el-table-column prop="FYSQ_SFXMMC" label="收费项目名称" width="200">
        </el-table-column>
        <el-table-column prop="FYSQ_YSJE" label="调整金额（含税）" width="200">
        </el-table-column>
        <el-table-column prop="FYSQ_YSSL" label="税率" width="200">
        </el-table-column>
        <el-table-column
          prop="FYSQ_YSBHS"
          label="调整金额（不含税）"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="FYSQ_TZSM" label="调整说明" width="200">
        </el-table-column>
        <el-table-column prop="FYSQ_SCRQ" label="调整日期" width="200">
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
import { queryAdjustmentReceivableDetailsByCondition } from "@/api/ReportManagement/QueryReport";
export default {
  data() {
    return {
      visible: this.show,
      title: "应收调整费用明细", //标题
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
      queryAdjustmentReceivableDetailsByCondition(data).then((response) => {
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

<style scope>
.table2Popup .el-dialog__body {
  padding: 10px !important;
}
</style>
