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
        <el-table-column prop="FYZC_ZCLX" label="支出类型" width="200">
        </el-table-column>
        <el-table-column prop="FYZC_XMMC" label="支出项目" width="150">
        </el-table-column>
        <el-table-column prop="FYZC_LQR" label="领取人" width="150">
        </el-table-column>
        <el-table-column prop="FYZC_ZCJE" label="支出金额" width="150">
        </el-table-column>
        <el-table-column prop="FYZC_CNR" label="出纳人" width="150">
        </el-table-column>
        <el-table-column prop="FYZC_ZCRQ" label="支出日期" width="150">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { queryAdvanceMessage } from "@/api/PublicRepairManager/FeeCollection";
export default {
  data() {
    return {
      visible: this.Lshow,
      title: "费用公摊", //标题
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
      queryAdvanceMessage(data).then((response) => {
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
