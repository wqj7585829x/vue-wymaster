<template>
  <div class="AdjustmentListDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :Ashow="Ashow"
      :close-on-click-modal="false"
    >
      <el-table
        :data="tableData"
        height="300"
        style="width: 100%"
        :summary-method="getSummaries"
        show-summary
      >
        <el-table-column prop="FJDA_FJID" label="资源代码" width="180">
        </el-table-column>
        <el-table-column prop="FJDA_FJMC" label="资源名称" width="180">
        </el-table-column>
        <el-table-column prop="KHDA_KHID" label="客户代码" width="180">
        </el-table-column>
        <el-table-column prop="FYSQ_SFXMMC" label="收费项目" width="180">
        </el-table-column>
        <el-table-column prop="FYSQ_YSJE" label="应收金额（含税）" width="180">
        </el-table-column>
        <el-table-column prop="FYSQ_YSSL" label="税率" width="180">
        </el-table-column>
        <el-table-column
          prop="FYSQ_YSBHS"
          label="应收金额（不含税）"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="adjustmentDescribe" label="调整说明" width="180">
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="180">
        </el-table-column>
        <el-table-column prop="status" label="调整状态" width="180">
        </el-table-column>
        <el-table-column prop="auditTime" label="调整日期" width="180">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancle">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { previewAdjustmentList } from "@/api/FeeManagement/FeeAdjustment";
export default {
  data() {
    return {
      visible: this.Ashow,
      title: "预览调整清单", //标题
      tableData: [],
    };
  },
  props: {
    Ashow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Ashow() {
      this.visible = this.Ashow;
    },
  },
  mounted() {},
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (
          !values.every((value) => isNaN(value)) &&
          (column.property == "FYSQ_YSJE" || column.property == "FYSQ_YSBHS")
        ) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index].toFixed(2);
          sums[index] += " 元";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    //   判断新增，修改
    getReportData(data) {
      previewAdjustmentList({ adjustmentZj: data.adjustmentZj }).then(
        (response) => {
          this.tableData = response;
        }
      );
    },
    // 取消
    cancle() {
      this.$emit("update:Ashow", false);
    },
  },
};
</script>
<style>
.AdjustmentListDialog .el-input-number {
  width: 100%;
}

.AdjustmentListDialog .el-input-number input {
  text-align: left;
}

.AdjustmentListDialog .tabledetail {
  padding: 0 30px 15px;
}

.AdjustmentListDialog .el-dialog__body {
  padding: 10px !important;
}
</style>
