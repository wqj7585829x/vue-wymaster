<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="DailogTitle"
      :close-on-click-modal="false"
      :visible.sync="visible"
      class="el-dialog-single"
      @close="cancle"
    >
      <el-form
        label-width="120px"
        :model="formData"
        :rules="sureRules"
        ref="tableForm"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="默认收款方式：" prop="defaultMethodName">
              <el-select
                v-model="formData.defaultMethodName"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.SFKM_SKFS"
                  :label="item.SFKM_SKFS"
                  :value="item.SFKM_SKFS"
                  v-if="item.SFKM_SKFS"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureForm">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryDefaultPayment,
  updateDefaultPayment,
} from "@/api/FeeManagement/ParameterSettings";
export default {
  data() {
    return {
      DailogTitle: "设置默认收款方式", //弹窗标题
      radio: "",
      visible: this.showDefalutdialog,
      options: [],
      OperType: 0, //0 新增  1 修改
      formData: {
        SFKM_ZJ: null,
        defaultMethodName: null,
      },
      sureRules: {
        SFKM_SKFSLX: [
          {
            required: true,
            message: "请选择默认收款方式",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    showDefalutdialog: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showDefalutdialog() {
      this.visible = this.showDefalutdialog;
      if (this.visible) {
        this.getDefaultPayment();
      }
    },
  },
  methods: {
    getDefaultPayment() {
      queryDefaultPayment().then((response) => {
        this.options = response;
        this.options.forEach((item) => {
          if (item.isDefault) {
            this.$set(this.formData, "defaultMethodName", item.SFKM_SKFS);
          }
        });
      });
    },
    sureForm() {
      this.$refs.tableForm.validate((valid) => {
        if (valid) {
          updateDefaultPayment(this.formData).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              let newobj = JSON.parse(JSON.stringify(this.formData));
              this.$emit("RefreshItem", newobj);
              this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("update:showDefalutdialog", false);
      this.$nextTick(() => {
        this.$refs.tableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
