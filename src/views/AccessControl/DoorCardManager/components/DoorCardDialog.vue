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
        label-width="125px"
        :model="formList"
        :rules="rules"
        ref="refForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="卡号：" prop="MJK_KH">
              <el-input v-model="formList.MJK_KH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="卡名称：" prop="MJK_KMC">
              <el-input v-model="formList.MJK_KMC"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="分区名称：" prop="MJK_XQWJ">
              <el-select
                v-model="formList.MJK_XQWJ"
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
            <el-form-item label="楼栋名称：" prop="MJK_LDWJ">
              <el-select
                v-model="formList.MJK_LDWJ"
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
            <el-form-item label="门禁设备：">
              <el-checkbox-group
                v-model="MJSBArr"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="item in accessData"
                  :label="item.MJSB_ZJ"
                  :key="item.MJSB_ZJ"
                  >{{ item.MJSB_SBMC }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="有效期开始时间：" prop="MJK_YXQKSSJ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formList.MJK_YXQKSSJ"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="有效结束时间：" prop="MJK_YXQJSSJ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formList.MJK_YXQJSSJ"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="使用人：" prop="MJK_SYRMC">
              <el-input v-model="formList.MJK_SYRMC"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="formList.MJK_BZ"></el-input>
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
  queryAccessControlApi,
} from "@/api/AccessControl/DoordeviceManager";
import {
  queryAccessControlAllApi,
  insertAccessControlCardApi,
  updateAccessControlCardApi,
} from "@/api/AccessControl/DoorCardManager";
export default {
  data() {
    return {
      visible: this.showdialog,
      title: "新增",
      MJSBArr: [],
      formList: {
        MJK_KH: null,
        MJK_MJSBWJ: "",
        MJK_SYRMC: null,
        MJK_XQWJ: null,
        MJK_LDWJ: null,
        MJK_KMC: null,
        MJK_YXQKSSJ: null,
        MJK_YXQJSSJ: null,
        MJK_BZ: null,
      },
      rules: {
        MJK_KH: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        MJK_SYRMC: [
          { required: true, message: "使用人不能为空", trigger: "blur" },
        ],
        // MJK_XQWJ: [{ required: true, message: "请选择分区", trigger: "blur" }],
        // MJK_LDWJ: [{ required: true, message: "请选择楼栋", trigger: "blur" }],
        MJK_KMC: [
          { required: true, message: "卡名称不能为空", trigger: "blur" },
        ],
        MJK_YXQKSSJ: [
          { required: true, message: "开始时间不能为空", trigger: "blur" },
        ],
        MJK_YXQJSSJ: [
          { required: true, message: "结束时间不能为空", trigger: "blur" },
        ],
      },
      plotData: [],
      buildData: [],
      accessData: [],
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
        this.getAccessCRequest();
      }
    },
  },
  methods: {
    //   判断新增，修改
    getTableRow(obj, type) {
      this.MJSBArr = [];
      this.formList = JSON.parse(JSON.stringify(obj));
      if (type == 0) {
        this.title = "新增";
      } else {
        this.title = "修改";
        if (String(this.formList.MJK_MJSBWJ).indexOf(",") > -1) {
          var arr = [];
          arr = String(this.formList.MJK_MJSBWJ).split(",");
          arr.forEach((item) => {
            this.MJSBArr.push(parseInt(item));
          });
        } else {
          this.MJSBArr.push(parseInt(this.formList.MJK_MJSBWJ));
        }
        this.getBuildRequeest(this.formList.MJK_XQWJ);
      }
    },
    handleCheckedCitiesChange(val) {
      var sbwj = "";
      if (val.length > 0) {
        val.forEach((item) => {
          sbwj += item + ",";
        });
        this.formList.MJK_MJSBWJ = sbwj;
      } else {
        this.formList.MJK_MJSBWJ = "";
        this.formList.MJK_SBMC = "";
      }
    },
    getPlotRequeest() {
      //获取小区
      queryHousingEstate().then((response) => {
        this.plotData = response;
      });
    },
    getAccessCRequest() {
      //获取门禁设备
      queryAccessControlAllApi().then((response) => {
        this.accessData = response;
      });
    },
    plotChange(val) {
      this.formList.MJK_LDWJ = "";
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
          if (!this.formList.MJK_MJSBWJ) {
            this.$message.error("请选择门禁设备");
            return;
          }
          this.formList.MJK_MJSBWJ = this.formList.MJK_MJSBWJ.substring(
            0,
            this.formList.MJK_MJSBWJ.length - 1
          );
          if (this.title == "新增") {
            insertAccessControlCardApi(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem");
                this.cancle();
              }
            });
          } else {
            updateAccessControlCardApi(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem");
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
