<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double AdjustmentDialog"
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
            <el-form-item label="合同编码: " prop="FYSQ_HTWJ">
              <el-select
                v-model="PaymentForm.FYSQ_HTWJ"
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
            <el-form-item label="房间名称: " prop="FYSQ_FJDAWJ">
              <el-select
                v-model="PaymentForm.FYSQ_FJDAWJ"
                @change="fjChange"
                clearable
              >
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
              <el-input v-model="PaymentForm.KHDA_KHMC"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收费项目: " prop="FYSQ_SFXMWJ">
              <el-select
                v-model="PaymentForm.FYSQ_SFXMWJ"
                @change="chargeChange"
                clearable
              >
                <el-option
                  v-for="item in chargeData"
                  :key="item.SFXM_ZJ"
                  :value="item.SFXM_ZJ"
                  :label="item.chargeItem"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="所属年月：" prop="FYSQ_TZNY">
              <el-date-picker
                type="month"
                placeholder="选择年月"
                value-format="yyyy-MM"
                v-model="PaymentForm.FYSQ_TZNY"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="租金：" prop="FYSQ_YSJE">
              <el-input
                type="number"
                v-model="PaymentForm.FYSQ_YSJE"
                class="numberType"
                :min="1"
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
  queryAllChargeItemApi,
  queryZLRoomApi,
  addReceivableApi,
  queryZLChargeItemApi,
  updateReceivableApi,
} from "@/api/Realtor/ReceivableManagement"; //房屋租赁应收管理
export default {
  props: ["showAdj"],
  watch: {
    showAdj() {
      this.visible = this.showAdj;
      if (this.visible) {
        this.$nextTick(() => {});
      }
    },
  },
  data() {
    return {
      visible: this.showAdj,
      title: "新增",
      PaymentForm: {},
      resourceData: [], //房间号数据
      proChargeData: [], //合同管理数据
      clientData: [], //客户名称数据
      chargeData: [], //收费项目数据
      dbList: [], //管理处参数List
      rules: {
        FYSQ_HTWJ: [
          { required: true, message: "请选择合同编号", trigger: "blur" },
        ],
        FYSQ_FJDAWJ: [
          { required: true, message: "请选择房间", trigger: "blur" },
        ],
        FYSQ_SFXMWJ: [
          { required: true, message: "请选择收费项目", trigger: "blur" },
        ],
        FYSQ_TZNY: [
          { required: true, message: "请选择调整年月", trigger: "blur" },
        ],
        totalAmount: [
          { required: true, message: "请输入租金", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getData(obj, type) {
      this.dbList = [];
      let newRowData = JSON.parse(JSON.stringify(obj)); //拷贝一份存储对象
      this.PaymentForm = newRowData; //拷贝一份存储对象引用不同地址
      if (type == 1) {
        this.title = "新增";
      } else {
        this.title = "修改";
        this.PaymentForm.FYSQ_TZNY = this.PaymentForm.FYSQ_SSNY;
      }
      /** 查询合同编码`房间名称需传管理处List*/
      var obj = {};
      obj.dbName = this.PaymentForm.dbName;
      obj.GLCID = this.PaymentForm.GLCID;
      obj.YXDID = this.PaymentForm.YXDID;
      this.dbList.push(obj);

      this.queryContractRequest(); //合同编码查询
      this.queryChargeRequest(); //收费项目查询
    },
    queryResoureceRequest() {
      //房间名称查询
      queryZLRoomApi(this.PaymentForm, this.dbList).then((response) => {
        this.resourceData = response;
      });
    },
    queryContractRequest() {
      //合同编码查询
      queryAllChargeItemApi(this.dbList).then((response) => {
        this.proChargeData = response;
        this.$nextTick(() => {
          if (this.title == "修改") {
            this.queryResoureceRequest();
          }
        });
      });
    },
    queryChargeRequest() {
      //收费项目查询
      queryZLChargeItemApi(this.PaymentForm).then((response) => {
        this.chargeData = response;
      });
    },
    contractChag(val) {
      //合同编码选择事件
      this.PaymentForm.FYSQ_FJDAWJ = "";
      if (val) {
        var obj = this.proChargeData.find((item) => {
          //这里的userList就是上面遍历的数据源
          return item.contract_id === val; //筛选出匹配数据
        });
        this.PaymentForm.FYSQ_KHDAWJ = obj.KHDA_ZJ;
        this.PaymentForm.KHDA_KHMC = obj.KHDA_KHMC;
        let newRowData = JSON.parse(JSON.stringify(this.PaymentForm)); //拷贝一份存储对象
        this.PaymentForm = newRowData; //拷贝一份存储对象引用不同地址
        this.queryResoureceRequest();
      } else {
        this.resourceData = [];
        this.clientData = [];
        this.PaymentForm.FYSQ_KHDAWJ = "";
        this.PaymentForm.KHDA_KHMC = "";
      }
    },
    fjChange(val) {
      //房间名称改变事件
      if (val) {
        this.PaymentForm.FJDA_ZJ = val;
        let newRowData = JSON.parse(JSON.stringify(this.PaymentForm)); //拷贝一份存储对象
        this.PaymentForm = newRowData; //拷贝一份存储对象引用不同地址
        this.queryClientRequest(); //客户名称查询
      } else {
        this.clientData = [];
      }
    },
    chargeChange(val) {
      //收费项目改变事件
      if (val) {
        var obj = this.chargeData.find((item) => {
          //这里的userList就是上面遍历的数据源
          return item.SFXM_ZJ === val; //筛选出匹配数据
        });
        this.PaymentForm.FYSQ_SFXMMC = obj.chargeItem;
        let newRowData = JSON.parse(JSON.stringify(this.PaymentForm)); //拷贝一份存储对象
        this.PaymentForm = newRowData; //拷贝一份存储对象引用不同地址
      } else {
        this.PaymentForm.FYSQ_SFXMMC = ""; //清空收费项目名称
      }
    },
    sure() {
      this.$refs.PaymentForm.validate((valid) => {
        if (valid) {
          if (this.title == "新增") {
            addReceivableApi(this.PaymentForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem");
                this.cancelForm();
              }
            });
          } else {
            updateReceivableApi(this.PaymentForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem");
                this.cancelForm();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancelForm() {
      // 取消
      this.$emit("update:showAdj", false);
      this.$nextTick(() => {
        this.$refs.PaymentForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style lang="scss">
.AdjustmentDialog {
  .numberType {
    .el-input__inner {
      padding: 0 !important;
      padding-left: 15px !important;
    }
  }
}
</style>
