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
        <el-table-column prop="FYFT_FTJE" label="支出金额" width="150">
        </el-table-column>
        <el-table-column prop="HZ_KHMC" label="客户名称" width="150">
        </el-table-column>
        <el-table-column prop="QFJE" label="欠交金额" width="150">
        </el-table-column>
        <el-table-column prop="HZ_KHID" label="客户代码" width="150">
        </el-table-column>
        <el-table-column prop="FYFT_SFCD" label="传递" width="150">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.FYFT_SFCD"
              :disabled="true"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="HZ_ZH" label="账号" width="150">
        </el-table-column>
        <el-table-column prop="HZ_SFMJ" label="收费面积" width="150">
        </el-table-column>
        <el-table-column prop="HZ_FJID" label="资源代码" width="150">
        </el-table-column>
        <el-table-column prop="HZ_YKYJE" label="原可用金额" width="150">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { queryInsufficientFunds } from "@/api/PublicRepairManager/FeeCollection";
export default {
  data() {
    return {
      visible: this.Rshow,
      title: "费用不足用户", //标题
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
      queryInsufficientFunds(data).then((response) => {
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
