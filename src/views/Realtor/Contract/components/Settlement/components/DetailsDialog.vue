<template>
  <div class="DetailsDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="105px"
        :model="DetailList"
        :rules="rules"
        ref="ruleForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="交款人：" prop="SKPZ_JKR:">
              <el-input v-model="DetailList.SKPZ_JKR"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号：">
              <el-input v-model="resourceID" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收款方式：" prop="SFKM_SKFS">
              <el-select
                v-model="DetailList.SFKM_SKFS"
                @change="changeBatchSelect"
              >
                <el-option
                  v-for="item in PayWayData"
                  :key="item.SFKM_SKFS"
                  :value="item.SFKM_SKFS"
                  :label="item.SFKM_SKFS"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款日期：" prop="SKPZ_TZRQ">
              <el-date-picker
                type="date"
                placeholder=""
                v-model="DetailList.SKPZ_TZRQ"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="入账时间：" prop="SKPZ_RZSJ">
              <el-date-picker
                type="datetime"
                placeholder=""
                v-model="DetailList.SKPZ_RZSJ"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款人：">
              <el-input v-model="userName" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="Ftitle">未收清费用</div>
      <el-table
        ref="multipleTable"
        :data="tableData1"
        border
        style="margin-bottom: 10px"
      >
        <el-table-column
          prop="FYSQ_SSNY"
          label="所属年月"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="FJDA_FJID"
          label="房间代码"
          width="105"
        ></el-table-column>
        <el-table-column
          prop="FYSQ_SFXMMC"
          label="收费项目"
          width="70"
        ></el-table-column>
        <el-table-column prop="FYSQ_ZY" label="摘要"></el-table-column>
        <el-table-column
          prop="FYSQ_QSJE"
          label="欠收金额"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="FYSQ_YSJE"
          label="应收金额"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="FYSQ_YSSL"
          label="应收税率"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="FYSQ_YSSE"
          label="应收税额"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="FYSQ_YSBHS"
          label="应收不含税"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="FYSQ_SSJE"
          label="实收金额"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="FYSQ_JSJE"
          label="费用金额"
          width="75"
        ></el-table-column>
        <el-table-column
          prop="SKMX_SKFS"
          label="收款方式"
          width="70"
        ></el-table-column>
      </el-table>
      <div class="Ftitle">房间装修扣款</div>
      <el-table
        ref="multipleTable"
        :data="tableData2"
        border
        style="margin-bottom: 10px"
      >
        <el-table-column
          prop="roomName"
          label="房间名称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="120"
        ></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column
          prop="houseDeductMoney"
          label="扣款"
          width="120"
        ></el-table-column>
      </el-table>
      <div class="Ftitle">房间设施扣款</div>
      <el-table ref="multipleTable" :data="tableData4" border>
        <el-table-column prop="rooName" label="房间号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="brand" label="品牌"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column
          prop="checkInStatus"
          label="入住状况"
        ></el-table-column>
        <el-table-column
          prop="leasebackStatus"
          label="退租状况"
        ></el-table-column>
        <el-table-column
          prop="deviceDeductMoney"
          label="扣款"
        ></el-table-column>
      </el-table>
      <div class="Ftitle">违约金</div>
      <el-table ref="multipleTable" :data="tableData3" border>
        <el-table-column prop="penaltyEvent" label="违约事件"></el-table-column>
        <el-table-column prop="penaltyName" label="违约类型"></el-table-column>
        <el-table-column prop="penaltyMoney" label="违约扣款"></el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { gatheringMessage, settleAccounts } from "@/api/Realtor/Contract";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: this.Detailshow,
      title: "收款明细", //标题
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      DetailList: {
        SFKM_SKFS: "",
      },
      PayWayData: [],
      rules: {
        SKPZ_JKR: [
          { required: true, message: "请输入交款人", trigger: "blur" },
        ],
        SFKM_SKFS: [
          { required: true, message: "请选择收款方式", trigger: "blur" },
        ],
        SKPZ_TZRQ: [
          { required: true, message: "请选择收款时间", trigger: "blur" },
        ],
        SKPZ_RZSJ: [
          { required: true, message: "请选择入账时间", trigger: "blur" },
        ],
      },
      resourceID: "",
    };
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
  props: {
    Detailshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Detailshow() {
      this.visible = this.Detailshow;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data) {
      gatheringMessage(data).then((response) => {
        this.PayWayData = response.data.paymentMethod;
        this.DetailList.SFKM_SKFS = response.data.defaultMethod.SFCS_ZFX;
        this.PayWayData.forEach((item) => {
          if (item.SFKM_SKFS == this.DetailList.SFKM_SKFS) {
            this.DetailList.SFKM_SKFSLX = item.SFKM_SKFSLX;
          }
        });
        this.DetailList.dbName = data.dbName;
        this.DetailList.GLCID = data.GLCID;
        this.DetailList.YXDID = data.YXDID;
        this.DetailList.contractId = data.contractId;
        this.DetailList.roomId = data.roomId;

        this.DetailList.SKPZ_SKR = this.userName;
        this.DetailList.SKPZ_JKR = response.data.clientInformation.KHDA_KHMC;
        this.DetailList.type = 1;
        this.DetailList.SKPZ_LY = 1;
        this.resourceID = response.data.clientInformation.contract_num;
        this.tableData1 = response.data.contractingResources;
        this.tableData2 = response.data.fitment;
        this.tableData3 = response.data.breachClauseList;
        this.tableData4 = response.data.facility;
      });
    },
    changeBatchSelect(val) {
      if (this.PayWayData.length > 0) {
        this.PayWayData.forEach((item) => {
          if (val == item.SFKM_SKFS) {
            this.DetailList.SFKM_SKFSLX = item.SFKM_SKFSLX;
          }
        });
      }
    },
    sure() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          settleAccounts(this.DetailList).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$emit("RefreshItem");
              this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:Detailshow", false);
    },
  },
};
</script>
<style lang="scss">
.DetailsDialog .el-dialog__body {
  padding: 10px 20px;
}

.DetailsDialog .el-date-editor {
  width: 100%;
}

.DetailsDialog li {
  float: left;
  padding: 10px 15px;
  width: 88px;
}

.DetailsDialog {
  .Ftitle {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(77, 77, 77, 1);
    padding: 20px 0 10px;
  }
}
</style>
