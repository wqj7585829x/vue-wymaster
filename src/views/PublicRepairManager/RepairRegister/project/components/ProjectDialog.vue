<template>
  <div class="TableDialog">
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
        :model="ProjectForm"
        :rules="rules"
        ref="ProjectForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="项目名称:" prop="SSXM_MC">
              <el-input v-model="ProjectForm.SSXM_MC"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="项目类型:" prop="SSXM_XMLX">
              <el-select v-model="ProjectForm.SSXM_XMLX">
                <el-option
                  v-for="item in ProjectTypeData"
                  :key="item.BMB_LXNR"
                  :label="item.BMB_LXNR"
                  :value="item.BMB_LXNR"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="维修类别:" prop="SSXM_WXLB">
              <el-select v-model="ProjectForm.SSXM_WXLB">
                <el-option
                  v-for="item in CategoryData"
                  :key="item.BMB_LXNR"
                  :label="item.BMB_LXNR"
                  :value="item.BMB_LXNR"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="地址:" prop="SSXM_DZ">
              <el-input v-model="ProjectForm.SSXM_DZ"></el-input>
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
  addProject,
  updateProject,
  queryCategory,
  queryProjectType,
} from "@/api/PublicRepairManager/RepairRegister";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      ProjectForm: {},
      rules: {
        SSXM_MC: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        SSXM_XMLX: [
          { required: true, message: "请选择项目类型", trigger: "blur" },
        ],
        SSXM_WXLB: [
          { required: true, message: "请选择维修类别", trigger: "blur" },
        ],
      },
      tableData: [],
      CategoryData: [],
      ProjectTypeData: [],
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
      this.ProjectForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "新增";
      } else {
        this.title = "修改";
      }
      this.Category();
      this.ProjectType();
    },
    //维修类别下拉框
    Category() {
      queryCategory().then((response) => {
        var data = response;
        if (data) {
          this.CategoryData = data;
        }
      });
    },
    //项目类型下拉框
    ProjectType() {
      queryProjectType().then((response) => {
        var data = response;
        if (data) {
          this.ProjectTypeData = data;
        }
      });
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["ProjectForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            addProject(_this.ProjectForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateProject(_this.ProjectForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.ProjectForm));
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
        this.$refs.ProjectForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.TableDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.TableDialog .el-input-number {
  width: 100%;
}

.TableDialog .el-input-number input {
  text-align: left;
}
</style>
