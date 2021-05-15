<template>
  <div class="BIllClassDialog">
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
        :model="BillItemForm"
        :rules="rules"
        ref="BillItemForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="票据类型:" prop="PJFL_PJLX">
              <el-input
                v-model="BillItemForm.PJFL_PJLX"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="票据分类:" prop="PJFL_FLMC">
              <el-input v-model="BillItemForm.PJFL_FLMC"></el-input>
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
  addBillSort,
  updateBillSort,
} from "@/api/FeeManagement/BillManagement.js";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      BillItemForm: {},
      rules: {
        PJFL_FLMC: [
          { required: true, message: "请输入票据分类名称", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      this.visible = this.show;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data, type) {
      this.BillItemForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "新增";
        this.BillItemForm.PJFL_PJLX = this.BillItemForm.ZJ;
      } else {
        this.title = "修改";
        this.BillItemForm.PJFL_PJLX = this.BillItemForm.SJZJ;
      }
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["BillItemForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            addBillSort(_this.BillItemForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateBillSort(_this.BillItemForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.BillItemForm));
                _this.$emit("RefreshItem", newobj);
                _this.cancle();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.BillItemForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.BIllClassDialog .el-input-number {
  width: 100%;
}

.BIllClassDialog .el-input-number input {
  text-align: left;
}
</style>
