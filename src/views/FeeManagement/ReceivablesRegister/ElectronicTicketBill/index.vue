<template>
  <div class="ElectronicTicketBill">
    <!-- 搜索框begin -->
    <div class="Resource_wrap" ref="elResourece">
      <el-form label-width="115px">
        <el-row :gutter="30">
          <el-col :span="5" style="width: auto">
            <el-form-item label="" label-width="10px;">
              <span class="current_resource"
                >当前资源：<span class="TextColor">{{
                  resourceName
                }}</span></span
              >
              <span class="current_client"
                >当前客户：<span class="TextColor">{{
                  tableParameter.KHDA_KHMC
                }}</span></span
              >
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 370px">
            <el-form-item label="开票日期:" label-width="80px">
              <el-date-picker
                v-model="time"
                unlink-panels
                align="right"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="timeChange"
                :clearable="false"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 0">
            <el-form-item label-width="0px">
              <el-button
                type="success"
                @click="submit()"
                v-has="'ReceiTicketBillQuery_has'"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 按钮区域start -->
    <section class="buttonBox" ref="elbuttonBox">
      <el-row>
        <el-col :span="24">
          <el-button
            type="danger"
            @click="BillObsolete"
            :disabled="disabledObsolete"
            :title="ObsoleteTitle"
            >作废</el-button
          >
          <el-button
            type="primary"
            @click="Billreuse"
            :disabled="disabledReuse"
            :title="ReuseTitle"
            >票据号重用</el-button
          >
          <el-button type="primary" @click="BillPrint" :disabled="disabledPrint"
            >打印预览
          </el-button>
        </el-col>
      </el-row>
    </section>
    <!-- 按钮区域end -->
    <!-- 表格列表start -->
    <section ref="ListTable">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="210"
        class="commonTable"
        @row-click="rowClick"
        :cell-class-name="cellStyle"
      >
        <el-table-column label="选择" width="50" fixed>
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="PJLYMX_PJZT"
          label="票据状态"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_PJH"
          label="票据号"
          width="200"
        ></el-table-column>
        <el-table-column label="金额" width="100">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.PJLYMX_JE) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="PJLYMX_KHMC"
          label="客户名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_JKR"
          label="交款人"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_SKR"
          label="开票人"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="PJLYMX_SKRQ"
          label="开票日期"
          width="200"
        ></el-table-column>
        <el-table-column label="票据类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.PJMX_LX == 101 ? "纸质发票" : "" }}
            {{ scope.row.PJMX_LX == 102 ? "电子发票" : ""
            }}{{ scope.row.PJMX_LX == 201 ? "纸质收据" : ""
            }}{{ scope.row.PJMX_LX == 202 ? "电子收据" : "" }}
          </template>
        </el-table-column>
        <el-table-column label="是否开票">
          <template slot-scope="scope">
            {{ scope.row.PJLYMX_SFKP == 0 ? "未开票" : "" }}
            {{ scope.row.PJLYMX_SFKP == 1 ? "已开票" : "" }}
            {{ scope.row.PJLYMX_SFKP == 2 ? "开票成功" : "" }}
            {{ scope.row.PJLYMX_SFKP == 3 ? "开票失败" : "" }}
            {{ scope.row.PJLYMX_SFKP == 5 ? "等待开票结果" : "" }}
          </template>
        </el-table-column>
        <el-table-column label="作废信息" prop="SKPZ_SKBS" width="100">
          <template slot-scope="scope">
            <span
              class="spanBlcok"
              @click="obsoletefunc(scope.row)"
              size="small"
              >查看</span
            >
          </template>
        </el-table-column>
        <el-table-column label="增值税信息" prop="SKPZ_SKBS" width="100">
          <template slot-scope="scope">
            <span class="spanBlcok" @click="vatfunc(scope.row)" size="small"
              >查看</span
            >
          </template>
        </el-table-column>
      </el-table>
      <billobsolete
        :obsoleteShow.sync="obsoleteShow"
        ref="obsoleteChildren"
        :clickTreeObjVal="clickTreeObjVal"
        @RefreshItem="obsoleteRefreshList"
      ></billobsolete>

      <!--作废信息 start-->
      <ObsoleteInfoDialog
        :showInfo.sync="showInfo"
        ref="infoChilren"
      ></ObsoleteInfoDialog>
      <!--作废信息 end-->

      <!--增值税信息 start-->
      <vatInfoDialog
        :showVatInfo.sync="showVatInfo"
        ref="vatChildren"
      ></vatInfoDialog>
      <!--增值税信息 end-->
    </section>
    <!-- 开票明细 -->
    <section class="billBox">
      <h2>开票明细</h2>
      <el-row>
        <!-- 表格 -->
        <el-table
          :data="DetailtableData"
          border
          style="width: 100%"
          :max-height="Height"
          class="tableContent commonTable"
        >
          <el-table-column
            prop="PJMX_SFXMMC"
            label="收费项目"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="PJMX_SFBZ"
            label="收费币种"
            width="100"
          ></el-table-column>
          <el-table-column label="收费金额(含税)" width="150">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.PJMX_SFJE) }}
            </template>
          </el-table-column>
          <el-table-column label="折算金额(含税)" width="150">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.PJMX_ZSJE) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="PJMX_SL"
            label="税率(%)"
            width="80"
          ></el-table-column>
          <el-table-column label="金额(不含税)" width="150">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.PJMX_BHSJE) }}
            </template>
          </el-table-column>
          <el-table-column label="税额" width="100">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.PJMX_SE) }}
            </template>
          </el-table-column>
          <el-table-column prop="PJMX_ZY" label="摘要">
            <template slot-scope="scope">
              <span>{{ scope.row.PJMX_ZY }}{{ scope.row.PJMX_SFJE }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </section>
  </div>
</template>
<script>
import {
  queryELBillApi,
  orgTreeBillDetail,
  IsMayCancellation,
  confirmCancellation,
  reuseOfTicketNumber,
  cancelinv,
  submitInvoice,
  getPrintType,
  exportExcelApi,
} from "@/api/FeeManagement/TicketBill"; //票据
import billobsolete from "./components/BillObsoleteDialog"; //票据作废
import ObsoleteInfoDialog from "./components/ObsoleteInfoDialog"; //作废信息
import vatInfoDialog from "./components/vatInfoDialog"; //增值税信息
import { getToken } from "@/utils/Auth"; // 验权
import { getLastYearYestdy, currDate, formatMoney } from "@/utils/global.js";
export default {
  name: "TicketBill",
  props: ["clickTreeObjVal", "resourceName"], //显示隐藏资源名称与禁用客户信息,父子传递信息,收费项目
  data() {
    return {
      tabulationBeginEnd: "", //开票日期
      radio: "",
      tableData: [], //票据表格数据
      DetailtableData: [], //开票明细表格数据
      tableParameter: {
        //搜索列表参数
        QSNY: null,
        JZNY: null,
      },
      detailRow: {}, //选中票据data
      obsoleteShow: false, //票据号作废弹窗  默认隐藏
      disabledObsolete: true, //作废按钮默认隐藏
      disabledPrint: true, //打印默认隐藏
      disabledCoverPrint: true, //套打默认隐藏
      ObsoleteTitle: "", //作废按钮标题提示
      disabledReuse: true, //重用按钮默认隐藏
      ReuseTitle: "", //作废按钮标题提示
      selectType: 1, //1按资源 2按客户
      time: [], //查询时默认的时间数据
      showVatInfo: false, //增值税信息默认隐藏
      showInfo: false, //作废信息默认隐藏
      formList: {},
      Height: 160,
      count: 0, //定时统计
      time: "", //定时
      GLCID: "",
      YXDID: "",
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        if (this.detailRow.PJLYMX_PJZT == "作废") {
          this.disabledPrint = true;
          this.disabledCoverPrint = true;
        } else {
          if (this.detailRow.PJLYMX_SFKP == 5) {
            this.disabledPrint = true;
          } else {
            this.disabledPrint = false;
          }
          if (this.detailRow.PJMX_LX == 201) {
            this.disabledCoverPrint = false;
          } else {
            this.disabledCoverPrint = true;
          }
        }
      } else {
        this.disabledReuse = true;
        this.disabledObsolete = true;
        this.disabledPrint = true;
        this.disabledCoverPrint = true;
      }
    },
    detailRow() {
      if (Object.keys(this.detailRow).length != 0) {
        if (this.detailRow.PJLYMX_PJZT == "作废") {
          this.disabledObsolete = true; //已经作废的数据不可再作废
          if (this.detailRow.PJLYMX_KCY) {
            //判断该票据是否已重用
            this.disabledReuse = true;
          } else {
            this.disabledReuse = false;
          }
        } else {
          this.disabledObsolete = false;
          this.disabledReuse = true;
        }
      } else {
        this.disabledObsolete = true;
        this.disabledReuse = true;
        this.disabledPrint = true;
        this.disabledCoverPrint = true;
      }
    },
  },
  methods: {
    getInitial(conentHeight) {
      //计算table高度
      this.$nextTick(() => {
        this.Height =
          conentHeight -
          this.$refs.elResourece.offsetHeight -
          this.$refs.elbuttonBox.offsetHeight -
          this.$refs.ListTable.offsetHeight -
          100 +
          "px";
      });
    },
    formatMoney(data) {
      if (data) {
        return data >= 0
          ? formatMoney(data, true)
          : `-${formatMoney(0 - data, true)}`;
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      //  console.log(row)
      if (row.PJLYMX_PJZT == "作废") {
        //作废背景红色
        return "tabelBGRED";
      }
    },
    rowClick(row) {
      this.detailRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      if (this.detailRow.type == "sf") {
        //如果类型是'sf' 则type值传空
        this.detailRow.typeValue = "";
      } else {
        this.detailRow.typeValue = 1;
      }
      this.getBillDetailList();
      //this.getIsMayCance();
    },
    RecequeryByPage(obj, type) {
      this.time = [];
      this.selectType = type;
      if (obj) {
        this.tableParameter.FKGX_ZJ = obj.FKGX_ZJ;
        this.tableParameter.KHDA_KHMC = obj.KHDA_KHMC;
        if (type == 2) {
          //如果是按客户  获取客户列表的管理处id
          this.GLCID = obj.GLCID;
          this.YXDID = obj.YXDID;
        }
      }
      this.tableParameter.QSNY = getLastYearYestdy(new Date(), true); //当前日期的前一年
      this.tableParameter.JZNY = currDate(true); //当前日期
      this.time.push(this.tableParameter.QSNY);
      this.time.push(this.tableParameter.JZNY);
      this.clearTable();
      //票据表格列表
      this.getQueryTicketBillList();
    },
    timeChange(val) {
      this.tableParameter.QSNY = val[0];
      this.tableParameter.JZNY = val[1];
    },
    getPermission(obj, type) {
      this.selectType = type;
      if (Object.keys(obj).length != 0) {
        if (obj.data.FCDM_LX != "房间") {
          this.tableParameter.KHDA_KHMC = "";
          this.tableData = []; //清空列表数据
        }
      }
    },
    submit() {
      this.clearTable();
      this.getQueryTicketBillList(); //查询
    },
    getQueryTicketBillList(val) {
      queryELBillApi(this.tableParameter).then((response) => {
        this.tableData = response;
        if (val == 2) {
          this.tableData.forEach((item) => {
            if (item.PJLYMX_ZJ == this.detailRow.PJLYMX_ZJ) {
              this.detailRow = item;
            }
          });
        }
      });
    },
    getBillDetailList() {
      //获取票据本明细列表数据
      orgTreeBillDetail(this.detailRow).then((response) => {
        this.DetailtableData = response;
      });
    },
    getIsMayCance() {
      //判断票据是否可作废
      IsMayCancellation(this.detailRow).then((response) => {
        if (response.returnStatus != "FAIL") {
          this.obsoleteShow = true;
          this.$refs.obsoleteChildren.getObjsoleteRow(
            this.detailRow,
            response.data.YGDA_SYSID,
            this.GLCID,
            this.YXDID,
            this.selectType
          );
        }
      });
    },
    BillObsolete() {
      //作废
      this.$confirm(
        "请确认是否作废票据" + this.detailRow.PJLYMX_PJH + "?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.getIsMayCance();
        })
        .catch(() => {});
    },
    obsoleteRefreshList(val) {
      //作废刷新
      this.detailRow = val;
      this.getQueryTicketBillList(2);
      this.disabledObsolete = true;
    },
    Billreuse() {
      //票据本重用
      this.$confirm("请确认是否将票据号设置为可重用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reuseOfTicketNumber(this.detailRow).then((response) => {
            this.getQueryTicketBillList(2);
          });
        })
        .catch(() => {});
    },
    clearTable() {
      this.DetailtableData = []; //清空票据本明细
      this.detailRow = {};
      this.radio = "";
    },
    BillPrint() {
      //101纸质发票，102电子发票，201纸质收据，202电子收据
      window.open(`http://${this.detailRow.PJLYMX_DZFPURL}`);
    },
    obsoletefunc(row) {
      this.showInfo = true;
      this.$refs.infoChilren.getData(row);
    },
    vatfunc(row) {
      this.showVatInfo = true;
      this.$refs.vatChildren.getData(row);
    },
  },
  components: {
    billobsolete,
    ObsoleteInfoDialog,
    vatInfoDialog,
  },
};
</script>
<style lang="scss">
.tabelBGRED {
  background: #e36a6a !important;
}
.ElectronicTicketBill {
  margin: 10px 20px 30px;
  .Resource_wrap {
    .current_resource {
      color: #666;
      font-size: 14px;
    }
    .current_client {
      margin: 0 30px 0 50px;
      color: #666;
      font-size: 14px;
    }
  }
  .billBox {
    margin-top: 10px;
    h2 {
      color: #666;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin: 0;
      padding: 0;
      border-top: 4px solid #eff0f0;
      padding: 10px 0;
    }
  }
  @media screen and (max-height: 900px) {
    .billBox {
      h2 {
        font-size: 15px;
        padding: 5px 0;
      }
    }
  }
  .select {
    margin-bottom: 20px;
    width: 100%;
  }
  .el-date-editor.el-input__inner {
    width: 100%;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .spanBlcok {
    display: block;
    color: #409eff;
    cursor: pointer;
  }
}
</style>
