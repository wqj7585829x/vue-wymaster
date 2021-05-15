<template>
  <div class="TaxDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div class="buttonBox">
        <el-button type="primary" class="edit" @click="Reductionshow = true"
          >修改</el-button
        >税源信息
      </div>
      <el-table ref="multipleTable" :data="tableData" border>
        <el-table-column
          fixed
          label="选择"
          type="selection"
          width="50"
        ></el-table-column>
        <el-table-column prop="DLDA_GLQID" label="分区代码"></el-table-column>
        <el-table-column prop="DLDA_DLID" label="楼栋代码"></el-table-column>
        <el-table-column prop="DLDA_DLMC" label="楼栋名称"></el-table-column>
        <el-table-column
          prop="DLDA_DLLB"
          label="栋楼类别"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="DLDA_JZMJ"
          label="建筑面积"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="DLDA_SYMJ"
          label="使用面积"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="DLDA_LCS"
          label="楼层数"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="DLDA_DTSL"
          label="电梯数量"
          width="120"
        ></el-table-column>
      </el-table>
      <div class="buttonBox" style="margin-top: 50px">
        <el-button type="primary" class="edit" @click="Reliefinforshow = true"
          >修改</el-button
        >减免信息
      </div>
      <el-table ref="multipleTable" :data="tableData" border>
        <el-table-column
          fixed
          label="选择"
          type="selection"
          width="50"
        ></el-table-column>
        <el-table-column prop="DLDA_GLQID" label="分区代码"></el-table-column>
        <el-table-column prop="DLDA_DLID" label="楼栋代码"></el-table-column>
        <el-table-column prop="DLDA_DLMC" label="楼栋名称"></el-table-column>
        <el-table-column
          prop="DLDA_DLLB"
          label="栋楼类别"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="DLDA_JZMJ"
          label="建筑面积"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="DLDA_SYMJ"
          label="使用面积"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="DLDA_LCS"
          label="楼层数"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="DLDA_DTSL"
          label="电梯数量"
          width="120"
        ></el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>

    <ReductionDialog
      :Reductionshow.sync="Reductionshow"
      ref="ReductionDialog"
    ></ReductionDialog>

    <ReliefinforDialog
      :Reliefinforshow.sync="Reliefinforshow"
      ref="ReliefinforDialog"
    ></ReliefinforDialog>
  </div>
</template>

<script>
import { updTemporaryCar } from "@/api/ParkingManagement/TemporaryCar";
import ReductionDialog from "./ReductionDialog";
import ReliefinforDialog from "./ReliefinforDialog";
export default {
  data() {
    return {
      visible: this.Taxshow,
      title: "", //标题
      categoryList: "",
      rules: {},
      TableForm: {},
      tableData: [],
      Reductionshow: false,
      Reliefinforshow: false,
    };
  },
  props: {
    Taxshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Taxshow() {
      this.visible = this.Taxshow;
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
      this.$emit("update:Taxshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
  components: {
    ReductionDialog,
    ReliefinforDialog,
  },
};
</script>

<style lang="scss">
.TaxDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.TaxDialog .el-input-number {
  width: 100%;
}

.TaxDialog .el-input-number input {
  text-align: left;
}

.TaxDialog .buttonBox {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 33px;
  margin-bottom: 10px;
}

.TaxDialog .edit {
  position: absolute;
  left: 0px;
  top: 0;
}

.TaxDialog .el-dialog__body {
  padding: 30px;
}
</style>
