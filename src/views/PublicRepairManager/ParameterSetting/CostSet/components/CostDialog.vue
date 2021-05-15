<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="新增"
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
            <el-form-item label="维修金项目：" prop="WXJFYCD_WXJXM">
              <el-input
                auto-complete="off"
                v-model="formList.WXJFYCD_WXJXM"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="费用类别：" prop="WXJFYCD_FYLB">
              <el-select
                v-model="formList.WXJFYCD_FYLB"
                placeholder="请选择"
                @change="fylbChange"
                :disabled="disabledNo"
              >
                <el-option label="常规费用" value="常规费用"></el-option>
                <el-option label="外部导入" value="外部导入"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收费项目：" prop="WXJFYCD_SFXMWJ">
              <el-select
                v-model="formList.WXJFYCD_SFXMWJ"
                placeholder="请选择"
                @change="sfxmChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.SFXM_ZJ"
                  :label="item.SFXM_SFXMMC"
                  :value="item.SFXM_ZJ"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">确 定</el-button>
        <el-button @click="cancelForm()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryCostCategory,
  addCostSet,
  updateCostSet,
} from "@/api/PublicRepairManager/ParameterSetting";
export default {
  props: ["showdialog", "getTreeDialogData"],
  data() {
    return {
      dialogFormVisible: this.showdialog,
      formList: {},
      optType: 1, //1.新增  2.修改
      options: [], //收费项目数据
      disabledNo: false, //默认收费类别可修改
      rules: {
        WXJFYCD_FYLB: [
          { required: true, message: "请选择费用类别", trigger: "blur" },
        ],
        WXJFYCD_SFXMWJ: [
          { required: true, message: "请选择收费项目", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
      if (this.dialogFormVisible) {
      }
    },
  },
  methods: {
    queryOrgan() {
      queryCostCategory(this.formList.WXJFYCD_FYLB).then((response) => {
        this.options = response;
      });
    },
    getData(data, type) {
      this.optType = type;
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.formList.WXJFYCD_ZJ = data.WXJFYCD_ZJ;
      this.formList.WXJFYCD_WXJXM = "公共维修金";
      if (type == 2) {
        this.disabledNo = true;
        this.queryOrgan();
      } else {
        this.disabledNo = false;
      }
    },
    fylbChange() {
      //费用类别选择
      this.formList.WXJFYCD_SFXMWJ = null;
      this.formList = JSON.parse(JSON.stringify(this.formList)); //拷贝一份存储对象
      this.queryOrgan();
    },
    sfxmChange(val) {
      //收费项目选择
      this.options.forEach((item) => {
        if (item.SFXM_ZJ == val) {
          this.formList.WXJFYCD_BZ = item.SFXM_SFXMMC;
        }
      });
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.optType == 1) {
            //新增
            addCostSet(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj);
                this.cancelForm();
              }
            });
          } else {
            updateCostSet(this.formList).then((response) => {
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
    cancelForm() {
      //取消关闭
      //console.log(this)
      this.$emit("update:showdialog", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style lang="scss">
.line-btm {
  border-top: 1px solid #eeeeee;
  margin-bottom: 20px;
}
</style>
