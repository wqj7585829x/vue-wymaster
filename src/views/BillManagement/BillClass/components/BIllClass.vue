<!--项目费用-->
<template>
  <div class="CostItem">
    <el-form :label-position="labelPosition" label-width="95px">
      <el-row :gutter="50">
        <el-col :span="10">
          <el-form-item label="票据类型：">
            <span class="TextColor">{{ conventData.SJZJ }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="分类名称：">
            <span class="TextColor">{{ conventData.PJFL_FLMC }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "left",
      conventData: {},
    };
  },
  methods: {
    // 详情数据
    getTableData(data) {
      data.PJFL_FLMC = data.SJZJ === "" ? "" : data.PJFL_FLMC;
      this.conventData = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.CostItem {
  height: 100%;
  width: 100%;
  padding: 10px 10px 0 10px;
}
</style>
<style lang="scss">
@media screen and (min-width: 1366px) {
  .CostItem .el-form-item {
    margin-bottom: 0;
    color: #444444;
  }

  .CostItem .el-form-item__label {
    line-height: 35px;
  }

  .CostItem .el-form {
    border: 1px solid #dedddd;
    padding: 15px;
    width: 90%;
  }

  .CostItem .el-form-item__content {
    font-weight: 700;
  }
}

@media screen and (max-width: 1366px) {
  .CostItem .el-form-item {
    margin-bottom: 0;
    color: #444444;
  }

  .CostItem .el-form-item__label {
    line-height: 35px;
  }

  .CostItem .el-form {
    border: 1px solid #dedddd;
    padding: 15px 10px;
  }

  .CostItem .el-form-item__content {
    font-weight: 700;
  }
}
</style>
