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
            <el-form-item label="验收编号：" prop="GCYS_YSBH">
              <el-input type="text" v-model="formList.GCYS_YSBH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="验收情况" prop="GCYS_YSQK">
              <el-input type="text" v-model="formList.GCYS_YSQK"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="初次验收时间：" prop="GCYS_CCYSSJ">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="选择日期"
                v-model="formList.GCYS_CCYSSJ"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最终验收时间" prop="GCYS_ZZYSSJ">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="选择日期"
                v-model="formList.GCYS_ZZYSSJ"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="说明：" prop="GCYS_SM">
              <el-input type="textarea" v-model="formList.GCYS_SM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="验收结论：" prop="GCYS_YSJR">
              <el-input type="textarea" v-model="formList.GCYS_YSJR"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="是否合格:" prop="GCYS_SFHG">
              <el-checkbox v-model="formList.GCYS_SFHG"></el-checkbox>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="验收人:" prop="GCYS_YSR" label-width="125px">
              <el-input
                v-model="formList.GCYS_YSR"
                @input="changeValue"
                :maxlength="maxL"
              ></el-input>
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
  bigProjectDeliveryAcceptance,
  littleProjectDeliveryAcceptance,
  updateAcceptanceProject,
  updateAcceptanceLittleProject,
  getGenNumber,
} from "@/api/PublicRepairManager/ProjectImplement"; //工程实施Api
import { currDate } from "@/utils/global.js";
import { mapGetters } from "vuex";
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
        GCYS_YSBH: [
          { required: true, message: "请输入验收编号", trigger: "blur" },
        ],
        GCYS_YSJR: [
          { required: true, message: "请输入验收结论", trigger: "blur" },
        ],
      },
      maxL: 10,
    };
  },
  watch: {
    showdialog() {
      this.visible = this.showdialog;
    },
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
  methods: {
    // 判断新增，修改
    getData(data, obj, type, tabbar) {
      this.optType = type; //1新增  2修改
      this.tabbar = tabbar; //1大项目 2小项目
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData;
      this.formList.GLCID = obj.GLCID;
      this.formList.YXDID = obj.YXDID;
      this.formList.WXDJ_ZJ = obj.WXDJ_ZJ;
      this.formList.SSGC_XMMC = obj.WXDJ_XMMC;
      this.formList.WXDJ_NO = obj.WXDJ_NO;
      if (type == 1) {
        this.title = "新增";
        this.formList.GCYS_CCYSSJ = currDate(true); //当前日期
        this.formList.GCYS_ZZYSSJ = currDate(true); //当前日期
        this.formList.GCYS_SFHG = true;
        this.formList.GCYS_YSR = this.userName;
        this.getGenNumbers();
      } else {
        this.title = "修改";
        this.disableNO = true;
        this.formList.GCYS_YSR = this.formList.GCYS_YSR;
        this.formList.GCYS_YSBH = obj.WXDJ_NO;
      }
      this.formList = JSON.parse(JSON.stringify(this.formList));
    },
    getTableList() {
      //查询对应申请单列表
      this.tableParameter.KSRQ = this.daterange[0];
      this.tableParameter.JSRQ = this.daterange[1];
      queryNewRequisition(this.tableParameter).then((response) => {
        this.tableData = response;
      });
    },
    getGenNumbers() {
      //新增时获取验收编号
      getGenNumber().then((response) => {
        this.formList.GCYS_YSBH = response.num;
        this.formList = JSON.parse(JSON.stringify(this.formList));
      });
    },
    changeValue() {
      //现在中文输入5个长度  英文10个长度
      var i, sum;
      sum = 0;
      for (i = 0; i < this.formList.GCYS_YSR.length; i++) {
        if (
          this.formList.GCYS_YSR.charCodeAt(i) >= 0 &&
          this.formList.GCYS_YSR.charCodeAt(i) <= 255
        ) {
          sum = sum + 1;
        } else {
          sum = sum + 2;
        }
      }
      if (sum >= 10) {
        this.maxL = 5;
      } else {
        this.maxL = 10;
      }
    },
    sureRoom() {
      //提交
      this.$refs.ruleForms.validate((valid) => {
        if (valid) {
          if (this.optType == 1) {
            //新增
            if (this.tabbar == 1) {
              bigProjectDeliveryAcceptance(this.formList).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  let newobj = JSON.parse(JSON.stringify(this.formList));
                  this.$emit("RefreshItem", newobj, this.tabbar);
                  this.cancelForm();
                }
              });
            } else {
              littleProjectDeliveryAcceptance(this.formList).then(
                (response) => {
                  if (response.returnStatus == "SUCCESS") {
                    let newobj = JSON.parse(JSON.stringify(this.formList));
                    this.$emit("RefreshItem", newobj, this.tabbar);
                    this.cancelForm();
                  }
                }
              );
            }
          } else {
            if (this.tabbar == 1) {
              updateAcceptanceProject(this.formList).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  let newobj = JSON.parse(JSON.stringify(this.formList));
                  this.$emit("RefreshItem", newobj, this.tabbar);
                  this.cancelForm();
                }
              });
            } else {
              updateAcceptanceLittleProject(this.formList).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  let newobj = JSON.parse(JSON.stringify(this.formList));
                  this.$emit("RefreshItem", newobj, this.tabbar);
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
