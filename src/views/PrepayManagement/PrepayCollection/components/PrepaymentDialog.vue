<template>
  <div class="PrepaymentDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-fourfold"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="65px"
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="30">
          <el-col :span="5">
            <el-form-item label="预交人:" prop="payer">
              <el-input
                v-model="TableForm.payer"
                :disabled="payerdisabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="入账时间:" prop="YJPZ_RZRQ">
              <el-date-picker
                type="datetime"
                placeholder="选择入账时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="TableForm.YJPZ_RZRQ"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="填制日期:" prop="fillingDate">
              <el-date-picker
                type="datetime"
                placeholder="选择填制日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="TableForm.fillingDate"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="预交方式:" prop="index">
              <el-select
                v-model="TableForm.index"
                filterable
                clearable
                @change="YJFSchange"
              >
                <el-option
                  v-for="(item, index) in options1"
                  :key="index"
                  :label="item.SFKM_SKFS"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="button buttonBox">
        <el-button type="primary" @click="addtable"> 新增</el-button>
        <el-button
          type="primary"
          @click="deletetable"
          :disabled="radio == null"
        >
          删除</el-button
        >
      </div>
      <div class="detail">
        <el-table
          ref="singleTable1"
          max-height="210"
          :data="tableData"
          @row-click="rowclick"
        >
          <el-table-column label="选择" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="index" label="预交方案名称" width="150">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.index"
                clearable
                @change="PMchange(scope.$index)"
              >
                <el-option
                  v-for="(item, index) in options2"
                  :key="index"
                  :label="item.YJFA_FAMC"
                  :value="index"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="YJMX_ZY" label="预交摘要" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.YJMX_ZY"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="YJMX_YJJE" label="预交金额(含税)" width="120">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.YJMX_YJJE"
                :precision="scope.row.YJFA_JQWS"
                :step="0.0001"
                :controls="false"
                :min="0"
                @change="JEchange(scope.$index)"
              >
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="YJMX_SL" label="税率" width="80">
          </el-table-column>
          <el-table-column
            prop="YJMX_BHSJE"
            label="预交金额(不含税)"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="YJMX_SE" label="税额" width="80">
          </el-table-column>
          <el-table-column
            prop="YJMX_CDQSNY"
            label="冲抵起始年月"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-date-picker
                type="month"
                placeholder="选择日期"
                v-model="scope.row.YJMX_CDQSNY"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            prop="YJMX_CDJZNY"
            label="冲抵截止年月"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-date-picker
                type="month"
                placeholder="选择日期"
                v-model="scope.row.YJMX_CDJZNY"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryPreplan,
  queryPaymentMethod,
  prepay,
  prepayBatch,
} from "@/api/PrepayManagement/PrepayCollection";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: this.pshow,
      title: "预交金额", //标题
      categoryList: "",
      rules: {
        payer: [{ required: true, trigger: "blur" }],
        YJPZ_RZRQ: [{ required: true, trigger: "blur" }],
        fillingDate: [{ required: true, trigger: "blur" }],
        index: [{ required: true, trigger: "blur" }],
      },
      TableForm: {},
      tableData: [],
      options1: [],
      options2: [],
      radio: null,
      payerdisabled: false,
    };
  },
  props: {
    pshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    pshow() {
      this.visible = this.pshow;
    },
  },
  mounted() {
    queryPaymentMethod({}).then((response) => {
      this.options1 = response;
    });
    queryPreplan({}).then((response) => {
      this.options2 = response.data;
    });
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
  methods: {
    mathchange(val) {
      //精确位数
      return parseFloat(Math.pow(0.1, val).toFixed(val));
    },
    getNowFormatDate() {
      //获取当前日期
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getReportData(data) {
      //初始化
      this.TableForm = {
        KHDA_ZJ: data.KHDA_ZJ,
        FKGX_ZJ: data.FKGX_ZJ,
        YJPZ_PZLX: 0,
        payer: data.payer,
        payee: this.userName,
        fillingDate: this.getNowFormatDate(),
        paymentMethod: "",
        YJMX_SFKMWJ: "",
        YJPZ_RZRQ: this.getNowFormatDate(),
        index: "",
        YJFA_CDSX: "",
      };
      this.tableData = [];
      this.payerdisabled = this.TableForm.payer.indexOf(",") > -1;
    },
    rowclick(row) {
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    YJFSchange(index) {
      //预交方式改变事件
      this.TableForm.paymentMethod = this.options1[index].paymentMethod;
      this.TableForm.YJMX_SFKMWJ = this.options1[index].SFKM_ZJ;
    },
    PMchange(index) {
      //预交方案名称改变事件
      if (this.tableData[index].index === "") {
        this.$set(this.tableData[index], "YJMX_YJFAWJ", "");
        this.$set(this.tableData[index], "YJMX_SL", "");
        this.$set(this.tableData[index], "YJMX_CDSX", "");
        this.$set(this.tableData[index], "YJFA_JQWS", 0);
      } else {
        this.$set(
          this.tableData[index],
          "YJMX_YJFAWJ",
          this.options2[this.tableData[index].index].YJFA_ZJ
        );
        this.$set(
          this.tableData[index],
          "YJMX_SL",
          this.options2[this.tableData[index].index].YJFA_SL
        );
        this.$set(
          this.tableData[index],
          "YJMX_CDSX",
          this.options2[this.tableData[index].index].YJFA_CDSX
        );
        this.$set(
          this.tableData[index],
          "YJFA_JQWS",
          this.options2[this.tableData[index].index].YJFA_JQWS
        );

        this.$set(
          this.tableData[index],
          "YJMX_BHSJE",
          (
            this.tableData[index].YJMX_YJJE /
            (1.0 + this.tableData[index].YJMX_SL * 0.01)
          ).toFixed(this.tableData[index].YJFA_JQWS)
        );
        this.$set(
          this.tableData[index],
          "YJMX_SE",
          (
            this.tableData[index].YJMX_YJJE - this.tableData[index].YJMX_BHSJE
          ).toFixed(this.tableData[index].YJFA_JQWS)
        );
      }
    },
    JEchange(index) {
      //金额改变事件
      if (this.tableData[index].YJMX_YJFAWJ != "") {
        this.$set(
          this.tableData[index],
          "YJMX_BHSJE",
          (
            this.tableData[index].YJMX_YJJE /
            (1.0 + this.tableData[index].YJMX_SL * 0.01)
          ).toFixed(this.tableData[index].YJFA_JQWS)
        );
        this.$set(
          this.tableData[index],
          "YJMX_SE",
          (
            this.tableData[index].YJMX_YJJE - this.tableData[index].YJMX_BHSJE
          ).toFixed(this.tableData[index].YJFA_JQWS)
        );
      }
    },
    addtable() {
      //新增表格数据
      this.tableData.push({
        YJMX_YJFAWJ: "",
        index: "",
        YJMX_ZY: "",
        YJMX_YJJE: "",
        YJMX_SL: "",
        YJMX_BHSJE: "",
        YJMX_SE: "",
        YJMX_CDQSNY: "",
        YJMX_CDJZNY: "",
        YJFA_JQWS: 0,
      });
    },
    deletetable() {
      //删除表格数据
      this.$confirm("此操作将删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(this.radio, 1);
          this.radio = null;
        })
        .catch(() => {
          this.radio = null; //清空选中
        });
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          var data = this.tableData;

          var YJMX_YJFAWJ = [];
          var YJMX_CDSX = [];
          var YJMX_YJJE = [];
          var YJMX_ZY = [];
          var YJMX_YJBZ = [];
          var YJMX_CDQSNY = [];
          var YJMX_CDJZNY = [];
          var YJMX_SL = [];
          var YJMX_SE = [];
          var YJMX_BHSJE = [];

          for (var i in data) {
            if (data[i].YJMX_YJFAWJ == "") {
              this.$message({
                message: `第${parseInt(i) + 1}笔的数据预交方案名称未选择`,
                type: "warning",
              });
              return;
            }
            if (data[i].YJMX_YJJE == "") {
              this.$message({
                message: `第${
                  parseInt(i) + 1
                }笔的数据预交金额（含税）请填写大于0的金额`,
                type: "warning",
              });
              return;
            }
            YJMX_YJFAWJ.push(data[i].YJMX_YJFAWJ ? data[i].YJMX_YJFAWJ : " ");
            YJMX_CDSX.push(data[i].YJMX_CDSX ? data[i].YJMX_CDSX : " ");
            YJMX_YJJE.push(data[i].YJMX_YJJE ? data[i].YJMX_YJJE : " ");
            YJMX_ZY.push(data[i].YJMX_ZY ? data[i].YJMX_ZY : " ");
            YJMX_YJBZ.push(data[i].YJMX_YJBZ ? data[i].YJMX_YJBZ : " ");
            YJMX_CDQSNY.push(data[i].YJMX_CDQSNY ? data[i].YJMX_CDQSNY : " ");
            YJMX_CDJZNY.push(data[i].YJMX_CDJZNY ? data[i].YJMX_CDJZNY : " ");
            YJMX_SL.push(data[i].YJMX_SL ? data[i].YJMX_SL : "0");
            YJMX_SE.push(data[i].YJMX_SE ? data[i].YJMX_SE : "0");
            YJMX_BHSJE.push(data[i].YJMX_BHSJE ? data[i].YJMX_BHSJE : " ");
          }

          this.TableForm.YJMX_YJFAWJ = YJMX_YJFAWJ.join(",");
          this.TableForm.YJMX_CDSX = YJMX_CDSX.join(",");
          this.TableForm.YJMX_YJJE = YJMX_YJJE.join(",");
          this.TableForm.YJMX_ZY = YJMX_ZY.join(",");
          this.TableForm.YJMX_YJBZ = YJMX_YJBZ.join(",");
          this.TableForm.YJMX_CDQSNY = YJMX_CDQSNY.join(",");
          this.TableForm.YJMX_CDJZNY = YJMX_CDJZNY.join(",");
          this.TableForm.YJMX_SL = YJMX_SL.join(",");
          this.TableForm.YJMX_SE = YJMX_SE.join(",");
          this.TableForm.YJMX_BHSJE = YJMX_BHSJE.join(",");

          if (this.TableForm.payer.indexOf(",") > -1) {
            prepayBatch(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            prepay(_this.TableForm).then((response) => {
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
      this.$emit("update:pshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.PrepaymentDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.PrepaymentDialog .el-input-number {
  width: 100%;
}

.PrepaymentDialog .el-input-number input {
  text-align: left;
}

.PrepaymentDialog .detail {
  padding: 0 10px;
}

.PrepaymentDialog .buttonBox {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 33px;
  margin-bottom: 10px;
  text-align: left;
  padding-left: 10px;
}

.PrepaymentDialog .el-dialog-fourfold .el-row {
  padding: 0;
}

.PrepaymentDialog .detail .el-input {
  width: 100%;
}

.PrepaymentDialog .el-date-editor {
  width: 100%;
}
</style>
