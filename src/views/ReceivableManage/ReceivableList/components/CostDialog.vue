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
          <el-form-item label="收费项目：" prop="SFXM_ZJ">
            <el-select
              v-model="formList.SFXM_ZJ"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in ChargeItemsArray"
                :key="item.SFXM_ZJ"
                :label="item.SFXM_SFXMMC"
                :value="item.SFXM_ZJ"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="计算单价：" prop="unitPrice">
            <el-input-number
              v-model="formList.unitPrice"
              :controls="false"
              style="width: 100%"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="开始年月：" prop="startMonth">
            <el-date-picker
              v-model="formList.startMonth"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              placeholder="请选择"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="截止年月：" prop="endMonth">
            <el-date-picker
              v-model="formList.endMonth"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              placeholder="请选择"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm(1)">生成应收</el-button>
      <el-button type="primary" @click="submitForm(2)">删除应收</el-button>
      <el-button @click="cancelForm()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  ChargeItemsArrayListApi,
  costCalculationApi,
} from "@/api/ReceivableManage/ReceivableList";
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
      dialogFormVisible: this.showdialog,
      OperType: 0, //0 新增  1修改
      formList: {},
      ChargeItemsArray: [], //收费项目
      rules: {
        SFXM_ZJ: [{ required: true, message: "", trigger: "blur" }],
        unitPrice: [{ required: true, message: "", trigger: "blur" }],
        startMonth: [{ required: true, message: "", trigger: "blur" }],
        endMonth: [{ required: true, message: "", trigger: "blur" }],
      },
    };
  },
  methods: {
    getTableRow(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      console.log(newRowData);
      // this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.ChargeItemsArrayList(); //收费项目列表
      this.OperType = type;
      if (this.OperType == 0) {
        //0：新增  1：修改
        this.title = "";
      } else {
        this.title = "计算应收";
      }
    },
    ChargeItemsArrayList() {
      //收费项目列表
      ChargeItemsArrayListApi().then((response) => {
        this.ChargeItemsArray = response;
      });
    },
    submitForm(operation) {
      //生成应收
      if (this.formList.startMonth > this.formList.endMonth) {
        this.$message({ type: "warning", message: "开始日期不能大于结束日期" });
        return;
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ChargeItemsArray.forEach((item) => {
            if (this.formList.SFXM_ZJ == item.SFXM_ZJ) {
              this.formList.SFXM_SL = item.SFXM_SL;
              this.formList.SFXM_SFXMMC = item.SFXM_SFXMMC;
            }
          });
          if (this.OperType == 0) {
          } else {
            costCalculationApi(this.formList, operation).then((response) => {
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
