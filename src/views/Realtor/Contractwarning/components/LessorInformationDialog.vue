<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double ClauseDialog"
      :visible.sync="visible"
      @close="cancelForm"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="105px"
        :model="formList"
        ref="ClauseForm"
        :rules="rules"
      >
        <el-row :gutter="50" style="margin-top: 30px">
          <el-col :span="12">
            <el-form-item label="项目名称：" prop="plotId">
              <el-select
                v-model="formList.plotId"
                @change="changeProjectName"
                :disabled="disableSelect"
              >
                <el-option
                  v-for="item in projectNameData"
                  :key="item.plotId"
                  :value="item.plotId"
                  :label="item.plotName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预警天数：" prop="lessor_type">
              <el-input v-model="formList.warningDays" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancelForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  insertEarlyWarning,
  updateEarlyWarning,
  queryPlotsWithAuthority,
} from "@/api/Realtor/Contractwarning";
export default {
  props: ["showdialog"],
  data() {
    return {
      visible: this.showdialog,
      rules: [],
      formList: {
        warningDays: "",
        plotId: "",
        GLCID: "",
        YXDID: "",
        JT_ZJ: "",
        dbName: "",
      },
      title: "新增",
      projectNameData: [],
      rules: {
        plotId: [
          { required: true, message: "请选择项目名称", trigger: "blur" },
        ],
      },
      disableSelect: false, //默认项目名称可以选择
    };
  },
  watch: {
    showdialog() {
      this.visible = this.showdialog;
    },
  },
  methods: {
    getTableRow(data, type) {
      this.queryAuthtorquest();
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      if (type == 0) {
        this.formList.lessor_type = 1;
        this.title = "新增";
        this.disableSelect = false;
      } else {
        this.title = "修改";
        this.disableSelect = true;
      }
    },
    queryAuthtorquest() {
      //项目名称
      queryPlotsWithAuthority().then((response) => {
        this.projectNameData = response;
      });
    },
    changeProjectName(val) {
      //项目名称选择
      this.projectNameData.forEach((item) => {
        if (item.plotId == val) {
          this.formList.GLCID = item.GLCID;
          this.formList.YXDID = item.YXDID;
          this.formList.JT_ZJ = item.JT_ZJ;
          this.formList.dbName = item.plotDbName;
        }
      });
    },
    changeType(val) {
      //类型改变
      this.formList.lessor_type = val;
      let newRowData = JSON.parse(JSON.stringify(this.formList)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
    },
    sure() {
      this.$refs.ClauseForm.validate((valid) => {
        if (valid) {
          if (this.title == "新增") {
            //新增
            insertEarlyWarning(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj);
                this.cancelForm();
              }
            });
          } else {
            updateEarlyWarning(this.formList).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj);
                this.cancelForm();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 取消
    cancelForm() {
      this.$emit("update:showdialog", false);
      this.$nextTick(() => {
        this.$refs.ClauseForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style lang="scss">
.ClauseDialog {
  .el-radio-button__inner,
  .el-radio-group {
    width: 400px;
    line-height: 35px;
  }
  .el-radio {
    width: 100px;
  }
  .el-input__inner {
    padding: 0 0 0 15px !important;
  }
}
</style>
