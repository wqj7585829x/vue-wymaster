<template>
  <div class="container">
    <section class="buttonBox">
      <!-- <el-button type="primary">下载模板</el-button> -->
      <el-button
        type="primary"
        icon="el-icon-download"
        @click="downloadModel"
        v-has="'OriginalDataDown_has'"
        >下载模板</el-button
      >
      <el-button
        type="primary"
        @click="showdialog = true"
        v-has="'OriginalDataimport_has'"
        >数据导入</el-button
      >
    </section>
    <div>
      <p class="title">*功能说明:</p>
      <!-- <p class="content">下载模板：下载要导入的数据模板</p> -->
      <p class="content">
        数据导入：选择要导入的数据文件上传（基础原始数据导入、欠费原始数据导入）
      </p>
    </div>
    <DataimportUpload :showdialog.sync="showdialog"></DataimportUpload>
  </div>
</template>
<script>
import config from "@/utils/config";
import DataimportUpload from "./components/DataimportUpload.vue";
import { exportTemplate } from "@/api/SystemMaintain/OriginalDataimport"; //下载模板
export default {
  data() {
    return {
      showdialog: false,
    };
  },
  components: {
    DataimportUpload,
  },
  methods: {
    downloadModel() {
      //下载模板
      var url = config.BASE_API + "/template/BasicDataTemplate.xls";
      var alink = document.createElement("a");
      alink.href = url;
      alink.click();
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  color: #000000;
}

.content {
  margin-left: 60px;
  font-size: 14px;
  color: #888888;
}
</style>
