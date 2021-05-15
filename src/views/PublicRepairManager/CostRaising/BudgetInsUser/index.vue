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
        label="账号"
        prop="HZ_ZH"
        width="200"
        fixed
      ></el-table-column>
      <el-table-column
        label="资源代码"
        prop="HZ_FJID"
        width="200"
      ></el-table-column>
      <el-table-column
        label="客户代码"
        prop="HZ_KHID"
        width="200"
      ></el-table-column>
      <el-table-column
        label="客户名称"
        prop="HZ_KHMC"
        width="150"
      ></el-table-column>
      <el-table-column
        label="可用金额"
        prop="HZ_KYJE"
        width="100"
      ></el-table-column>
      <el-table-column
        label="预算金额"
        prop="YSFT_FTJE"
        width="100"
      ></el-table-column>
      <el-table-column label="差额" prop="QFJE" width="100"></el-table-column>
      <el-table-column label="收费面积" prop="HZ_SFMJ"></el-table-column>
    </el-table>
    <!-- 表格列表end -->
  </div>
</template>
<script>
import { queryUnderbudgetUser } from "@/api/PublicRepairManager/CostRaising"; //费用筹集Api
export default {
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    RecequeryByPage(data) {
      queryUnderbudgetUser(data).then((response) => {
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
