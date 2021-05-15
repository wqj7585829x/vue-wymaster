<template>
  <div class="RepairPlanDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancelForm"
      :close-on-click-modal="false"
      id="PlayScrollBody"
    >
      <el-form
        :label-position="labelPosition"
        label-width="145px"
        :model="formList"
        ref="ruleForms"
        :rules="rules"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="维修登记号：" prop="SSGC_WXDJNO">
              <el-input
                type="text"
                v-model="formList.SSGC_WXDJNO"
                :disabled="disableNO"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分项名称：" prop="SSGC_FXMC">
              <el-input
                type="text"
                v-model="formList.SSGC_FXMC"
                @input="changeFValue"
                :maxlength="maxFLe"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="部位：" prop="SSGC_BW">
              <el-input
                type="text"
                v-model="formList.SSGC_BW"
                @input="changeValue"
                ref="ipt"
                :maxlength="maxL"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单价：" prop="SSGC_DJ">
              <el-input
                type="text"
                v-model="formList.SSGC_DJ"
                v-on:change="inputMouseblur(formList.SSGC_DJ)"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="数量：" prop="SSGC_SL">
              <el-input
                type="text"
                v-model="formList.SSGC_SL"
                v-on:change="inputNumber(formList.SSGC_SL)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总价：" prop="SSGC_ZJQ">
              <el-input type="text" v-model="formList.SSGC_ZJQ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="单位：" prop="SSGC_DW">
              <el-input type="text" v-model="formList.SSGC_DW"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="核定：" prop="SSGC_HD">
              <el-input type="text" v-model="formList.SSGC_HD"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" v-if="optType == 1">
          <el-col :span="12">
            <el-form-item label="开始日期：" prop="SSGC_KSRQ">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="选择日期"
                v-model="formList.SSGC_KSRQ"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止日期：" prop="SSGC_JZRQ">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="选择日期"
                v-model="formList.SSGC_JZRQ"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="说明：" prop="SSGC_SM">
              <el-input type="textarea" v-model="formList.SSGC_SM"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureRoom">确 定</el-button>
        <el-button @click="cancelForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  insertBigProjectProgress,
  insertLittleProjectProgress,
  updateBigProjectProgress,
  updateLittleProjectProgress,
} from "@/api/PublicRepairManager/ProjectImplement"; //工程实施Api
import { currDate } from "@/utils/global.js";
import { mapGetters } from "vuex";
import { onlynumberpoint } from "@/utils/validate.js";
export default {
  props: ["showdialog"],
  data() {
    return {
      labelPosition: "left",
      visible: this.showdialog,
      title: "新增",
      formList: {},
      tableData: [], //列表list
      optType: 1, //1新增  2修改
      tabbar: 1, //1大项目 2小项目
      disableNO: false, //默认维修登记号不可修改
      rules: {
        SSGC_WXDJNO: [
          { required: true, message: "请输入维修登记号", trigger: "blur" },
        ],
        SSGC_FXMC: [
          { required: true, message: "请输入分项名称", trigger: "blur" },
        ],
        SSGC_DJ: [{ validator: onlynumberpoint, trigger: "blur" }],
        SSGC_SL: [{ validator: onlynumberpoint, trigger: "blur" }],
        SSGC_ZJQ: [
          { required: true, message: "请输入总价", trigger: "blur" },
          { validator: onlynumberpoint, trigger: "blur" },
        ],
      },
      maxL: 10,
      maxFLe: 20,
    };
  },
  watch: {
    showdialog() {
      this.visible = this.showdialog;
    },
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
    "this.formList.SSGC_ZJQ": function () {},
  },
  methods: {
    // 判断新增，修改
    getData(data, obj, type, tabbar) {
      this.optType = type; //1新增  2修改
      this.tabbar = tabbar; //1大项目 2小项目
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData;
      this.formList.WXDJSJ_CZR = this.userName;
      this.formList.GLCID = obj.GLCID;
      this.formList.YXDID = obj.YXDID;
      this.formList.WXDJ_ZJ = obj.WXDJ_ZJ;
      this.formList.WXFA_ZJ = obj.WXFA_ZJ;
      this.formList.SSGC_XMMC = obj.WXDJ_XMMC;
      this.formList.SSGC_KSRQ = currDate(true);
      this.formList.SSGC_JZRQ = currDate(true);
      this.formList.SSGC_WXDJNO = obj.WXDJ_NO;
      this.formList.SHOW = obj.SHOW;
      if (type == 1) {
        this.title = "新增";
        this.formList.WXFA_BZRQ = currDate(true); //当前日期
      } else {
        this.title = "修改";
        this.disableNO = true;
      }
    },
    getTableList() {
      //查询对应申请单列表
      this.tableParameter.KSRQ = this.daterange[0];
      this.tableParameter.JSRQ = this.daterange[1];
      queryNewRequisition(this.tableParameter).then((response) => {
        this.tableData = response;
      });
    },
    inputMouseblur(val) {
      if (this.formList.SSGC_SL != undefined) {
        this.formList.SSGC_ZJQ = this.formList.SSGC_SL * val;
        this.formList = JSON.parse(JSON.stringify(this.formList));
      }
    },
    inputNumber(val) {
      if (this.formList.SSGC_DJ != undefined) {
        this.formList.SSGC_ZJQ = this.formList.SSGC_DJ * val;
        this.formList = JSON.parse(JSON.stringify(this.formList));
      }
    },
    changeValue() {
      //现在中文输入5个长度  英文10个长度
      let namelen = this.validateTextLength(this.formList.SSGC_BW);
      // console.log("namelen---------" + namelen);
      if (namelen >= 5) {
        let newnameindex = 0;
        let i = 0;
        let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/;
        for (i = 0; i < this.formList.SSGC_BW.length; i++) {
          let mat = this.formList.SSGC_BW[i].match(cnReg);
          newnameindex = newnameindex + (mat ? 1 : 0.5);
          if (newnameindex >= 5) {
            break;
          }
        }
        this.maxL = i + 1;
        // console.log("maxL---------" + this.maxL);
        if (namelen >= 5.5) {
          if (this.maxL > 5) {
            this.formList.SSGC_BW = this.formList.SSGC_BW.substring(
              0,
              this.maxL - 1
            );
          } else {
            this.formList.SSGC_BW = this.formList.SSGC_BW.substring(
              0,
              this.maxL
            );
          }
        }
      } else {
        this.maxL = 10;
      }
    },
    validateTextLength(value) {
      // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
      let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
      let mat = value.match(cnReg);
      let length;
      if (mat) {
        length = mat.length + (value.length - mat.length) * 0.5;
        return length;
      } else {
        return value.length * 0.5;
      }
    },
    changeFValue() {
      let namelen = this.validateTextLength(this.formList.SSGC_FXMC);
      if (namelen >= 10) {
        let newnameindex = 0;
        let i = 0;
        let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/;
        for (i = 0; i < this.formList.SSGC_FXMC.length; i++) {
          let mat = this.formList.SSGC_FXMC[i].match(cnReg);
          newnameindex = newnameindex + (mat ? 1 : 0.5);
          if (newnameindex >= 10) {
            break;
          }
        }
        this.maxFLe = i + 1;
        if (namelen >= 10.5) {
          if (this.maxFLe > 10) {
            this.formList.SSGC_FXMC = this.formList.SSGC_FXMC.substring(
              0,
              this.maxFLe - 1
            );
          } else {
            this.formList.SSGC_FXMC = this.formList.SSGC_FXMC.substring(
              0,
              this.maxFLe
            );
          }
        }
      } else {
        this.maxFLe = 20;
      }
    },
    sureRoom() {
      //提交
      this.$refs.ruleForms.validate((valid) => {
        if (valid) {
          if (this.optType == 1) {
            //新增
            if (this.tabbar == 1) {
              insertBigProjectProgress(this.formList).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  this.cancelForm();
                }
              });
            } else {
              insertLittleProjectProgress(this.formList).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  this.cancelForm();
                }
              });
            }
          } else {
            if (this.tabbar == 1) {
              updateBigProjectProgress(this.formList).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  this.cancelForm();
                }
              });
            } else {
              updateLittleProjectProgress(this.formList).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  this.cancelForm();
                }
              });
            }
          }
        } else {
          return false;
        }
      });
    },
    cancelForm() {
      let newobj = JSON.parse(JSON.stringify(this.formList));
      this.$emit("RefreshItem", newobj, this.tabbar);
      this.$emit("update:showdialog", false);
      this.$nextTick(() => {
        this.$refs.ruleForms.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style lang="scss">
.RepairPlanDialog {
  .el-dialog-double /deep/ .el-dialog {
    width: 1000px;
  }
  .el-dialog-double .el-dialog__body {
    max-height: 750px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-input-group--append .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    color: #000 !important;
  }
  .el-date-editor .el-range-separator {
    padding: 0;
  }
}
</style>
