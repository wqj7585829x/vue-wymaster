<template>
  <el-dialog
    v-dialogDrag
    title="费用调整"
    :visible="dialogFormVisible"
    @close="cancelForm"
    :close-on-click-modal="false"
    class="el-dialog-treble Realtor_CostAdjustmentDialog"
  >
    <!-- 客户信息   -->
    <el-form label-width="85px">
      <el-row :gutter="50">
        <el-col :span="6" style="width: 300px; padding-left: 0px">
          <el-form-item label="房间号:" label-width="70px">
            <el-select
              v-model="queryObj.FYSQ_FJDAWJ"
              @change="fjhChange"
              clearable
            >
              <el-option
                v-for="item in resourceData"
                :key="item.FJDA_ZJ"
                :value="item.FJDA_ZJ"
                :label="item.FJDA_FJMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="width: 300px">
          <el-form-item label="合同编号:" label-width="70px">
            <el-select
              v-model="queryObj.FYSQ_HTWJ"
              @change="HTChange"
              clearable
            >
              <el-option
                v-for="item in clientData"
                :key="item.contract_id"
                :value="item.contract_id"
                :label="item.contract_num"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="width: 300px">
          <el-form-item label="客户名称:" label-width="70px">
            <el-select v-model="queryObj.FYSQ_KHDAWJ" disabled clearable>
              <el-option
                v-for="item in clientData"
                :key="item.KHDA_ZJ"
                :value="item.KHDA_ZJ"
                :label="item.KHDA_KHMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮区域start -->
    <section class="buttonBox">
      <el-row>
        <el-col :span="24" style="text-align: left">
          <el-button
            type="primary"
            title="新增"
            :disabled="addDisable"
            @click="add"
            >新增</el-button
          >
          <el-button
            type="danger"
            :title="detelteTitle()"
            :disabled="disabledelete"
            @click="del"
            >删除</el-button
          >
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="danger" @click="cancelForm">取消</el-button>
        </el-col>
      </el-row>
    </section>
    <!-- 按钮区域end -->
    <!-- 表格列表start -->
    <section>
      <!-- 空一行间距start -->
      <el-row></el-row>
      <!-- 空一行间距end -->
      <el-row>
        <el-col>
          <el-table
            :data="tableData"
            width="100%"
            height="350"
            ref="singleTable"
            border
            highlight-current-row
            @row-click="rowClick"
          >
            <el-table-column label="选择" width="50" fixed>
              <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio"
                  >&nbsp;</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column label="所属年月" width="150" prop="FYSQ_SSNY">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.FYSQ_SSNY"
                  type="month"
                  @change="updateChange(scope.row)"
                  value-format="yyyy-MM"
                  format="yyyy-MM"
                  placeholder="所属账期"
                  @click.stop.native
                ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="费用区间" width="200">
              <template slot-scope="scope">
                <el-input
                  type="text"
                  v-model="scope.row.FYSQ_ZY"
                  @change="updateChange(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="收费项目" width="150">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.FYSQ_SFXMMC"
                  @change="changeEXP(scope.row)"
                  @click.stop.native
                >
                  <el-option
                    v-for="item in expIdArray"
                    :key="item.SFXM_ZJ"
                    :value="item.chargeItem"
                    :label="item.chargeItem"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="调整金额（含税）" width="150">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.FYSQ_YSJE"
                  v-on:change="inputMouseblur(scope.row)"
                  @click.stop.native
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="税率(%)"
              prop="FYSQ_YSSL"
              width="100"
            ></el-table-column>
            <el-table-column label="金额(不含税)" prop="FYSQ_YSBHS" width="100">
              <template slot-scope="scope">
                <span>{{
                  (scope.row.FYSQ_YSJE -
                    (scope.row.FYSQ_YSJE -
                      scope.row.FYSQ_YSJE / (1 + scope.row.FYSQ_YSSL / 100)))
                    | rounding(scope.row.FYSQ_QZFS, scope.row.FYSQ_JQWS)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="调整说明" prop="FYSQ_TZSM">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.FYSQ_TZSM"
                  :rows="2"
                  @change="updateChange(scope.row)"
                  @click.stop.native
                >
                </el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </section>
    <!-- 表格列表end -->
  </el-dialog>
</template>
<script>
import {
  queryCostAdZLRoomApi,
  queryCostAdContractList,
  queryAllChargeItemApi,
  queryCostAdjustmentListApi,
  addFeeCollectionApi,
  updateFeeCollectionApi,
  deleteFeeCollectionApi,
} from "@/api/Realtor/ReceiptRegistration"; //房屋租凭收款登记api
import { queryDateType } from "@/api/FeeManagement/ParameterSettings";
import { roundings } from "@/utils/global.js";
export default {
  props: ["showdialogCost", "FKGX_ZJ"],
  data() {
    return {
      disabledelete: true,
      dialogFormVisible: this.showdialogCost,
      CostInfoArray: [], //费用调整信息
      tableData: [],
      multipleSelection: [],
      expIdArray: [], //收费项目数组
      addDisable: true,
      addObject: {},
      radio: "",
      tableRow: {},
      queryObj: {},
      resourceData: [], //房间数据
      clientData: [], //合同/客户数据
    };
  },
  watch: {
    showdialogCost() {
      this.dialogFormVisible = this.showdialogCost;
      if (this.dialogFormVisible) {
        this.queryResoureceRequest(); //房间查询
        this.getqueryAllChargeItem(); //收费项目查询
      }
    },
    queryObj() {
      if (
        this.queryObj.FYSQ_FJDAWJ &&
        this.queryObj.FYSQ_KHDAWJ &&
        this.queryObj.FYSQ_HTWJ
      ) {
        this.addDisable = false;
      } else {
        this.addDisable = true;
      }
    },
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "" && this.tableRow.FYSQ_ZJ) {
        this.disabledelete = false;
      } else {
        this.disabledelete = true;
      }
    },
  },
  methods: {
    getData(obj) {
      this.queryObj = obj;
      let newRowData = JSON.parse(JSON.stringify(this.queryObj)); //拷贝一份存储对象
      this.queryObj = newRowData; //拷贝一份存储对象引用不同地址
      this.queryObj.FYSQ_FJDAWJ = "";
      this.queryObj.FYSQ_KHDAWJ = "";
      this.queryObj.FYSQ_HTWJ = "";
      this.tableData = [];
    },
    queryResoureceRequest() {
      //房间查询
      queryCostAdZLRoomApi(this.queryObj).then((response) => {
        this.resourceData = response;
      });
    },
    queryClientRequest() {
      //合同/客户名称查询
      queryCostAdContractList(this.queryObj).then((response) => {
        this.clientData = response;
        if (this.clientData.length > 0) {
          this.queryObj.FYSQ_KHDAWJ = this.clientData[0].KHDA_ZJ;
          this.queryObj.FYSQ_HTWJ = this.clientData[0].contract_id;
          let newRowData = JSON.parse(JSON.stringify(this.queryObj)); //拷贝一份存储对象
          this.queryObj = newRowData; //拷贝一份存储对象引用不同地址
          this.$nextTick(() => {
            this.queryFeeAdjust(); //费用调整列表查询
          });
        }
      });
    },
    fjhChange(val) {
      this.queryObj.FYSQ_KHDAWJ = "";
      this.queryObj.FYSQ_HTWJ = "";
      if (val) {
        this.queryClientRequest();
      } else {
        this.tableData = [];
        this.clientData = [];
      }
      let newRowData = JSON.parse(JSON.stringify(this.queryObj)); //拷贝一份存储对象
      this.queryObj = newRowData; //拷贝一份存储对象引用不同地址
    },
    HTChange(val) {
      this.queryObj.FYSQ_KHDAWJ = "";
      if (val) {
        this.clientData.forEach((item) => {
          if (item.contract_id == val) {
            this.queryObj.FYSQ_KHDAWJ = item.KHDA_ZJ;
            this.queryFeeAdjust(); //费用调整列表查询
          }
        });
      } else {
        this.tableData = [];
      }
      let newRowData = JSON.parse(JSON.stringify(this.queryObj)); //拷贝一份存储对象
      this.queryObj = newRowData; //拷贝一份存储对象引用不同地址
    },
    rowClick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    inputMouseblur(val) {
      //鼠标离开事件
      var reg = /^(-?\d+)(\.\d{1,2})?$/; //小数点保留两位小数
      if (val.FYSQ_SFXMMC == "" || val.FYSQ_SFXMMC == null) {
        this.$message({ message: "请选择收费项目", type: "warning" });
        return false;
      }
      if (!Number(val.FYSQ_YSJE) && !val.FYSQ_YSJE == 0) {
        this.$message({
          message: "" + val.FYSQ_YSJE + "不是有效的数字类型",
          type: "warning",
        });
        val.FYSQ_YSJE = 0;
        return false;
      }
      if (!reg.test(val.FYSQ_YSJE)) {
        this.$message({
          message: "应收总额（含税）最多只能保留两位小数",
          type: "warning",
        });
        val.FYSQ_YSJE = 0;
        return false;
      }
      val.FYSQ_YSJE = roundings(
        parseFloat(val.FYSQ_YSJE),
        val.FYSQ_QZFS,
        val.FYSQ_JQWS
      );
      val.FYSQ_YSBHS = roundings(
        val.FYSQ_YSJE -
          (val.FYSQ_YSJE - val.FYSQ_YSJE / (1 + val.FYSQ_YSSL / 100)),
        val.FYSQ_QZFS,
        val.FYSQ_JQWS
      );
      if (val.FYSQ_QZFS == "四舍五入") {
        val.FYSQ_YSSE = roundings(
          val.FYSQ_YSJE - val.FYSQ_YSJE / (1 + val.FYSQ_YSSL / 100),
          val.FYSQ_QZFS,
          val.FYSQ_JQWS
        );
      } else {
        val.FYSQ_YSSE = val.FYSQ_YSJE - val.FYSQ_YSBHS;
      }
      if (val.FYSQ_ZJ != "") {
        //修改
        this.updateChange(val);
      }
    },
    queryFeeAdjust() {
      //费用调整查询
      queryCostAdjustmentListApi(this.queryObj).then((response) => {
        this.tableData = response.data;
      });
    },
    getqueryAllChargeItem() {
      //根据下拉客户查询收费项目
      queryAllChargeItemApi(this.queryObj).then((response) => {
        this.expIdArray = response;
      });
    },
    changeEXP(val) {
      if (!Number(val.FYSQ_YSJE) && !val.FYSQ_YSJE == 0) {
        this.$message({
          message: "" + val.FYSQ_YSJE + "不是有效的数字类型",
          type: "warning",
        });
        val.FYSQ_YSJE = 0;
        return false;
      }
      this.expIdArray.forEach(function (item) {
        if (item.chargeItem == val.FYSQ_SFXMMC) {
          val.FYSQ_SFXMDM = item.SFXM_SFXMDM;
          val.FYSQ_SFXMWJ = item.SFXM_ZJ;
          val.FYSQ_JQWS = item.SFXM_JQWS;
          val.FYSQ_QZFS = item.SFXM_QZFS;
          val.FYSQ_YSSL = item.SFXM_SL;
          val.FYSQ_FYLB = item.SFXM_FYLB;

          val.FYSQ_YSBHS = roundings(
            val.FYSQ_YSJE -
              (val.FYSQ_YSJE - val.FYSQ_YSJE / (1 + item.SFXM_SL / 100)),
            val.FYSQ_QZFS,
            val.FYSQ_JQWS
          );
          if (val.FYSQ_QZFS == "四舍五入") {
            val.FYSQ_YSSE = roundings(
              val.FYSQ_YSJE - val.FYSQ_YSJE / (1 + item.SFXM_SL / 100),
              val.FYSQ_QZFS,
              val.FYSQ_JQWS
            );
          } else {
            val.FYSQ_YSSE = val.FYSQ_YSJE - val.FYSQ_YSBHS;
          }
        }
      });

      if (val.FYSQ_ZJ != "") {
        //修改
        this.updateChange(val);
      }
    },
    add() {
      this.addDisable = true;
      //新增
      let addObject = {
        FYSQ_TZSM: null,
        FYSQ_YSJE: null,
        FYSQ_SFXMDM: null,
        FYSQ_SFXMMC: null,
        FYSQ_SFXMWJ: null,
        FYSQ_SSNY: null,
        FYSQ_FYLB: null,
        FYSQ_JQWS: 0,
        FYSQ_QZFS: null,
        FYSQ_YSSL: null,
        FYSQ_YSSE: null,
        FYSQ_YSBHS: null,
      };
      this.tableData.push(addObject);
      queryDateType().then((response) => {
        //所属年月查询
        addObject.FYSQ_SSNY = response.data.yearAndMonth.yearAndMonth;
      });
    },
    updateChange(val) {
      if (this.addDisable == false) {
        if (val.FYSQ_SFXMMC == "" || val.FYSQ_SFXMMC == null) {
          this.$message({ message: "请选择收费项目", type: "warning" });
          return false;
        }
        if (val.FYSQ_YSJE == "" || val.FYSQ_YSJE == null) {
          this.$message({ message: "请输入金额(含税)", type: "warning" });
          return false;
        }
        var data = {};
        data.FYSQ_ZJ = val.FYSQ_ZJ;
        data.FYSQ_TZSM = val.FYSQ_TZSM;
        data.FYSQ_FKGXWJ = this.FKGX_ZJ;
        data.FYSQ_YSJE = val.FYSQ_YSJE;
        data.FYSQ_SFXMDM = val.FYSQ_SFXMDM;

        data.FYSQ_SFXMMC = val.FYSQ_SFXMMC;
        data.FYSQ_SFXMWJ = val.FYSQ_SFXMWJ;
        data.FYSQ_SSNY = val.FYSQ_SSNY;
        data.FYSQ_YSJE = val.FYSQ_YSJE;
        data.FYSQ_FYLB = val.FYSQ_FYLB;
        data.FYSQ_JQWS = val.FYSQ_JQWS;
        data.FYSQ_QZFS = val.FYSQ_QZFS;
        data.FYSQ_YSSL = val.FYSQ_YSSL;
        data.FYSQ_YSSE = val.FYSQ_YSSE;
        data.FYSQ_YSBHS = val.FYSQ_YSBHS;
        data.FYSQ_ZY = val.FYSQ_ZY;
        updateFeeCollectionApi(data, this.queryObj).then((response) => {
          //保存修改确定按钮
          this.queryFeeAdjust();
        });
      }
    },
    del() {
      //删除选中
      //删除选中表格数据
      if (Object.keys(this.tableRow) != "") {
        this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteFeeCollectionApi(this.tableRow).then((response) => {
              this.queryFeeAdjust();
              this.radio = ""; //清空选中
            });
          })
          .catch(() => {
            this.radio = ""; //清空选中
          });
      }
    },
    submit() {
      if (this.addDisable) {
        //确定保存修改
        if (
          this.tableData[this.tableData.length - 1].FYSQ_SFXMMC == "" ||
          this.tableData[this.tableData.length - 1].FYSQ_SFXMMC == null
        ) {
          this.$message({ message: "请选择收费项目", type: "warning" });
          return false;
        }
        if (Number(this.tableData[this.tableData.length - 1].FYSQ_YSJE) == 0) {
          return false;
        }
        if (
          this.tableData[this.tableData.length - 1].FYSQ_YSJE == "" ||
          this.tableData[this.tableData.length - 1].FYSQ_YSJE == null
        ) {
          this.$message({ message: "请输入金额(含税)", type: "warning" });
          return false;
        }
        var data = {};
        data.FYSQ_TZSM = this.tableData[this.tableData.length - 1].FYSQ_TZSM;
        data.FYSQ_FKGXWJ = this.FKGX_ZJ;
        data.FYSQ_YSJE = this.tableData[this.tableData.length - 1].FYSQ_YSJE;
        data.FYSQ_SFXMDM = this.tableData[
          this.tableData.length - 1
        ].FYSQ_SFXMDM;

        data.FYSQ_SFXMMC = this.tableData[
          this.tableData.length - 1
        ].FYSQ_SFXMMC;
        data.FYSQ_SFXMWJ = this.tableData[
          this.tableData.length - 1
        ].FYSQ_SFXMWJ;
        data.FYSQ_SSNY = this.tableData[this.tableData.length - 1].FYSQ_SSNY;
        data.FYSQ_YSJE = this.tableData[this.tableData.length - 1].FYSQ_YSJE;
        data.FYSQ_FYLB = this.tableData[this.tableData.length - 1].FYSQ_FYLB;
        data.FYSQ_JQWS = this.tableData[this.tableData.length - 1].FYSQ_JQWS;
        data.FYSQ_QZFS = this.tableData[this.tableData.length - 1].FYSQ_QZFS;
        data.FYSQ_YSSL = this.tableData[this.tableData.length - 1].FYSQ_YSSL;
        data.FYSQ_YSSE = this.tableData[this.tableData.length - 1].FYSQ_YSSE;
        data.FYSQ_YSBHS = this.tableData[this.tableData.length - 1].FYSQ_YSBHS;
        data.FYSQ_ZY = this.tableData[this.tableData.length - 1].FYSQ_ZY;
        addFeeCollectionApi(data, this.queryObj).then((response) => {
          //保存修改确定按钮
          if (response.returnStatus == "SUCCESS") {
            this.queryFeeAdjust(this.FKGX_ZJ);
            this.addDisable = false;
            this.clearTab(); //保存后清空选中数据
          }
        });
      }
    },
    detelteTitle() {
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
    cancelForm() {
      //取消关闭
      this.clearTab();
      this.addDisable = false;
      this.$emit("RefreshItem", this.queryObj, this.selectType);
      this.$emit("update:showdialogCost", false);
    },
    clearTab() {
      //清空选中
      this.radio = "";
      this.tableRow = {};
    },
  },
  filters: {
    //过滤器
    rounding(value, roundWay, preciseDigit) {
      if (roundWay == undefined) {
        return value.toFixed(2);
      }
      // 取整方式1:四舍五入,精确位数
      if (roundWay == "四舍五入" && preciseDigit == 0) {
        return value.toFixed(0);
      }
      if (roundWay == "四舍五入" && preciseDigit == 1) {
        return value.toFixed(1);
      }
      if (roundWay == "四舍五入" && preciseDigit == 2) {
        return value.toFixed(2);
      }
      if (roundWay == "四舍五入" && preciseDigit == 3) {
        return value.toFixed(3);
      }
      if (roundWay == "四舍五入" && preciseDigit == 4) {
        return value.toFixed(4);
      }
      if (roundWay == "四舍五入" && preciseDigit == 5) {
        var valueT = String(value);
        var str = "";
        if (valueT.indexOf(".") > -1) {
          str = valueT.split(".")[0];
        } else {
          str = valueT.split("");
        }
        var last = str[str.length - 1];
        if (last < 5) {
          valueT = valueT - last;
        }
        if (last == 5) {
          valueT = Number(valueT) + 5;
        }
        if (last == 6) {
          valueT = Number(valueT) + 4;
        }
        if (last == 7) {
          valueT = Number(valueT) + 3;
        }
        if (last == 8) {
          valueT = Number(valueT) + 2;
        }
        if (last == 9) {
          valueT = Number(valueT) + 1;
        }
        if (String(valueT).indexOf(".") > -1) {
          valueT = String(valueT).split(".")[0];
        }
        return valueT;
      }

      // 取整方式2:舍弃尾数,精确位数
      if (roundWay == "舍弃尾数" && preciseDigit == 0) {
        var num = (parseInt(value * 10) / 10).toFixed(1); //小数点0位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(0);
          num = Number(num) - Number(str) / 10;
        }
        return num.toFixed(0);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 1) {
        var num = (parseInt(value * 10) / 10).toFixed(1); //小数点1位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(0);
          num = Number(num) - Number(str) / 10;
        }
        return num.toFixed(1);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 2) {
        var num = (parseInt(value * 100) / 100).toFixed(2); //小数点2位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(1);
          num = Number(num) - Number(str) / 100;
        }
        return num.toFixed(2);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 3) {
        var num = (parseInt(value * 1000) / 1000).toFixed(3); //小数点3位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(2);
          num = Number(num) - Number(str) / 1000;
        }
        return num.toFixed(3);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 4) {
        var num = (parseInt(value * 10000) / 10000).toFixed(4); //小数点4位数
        if (num.indexOf(".") > -1) {
          var str = num.split(".")[1].charAt(3);
          num = Number(num) - Number(str) / 10000;
        }
        return num.toFixed(4);
      }
      if (roundWay == "舍弃尾数" && preciseDigit == 5) {
        var num = value;
        if (String(num).indexOf(".") > -1) {
          var str = String(num).split(".")[1].charAt(0);
          num = Number(num) - Number(str) / 10;
          num = num.toFixed(0);
        }
        var lastnum = String(num).slice(-1);
        num = Number(num) - Number(lastnum);
        return num.toFixed(0);
      }
    },
  },
};
</script>
<style lang="scss">
.Realtor_CostAdjustmentDialog {
  .el-dialog__body {
    padding: 10px 0;
  }
  .el-row {
    padding: 0 20px;
  }
  .el-input {
    width: 100% !important;
  }
}
</style>
