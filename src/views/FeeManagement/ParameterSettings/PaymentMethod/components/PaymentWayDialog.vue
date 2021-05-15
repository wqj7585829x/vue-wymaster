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
            <el-form-item label="收款方式类型：" prop="SFKM_SKFSLX">
              <el-select v-model="formData.SFKM_SKFSLX" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.paymentMethodType"
                  :label="item.paymentMethodType"
                  :value="item.paymentMethodType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item
              label="收款方式："
              placeholder="请输入收款方式"
              prop="SFKM_SKFS"
            >
              <el-input
                auto-complete="off"
                v-model="formData.SFKM_SKFS"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否有效：" prop="SFKM_SFYX">
              <el-checkbox v-model="formData.SFKM_SFYX"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>
                    <el-col :span="24">
                        <el-form-item label="备注：">
                            <el-input type="textarea" v-model="formData.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>-->
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
  queryPaymentType,
  AddPaymentWay,
  UpdatePaymentWay,
} from "@/api/FeeManagement/ParameterSettings";
export default {
  data() {
    return {
      DailogTitle: "新增", //弹窗标题
      radio: "",
      visible: this.showdialog,
      options: [],
      OperType: 0, //0 新增  1 修改
      formData: {
        SFKM_ZJ: null,
        SFKM_SKFSLX: null,
        SFKM_SKFS: null,
        SFKM_SFYX: true,
      },
      sureRules: {
        SFKM_SKFSLX: [
          {
            required: true,
            message: "请选择收款方式类型",
            trigger: "blur",
          },
        ],
        SFKM_SKFS: [
          {
            required: true,
            message: "收款方式不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    showdialog: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showdialog() {
      this.visible = this.showdialog;
      if (this.visible) {
        this.getPaymentType();
      }
    },
  },
  methods: {
    getPaymentType() {
      queryPaymentType().then((response) => {
        this.options = response;
      });
    },
    getRow(data, type) {
      let newData = JSON.parse(JSON.stringify(data));
      this.formData = newData;
      this.OperType = type;
      if (type == 0) {
        this.DailogTitle = "新增";
        this.formData.SFKM_SFYX = true;
      } else {
        this.DailogTitle = "修改";
      }
    },
    sureForm() {
      if (this.OperType == 0) {
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            AddPaymentWay(this.formData).then((response) => {
              let newobj = JSON.parse(JSON.stringify(this.formData));
              this.$emit("RefreshItem", newobj);
              this.cancle();
            });
          } else {
            return false;
          }
        });
      } else {
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            UpdatePaymentWay(this.formData).then((response) => {
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
      }
    },
    cancle() {
      this.$emit("update:showdialog", false);
      this.$nextTick(() => {
        this.$refs.tableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
