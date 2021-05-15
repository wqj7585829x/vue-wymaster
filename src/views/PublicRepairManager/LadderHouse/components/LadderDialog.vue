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
        :model="partitionForm"
        :rules="rules"
        ref="partitionForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="梯编号:" prop="TB_TBH">
              <el-input v-model="partitionForm.TB_TBH"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="梯名称：" prop="TB_TMC">
              <el-input v-model="partitionForm.TB_TMC"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="梯位置：" prop="TB_TWZ">
              <el-input v-model="partitionForm.TB_TWZ"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="备注：" prop="TB_BZ">
              <el-input v-model="partitionForm.TB_BZ"></el-input>
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
import { number, onlynumber } from "@/utils/validate.js";
import { addLadder, updateLadder } from "@/api/PublicRepairManager/LadderHouse";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      partitionForm: {},
      rules: {
        TB_TMC: [{ required: true, message: "请输入梯名称", trigger: "blur" }],
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
      this.partitionForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "新增梯";
      } else {
        this.title = "修改";
      }
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["partitionForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增梯") {
            addLadder(_this.partitionForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateLadder(_this.partitionForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.partitionForm));
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
        this.$refs.partitionForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.ZoneDialog .el-input-number {
  width: 100%;
}

.ZoneDialog .el-input-number input {
  text-align: left;
}
</style>
