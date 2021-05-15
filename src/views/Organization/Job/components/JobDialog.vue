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
          <el-form-item label="职位名称：" prop="jobTitle">
            <el-input
              auto-complete="off"
              v-model="formList.jobTitle"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="formList.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="职位说明：" prop="jobDescription">
            <el-input
              type="textarea"
              auto-complete="off"
              v-model="formList.jobDescription"
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
import { organInsertPost, organModifyPost } from "@/api/Organization/Job";
export default {
  props: ["showdialog", "getTreeDialogData"],
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
    },
  },
  data() {
    return {
      title: "",
      dialogFormVisible: this.showdialog,
      OperType: 0, //0 新增  1修改
      formList: {},
      rules: {
        jobTitle: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
    };
  },
  methods: {
    getTableRow(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.OperType = type;
      if (this.OperType == 0) {
        this.title = "新增";
      } else {
        this.title = "修改";
      }
    },
    submitForm() {
      if (this.OperType == 0) {
        //新增
        this.formList.agencyType = this.getTreeDialogData.agencyType;
        this.formList.depId = this.getTreeDialogData.orgId;
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.OperType == 0) {
            organInsertPost(this.formList).then((response) => {
              //新增
              if (response.returnData[0].status) {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("poplist", newobj); //确定后发送$emit绑定父数据
                this.cancelForm();
              }
            });
          } else {
            organModifyPost(this.formList).then((response) => {
              //修改
              if (response.returnData[0].status) {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("poplist", newobj); //确定后发送$emit绑定父数据
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
