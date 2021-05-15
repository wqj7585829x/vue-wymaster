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
          <el-form-item label="处理人员:" prop="engineer_id">
            <el-select
              v-model="formList.engineer_id"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in engineer_idoption"
                :key="item.id"
                :label="item.user_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="状态:" prop="urgent_level">
            <el-select
              v-model="formList.urgent_level"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in urgent_leveloptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="注意事项:" prop="attention">
            <el-input v-model="formList.attention" type="textarea"></el-input>
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
import { engineerListApi, FeedPDOkApi } from "@/api/Feedbackplat/FeedbackList";
export default {
  props: ["showdialogPD"],
  watch: {
    showdialogPD() {
      this.dialogFormVisible = this.showdialogPD;
    },
  },
  data() {
    return {
      title: "",
      dialogFormVisible: this.showdialogPD,
      OperType: 0, //0 新增  1修改
      formList: {},
      engineer_idoption: [], //处理人员列表数组
      urgent_leveloptions: [
        { value: 1, label: "紧急" },
        { value: 2, label: "一般" },
      ],
      rules: {
        engineer_id: [
          { required: true, message: "请选择处理人员", trigger: "blur" },
        ],
        urgent_level: [
          { required: true, message: "请选择状态", trigger: "blur" },
        ],
        attention: [
          { required: true, message: "请输入注意事项", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getTableRow(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.OperType = type;
      this.engineerList(); //查询处理人员列表
      if (this.OperType == 0) {
        //0：新增  1：修改
        this.title = "派单";
      } else {
        this.title = "派单";
      }
    },
    engineerList() {
      engineerListApi(this.formList).then((response) => {
        this.engineer_idoption = response;
      });
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          FeedPDOkApi(this.formList).then((response) => {
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
      this.$emit("update:showdialogPD", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
