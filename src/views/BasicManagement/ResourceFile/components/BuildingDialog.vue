<template>
  <div class="BuildingDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :show="show"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :model="buildForm"
        :rules="rules"
        ref="buildForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="楼栋代码:" prop="DLDA_DLID">
              <el-input
                v-model="buildForm.DLDA_DLID"
                :disabled="title == '修改' ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="楼层数：" prop="DLDA_LCS">
              <el-input-number
                v-model="buildForm.DLDA_LCS"
                :precision="0"
                :step="1"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="楼栋名称：" prop="DLDA_DLMC">
              <el-input v-model="buildForm.DLDA_DLMC"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="建筑面积：" prop="DLDA_JZMJ">
              <el-input-number
                v-model="buildForm.DLDA_JZMJ"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="楼高：" prop="DLDA_LG">
              <el-input-number
                v-model="buildForm.DLDA_LG"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="施工单位：" prop="DLDA_SGDW">
              <el-input v-model="buildForm.DLDA_SGDW"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="使用面积：" prop="DLDA_SYMJ">
              <el-input-number
                v-model="buildForm.DLDA_SYMJ"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="栋楼类别：" prop="DLDA_DLLB">
              <el-select v-model="buildForm.DLDA_DLLB">
                <el-option
                  v-for="item in tableData"
                  :key="item.BMB_LXNR"
                  :label="item.BMB_LXNR"
                  :value="item.BMB_LXNR"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50" v-if="title == '修改' ? false : true">
          <el-col :span="12">
            <el-form-item label="总户数：" prop="DLDA_ZHS">
              <el-input-number
                v-model="buildForm.DLDA_ZHS"
                :precision="0"
                :step="1"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="占地面积：" prop="DLDA_ZDMJ">
              <el-input-number
                v-model="buildForm.DLDA_ZDMJ"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="电梯数量：" prop="DLDA_DTSL">
              <el-input-number
                v-model="buildForm.DLDA_DTSL"
                :precision="0"
                :step="1"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="title == '修改' ? false : true">
            <el-form-item label="入伙时间：" prop="DLDA_DLRHSJ">
              <el-date-picker
                type="date"
                placeholder="选择大楼入伙时间"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="buildForm.DLDA_DLRHSJ"
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
import {
  addResourceFileBuilding,
  updateResourceFileBuildingOther,
  queryBuildingCategoryLevel,
} from "@/api/BasicManagement/ResourceFile";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      buildForm: {},
      rules: {
        DLDA_DLID: [
          { required: true, message: "请输入楼栋代码", trigger: "blur" },
        ],
        DLDA_DLMC: [
          { required: true, message: "请输入楼栋名称", trigger: "blur" },
        ],
      },
      tableData: [],
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
    getBuildData(data, type, DLDA_ZJ) {
      this.buildtype();
      this.buildForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "新增楼栋";
        this.buildForm.DLDA_GLQWJ = DLDA_ZJ;
      } else {
        this.title = "修改";
        if (this.buildForm.DLDA_LCS == "") delete this.buildForm.DLDA_LCS;
      }
    },
    //楼栋类别
    buildtype() {
      queryBuildingCategoryLevel().then((response) => {
        var data = response;
        if (data) {
          this.tableData = data;
        }
      });
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["buildForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增楼栋") {
            addResourceFileBuilding(_this.buildForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateResourceFileBuildingOther(_this.buildForm).then(
              (response) => {
                if (response.returnStatus == "SUCCESS") {
                  let newobj = JSON.parse(JSON.stringify(_this.buildForm));
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
        this.$refs.buildForm.resetFields(); //重置输入框提示
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
