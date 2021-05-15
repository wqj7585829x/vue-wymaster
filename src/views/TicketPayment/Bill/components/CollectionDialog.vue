<template>
  <div class="CollectionDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :show="show"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="105px"
        :model="CollectionForm"
        :rules="rules"
        ref="CollectionForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="交款人：" prop="SKPZ_JKR">
              <el-input v-model="CollectionForm.SKPZ_JKR"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="资源代码：" prop="PJLYMX_FJID">
              <el-input
                v-model="CollectionForm.PJLYMX_FJID"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收款方式：" prop="SFKM_SKFS">
              <el-select v-model="CollectionForm.SFKM_SKFS">
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
                v-model="CollectionForm.SKPZ_TZRQ"
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
                v-model="CollectionForm.SKPZ_RZSJ"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="制表人：" prop="SKPZ_SKR">
              <el-input
                v-model="CollectionForm.SKPZ_SKR"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="tabledetail">
        <el-table ref="singleTable1" height="350" :data="tableData" border>
          <el-table-column
            label="类型"
            prop="typeName"
            fixed
            width="100"
          ></el-table-column>
          <el-table-column
            label="收费项目"
            prop="FYSQ_SFXMMC"
            width="120"
            fixed
          ></el-table-column>
          <el-table-column label="费用期间" prop="FYSQ_ZY" width="320">
          </el-table-column>
          <el-table-column
            label="应收金额（含税）"
            width="120"
            prop="FYSQ_QSJE"
          ></el-table-column>
          <el-table-column label="本次收款" width="120" prop="FYSQ_QSJE">
          </el-table-column>
          <el-table-column
            label="税率（%）"
            width="60"
            prop="FYSQ_YSSL"
          ></el-table-column>
          <el-table-column label="金额(不含税)" prop="FYSQ_YSBHS" width="100">
          </el-table-column>
          <el-table-column label="备注" prop="FYSQ_BZ"> </el-table-column>
        </el-table>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确认收清</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { querytPayWay } from "@/api/FeeManagement/NotReceipted"; //未收清款项-收清选中Api
import {
  getPayerAndRoomId,
  queryUncollectedFeesById,
  makeCollections,
  queryDefaultMethod,
} from "@/api/TicketPayment/Bill";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: this.show,
      title: "收款", //标题
      CollectionForm: {
        SKPZ_JKR: "",
        PJLYMX_FJID: "",
        SKPZ_TZRQ: "",
        SKPZ_RZSJ: "",
        SFKM_SKFS: "",
      },
      rules: {
        SFKM_SKFS: [
          { required: true, message: "请选择收款方式", trigger: "blur" },
        ],
        SKPZ_TZRQ: [
          { required: true, message: "请选择收款日期", trigger: "blur" },
        ],
        SKPZ_RZSJ: [
          { required: true, message: "请选择入账时间", trigger: "blur" },
        ],
        SKPZ_JKR: [{ required: true, trigger: "blur" }],
      },
      tableData: [],
      PayWayData: [],
    };
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
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
  mounted() {
    //收款方式
    querytPayWay().then((response) => {
      this.PayWayData = response;
    });
  },
  methods: {
    //   判断新增，修改
    getReportData(data) {
      queryDefaultMethod().then((response) => {
        this.CollectionForm.SFKM_SKFS = response.SFCS_ZFX;
      });
      getPayerAndRoomId({ PJLYMX_ZJ: data.PJLYMX_ZJ }).then((response) => {
        this.CollectionForm.SKPZ_JKR = response.data.PJLYMX_JKR;
        this.CollectionForm.PJLYMX_FJID = response.data.PJLYMX_FJID;
      });
      queryUncollectedFeesById({ PJLYMX_ZJ: data.PJLYMX_ZJ }).then(
        (response) => {
          this.tableData = response.data;
          this.tableData.forEach((item) => {
            item.typeName = "收款";
            item.FYSQ_SSJE = item.FYSQ_QSJE;
          });
        }
      );
      this.CollectionForm.SKPZ_FKGXWJ = data.PJLYMX_FKGXWJ;
      this.CollectionForm.SKPZ_RZSJ = this.getNowFormatDate(1);
      this.CollectionForm.SKPZ_TZRQ = this.getNowFormatDate(2);
      this.CollectionForm.SKPZ_SKR = this.userName;
      this.CollectionForm.SKPZ_SFBZ = "人民币";
      this.CollectionForm.PJLYMX_ZJ = data.PJLYMX_ZJ;
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["CollectionForm"].validate((valid) => {
        if (valid) {
          this.tableData.forEach((item) => {
            item.typeName = "收款";
            item.FYSQ_SSJE = item.FYSQ_QSJE;
            item.SKMX_SKFS = this.CollectionForm.SFKM_SKFS;
          });
          this.CollectionForm.list = JSON.stringify(this.tableData);
          makeCollections(this.CollectionForm).then((response) => {
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
    // 取消
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.CollectionForm.resetFields(); //重置输入框提示
      });
    },
    getNowFormatDate(type) {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (type == 1) {
        var currentdate =
          date.getFullYear() +
          seperator1 +
          month +
          seperator1 +
          strDate +
          " " +
          date.getHours() +
          seperator2 +
          date.getMinutes() +
          seperator2 +
          date.getSeconds();
        return currentdate;
      } else {
        var currentdate =
          date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
      }
    },
  },
};
</script>
<style>
.CollectionDialog .el-input-number {
  width: 100%;
}

.CollectionDialog .el-input-number input {
  text-align: left;
}

.CollectionDialog .tabledetail {
  padding: 0 30px 15px;
}
</style>
