<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="交款"
      class="el-dialog-double PaymentDamageDialog"
      :visible.sync="visible"
      @close="cancelForm"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="125px"
        :model="PaymentForm"
        :rules="rules"
        ref="PaymentForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="合同编码: " prop="contractId">
              <el-select
                v-model="PaymentForm.contractId"
                @change="contractChag"
                clearable
              >
                <el-option
                  v-for="item in proChargeData"
                  :key="item.contract_id"
                  :value="item.contract_id"
                  :label="item.contract_num"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间号: " prop="roomId">
              <el-select v-model="PaymentForm.roomId" clearable>
                <el-option
                  v-for="item in resourceData"
                  :key="item.FJDA_ZJ"
                  :value="item.FJDA_ZJ"
                  :label="item.FJDA_FJMC"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="客户名称: " prop="KHDA_KHMC">
              <el-input v-model="PaymentForm.KHDA_KHMC" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="违约类型: " prop="penaltyType">
              <el-select v-model="PaymentForm.penaltyType" clearable>
                <el-option :value="1" label="提前退租"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="违约金额：" prop="penaltyMoney">
              <el-input
                type="number"
                v-model="PaymentForm.penaltyMoney"
                class="numberType"
                :min="1"
                v-on:change="inputMouseblur(PaymentForm)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款日期：" prop="payDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="PaymentForm.payDate"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="违约事项：" prop="penaltyEvent">
              <el-input
                type="textarea"
                v-model="PaymentForm.penaltyEvent"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交款备注：" prop="remark">
              <el-input
                type="textarea"
                v-model="PaymentForm.remark"
                clearable
              ></el-input>
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
  queryZLRoomApi,
  queryContractListApi,
  queryClientsApi,
  addApi,
} from "@/api/Realtor/LiquidatedDamages"; //违约金js
export default {
  props: ["showPayment"],
  watch: {
    showPayment() {
      this.visible = this.showPayment;
      if (this.visible) {
        this.queryClientRequest();
        this.queryContractRequest();
      }
    },
  },
  data() {
    return {
      visible: this.showPayment,
      PaymentForm: {},
      resourceData: [], //房间号数据
      proChargeData: [], //合同管理主键
      clientData: [], //客户名称数据
      rules: {
        roomId: [{ required: true, message: "请选择房间", trigger: "blur" }],
        contractId: [
          { required: true, message: "请选择合同编码", trigger: "blur" },
        ],
        penaltyType: [
          { required: true, message: "请选择违约类型", trigger: "blur" },
        ],
        penaltyMoney: [
          { required: true, message: "请输入违约金额", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getData(data) {
      this.PaymentForm.dbName = data.dbName;
      this.PaymentForm.GLCID = data.GLCID;
      this.PaymentForm.YXDID = data.YXDID;
    },
    queryResoureceRequest() {
      //资源名称查询
      queryZLRoomApi(this.PaymentForm).then((response) => {
        this.resourceData = response;
      });
    },
    queryClientRequest() {
      //客户名称查询
      queryClientsApi(this.PaymentForm).then((response) => {
        this.clientData = response;
      });
    },
    queryContractRequest() {
      //合同编码查询
      queryContractListApi(this.PaymentForm).then((response) => {
        this.proChargeData = response;
      });
    },
    inputMouseblur(val) {
      //鼠标离开事件
      if (Number(val.penaltyMoney) <= 0) {
        this.$message({
          message: "金额不能小于或等于0",
          type: "warning",
        });
        val.penaltyMoney = "";
        return false;
      }
    },
    contractChag(val) {
      //合同编码选择事件
      this.PaymentForm.roomId = "";
      if (val) {
        var obj = this.proChargeData.find((item) => {
          //这里的userList就是上面遍历的数据源
          return item.contract_id === val; //筛选出匹配数据
        });
        this.PaymentForm.customerId = obj.KHDA_ZJ;
        this.PaymentForm.KHDA_KHMC = obj.KHDA_KHMC;
        let newRowData = JSON.parse(JSON.stringify(this.PaymentForm)); //拷贝一份存储对象
        this.PaymentForm = newRowData; //拷贝一份存储对象引用不同地址
        this.queryResoureceRequest();
      } else {
        this.PaymentForm.customerId = "";
        this.PaymentForm.KHDA_KHMC = "";
        this.resourceData = [];
      }
    },
    sure() {
      this.$refs.PaymentForm.validate((valid) => {
        if (valid) {
          addApi(this.PaymentForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$emit("RefreshItem");
              this.cancelForm();
            }
          });
        } else {
          return false;
        }
      });
    },
    cancelForm() {
      // 取消
      this.$emit("update:showPayment", false);
      this.$nextTick(() => {
        this.$refs.PaymentForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style lang="scss">
.PaymentDamageDialog {
  .numberType {
    .el-input__inner {
      padding: 0 !important;
      padding-left: 15px !important;
    }
  }
}
</style>
