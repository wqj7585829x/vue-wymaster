<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="125px"
        :model="formList"
        ref="ruleForm"
        :rules="sureRules"
      >
        <el-row v-if="formList.SFXM_SFCWF && selectType == 2">
          <el-col>
            <el-form-item label="车牌号：" prop="FYSQ_BZ">
              <!-- formList.agencyType -->
              <el-select v-model="formList.FYSQ_BZ" placeholder="请选择">
                <!-- 机构级别下拉循环值 -->
                <el-option
                  v-for="item in formList.carcodes"
                  :key="item.CLXX_CPH"
                  :label="item.CLXX_CPH"
                  :value="item.CLXX_CPH"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!formList.SFXM_SFCWF && selectType == 2">
          <el-col>
            <el-form-item label="备注：" prop="FYSQ_BZ">
              <el-input type="textarea" v-model="formList.FYSQ_BZ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="selectType == 1">
          <el-col :span="24">
            <el-form-item label="费用期间：" prop="FYSQ_ZY">
              <el-input
                type="textarea"
                style="height: 50px"
                v-model="formList.FYSQ_ZY"
              >
              </el-input>
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
import { updateNote, updateSummary } from "@/api/FeeManagement/NotReceipted"; //未收清款项Api
export default {
  data() {
    return {
      visible: this.showBzdialog,
      formList: {},
      title: "备注",
      selectType: 1, //1 修改费用期间   2修改备注
      resourceType: 1, //1 资源 2客户
      carNo: "",
      options: [],
      queryObj: {},
      sureRules: {},
    };
  },
  props: ["showBzdialog", "tableRow"],
  watch: {
    showBzdialog() {
      this.visible = this.showBzdialog;
    },
  },
  methods: {
    getData(obj, type, data, resourceType) {
      this.selectType = type;
      if (this.selectType == 1) {
        this.title = "费用期间";
      } else {
        this.title = "备注";
      }
      this.resourceType = resourceType;
      this.queryObj = data;
      this.formList.FYSQ_ZJ = obj.FYSQ_ZJ;
      this.formList.FYSQ_BZ = obj.FYSQ_BZ;
      this.formList.SFXM_SFCWF = obj.SFXM_SFCWF;
      this.formList.FYSQ_ZY = obj.FYSQ_ZY;
      this.formList.carcodes = obj.carcodes;
      let newRowData = JSON.parse(JSON.stringify(this.formList)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
    },
    // 确定
    sure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.selectType == 1) {
            //修改费用期间
            updateSummary(this.formList.FYSQ_ZJ, this.formList.FYSQ_ZY).then(
              (response) => {
                if (response.returnStatus == "SUCCESS") {
                  this.$emit("RefreshItem", this.queryObj, this.resourceType);
                  this.cancle();
                }
              }
            );
          } else {
            //修改备注
            updateNote(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem", this.queryObj, this.resourceType);
                this.cancle();
              }
            });
          }
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:showBzdialog", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style scoped>
.el-textarea {
  height: auto !important;
}
</style>
