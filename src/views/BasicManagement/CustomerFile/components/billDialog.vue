<template>
  <div class="typeDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="95px"
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="纳税人名称:" prop="invoiceNsrmc">
              <el-input v-model="TableForm.invoiceNsrmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="识别号:" prop="invoiceNsrsbh">
              <el-input v-model="TableForm.invoiceNsrsbh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="开户行及账号:" prop="invoiceKhhjzh">
              <el-input v-model="TableForm.invoiceKhhjzh"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="地址电话:" prop="invoiceNsrdzdh">
              <el-input v-model="TableForm.invoiceNsrdzdh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="起始日期:" prop="startDate">
              <el-date-picker
                type="date"
                placeholder="选择起始日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="TableForm.startDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="终止日期:" prop="endDate">
              <el-date-picker
                type="date"
                placeholder="选择终止日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="TableForm.endDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="是否提前提醒:" prop="invoiceIsRemind">
              <el-checkbox v-model="TableForm.invoiceIsRemind"></el-checkbox>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="TableForm.invoiceIsRemind">
            <el-form-item label="提前提醒天数:" prop="invoiceRemindDate">
              <el-input v-model="TableForm.invoiceRemindDate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="是否有效:" prop="invoiceIsUsable">
              <el-select v-model="TableForm.invoiceIsUsable">
                <el-option label="无效" :value="0"></el-option>
                <el-option label="有效" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  insertInvoiceInformation,
  updateInvoiceInformation,
  queryPaymentType,
  queryGateName,
} from "@/api/BasicManagement/CustomerFile";
export default {
  data() {
    return {
      visible: this.Tshow,
      title: "", //标题
      TableForm: {
        invoiceIsRemind: "",
      },
      rules: {
        invoiceObject: [
          { required: true, message: "请输入开票对象", trigger: "blur" },
        ],
        invoiceNsrmc: [
          { required: true, message: "请输入纳税人名称", trigger: "blur" },
        ],
        invoiceRemindDate: [{ required: true, trigger: "blur" }],
        invoiceNsrsbh: [{ required: true, trigger: "blur" }],
      },
      tableData: [],
    };
  },
  props: {
    Tshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Tshow() {
      this.visible = this.Tshow;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data, type) {
      if (type == 0) {
        this.title = "新增";
        data.invoiceIsRemind = false;
        data.invoiceIsUsable = 1;
      } else {
        this.title = "修改";
      }
      this.TableForm = JSON.parse(JSON.stringify(data));
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      if (!this.TableForm.invoiceIsRemind) {
        delete this.TableForm.invoiceRemindDate;
      }
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            insertInvoiceInformation(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem", {});
                _this.cancle();
              }
            });
          } else {
            updateInvoiceInformation(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.TableForm));
                _this.$emit("RefreshItem", newobj);
                _this.cancle();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:Tshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.typeDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.typeDialog .el-input-number {
  width: 100%;
}

.typeDialog .el-input-number input {
  text-align: left;
}
</style>
