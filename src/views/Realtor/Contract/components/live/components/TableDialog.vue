<template>
  <div class="TableDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="105px"
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="50">
          <el-col :span="20">
            <el-form-item label="仪表名称:" prop="meter_name">
              <el-select v-model="TableForm.meter_name">
                <el-option
                  v-for="item in options"
                  :key="item.dictionary_name"
                  :label="item.dictionary_name"
                  :value="item.dictionary_name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="20">
            <el-form-item label="入住抄表日期:" prop="check_in_date">
              <el-date-picker
                v-model="TableForm.check_in_date"
                type="date"
                placeholder=""
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="20">
            <el-form-item label="入住抄表读数:" prop="check_in_reading">
              <el-input-number
                v-model="TableForm.check_in_reading"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row :gutter="50">
          <el-col :span="20">
            <el-form-item label="退租抄表日期:" prop="leaseback_date">
              <el-date-picker v-model="TableForm.leaseback_date" type="date" placeholder="" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="20">
            <el-form-item label="退租抄表读数:" prop="leaseback_reading">
              <el-input-number v-model="TableForm.leaseback_reading" :precision="4" :step="0.0001" :min="0"
                :controls="false"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row> -->
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
  queryMeterPulldown,
  addMeter,
  updateMeter,
} from "@/api/Realtor/Contract";
export default {
  data() {
    return {
      visible: this.Tableshow,
      title: "交接当天各项表显示", //标题
      categoryList: "",
      rules: {
        meter_name: [
          { required: true, message: "请输入仪表名称", trigger: "blur" },
        ],
      },
      TableForm: {},
      tableData: [],
      queryResourcePage: {},
      options: [],
    };
  },
  props: {
    Tableshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Tableshow() {
      this.visible = this.Tableshow;
    },
  },
  mounted() {},
  methods: {
    // 取消
    //   判断新增，修改
    getReportData(data, type) {
      queryMeterPulldown().then((response) => {
        var data = response.data;
        this.options = data;
      });
      if (type == 0) {
        this.title = "新增";
      } else {
        this.title = "修改";
      }
      this.TableForm = JSON.parse(JSON.stringify(data));
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            addMeter(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateMeter(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.TableForm));
                _this.$emit("RefreshItem", newobj);
                _this.cancle();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("update:Tableshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

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

.TableDialog .el-dialog .el-row {
  padding: 0;
}

.TableDialog .el-dialog__body {
  padding: 10px 0;
}

.TableDialog .el-input {
  width: 100%;
}
</style>
