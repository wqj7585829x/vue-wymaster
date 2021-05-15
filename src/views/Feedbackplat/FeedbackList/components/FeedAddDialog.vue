<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible="dialogFormVisible"
    @close="cancelForm"
    :close-on-click-modal="false"
    class="el-dialog-double"
  >
    <el-form
      label-width="120px"
      :model="formList"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="所属小区:" prop="BMJG_ZJ">
            <el-select
              v-model="formList.BMJG_ZJ"
              placeholder="请选择"
              @change="plotSel"
            >
              <el-option
                v-for="item in PlotLisArray"
                :key="item.BMJG_ZJ"
                :label="item.GLCNAME"
                :value="item.BMJG_ZJ"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="房间号:" prop="room_no">
            <el-input v-model="formList.room_no"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="类别选择：" prop="category_id">
            <el-select
              v-model="formList.category_id"
              placeholder="请选择"
              @change="categorySel"
              @clear="clearCate"
              clearable
            >
              <el-option
                v-for="item in categoryNameOptions"
                :key="item.category_id"
                :label="item.category_name"
                :value="item.category_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="类型选择：" prop="type_id">
            <el-select
              v-model="formList.type_id"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in typeNameOptions"
                :key="item.type_id"
                :label="item.type_name"
                :value="item.type_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="标题:" prop="feedback_title">
            <el-input v-model="formList.feedback_title"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="反馈人电话:" prop="owner_mobile">
            <el-input v-model="formList.owner_mobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="内容:" prop="feedback_content">
            <el-input
              v-model="formList.feedback_content"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="50">
        <el-col :span="24">
          <el-form-item label="图片:" prop="">
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
              :limit="4"
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

      <el-row :gutter="50" v-if="formList.is_repair">
        <el-col :span="12">
          <el-form-item label="报修地址:" prop="repair_address">
            <el-input v-model="formList.repair_address"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="报修人:" prop="repair_person">
            <el-input v-model="formList.repair_person"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="50" v-if="formList.is_repair">
        <el-col :span="12">
          <el-form-item label="报修电话:" prop="repair_mobile">
            <el-input v-model="formList.repair_mobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm()">确 定</el-button>
      <el-button @click="cancelForm()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  PlotLisApi,
  categoryNameOptionsApi,
  typeArryApi,
  addFeedListApi,
} from "@/api/Feedbackplat/FeedbackList";
export default {
  props: ["showdialog"],
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
    },
  },
  data() {
    return {
      title: "",
      imgUrlArr: [],
      dialogFormVisible: this.showdialog,
      OperType: 0, //0 新增  1修改
      formList: {},
      PlotLisArray: [], //小区列表数组
      categoryNameOptions: [], //下拉类别
      typeNameOptions: [], //下拉类型
      dialogImageUrl: "", //图片弹窗地址
      dialogVisible: false, //图片弹窗默认隐藏
      picList: [],
      fileList: [],
      rules: {
        BMJG_ZJ: [
          { required: true, message: "请选择所属小区", trigger: "blur" },
        ],
        category_id: [
          { required: true, message: "请选择类别", trigger: "blur" },
        ],
        type_id: [{ required: true, message: "请选择类型", trigger: "blur" }],
        feedback_title: [
          { required: true, message: "请输入标题", trigger: "blur" },
        ],
        feedback_content: [
          { required: true, message: "请输入内容", trigger: "blur" },
        ],
        repair_address: [
          { required: true, message: "请输入报修地址", trigger: "blur" },
        ],
        // repair_person: [{ required: true, message: "请输入报修人", trigger: "blur" }],
        repair_mobile: [
          { required: true, message: "请输入报修电话", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getTableRow(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址

      this.OperType = type;
      this.PlotLis(); //查询小区列表
      this.categoryNameOptionsArray();
      if (this.OperType == 0) {
        //0：新增  1：修改
        this.title = "新增";
      } else {
        this.title = "修改";
      }
    },
    //查询所有小区
    PlotLis() {
      PlotLisApi().then((response) => {
        this.PlotLisArray = response;
      });
    },
    //下拉小区
    plotSel() {
      this.PlotLisArray.forEach((item) => {
        if (item.BMJG_ZJ === this.formList.BMJG_ZJ) {
          this.formList.GLCID = item.GLCID;
          this.formList.YXDID = item.YXDID;
          this.formList.JT_ZJ = item.JT_ZJ;
          this.formList.db_name = item.db_name;
        }
      });
    },
    //查询类别下拉
    categoryNameOptionsArray() {
      categoryNameOptionsApi().then((response) => {
        this.categoryNameOptions = response;
      });
    },
    //类别下拉选择查询类型
    categorySel() {
      this.$set(this.formList, "type_id", "");
      this.categoryNameOptions.forEach((item) => {
        if (item.category_id === this.formList.category_id) {
          this.formList.category_name = item.category_name;
          this.formList.is_repair = item.is_repair; //判断是否报修1，0位不不保修
        }
      });
      typeArryApi(this.formList.category_id).then((resonse) => {
        this.typeNameOptions = resonse;
      });
    },
    //清空下拉类别清空下拉类型
    clearCate() {
      this.$set(this.formList, "type_id", "");
    },
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
      this.getBase64(file.raw).then((res) => {
        // console.log(res)
        var obj = {};
        obj.uid = file.uid;
        obj.base64Str = res.split(",")[1];
        this.imgUrlArr.push(obj);
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
      for (const i in this.imgUrlArr) {
        if (this.imgUrlArr[i].uid === file.uid) {
          this.imgUrlArr.splice(i, 1);
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let arr = [];
          this.imgUrlArr.forEach((item) => {
            arr.push(item.base64Str);
          });
          // console.log(arr)
          let strings = arr.join();
          this.$set(this.formList, "file", strings); //base64位
          if (this.OperType == 0) {
            //新增
            addFeedListApi(this.formList).then((response) => {
              //新增
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj); //确定后发送$emit绑定父数据
                this.cancelForm();
              }
            });
          } else {
          } //修改
        } else {
          return false;
        }
      });
    },
    cancelForm() {
      //取消关闭
      this.$emit("update:showdialog", false);
      this.$nextTick(function () {
        this.fileList = []; //清空图片
        this.imgUrlArr = []; //清空图片
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
