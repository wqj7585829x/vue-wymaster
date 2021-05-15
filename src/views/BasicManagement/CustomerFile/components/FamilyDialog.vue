<template>
  <div class="BuildingDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :familyshow="familyshow"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :model="familyForm"
        :rules="rules"
        ref="familyForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="姓名:" prop="JTCY_XM">
              <el-input v-model="familyForm.JTCY_XM"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="性别:" prop="JTCY_XB">
              <el-select v-model="familyForm.JTCY_XB">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="与户主关系:" prop="JTCY_YHZGX">
              <el-select v-model="familyForm.JTCY_YHZGX">
                <el-option label="户主" value="户主"></el-option>
                <el-option label="父" value="父"></el-option>
                <el-option label="母" value="母"></el-option>
                <el-option label="子" value="子"></el-option>
                <el-option label="女" value="女"></el-option>
                <el-option label="夫" value="夫"></el-option>
                <el-option label="妻" value="妻"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="移动电话:" prop="JTCY_YDDH">
              <el-input v-model="familyForm.JTCY_YDDH"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="电子邮箱:" prop="JTCY_DZYX">
              <el-input v-model="familyForm.JTCY_DZYX"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="备注:" prop="JTCY_BZ">
              <el-input v-model="familyForm.JTCY_BZ"></el-input>
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
  addFamilyMembers,
  updateFamilyMembers,
} from "@/api/BasicManagement/CustomerFile";
export default {
  data() {
    return {
      visible: this.familyshow,
      title: "", //标题
      familyForm: {},
      rules: {
        JTCY_XM: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        JTCY_TQTXTS: [
          { required: true, message: "请输入提前提醒天数", trigger: "blur" },
        ],
      },
      tableData: [],
    };
  },
  props: {
    familyshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    familyshow() {
      this.visible = this.familyshow;
    },
  },
  methods: {
    //   判断新增，修改
    getData(data, type) {
      this.familyForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "新增";
      } else {
        this.title = "修改";
      }
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["familyForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            addFamilyMembers(_this.familyForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem", {});
                _this.cancle();
              }
            });
          } else {
            updateFamilyMembers(_this.familyForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.familyForm));
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
      this.$emit("update:familyshow", false);
      this.$nextTick(() => {
        this.$refs.familyForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style>
.BuildingDialog .el-input-number {
  width: 100%;
}

.BuildingDialog .el-input-number input {
  text-align: left;
}
</style>
