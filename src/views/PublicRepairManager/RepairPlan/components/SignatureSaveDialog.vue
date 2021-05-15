<template>
  <div class="SignatureSaveDialog">
    <el-dialog
      v-dialogDrag
      title="业主签字"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancelForm"
      :close-on-click-modal="false"
    >
      <el-row>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          max-height="500"
          tooltip-effect="dark"
          highlight-current-row
          ref="multipleTable"
          class="table-bill-model"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            label="客户代码"
            prop="HZ_FJID"
            width="250"
          ></el-table-column>
          <el-table-column label="客户名称" prop="HZ_KHMC"></el-table-column>
        </el-table>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveForm">确 定</el-button>
        <el-button @click="cancelForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryOwnerList,
  saveOwnerSignature,
} from "@/api/PublicRepairManager/RepairPlan";
export default {
  props: ["showsingSavedialog"],
  data() {
    return {
      visible: this.showsingSavedialog,
      tableData: [],
      multipleSelection: [],
      WXFA_ZJ: null, //维修方案主键
    };
  },
  watch: {
    showsingSavedialog() {
      this.visible = this.showsingSavedialog;
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData(WXFA_ZJ) {
      this.WXFA_ZJ = WXFA_ZJ;
      this.getTableList(WXFA_ZJ);
    },
    getTableList(val) {
      queryOwnerList(val).then((response) => {
        this.tableData = response;
      });
    },
    saveForm() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: "warning",
          message: "请选择客户签名",
        });
        return false;
      }
      saveOwnerSignature(this.WXFA_ZJ, this.multipleSelection).then(
        (response) => {
          this.$emit("RefreshItem");
          this.cancelForm();
        }
      );
    },
    cancelForm() {
      this.$emit("update:showsingSavedialog", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.SignatureSaveDialog {
}
</style>
