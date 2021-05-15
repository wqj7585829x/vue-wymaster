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
        <el-table-column prop="FYFT_WXDJNO" label="维修登记编号" width="200">
        </el-table-column>
        <el-table-column prop="FYFT_FJID" label="资源代码" width="150">
        </el-table-column>
        <el-table-column prop="FYFT_KHID" label="客户代码" width="150">
        </el-table-column>
        <el-table-column prop="FYFT_KHMC" label="客户名称" width="150">
        </el-table-column>
        <el-table-column prop="FYFT_ZCXM" label="支出项目" width="150">
        </el-table-column>
        <el-table-column prop="FYFT_FTJE" label="分摊金额" width="150">
        </el-table-column>
        <el-table-column prop="FYFT_ZCRQ" label="支出日期" width="150">
        </el-table-column>
        <el-table-column prop="FYFT_FTRQ" label="分摊日期" width="150">
        </el-table-column>
        <el-table-column prop="FYFT_SFZC" label="支出" width="150">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.FYFT_SFZC"
              :disabled="true"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="FYFT_SFCD" label="传递" width="150">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.FYFT_SFCD"
              :disabled="true"
            ></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { queryCostAllocationList } from "@/api/PublicRepairManager/FeeCollection";
export default {
  data() {
    return {
      visible: this.Lshow,
      title: "费用分摊", //标题
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
      queryCostAllocationList(data).then((response) => {
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
