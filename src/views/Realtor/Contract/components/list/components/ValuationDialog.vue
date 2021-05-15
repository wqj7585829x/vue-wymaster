<template>
  <div class="ValuationDialog">
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
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收费项目:" prop="carCode">
              <el-select v-model="TableForm.xxx" placeholder="请选择收费项目">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="单价:" prop="carCode">
              <el-input
                v-model="TableForm.carCode"
                placeholder="请输入金额（元）"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="单价类型:" prop="carCode">
              <el-select v-model="TableForm.xxx" placeholder="请选择单价">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="计费周期:" prop="carCode">
              <el-select v-model="TableForm.xxx" placeholder="请选择计费周期">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="计算公式:" prop="carCode">
              <el-select
                v-model="TableForm.xxx"
                placeholder="请选择月费用计算公式"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
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
import { updTemporaryCar } from "@/api/ParkingManagement/TemporaryCar";
export default {
  data() {
    return {
      visible: this.Valuationshow,
      title: "新增", //标题
      categoryList: "",
      rules: {},
      TableForm: {},
      tableData: [],
      queryResourcePage: {},
      options: [
        {
          value: "选项1",
          label: "选项1",
        },
        {
          value: "选项2",
          label: "选项2",
        },
        {
          value: "选项3",
          label: "选项3",
        },
        {
          value: "选项4",
          label: "选项4",
        },
        {
          value: "选项5",
          label: "选项5",
        },
      ],
    };
  },
  props: {
    Valuationshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Valuationshow() {
      this.visible = this.Valuationshow;
    },
  },
  mounted() {},
  methods: {
    // 取消
    //   判断新增，修改
    getReportData(data) {
      this.title = "修改";
      this.TableForm = JSON.parse(JSON.stringify(data));
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          updTemporaryCar(_this.TableForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              let newobj = JSON.parse(JSON.stringify(_this.TableForm));
              _this.$emit("RefreshItem");
              _this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("update:Valuationshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.ValuationDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.ValuationDialog .el-input-number {
  width: 100%;
}

.ValuationDialog .el-input-number input {
  text-align: left;
}
</style>
