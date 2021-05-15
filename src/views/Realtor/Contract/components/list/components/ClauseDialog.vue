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
            <el-form-item label="条款名称:" prop="clause_name">
              <el-input v-model="TableForm.clause_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="条款内容:" prop="clause_content">
              <el-input
                type="textarea"
                v-model="TableForm.clause_content"
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
import { addBreachClause, updateBreachClause } from "@/api/Realtor/Contract";
export default {
  data() {
    return {
      visible: this.Clauseshow,
      title: "新增", //标题
      categoryList: "",
      rules: {
        clause_name: [
          { required: true, message: "请输入条款名称", trigger: "blur" },
        ],
        clause_content: [
          { required: true, message: "请输入条款内容", trigger: "blur" },
        ],
      },
      TableForm: {},
    };
  },
  props: {
    Clauseshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Clauseshow() {
      this.visible = this.Clauseshow;
    },
  },
  mounted() {},
  methods: {
    // 取消
    //   判断新增，修改
    getReportData(data, type) {
      this.TableForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "新增";
      } else {
        this.title = "修改";
      }
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            addBreachClause(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateBreachClause(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.TableForm));
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
    cancle() {
      this.$emit("update:Clauseshow", false);
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
