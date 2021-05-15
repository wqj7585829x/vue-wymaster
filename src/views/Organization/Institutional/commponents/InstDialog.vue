<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="title"
      :visible="dialogFormVisible"
      @close="cancelForm"
      :close-on-click-modal="false"
      class="el-dialog-double"
    >
      <el-form
        label-width="120px"
        :model="formList"
        :rules="rules"
        ref="ruleForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="上级部门：">
              <span class="text-left TextColor">
                {{ SupName }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="机构编号：" prop="BMJG_JGBH">
              <el-input
                auto-complete="off"
                v-model="formList.BMJG_JGBH"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构名称：" prop="BMJG_JGMC">
              <el-input v-model="formList.BMJG_JGMC"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="机构级别：" prop="BMJG_JGJB">
              <!-- formList.agencyType -->
              <el-select
                v-model="formList.BMJG_JGJB"
                placeholder="请选择"
                @change="LevelChange"
              >
                <!-- 机构级别下拉循环值 -->
                <el-option
                  v-for="item in options"
                  :key="item.JGJB_ZJ"
                  :label="item.JGJB_MC"
                  :value="item.JGJB_MC"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="创建日期：" prop="BMJG_CJRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formList.BMJG_CJRQ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="描述：">
              <el-input
                type="textarea"
                auto-complete="off"
                v-model="formList.BMJG_BZ"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="是否有效：" prop="BMJG_SFYX">
              <el-checkbox v-model="formList.BMJG_SFYX">是否有效</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="管理处电话：" prop="BMJG_DH">
              <el-input v-model.number="formList.BMJG_DH"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50" v-if="isShowServer">
          <el-row class="line-btm"></el-row>
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="运行点ID：" prop="YXDID">
                <el-input v-model="formList.YXDID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="管理处ID：" prop="GLCID">
                <el-input v-model="formList.GLCID"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="报表表头：" prop="BMJG_BBBT">
                <el-input v-model="formList.BMJG_BBBT"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="默认工单名称：" prop="BMJG_MRGDMC">
                <el-input v-model="formList.BMJG_MRGDMC"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="服务器地址：" prop="BMJG_SERVER">
                <el-input v-model="formList.BMJG_SERVER"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据库名称：" prop="BMJG_DBNAME">
                <el-input v-model="formList.BMJG_DBNAME"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item
                label="数据库登录用户："
                prop="BMJG_USER"
                label-width="125px"
              >
                <el-input v-model="formList.BMJG_USER"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="数据库登录密码："
                prop="BMJG_PASS"
                label-width="125px"
              >
                <el-input
                  type="password"
                  v-model="formList.BMJG_PASS"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="用户验证：" prop="BMJG_JCDL">
                <el-checkbox v-model="formList.BMJG_JCDL">用户验证</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">确 定</el-button>
        <el-button @click="cancelForm()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  organInsert,
  organUpdate,
  organModify,
  queryOrgLevel,
} from "@/api/Organization/Institutional";
import { validatecredentialno } from "@/utils/validate.js";
export default {
  props: ["showdialog", "getTreeDialogData"],
  data() {
    var validatejgbh = (rule, value, callback) => {
      if (value == "" || value == null) {
        callback();
      } else if (!validatecredentialno(value)) {
        callback(new Error("只能输入数字或字母"));
      } else {
        callback();
      }
    };
    return {
      title: "",
      selectdisabled: false, //是否禁用机构类型下拉框
      dialogFormVisible: this.showdialog,
      radio: "",
      OperType: 0, //0 新增  1修改
      formList: {},
      tableParameter: {},
      rules: {},
      options: [],
      SupName: "", //上级部门名称
      isShowServer: false, //默认隐藏物业项目设置
      treeObject: {}, //树对象
      rules: {
        BMJG_JGBH: [
          { required: true, message: "请输入机构编号", trigger: "blur" },
          { validator: validatejgbh, trigger: "blur" },
        ],
        BMJG_JGMC: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
        ],
        BMJG_JGJB: [
          { required: true, message: "请选择机构级别", trigger: "blur" },
        ],
        YXDID: [{ required: true, message: "请输入数据库ID", trigger: "blur" }],
        GLCID: [{ required: true, message: "请输入项目ID", trigger: "blur" }],
      },
    };
  },
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
      if (this.dialogFormVisible) {
        this.queryOrgan();
      }
    },
  },
  methods: {
    queryOrgan() {
      queryOrgLevel(this.tableParameter).then((response) => {
        this.options = response;
      });
    },
    getTableRow(data, type, val, nodeName) {
      this.treeObject = val;
      this.OperType = type; //0 新增  1修改
      this.SupName = nodeName; //上级部门名称
      this.isShowServer = false; //默认隐藏服务部分
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      if (this.OperType == 0) {
        this.title = "新增";
        if (Object.keys(val).length > 0) {
          this.formList.BMJG_SJZJ = val.data.BMJG_ZJ;
        }
      } else if (this.OperType == 2) {
        this.title = "新增";
      } else {
        this.formList.BMJG_SJZJ = val.data.BMJG_ZJ;
        this.title = "修改";
        if (this.formList.BMJG_JGJB == "项目部") {
          this.isShowServer = true;
        } else {
          this.isShowServer = false;
          this.formList.YXDID = this.treeObject.data.YXDID;
          this.formList.GLCID = this.treeObject.data.GLCID;
        }
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.OperType == 0 || this.OperType == 2) {
            //新增
            organInsert(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", 1, newobj);
                this.cancelForm();
              }
            });
          } else {
            organUpdate(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", 1, newobj);
                this.cancelForm();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    LevelChange(val) {
      var _this = this;
      if (val == "项目部") {
        this.isShowServer = true;
      } else {
        this.isShowServer = false;
        this.formList.YXDID = this.treeObject.data.YXDID;
        this.formList.GLCID = this.treeObject.data.GLCID;
      }
      if (val) {
        this.options.forEach(function (item) {
          if (item.JGJB_MC == val) {
            _this.formList.BMJG_JBH = item.JGJB_JBH;
          }
        });
      }
    },
    cancelForm() {
      //取消关闭
      //console.log(this)
      this.$emit("update:showdialog", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style lang="scss">
.line-btm {
  border-top: 1px solid #eeeeee;
  margin-bottom: 20px;
}
</style>
