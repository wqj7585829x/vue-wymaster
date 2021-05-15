<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="修改"
      class="el-dialog-double TotalReadEntryDialog"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="115px"
        :model="readEntryForm"
        :rules="rules"
        ref="readEntryForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="本月读数：" prop="FTZB_BYDS">
              <el-input
                v-model="readEntryForm.FTZB_BYDS"
                @change="CalChange"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="上月读数：" prop="FTZB_SYDS">
              <el-input
                v-model="readEntryForm.FTZB_SYDS"
                @change="CalChange"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="追加用量：" prop="FTZB_ZJYL">
              <el-input
                v-model="readEntryForm.FTZB_ZJYL"
                @change="CalChange"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="本月行度：" prop="FTZB_BYXD">
              <el-input v-model="readEntryForm.FTZB_BYXD" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="抄表日期：" prop="FTZB_CBRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="readEntryForm.FTZB_CBRQ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="上次抄表日期：" prop="FTZB_SCCBRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="readEntryForm.FTZB_SCCBRQ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="分摊金额：" prop="FTZB_ZBJE">
              <el-input
                type="number"
                v-model="readEntryForm.FTZB_ZBJE"
                :min="1"
                v-on:change="inputMouseblur(readEntryForm)"
                class="numberType"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="转表标志：" prop="BMJG_JCDL">
              <el-checkbox v-model="readEntryForm.FTZB_ZBBZ">是否转表</el-checkbox>
            </el-form-item>
          </el-col> -->
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
  saveSplitInto,
  TotalReadtransferTable,
} from "@/api/FeeManagement/WalkthroughEntry"; //数据录入js

export default {
  data() {
    return {
      visible: this.showEntry,
      readEntryForm: {
        FTZB_BYDS: null,
        FTZB_SYDS: null,
        FTZB_CBRQ: null,
        FTZB_SCCBRQ: null,
        FTZB_ZJ: null,
        ZBBZ_INT: 0,
        FTZB_ZJYL: 0,
        FTZB_BYXD: 0,
      },
      rules: {
        FTZB_ZBJE: [{ required: true, message: "", trigger: "blur" }],
      },
    };
  },
  props: {
    showEntry: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showEntry() {
      this.visible = this.showEntry;
    },
  },
  methods: {
    //修改
    getData(data) {
      if (!data.FTZB_ZJYL) {
        data.FTZB_ZJYL = 0;
      }
      let newData = JSON.parse(JSON.stringify(data));
      this.readEntryForm = newData;
      this.CalChange();
    },
    CalChange() {
      //本月行度计算
      if (!this.readEntryForm.FTZB_BBL) {
        // this.readEntryForm.FTZB_SYDS = 1;
        this.readEntryForm.FTZB_BBL = 0;
      }
      this.readEntryForm.FTZB_BYXD =
        (this.readEntryForm.FTZB_BYDS - this.readEntryForm.FTZB_SYDS) *
          this.readEntryForm.FTZB_BBL +
        Number(this.readEntryForm.FTZB_ZJYL);
    },
    saveCommon() {
      saveSplitInto(this.readEntryForm).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.$emit("RefreshItem");
          this.cancle();
        }
      });
    },
    inputMouseblur(val) {
      //鼠标离开事件
      if (Number(val.FTZB_ZBJE) < 0) {
        this.$message({
          message: "金额不能小于0",
          type: "warning",
        });
        val.FTZB_ZBJE = "";
        return false;
      }
    },
    sure() {
      // 确定
      this.readEntryForm.ZBBZ_INT = 0;
      var that = this;
      if (!this.readEntryForm.FTZB_CBRQ) {
        this.readEntryForm.FTZB_CBRQ = this.getNowFormatDate();
      }
      this.$refs.readEntryForm.validate((valid) => {
        if (valid) {
          if (Number(this.readEntryForm.FTZB_ZBJE) < 0) {
            this.$message({
              message: "金额不能小于0",
              type: "warning",
            });
            this.readEntryForm.FTZB_ZBJE = "";
            return false;
          }
          // if (this.readEntryForm.FTZB_ZBBZ) {
          //   this.readEntryForm.ZBBZ_INT = 1;
          //that.saveCommon();
          // TotalReadtransferTable(this.readEntryForm).then(response => {
          //   that.$nextTick(() => {
          //     that.saveCommon();
          //   });
          // });
          // } else {
          if (
            Number(this.readEntryForm.FTZB_BYDS) <
            Number(this.readEntryForm.FTZB_SYDS)
          ) {
            this.$alert("本月读数小于上月读数,请重新输入", "提示", {
              confirmButtonText: "确定",
              callback: (action) => {},
            });
          } else {
            that.saveCommon();
          }
          // }
        } else {
          return false;
        }
      });
    },
    getNowFormatDate() {
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
      return currentdate;
    },
    // 取消
    cancle() {
      this.$emit("update:showEntry", false);
      this.$nextTick(() => {
        this.$refs.readEntryForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style lang="scss">
.TotalReadEntryDialog {
  .numberType {
    .el-input__inner {
      padding: 0 !important;
      padding-left: 15px !important;
    }
  }
}
</style>
