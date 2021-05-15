<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="作废原因"
      :visible.sync="visible"
      :close-on-click-modal="false"
      class="el-dialog-single"
      @close="$emit('update:obsoleteShow', false)"
    >
      <el-form
        label-width="90px"
        ref="tableForm"
        :model="formList"
        :rules="rules"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="作废人：">
              <span class="TextColor">
                {{ formList.ZFR }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="作废日期：" prop="YCXSF_ZFSJ">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="选择日期"
                v-model="formList.YCXSF_ZFSJ"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="作废原因：" prop="YCXSF_ZFYY">
              <el-input
                type="textarea"
                v-model="formList.YCXSF_ZFYY"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureForm">确 定</el-button>
        <el-button @click="$emit('update:obsoleteShow', false)"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { obsoleteApi } from "@/api/Realtor/SecurityDeposit"; //押金保证金js
import { currDate } from "@/utils/global.js";
import { mapGetters } from "vuex";
export default {
  props: ["clickTreeObjVal", "obsoleteShow"], //显示隐藏资源名称与禁用客户信息,父子传递信息,收费项目
  data() {
    return {
      visible: this.obsoleteShow,
      formList: {},
      detailRow: {}, ////在金税卡及防伪开票数据库中作废已开发票  全局对象
      rules: {
        YCXSF_ZFSJ: [
          { required: true, message: "作废日期不能为空", trigger: "blur" },
        ],
        YCXSF_ZFYY: [
          { required: true, message: "作废原因不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    obsoleteShow() {
      this.visible = this.obsoleteShow;
      if (this.visible) {
        this.formList.YCXSF_ZFSJ = currDate(true);
      }
    },
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
    getNowFormatDate() {
      //获取当前时间
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      this.formList.invalidDay = currentdate;
      return currentdate;
    },
    name() {
      return JSON.parse(sessionStorage.getItem("roleObject"))[0].empPost;
    },
  },
  methods: {
    getObjsoleteRow(data) {
      this.detailRow = data;
      this.formList.ZFR = this.userName;
      this.formList.YCXSF_ZJ = data.YCXSF_ZJ;
      this.formList.dbName = data.dbName;
      this.formList.GLCID = data.GLCID;
      this.formList.YXDID = data.YXDID;
      this.formList = JSON.parse(JSON.stringify(this.formList));
    },
    sureForm() {
      var _this = this;
      this.$refs.tableForm.validate((valid) => {
        if (valid) {
          /**在金税卡及防伪开票数据库中作废已开发票 start*/
          // if (this.detailRow.PJMX_LX == 101) {
          //   if (this.detailRow.PJLYMX_ZZSFPFL == "增值税普通发票") {
          //     this.detailRow.infokind = 2;
          //   } else if (this.detailRow.PJLYMX_ZZSFPFL == "增值税专用发票") {
          //     this.detailRow.infokind = 0;
          //   } else {
          //     this.detailRow.infokind = 1;
          //   }
          //   $.ajax({
          //     type: "post",
          //     url: "http://localhost:8091/api/cancelinv",
          //     data: {
          //       invoice: {
          //         infokind: this.detailRow.infokind,
          //         infotypecode: this.detailRow.PJLYMX_FPDM
          //           ? this.detailRow.PJLYMX_FPDM
          //           : "",
          //         infonumber: this.detailRow.PJLYMX_FPHM
          //           ? this.detailRow.PJLYMX_FPHM
          //           : ""
          //       }
          //     },
          //     success: function(json) {},
          //     error: function() {
          //       // _this.$message({
          //       //   message: "请确认是否开启金税盘?",
          //       //   type: "warning"
          //       // });
          //     }
          //   });
          // }
          obsoleteApi(this.formList, this.detailRow).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              let newobj = JSON.parse(JSON.stringify(this.formList));
              this.$emit("RefreshItem", newobj);
              this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("update:obsoleteShow", false);
      this.$nextTick(() => {
        this.$refs.tableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style scoped>
.el-date-editor.el-input {
  width: 100%;
}
</style>
