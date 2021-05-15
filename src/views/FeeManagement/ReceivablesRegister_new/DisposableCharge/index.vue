<template>
  <div class="DisposableCharge">
    <!-- 搜索框begin -->
    <div class="Resource_wrap">
      <el-form label-width="115px">
        <el-row :gutter="30">
          <el-col :span="5" style="width: auto">
            <el-form-item label="" label-width="10px;">
              <span class="current_resource"
                >资源名称：<span class="TextColor">{{
                  resourceName
                }}</span></span
              >
              <span class="current_client"
                >客户名称：<span class="TextColor">{{
                  tableParameter.KHDA_KHMC
                }}</span></span
              >
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 220px">
            <el-form-item label="开始日期:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.QSNY"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 200px">
            <el-form-item label="结束日期:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.JZNY"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 100px">
            <el-form-item label-width="0px">
              <el-button
                type="success"
                @click="submit()"
                v-has="'DisposableQuery_has'"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 按钮区域start -->
    <section class="buttonBox">
      <el-row>
        <el-col :span="24">
          <el-button
            type="primary"
            @click="paymentAction"
            :disabled="disabledPayment"
            v-has="'DisposablePyament_has'"
          >
            交款</el-button
          >
          <el-button
            type="primary"
            @click="refundAction"
            :disabled="disabledRefund"
            v-has="'DisposableRefund_has'"
            >退款
          </el-button>
          <el-button
            type="danger"
            @click="BillObsolete"
            :disabled="disablecancel"
            v-has="'DisposableCancel_has'"
            >作废
          </el-button>
          <el-button
            type="primary"
            @click="openTicketAction"
            :disabled="disabledTicket"
            v-has="'DisposableTicket_has'"
          >
            开票</el-button
          >
          <el-button
            type="primary"
            @click="filedConfiClick"
            class="custom_field"
            icon="el-icon-setting"
            >自定义栏位</el-button
          >
        </el-col>
      </el-row>
    </section>
    <!-- 按钮区域end -->
    <div class="standardTable">
      <el-table
        ref="multipleTable"
        style="width: 100%"
        :max-height="300"
        :data="tableData"
        border
        @row-click="rowclick"
        class="commonTable"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>

        <div v-for="(item, index) in checkData" :key="index">
          <div v-if="item.content == '已作废'">
            <el-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.YCXSF_ZFBZ"
                  disabled
                ></el-checkbox>
              </template>
            </el-table-column>
          </div>
          <div v-else-if="item.content == '确认收款'">
            <el-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.YCXSF_QRSK"
                  disabled
                ></el-checkbox>
              </template>
            </el-table-column>
          </div>
          <div v-else-if="item.content == '收费金额(含税)'">
            <el-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.YCXSF_SFJE) }}
              </template>
            </el-table-column>
          </div>
          <div v-else-if="item.content == '金额(不含税)'">
            <el-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.YCXSF_BHSJE) }}
              </template>
            </el-table-column>
          </div>
          <div v-else-if="item.content == '税额'">
            <el-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.YCXSF_SE) }}
              </template>
            </el-table-column>
          </div>
          <div v-else-if="item.content == '开票金额'">
            <el-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.YCXSF_KPJE) }}
              </template>
            </el-table-column>
          </div>
          <div v-else-if="item.content == '退款金额'">
            <el-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.YCXSF_TKJE) }}
              </template>
            </el-table-column>
          </div>

          <div v-else-if="item.content == '自定义字段1'">
            <el-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                <el-input
                  type="text"
                  v-model="scope.row.YCXSF_ZDYZD1"
                  @change="updateZDYZD(scope.row)"
                  @click.stop.native
                >
                </el-input>
              </template>
            </el-table-column>
          </div>
          <div v-else>
            <el-table-column
              :label="item.content"
              :prop="item.field"
              :width="item.width"
            >
            </el-table-column>
          </div>
        </div>

        <!-- <el-table-column prop="YCXSF_ZFBZ" label="已作废" width="70">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.YCXSF_ZFBZ" disabled></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="YCXSF_QRSK" label="确认收款" width="70">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.YCXSF_QRSK" disabled></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="YCXSF_SFXMMC" label="收费项目" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_PJH" label="票据号" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_SKFS" label="收款方式" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_JKR" label="交款人" width="120">
        </el-table-column>
        <el-table-column prop="YCXSF_JFJSR" label="交款经手人" width="120">
        </el-table-column>
        <el-table-column prop="YCXSF_SFBZ" label="币种" width="100">
        </el-table-column>
        <el-table-column label="收费金额(含税)" width="120">
          <template slot-scope="scope">
            {{formatMoney(scope.row.YCXSF_SFJE)}}
          </template>
        </el-table-column>
        <el-table-column prop="YCXSF_SL" label="税率(%)" width="80">
        </el-table-column>
        <el-table-column label="金额(不含税)" width="120">
          <template slot-scope="scope">
            {{formatMoney(scope.row.YCXSF_BHSJE)}}
          </template>
        </el-table-column>
        <el-table-column label="税额" width="120">
          <template slot-scope="scope">
            {{formatMoney(scope.row.YCXSF_SE)}}
          </template>
        </el-table-column>
        <el-table-column label="开票金额" width="120">
          <template slot-scope="scope">
            {{formatMoney(scope.row.YCXSF_KPJE)}}
          </template>
        </el-table-column>
        <el-table-column prop="YCXSF_SFRQ" label="收费日期" width="120">
        </el-table-column>
        <el-table-column label="退款金额" width="120">
          <template slot-scope="scope">
            {{formatMoney(scope.row.YCXSF_TKJE)}}
          </template>
        </el-table-column>
        <el-table-column prop="YCXSF_TKYE" label="余额" width="100">
        </el-table-column>
        <el-table-column prop="YCXSF_DZSJ" label="到账时间" width="120">
        </el-table-column>
        <el-table-column prop="YCXSF_DZYH" label="到账银行" width="120">
        </el-table-column>
        <el-table-column prop="YCXSF_ZFSJ" label="作废时间" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_ZFR" label="作废人" width="120">
        </el-table-column>
        <el-table-column prop="YCXSF_ZFYY" label="作废原因" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_PJLX" label="票据类型" width="100">
        </el-table-column>
        <el-table-column prop="YCXSF_TKFS" label="退款方式" width="150">
        </el-table-column>
        <el-table-column prop="YCXSF_TKRQ" label="退款日期" width="200">
        </el-table-column>
        <el-table-column prop="YCXSF_TFJSR" label="退款经手人" width="120">
        </el-table-column>
        <el-table-column prop="YCXSF_RZSJ" label="入帐时间" width="150">
        </el-table-column>
        <el-table-column label="自定义字段1" width="150">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.YCXSF_ZDYZD1" @change="updateZDYZD(scope.row)" @click.stop.native>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="YCXSF_BZ" label="备注" width="300">
        </el-table-column> -->
      </el-table>
    </div>
    <!-- 表 end -->

    <!-- 合计金额 begin -->
    <section class="sum" ref="sumRef">
      <span
        >合计金额：<span class="TextColor">{{ amount }}</span></span
      >
    </section>

    <!-- 退款明细 -->
    <section class="refundBox" ref="ListTable">
      <div ref="DetailRef" class="detail_wrap">
        <div class="detail_txt">退款明细</div>
        <el-button
          type="danger"
          @click="refundBillObsolete"
          :disabled="disabledObsolete"
          style="margin-bottom: 5px"
          v-has="'DisposableRefundCancel_has'"
          >作废</el-button
        >
      </div>
      <el-row>
        <!-- 表格 -->
        <el-table
          :data="detailTableData"
          border
          highlight-current-row
          style="width: 100%"
          :max-height="300"
          @row-click="refundBoxClick"
          ref="detailTable"
          class="commonTable"
        >
          <el-table-column
            prop="YCXSFTKMX_TKFS"
            label="退款方式"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="YCXSFTKMX_TKRQ"
            label="退款日期"
            width="200"
          ></el-table-column>
          <el-table-column label="退款金额" width="200">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.YCXSFTKMX_TKJE) }}
            </template>
          </el-table-column>
          <el-table-column label="退款余额" width="200">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.YCXSFTKMX_TKYE) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="YCXSFTKMX_BZ"
            label="备注"
            width="300"
          ></el-table-column>
          <el-table-column prop="YCXSFTKMX_ZFBZ" label="作废">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.YCXSFTKMX_ZFBZ"
                disabled
              ></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </section>

    <!-- 交款 弹框 begin -->
    <PaymentDialog
      :showPayment.sync="showPayment"
      ref="PopPaymentChildren"
      @RefreshItem="RefreshList"
    ></PaymentDialog>
    <!-- 交款 弹框 end -->

    <!-- 作废 弹框 begin -->
    <billobsolete
      :obsoleteShow.sync="obsoleteShow"
      ref="obsoleteChildren"
      @RefreshItem="RefreshList"
    ></billobsolete>
    <!-- 作废 弹框 end -->

    <!-- 退款 弹框 begin -->
    <RefundDialog
      :showRefund.sync="showRefund"
      ref="PopRefundChildren"
      @RefreshItem="RefreshList"
    ></RefundDialog>
    <!-- 退款 弹框 end -->

    <!-- 开票 弹框 begin -->
    <TicketDialog
      :showTicket.sync="showTicket"
      @PopCancelEmit="RefreshList"
      ref="ticketChilren"
    ></TicketDialog>
    <!-- 开票 弹框 end -->

    <!-- 自定义栏位start -->
    <FieldConfig
      :showFieldConfig.sync="showFieldConfig"
      @RefreshItem="fieldRefrefsh"
      ref="fieldChildren"
    >
    </FieldConfig>
    <!-- 自定义栏位end  -->
  </div>
</template>

<script>
import {
  queryOneTimeFeeByClient,
  canInvoice,
  queryRefundDetails,
  refundobsolete,
  updateCustomFieldApi,
} from "@/api/FeeManagement/DisposableCharge"; //一次性费用js
import {
  getLastYearYestdy,
  currDate,
  formatMoney,
  getFirstDayOfYear,
} from "@/utils/global.js";
import PaymentDialog from "./components/PaymentDialog"; //交款
import RefundDialog from "./components/RefundDialog"; //退款
import billobsolete from "./components/BillObsoleteDialog"; //作废
import TicketDialog from "../components/TicketDialog"; //开票弹窗
import fieldMinxin from "@/components/FieldConfig/field.js"; //自定义栏位 注入
export default {
  name: "DisposableCharge",
  data() {
    return {
      disabledPayment: true, //交款 按客户不能交款
      disabledRefund: true, //退款
      disablecancel: true, //作废
      disableopenTicket: true, //开票
      disabledObsolete: true, //退款明细作废  默认不可点击
      tableRow: {}, //修改数据
      detailRow: {}, //明细点击数据
      radio: "", //单选按钮
      showPayment: false, //交款 弹框 显示
      showRefund: false, //退款 弹框 显示
      showTicket: false, //开票 弹框 显示
      showFieldConfig: false, //自定义栏位默认隐藏
      disabledTicket: true,
      tableParameter: {
        //搜索列表参数
        QSNY: null,
        JZNY: null,
        FKGX_ZJ: null,
        KHDA_ZJ: null,
      },
      tableData: [],
      TicketlPop: "", //开票弹窗prop传值
      amount: 0, //合计金额
      detailTableData: [], //退款明细
      obsoleteShow: false, //票据号作废弹窗  默认隐藏
      YCXSFTKMX_ZJ: null, //一次性收费退款明细主键
      tableheight: 160, //明细表格高度
      mainHeight: 210, //列表表格高度(主表)
      selectType: 1, //1 按资源 2按客户,
      code: "DisposableCharge", //模块栏位配置编码
      configData: [
        //默认配置栏位
        { content: "已作废", width: 70, field: "YCXSF_ZFBZ" },
        { content: "确认收款", width: 70, field: "YCXSF_QRSK" },
        { content: "收费项目", width: 150, field: "YCXSF_SFXMMC" },
        { content: "票据号", width: 150, field: "YCXSF_PJH" },
        { content: "收款方式", width: 150, field: "YCXSF_SKFS" },
        { content: "交款人", width: 120, field: "YCXSF_JKR" },
        { content: "交款经手人", width: 120, field: "YCXSF_JFJSR" },
        { content: "收费金额(含税)", width: 120, field: "YCXSF_SFJE" },
        { content: "税率(%)", width: 80, field: "YCXSF_SL" },
        { content: "金额(不含税)", width: 120, field: "YCXSF_BHSJE" },
        { content: "税额", width: 120, field: "YCXSF_SE" },
        { content: "开票金额", width: 120, field: "YCXSF_KPJE" },
        { content: "收费日期", width: 120, field: "YCXSF_SFRQ" },
        { content: "退款金额", width: 120, field: "YCXSF_TKJE", isShow: false },
        { content: "余额", width: 100, field: "YCXSF_TKYE", isShow: false },
        { content: "到账时间", width: 120, field: "YCXSF_DZSJ", isShow: false },
        { content: "到账银行", width: 120, field: "YCXSF_DZYH", isShow: false },
        { content: "作废时间", width: 150, field: "YCXSF_ZFSJ", isShow: false },
        { content: "作废人", width: 120, field: "YCXSF_ZFR", isShow: false },
        { content: "作废原因", width: 150, field: "YCXSF_ZFYY", isShow: false },
        { content: "票据类型", width: 100, field: "YCXSF_PJLX", isShow: false },
        { content: "退款方式", width: 150, field: "YCXSF_TKFS", isShow: false },
        { content: "退款日期", width: 150, field: "YCXSF_TKRQ", isShow: false },
        {
          content: "退款经手人",
          width: 120,
          field: "YCXSF_TFJSR",
          isShow: false,
        },
        { content: "入帐时间", width: 150, field: "YCXSF_RZSJ", isShow: false },
        {
          content: "自定义字段1",
          width: 150,
          field: "YCXSF_ZDYZD1",
          isShow: false,
        },
        { content: "备注", width: 300, field: "YCXSF_BZ" },
      ],
    };
  },
  props: ["clickTreeObjVal", "resourceName"], //显示隐藏资源名称与禁用客户信息,父子传递信息,收费项目
  mixins: [fieldMinxin], //注入
  watch: {
    radio() {
      if (this.radio !== "") {
        // if (this.selectType != 2) {
        //   //如果选择中的客户是历史状态
        //   this.disabledPayment = true;
        //   this.disabledRefund = true;
        //   this.disablecancel = true;
        // } else {
        if (this.tableRow.YCXSF_ZFBZ) {
          this.disablecancel = true;
          this.disabledRefund = true;
        } else {
          if (this.tableRow.YCXSF_TKJE) {
            this.disablecancel = true;
          } else {
            this.disablecancel = false;
          }
          this.disabledRefund = false;
        }
        // }
      } else {
        this.disabledTicket = true;
        this.disabledRefund = true;
        this.disablecancel = true;
      }
    },
    // selectType() {
    //   if (this.selectType == 2) {
    //     this.disabledPayment = true;
    //   } else {
    //     this.disabledPayment = false;
    //   }
    // },
    tableParameter() {
      if (this.tableParameter.KHDA_KHMC && this.selectType != 2) {
        this.disabledPayment = false;
      } else {
        this.disabledPayment = true;
        this.disabledRefund = true;
        this.disablecancel = true;
      }
    },
    detailRow() {
      if (Object.keys(this.detailRow).length > 0) {
        if (this.detailRow.YCXSFTKMX_ZFBZ) {
          this.disabledObsolete = true;
        } else {
          this.disabledObsolete = false;
        }
      } else {
        this.disabledTicket = true;
        this.disabledObsolete = true;
      }
    },
  },
  methods: {
    formatMoney(data) {
      if (data) {
        return data >= 0
          ? formatMoney(data, true)
          : `-${formatMoney(0 - data, true)}`;
      } else {
        return data;
      }
    },
    // 行点击
    rowclick(row) {
      this.detailRow = {}; //清空明细选中数据
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      this.$nextTick(() => {
        this.isInvoice();
        this.refundDetail();
      });
    },
    RecequeryByPage(obj, type) {
      this.selectType = type;
      this.clearTable();
      if (this.selectType == 1) {
        this.tableParameter.FKGX_ZJ = obj.FKGX_ZJ;
      } else {
        this.tableParameter.FKGX_ZJ = obj.KHDA_ZJ;
      }
      this.tableParameter.KHDA_KHMC = obj.KHDA_KHMC;
      this.tableParameter.FKGX_ZT = obj.FKGX_ZT;
      this.tableParameter.FJDA_SFMJ = obj.FJDA_SFMJ; //收费面积

      /**每次切换不重置 日期 start*/
      if (
        sessionStorage.getItem("dispoable_QSNY") &&
        sessionStorage.getItem("dispoable_QSNY") !== "null"
      ) {
        this.tableParameter.QSNY = sessionStorage.getItem("dispoable_QSNY");
      } else {
        //this.tableParameter.QSNY = getLastYearYestdy(new Date(), true); //当前日期的前一年
        this.tableParameter.QSNY = getFirstDayOfYear(); // 本年第一天
      }
      if (
        sessionStorage.getItem("dispoable_JZNY") &&
        sessionStorage.getItem("dispoable_JZNY") !== "null"
      ) {
        this.tableParameter.JZNY = sessionStorage.getItem("dispoable_JZNY");
      } else {
        this.tableParameter.JZNY = currDate(true); //当前日期
      }
      /**每次切换不重置 日期 end*/

      this.tableParameter = JSON.parse(JSON.stringify(this.tableParameter));
      this.getTableData();
    },
    getPermission(obj, type) {
      this.selectType = type;
      if (Object.keys(obj).length != 0) {
        if (obj.data.FCDM_LX != "房间") {
          this.tableParameter.KHDA_KHMC = "";
          this.tableData = []; //清空列表数据
          this.disabledPayment = true;
          this.disabledRefund = true;
          this.disablecancel = true;
          this.disabledTicket = true;
          this.clearTable();
        }
      }
    },
    // 获取 表 数据
    getTableData(val) {
      queryOneTimeFeeByClient(this.tableParameter, this.selectType).then(
        (response) => {
          this.amount = 0;
          this.tableData = response;
          if (this.tableData.length > 0) {
            this.tableData.forEach((item) => {
              this.amount += item.YCXSF_SFJE;
            });
            this.amount = this.amount.toFixed(2);
            if (val == 2) {
              if (Object.keys(this.tableRow).length > 0) {
                this.tableData.forEach((item) => {
                  if (item.YCXSF_ZJ == this.tableRow.YCXSF_ZJ) {
                    this.tableRow = item;
                    this.radio = this.tableData.indexOf(this.tableRow); //单行点击单选按钮选中
                  }
                });
              }
            }
          } else {
            this.detailTableData = []; //清空明细
            this.detailRow = {}; //清空明细选中数据
          }
        }
      );
    },
    // 退款明细
    refundDetail(val) {
      queryRefundDetails(this.tableRow.YCXSF_ZJ).then((response) => {
        this.detailTableData = response;
        if (val == 2) {
          if (this.detailTableData.length > 0) {
            this.detailTableData.forEach((item) => {
              if (item.YCXSFTKMX_ZJ == this.detailRow.YCXSFTKMX_ZJ) {
                this.detailRow = item;
                this.$refs.detailTable.setCurrentRow(this.detailRow); //默认选中
              }
            });
          }
        }
      });
    },
    refundBoxClick(row) {
      //退款明细表格点击事件
      this.detailRow = row;
      this.YCXSFTKMX_ZJ = row.YCXSFTKMX_ZJ;
    },
    refundBillObsolete() {
      //退款明细作废
      this.$confirm("是否确实要作废此笔退款明细?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          refundobsolete(this.YCXSFTKMX_ZJ).then((response) => {
            this.radio = "";
            this.getTableData(2);
            this.refundDetail(2);
          });
        })
        .catch(() => {});
    },
    BillObsolete() {
      //作废
      this.$confirm(
        "请确认是否作废票据" + this.tableRow.YCXSF_PJH + "?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          if (this.detailRow.PJMX_LX == 101) {
          } else {
          }
          this.obsoleteShow = true;
          this.$refs.obsoleteChildren.getObjsoleteRow(this.tableRow);
        })
        .catch(() => {});
    },
    isInvoice() {
      //判断是否可开票
      canInvoice(this.tableRow.YCXSF_ZJ).then((response) => {
        if (response.canInvoice == "false") {
          this.disabledTicket = true;
        } else {
          this.disabledTicket = false;
        }
      });
    },

    submit() {
      // 查询
      //保存开始/结束日期   每次切换不重置
      sessionStorage.setItem("dispoable_QSNY", this.tableParameter.QSNY);
      sessionStorage.setItem("dispoable_JZNY", this.tableParameter.JZNY);
      this.clearTable();
      this.getTableData();
    },
    // 交款
    paymentAction() {
      this.showPayment = true;
      this.$refs.PopPaymentChildren.getData(
        this.tableParameter.FJDA_SFMJ,
        this.tableParameter.FKGX_ZJ,
        this.tableParameter.KHDA_KHMC
      );
    },
    // 退款
    refundAction() {
      this.showRefund = true;
      this.$refs.PopRefundChildren.getData(this.tableRow);
    },
    // 刷新表
    RefreshList() {
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.detailTableData = [];
      this.detailRow = {}; //清空明细选中数据
      this.getTableData();
      // this.refundDetail();
    },
    // 开票
    openTicketAction() {
      this.showTicket = true;
      this.$refs.ticketChilren.getData(
        this.tableRow,
        this.tableParameter.FKGX_ZJ,
        3
      );
      // this.$refs.ticketChilren.getData(
      //   this.tableRow,
      //   this.tableParameter.FKGX_ZJ
      // );
    },
    // 交款 标题提示
    paymentTitle() {
      if (this.disabledPayment) {
        return "请选择房间";
      }
    },
    // 退款 标题提示
    refundTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
    // 开票 标题提示
    openTicketTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
    // 作废 标题提示
    cancelTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
    updateZDYZD(row) {
      updateCustomFieldApi(row).then((response) => {});
    },
    clearTable() {
      //清空选中数据
      this.detailTableData = []; //清空明细
      this.tableRow = {};
      this.radio = "";
    },
    fieldRefrefsh(obj) {
      //自定义栏位配置回调刷新
      this.checkData = [];
      this.saveConfig(obj, this.code); //保存栏位配置
    },
    filedConfiClick() {
      //自定义栏位
      this.showFieldConfig = true;
      this.$refs.fieldChildren.getReceiptData(
        this.queryData,
        this.configData,
        this.code
      );
    },
  },
  components: {
    PaymentDialog,
    billobsolete,
    RefundDialog,
    TicketDialog,
  },
};
</script>

<style lang="scss">
.DisposableCharge {
  margin: 10px 20px 10px;
  .Resource_wrap {
    .current_resource {
      color: #666;
      font-size: 14px;
    }
    .current_client {
      margin-left: 10px;
      color: #666;
      font-size: 14px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 120px;
    }
  }
  .sum {
    margin-top: 5px;
    font-size: 14px;
    color: #606266;
  }
  .block {
    text-align: right;
    padding: 15px 0 5px 0;
  }
  .refundBox {
    border-top: 4px solid #eff0f0;
    margin-top: 5px;
    .detail_wrap {
      width: 100%;
      padding: 5px 0;
      .detail_txt {
        color: #666;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        display: inline-block;
      }
      .el-button {
        margin-left: 20px;
      }
    }
  }
  .custom_field {
    float: right;
  }
  @media screen and (max-height: 900px) {
    .refundBox {
      h2 {
        font-size: 15px;
      }
    }
  }
  .select {
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>
