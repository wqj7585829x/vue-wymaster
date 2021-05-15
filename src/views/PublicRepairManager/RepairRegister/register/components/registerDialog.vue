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
        :model="RepairForm"
        :rules="rules"
        ref="RepairForm"
      >
        <el-row :gutter="50" v-if="title == '新增'">
          <el-col :span="12">
            <el-form-item label="维修项目:">
              <el-input
                v-model="RepairForm.WXDJ_XMMC"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="" label-width="0">
              <el-button type="primary" @click="GetProject">选择</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="el-line" v-if="title == '新增'"></div>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="编号:" prop="WXDJ_NO">
              <el-input v-model="RepairForm.WXDJ_NO"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="报修部门:" prop="WXDJ_BXBM">
              <el-select v-model="RepairForm.WXDJ_BXBM">
                <el-option
                  v-for="(item, index) in RepairDepartmentData"
                  :key="index"
                  :label="item.BMJG_JGMC"
                  :value="item.BMJG_JGMC"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="报修日期:" prop="WXDJ_BXRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="RepairForm.WXDJ_BXRQ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="报修地址:" prop="WXDJ_BXDZ">
              <el-input v-model="RepairForm.WXDJ_BXDZ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="项目名称:" prop="WXDJ_XMMC">
              <el-input v-model="RepairForm.WXDJ_XMMC"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="维修类别:" prop="WXDJ_WXLB">
              <el-select v-model="RepairForm.WXDJ_WXLB">
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
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="项目类型:" prop="WXDJ_XMLX">
              <el-select v-model="RepairForm.WXDJ_XMLX">
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

          <el-col :span="12">
            <el-form-item label="记录人:" prop="WXDJ_JLR">
              <el-input v-model="RepairForm.WXDJ_JLR"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="查看记录:" prop="WXDJ_GLCCKJL">
              <el-input
                type="textarea"
                placeholder="请输入管理处查看记录"
                v-model="RepairForm.WXDJ_GLCCKJL"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="意见:" prop="WXDJ_GLCYJ">
              <el-input
                type="textarea"
                placeholder="请输入管理处意见"
                v-model="RepairForm.WXDJ_GLCYJ"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="分摊标准:" prop="WXDJ_FTBZ">
              <el-select v-model="RepairForm.WXDJ_FTBZ">
                <el-option
                  v-for="item in shareData"
                  :key="item.BMB_LXNR"
                  :label="item.BMB_LXNR"
                  :value="item.BMB_LXNR"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="维修金余额:" prop="WXDJ_WXJYE">
              <el-input-number
                v-model="RepairForm.WXDJ_WXJYE"
                :precision="4"
                :step="0.0001"
                :controls="false"
                :disabled="true"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="工作时间:" prop="FTZB_ZBJS">
              <el-date-picker
                v-model="time"
                type="daterange"
                range-separator="至"
                start-placeholder="开工时间"
                end-placeholder="完工时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="timeChange"
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

    <projectDialog
      :Proshow.sync="Proshow"
      ref="projectDialog"
      @getData="getData"
    ></projectDialog>
  </div>
</template>

<script>
import {
  addCeregister,
  updateCeregister,
  queryRepairDepartment,
  queryshare,
  queryCategory,
  queryProjectType,
  maintenanceRegisterNumberGeneration,
  queryOriginalEvents,
} from "@/api/PublicRepairManager/RepairRegister";
import projectDialog from "./projectDialog";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      RepairForm: {},
      rules: {
        WXDJ_NO: [{ required: true, message: "请输入编号", trigger: "blur" }],
        WXDJ_XMMC: [
          { required: true, message: "请输入收费项目名称", trigger: "blur" },
        ],
        WXDJ_WXLB: [
          { required: true, message: "请选择维修类别", trigger: "blur" },
        ],
        WXDJ_XMLX: [
          { required: true, message: "请选择项目类型", trigger: "blur" },
        ],
        WXDJ_GLCCKJL: [
          { required: true, message: "请输入管理处查看记录", trigger: "blur" },
        ],
        WXDJ_GLCYJ: [
          { required: true, message: "请输入管理处意见", trigger: "blur" },
        ],
        WXDJ_JLR: [
          { required: true, message: "请输入记录人", trigger: "blur" },
        ],
      },
      tableData: [],
      RepairDepartmentData: [],
      shareData: [],
      CategoryData: [],
      ProjectTypeData: [],
      time: [],
      Proshow: false,
    };
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
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
      this.RepairForm = JSON.parse(JSON.stringify(data));
      this.time = [];
      if (type == 0) {
        this.title = "新增";
        var day = new Date();
        this.RepairForm.WXDJ_KGSJ =
          day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
        this.RepairForm.WXDJ_WGSJ =
          day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
        this.time.push(this.RepairForm.WXDJ_KGSJ);
        this.time.push(this.RepairForm.WXDJ_WGSJ);
        this.RepairForm.WXDJ_WXJYE = 0;
        this.RepairForm.WXDJ_BXRQ =
          day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
        this.RepairForm.WXDJ_JLR = this.userName;
        this.getmaintenanceRegisterNumberGeneration();
      } else {
        this.title = "修改";
        this.time.push(this.RepairForm.WXDJ_KGSJ);
        this.time.push(this.RepairForm.WXDJ_WGSJ);
      }
      this.RepairDepartment();
      this.share();
      this.Category();
      this.ProjectType();
    },
    timeChange(val) {
      this.RepairForm.WXDJ_KGSJ = val[0];
      this.RepairForm.WXDJ_WGSJ = val[1];
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["RepairForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            addCeregister(_this.RepairForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateCeregister(_this.RepairForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.RepairForm));
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
    //报修部门下拉框
    RepairDepartment() {
      queryRepairDepartment().then((response) => {
        var data = response;
        if (data) {
          this.RepairDepartmentData = data;
        }
      });
    },
    //分摊标准下拉框
    share() {
      queryshare().then((response) => {
        var data = response;
        if (data) {
          this.shareData = data;
        }
      });
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
    getmaintenanceRegisterNumberGeneration() {
      maintenanceRegisterNumberGeneration().then((response) => {
        this.RepairForm.WXDJ_NO = response.num;
        this.RepairForm = JSON.parse(JSON.stringify(this.RepairForm));
      });
    },
    //维修项目
    GetProject() {
      this.Proshow = true;
      this.$refs.projectDialog.getPartitionData();
    },
    getData(val) {
      this.RepairForm.WXDJ_BXDZ = val.SSXM_DZ;
      this.RepairForm.WXDJ_XMMC = val.SSXM_MC;
      this.RepairForm.WXDJ_WXLB = val.SSXM_WXLB;
      this.RepairForm.WXDJ_XMLX = val.SSXM_XMLX;
      this.RepairForm.WXDJ_SSXMWJ = val.SSXM_ZJ;
    },
    // 取消
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.RepairForm.resetFields(); //重置输入框提示
      });
    },
  },
  components: {
    projectDialog,
  },
};
</script>
<style lang="scss" scoped>
.el-line {
  width: 90%;
  height: 2px;
  background: #888;
  margin-left: 5%;
  margin-bottom: 20px;
}
</style>
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
