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
      <ul>
        <li v-for="item in tableData">{{ item }}</li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import { queryBillBookMessage } from "@/api/FeeManagement/BillManagement";
export default {
  data() {
    return {
      visible: this.Usershow,
      title: "使用人", //标题
      tableData: [],
    };
  },
  props: {
    Usershow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Usershow() {
      this.visible = this.Usershow;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data) {
      this.tableData = data.split(";");
    },
    // 取消
    cancle() {
      this.$emit("update:Usershow", false);
    },
  },
};
</script>

<style scope>
.UserDialog li {
  float: left;
  padding: 10px 15px;
  width: 88px;
}
</style>
