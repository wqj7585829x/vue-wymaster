<template>
  <div class="BudgetAllocation">
    <!-- 表格列表start -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="tableContent"
      @row-click="rowClick"
    >
      <!-- <el-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
        </el-table-column> -->
      <el-table-column
        label="维修登记编号"
        prop="YSFT_WXDJNO"
        width="200"
        fixed
      ></el-table-column>
      <el-table-column
        label="项目名称"
        prop="YSFT_XMMC"
        width="200"
      ></el-table-column>
      <el-table-column
        label="资源代码"
        prop="YSFT_FJID"
        width="200"
      ></el-table-column>
      <el-table-column
        label="客户代码"
        prop="YSFT_FJID"
        width="200"
      ></el-table-column>
      <el-table-column
        label="客户名称"
        prop="YSFT_KHMC"
        width="150"
      ></el-table-column>
      <el-table-column label="分摊金额" prop="YSFT_FTJE"></el-table-column>
    </el-table>
    <!-- 表格列表end -->
  </div>
</template>
<script>
import { queryBudgetDistribution } from "@/api/PublicRepairManager/CostRaising"; //费用筹集Api
export default {
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    RecequeryByPage(data) {
      queryBudgetDistribution(data).then((response) => {
        this.tableData = response;
      });
    },
    rowClick(row) {},
  },
};
</script>
<style lang="scss" scoped>
.BudgetAllocation {
  margin: 10px 20px 30px;
}
</style>
