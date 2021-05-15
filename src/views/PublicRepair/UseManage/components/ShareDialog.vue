<template>
  <div class="share">
    <el-dialog
      v-dialogDrag
      title="分摊余额不足的客户"
      class="el-dialog-double"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="$emit('update:showShare', false)"
    >
      <el-row>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          class="tableContent"
        >
          <el-table-column prop="cusName" label="客户名称"></el-table-column>
          <el-table-column
            prop="balance"
            label="余额"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="money"
            label="需分摊金额"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="roomNo"
            label="所属资源"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="buildName"
            label="所属楼栋"
            width="150"
          ></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: this.showShare,
      tableData: [],
    };
  },
  props: {
    showShare: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showShare() {
      this.visible = this.showShare;
    },
  },
  methods: {
    getData(data) {
      this.tableData = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.share /deep/ .el-dialog {
  width: 900px;
}
.tableContent {
  max-height: 400px;
  overflow: auto;
}
</style>
