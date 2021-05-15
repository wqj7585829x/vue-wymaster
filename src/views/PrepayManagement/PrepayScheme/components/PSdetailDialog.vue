<template>
  <div class="PSdetailDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div class="detail">
        <el-table ref="multipleTable" :data="tableData" height="200" border>
          <el-table-column label="选择是否可冲抵项目">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.SKMX_SKZY"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            label="费用项目"
            width="250"
            prop="SKMX_SKFYMC"
          ></el-table-column>
          <el-table-column label="费用期间" prop="SKMX_SKZY" width="250">
            <template slot-scope="scope">
              <el-input
                type="text"
                v-model="scope.row.SKMX_SKZY"
                required
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      categoryList: "",
      rules: {},
      TableForm: {},
      tableData: [],
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
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.PSdetailDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.PSdetailDialog .el-input-number {
  width: 100%;
}

.PSdetailDialog .el-input-number input {
  text-align: left;
}

.PSdetailDialog .detail {
  padding: 0 20px;
}
</style>
