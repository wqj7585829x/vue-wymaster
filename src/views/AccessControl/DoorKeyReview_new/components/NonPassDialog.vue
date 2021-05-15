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
      <el-form
        label-width="125px"
        :model="formList"
        :rules="rules"
        ref="ruleForm"
      >
        <el-row>
          <el-col>
            <el-form-item label="审核不通过原因：" prop="RYMJQX_SHYJ">
              <el-input
                type="textarea"
                v-model="formList.RYMJQX_SHYJ"
              ></el-input>
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
import { elupdateEntranceGuardKeyApi } from "@/api/AccessControl/DoorKeyReview"; //门禁钥匙审核
export default {
  data() {
    return {
      visible: this.showNopassdialog,
      formList: {},
      optType: 1, //1审核通过  2审核不通过
      title: "审核不通过",
      rules: {
        RYMJQX_SHYJ: [
          { required: true, message: "不通过原因不能为空", trigger: "blur" },
        ],
      },
    };
  },
  props: ["showNopassdialog"],
  watch: {
    showNopassdialog() {
      this.visible = this.showNopassdialog;
    },
  },
  methods: {
    getData(RYMJQX_ID) {
      this.formList.RYMJQX_ID = RYMJQX_ID;
    },
    // 确定
    sure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          elupdateEntranceGuardKeyApi(this.formList, 2).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$emit("RefreshItem");
              this.cancle();
            }
          });
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
