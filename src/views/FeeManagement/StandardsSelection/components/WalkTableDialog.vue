<template>
  <div>
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
        :model="walkMeterForm"
        :rules="rules"
        ref="walkMeterForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="小区名称：">
              <span class="TextColor">{{ walkMeterForm.ZBJS_GLQMC }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="楼栋名称：">
              <span class="TextColor">{{ walkMeterForm.ZBJS_DLMC }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="资源代码：">
              <span class="TextColor">{{ walkMeterForm.ZBJS_FJID }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="客户名称：">
              <span class="TextColor">{{ walkMeterForm.ZBJS_KHMC }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收费项目：">
              <span class="TextColor">{{ walkMeterForm.ZBJS_SFXMMC }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标准名称：" prop="costId">
              <el-select
                v-model="walkMeterForm.ZBJS_ZBBZWJ"
                @change="standardChange"
                clearable
              >
                <el-option
                  v-for="item in standardData"
                  :key="item.ZBBZ_ZJ"
                  :label="item.ZBBZ_BZMC"
                  :value="item.ZBBZ_ZJ"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="表名称：" prop="ZBJS_BMC">
              <el-input v-model="walkMeterForm.ZBJS_BMC"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="表代码：" prop="ZBJS_BDM">
              <el-input v-model="walkMeterForm.ZBJS_BDM"></el-input>
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
  queryWalkStands,
  addStandTable,
} from "@/api/FeeManagement/StandardsSelection"; //标准选用js

export default {
  data() {
    return {
      visible: this.showWalk,
      title: "新增走表",
      walkMeterForm: {
        ZBJS_BMC: null, //表名称
        ZBJS_BDM: null, //表代码
        ZBJS_SFXMWJ: null, //收费项目外键
        ZBJS_FKGXWJ: null, //房客关系外键
        ZBJS_ZBBZWJ: null, //走表标准外键
        ZBJS_ZBBZMC: null,
      },
      tableForm: {
        CGJS_SFXMWJ: "",
        ZBJS_SFXMWJ: "",
      },
      rules: {
        ZBJS_BMC: [{ required: true, message: "", trigger: "blur" }],
        ZBJS_BDM: [{ required: true, message: "", trigger: "blur" }],
      },
      standardData: [],
      SelectType: "", //1 常规类  2 走表类
    };
  },
  props: {
    showWalk: {
      type: Boolean,
      default: false,
    },
    getTreeObj: {
      //树数据
      type: Object,
      default: {},
    },
  },
  watch: {
    showWalk() {
      this.visible = this.showWalk;
      if (this.visible) {
        this.getCommonStands();
      }
    },
  },
  methods: {
    //   判断新增，修改
    getWalkMeterData(obj, SFXM_ID, type, len) {
      this.walkMeterForm = JSON.parse(JSON.stringify(obj));
      this.walkMeterForm.ZBJS_BMC = "";
      this.walkMeterForm.ZBJS_BDM = "";
      this.tableForm.CGJS_SFXMWJ = "";
      this.tableForm.ZBJS_SFXMWJ = SFXM_ID;
      this.SelectType = type;
      if (len < 10) {
        len = "0" + len;
      }
      this.walkMeterForm.ZBJS_BMC = this.walkMeterForm.ZBJS_SFXMMC + "-" + len;
      this.walkMeterForm.ZBJS_BDM = this.walkMeterForm.ZBJS_FJID + "-" + len;
    },
    getCommonStands() {
      //获取项目下标准名称
      queryWalkStands(this.tableForm).then((response) => {
        this.standardData = response;
      });
    },
    // 类型筛选 获取 收费项目
    standardChange(val) {
      this.walkMeterForm.ZBJS_ZBBZWJ = val;
      this.standardData.forEach((item) => {
        if (item.ZBBZ_ZJ == val) {
          this.walkMeterForm.ZBJS_ZBBZMC = item.ZBBZ_BZMC;
        }
      });
    },
    // 确定
    sure() {
      this.$refs.walkMeterForm.validate((valid) => {
        if (valid) {
          addStandTable(this.walkMeterForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$emit("RefreshItem", this.SelectType);
              this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:showWalk", false);
      this.$nextTick(() => {
        this.$refs.walkMeterForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
