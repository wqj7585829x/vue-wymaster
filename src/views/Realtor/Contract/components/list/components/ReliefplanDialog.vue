<template>
  <div class="ReliefplanDialog">
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
          <el-col :span="12" style="min-width: 220px">
            <el-form-item label="开始日期:">
              <el-date-picker
                v-model="queryResourcePage.FJDA_FJID"
                type="date"
                placeholder="请选择开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12" style="min-width: 220px">
            <el-form-item label="结束日期:">
              <el-date-picker
                v-model="queryResourcePage.FJDA_FJID"
                type="date"
                placeholder="请选择结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24" style="min-width: 220px">
            <el-form-item label="备注">
              <el-input
                v-model="queryResourcePage.FJDA_FJMC"
                clearable
                placeholder="请输入备注信息..."
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
      visible: this.Reliefplanshow,
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
    Reliefplanshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Reliefplanshow() {
      this.visible = this.Reliefplanshow;
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
      this.$emit("update:Reliefplanshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.ReliefplanDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.ReliefplanDialog .el-input-number {
  width: 100%;
}

.ReliefplanDialog .el-input-number input {
  text-align: left;
}
</style>
