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
              <el-select
                v-model="formData.name"
                @change="PlotChange"
                :disabled="disableSelect"
              >
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
              <el-checkbox v-model="formData.SFKM_SFYX">是否有效</el-checkbox>
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
  paymentMethodTypeApi,
  addPaymentMethodApi,
  updatePaymentMethodApi,
} from "@/api/Realtor/ParameterSetRealtor"; //参数设置js
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["currentPlot", "userPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  data() {
    return {
      DailogTitle: "新增", //弹窗标题
      radio: "",
      visible: this.showdialog,
      options: [],
      OperType: 0, //0 新增  1 修改
      formData: {},
      disableSelect: false, //默认所属项目可以选择
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
  props: ["showdialog", "name"],
  watch: {
    showdialog() {
      this.visible = this.showdialog;
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
              this.getPaymentType();
            });
          }
        });
      }
    },
  },
  methods: {
    getPaymentType() {
      paymentMethodTypeApi(this.formData).then((response) => {
        this.options = response;
      });
    },
    getRow(data, type) {
      this.OperType = type;
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formData = newRowData; //拷贝一份存储对象引用不同地址

      if (type == 0) {
        this.formData.SFKM_SFYX = true;
        this.disableSelect = false;
        this.DailogTitle = "新增";
      } else {
        this.disableSelect = true; //修改不可以选择所属项目
        this.DailogTitle = "修改";
      }
    },
    PlotChange(val) {
      //项目名称改变事件
      this.formData.SFKM_SKFSLX = "";
      if (val) {
        this.userPlot.forEach((item) => {
          if (item.GLCNAME == val) {
            this.formData.dbName = item.dbName;
            this.formData.GLCID = item.GLCID;
            this.formData.YXDID = item.YXDID;
            let newRowData = JSON.parse(JSON.stringify(this.formData)); //拷贝一份存储对象
            this.formData = newRowData; //拷贝一份存储对象引用不同地址
            this.$nextTick(() => {
              this.getPaymentType(this.formData);
            });
          }
        });
      }
    },
    sureForm() {
      if (this.OperType == 0) {
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            addPaymentMethodApi(this.formData).then((response) => {
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
            updatePaymentMethodApi(this.formData).then((response) => {
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
