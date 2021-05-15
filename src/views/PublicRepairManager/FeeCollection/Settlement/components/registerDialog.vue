<template>
  <div class="TableDialog">
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
        :model="RepairForm"
        :rules="rules"
        ref="RepairForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="支出类型:" prop="FYZC_ZCLX">
              <el-input
                v-model="RepairForm.FYZC_ZCLX"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="支出项目:" prop="FYZC_XMMC">
              <el-input v-model="RepairForm.FYZC_XMMC"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="领取人:" prop="FYZC_LQR">
              <el-input v-model="RepairForm.FYZC_LQR"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="支出金额:" prop="FYZC_ZCJE">
              <el-input-number
                v-model="RepairForm.FYZC_ZCJE"
                :precision="4"
                :step="0.0001"
                :max="maxMoney"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="支出日期:" prop="FYZC_ZCRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="RepairForm.FYZC_ZCRQ"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="出纳人:" prop="FYZC_CNR">
              <el-input v-model="RepairForm.FYZC_CNR"></el-input>
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
import { queryCostExpenditure } from "@/api/PublicRepairManager/FeeCollection";
export default {
  data() {
    return {
      visible: this.show,
      title: "费用支出", //标题
      RepairForm: {},
      rules: {
        FYZC_XMMC: [
          { required: true, message: "请输入支出项目", trigger: "blur" },
        ],
        FYZC_LQR: [
          { required: true, message: "请输入领取人", trigger: "blur" },
        ],
        FYZC_CNR: [
          { required: true, message: "请输入出纳人", trigger: "blur" },
        ],
        FYZC_ZCRQ: [
          { required: true, message: "请输入支出日期", trigger: "blur" },
        ],
        WXDJ_BXBM: [
          { required: true, message: "请输入支出金额", trigger: "blur" },
        ],
      },
      tableData: [],
      time: [],
      Proshow: false,
      buttoncheck: true,
      maxMoney: 0,
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
  methods: {
    //   判断新增，修改
    getPartitionData(data, type) {
      this.buttoncheck = true;
      var day = new Date();
      var time =
        day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
      this.maxMoney = (data.YFPZ_YFJE - data.YFPZ_YZJE).toFixed(5);
      this.RepairForm = JSON.parse(JSON.stringify(data));
      this.RepairForm = {
        FYZC_ZCLX: "结算支出",
        YFPZ_WXFAWJ: data.YFPZ_WXFAWJ,
        YFPZ_XMLX: data.YFPZ_XMLX,
        YFPZ_WXDJZJC: data.YFPZ_WXDJZJC,
        YFPZ_ZJ: data.YFPZ_ZJ,
        FYZC_ZCJE: data.YFPZ_YFJE - data.YFPZ_YZJE,
        YFPZ_YFJE: data.YFPZ_YFJE,
        YFPZ_YZJE: data.YFPZ_YZJE,
        FYZC_CNR: data.CZR,
        FYZC_XMMC: data.YFPZ_XMMC,
        FYZC_LQR: data.CZR,
        FYZC_ZCRQ: time,
      };
    },
    //   新增/修改分区
    sure() {
      if (!this.buttoncheck) return;
      this.buttoncheck = false;
      var _this = this;
      this.$refs["RepairForm"].validate((valid) => {
        if (valid) {
          queryCostExpenditure(_this.RepairForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              _this.$emit("RefreshItem");
              _this.cancle();
            } else {
              this.buttoncheck = true;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.RepairForm.resetFields(); //重置输入框提示
      });
    },
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.el-line {
  width: 90%;
  height: 2px;
  background: #888;
  margin-left: 5%;
  margin-bottom: 20px;
}
</style>
<style>
.TableDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.TableDialog .el-input-number {
  width: 100%;
}

.TableDialog .el-input-number input {
  text-align: left;
}
</style>
