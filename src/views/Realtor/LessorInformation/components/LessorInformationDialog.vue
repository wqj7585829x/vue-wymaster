<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double ClauseDialog"
      :visible.sync="visible"
      @close="cancelForm"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="105px"
        :model="formList"
        ref="ClauseForm"
        :rules="rules"
      >
        <el-row :gutter="50" style="margin-top: 30px">
          <el-col :span="12">
            <el-form-item label="项目名称：" prop="plotId">
              <el-select
                v-model="formList.plotId"
                @change="changeProjectName"
                :disabled="disableSelect"
              >
                <el-option
                  v-for="item in projectNameData"
                  :key="item.plotId"
                  :value="item.plotId"
                  :label="item.plotName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型：" prop="lessor_type">
              <el-select v-model="formList.lessor_type" @change="changeType">
                <el-option :value="1" label="个人"></el-option>
                <el-option :value="2" label="公司"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" style="margin-top: 30px">
          <el-col :span="12">
            <el-form-item label="名称：" prop="company_name">
              <el-input v-model="formList.company_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人：" prop="legal_representative">
              <el-input v-model="formList.legal_representative"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" style="margin-top: 30px">
          <el-col :span="12">
            <el-form-item label="开户行：" prop="bank_name">
              <el-input v-model="formList.bank_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formList.lessor_type == 2">
            <el-form-item label="纳税人识别号：" prop="taxpayer_identifier">
              <el-input v-model="formList.taxpayer_identifier"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formList.lessor_type == 1">
            <el-form-item label="身份证号：" prop="lessor_identifier">
              <el-input v-model="formList.lessor_identifier"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" style="margin-top: 30px">
          <el-col :span="12">
            <el-form-item label="收款账号：" prop="receivingn_account">
              <el-input v-model="formList.receivingn_account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话：" prop="company_phone">
              <el-input
                v-model="formList.company_phone"
                :min="0"
                :max="99999"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" style="margin-top: 30px">
          <el-col :span="12">
            <el-form-item label="地址：" prop="company_address">
              <el-input
                v-model="formList.company_address"
                :min="0"
                :max="99999"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancelForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  addLessorInformationApi,
  updateLessorInformationApi,
} from "@/api/Realtor/LessorInformation";
import { queryPlotsWithAuthorityApi } from "@/api/Realtor/CalculationClause";
export default {
  props: ["showdialog"],
  data() {
    return {
      visible: this.showdialog,
      rules: [],
      formList: {
        company_name: "",
        legal_representative: "",
        bank_name: "",
        receivingn_account: "",
        taxpayer_identifier: "",
        company_phone: "",
        company_address: "",
        dbName: "",
        plotId: "",
        GLCID: "",
        YXDID: "",
        lessor_type: 1,
        lessor_identifier: "",
      },
      title: "新增",
      projectNameData: [],
      rules: {
        plotId: [
          { required: true, message: "请选择项目名称", trigger: "blur" },
        ],
        company_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ],
        legal_representative: [
          { required: true, message: "请输入法定代表人", trigger: "blur" },
        ],
        bank_name: [
          { required: true, message: "请输入开户行", trigger: "blur" },
        ],
        receivingn_account: [
          { required: true, message: "请输入收款账号", trigger: "blur" },
        ],
        taxpayer_identifier: [
          { required: true, message: "请输入纳税人识别号", trigger: "blur" },
        ],
        lessor_identifier: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        company_phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
        ],
        company_address: [
          { required: true, message: "请输入地址", trigger: "blur" },
        ],
      },
      disableSelect: false, //默认项目名称可以选择
    };
  },
  watch: {
    showdialog() {
      this.visible = this.showdialog;
      if (this.visible) {
        this.queryAuthtorquest(); //项目名称
      }
    },
  },
  methods: {
    getTableRow(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      if (type == 0) {
        this.formList.lessor_type = 1;
        this.title = "新增";
        this.disableSelect = false;
      } else {
        this.title = "修改";
        this.disableSelect = true;
      }

      if (this.formList.lessor_type == 1) {
        this.rules.legal_representative[0].required = false;
        this.rules.bank_name[0].required = false;
        this.rules.company_phone[0].required = false;
        this.rules.company_address[0].required = false;
        this.rules.receivingn_account[0].required = false;
      } else {
        this.rules.legal_representative[0].required = true;
        this.rules.bank_name[0].required = true;
        this.rules.company_phone[0].required = true;
        this.rules.company_address[0].required = true;
        this.rules.receivingn_account[0].required = true;
      }
    },
    queryAuthtorquest() {
      //项目名称
      queryPlotsWithAuthorityApi().then((response) => {
        this.projectNameData = response;
      });
    },
    changeProjectName(val) {
      //项目名称选择
      this.projectNameData.forEach((item) => {
        if (item.plotId == val) {
          this.formList.GLCID = item.GLCID;
          this.formList.YXDID = item.YXDID;
          this.formList.JT_ZJ = item.JT_ZJ;
          this.formList.dbName = item.plotDbName;
        }
      });
    },
    changeType(val) {
      //类型改变
      this.formList.lessor_type = val;
      if (this.formList.lessor_type == 1) {
        this.rules.legal_representative[0].required = false;
        this.rules.bank_name[0].required = false;
        this.rules.company_phone[0].required = false;
        this.rules.receivingn_account[0].required = false;
        this.rules.company_address[0].required = false;
      } else {
        this.rules.legal_representative[0].required = true;
        this.rules.bank_name[0].required = true;
        this.rules.receivingn_account[0].required = true;
        this.rules.company_phone[0].required = true;
        this.rules.company_address[0].required = true;
      }
      let newRowData = JSON.parse(JSON.stringify(this.formList)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
    },
    sure() {
      this.$refs.ClauseForm.validate((valid) => {
        if (valid) {
          if (this.title == "新增") {
            //新增
            addLessorInformationApi(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj);
                this.cancelForm();
              }
            });
          } else {
            updateLessorInformationApi(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj);
                this.cancelForm();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 取消
    cancelForm() {
      this.$emit("update:showdialog", false);
      this.$nextTick(() => {
        this.$refs.ClauseForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style lang="scss">
.ClauseDialog {
  .el-radio-button__inner,
  .el-radio-group {
    width: 400px;
    line-height: 35px;
  }
  .el-radio {
    width: 100px;
  }
  .el-input__inner {
    padding: 0 0 0 15px !important;
  }
}
</style>
