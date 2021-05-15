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
          <el-form-item label="编号" prop="JGJB_BH">
            <el-input v-model="formList.JGJB_BH"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="级别号：" prop="JGJB_JBH">
            <el-input v-model.number="formList.JGJB_JBH"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="名称：" prop="JGJB_MC">
            <el-input auto-complete="off" v-model="formList.JGJB_MC"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述：" prop="JGJB_MS">
            <el-input
              type="textarea"
              auto-complete="off"
              v-model="formList.JGJB_MS"
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
import {
  addOrgLevel,
  updateOrgLevel,
} from "@/api/Organization/OrganizationLevel";
import { validatecredentialno, validateonlynumber } from "@/utils/validate.js";
export default {
  props: ["showdialog"],
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
    },
  },
  data() {
    var validatejgbh = (rule, value, callback) => {
      if (!validatecredentialno(value)) {
        callback(new Error("只能输入数字或字母"));
      } else {
        callback();
      }
    };
    var validatejgh = (rule, value, callback) => {
      if (value == "" || value == null) {
        callback("请输入级别号");
      } else if (!validateonlynumber(value)) {
        callback(new Error("只能输入数字"));
      } else {
        callback();
      }
    };
    return {
      title: "",
      dialogFormVisible: this.showdialog,
      OperType: 0, //0 新增  1修改
      formList: {},
      rules: {
        JGJB_JBH: [{ required: true, validator: validatejgh, trigger: "blur" }],
        JGJB_MC: [{ required: true, message: "请输入名称", trigger: "blur" }],
        JGJB_BH: [{ validator: validatejgbh, trigger: "blur" }],
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
        this.title = "新增";
      } else {
        this.title = "修改";
      }
    },
    submitForm() {
      console.log(this.formList.JGJB_JBH);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.OperType == 0) {
            addOrgLevel(this.formList).then((response) => {
              //新增
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj); //确定后发送$emit绑定父数据
                this.cancelForm();
              }
            });
          } else {
            updateOrgLevel(this.formList).then((response) => {
              //修改
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj); //确定后发送$emit绑定父数据
                this.cancelForm();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancelForm() {
      //取消关闭
      this.$emit("update:showdialog", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
