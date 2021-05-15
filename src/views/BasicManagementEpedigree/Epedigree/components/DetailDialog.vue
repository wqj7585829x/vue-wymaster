<template>
  <div class="DetailDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :model="DetailForm"
        :rules="rules"
        ref="DetailForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="档案类型:" prop="file_type_id">
              <el-select v-model="DetailForm.file_type_id" clearable>
                <el-option
                  v-for="(item, index) in FileTypeList"
                  :key="index"
                  :label="item.typeName"
                  :value="item.typeId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="18">
            <el-form-item label="内容:" prop="el_content">
              <el-input
                v-model="DetailForm.el_content"
                placeholder="简要描述内容"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="上传图片:" prop="carCode">
              <el-upload
                id="upload1"
                action="#"
                accept="image/*"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :http-request="uploadAvatar"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
                :on-change="getFile"
                :limit="5"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <el-dialog
                v-dialogDrag
                :visible.sync="dialogVisible"
                :append-to-body="true"
              >
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryFileTypeList,
  addElectronicProFile,
  updateElectronicProFile,
} from "@/api/BasicManagement/Epedigree";
export default {
  data() {
    return {
      visible: this.Detailshow,
      title: "设施设备交接验收明细表", //标题
      categoryList: "",
      rules: {
        file_type_id: [
          { required: true, message: "请选择档案类型", trigger: "blur" },
        ],
        el_content: [
          { required: true, message: "请输入内容", trigger: "blur" },
        ],
      },
      DetailForm: {},
      tableData: [],
      queryResourcePage: {},
      dialogImageUrl: "", //图片弹窗地址
      dialogVisible: false, //图片弹窗默认隐藏
      picList: [],
      fileList: [],
      imgUrlArr: [],
      options: [],
      deleteimg: [],
      allimg: [],
      FileTypeList: [],
    };
  },
  props: {
    Detailshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Detailshow() {
      this.visible = this.Detailshow;
    },
  },
  mounted() {
    queryFileTypeList().then((response) => {
      this.FileTypeList = response;
    });
  },
  methods: {
    //图片上传
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        var img = new Image();
        if (file) {
          reader.readAsDataURL(file);
        }
        reader.onload = (e) => {
          let base64Str = reader.result.split(",")[1];
          img.src = e.target.result;
          // base64地址图片加载完毕后执行
          img.onload = function () {
            // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            // 图片原始尺寸
            var originWidth = this.width;
            var originHeight = this.height;
            // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
            var maxWidth = 500,
              maxHeight = 500;
            // 目标尺寸
            var targetWidth = originWidth,
              targetHeight = originHeight;
            // 图片尺寸超过最大尺寸的限制
            if (originWidth > maxWidth || originHeight > maxHeight) {
              if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更改宽度，按照宽度限定尺寸
                targetWidth = maxWidth;
                targetHeight = Math.round(
                  maxWidth * (originHeight / originWidth)
                );
              } else {
                targetHeight = maxHeight;
                targetWidth = Math.round(
                  maxHeight * (originWidth / originHeight)
                );
              }
            }
            //对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // 清除画布
            context.clearRect(0, 0, targetWidth, targetHeight);
            // 图片压缩
            context.drawImage(img, 0, 0, targetWidth, targetHeight);
            /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/
            //压缩后的base64文件
            var newUrl = canvas.toDataURL("image/jpeg", 0.5);
            resolve(newUrl);
          };
        };
      });
    },
    getFile(file, fileList) {
      //必须--点击马上转base64位
      //图片转base64上传
      var _this = this;
      this.getBase64(file.raw).then((res) => {
        // console.log(res)
        var obj = {};
        obj.uid = file.uid;
        obj.base64Str = res.split(",")[1];
        _this.imgUrlArr.push(obj);
      });
    },
    uploadAvatar(item) {
      //必须
      const formData = new FormData();
      formData.append("file", item.file);
    },
    beforeAvatarUpload(file) {
      //必须
      var imgMsg = /^image\/(jpeg|png|jpg)$/.test(file.type);
      //const isLt2M = file.size / 1024 / 1024 < 2;
      if (!imgMsg) {
        this.$message.error("上传图片格式不对!");
      }
      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 2MB!');
      // }
      return imgMsg;
    },
    handleRemove(file, fileList) {
      //删除图片
      if (file.type === 1) {
        this.deleteimg.push(file.url);
      } else {
        for (const i in this.imgUrlArr) {
          if (this.imgUrlArr[i].uid === file.uid) {
            this.imgUrlArr.splice(i, 1);
          }
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //   判断新增，修改
    getReportData(data, type) {
      this.imgUrlArr = [];
      if (type == 0) {
        this.title = "新增";
        this.fileList = [];
      } else {
        this.title = "修改";

        if (data.el_path) {
          var pic = data.el_path.split(";");
          this.allimg = data.el_path.split(";");
          this.deleteimg = [];
          this.fileList = [];
          pic.forEach((item) => {
            var obj = {};
            obj.url = item; //轮播图片
            obj.type = 1;
            this.fileList.push(obj);
          });
        } else {
          this.fileList = [];
        }
      }
      this.DetailForm = JSON.parse(JSON.stringify(data));
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["DetailForm"].validate((valid) => {
        if (valid) {
          if (this.title === "新增") {
            var arr = [];
            this.imgUrlArr.forEach((item) => {
              arr.push(item.base64Str);
            });
            // console.log(arr)
            let strings = arr.join(",");
            this.$set(this.DetailForm, "file", strings); //base64位
            addElectronicProFile(this.DetailForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.DetailForm));
                this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            var deletearr = [];
            this.deleteimg.forEach((item) => {
              if (item) {
                deletearr.push(item);
              }
            });
            let dstrings = deletearr.join(",");
            this.$set(this.DetailForm, "deleteFile", dstrings); //base64位

            var keepFilearr = [];
            this.allimg.forEach((item) => {
              if (deletearr.indexOf(item) == -1) {
                keepFilearr.push(item);
              }
            });
            let kstrings = keepFilearr.join(",");
            this.$set(_this.DetailForm, "keepFile", kstrings); //base64位

            var arr = [];
            this.imgUrlArr.forEach((item) => {
              arr.push(item.base64Str);
            });
            let strings = arr.join(",");
            this.$set(_this.DetailForm, "addFile", strings); //base64位
            updateElectronicProFile(this.DetailForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.DetailForm));
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("update:Detailshow", false);
      this.$nextTick(() => {
        this.fileList = [];
        this.$refs.DetailForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.DetailDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.DetailDialog .el-input-number {
  width: 100%;
}

.DetailDialog .el-input-number input {
  text-align: left;
}

.DetailDialog .el-dialog .el-row {
  padding: 0;
}

.DetailDialog .el-dialog__body {
  padding: 10px 0;
}

.DetailDialog .el-upload-list--picture-card .el-upload-list__item {
  width: 85px;
  height: 85px;
}

.DetailDialog .el-upload--picture-card {
  width: 85px;
  height: 85px;
  line-height: 83px;
  margin: 0 8px -6px 0;
}
</style>
