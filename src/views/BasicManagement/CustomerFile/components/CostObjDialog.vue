<template>
  <div class="ZoneDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :model="CostObjForm"
        :rules="rules"
        ref="CostObjForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item
              label="是否收费对象:"
              prop="FKGX_SFSFDX"
              label-width="125px"
            >
              <el-checkbox v-model="CostObjForm.FKGX_SFSFDX"></el-checkbox>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="发票对象:" prop="FKGX_FPDX">
              <el-checkbox v-model="CostObjForm.FKGX_FPDX"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="开始日期:" prop="FKGX_KSSFRQ">
              <el-date-picker
                type="date"
                placeholder="选择开始收费日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="CostObjForm.FKGX_KSSFRQ"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="终止日期:" prop="FKGX_ZZSFRQ">
              <el-date-picker
                type="date"
                placeholder="选择终止收费日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="CostObjForm.FKGX_ZZSFRQ"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="入住日期:" prop="FKGX_RZRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="CostObjForm.FKGX_RZRQ"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同到期:" prop="FKGX_HTDQRQ">
              <el-date-picker
                type="date"
                placeholder="选择合同到期时间"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="CostObjForm.FKGX_HTDQRQ"
              ></el-date-picker>
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
import { updateChargeObject } from "@/api/BasicManagement/CustomerFile";
export default {
  data() {
    var checkBeginTime = (rule, value, callback) => {
      if (value > this.CostObjForm.FKGX_ZZSFRQ) {
        callback(new Error("终止收费日期不能小于开始收费日期"));
      } else {
        callback();
      }
    };
    var checkEndTime = (rule, value, callback) => {
      if (value < this.CostObjForm.FKGX_KSSFRQ) {
        callback(new Error("终止收费日期不能小于开始收费日期"));
      } else {
        callback();
      }
    };
    return {
      visible: this.objshow,
      title: "收费对象", //标题
      CostObjForm: {},
      rules: {
        FKGX_KSSFRQ: [{ validator: checkBeginTime, trigger: "blur" }],
        FKGX_ZZSFRQ: [{ validator: checkEndTime, trigger: "blur" }],
      },
    };
  },
  props: {
    objshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    objshow() {
      this.visible = this.objshow;
    },
  },
  methods: {
    //  修改
    getPartitionData(data, type) {
      this.CostObjForm = JSON.parse(JSON.stringify(data));
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["CostObjForm"].validate((valid) => {
        if (valid) {
          updateChargeObject(_this.CostObjForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              let newobj = JSON.parse(JSON.stringify(_this.CostObjForm));
              _this.$emit("RefreshItem", newobj);
              _this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:objshow", false);
      this.$nextTick(() => {
        this.$refs.CostObjForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.ZoneDialog .el-input-number {
  width: 100%;
  text-align: left;
}
</style>
