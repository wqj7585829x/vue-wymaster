<template>
  <div class="DepositDialog">
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
            <el-form-item label="资源代码:" prop="resourcesIndex">
              <el-select
                v-model="TableForm.resourcesIndex"
                placeholder="请选择资源代码"
                @change="resourceschange"
              >
                <el-option
                  v-for="(item, index) in options2"
                  :key="item.resourcesId"
                  :label="item.roomName"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="收费项目:" prop="pricingClauseId">
              <el-select
                v-model="TableForm.pricingClauseId"
                placeholder="请选择收费项目"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.SFXM_ZJ"
                  :label="item.SFXM_SFXMMC"
                  :value="item.SFXM_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="缴款日期:" prop="payDate">
              <el-date-picker
                v-model="TableForm.payDate"
                type="date"
                placeholder="请选择缴款日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="收费方式:" prop="payMethod">
              <el-select
                v-model="TableForm.payMethod"
                placeholder="请选择收费方式"
              >
                <el-option
                  v-for="item in options3"
                  :key="item.SFKM_ZJ"
                  :label="item.SFKM_SKFS"
                  :value="item.SFKM_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="缴费金额 :" prop="payAmount">
              <el-input
                v-model="TableForm.payAmount"
                placeholder="请填写缴费金额"
              ></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12">
            <el-form-item label="应缴金额:" prop="payableAmount">
              <el-input v-model="TableForm.payableAmount" placeholder="请填写应缴金额"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24" style="min-width: 220px">
            <el-form-item label="备注">
              <el-input
                v-model="TableForm.remark"
                clearable
                placeholder="请输入备注信息..."
              ></el-input>
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
  insertSecurityDeposit,
  updateSecurityDeposit,
  depositAPi1,
  depositAPi2,
  depositAPi3,
} from "@/api/Realtor/Contract";
export default {
  data() {
    return {
      visible: this.Depositshow,
      title: "新增", //标题
      categoryList: "",
      rules: {
        resourcesIndex: [
          { required: true, message: "请选择资源代码", trigger: "blur" },
        ],
        pricingClauseId: [
          { required: true, message: "请选择收费项目", trigger: "blur" },
        ],
        payDate: [
          { required: true, message: "请选择缴款日期", trigger: "blur" },
        ],
        payMethod: [
          { required: true, message: "请选择收费方式", trigger: "blur" },
        ],
        payAmount: [
          { required: true, message: "请选择缴费金额", trigger: "blur" },
        ],
        payableAmount: [
          { required: true, message: "请选择应缴金额", trigger: "blur" },
        ],
      },
      TableForm: {},
      options1: [],
      options2: [],
      options3: [],
      contractId: "",
      plot_id: "",
    };
  },
  props: {
    Depositshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Depositshow() {
      this.visible = this.Depositshow;
    },
  },
  mounted() {},
  methods: {
    resourceschange(index) {
      this.TableForm.resourcesId = this.options2[index].resourcesId;
      this.TableForm.roomId = this.options2[index].roomId;
    },
    getdepositAPi() {
      depositAPi1({
        contractId: this.contractId,
        plot_id: this.plot_id,
      }).then((response) => {
        this.options1 = response;
      });
      depositAPi2({
        contractId: this.contractId,
        plot_id: this.plot_id,
      }).then((response) => {
        this.options2 = response;

        if (this.title == "修改") {
          const parent = response;
          const id = this.TableForm.resourcesId;
          this.TableForm.resourcesIndex = parent.findIndex(
            (d) => d.resourcesId === id
          ); //寻找data的索引
        }
      });
      depositAPi3({
        plot_id: this.plot_id,
      }).then((response) => {
        this.options3 = response;
      });
    },
    //   判断新增，修改
    getDepositData(data, type) {
      this.options1 = [];
      this.options2 = [];
      this.options3 = [];
      data.resourcesIndex = "";
      if (type == 0) {
        this.title = "新增";
        this.contractId = data.contractId;
        this.plot_id = data.plot_id;
      } else {
        this.title = "修改";
        this.contractId = data.contractId;
        this.plot_id = data.plot_id;
      }
      this.TableForm = JSON.parse(JSON.stringify(data));
      this.getdepositAPi();
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            insertSecurityDeposit(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateSecurityDeposit(_this.TableForm).then((response) => {
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
      this.$emit("update:Depositshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.DepositDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.DepositDialog .el-input-number {
  width: 100%;
}

.DepositDialog .el-input-number input {
  text-align: left;
}
</style>
