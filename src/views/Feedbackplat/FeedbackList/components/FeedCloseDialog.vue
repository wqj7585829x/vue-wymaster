<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible="dialogFormVisible"
    @close="cancelForm"
    :close-on-click-modal="false"
    class="el-dialog-single"
  >
    <el-form
      label-width="120px"
      :model="formList"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="状态:" prop="closestatus">
            <el-select
              v-model="formList.closestatus"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关单说明:" prop="close_remark">
            <el-input
              v-model="formList.close_remark"
              type="textarea"
            ></el-input>
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
import { FeedCloseOkApi } from "@/api/Feedbackplat/FeedbackList";
export default {
  props: ["showdialogClose"],
  watch: {
    showdialogClose() {
      this.dialogFormVisible = this.showdialogClose;
    },
  },
  data() {
    return {
      title: "",
      dialogFormVisible: this.showdialogClose,
      OperType: 0, //0 新增  1修改
      formList: {},
      categoryNameOptions: [], //下拉类别
      typeNameOptions: [], //下拉类型
      dialogVisible: false, //图片弹窗默认隐藏
      options: [
        { value: 3, label: "正常关单" },
        { value: 4, label: "非正常关单" },
      ],
      rules: {
        closestatus: [
          { required: true, message: "请选择状态", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getTableRow(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.OperType = type;
      if (this.OperType == 0) {
        //0：新增  1：修改
        this.title = "关单";
      } else {
        this.title = "关单";
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          FeedCloseOkApi(this.formList).then((response) => {
            //新增
            if (response.returnStatus == "SUCCESS") {
              let newobj = JSON.parse(JSON.stringify(this.formList));
              this.$emit("RefreshItem", newobj); //确定后发送$emit绑定父数据
              this.cancelForm();
            }
          });
        } else {
          return false;
        }
      });
    },
    cancelForm() {
      //取消关闭
      this.$emit("update:showdialogClose", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
