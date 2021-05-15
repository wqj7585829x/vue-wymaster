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
        :model="ChargesForm"
        :rules="rules"
        ref="ChargesForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="标准名称:" prop="CGBZ_BZMC">
              <el-input v-model="ChargesForm.CGBZ_BZMC"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="标准代码:" prop="CGBZ_BZDM">
              <el-input v-model="ChargesForm.CGBZ_BZDM"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收费币种:" prop="CGBZ_SFBZ">
              <el-select v-model="ChargesForm.CGBZ_SFBZ">
                <el-option
                  v-for="item in ChargeForCurrencyData"
                  :key="item.RETURNVALUE"
                  :label="item.RETURNVALUE"
                  :value="item.RETURNVALUE"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="定价方式:" prop="CGBZ_DJFS">
              <el-select v-model="ChargesForm.CGBZ_DJFS">
                <el-option
                  label="直接设定金额"
                  value="直接设定金额"
                ></el-option>
                <el-option
                  label="设定计算公式"
                  value="设定计算公式"
                  v-if="!SFXM_SFCWF"
                ></el-option>
                <el-option
                  label="依附于其他费用的金额"
                  value="依附于其他费用的金额"
                  v-if="!SFXM_SFCWF"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50" v-if="SFXM_SFCWF">
          <el-col :span="12">
            <el-form-item label="车辆类型:" prop="CGBZ_CLLX">
              <el-select v-model="ChargesForm.CGBZ_CLLX">
                <el-option
                  v-for="item in CarTypeData"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="设定金额:"
              prop="CGBZ_SDJE"
              v-if="ChargesForm.CGBZ_DJFS === '直接设定金额'"
            >
              <el-input-number
                v-model="ChargesForm.CGBZ_SDJE"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          :gutter="50"
          v-if="ChargesForm.CGBZ_DJFS === '直接设定金额' && !SFXM_SFCWF"
        >
          <el-col :span="12">
            <el-form-item
              label="设定金额:"
              prop="CGBZ_SDJE"
              v-if="ChargesForm.CGBZ_DJFS === '直接设定金额'"
            >
              <el-input-number
                v-model="ChargesForm.CGBZ_SDJE"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50" v-if="ChargesForm.CGBZ_DJFS === '设定计算公式'">
          <el-col :span="12">
            <el-form-item
              label="计算参数:"
              prop="CGBZ_CSMC"
              v-if="ChargesForm.CGBZ_DJFS === '设定计算公式'"
            >
              <el-select v-model="ChargesForm.CGBZ_CSMC">
                <el-option
                  v-for="item in DesignConditionsData"
                  :key="item.RETURNVALUE"
                  :label="item.RETURNVALUE"
                  :value="item.RETURNVALUE"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="计算单价:"
              prop="CGBZ_JSDJ"
              v-if="ChargesForm.CGBZ_DJFS === '设定计算公式'"
            >
              <el-input-number
                v-model="ChargesForm.CGBZ_JSDJ"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50" v-if="ChargesForm.CGBZ_DJFS === '设定计算公式'">
          <el-col :span="12">
            <el-form-item
              label="计算倍数:"
              prop="CGBZ_JSBS"
              v-if="ChargesForm.CGBZ_DJFS === '设定计算公式'"
            >
              <el-input-number
                v-model="ChargesForm.CGBZ_JSBS"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          :gutter="50"
          v-if="ChargesForm.CGBZ_DJFS === '依附于其他费用的金额'"
        >
          <el-col :span="12">
            <el-form-item
              label="相关费用:"
              prop="CGBZ_XGFY"
              v-if="ChargesForm.CGBZ_DJFS === '依附于其他费用的金额'"
            >
              <el-select
                v-model="ChargesForm.CGBZ_XGFY"
                @change="RelatedFeeschange"
              >
                <el-option
                  v-for="item in RelatedFeesData"
                  :key="item.CGBZ_XGSFXMWJ"
                  :label="item.CGBZ_XGFY"
                  :value="gostr(item)"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="相关比例:"
              prop="CGBZ_XGBL"
              v-if="ChargesForm.CGBZ_DJFS === '依附于其他费用的金额'"
            >
              <el-input-number
                v-model="ChargesForm.CGBZ_XGBL"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          :gutter="50"
          v-if="ChargesForm.CGBZ_DJFS === '依附于其他费用的金额'"
        >
          <el-col :span="12">
            <el-form-item
              label="计内单价:"
              prop="CGBZ_JNDJ"
              v-if="ChargesForm.CGBZ_DJFS === '依附于其他费用的金额'"
            >
              <el-input-number
                v-model="ChargesForm.CGBZ_JNDJ"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              >
              </el-input-number>
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
  addConvention,
  updateExpenseItemCharges,
  queryChargeForCurrency,
  queryDesignConditions,
  queryOneTimeDesignConditions,
  queryRelatedFees,
  queryCarType,
} from "@/api/FeeManagement/StandardDefinition.js";
export default {
  data() {
    return {
      visible: this.Chargesshow,
      title: "", //标题
      ChargesForm: {},
      rules: {
        CGBZ_BZMC: [
          { required: true, message: "请选择标准名称", trigger: "blur" },
        ],
        CGBZ_SFBZ: [
          { required: true, message: "请选择收费币种", trigger: "blur" },
        ],
        CGBZ_DJFS: [
          { required: true, message: "请选择定价方式", trigger: "blur" },
        ],
        CGBZ_SDJE: [
          { required: true, message: "请输入设定金额", trigger: "blur" },
        ],
        CGBZ_CSMC: [
          { required: true, message: "请选择计算参数", trigger: "blur" },
        ],
        CGBZ_JSDJ: [
          { required: true, message: "请输入计算单价", trigger: "blur" },
        ],
        CGBZ_JSBS: [
          { required: true, message: "请输入计算倍数", trigger: "blur" },
        ],
        CGBZ_XGFY: [
          { required: true, message: "请选择相关费用", trigger: "blur" },
        ],
        CGBZ_XGBL: [
          { required: true, message: "请输入相关比例", trigger: "blur" },
        ],
        CGBZ_CLLX: [
          { required: true, message: "请选择车位类型", trigger: "blur" },
        ],
        CGBZ_JNDJ: [
          { required: true, message: "请输入计内单价", trigger: "blur" },
        ],
      },
      ChargeForCurrencyData: {},
      DesignConditionsData: {},
      RelatedFeesData: {},
      CarTypeData: {},
      SFXM_SFCWF: false,
    };
  },
  props: {
    Chargesshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Chargesshow() {
      this.visible = this.Chargesshow;
    },
  },
  methods: {
    //收费币种
    ChargeForCurrency() {
      queryChargeForCurrency().then((response) => {
        var data = response;
        if (data) {
          this.ChargeForCurrencyData = data;
        }
      });
    },
    //计算参数下拉
    DesignConditions(COST) {
      if (COST == "convention") {
        queryDesignConditions().then((response) => {
          var data = response;
          if (data) {
            this.DesignConditionsData = data;
          }
        });
      }
      if (COST == "oneTimeFee") {
        queryOneTimeDesignConditions().then((response) => {
          var data = response;
          if (data) {
            this.DesignConditionsData = data;
          }
        });
      }
    },
    //收费项目下拉
    RelatedFees(SFXM_ZJ) {
      queryRelatedFees(SFXM_ZJ).then((response) => {
        var data = response;
        if (data) {
          this.RelatedFeesData = data;
        }
      });
    },
    //收费项目获取值
    RelatedFeeschange(val) {
      var data = JSON.parse(val);
      this.ChargesForm.CGBZ_XGSFXMWJ = data.CGBZ_XGSFXMWJ;
      this.ChargesForm.CGBZ_XGFZ = data.CGBZ_XGFZ;
      this.ChargesForm.CGBZ_XGFY = data.CGBZ_XGFY;
    },
    //车位类型
    RelatedFeeschanges(val) {
      queryCarType().then((response) => {
        var data = response;
        if (data) {
          this.CarTypeData = data;
        }
      });
    },
    //对线转成字符创
    gostr(val) {
      return JSON.stringify(val);
    },
    //判断新增，修改
    getCostItemData(data, type) {
      this.SFXM_SFCWF = data.SFXM_SFCWF;
      this.ChargeForCurrency();
      this.DesignConditions(data.COST);
      this.ChargesForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "新增标准定义";
        this.RelatedFees("");
      } else {
        this.title = "修改";
        this.RelatedFees(data.SFXM_ZJ);
      }
      if (data.SFXM_SFCWF) {
        this.RelatedFeeschanges();
      }
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      switch (this.ChargesForm.CGBZ_DJFS) {
        case "直接设定金额":
          delete this.ChargesForm.CGBZ_CSMC;
          delete this.ChargesForm.CGBZ_JSDJ;
          delete this.ChargesForm.CGBZ_JSBS;
          delete this.ChargesForm.CGBZ_XGFY;
          delete this.ChargesForm.CGBZ_XGBL;
          delete this.ChargesForm.CGBZ_JNDJ;
          break;
        case "设定计算公式":
          delete this.ChargesForm.CGBZ_SDJE;
          delete this.ChargesForm.CGBZ_XGFY;
          delete this.ChargesForm.CGBZ_XGBL;
          delete this.ChargesForm.CGBZ_JNDJ;
          break;
        case "依附于其他费用的金额":
          delete this.ChargesForm.CGBZ_CSMC;
          delete this.ChargesForm.CGBZ_JSDJ;
          delete this.ChargesForm.CGBZ_JSBS;
          delete this.ChargesForm.CGBZ_SDJE;
          break;
      }
      this.$refs["ChargesForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增标准定义") {
            addConvention(_this.ChargesForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateExpenseItemCharges(_this.ChargesForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.ChargesForm));
                _this.$emit("RefreshItem", true);
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
      this.$emit("update:Chargesshow", false);
      this.$nextTick(() => {
        this.$refs.ChargesForm.resetFields(); //重置输入框提示
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
