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
        <el-table-column prop="FYZC_ZCLX" label="支出类型" width="150">
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
import { queryExpenditureList } from "@/api/PublicRepairManager/FeeCollection";
export default {
  data() {
    return {
      visible: this.Hshow,
      title: "费用支出", //标题
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
      queryExpenditureList(data).then((response) => {
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
