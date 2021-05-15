<template>
  <div class="DataimportUpload">
    <el-dialog
      v-dialogDrag
      title="上传"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancelForm"
    >
      <el-form label-width="105px" :model="formList" ref="ruleForm">
        <el-row>
          <el-upload
            :action="UploadUrl()"
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            multiple
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              :disabled="disabled"
              >上传到服务器</el-button
            >
          </el-upload>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import config from "@/utils/config";
import { uploadFile } from "@/api/BasicManagement/CustomerFile";
export default {
  props: ["showdialogUpload"],
  data() {
    return {
      visible: this.showdialogUpload,
      formList: {},
      fileList: [], //文件组列表
      disabled: true,
    };
  },
  watch: {
    showdialogUpload() {
      this.visible = this.showdialogUpload;
    },
  },
  methods: {
    getTableRow(data, type) {
      //弹窗传递过来参数
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.disabled = true; //默认禁用上传服务器按钮
    },
    submitUpload(file) {
      //上传服务器
      let param = new FormData();
      this.fileList.forEach((file) => {
        param.append("files", file.raw); //append file.raw 上传文件只需维护fileList
        param.append("fileNames", file.name);
      });
      param.append("invoiceId", this.formList.invoiceId);
      //Api接口
      uploadFile(param)
        .then((res) => {
          if (res.returnStatus == "SUCCESS") {
            let newobj = JSON.parse(JSON.stringify(this.formList));
            this.$emit("RefreshItem", newobj);
            this.cancelForm();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onChange(file, fileList) {
      //选取文件change事件
      // console.log(file, fileList);
      this.fileList = fileList;
      if (this.fileList.length) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    handleRemove(file, fileList) {
      //清除文件事件
      // console.log(file, fileList);
      this.fileList = fileList;
      if (this.fileList.length) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    handlePreview(file) {
      //文件预览
      // console.log(file);
    },
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    cancelForm() {
      this.$emit("update:showdialogUpload", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
      this.fileList = []; //重置文件列表
    },
  },
};
</script>

<style lang="scss"></style>
