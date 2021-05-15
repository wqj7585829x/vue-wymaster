<template>
  <div class="freezeDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-single"
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
          <el-col :span="24">
            <el-form-item label="预交余额:" prop="YJMX_YJJE">
              <el-input v-model="TableForm.YJMX_YJJE" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="冻结金额:" prop="new_DJJE">
              <el-input-number
                v-model="TableForm.new_DJJE"
                :precision="4"
                :step="0.0001"
                :controls="false"
                :min="0"
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
import { freezeOrThaw } from "@/api/PrepayManagement/PrepayCollection";
export default {
  data() {
    return {
      visible: this.show,
      title: "冻结/解冻预交金额", //标题
      rules: {
        DLDA_DLID: [{ required: true, trigger: "blur" }],
      },
      TableForm: {},
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
  mounted() {},
  methods: {
    //   判断新增，修改
    getReportData(YJYE_ZJ, data) {
      this.TableForm = {
        YJMX_YJJE: data.YJMX_DQYE,
        YJYE_ZJ: YJYE_ZJ,
        YJMX_ZJ: data.YJMX_ZJ,
        old_DJJE: data.YJMX_DJJE,
        new_DJJE: "",
      };
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (this.TableForm.new_DJJE > this.TableForm.YJMX_YJJE) {
            this.$message({
              message: "冻结余额不能大于预交金额，请重新输入!",
              type: "warning",
            });
            return;
          }
          freezeOrThaw(_this.TableForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
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
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.freezeDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.freezeDialog .el-input-number {
  width: 100%;
}

.freezeDialog .el-input-number input {
  text-align: left;
}

.freezeDialog .detail {
  padding: 0 20px;
}
</style>
