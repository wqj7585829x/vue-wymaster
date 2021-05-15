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
        <el-row>
          <el-col>
            <el-form-item label="审核不通过原因：">
              <el-input type="textarea" v-model="formList.FJSH_JGSM"></el-input>
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
import { auditNoPass } from "@/api/BasicManagement/RoomManager"; //房间管理
export default {
  data() {
    return {
      visible: this.showNopassdialog,
      formList: {},
      optType: 1, //1审核通过  2审核不通过
      title: "审核不通过",
      newList: [],
    };
  },
  props: ["showNopassdialog"],
  watch: {
    showNopassdialog() {
      this.visible = this.showNopassdialog;
    },
  },
  methods: {
    getData(list) {
      // this.formList.FJSH_ZJ = FJSH_ZJ;
      this.newList = list;
    },
    // 确定
    sure() {
      var arr = [];
      this.newList.forEach((item) => {
        var obj = {};
        obj.FJSH_ZJ = item.FJSH_ZJ;
        obj.FJSH_JGSM = this.formList.FJSH_JGSM;
        arr.push(obj);
      });
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          auditNoPass(arr).then((response) => {
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
