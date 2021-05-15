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
        label-width="115px"
        :model="formList"
        :rules="rules"
        ref="refForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="分区名称：" prop="MJSB_XQWJ">
              <el-select
                v-model="formList.MJSB_XQWJ"
                @change="plotChange"
                clearable
              >
                <el-option
                  v-for="item in plotData"
                  :key="item.XQZJ"
                  :label="item.XQMC"
                  :value="item.XQZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="楼栋名称：" prop="MJSB_LDWJ">
              <el-select
                v-model="formList.MJSB_LDWJ"
                @change="buildChange"
                clearable
              >
                <el-option
                  v-for="item in buildData"
                  :key="item.LDZJ"
                  :label="item.LDMC"
                  :value="item.LDZJ"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="设备名称：" prop="MJSB_SBMC">
              <el-input v-model="formList.MJSB_SBMC"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="设备接口地址：" prop="MJSB_SBJKDZ">
              <el-input v-model="formList.MJSB_SBJKDZ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="设备密钥：" prop="MJSB_SBMY">
              <el-input v-model="formList.MJSB_SBMY"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="设备序列号：" prop="MJSB_SBXLH">
              <el-input v-model="formList.MJSB_SBXLH"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="设备mac：" prop="MJSB_SBMAC">
              <el-input v-model="formList.MJSB_SBMAC"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备编码：" prop="MJSB_SBMBM">
              <el-input v-model="formList.MJSB_SBMBM"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="卡扇区编号：" prop="MJSB_KSQBH">
              <el-input v-model="formList.MJSB_KSQBH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="扇区密钥：" prop="MJSB_SQMY">
              <el-input v-model="formList.MJSB_SQMY"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="formList.MJSB_BZ"></el-input>
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
  queryHousingEstate,
  queryMansion,
  insertAccessControlApi,
  updateAccessControlApi,
} from "@/api/AccessControl/DoordeviceManager";

export default {
  data() {
    return {
      visible: this.showdialog,
      title: "新增",
      formList: {
        MJSB_XQMC: null,
        MJSB_LDMC: null,
        MJSB_SBMC: null,
        MJSB_SBJKDZ: null,
        MJSB_SBMY: null,
        MJSB_SBXLH: null,
        MJSB_SBMAC: null,
        MJSB_SBMBM: null,
        MJSB_KSQBH: null,
        MJSB_SQMY: null,
        MJSB_BZ: null,
      },
      rules: {
        MJSB_XQWJ: [{ required: true, message: "请选择分区", trigger: "blur" }],
        MJSB_LDWJ: [{ required: true, message: "请选择楼栋", trigger: "blur" }],
        MJSB_SBMC: [
          { required: true, message: "设备名称不能为空", trigger: "blur" },
        ],
        MJSB_SBJKDZ: [
          { required: true, message: "设备接口地址不能为空", trigger: "blur" },
        ],
        MJSB_SBMY: [
          { required: true, message: "设备密钥不能为空", trigger: "blur" },
        ],
        MJSB_SBXLH: [
          { required: true, message: "设备序列号不能为空", trigger: "blur" },
        ],
        MJSB_SBMAC: [
          { required: true, message: "设备mac不能为空", trigger: "blur" },
        ],
        MJSB_SBMBM: [
          { required: true, message: "设备门编码不能为空", trigger: "blur" },
        ],
        MJSB_KSQBH: [
          { required: true, message: "卡扇区编号不能为空", trigger: "blur" },
        ],
        MJSB_SQMY: [
          { required: true, message: "扇区密钥不能为空", trigger: "blur" },
        ],
      },
      plotData: [],
      buildData: [],
    };
  },
  props: {
    showdialog: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showdialog() {
      this.visible = this.showdialog;
      if (this.visible) {
        this.getPlotRequeest();
      }
    },
  },
  methods: {
    //   判断新增，修改
    getTableRow(obj, type) {
      this.formList = JSON.parse(JSON.stringify(obj));
      console.log("formList----------" + JSON.stringify(this.formList));
      if (type == 0) {
        this.title = "新增";
      } else {
        this.title = "修改";
        this.getBuildRequeest(this.formList.MJSB_XQWJ);
      }
    },
    getPlotRequeest() {
      //获取小区
      queryHousingEstate().then((response) => {
        this.plotData = response;
      });
    },
    plotChange(val) {
      this.formList.MJSB_LDWJ = "";
      this.formList = JSON.parse(JSON.stringify(this.formList));
      this.getBuildRequeest(val);
    },
    buildChange(val) {},
    getBuildRequeest(val) {
      //获取楼栋
      queryMansion(val).then((response) => {
        this.buildData = response;
      });
    },
    // 确定
    sure() {
      this.$refs.refForm.validate((valid) => {
        if (valid) {
          if (this.title == "新增") {
            insertAccessControlApi(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem", this.formList);
                this.cancle();
              }
            });
          } else {
            updateAccessControlApi(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem", this.formList);
                this.cancle();
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
      this.$emit("update:showdialog", false);
      this.$nextTick(() => {
        this.$refs.refForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
