<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="批量日期"
      class="el-dialog-double"
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
            <el-form-item label="录入日期：" prop="ZBJS_LRRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="bathForm.ZBJS_LRRQ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="上次录入日期：" prop="ZBJS_SCLRRQ">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="bathForm.ZBJS_SCLRRQ"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
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
import { setBatchDate } from "@/api/FeeManagement/WalkthroughEntry"; //数据录入js

export default {
  data() {
    return {
      visible: this.showBath,
      bathForm: {
        ZBJS_LRRQ: null,
        ZBJS_SCLRRQ: null,
        FCDM_ZJ: null,
        selectCategory: null,
        SFXM_ZJ: null,
        ZBJS_FJID: null,
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
    getBathDate(id, type, selectCategory, SFXM_ZJ, ZBJS_FJID) {
      this.bathForm.FCDM_ZJ = id;
      this.bathForm.selectCategory = selectCategory;
      this.bathForm.SFXM_ZJ = SFXM_ZJ;
      this.bathForm.ZBJS_FJID = ZBJS_FJID;
      this.SelectType = type;
    },
    sure() {
      setBatchDate(this.bathForm).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.$emit("RefreshItem", this.SelectType);
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
