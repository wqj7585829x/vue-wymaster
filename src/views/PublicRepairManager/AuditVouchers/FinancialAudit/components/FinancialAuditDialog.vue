<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="修改"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form label-width="125px" :model="formList" ref="ruleForm">
        <el-row v-if="optType == 2">
          <el-col>
            <el-form-item label="财务审批人">
              <el-input type="text" v-model="formList.YFPZ_CWSPR"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="财务审核备注：">
              <el-input
                type="textarea"
                v-model="formList.YFPZ_CWSHBZ"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="财务审批意见：">
              <el-input
                type="textarea"
                v-model="formList.YFPZ_CWSPYJ"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="财务审批时间：">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="选择日期"
                v-model="formList.YFPZ_CWSPSJ"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
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
import { updateFinancial } from "@/api/PublicRepairManager/AuditVouchers"; //审核
import { currDate, getCurrMonthFirstDay } from "@/utils/global.js";
export default {
  data() {
    return {
      visible: this.showdialog,
      formList: {},
      optType: 1, //1审核通过  2审核不通过"
    };
  },
  props: ["showdialog"],
  watch: {
    showdialog() {
      this.visible = this.showdialog;
    },
  },
  methods: {
    getData(data) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.formList.YFPZ_ZJ = YFPZ_ZJ; //主键
      this.formList.YFPZ_SPSJ = currDate(true); //当前日期
    },
    // 确定
    sure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          updateFinancial(this.formList).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              let newobj = JSON.parse(JSON.stringify(this.formList));
              this.$emit("RefreshItem", newobj);
              this.cancle();
            }
          });
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:showdialog", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
