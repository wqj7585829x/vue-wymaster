<template>
  <div class="ReliefinforDialog">
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
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="减免金额:" prop="carCode">
              <el-select v-model="TableForm.xxx" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="性质代码:" prop="carCode">
              <el-input
                v-model="TableForm.carCode"
                placeholder="请输入减免性质代码"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="减免金额:" prop="carCode">
              <el-input
                v-model="TableForm.carCode"
                placeholder="请输入月减免金额"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="有效期始:" prop="ownerName">
              <el-date-picker
                v-model="queryResourcePage.FJDA_FJID"
                type="date"
                placeholder="请输入有效期始"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="有效期止:" prop="ownerName">
              <el-date-picker
                v-model="queryResourcePage.FJDA_FJID"
                type="date"
                placeholder="请输入有效期止"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item
              label="申报租金所属租赁期内减免税租金收入:"
              prop="carCode"
              label-width="270px"
            >
              <el-input v-model="TableForm.carCode"></el-input>
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
import { updTemporaryCar } from "@/api/ParkingManagement/TemporaryCar";
export default {
  data() {
    return {
      visible: this.Reliefinforshow,
      title: "税源信息修改", //标题
      categoryList: "",
      rules: {},
      TableForm: {},
      tableData: [],
      queryResourcePage: {},
      options: [
        {
          value: "选项1",
          label: "1",
        },
        {
          value: "选项2",
          label: "2",
        },
        {
          value: "选项3",
          label: "3",
        },
        {
          value: "选项4",
          label: "4",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  props: {
    Reliefinforshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Reliefinforshow() {
      this.visible = this.Reliefinforshow;
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
      this.$emit("update:Reliefinforshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.ReliefinforDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.ReliefinforDialog .el-input-number {
  width: 100%;
}

.ReliefinforDialog .el-input-number input {
  text-align: left;
}
</style>
