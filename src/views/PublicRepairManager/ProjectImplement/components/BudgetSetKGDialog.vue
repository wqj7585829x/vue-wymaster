<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="工程开工时间"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form label-width="125px" :model="formList" ref="ruleForm">
        <el-row>
          <el-date-picker
            type="date"
            :editable="false"
            placeholder="选择日期"
            v-model="formList.time"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
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
  updateBigProjectTime,
  updateLittleProjectTime,
} from "@/api/PublicRepairManager/ProjectImplement"; //工程实施Api
import { currDate } from "@/utils/global.js";
export default {
  data() {
    return {
      visible: this.showdialogSet,
      formList: {},
      tabbar: 1, //1大项目  2小项目
    };
  },
  props: ["showdialogSet"],
  watch: {
    showdialogSet() {
      this.visible = this.showdialogSet;
    },
  },
  methods: {
    getData(data, tabbar) {
      this.tabbar = tabbar; //1大项目 2小项目
      data.time = currDate(true); //当前日期
      data.state = 1;
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData;
    },
    // 确定
    sure() {
      if (this.tabbar == 1) {
        updateBigProjectTime(this.formList).then((response) => {
          this.cancle();
        });
      } else {
        updateLittleProjectTime(this.formList).then((response) => {
          this.cancle();
        });
      }
    },
    // 取消
    cancle() {
      this.$emit("update:showdialogSet", false);
      this.$emit("RefreshItem", this.formList, this.tabbar);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
