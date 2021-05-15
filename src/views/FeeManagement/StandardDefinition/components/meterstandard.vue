<!--项目费用-->
<template>
  <div class="meter">
    <el-form :label-position="labelPosition" label-width="115px">
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item
            label="标准名称："
            v-if="conventData.ZBBZ_BZMC != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_BZMC }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="收费币种："
            v-if="conventData.ZBBZ_SFBZ != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_SFBZ }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="用量类型："
            v-if="conventData.ZBBZ_YLLX != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_YLLX }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="转表基数："
            v-if="conventData.ZBBZ_ZBJS != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_ZBJS }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="标准代码："
            v-if="conventData.ZBBZ_BZDM != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_BZDM }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="标准单价："
            v-if="conventData.ZBBZ_JNDJ != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_JNDJ }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="表倍率："
            v-if="conventData.ZBBZ_BBL != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_BBL }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="使用计划："
            v-if="conventData.ZBBZ_SYJH != undefined"
          >
            <el-checkbox
              v-model="conventData.ZBBZ_SYJH"
              :disabled="true"
            ></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="按年度计量："
            v-if="conventData.ZBBZ_ANDJL != undefined"
          >
            <el-checkbox
              v-model="conventData.ZBBZ_ANDJL"
              :disabled="true"
            ></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="起计月份："
            v-if="conventData.ZBBZ_QJYF != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_QJYF }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="标准人口数："
            v-if="conventData.ZBBZ_BZRKS != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_BZRKS }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="基数增长值："
            v-if="conventData.ZBBZ_JSZZZ != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_JSZZZ }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="计划用量1："
            v-if="conventData.ZBBZ_JHYL != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_JHYL }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="计外单价1："
            v-if="conventData.ZBBZ_JWDJ1 != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_JWDJ1 }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="计划用量2："
            v-if="conventData.ZBBZ_JWFD1 != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_JWFD1 }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="计外单价2："
            v-if="conventData.ZBBZ_JWDJ2 != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_JWDJ2 }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="计划用量3："
            v-if="conventData.ZBBZ_JWFD2 != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_JWFD2 }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="计外单价3："
            v-if="conventData.ZBBZ_JWDJ3 != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_JWDJ3 }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="分摊损耗计算方式："
            label-width="130px"
            v-if="conventData.ZBBZ_BLJE != undefined"
          >
            <span class="TextColor">{{ conventData.ZBBZ_BLJE }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { queryExpenseItemMeter } from "@/api/FeeManagement/StandardDefinition.js";
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
      queryExpenseItemMeter(data).then((response) => {
        this.conventData = response;
        this.$emit("getData", response);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.meter {
  height: 100%;
  width: 100%;
  padding: 30px 30px 0 30px;
}
</style>
<style>
.meter .el-form-item {
  margin-bottom: 0;
  color: #444444;
}

.meter .el-form-item__label {
  line-height: 35px;
}

.meter .el-form {
  border: 1px solid #dedddd;
  padding: 15px 20px;
}

.meter .el-form-item__content {
  font-weight: 700;
}
</style>
