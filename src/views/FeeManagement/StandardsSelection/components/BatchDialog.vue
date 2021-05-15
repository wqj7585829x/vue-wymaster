<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="批量选用标准"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form label-width="110px" :model="batchForm" ref="batchForm">
        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="费用名称：">
              <span class="TextColor">{{ batchForm.SFXM_MC }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="批量选用标准：" v-if="SelectType == 1">
              <el-select
                v-model="batchForm.CGJS_CGBZWJ"
                @change="standardChange"
              >
                <el-option
                  v-for="item in standardData"
                  :key="item.CGBZ_ZJ"
                  :label="item.CGBZ_BZMC"
                  :value="item.CGBZ_ZJ"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="批量选用标准：" v-if="SelectType == 2">
              <el-select
                v-model="batchForm.ZBJS_ZBBZWJ"
                @change="standardChange"
              >
                <el-option
                  v-for="item in standardData"
                  :key="item.ZBBZ_ZJ"
                  :label="item.ZBBZ_BZMC"
                  :value="item.ZBBZ_ZJ"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="remarks">
            <span>批量选用标准为空时表示：批量清除标准</span>
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
import {
  queryWalkStands,
  bathStands,
} from "@/api/FeeManagement/StandardsSelection"; //标准选用js
export default {
  data() {
    return {
      visible: this.showBatch,
      batchForm: {
        SFXM_ID: null,
        SFXM_MC: null,
        CGJS_SFXMWJ: null,
        ZBJS_SFXMWJ: null,
        CGJS_CGBZWJ: null,
        ZBJS_ZBBZWJ: null,
        GLQDA_ZJ: null,
        DLDA_ZJ: null,
        ctype: null,
      },
      standardData: [],
      SelectType: 1, //1 常规类   2 走表类
    };
  },
  props: {
    showBatch: {
      type: Boolean,
      default: false,
    },
    getTreeObj: {
      //树数据
      type: Object,
      default: {},
    },
  },
  watch: {
    showBatch() {
      this.visible = this.showBatch;
      if (this.visible) {
        this.getCommonStands();
      }
    },
  },
  methods: {
    getBatchData(data, type) {
      let newData = JSON.parse(JSON.stringify(data));
      this.batchForm = newData;
      if (type == 1) {
        this.batchForm.CGJS_SFXMWJ = this.batchForm.SFXM_ID;
        this.batchForm.ZBJS_SFXMWJ = null;
      } else {
        this.batchForm.CGJS_SFXMWJ = null;
        this.batchForm.ZBJS_SFXMWJ = this.batchForm.SFXM_ID;
      }
      this.batchForm.GLQDA_ZJ = this.getTreeObj.data.FCDM_GLQZJ;
      this.batchForm.DLDA_ZJ = this.getTreeObj.data.FCDM_ZJ;

      this.SelectType = type;
      this.batchForm.ctype = type;
    },
    getCommonStands() {
      //获取项目下标准名称
      queryWalkStands(this.batchForm).then((response) => {
        this.standardData = response;
      });
    },
    standardChange(val) {
      if (this.SelectType == 1) {
        this.batchForm.CGJS_CGBZWJ = val;
        this.batchForm.ZBJS_ZBBZWJ = null;
      } else {
        this.batchForm.ZBJS_ZBBZWJ = val;
        this.batchForm.CGJS_CGBZWJ = null;
      }
    },
    // 确定
    sure() {
      this.$refs.batchForm.validate((valid) => {
        if (valid) {
          bathStands(this.batchForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$emit("RefreshItem", this.SelectType);
              this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:showBatch", false);
    },
  },
};
</script>

<style scoped>
.remarks {
  text-align: left;
}
</style>
