<!--项目费用-->
<template>
  <div class="Charges">
    <el-form :label-position="labelPosition" label-width="115px">
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item
            label="标准名称："
            v-if="conventData.CGBZ_BZMC != undefined"
          >
            <span class="TextColor">{{ conventData.CGBZ_BZMC }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="收费币种："
            v-if="conventData.CGBZ_SFBZ != undefined"
          >
            <span class="TextColor">{{ conventData.CGBZ_SFBZ }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="定价方式："
            v-if="conventData.CGBZ_DJFS != undefined"
          >
            <span class="TextColor">{{ conventData.CGBZ_DJFS }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="设定金额："
            v-if="
              conventData.CGBZ_SDJE != undefined &&
              conventData.CGBZ_DJFS == '直接设定金额'
            "
          >
            <span class="TextColor">{{ conventData.CGBZ_SDJE }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="参数名称："
            v-if="
              conventData.CGBZ_CSMC != undefined &&
              conventData.CGBZ_DJFS == '设定计算公式'
            "
          >
            <span class="TextColor">{{ conventData.CGBZ_CSMC }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="计算单价："
            v-if="
              conventData.CGBZ_JSDJ != undefined &&
              conventData.CGBZ_DJFS == '设定计算公式'
            "
          >
            <span class="TextColor">{{ conventData.CGBZ_JSDJ }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="计算倍数："
            v-if="
              conventData.CGBZ_JSBS != undefined &&
              conventData.CGBZ_DJFS == '设定计算公式'
            "
          >
            <span class="TextColor">{{ conventData.CGBZ_JSBS }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="相关费种："
            v-if="
              conventData.CGBZ_XGFZ != undefined &&
              conventData.CGBZ_DJFS == '依附于其他费用的金额'
            "
          >
            <span class="TextColor">{{ conventData.CGBZ_XGFZ }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="相关费用："
            v-if="
              conventData.CGBZ_XGFY != undefined &&
              conventData.CGBZ_DJFS == '依附于其他费用的金额'
            "
          >
            <span class="TextColor">{{ conventData.CGBZ_XGFY }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="相关比例："
            v-if="
              conventData.CGBZ_XGBL != undefined &&
              conventData.CGBZ_DJFS == '依附于其他费用的金额'
            "
          >
            <span class="TextColor">{{ conventData.CGBZ_XGBL }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="车辆类型："
            v-if="conventData.type_name != undefined"
          >
            <span class="TextColor">{{ conventData.type_name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="标准代码："
            v-if="conventData.CGBZ_BZDM != undefined"
          >
            <span class="TextColor">{{ conventData.CGBZ_BZDM }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="计内单价"
            v-if="conventData.CGBZ_JNDJ != undefined"
          >
            <span class="TextColor">{{ conventData.CGBZ_JNDJ }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { queryExpenseItemCharges } from "@/api/FeeManagement/StandardDefinition.js";
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
      queryExpenseItemCharges(data).then((response) => {
        this.conventData = response;
        this.$emit("getData", response);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.Charges {
  height: 100%;
  width: 100%;
  padding: 30px 30px 0 30px;
}
</style>
<style>
.Charges .el-form-item {
  margin-bottom: 0;
  color: #444444;
}

.Charges .el-form-item__label {
  line-height: 35px;
}

.Charges .el-form {
  border: 1px solid #dedddd;
  padding: 15px 20px;
}

.Charges .el-form-item__content {
  font-weight: 700;
}
</style>
