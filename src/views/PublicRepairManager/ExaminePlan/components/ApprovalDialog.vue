<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form label-width="125px" :model="formList" ref="ruleForm">
        <el-row v-if="optType == 2">
          <el-col>
            <el-form-item label="审核不通过原因：">
              <el-input
                type="textarea"
                v-model="formList.WXFA_SPWTGYY"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="审批备注：">
              <el-input type="textarea" v-model="formList.WXFA_SHBZ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="审批意见：">
              <el-input type="textarea" v-model="formList.WXFA_SPYJ"></el-input>
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
  examinationPassed,
  examinationNotPassed,
} from "@/api/PublicRepairManager/ExaminePlan"; //审核方案
export default {
  data() {
    return {
      visible: this.showNopassdialog,
      formList: {},
      optType: 1, //1审核通过  2审核不通过
      title: "审核通过",
    };
  },
  props: ["showNopassdialog"],
  watch: {
    showNopassdialog() {
      this.visible = this.showNopassdialog;
    },
  },
  methods: {
    getData(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData;
      this.optType = type;
      if (this.optType == 2) {
        this.title = "审核不通过";
      } else {
        this.title = "审核通过";
      }
    },
    // 确定
    sure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.optType == 1) {
            examinationPassed(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem");
                this.cancle();
              }
            });
          } else {
            examinationNotPassed(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem");
                this.cancle();
              }
            });
          }
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:showNopassdialog", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
