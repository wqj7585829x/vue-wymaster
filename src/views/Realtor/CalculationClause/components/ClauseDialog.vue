<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double ClauseDialog"
      :visible.sync="visible"
      @close="cancelForm"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :model="formList"
        ref="ClauseForm"
        :rules="rules"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="项目名称：" prop="plotDbName">
              <el-select
                v-model="formList.plot_id"
                @change="changeProjectName"
                :disabled="disableSelect"
              >
                <el-option
                  v-for="item in projectNameData"
                  :key="item.plot_id"
                  :value="item.plot_id"
                  :label="item.plotName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收费项目：" prop="sfxm_zj">
              <el-select v-model="formList.sfxm_zj" @change="changeProject">
                <el-option
                  v-for="item in projectData"
                  :key="item.SFXM_ZJ"
                  :value="item.SFXM_ZJ"
                  :label="item.SFXM_SFXMMC"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" style="margin-top: 30px">
          <el-col :span="12">
            <el-form-item label="计价类型：" prop="price_type">
              <el-radio-group
                v-model="formList.price_type"
                @change="priceTypeChange"
              >
                <el-radio :label="1">日总价</el-radio>
                <el-radio :label="2">月总价</el-radio>
                <el-radio :label="3">季度总价</el-radio>
                <el-radio :label="4">半年总价</el-radio>
                <el-radio :label="5">年总价</el-radio>
                <el-radio :label="6">日单价</el-radio>
                <el-radio :label="7">月单价</el-radio>
                <el-radio :label="8">季度单价</el-radio>
                <el-radio :label="9">半年单价</el-radio>
                <el-radio :label="10">年单价</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="计费周期：">
              <el-select v-model="formList.pricing_cycle">
                <el-option :value="1" label="按自然月"></el-option>
                <el-option :value="2" label="按周期"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="50" style="margin-top: 30px">
          <!-- <el-col :span="12">
            <el-form-item label="月费用计算公式：">
              <el-select v-model="formList.calculate_type">
                <el-option :value="1" label="日单价*天数"></el-option>
                <el-option :value="2" label="月单价*出租面积"></el-option>
                <el-option :value="3" label="日单价*出租面积*天数"></el-option>
                <el-option :value="4" label="年总价/12"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="单价：" prop="price">
              <el-input
                type="number"
                v-model="formList.price"
                :min="0"
                :max="99999"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单价单位：">
              <el-input v-model="formList.price_unit_txt" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancelForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryChargeProjectApi,
  addPricingTermSettingApi,
  updatePricingTermSettingApi,
  ChargeProjectApi,
  queryPlotsWithAuthorityApi,
} from "@/api/Realtor/CalculationClause";
export default {
  props: ["showdialog"],
  data() {
    return {
      visible: this.showdialog,
      name: "收费项目",
      name1: "日单价",
      name2: "按自然月",
      name3: "单价*天数",
      projectData: [], //收费项目数据
      projectNameData: [], //项目名称数据
      rules: [],
      formList: {
        sfxm_zj: "",
        charge_item: "",
        price: "",
        price_unit: "",
        price_unit_txt: "",
        price_type: "",
        pricing_cycle: "",
        calculate_type: "",
        pricing_clause_setting_id: "",
        plotDbName: "",
        GLCID: "",
        YXDID: "",
        JT_ZJ: "",
        plot_id: "",
      },
      title: "新增",
      rules: {
        plotDbName: [
          { required: true, message: "请选择项目名称", trigger: "blur" },
        ],
        sfxm_zj: [
          { required: true, message: "请选择收费项目", trigger: "blur" },
        ],
        // MJK_XQWJ: [{ required: true, message: "请选择分区", trigger: "blur" }],
        // MJK_LDWJ: [{ required: true, message: "请选择楼栋", trigger: "blur" }],
        price_type: [
          { required: true, message: "请选择计价类型", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入单价", trigger: "blur" }],
      },
      disableSelect: false, //默认项目名称可以选择
    };
  },
  watch: {
    showdialog() {
      this.visible = this.showdialog;
      if (this.visible) {
        this.queryAuthtorquest(); //项目名称
      }
    },
  },
  methods: {
    getTableRow(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      if (type == 0) {
        this.title = "新增";
        this.disableSelect = false;
      } else {
        this.title = "修改";
        this.disableSelect = true;
        this.formList.pricing_clause_setting_id =
          data.pricing_clause_setting_id;
        this.formList.plotDbName_old = data.plotDbName;
        this.formList.GLCID_old = data.GLCID;
        this.formList.YXDID_old = data.YXDID;
        if (this.formList.price_unit == 1) {
          this.formList.price_unit_txt = "元/日";
        } else if (this.formList.price_unit == 2) {
          this.formList.price_unit_txt = "元/月";
        } else if (this.formList.price_unit == 3) {
          this.formList.price_unit_txt = "元/季度";
        } else if (this.formList.price_unit == 4) {
          this.formList.price_unit_txt = "元/半年";
        } else if (this.formList.price_unit == 5) {
          this.formList.price_unit_txt = "元/年";
        } else if (this.formList.price_unit == 6) {
          this.formList.price_unit_txt = "元/日.平方米";
        } else if (this.formList.price_unit == 7) {
          this.formList.price_unit_txt = "元/月.平方米";
        } else if (this.formList.price_unit == 8) {
          this.formList.price_unit_txt = "元/季度.平方米";
        } else if (this.formList.price_unit == 9) {
          this.formList.price_unit_txt = "元/半年.平方米";
        } else {
          this.formList.price_unit = "元/年.平方米";
        }
      }
    },
    queryProjectRequest() {
      //查询收费项目
      ChargeProjectApi(this.formList).then((response) => {
        this.projectData = response;
      });
    },
    queryAuthtorquest() {
      //项目名称
      queryPlotsWithAuthorityApi().then((response) => {
        this.projectNameData = response;
        if (this.title == "修改") {
          this.$nextTick(() => {
            this.queryProjectRequest(); //查询收费项目
          });
        }
      });
    },
    changeProjectName(val) {
      //项目名称选择
      this.projectData = [];
      this.formList.sfxm_zj = "";
      this.projectNameData.forEach((item) => {
        if (item.plot_id == val) {
          this.formList.GLCID = item.GLCID;
          this.formList.YXDID = item.YXDID;
          this.formList.JT_ZJ = item.JT_ZJ;
          this.formList.plotDbName = item.plotDbName;
        }
      });
      this.queryProjectRequest(); //查询收费项目
    },
    changeProject(val) {
      //收费项目选择
      this.projectData.forEach((item) => {
        if (item.SFXM_ZJ == val) {
          this.formList.charge_item = item.SFXM_SFXMMC;
        }
      });
      let newRowData = JSON.parse(JSON.stringify(this.formList)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
    },
    priceTypeChange(val) {
      //计价类型选择
      this.formList.price_unit = val;
      if (val == 1) {
        this.formList.price_unit_txt = "元/日";
      } else if (val == 2) {
        this.formList.price_unit_txt = "元/月";
      } else if (val == 3) {
        this.formList.price_unit_txt = "元/季度";
      } else if (val == 4) {
        this.formList.price_unit_txt = "元/半年";
      } else if (val == 5) {
        this.formList.price_unit_txt = "元/年";
      } else if (val == 6) {
        this.formList.price_unit_txt = "元/日.平方米";
      } else if (val == 7) {
        this.formList.price_unit_txt = "元/月.平方米";
      } else if (val == 8) {
        this.formList.price_unit_txt = "元/季度.平方米";
      } else if (val == 9) {
        this.formList.price_unit_txt = "元/半年.平方米";
      } else {
        this.formList.price_unit_txt = "元/年.平方米";
      }
      let newRowData = JSON.parse(JSON.stringify(this.formList)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      console.log("price_unit------------" + this.formList.price_unit);
    },
    // 取消
    cancelForm() {
      this.$emit("update:showdialog", false);
      this.$nextTick(() => {
        this.$refs.ClauseForm.resetFields(); //重置输入框提示
      });
    },
    sure() {
      this.$refs.ClauseForm.validate((valid) => {
        if (valid) {
          if (this.title == "新增") {
            //新增
            addPricingTermSettingApi(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj);
                this.cancelForm();
              }
            });
          } else {
            updatePricingTermSettingApi(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj);
                this.cancelForm();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.ClauseDialog {
  .el-radio-button__inner,
  .el-radio-group {
    width: 400px;
    line-height: 35px;
  }
  .el-radio {
    width: 100px;
  }
  .el-input__inner {
    padding: 0 0 0 15px !important;
  }
}
</style>
