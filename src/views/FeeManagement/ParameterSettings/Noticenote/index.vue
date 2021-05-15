<template>
  <div class="Noticenote">
    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button type="primary" @click="subForm" v-has="'ParameNoticeSave_has'"
        >确定</el-button
      >
    </div>
    <!-- 按钮end -->
    <div class="content">
      <el-form ref="tableForm">
        <el-row>
          <el-card>
            <div class="el-card-date">备注信息:</div>
            <el-row :gutter="50">
              <el-col :span="24">
                <el-form-item label="报表名称：" prop="selectContent">
                  <!-- formList.agencyType -->
                  <el-select
                    placeholder="请选择"
                    v-model="formList.selectContent"
                  >
                    <!-- 机构级别下拉循环值 -->
                    <el-option
                      :label="formList.selectContent"
                      :value="formList.selectContent"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="50">
              <el-col :span="24">
                <el-input
                  type="textarea"
                  v-model="formList.SFCS_BZX"
                  auto-complete="off"
                ></el-input>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  queryRemarksMessage,
  updateRemarksMessage,
} from "@/api/FeeManagement/ParameterSettings";
export default {
  name: "Noticenote",
  data() {
    return {
      formList: {
        SFCS_BZX: null,
        SFCS_ZJ: null,
        selectContent: null,
      },
    };
  },
  methods: {
    getRowTable() {
      this.getDateObj();
    },
    getDateObj() {
      //获取列表数据
      queryRemarksMessage().then((response) => {
        this.formList.SFCS_ZJ = response.data.SFCS_ZJ;
        this.formList.SFCS_BZX = response.data.SFCS_BZX;
        this.formList.selectContent = response.data.SFCS_CSMC;
      });
    },
    subForm() {
      updateRemarksMessage(this.formList).then((response) => {
        this.getDateObj();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.Noticenote {
  float: right;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 30px 30px 0 30px;
  .el-card-date {
    color: #666;
    font-size: 14px;
    position: absolute;
    top: -10px;
    left: 10px;
    background: #ffffff;
    height: 16px;
    line-height: 16px;
    width: 85px;
  }

  .content {
    display: block;
    margin-top: 50px;
  }
}
</style>
<style lang="scss">
.ChargeDateparam {
  .el-card {
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: inherit;
  }
}
</style>
