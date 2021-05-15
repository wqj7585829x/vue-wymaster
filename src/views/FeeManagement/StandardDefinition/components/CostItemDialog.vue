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
        :model="CostItemForm"
        :rules="rules"
        ref="CostItemForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="费用类别:" prop="SFXM_FYLB">
              <el-select
                v-model="CostItemForm.SFXM_FYLB"
                :disabled="CostItemForm.subordinate"
              >
                <el-option label="常规费用" value="常规费用"></el-option>
                <el-option label="走表费用" value="走表费用"></el-option>
                <el-option label="一次性费用" value="一次性费用"></el-option>
                <el-option label="外部导入" value="外部导入"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="开票类型：" prop="SFXM_SFXMYWMC">
              <el-select
                v-model="CostItemForm.SFXM_SFXMYWMC"
                placeholder="请选择开票类型（业主）"
                clearable
              >
                <el-option label="发票" value="1"></el-option>
                <el-option label="收据" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="名称:" prop="SFXM_SFXMMC">
              <el-input
                v-model="CostItemForm.SFXM_SFXMMC"
                placeholder="请输入收费项目名称"
              ></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12">
            <el-form-item label="代码：" prop="SFXM_SFXMDM">
              <el-input v-model="CostItemForm.SFXM_SFXMDM" placeholder="请输入收费项目代码"></el-input>
            </el-form-item>
          </el-col> -->

          <el-col :span="12">
            <el-form-item label="取整方式:" prop="SFXM_QZFS">
              <el-select v-model="CostItemForm.SFXM_QZFS">
                <el-option label="四舍五入" value="四舍五入"></el-option>
                <!-- <el-option  label="舍弃尾数" value="舍弃尾数"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="税率:" prop="SFXM_SL">
              <el-input-number
                v-model="CostItemForm.SFXM_SL"
                :precision="0"
                :step="1"
                :min="1"
                :max="100"
                :controls="false"
                v-if="CostItemForm.SFXM_SFXMYWMC == '1'"
              ></el-input-number>
              <el-input-number
                v-model="CostItemForm.SFXM_SL"
                :precision="0"
                :step="1"
                :min="0"
                :max="100"
                :controls="false"
                v-else
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="精确位数:" prop="SFXM_JQWS">
              <el-select v-model="CostItemForm.SFXM_JQWS">
                <el-option
                  v-for="item in 5"
                  :label="item - 1"
                  :value="item - 1"
                  :key="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="税控编码:" prop="SFXM_KMBZ">
              <el-input
                v-model="CostItemForm.SFXM_KMBZ"
                :disabled="CostItemForm.SFXM_SFXMYWMC != '1'"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="到期提醒:" prop="SFXM_DFZNJKMMC">
              <el-input-number
                v-model="CostItemForm.SFXM_DFZNJKMMC"
                placeholder="请输入费用到期提醒"
                :precision="0"
                :step="1"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="项目归类:" prop="SFXM_LXGL">
              <el-select v-model="CostItemForm.SFXM_LXGL">
                <el-option
                  v-for="(item, index) in ClassifyList"
                  :key="index"
                  :label="item.MC"
                  :value="item.SFXM_LXGL"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="CostItemForm.SFXM_FYLB == '一次性费用'">
            <el-form-item label="必选标准：" prop="SFXM_SFBXBZ">
              <el-checkbox v-model="CostItemForm.SFXM_SFBXBZ"></el-checkbox>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="CostItemForm.SFXM_FYLB == '常规费用'">
            <el-form-item label="车位费：" prop="SFXM_SFCWF">
              <el-checkbox v-model="CostItemForm.SFXM_SFCWF"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="备注:" prop="SFXM_BZ">
              <el-input
                v-model="CostItemForm.SFXM_BZ"
                type="textarea"
                auto-complete="off"
              ></el-input>
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
  addExpenseItem,
  updateExpenseItem,
  queryClassify,
} from "@/api/FeeManagement/StandardDefinition.js";
import { validateonlynumber } from "@/utils/validate.js";
export default {
  data() {
    var validate = (rule, value, callback) => {
      if (validateonlynumber(value.substr(0, 1))) {
        callback(new Error("收费项目名称中第一个字符不能是数字!"));
      } else {
        callback();
      }
    };
    return {
      visible: this.CostItemshow,
      title: "", //标题
      CostItemForm: {},
      rules: {
        SFXM_SFXMMC: [
          { required: true, message: "请输入收费项目名称", trigger: "blur" },
          { validator: validate, trigger: "blur" },
        ],
        SFXM_QZFS: [
          { required: true, message: "请选择取整方式", trigger: "blur" },
        ],
        SFXM_JQWS: [
          { required: true, message: "请选择精确位数", trigger: "blur" },
        ],
        SFXM_FYLB: [
          { required: true, message: "请选择费用类别", trigger: "blur" },
        ],
        SFXM_PJLX: [
          { required: true, message: "请选择票据类型", trigger: "blur" },
        ],
        SFXM_LXGL: [
          { required: true, message: "请选择归类项目", trigger: "blur" },
        ],
        SFXM_SL: [{ required: true, message: "请填写税率", trigger: "blur" }],
      },
      slType: false,
      ClassifyList: [],
    };
  },
  props: {
    CostItemshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    CostItemshow() {
      this.visible = this.CostItemshow;
    },
    // 'CostItemForm.SFXM_PJLX'(val){
    //   this.$nextTick(()=>{
    //     if(val !== '发票'){

    //     }

    //   })
    // },

    "CostItemForm.SFXM_SFXMYWMC"(val) {
      this.$nextTick(() => {
        if (val === "2") {
          this.$refs.CostItemForm.validateField("SFXM_KMBZ");
          this.CostItemForm.SFXM_KMBZ = "";
          this.CostItemForm.SFXM_SL = 0;
        }
        if (val === "1") {
          this.CostItemForm.SFXM_SL =
            this.CostItemForm.SFXM_SL == 0 ? 1 : this.CostItemForm.SFXM_SL;
        }
        // this.CostItemForm.SFXM_SL = this.slType ? '' : this.CostItemForm.SFXM_SL
        this.slType = true;
      });
    },
  },
  methods: {
    getClassify() {
      queryClassify().then((response) => {
        this.ClassifyList = response;
      });
    },
    //   判断新增，修改
    getCostItemData(data, type) {
      this.CostItemForm = {};
      this.slType = false;
      if (type == 0) {
        data.SFXM_SFXMYWMC = "2";
        data.SFXM_SFYX = true;
        data.SFXM_BJKMMC = false;
        data.SFXM_BJKMDM = false;
        data.SFXM_QZFS = "四舍五入";
        data.SFXM_KMBZ = "";
        data.SFXM_SL = 0;
        data.SFXM_JQWS = 0;
        this.title = "新增费用项目";
      } else {
        this.title = "修改";
        if (data.SFXM_DFZNJKMMC == "") delete data.SFXM_DFZNJKMMC;
      }
      this.getClassify();
      this.CostItemForm = JSON.parse(JSON.stringify(data));
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["CostItemForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增费用项目") {
            addExpenseItem(_this.CostItemForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateExpenseItem(_this.CostItemForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.CostItemForm));
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
      this.$emit("update:CostItemshow", false);
      this.$nextTick(() => {
        this.$refs.CostItemForm.resetFields(); //重置输入框提示
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
