<template>
  <div class="UserDialog">
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
        <el-table-column prop="TB_TBH" label="梯编号" width="250">
        </el-table-column>
        <el-table-column prop="TB_TMC" label="梯名称"> </el-table-column>
        <el-table-column prop="TB_TWZ" label="梯位置"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { queryOriginalLadder } from "@/api/PublicRepairManager/RepairRegister";
export default {
  data() {
    return {
      visible: this.Lshow,
      title: "所属梯", //标题
      tableData: [],
    };
  },
  props: {
    Lshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Lshow() {
      this.visible = this.Lshow;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data) {
      queryOriginalLadder(data).then((response) => {
        this.tableData = response;
      });
    },
    // 取消
    cancle() {
      this.$emit("update:Lshow", false);
    },
  },
};
</script>

<style>
.UserDialog li {
  float: left;
  padding: 10px 15px;
  width: 88px;
}
</style>
