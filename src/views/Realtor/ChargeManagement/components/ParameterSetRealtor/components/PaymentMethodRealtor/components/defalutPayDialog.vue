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
            <el-form-item label="所属项目：" prop="name">
              <el-select v-model="formData.name" @change="PlotChange">
                <el-option
                  v-for="(item, index) in userPlot"
                  :key="index"
                  :value="item.GLCNAME"
                  :label="item.GLCNAME"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="默认收款方式：" prop="defaultMethodName">
              <el-select
                v-model="formData.defaultMethodName"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.SFKM_SKFS"
                  :value="item.SFKM_SKFS"
                  v-if="item.SFKM_SKFS"
                >
                </el-option>
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
  queryPaymentMethodByChargeApi,
  updateDefaultPaymentMethodApi,
} from "@/api/Realtor/ParameterSetRealtor"; //参数设置js
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["currentPlot", "userPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
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
  props: ["showDefalutdialog", "name"],
  watch: {
    showDefalutdialog() {
      this.visible = this.showDefalutdialog;
      if (this.visible) {
        this.formData.name = this.name; //当前选中的小区
        this.userPlot.forEach((item) => {
          if (item.GLCNAME == this.formData.name) {
            this.formData.dbName = item.dbName;
            this.formData.GLCID = item.GLCID;
            this.formData.YXDID = item.YXDID;
            let newRowData = JSON.parse(JSON.stringify(this.formData)); //拷贝一份存储对象
            this.formData = newRowData; //拷贝一份存储对象引用不同地址
            this.$nextTick(() => {
              this.getDefaultPayment();
            });
          }
        });
      }
    },
  },
  methods: {
    getDefaultPayment() {
      queryPaymentMethodByChargeApi(this.formData).then((response) => {
        this.options = response;
        this.options.forEach((item) => {
          if (item.defaultPaymentTerm == 1) {
            this.$set(this.formData, "defaultMethodName", item.SFKM_SKFS);
          }
        });
      });
    },
    getRow(name) {
      this.formData.defaultMethodName = name;
    },
    sureForm() {
      this.$refs.tableForm.validate((valid) => {
        if (valid) {
          updateDefaultPaymentMethodApi(this.formData).then((response) => {
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
    PlotChange(val) {
      //项目名称改变事件
      this.formData.defaultMethodName = "";
      if (val) {
        this.userPlot.forEach((item) => {
          if (item.GLCNAME == val) {
            this.formData.dbName = item.dbName;
            this.formData.GLCID = item.GLCID;
            this.formData.YXDID = item.YXDID;
            let newRowData = JSON.parse(JSON.stringify(this.formData)); //拷贝一份存储对象
            this.formData = newRowData; //拷贝一份存储对象引用不同地址
            this.getDefaultPayment();
          }
        });
      }
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
