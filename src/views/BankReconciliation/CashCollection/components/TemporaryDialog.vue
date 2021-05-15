<template>
  <div class="TableDialog">
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
            <el-form-item label="收款日期:" prop="receipt_date">
              <el-date-picker
                type="date"
                v-model="TableForm.receipt_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="大楼名称:" prop="index1">
              <el-select v-model="TableForm.index1" @change="changebuilding">
                <el-option
                  v-for="(item, index) in ListData1"
                  :key="index"
                  :label="item.build_name"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="房间名称:" prop="index2">
              <el-select v-model="TableForm.index2" @change="changeroom">
                <el-option
                  v-for="(item, index) in ListData2"
                  :key="index"
                  :label="item.room_name"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="客户名称:" prop="index3">
              <el-select v-model="TableForm.index3" @change="changecustomer">
                <el-option
                  v-for="(item, index) in ListData3"
                  :key="index"
                  :label="item.customer_name"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收款人:" prop="receiver">
              <el-input v-model="TableForm.receiver"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="收款方式:" prop="receipt_method">
              <el-input v-model="TableForm.receipt_method"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="存款方式:" prop="deposit_method">
              <el-input v-model="TableForm.deposit_method"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="到账银行:" prop="account_bank">
              <el-input v-model="TableForm.account_bank"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="存款日期:" prop="deposit_date">
              <el-date-picker
                type="date"
                v-model="TableForm.deposit_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="到账日期:" prop="account_date">
              <el-date-picker
                type="date"
                v-model="TableForm.account_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="金额:" prop="account_money">
              <el-input-number
                v-model="TableForm.account_money"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              >
              </el-input-number>
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
  queryBuilding,
  queryRoom,
  queryCustomer,
  addCashData,
  updateCashData,
} from "@/api/BankReconciliation/CashCollection";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      categoryList: "",
      rules: {
        receipt_date: [
          { required: true, message: "请选择收款日期", trigger: "blur" },
        ],
        index1: [
          { required: true, message: "请选择大楼名称", trigger: "blur" },
        ],
        index2: [
          { required: true, message: "请选择房间代码", trigger: "blur" },
        ],
        index3: [
          { required: true, message: "请选择客户名称", trigger: "blur" },
        ],
        receiver: [
          { required: true, message: "请输入收款人", trigger: "blur" },
        ],
        receipt_method: [
          { required: true, message: "请输入收款方式", trigger: "blur" },
        ],
        deposit_method: [
          { required: true, message: "请输入存款方式", trigger: "blur" },
        ],
        account_bank: [
          { required: true, message: "请输入到账银行", trigger: "blur" },
        ],
        deposit_date: [
          { required: true, message: "请选择存款日期", trigger: "blur" },
        ],
        account_money: [
          { required: true, message: "请输入金额", trigger: "blur" },
        ],
      },
      TableForm: {},
      tableData: [],
      ListData1: [],
      ListData2: [],
      ListData3: [],
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
    getbuilding() {
      queryBuilding().then((response) => {
        this.ListData1 = response;
      });
    },
    changebuilding(index) {
      this.TableForm.build_name = this.ListData1[index].build_name;
      this.TableForm.DLDA_ZJ = this.ListData1[index].DLDA_ZJ;
      queryRoom({
        DLDA_ZJ: this.ListData1[index].DLDA_ZJ,
      }).then((response) => {
        this.ListData2 = response;
        this.ListData3 = [];

        this.TableForm.index2 = "";
        this.TableForm.index3 = "";
      });
    },
    changeroom(index) {
      this.TableForm.room_name = this.ListData2[index].room_name;
      this.TableForm.FJDA_ZJ = this.ListData2[index].FJDA_ZJ;
      queryCustomer({
        FJDA_ZJ: this.ListData2[index].FJDA_ZJ,
      }).then((response) => {
        this.ListData3 = response;
        this.TableForm.index3 = "";
      });
    },
    changecustomer(index) {
      this.TableForm.customer_name = this.ListData3[index].customer_name;
      this.TableForm.KHDA_ZJ = this.ListData3[index].KHDA_ZJ;
    },
    //   判断新增，修改
    getReportData(data, type) {
      if (type === 0) {
        this.title = "新增";
        data = {
          index1: "",
          index2: "",
          index3: "",
        };
        this.TableForm = JSON.parse(JSON.stringify(data));
      } else {
        this.title = "修改";
        queryBuilding().then((response) => {
          this.ListData1 = response;
        });
        queryRoom({
          DLDA_ZJ: data.DLDA_ZJ,
        }).then((response) => {
          this.ListData2 = response;
        });
        queryCustomer({
          FJDA_ZJ: data.FJDA_ZJ,
        }).then((response) => {
          this.ListData3 = response;

          this.$nextTick(() => {
            const parent1 = this.ListData1;
            const id1 = data.DLDA_ZJ;
            data.index1 = parent1.findIndex((d) => d.DLDA_ZJ === id1);

            const parent2 = this.ListData2;
            const id2 = data.FJDA_ZJ;
            data.index2 = parent2.findIndex((d) => d.FJDA_ZJ === id2);

            const parent3 = this.ListData3;
            const id3 = data.KHDA_ZJ;
            data.index3 = parent3.findIndex((d) => d.KHDA_ZJ === id3);

            this.TableForm = JSON.parse(JSON.stringify(data));
          });
        });
      }

      this.getbuilding();
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            addCashData(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateCashData(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
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
      this.$emit("update:show", false);
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
</style>
