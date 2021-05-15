<template>
  <div class="ResourceDialog">
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
        :model="ResourceForm"
        :rules="rules"
        ref="ResourceForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="账号:" prop="HZ_ZH">
              <el-input v-model="ResourceForm.HZ_ZH"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="收费面积:" prop="HZ_SFMJ">
              <el-input-number
                v-model="ResourceForm.HZ_SFMJ"
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
            <el-form-item label="余额:" prop="HZ_YE">
              <el-input-number
                v-model="ResourceForm.HZ_YE"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="可用金额：" prop="HZ_KYJE">
              <el-input-number
                v-model="ResourceForm.HZ_KYJE"
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
            <el-form-item label="建账日期:" prop="HZ_JZRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="ResourceForm.HZ_JZRQ"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="客户名称:" prop="KHDA_KHMC">
              <el-input v-model="ResourceForm.KHDA_KHMC"></el-input>
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
  addHouseholdAccount,
  updateHouseholdAccount,
} from "@/api/PublicRepairManager/HouseAccounts";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      ResourceForm: {},
      rules: {
        HZ_ZH: [{ required: true, message: "请输入账号", trigger: "blur" }],
        HZ_JZRQ: [{ required: true, message: "请选择日期", trigger: "blur" }],
      },
      PropertyOwnershipData: {},
      ResourceTypeData: {},
      HouseTypeData: {},
      ResourceConfigurationData: {},
      OrientationData: {},
      LeaseStateData: {},
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
    getResourceData(data, type) {
      var data = JSON.parse(JSON.stringify(data));
      var day = new Date();
      var date =
        day.getFullYear() +
        "-" +
        ((day.getMonth() + 1 + "").length == 1
          ? "0" + (day.getMonth() + 1)
          : day.getMonth() + 1) +
        "-" +
        ((day.getDate() + "").length == 1
          ? "0" + day.getDate()
          : day.getDate());
      if (type == 0) {
        this.title = "新增";
        this.ResourceForm = {
          HZ_ZH: data.FJDA_FJID,
          FCDM_GLQZJ: data.FJDA_GLQWJ,
          DLZJ: data.FJDA_DLWJ,
          FKGX_ZJ: data.FKGX_ZJ,
          KHDA_ZJ: data.KHDA_ZJ,
          KHDA_KHID: data.KHDA_KHID,
          KHDA_KHMC: data.KHDA_KHMC,
          FJZJ: data.FJDA_ZJ,
          FKGX_FJID: data.FJDA_FJID,
          FJDA_FJMC: data.FJDA_FJMC,
          HZ_SFMJ: data.FJDA_SFMJ,
          HZ_YE: 0,
          HZ_KYJE: 0,
          HZ_JZRQ: date,
          GLCID: data.GLCID,
          YXDID: data.YXDID,
        };
      } else {
        this.title = "修改";
        data.KHDA_KHMC = data.HZ_KHMC;
        this.ResourceForm = data;
      }
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["ResourceForm"].validate((valid) => {
        if (valid) {
          this.ResourceForm.HZ_SFMJ = this.ResourceForm.HZ_SFMJ
            ? this.ResourceForm.HZ_SFMJ
            : 0;
          this.ResourceForm.HZ_YE = this.ResourceForm.HZ_YE
            ? this.ResourceForm.HZ_YE
            : 0;
          this.ResourceForm.HZ_KYJE = this.ResourceForm.HZ_KYJE
            ? this.ResourceForm.HZ_KYJE
            : 0;
          if (_this.title == "新增") {
            addHouseholdAccount(_this.ResourceForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateHouseholdAccount(_this.ResourceForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.ResourceForm.HZ_KHMC = this.ResourceForm.KHDA_KHMC;
                let newobj = JSON.parse(JSON.stringify(_this.ResourceForm));
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
        this.$refs.ResourceForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.ResourceDialog .el-input-number {
  width: 100%;
}

.ResourceDialog .el-input-number input {
  text-align: left;
}
</style>
