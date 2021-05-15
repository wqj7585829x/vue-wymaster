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
            <el-form-item label="分区代码:" prop="GLQDA_GLQID">
              <el-input
                v-model="partitionForm.GLQDA_GLQID"
                :disabled="title == '修改' ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="地理位置：" prop="GLQDA_DLWZ">
              <el-input v-model="partitionForm.GLQDA_DLWZ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="分区名称：" prop="GLQDA_GLQMC">
              <el-input v-model="partitionForm.GLQDA_GLQMC"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="建筑面积：" prop="GLQDA_JZMJ">
              <el-input-number
                v-model="partitionForm.GLQDA_JZMJ"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="绿地面积：" prop="GLQDA_LDMJ">
              <el-input-number
                v-model="partitionForm.GLQDA_LDMJ"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="使用面积：" prop="GLQDA_SYMJ">
              <el-input-number
                v-model="partitionForm.GLQDA_SYMJ"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="所属区域：" prop="GLQDA_SSQY">
              <el-input v-model="partitionForm.GLQDA_SSQY"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="占地面积：" prop="GLQDA_ZDMJ">
              <el-input-number
                v-model="partitionForm.GLQDA_ZDMJ"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="栋数：" prop="GLQDA_YDS">
              <el-input-number
                v-model="partitionForm.GLQDA_YDS"
                :precision="0"
                :step="1"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="竣工日期：" prop="GLQDA_JGRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="partitionForm.GLQDA_JGRQ"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="工建单位：" prop="GLQDA_GJDW">
              <el-input v-model="partitionForm.GLQDA_GJDW"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="安装单位：" prop="GLQDA_SBAZDW">
              <el-input
                v-model="partitionForm.GLQDA_SBAZDW"
                placeholder="请输入设备安装单位"
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
import { number, onlynumber } from "@/utils/validate.js";
import {
  addResourceFilePartition,
  updateResourceFilePartitionOther,
} from "@/api/BasicManagement/ResourceFile";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      partitionForm: {},
      rules: {
        GLQDA_GLQID: [
          { required: true, message: "请输入分区代码", trigger: "blur" },
        ],
        GLQDA_GLQMC: [
          { required: true, message: "请输入分区名称", trigger: "blur" },
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
      this.partitionForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "新增管理分区";
      } else {
        this.title = "修改";
      }
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["partitionForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增管理分区") {
            addResourceFilePartition(_this.partitionForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateResourceFilePartitionOther(_this.partitionForm).then(
              (response) => {
                if (response.returnStatus == "SUCCESS") {
                  let newobj = JSON.parse(JSON.stringify(_this.partitionForm));
                  _this.$emit("RefreshItem", newobj);
                  _this.cancle();
                }
              }
            );
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
