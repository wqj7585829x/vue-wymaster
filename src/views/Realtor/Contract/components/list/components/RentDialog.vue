<template>
  <div class="RentDialog">
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
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12" style="min-width: 220px">
            <el-form-item label="递增开始:">
              <el-date-picker
                v-model="queryResourcePage.FJDA_FJID"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12" style="min-width: 220px">
            <el-form-item label="递增截止:">
              <el-date-picker
                v-model="queryResourcePage.FJDA_FJID"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="递增周期:" prop="carCode">
              <el-input
                v-model="TableForm.carCode"
                placeholder="请输入递增周期"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="精确位数:" prop="carCode">
              <el-input
                v-model="TableForm.carCode"
                placeholder="请输入递增周期"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="递增幅度:" prop="carCode">
              <el-checkbox
                v-model="checked"
                style="float: left; margin-right: 2px"
              ></el-checkbox>
              <el-form-item
                label="百分比:"
                prop="carCode"
                style="width: 37.5%; float: left; margin-right: 47px"
                label-width="50px"
              >
                <el-input
                  v-model="TableForm.carCode"
                  placeholder="请输入递增周期"
                ></el-input>
              </el-form-item>
              <el-checkbox
                v-model="checked"
                style="float: left; margin-right: 2px"
              ></el-checkbox>
              <el-form-item
                label="金额:"
                prop="carCode"
                style="width: 45%; float: left"
                label-width="70px"
              >
                <el-input
                  v-model="TableForm.carCode"
                  placeholder="请输入递增周期"
                ></el-input>
              </el-form-item>
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
      visible: this.Rentshow,
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
    Rentshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Rentshow() {
      this.visible = this.Rentshow;
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
      this.$emit("update:Rentshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.RentDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.RentDialog .el-input-number {
  width: 100%;
}

.RentDialog .el-input-number input {
  text-align: left;
}
</style>
