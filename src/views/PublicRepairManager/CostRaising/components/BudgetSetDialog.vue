<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="预算费用"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="125px"
        :model="formList"
        :rules="rules"
        ref="ruleForm"
      >
        <el-row>
          <el-form-item label="" prop="WXDJ_YSFY" label-width="0px;">
            <el-input
              v-model="formList.WXDJ_YSFY"
              @change="inputMouseblur(formList.WXDJ_YSFY)"
            ></el-input>
          </el-form-item>
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
import { budgetSettingForSmallProject } from "@/api/PublicRepairManager/CostRaising"; //费用筹集Api
export default {
  data() {
    return {
      visible: this.showdialog,
      formList: {},
      rules: {
        WXDJ_YSFY: [{ required: true, message: "", trigger: "blur" }],
      },
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
      this.formList = newRowData;
    },
    // 确定
    sure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          budgetSettingForSmallProject(this.formList).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              let newobj = JSON.parse(JSON.stringify(this.formList));
              this.$emit("RefreshItem", newobj);
              this.cancle();
            }
          });
        }
      });
    },
    inputMouseblur(val) {
      var regCount = /^(-?\d+)?$/; //整数
      if (!Number(this.formList.WXDJ_YSFY) && this.formList.WXDJ_YSFY != 0) {
        this.$message({
          message: "" + this.formList.WXDJ_YSFY + "不是有效的数字类型",
          type: "warning",
        });
        this.formList.WXDJ_YSFY = "";
        return false;
      }
      if (this.formList.WXDJ_YSFY) {
        if (Number(this.formList.WXDJ_YSFY) < 0) {
          this.$message({ message: "不能小于0", type: "warning" });
          this.formList.WXDJ_YSFY = "";
          return false;
        }
        // if (!regCount.test(this.formList.WXDJ_YSFY)) {
        //   this.$message({ message: "只能输入整数", type: "warning" });
        //   this.formList.WXDJ_YSFY = "";
        //   return false;
        // }
      }
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
