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
        <el-table-column prop="HZ_KHMC" label="客户名称" width="250">
        </el-table-column>
        <el-table-column prop="HZ_KHID" label="客户代码" width="250">
        </el-table-column>
        <el-table-column prop="HZ_FJID" label="房间代码"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { queryOriginalDoor } from "@/api/PublicRepairManager/RepairRegister";
export default {
  data() {
    return {
      visible: this.Hshow,
      title: "所属户", //标题
      tableData: [],
    };
  },
  props: {
    Hshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Hshow() {
      this.visible = this.Hshow;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data) {
      queryOriginalDoor(data).then((response) => {
        this.tableData = response;
      });
    },
    // 取消
    cancle() {
      this.$emit("update:Hshow", false);
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
