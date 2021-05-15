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
        <el-table-column prop="WXDJSJ_CZR" label="操作人" width="250">
        </el-table-column>
        <el-table-column prop="WXDJSJ_CZRQ" label="操作日期" width="250">
        </el-table-column>
        <el-table-column prop="WXDJSJ_WXJD" label="维修进度" width="250">
        </el-table-column>
        <el-table-column prop="WXDJSJ_SJSM" label="事件说明" width="250">
        </el-table-column>
        <el-table-column prop="WXDJSJ_SJLX" label="事件类型" width="250">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { queryOriginalEvents } from "@/api/PublicRepairManager/RepairRegister";
export default {
  data() {
    return {
      visible: this.Rshow,
      title: "登记事件", //标题
      tableData: [],
    };
  },
  props: {
    Rshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Rshow() {
      this.visible = this.Rshow;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data) {
      queryOriginalEvents(data).then((response) => {
        this.tableData = response;
      });
    },
    // 取消
    cancle() {
      this.$emit("update:Rshow", false);
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
