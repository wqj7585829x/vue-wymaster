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
        label-width="105px"
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="选择分区:" prop="region">
              <el-select v-model="TableForm.region" @change="changeoption1">
                <el-option
                  v-for="item in options1"
                  :key="item.GLQDA_ZJ"
                  :label="item.GLQDA_GLQMC"
                  :value="item.GLQDA_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="选择楼栋:" prop="building">
              <el-select v-model="TableForm.building" @change="changeoption2">
                <el-option
                  v-for="item in options2"
                  :key="item.DLDA_ZJ"
                  :label="item.DLDA_DLMC"
                  :value="item.DLDA_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="选择房间:" prop="room">
              <el-select v-model="TableForm.room" @change="changeoption3">
                <el-option
                  v-for="item in options3"
                  :key="item.FJDA_ZJ"
                  :label="item.FJDA_FJMC"
                  :value="item.FJDA_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="选择客户:" prop="index">
              <el-select v-model="TableForm.index" @change="changeoption4">
                <el-option
                  v-for="(item, index) in options4"
                  :key="index"
                  :label="item.KHDA_KHMC"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收费项目:" prop="index1">
              <el-select v-model="TableForm.index1" @change="changeoption5">
                <el-option
                  v-for="(item, index) in options5"
                  :key="index"
                  :label="item.SFXM_SFXMMC"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="收费方式:" prop="index2">
              <el-select v-model="TableForm.index2" @change="changeoption6">
                <el-option
                  v-for="(item, index) in options6"
                  :key="index"
                  :label="item.SFKM_SKFS"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收款金额:" prop="creditAmount">
              <el-input
                v-model="TableForm.creditAmount"
                clearable
                :disabled="true"
                :title="TableForm.creditAmount"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="到账时间:" prop="SKPZ_DZSJ">
              <el-input
                v-model="TableForm.SKPZ_DZSJ"
                clearable
                :disabled="true"
                :title="TableForm.SKPZ_DZSJ"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="到账银行:" prop="SKPZ_DZYH">
              <el-input
                v-model="TableForm.SKPZ_DZYH"
                clearable
                :disabled="true"
                :title="TableForm.SKPZ_DZYH"
              >
              </el-input>
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
  queryPartition,
  queryBuildingMessage,
  queryRoomMessage,
  queryClientForRoom,
  queryAllPayItems,
  queryPaymentMethods,
  addGatheringStone,
} from "@/api/BankReconciliation/UnmatchedReconciliation";
export default {
  data() {
    return {
      visible: this.Tableshow,
      title: "去增加收款对账", //标题
      categoryList: "",
      rules: {
        region: [{ required: true, message: "请选择分区", trigger: "blur" }],
        building: [{ required: true, message: "请选择楼栋", trigger: "blur" }],
        room: [{ required: true, message: "请选择房间", trigger: "blur" }],
        index: [{ required: true, message: "请选择客户", trigger: "blur" }],
        index1: [
          { required: true, message: "请选择收费项目", trigger: "blur" },
        ],
        index2: [
          { required: true, message: "请选择收费方式", trigger: "blur" },
        ],
      },
      TableForm: {},
      tableData: [],
      queryResourcePage: {},
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      options5: [],
      options6: [],
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
    getoption1() {
      queryPartition().then((response) => {
        this.options1 = response;
      });
    },
    getoption2(data) {
      queryBuildingMessage(data).then((response) => {
        this.options2 = response;
      });
    },
    getoption3(data) {
      queryRoomMessage(data).then((response) => {
        this.options3 = response;
      });
    },
    getoption4(data) {
      queryClientForRoom(data).then((response) => {
        this.options4 = response;
      });
    },
    getoption5() {
      queryAllPayItems().then((response) => {
        this.options5 = response;
      });
    },
    getoption6() {
      queryPaymentMethods().then((response) => {
        this.options6 = response;
      });
    },
    changeoption1(GLQDA_ZJ) {
      this.options2 = [];
      this.options3 = [];
      this.options4 = [];
      this.TableForm.building = "";
      this.TableForm.room = "";
      this.TableForm.index = "";
      this.TableForm.FKGX_ZJ = "";
      this.getoption2({ GLQDA_ZJ: GLQDA_ZJ });
    },
    changeoption2(DLDA_ZJ) {
      this.options3 = [];
      this.options4 = [];
      this.TableForm.room = "";
      this.TableForm.index = "";
      this.TableForm.FKGX_ZJ = "";
      this.getoption3({ DLDA_ZJ: DLDA_ZJ });
    },
    changeoption3(FJDA_ZJ) {
      this.options4 = [];
      this.TableForm.index = "";
      this.TableForm.FKGX_ZJ = "";
      this.getoption4({ FJDA_ZJ: FJDA_ZJ });
    },
    changeoption4(index) {
      this.TableForm.FKGX_ZJ = this.options4[index].FKGX_ZJ;
    },
    changeoption5(index) {
      this.TableForm.SFXM_SFXMMC = this.options5[index].SFXM_SFXMMC;
      this.TableForm.SFXM_ZJ = this.options5[index].SFXM_ZJ;

      this.TableForm.SFXM_SL = this.options5[index].SFXM_SL;
      this.TableForm.SFXM_FYLB = this.options5[index].SFXM_FYLB;
      this.TableForm.SFXM_QZFS = this.options5[index].SFXM_QZFS;
      this.TableForm.SFXM_JQWS = this.options5[index].SFXM_JQWS;
    },
    changeoption6(index) {
      this.TableForm.SFKM_SKFS = this.options6[index].SFKM_SKFS;
      this.TableForm.SFKM_SKFSLX = this.options6[index].SFKM_SKFSLX;
    },
    //   判断新增，修改
    getReportData(data, type) {
      this.getoption1();
      this.getoption5();
      this.getoption6();
      var creditAmount = 0;
      var SKPZ_DZSJ = [];
      var SKPZ_DZYH = [];
      var otherName = [];
      var subscribeBillId = [];
      var tranDate = [];
      for (var i in data) {
        creditAmount += parseFloat(data[i].creditAmount);
        if (SKPZ_DZSJ.indexOf(data[i].keepDate) == -1) {
          SKPZ_DZSJ.push(data[i].keepDate);
        }
        if (SKPZ_DZYH.indexOf(data[i].bank) == -1) {
          SKPZ_DZYH.push(data[i].bank);
        }
        otherName.push(data[i].otherName);
        subscribeBillId.push(data[i].subscribeBillId);
      }
      this.TableForm = JSON.parse(
        JSON.stringify({
          creditAmount: creditAmount,
          SKPZ_DZSJ: SKPZ_DZSJ.join(","),
          SKPZ_DZYH: SKPZ_DZYH.join(","),
          otherName: otherName.join(","),
          tranDate: data[0].tranDate,
          index: "",
          index1: "",
          index2: "",
          subscribeBillId: subscribeBillId.join(","),
        })
      );
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          addGatheringStone(_this.TableForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
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
