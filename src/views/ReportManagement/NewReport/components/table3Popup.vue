<template>
  <div class="UserDialog table3Popup">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div class="tabletitle">系统计算生成列表</div>
      <el-table
        ref="detailTable"
        :data="tableData1"
        height="200"
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
      <div class="tabletitle">调整列表</div>
      <el-table
        ref="detailTable"
        :data="tableData2"
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
import { queryAllReceivableDetailsReportByCondition } from "@/api/ReportManagement/QueryReport";
export default {
  data() {
    return {
      visible: this.show,
      title: "实际应收明细", //标题
      tableData1: [],
      tableData2: [],
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
      queryAllReceivableDetailsReportByCondition(data).then((response) => {
        this.tableData1 = response.data.receivableDetails;
        this.tableData2 = response.data.adjustmentReceivableDetails;
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
.table3Popup .tabletitle {
  text-align: left;
  padding: 8px 15px;
  font-size: 16px;
  color: #333;
}

.table3Popup .el-dialog__body {
  padding: 10px !important;
}
</style>
