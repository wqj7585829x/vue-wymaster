<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="审批"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form label-width="125px" :model="approvalForm" ref="approvalForm">
        <el-row>
          <el-col>
            <el-form-item label="审批状态：">
              <el-radio-group v-model="approvalForm.approvalStatus">
                <el-radio :label="2">审批通过</el-radio>
                <el-radio :label="3">审批不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="审批不通过原因：">
              <el-input
                type="textarea"
                v-if="approvalForm.approvalStatus == 2"
                disabled
              ></el-input>
              <el-input
                type="textarea"
                v-if="approvalForm.approvalStatus == 3"
                v-model="approvalForm.reason"
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
import { approval } from "@/api/PublicRepair/UseManage"; //js
export default {
  data() {
    return {
      visible: this.showApproval,
      approvalForm: {
        pubProjectID: null,
        approvalStatus: null,
        reason: null,
      },
    };
  },
  props: {
    showApproval: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showApproval() {
      this.visible = this.showApproval;
    },
  },
  methods: {
    getApprovalData(pubProjectID) {
      this.approvalForm.pubProjectID = pubProjectID;
      this.approvalForm.approvalStatus = 2;
      this.approvalForm.reason = null;
    },
    // 确定
    sure() {
      approval(this.approvalForm).then((response) => {
        var data = response.returnData[0];
        if (data.status) {
          this.$emit("RefreshItem");
          this.cancle();
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:showApproval", false);
      this.$nextTick(() => {
        this.$refs.approvalForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
