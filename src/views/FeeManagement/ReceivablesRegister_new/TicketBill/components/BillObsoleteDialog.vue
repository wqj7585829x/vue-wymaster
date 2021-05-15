<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="票据号作废"
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
            <el-form-item label="作废人：" label-width="100px">
              <span class="text-left">
                {{ formList.ZFR }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="作废日期：" prop="ZFSJ">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="选择日期"
                v-model="formList.ZFSJ"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="作废原因：" prop="ZFYY">
              <el-input type="textarea" v-model="formList.ZFYY"></el-input>
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
// import { confirmCancellation } from "@/api/Home/Home"; //票据
import { confirmCancellation } from "@/api/FeeManagement/TicketBill"; //票据
import { currDate } from "@/utils/global.js";
export default {
  props: ["clickTreeObjVal", "obsoleteShow"], //显示隐藏资源名称与禁用客户信息,父子传递信息,收费项目
  data() {
    return {
      visible: this.obsoleteShow,
      formList: {},
      rules: {
        ZFYY: [
          { required: true, message: "作废原因不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    obsoleteShow() {
      this.visible = this.obsoleteShow;
      if (this.visible) {
        this.formList.ZFSJ = currDate(true);
      }
    },
  },
  computed: {
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
    getObjsoleteRow(data, ZFR, GLCID, YXDID, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.formList.ZFR = ZFR;
      if (type == 1) {
        //1按资源 2按客户
        this.formList.GLCID = this.clickTreeObjVal.data.GLCID;
        this.formList.YXDID = this.clickTreeObjVal.data.YXDID;
      } else {
        this.formList.GLCID = GLCID;
        this.formList.YXDID = YXDID;
      }
    },
    sureForm() {
      var _this = this;
      this.$refs.tableForm.validate((valid) => {
        if (valid) {
          /**在金税卡及防伪开票数据库中作废已开发票 start*/
          if (this.formList.PJMX_LX == 101) {
            if (this.formList.PJLYMX_ZZSFPFL == "增值税普通发票") {
              this.formList.infokind = 2;
            } else if (this.formList.PJLYMX_ZZSFPFL == "增值税专用发票") {
              this.formList.infokind = 0;
            } else {
              this.formList.infokind = 1;
            }

            $.ajax({
              type: "post",
              url: "http://localhost:8091/api/cancelinv",
              data: {
                invoice: {
                  infokind: this.formList.infokind,
                  infotypecode: this.formList.PJLYMX_FPDM
                    ? this.formList.PJLYMX_FPDM
                    : "",
                  infonumber: this.formList.PJLYMX_FPHM
                    ? this.formList.PJLYMX_FPHM
                    : "",
                },
              },
              success: function (json) {},
              error: function () {
                // _this.$message({
                //   message: "请确认是否开启金税盘?",
                //   type: "warning"
                // });
              },
            });
          }
          confirmCancellation(this.formList).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$emit("RefreshItem");
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
