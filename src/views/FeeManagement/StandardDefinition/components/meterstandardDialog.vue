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
        :model="meterstandardForm"
        :rules="rules"
        ref="meterstandardForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="标准名称:" prop="ZBBZ_BZMC">
              <el-input v-model="meterstandardForm.ZBBZ_BZMC"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="收费币种:" prop="ZBBZ_SFBZ">
              <el-select v-model="meterstandardForm.ZBBZ_SFBZ">
                <el-option
                  v-for="(item, index) in ChargeForCurrencyData"
                  :key="index"
                  :label="item.RETURNVALUE"
                  :value="item.RETURNVALUE"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="用量类型:" prop="ZBBZ_YLLX">
              <el-select v-model="meterstandardForm.ZBBZ_YLLX">
                <el-option label="按表读数" value="按表读数"></el-option>
                <el-option label="按输入量" value="按输入量"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="转表基数:" prop="ZBBZ_ZBJS">
              <el-input-number
                v-model="meterstandardForm.ZBBZ_ZBJS"
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
            <el-form-item label="标准代码:" prop="ZBBZ_BZDM">
              <el-input v-model="meterstandardForm.ZBBZ_BZDM"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="标准单价:" prop="ZBBZ_JNDJ">
              <el-input-number
                v-model="meterstandardForm.ZBBZ_JNDJ"
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
            <el-form-item label="表倍率:" prop="ZBBZ_BBL">
              <el-input-number
                v-model="meterstandardForm.ZBBZ_BBL"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="使用计划:" prop="ZBBZ_SYJH">
              <el-checkbox v-model="meterstandardForm.ZBBZ_SYJH"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="按年度计量:" prop="ZBBZ_ANDJL">
              <el-checkbox
                v-model="meterstandardForm.ZBBZ_ANDJL"
                :disabled="!meterstandardForm.ZBBZ_SYJH"
              >
              </el-checkbox>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="起计月份:" prop="ZBBZ_QJYF">
              <el-select
                v-model="meterstandardForm.ZBBZ_QJYF"
                :disabled="
                  !meterstandardForm.ZBBZ_SYJH || !meterstandardForm.ZBBZ_ANDJL
                "
              >
                <el-option
                  v-for="item in 12"
                  :label="item"
                  :value="item"
                  :key="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="标准人口数:" prop="ZBBZ_BZRKS">
              <el-input v-model="meterstandardForm.ZBBZ_BZRKS"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="基数增长值:" prop="ZBBZ_JSZZZ">
              <el-input v-model="meterstandardForm.ZBBZ_JSZZZ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="计划用量1:" prop="ZBBZ_JHYL">
              <el-input-number
                v-model="meterstandardForm.ZBBZ_JHYL"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="计外单价1:" prop="ZBBZ_JWDJ1">
              <el-input-number
                v-model="meterstandardForm.ZBBZ_JWDJ1"
                :precision="5"
                :step="0.00001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="计划用量2:" prop="ZBBZ_JWFD1">
              <el-input-number
                v-model="meterstandardForm.ZBBZ_JWFD1"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="计外单价2:" prop="ZBBZ_JWDJ2">
              <el-input-number
                v-model="meterstandardForm.ZBBZ_JWDJ2"
                :precision="5"
                :step="0.00001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="计划用量3:" prop="ZBBZ_JWFD2">
              <el-input-number
                v-model="meterstandardForm.ZBBZ_JWFD2"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="计外单价3:" prop="ZBBZ_JWDJ3">
              <el-input-number
                v-model="meterstandardForm.ZBBZ_JWDJ3"
                :precision="5"
                :step="0.00001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="计算方式:" prop="ZBBZ_BLJE">
              <el-select
                v-model="meterstandardForm.ZBBZ_BLJE"
                placeholder="请选择分摊损耗计算方式"
              >
                <el-option label="比例金额" value="比例金额"></el-option>
                <el-option label="按金额计算" value="按金额计算"></el-option>
                <el-option
                  label="外挂计算程序"
                  value="外挂计算程序"
                ></el-option>
              </el-select>
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
  addWalkTableStandards,
  updateExpenseItemmeterstandard,
  queryChargeForCurrency,
} from "@/api/FeeManagement/StandardDefinition.js";
export default {
  data() {
    return {
      visible: this.meterstandardshow,
      title: "", //标题
      meterstandardForm: {},
      rules: {
        ZBBZ_BZMC: [
          { required: true, message: "请输入标准名称", trigger: "blur" },
        ],
        ZBBZ_SFBZ: [
          { required: true, message: "请选择收费币种", trigger: "blur" },
        ],
        ZBBZ_YLLX: [
          { required: true, message: "请选择用量类型", trigger: "blur" },
        ],
        ZBBZ_ZBJS: [
          { required: true, message: "请输入转表基数", trigger: "blur" },
        ],
        ZBBZ_JNDJ: [
          { required: true, message: "请输入标准单价", trigger: "blur" },
        ],
        ZBBZ_BBL: [
          { required: true, message: "请输入表倍率", trigger: "blur" },
        ],
      },
      ChargeForCurrencyData: {},
    };
  },
  props: {
    meterstandardshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    meterstandardshow() {
      this.visible = this.meterstandardshow;
    },
  },
  methods: {
    //   判断新增，修改
    getCostItemData(data, type) {
      this.ChargeForCurrency();
      if (type == 0) {
        this.title = "新增费用项目";
        data.ZBBZ_YLLX = "按表读数";
        data.ZBBZ_BLJE = "";
        data.ZBBZ_SYJH = false;
        data.ZBBZ_ANDJL = false;
        data.ZBBZ_ZBJS = 99999;
        this.meterstandardForm = JSON.parse(JSON.stringify(data));
      } else {
        data.ZBBZ_QJYF = data.ZBBZ_QJYF === 0 ? 1 : data.ZBBZ_QJYF;
        this.meterstandardForm = JSON.parse(JSON.stringify(data));
        this.title = "修改";
      }
    },
    //收费币种
    ChargeForCurrency() {
      queryChargeForCurrency().then((response) => {
        var data = response;
        if (data) {
          this.ChargeForCurrencyData = data;
        }
      });
    },
    // 新增/修改分区
    sure() {
      var _this = this;
      this.$refs["meterstandardForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增费用项目") {
            addWalkTableStandards(_this.meterstandardForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateExpenseItemmeterstandard(_this.meterstandardForm).then(
              (response) => {
                if (response.returnStatus == "SUCCESS") {
                  let newobj = JSON.parse(
                    JSON.stringify(_this.meterstandardForm)
                  );
                  _this.$emit("RefreshItem", true);
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
      this.$emit("update:meterstandardshow", false);
      this.$nextTick(() => {
        this.$refs.meterstandardForm.resetFields(); //重置输入框提示
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
