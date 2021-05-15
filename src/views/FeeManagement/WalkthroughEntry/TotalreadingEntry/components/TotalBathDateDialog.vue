<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="批量日期"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="115px"
        :model="bathForm"
        :rules="rules"
        ref="bathForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="抄表日期：" prop="FTZB_CBRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="bathForm.FTZB_CBRQ"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="上次抄表日期：" prop="FTZB_CBRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="bathForm.FTZB_SCCBRQ"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
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
import { TotalsetBatchDate } from "@/api/FeeManagement/WalkthroughEntry"; //数据录入js

export default {
  data() {
    return {
      visible: this.showBath,
      bathForm: {
        FTZB_CBRQ: null,
        FTZB_SCCBRQ: null,
        SFXM_ZJ: null,
        FTZB_ZBMC: null,
        FTZB_SJBMC: null,
      },
      rules: {},
      SelectType: 1,
    };
  },
  props: {
    showBath: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showBath() {
      this.visible = this.showBath;
    },
  },
  methods: {
    getBathDate(SFXM_ZJ, FTZB_ZBMC, FTZB_SJBMC) {
      this.bathForm.SFXM_ZJ = SFXM_ZJ;
      this.bathForm.FTZB_ZBMC = FTZB_ZBMC;
      this.bathForm.FTZB_SJBMC = FTZB_SJBMC;
    },
    sure() {
      TotalsetBatchDate(this.bathForm).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.$emit("RefreshItem");
          this.cancle();
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:showBath", false);
      this.$nextTick(() => {
        this.$refs.bathForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
