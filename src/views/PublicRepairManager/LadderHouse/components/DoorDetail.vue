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
        <el-table-column prop="TFGX_KHMC" label="客户名称" width="250">
        </el-table-column>
        <el-table-column prop="TFGX_FJID" label="房间代码"> </el-table-column>
        <el-table-column prop="TFGX_KHID" label="客户代码"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { queryPerson } from "@/api/PublicRepairManager/LadderHouse";
export default {
  data() {
    return {
      visible: this.Dshow,
      title: "对应户", //标题
      tableData: [],
    };
  },
  props: {
    Dshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Dshow() {
      this.visible = this.Dshow;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data) {
      queryPerson(data).then((response) => {
        this.tableData = response;
      });
    },
    // 取消
    cancle() {
      this.$emit("update:Dshow", false);
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
