<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="修改"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="115px"
        :model="walkEntryForm"
        :rules="rules"
        ref="walkEntryForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="资源代码：">
              <span class="TextColor">{{ walkEntryForm.ZBJS_FJID }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="客户名称：">
              <span class="TextColor">{{ walkEntryForm.KHDA_KHMC }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="录入日期：" prop="ZBJS_LRRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="walkEntryForm.ZBJS_LRRQ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="上次录入日期：" prop="ZBJS_SCLRRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="walkEntryForm.ZBJS_SCLRRQ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" v-if="SelectType == 1">
          <el-col :span="12">
            <el-form-item label="本月读数：" prop="ZBJS_BYDS">
              <el-input v-model="walkEntryForm.ZBJS_BYDS"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="上月读数：" prop="ZBJS_SYDS">
              <el-input v-model="walkEntryForm.ZBJS_SYDS"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" v-if="SelectType == 2">
          <el-col :span="12">
            <el-form-item label="本月行度：" prop="ZBJS_BYXD">
              <el-input v-model="walkEntryForm.ZBJS_BYXD"></el-input>
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
  saveTableRead,
  transferTable,
  saveForInputQuantity,
} from "@/api/FeeManagement/WalkthroughEntry"; //数据录入js

export default {
  data() {
    var validatebyds = (rule, value, callback) => {
      if (value > this.walkEntryForm.ZBJS_ZBJS) {
        callback(new Error("表读数不能大于转表基数"));
      } else {
        callback();
      }
    };
    return {
      visible: this.showEntry,
      walkEntryForm: {
        ZBJS_LRRQ: null,
        ZBJS_SCLRRQ: null,
        ZBJS_BYDS: null,
        ZBJS_SYDS: null,
        ZBJS_ZJ: null,
        ZBJS_ZBBZWJ: null,
        ZBJS_ZBBZ: null,
        ZBJS_BYXD: null,
        ZBBZ_INT: 0,
      },
      rules: {
        ZBJS_BYDS: [{ validator: validatebyds, trigger: "blur" }],
      },
      SelectType: 1,
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
      if (this.visible) {
      }
    },
  },
  methods: {
    //修改
    getWalkData(data, type) {
      let newData = JSON.parse(JSON.stringify(data));
      this.walkEntryForm = newData;
      this.SelectType = type;
    },
    saveCommon() {
      saveTableRead(this.walkEntryForm).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          let newobj = JSON.parse(JSON.stringify(this.walkEntryForm));
          this.$emit("RefreshItem", this.SelectType, newobj);
          this.cancle();
        }
      });
    },
    // 确定
    sure() {
      this.walkEntryForm.ZBBZ_INT = 0; //默认转表标志为0
      var that = this;
      if (!this.walkEntryForm.ZBJS_LRRQ) {
        this.walkEntryForm.ZBJS_LRRQ = this.getNowFormatDate();
      }
      if (this.SelectType == 1) {
        //按表度数修改
        this.$refs.walkEntryForm.validate((valid) => {
          if (valid) {
            //if (this.walkEntryForm.ZBJS_ZBBZ) {
            // if (this.walkEntryForm.ZBJS_BYDS < this.walkEntryForm.ZBJS_SYDS) {
            //   this.$confirm("本月读数小于上月读数,是否转表", "提示", {
            //     confirmButtonText: "确定",
            //     cancelButtonText: "取消",
            //     type: "warning"
            //   })
            //     .then(() => {
            //       this.walkEntryForm.ZBBZ_INT = 1;
            //       transferTable(this.walkEntryForm).then(response => {
            //         that.$nextTick(() => {
            //           that.saveCommon();
            //         });
            //       });
            //     })
            //     .catch(() => {
            //       this.$alert("本月读数小于上月读数,请重新输入", "提示", {
            //         confirmButtonText: "确定",
            //         callback: action => {}
            //       });
            //     });
            // }
            //   this.walkEntryForm.ZBBZ_INT = 1;
            //   transferTable(this.walkEntryForm).then(response => {
            //     that.$nextTick(() => {
            //       that.saveCommon();
            //     });
            //   });
            // } else {
            if (
              Number(this.walkEntryForm.ZBJS_BYDS) <
              Number(this.walkEntryForm.ZBJS_SYDS)
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
      } else {
        //按输入量修改
        saveForInputQuantity(this.walkEntryForm).then((response) => {
          let newobj = JSON.parse(JSON.stringify(this.walkEntryForm));
          this.$emit("RefreshItem", this.SelectType, newobj);
          this.cancle();
        });
      }
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
        this.$refs.walkEntryForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
