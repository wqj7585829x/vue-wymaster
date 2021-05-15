<template>
  <div class="ReductionDialog">
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
            <el-form-item label="出租面积:" prop="carCode">
              <el-input-number
                v-model="TableForm.carCode"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同租金:" prop="carColor">
              <el-input
                v-model="TableForm.carColor"
                placeholder="请输入合同租金总收入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="租赁期起:" prop="ownerName">
              <el-date-picker
                v-model="queryResourcePage.FJDA_FJID"
                type="date"
                placeholder="选择合同约定租赁期起"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="租赁期止:" prop="ownerName">
              <el-date-picker
                v-model="queryResourcePage.FJDA_FJID"
                type="date"
                placeholder="选择合同约定租赁期止"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="租赁期起:" prop="ownerName">
              <el-date-picker
                v-model="queryResourcePage.FJDA_FJID"
                type="date"
                placeholder="*申报租金所属租赁期起"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="租赁期止:" prop="ownerName">
              <el-date-picker
                v-model="queryResourcePage.FJDA_FJID"
                type="date"
                placeholder="请输入申报租金所属租赁期止"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="申报租金:" prop="carCode">
              <el-input
                v-model="TableForm.carCode"
                placeholder="请输入申报租金收入"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="变更日期:" prop="carColor">
              <el-date-picker
                v-model="queryResourcePage.FJDA_FJID"
                type="date"
                placeholder="请输入变更日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="识别号:" prop="carCode">
              <el-input
                v-model="TableForm.carCode"
                placeholder="请输入承租方纳税人识别号："
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="名称:" prop="carCode">
              <el-input
                v-model="TableForm.carCode"
                placeholder="请输入承租方名称："
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
import { updTemporaryCar } from "@/api/ParkingManagement/TemporaryCar";
export default {
  data() {
    return {
      visible: this.Reductionshow,
      title: "税源信息修改", //标题
      categoryList: "",
      rules: {},
      TableForm: {},
      tableData: [],
      queryResourcePage: {},
    };
  },
  props: {
    Reductionshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Reductionshow() {
      this.visible = this.Reductionshow;
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
      this.$emit("update:Reductionshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.ReductionDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.ReductionDialog .el-input-number {
  width: 100%;
}

.ReductionDialog .el-input-number input {
  text-align: left;
}
</style>
