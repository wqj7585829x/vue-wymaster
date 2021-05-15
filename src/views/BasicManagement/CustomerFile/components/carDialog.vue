<template>
  <div class="typeDialog">
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
          <el-col :span="12">
            <el-form-item label="车牌号:" prop="CLXX_CPH">
              <el-input v-model="TableForm.CLXX_CPH"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="缴费类型:" prop="CLXX_JFLX">
              <el-select v-model="TableForm.CLXX_JFLX">
                <el-option
                  v-for="item in ListData"
                  :key="item.CLXX_JFLX"
                  :label="item.CGBZ_BZMC"
                  :value="item.CLXX_JFLX"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="状态:" prop="CLXX_ZT">
              <el-select v-model="TableForm.CLXX_ZT">
                <el-option label="停用" :value="0"></el-option>
                <el-option label="可用" :value="1"></el-option>
                <el-option label="退租" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="停车场名称:" prop="CLXX_DZID">
              <el-select v-model="TableForm.CLXX_DZID">
                <el-option
                  v-for="item in gateListData"
                  :key="item.GATE_ID"
                  :label="item.GATE_NAME"
                  :value="item.GATE_ID"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="车辆品牌:" prop="CLXX_CLPP">
              <el-input v-model="TableForm.CLXX_CLPP"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="车辆类型:" prop="CLXX_CLLX">
              <el-input v-model="TableForm.CLXX_CLLX"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="级别:" prop="CLXX_JB">
              <el-input v-model="TableForm.CLXX_JB"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="车身结构:" prop="CLXX_CSJG">
              <el-input v-model="TableForm.CLXX_CSJG"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="车主:" prop="CLXX_CZ">
              <el-input v-model="TableForm.CLXX_CZ"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="车主手机号:" prop="CLXX_CZSJH">
              <el-input v-model="TableForm.CLXX_CZSJH"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="到期日期:" prop="CLXX_DQRQ">
              <el-date-picker
                type="date"
                v-model="TableForm.CLXX_DQRQ"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="车辆颜色:" prop="CLXX_CLYS">
              <el-input v-model="TableForm.CLXX_CLYS"></el-input>
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
import {
  insertCarMessage,
  updateCarMessage,
  queryPaymentType,
  queryGateName,
} from "@/api/ParkingManagement/TemporaryCar";
export default {
  data() {
    return {
      visible: this.Tshow,
      title: "", //标题
      TableForm: {},
      rules: {
        CLXX_CPH: [
          { required: true, message: "请输入车牌号", trigger: "blur" },
        ],
        CLXX_JFLX: [
          { required: true, message: "请选择缴费类型", trigger: "blur" },
        ],
        CLXX_DZID: [
          { required: true, message: "请选择道闸名称", trigger: "blur" },
        ],
        CLXX_ZT: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      tableData: [],
      ListData: [],
      gateListData: [],
    };
  },
  props: {
    Tshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Tshow() {
      this.visible = this.Tshow;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data, type) {
      this.getPaymentType();
      if (type == 0) {
        data.CLXX_ZT = 1;
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
            insertCarMessage(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem", {});
                _this.cancle();
              }
            });
          } else {
            updateCarMessage(_this.TableForm).then((response) => {
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
    // 取消
    cancle() {
      this.$emit("update:Tshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
    //查询缴费类型和停车场名称列表
    getPaymentType() {
      queryPaymentType().then((response) => {
        var data = response;
        if (data) {
          this.ListData = data;
        }
      });

      queryGateName().then((response) => {
        var data = response;
        if (data) {
          this.gateListData = data;
        }
      });
    },
  },
};
</script>

<style>
.typeDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.typeDialog .el-input-number {
  width: 100%;
}

.typeDialog .el-input-number input {
  text-align: left;
}
</style>
