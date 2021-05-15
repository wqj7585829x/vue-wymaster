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
        :model="standardsForm"
        :rules="rules"
        ref="standardsForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="小区名称：">
              <span class="TextColor" v-if="SelectType == 1">{{
                standardsForm.CGJS_GLQMC
              }}</span>
              <span class="TextColor" v-else>{{
                standardsForm.ZBJS_GLQMC
              }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="楼栋名称：">
              <span class="TextColor" v-if="SelectType == 1">{{
                standardsForm.CGJS_DLMC
              }}</span>
              <span class="TextColor" v-else>{{
                standardsForm.ZBJS_DLMC
              }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="资源代码：">
              <span class="TextColor" v-if="SelectType == 1">{{
                standardsForm.CGJS_FJID
              }}</span>
              <span class="TextColor" v-else>{{
                standardsForm.ZBJS_FJID
              }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="SelectType == 1">
            <el-form-item label="客户名称：">
              <span class="TextColor">{{ standardsForm.KHDA_KHMC }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="SelectType == 2">
            <el-form-item label="客户名称：">
              <span class="TextColor">{{ standardsForm.ZBJS_KHMC }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" v-if="SelectType == 1">
          <el-col :span="12">
            <el-form-item label="标准名称：" prop="CGJS_CGBZMC">
              <el-select
                v-model="standardsForm.CGJS_CGBZMC"
                @change="standardChange"
                clearable
              >
                <el-option
                  v-for="item in standardData"
                  :key="item.CGBZ_BZMC"
                  :label="item.CGBZ_BZMC"
                  :value="item.CGBZ_BZMC"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="SelectType == 1">
            <el-form-item label="定价方式：">
              <span class="TextColor">{{ standardsForm.CGJS_DJFS }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" v-if="SelectType == 2">
          <el-col :span="12">
            <el-form-item label="标准名称：" prop="ZBJS_ZBBZMC">
              <el-select
                v-model="standardsForm.ZBJS_ZBBZMC"
                @change="standardChange"
                clearable
              >
                <el-option
                  v-for="item in standardData"
                  :key="item.ZBBZ_BZMC"
                  :label="item.ZBBZ_BZMC"
                  :value="item.ZBBZ_BZMC"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" v-if="SelectType == 2">
          <el-col :span="12">
            <el-form-item label="表名称：" prop="ZBJS_BMC">
              <el-input v-model="standardsForm.ZBJS_BMC"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="表代码：" prop="ZBJS_BDM">
              <el-input v-model="standardsForm.ZBJS_BDM"></el-input>
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
  queryCommonPricing,
  queryWalkStands,
  saveCommonStands,
} from "@/api/FeeManagement/StandardsSelection"; //标准选用js

export default {
  data() {
    return {
      visible: this.showUpdateDisable,
      title: "新增", //修改
      SelectType: 1, //1 常规类   2 走表类
      standardsForm: {
        //走表 数据
        CGJS_GLQMC: null,
        CGJS_CGBZWJ: null,
        CGJS_DLMC: null,
        CGJS_FJID: null,
        CGJS_ZJ: null,
        KHDA_KHMC: null,
        CGJS_CGBZMC: null,
        CGJS_DJFS: null,
        ZBJS_BMC: null,
        ZBJS_BDM: null,
        CGJS_SFXMWJ: null,
        CGBZ_BZMC: null,
        ZBJS_SFXMWJ: null,
        ZBJS_ZBBZMC: null,
        ZBJS_ZBBZWJ: null,
        ZBJS_ZJ: null,
      },
      rules: {},
      CGJS_DLWJ: null, //收费项目外键ID
      standardData: [],
    };
  },
  props: {
    showUpdateDisable: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showUpdateDisable() {
      this.visible = this.showUpdateDisable;
      if (this.visible) {
        this.getCommonStands();
      }
    },
  },
  methods: {
    //修改
    getStandsData(data, typeVlaue, type) {
      let newData = JSON.parse(JSON.stringify(data));
      this.standardsForm = newData;
      this.SelectType = typeVlaue; //1常规  2走表
      if (type == 1) {
        this.title = "新增";
      } else {
        this.title = "修改";
      }
    },
    getCommonStands() {
      //获取项目下标准名称
      queryWalkStands(this.standardsForm).then((response) => {
        this.standardData = response;
        this.standardData.forEach((item) => {
          if (this.SelectType == 1) {
            if (item.CGBZ_BZMC == this.standardsForm.CGJS_YXBZMC) {
              this.standardsForm.CGJS_CGBZWJ = item.CGBZ_ZJ;
            }
          } else {
            if (item.ZBBZ_BZMC == this.standardsForm.ZBJS_YXBZMC) {
              this.standardsForm.ZBJS_ZBBZWJ = item.ZBBZ_ZJ;
            }
          }
        });
      });
    },
    getCommonWay(val) {
      //获取项目下标准定价方式
      queryCommonPricing(this.standardsForm.CGBZ_BZMC, val).then((response) => {
        this.standardsForm.CGJS_DJFS = response.cgbz_djfs;
        let newData = JSON.parse(JSON.stringify(this.standardsForm));
        this.standardsForm = newData;
      });
    },
    standardChange(val) {
      //标准名称选择
      this.standardsForm.CGJS_DJFS = null;
      if (this.SelectType == 1) {
        this.standardsForm.CGBZ_BZMC = val;
        this.standardData.forEach((item) => {
          if (item.CGBZ_BZMC == val) {
            this.standardsForm.CGJS_CGBZWJ = item.CGBZ_ZJ;
            this.getCommonWay(this.standardsForm.CGJS_CGBZWJ);
          }
        });
      } else {
        this.standardData.forEach((item) => {
          if (item.ZBBZ_BZMC == val) {
            this.standardsForm.ZBJS_ZBBZWJ = item.ZBBZ_ZJ;
          }
        });
      }
    },
    // 确定
    sure() {
      this.$refs.standardsForm.validate((valid) => {
        if (valid) {
          saveCommonStands(this.standardsForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              let newobj = JSON.parse(JSON.stringify(this.standardsForm));
              this.$emit("RefreshItem", this.SelectType, newobj);
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
      this.$emit("update:showUpdateDisable", false);
      this.$nextTick(() => {
        this.$refs.standardsForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
