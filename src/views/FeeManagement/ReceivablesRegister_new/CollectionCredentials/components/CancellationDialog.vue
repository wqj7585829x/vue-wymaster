<template>
  <el-dialog
    v-dialogDrag
    title="作废"
    :visible="dialogFormVisible"
    class="el-dialog-single"
    @close="cancelForm"
    :close-on-click-modal="false"
  >
    <el-form label-width="90px" :model="formList" :rules="rules" ref="ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="作废人：">
            <span class="text-left TextColor">{{ userName }}</span>
          </el-form-item>
          <el-form-item label="作废日期：" prop="SKPZ_ZFSJ">
            <el-date-picker
              type="date"
              :editable="false"
              placeholder="选择日期"
              v-model="formList.SKPZ_ZFSJ"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="作废原因：" prop="SKPZ_ZFYY">
            <el-input
              type="textarea"
              placeholder=""
              v-model="formList.SKPZ_ZFYY"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancelForm">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  destroyPaying,
  getCancelParamProveApi,
} from "@/api/FeeManagement/CollectionCredentials"; //收款凭证作废Api
import { mapGetters } from "vuex";
import { currDate } from "@/utils/global.js";
export default {
  props: ["showdialog", "CancelPop"],
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
      if (this.dialogFormVisible) {
        this.isArr = 0;
        this.formList.SKPZ_ZFSJ = currDate(true);
      }
    },
  },
  data() {
    return {
      dialogFormVisible: this.showdialog,
      formList: {
        SKPZ_ZFSJ: "",
        SKPZ_ZFYY: "",
        type: "",
      },
      tableRow: {}, //在金税卡及防伪开票数据库中作废已开发票  全局对象
      parameData: [], //作废参数数据
      rules: {
        SKPZ_ZFYY: [
          { required: true, message: "请输入作废原因", trigger: "blur" },
        ],
      },
      selectType: 1, //1按资源 2按客户
    };
  },
  methods: {
    getData(FKGX_ZJ, SKPZ_ZJ, data, type) {
      var pjzj = "";
      var pjlymx = "";
      this.formList.FKGX_ZJ = FKGX_ZJ; //房客关系主键
      this.formList.SKPZ_ZJ = SKPZ_ZJ; //收款凭证主键
      this.formList.type = type;
      if (data.length > 0) {
        data.forEach((item) => {
          pjzj += item.PJLYMX_ZJ + ",";
          pjlymx += item.PJLYMX_LX + ",";
        });
        pjzj = pjzj.substring(0, pjzj.length - 1);
        pjlymx = pjzj.substring(0, pjlymx.length - 1);
        this.formList.PJLYMX_ZJ = pjzj;
        this.formList.PJLYMX_LX = pjlymx;
      }
      let newRowData = JSON.parse(JSON.stringify(this.formList)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.getParmRequest(SKPZ_ZJ); //查询作废参数
    },
    getParmRequest(val) {
      //查询作废参数
      getCancelParamProveApi(val).then((response) => {
        this.parameData = response;
      });
    },
    submitForm() {
      //确定弹窗
      var _this = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.parameData.length > 0) {
            this.parameData.forEach((item) => {
              if (item.PJMX_LX == 101) {
                if (item.PJLYMX_ZZSFPFL == "增值税普通发票") {
                  this.tableRow.infokind = 2;
                } else if (item.PJLYMX_ZZSFPFL == "增值税专用发票") {
                  this.tableRow.infokind = 0;
                } else {
                  this.tableRow.infokind = 1;
                }
                $.ajax({
                  //金税盘作废
                  type: "post",
                  url: "http://localhost:8091/api/cancelinv",
                  data: {
                    invoice: {
                      infokind: this.tableRow.infokind,
                      infotypecode: item.PJLYMX_FPDM ? item.PJLYMX_FPDM : "",
                      infonumber: item.PJLYMX_FPHM ? item.PJLYMX_FPHM : "",
                    },
                  },
                  success: function (json) {},
                  error: function () {},
                });
              }
            });
          }
          this.$nextTick(() => {
            destroyPaying(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("PopCancelEmit", newobj);
                this.cancelForm();
              }
            });
          });
        }
      });
    },
    cancelForm() {
      //关闭取消弹窗
      this.$emit("update:showdialog", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
};
</script>
