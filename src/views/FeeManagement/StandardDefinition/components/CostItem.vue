<!--项目费用-->
<template>
  <div class="CostItem">
    <el-form :label-position="labelPosition" label-width="115px">
      <el-row :gutter="50">
        <el-col :span="12" v-if="conventData.SFXM_FYLB != undefined">
          <el-form-item label="费用类别：">
            <span class="TextColor">{{ conventData.SFXM_FYLB }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="conventData.SFXM_JQWS != undefined">
          <el-form-item label="精确位数：">
            <span class="TextColor">{{ conventData.SFXM_JQWS }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="conventData.SFXM_QZFS != undefined">
          <el-form-item label="取整方式：">
            <span class="TextColor">{{ conventData.SFXM_QZFS }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="conventData.SFXM_SFXMMC != undefined">
          <el-form-item label="收费项目名称：">
            <span class="TextColor">{{ conventData.SFXM_SFXMMC }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="conventData.SFXM_SFYX != undefined">
          <el-form-item label="是否有效：">
            <el-checkbox
              v-model="conventData.SFXM_SFYX"
              :disabled="true"
            ></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="conventData.SFXM_SFCWF != undefined">
          <el-form-item label="是否车位费：">
            <el-checkbox
              v-model="conventData.SFXM_SFCWF"
              :disabled="true"
            ></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="conventData.SFXM_SL != undefined">
          <el-form-item label="税率：">
            <span class="TextColor">{{ conventData.SFXM_SL }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="conventData.SFXM_SFXMYWMC != undefined">
          <el-form-item label="开票类型：">
            <span class="TextColor" v-if="conventData.SFXM_SFXMYWMC == 2"
              >收据</span
            >
            <span class="TextColor" v-if="conventData.SFXM_SFXMYWMC == 1"
              >发票</span
            >
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="conventData.SFXM_SFXMDM != undefined">
          <el-form-item label="收费项目代码：">
            <span class="TextColor">{{ conventData.SFXM_SFXMDM }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="conventData.SFXM_ZSMC != undefined">
          <el-form-item label="项目归类:">
            <span class="TextColor">{{ conventData.SFXM_ZSMC }}</span>
          </el-form-item>
        </el-col>
        <el-col
          :span="12"
          v-if="
            conventData.SFXM_KMBZ != undefined && conventData.SFXM_SFXMYWMC == 1
          "
        >
          <el-form-item label="发票编码：">
            <span class="TextColor">{{ conventData.SFXM_KMBZ }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { queryExpenseItem } from "@/api/FeeManagement/StandardDefinition.js";
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
      if (data) {
        queryExpenseItem(data).then((response) => {
          this.conventData = response;
          this.$emit("getData", response);
        });
      } else {
        this.conventData = [];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.CostItem {
  height: 100%;
  width: 100%;
  padding: 30px 30px 0 30px;
}
</style>
<style>
.CostItem .el-form-item {
  margin-bottom: 0;
  color: #444444;
}

.CostItem .el-form-item__label {
  line-height: 35px;
}

.CostItem .el-form {
  border: 1px solid #dedddd;
  padding: 15px 20px;
}

.CostItem .el-form-item__content {
  font-weight: 700;
}
</style>
