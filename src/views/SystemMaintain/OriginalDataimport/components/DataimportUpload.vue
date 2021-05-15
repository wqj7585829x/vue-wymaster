<template>
  <div class="DataimportUpload">
    <el-dialog
      v-dialogDrag
      title="选择文件"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancleForm"
      :close-on-click-modal="false"
    >
      <el-form label-width="105px" ref="ruleForm">
        <el-row>
          <el-col :span="24" style="width: 500px">
            <el-form-item label="目录：" prop="fileName">
              <div class="flex-upload">
                <el-input :readonly="true" v-model="fileName"></el-input>
                <el-upload
                  :name="filedata"
                  accept=".xls"
                  :action="UploadUrl()"
                  :before-upload="beforeFileUpload"
                  :show-file-list="false"
                >
                  <el-button type="primary" size="mini">点击上传</el-button>
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="width: 500px">
            <el-form-item label="所属项目ID：" prop="objectID">
              <el-input-number
                controls-position="right"
                :min="0"
                :max="9999"
                size="mini"
                v-model="objectID"
                @change="inputMouseblur"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <span class="picTips"
            >注：项目ID必须严格按照总部下发的项目ID列表设置!</span
          >
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nextBtn" :disabled="disableBtn"
          >下一步</el-button
        >
        <el-button @click="cancleForm">取 消</el-button>
      </div>
    </el-dialog>
    <ConfirmImport
      :showConirmdialog.sync="showConirmdialog"
      @RefreshItem="RefreshList"
      ref="confChildren"
    ></ConfirmImport>
  </div>
</template>
<script>
import config from "@/utils/config";
import ConfirmImport from "./ConfirmImport.vue";
import { fileUpload } from "@/api/SystemMaintain/OriginalDataimport"; //数据导入
export default {
  props: ["showdialog"],
  data() {
    return {
      visible: this.showdialog,
      showConirmdialog: false,
      fileName: "", //文件名称
      objectID: 0, //项目ID
      disableBtn: true, //默认下一步按钮不可点击
      filedata: "filedata",
      formD: {},
    };
  },
  watch: {
    showdialog() {
      this.visible = this.showdialog;
      this.fileName = "";
    },
  },
  methods: {
    beforeFileUpload(file) {
      this.fileName = file.name;
      let fd = new FormData();
      fd.append("filedata", file);
      this.formD = fd;
      if (this.objectID > 0 && this.fileName != "") {
        //判断下一步按钮是否可点击
        this.disableBtn = false;
      } else {
        this.disableBtn = true;
      }
    },
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    inputMouseblur(val) {
      if (val > 0 && this.fileName != "") {
        this.disableBtn = false;
      } else {
        this.disableBtn = true;
      }
    },
    nextBtn() {
      //下一步
      var _this = this;
      fileUpload(this.formD, this.objectID).then((response) => {
        //文件上传
        if (response.returnStatus == "SUCCESS") {
          _this.$alert(response.message, "提示", {
            confirmButtonText: "确定",
            callback: (action) => {
              _this.visible = false;
              _this.showConirmdialog = true;
              _this.$refs.confChildren.getData(this.objectID);
            },
          });
        }
      });
    },
    RefreshList() {
      this.visible = true;
      this.showConirmdialog = false;
    },
    cancleForm() {
      this.fileName = ""; //清空文件名称
      this.objectID = 0;
      this.visible = false;
      this.$emit("update:showdialog", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
  components: {
    ConfirmImport,
  },
};
</script>

<style lang="scss">
.DataimportUpload {
  .flex-upload {
    display: flex;
    .el-input {
      width: 50% !important;
    }
    .el-button {
      margin-left: 10px !important;
    }
  }
  .picTips {
    display: block;
    text-align: left;
    padding-left: 25px;
    margin-top: 50px;
  }
  // .el-input-number.is-controls-right[class*="mini"] [class*="decrease"],
  // .el-input-number.is-controls-right[class*="mini"] [class*="increase"] {
  //   line-height: 15px !important;
  // }
}
</style>
