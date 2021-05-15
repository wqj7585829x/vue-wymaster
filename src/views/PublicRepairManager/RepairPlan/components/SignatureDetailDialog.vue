<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="业主签字"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="$emit('update:showAcceptdialog', false)"
      :close-on-click-modal="false"
    >
      <el-row>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          class="tableContent"
        >
          <el-table-column
            prop="YZQMJL_FJID"
            label="资源代码"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="YZQMJL_YZMC"
            label="业主签字"
          ></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { queryOwnerSignature } from "@/api/PublicRepairManager/RepairPlan";
export default {
  props: ["showAcceptdialog"],
  data() {
    return {
      visible: this.showAcceptdialog,
      tableData: [],
    };
  },
  watch: {
    showAcceptdialog() {
      this.visible = this.showAcceptdialog;
    },
  },
  methods: {
    getData(WXFA_ZJ) {
      this.getTableList(WXFA_ZJ);
    },
    getTableList(val) {
      queryOwnerSignature(val).then((response) => {
        this.tableData = response;
      });
    },
  },
};
</script>
