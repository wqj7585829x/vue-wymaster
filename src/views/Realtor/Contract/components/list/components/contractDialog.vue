<template>
  <div class="contractDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div class="contracttitle">
        <div class="contractname">
          <img :src="require(`@/assets/comImgs/contract_list.png`)" alt="" />
          合同主表
        </div>
        <div class="contractline"></div>
      </div>
      <el-form
        label-width="75px"
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="合同编号:" prop="contract_num">
              <el-input v-model="TableForm.contract_num" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="项目名称:" prop="plot_index">
              <el-select
                v-model="TableForm.plot_index"
                @change="plotChange"
                filterable
                :disabled="title == '修改'"
              >
                <el-option
                  v-for="(item, index) in plot_List"
                  :key="index"
                  :label="item.GLCNAME"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="租赁方:" prop="KHDA_ZJ">
              <el-select
                v-model="TableForm.KHDA_ZJ"
                filterable
                @change="ZLchange"
              >
                <el-option
                  v-for="(item, index) in ZLCustomer"
                  :key="index"
                  :label="item.KHDA_KHMC"
                  :value="item.KHDA_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="出租方:" prop="lessor_id">
              <el-select
                v-model="TableForm.lessor_id"
                filterable
                @change="ZLchange"
              >
                <el-option
                  v-for="(item, index) in ZLLessor"
                  :key="index"
                  :label="item.company_name"
                  :value="item.lessor_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="签约日期:" prop="signing_date">
              <el-date-picker
                v-model="TableForm.signing_date"
                type="date"
                placeholder=""
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="经办人:" prop="manager">
              <el-input v-model="TableForm.manager" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="合同起始:" prop="contract_start">
              <el-date-picker
                v-model="TableForm.contract_start"
                type="date"
                placeholder=""
                value-format="yyyy-MM-dd"
                @change="setcycle"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="合同截止:" prop="contract_end">
              <el-date-picker
                v-model="TableForm.contract_end"
                type="date"
                placeholder=""
                value-format="yyyy-MM-dd"
                @change="setcycle"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="租赁周期:" prop="lease_cycle">
              <el-input
                v-model="TableForm.lease_cycle"
                clearable
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="免租期:">
              <el-input
                v-model="TableForm.rent_free_period"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="免租期单位:">
              <el-select v-model="TableForm.rent_free_unit">
                <el-option label="天" :value="1"></el-option>
                <el-option label="月" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="费用起计:">
              <el-date-picker
                v-model="TableForm.fee_start"
                type="date"
                placeholder=""
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="费用截止:">
              <el-date-picker
                v-model="TableForm.fee_end"
                type="date"
                placeholder=""
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="出租面积:">
              <el-input v-model="TableForm.rental_area" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="租赁总额:">
              <el-input v-model="TableForm.total_amount" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="首付金额:">
              <el-input v-model="TableForm.down_payment" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="押金总额:">
              <el-input v-model="TableForm.deposit_total" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="付款方式:">
              <el-select
                v-model="TableForm.pay_method"
                placeholder="请选择付款方式"
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

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="装修起始:" prop="decorate_start">
              <el-date-picker
                v-model="TableForm.decorate_start"
                type="date"
                placeholder=""
                value-format="yyyy-MM-dd"
                @change="setcycle"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="装修截止:" prop="decorate_end">
              <el-date-picker
                v-model="TableForm.decorate_end"
                type="date"
                placeholder=""
                value-format="yyyy-MM-dd"
                @change="setcycle"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="合同类型:">
              <el-select v-model="TableForm.contract_type">
                <el-option label="租赁合同" :value="1"></el-option>
                <el-option label="销售合同" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="预警天数:">
              <el-select
                v-model="TableForm.warning_days"
                placeholder="请选择预警天数"
              >
                <el-option
                  v-for="item in dayList"
                  :key="item.warning_days"
                  :label="item.warning_days"
                  :value="item.warning_days"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="收款周期:" prop="pay_cycle">
              <el-select v-model="TableForm.pay_cycle">
                <el-option label="自然时间周期" :value="1"></el-option>
                <el-option label="合同时间周期" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :span="6"
            style="min-width: 220px"
            v-if="TableForm.pay_cycle == 2"
          >
            <el-form-item label="周期明细:" prop="pay_cycle_detail">
              <el-select v-model="TableForm.pay_cycle_detail">
                <el-option label="月" :value="1"></el-option>
                <el-option label="季度" :value="2"></el-option>
                <el-option label="半年" :value="3"></el-option>
                <el-option label="年" :value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="12" style="min-width: 220px">
            <el-form-item label="合同描述:">
              <el-input
                v-model="TableForm.contract_description"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 按钮begin -->
      <div class="buttonBox">
        <el-button type="primary" @click="sure()" style="float: right"
          >保存
        </el-button>
      </div>
      <!-- 按钮end -->

      <div class="contracttitle">
        <div class="contractname">
          <img :src="require(`@/assets/comImgs/contract_detail.png`)" alt="" />
          合同细节
        </div>
        <div class="contractline"></div>
      </div>

      <!-- 按钮begin -->
      <div class="buttonBox">
        <el-button
          type="primary"
          @click="add()"
          :disabled="addLimit"
          v-has="'ContractOtherAdd_has'"
          >新增</el-button
        >
        <el-button
          type="primary"
          @click="signingEdit()"
          :disabled="signingeditLimit"
          v-if="activeName == '1'"
          v-has="'ContractOtherEdit_has'"
          >修改
        </el-button>
        <el-button
          type="primary"
          @click="edit()"
          :disabled="editLimit"
          v-has="'ContractOtherEdit_has'"
          >{{ buttonname }}
        </el-button>
        <el-button
          type="danger"
          @click="deletecontract()"
          :disabled="deleteLimit"
          v-has="'ContractOtherDelete_has'"
          >删除
        </el-button>
        <el-button
          type="primary"
          :disabled="createCostListLimit"
          @click="Generatinglist"
          v-has="'ContractOtherGenerate_has'"
          >生成费用</el-button
        >
        <el-button
          type="primary"
          @click="toexcel()"
          v-if="activeName == '3'"
          v-has="'ContractOtherExcelhas'"
          >导出excel
        </el-button>
      </div>
      <!-- 按钮end -->

      <el-tabs v-model="activeName" type="card" @tab-click="tabclick">
        <el-tab-pane label="费用条款" name="1" :disabled="tabLimit">
          <div class="resoureTable">
            <el-table
              ref="multipleTable1"
              height="300"
              :data="SigningTable"
              border
              @selection-change="handleSelectionChange"
              @row-click="rowClick1"
            >
              <el-table-column
                fixed
                label="选择"
                type="selection"
                width="50"
              ></el-table-column>
              <el-table-column
                prop="GLQDA_GLQMC"
                label="分区名称"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="DLDA_DLMC"
                label="楼栋名称"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="roomName"
                label="房间名称"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="constructionArea"
                label="建筑面积"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="rentalArea"
                label="出租面积"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="chargeItem"
                label="费用项目"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="price"
                label="单价"
                width="60"
              ></el-table-column>
              <el-table-column
                prop="priceUnitStr"
                label="单价单位"
                width="120"
              ></el-table-column>

              <el-table-column
                prop="priceTypeStr"
                label="单价类型"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="startTime"
                label="开始时间"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="endTime"
                label="截止时间"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="adjustmentIncreasingStart"
                label="递增开始时间"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="adjustmentIncreasingCutoff"
                label="递增截止时间"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="adjustmentIncreasingCycle"
                label="递增周期"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="adjustmentIncreasingRangeType"
                label="递增幅度类型"
                width="120"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.adjustmentIncreasingRangeType == 0"
                    >百分比</span
                  >
                  <span v-if="scope.row.adjustmentIncreasingRangeType == 1"
                    >金额</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="adjustmentIncreasingPercentage"
                label="递增百分比"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="adjustmentIncreasingPrice"
                label="递增金额"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                width="120"
              ></el-table-column>
            </el-table>
            <!-- <div class="totalamount">总金额：{{totalamount}}</div> -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="押金/保证金" name="2" :disabled="tabLimit">
          <div class="resoureTable">
            <el-table
              ref="multipleTable2"
              height="300"
              :data="ContractList"
              border
              @selection-change="handleSelectionChange"
              @row-click="rowClick2"
            >
              <el-table-column
                fixed
                label="选择"
                type="selection"
                width="50"
              ></el-table-column>
              <el-table-column
                prop="roomName"
                label="房间名称"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="payDate"
                label="缴费日期"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="payAmount"
                label="缴费金额"
                width="120"
              ></el-table-column>
              <!-- <el-table-column prop="payableAmount" label="应缴金额" width="120"></el-table-column> -->
              <el-table-column
                prop="SFKM_SKFS"
                label="收款方式"
                width="240"
              ></el-table-column>
              <el-table-column
                prop="SFXM_SFXMMC"
                label="收费项目"
                width="120"
              ></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="费用清单" name="3" :disabled="tabLimit">
          <div class="resoureTable">
            <el-table
              ref="multipleTable"
              :height="270"
              :data="InventoryList"
              border
              row-key="id"
            >
              <el-table-column
                prop="date_price"
                label="日单价"
                width="160"
              ></el-table-column>
              <el-table-column
                prop="cost_days"
                label="天数"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="charge_item"
                label="计价条款"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="cost_period"
                label="费用期次"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="room_name"
                label="资源代码"
                width="140"
              ></el-table-column>
              <el-table-column
                prop="charge_item"
                label="收费项目名称"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="receivable_date"
                label="应收日期"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="price"
                label="金额"
                width="130"
              ></el-table-column>
              <el-table-column
                prop="deduction_price"
                label="减免金额"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="begin_date"
                label="期初日期"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="end_date"
                label="期末日期"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="summary"
                label="摘要"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                width="120"
              ></el-table-column>
            </el-table>
            <div class="totalamount">总金额：{{ totalamount }}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="违约条款" name="4" :disabled="tabLimit">
          <el-table
            ref="multipleTable3"
            :height="DefaultreturnTotal > DefaultFrom.pageSize ? 245 : 300"
            :data="DefaultList"
            border
            @row-click="rowClick3"
          >
            <el-table-column fixed label="选择" width="50">
              <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio"
                  >&nbsp;</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="clause_name"
              label="条款名称"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="clause_content"
              label="条款内容"
            ></el-table-column>
          </el-table>
          <!-- 分页begin -->
          <div class="block" v-if="DefaultreturnTotal > DefaultFrom.pageSize">
            <el-pagination
              @current-change="DefaulthandleCurrentChange"
              :current-page.sync="DefaultcurrentPage"
              :page-size="DefaultFrom.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="DefaultreturnTotal"
            >
            </el-pagination>
          </div>
          <!-- 分页end -->
        </el-tab-pane>
        <el-tab-pane label="合同附件" name="5" :disabled="tabLimit">
          <div class="updata">
            <el-upload
              :name="'filedata'"
              accept=".doc,.docx,.pdf"
              :action="UploadUrl()"
              :before-upload="beforeFileUpload"
              :show-file-list="false"
            >
              <el-button
                type="primary"
                icon="el-icon-upload"
                size="mini"
                @click="uploadModel"
                >附件导入</el-button
              >
            </el-upload>
            <div class="filelist">
              <div
                class="unit"
                @mouseover="mouseOver(index)"
                @mouseleave="mouseLeave(index)"
                v-for="(item, index) in fileList"
              >
                <img
                  class="fileimg"
                  :src="require(`@/assets/homeImgs/file.png`)"
                  alt=""
                />
                <span>{{ item.attachmentName }}</span>

                <img
                  class="closeimg"
                  v-if="fileindex === index"
                  @click="deleteFile(item)"
                  :src="require(`@/assets/homeImgs/close.png`)"
                  alt=""
                />
                <img
                  class="closeimg downloadimg"
                  v-if="fileindex === index"
                  @click="downloadFile(item)"
                  :src="require(`@/assets/homeImgs/download.png`)"
                  alt=""
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <DepositDialog
      :Depositshow.sync="Depositshow"
      ref="DepositDialog"
      @RefreshItem="getDeposit"
    ></DepositDialog>
    <SigningDialog
      :Signingshow.sync="Signingshow"
      ref="SigningDialog"
      @RefreshItem="getClause"
    ></SigningDialog>
    <ClauseDialog
      :Clauseshow.sync="Clauseshow"
      ref="ClauseDialog"
      @RefreshItem="DefaulthandleCurrentChange(1)"
    >
    </ClauseDialog>
  </div>
</template>

<script>
import {
  addContractMessage,
  updateContractMessage,
  queryZLCustomer,
  queryZLLessor,
  queryContractCostList,
  createCostList,
  queryZLPlot,
  getClauseAPi,
  deleteClauseAPi,
  depositAPi3,
  querySecurityDepositList,
  deleteSecurityDeposit,
  queryContractCostAmount,
  queryBreachClause,
  deleteBreachClause,
  uploadContractAccessory,
  queryContractAccessory,
  deleteContractAccessory,
  exportExpensesDetailedList,
  queryZLEarlyWarning,
} from "@/api/Realtor/Contract";
import DepositDialog from "./DepositDialog";
import SigningDialog from "./SigningDialog";
import ClauseDialog from "./ClauseDialog";
import config from "@/utils/config";
import { diffDate } from "@/utils/global.js";
export default {
  data() {
    return {
      visible: this.show,
      title: "新增", //标题
      categoryList: "",
      rules: {
        contract_num: [
          { required: true, message: "请输入合同编号", trigger: "blur" },
        ],
        plot_index: [
          { required: true, message: "请选择项目名称", trigger: "blur" },
        ],
        KHDA_ZJ: [{ required: true, message: "请选择租赁方", trigger: "blur" }],
        lessor_id: [
          { required: true, message: "请选择出租方", trigger: "blur" },
        ],
        manager: [{ required: true, message: "请输入经办人", trigger: "blur" }],
        signing_date: [
          { required: true, message: "请选择签约日期", trigger: "blur" },
        ],
        contract_start: [
          { required: true, message: "请选择合同起始", trigger: "blur" },
        ],
        contract_end: [
          { required: true, message: "请选择合同截止", trigger: "blur" },
        ],
        pay_cycle: [
          { required: true, message: "请选择收款周期", trigger: "blur" },
        ],
        pay_cycle_detail: [
          { required: true, message: "请选择收款周期明细", trigger: "blur" },
        ],
      },
      TableForm: {
        contract_name: "",
        contract_num: "",
        plot_index: "",
        plot_id: "",
        KHDA_ZJ: "",
        lessor_id: "",
        manager: "",
        signing_date: "",
        contract_start: "",
        contract_end: "",
        lease_cycle: "",
        rent_free_period: "",
        rent_free_unit: "",
        fee_start: "",
        fee_end: "",
        rental_area: "",
        total_amount: "",
        down_payment: "",
        deposit_total: "",
        pay_method: "",
        contract_type: "",
        contract_description: "",
      },
      activeName: "1",
      activeNamecheck: "1",
      tableData: [],
      Depositshow: false,
      Signingshow: false,
      Reliefplanshow: false,
      contract_id: "",
      ZLCustomer: [],
      ZLLessor: [],
      fileList: [],
      addLimit: true,
      editLimit: true,
      deleteLimit: true,
      createCostListLimit: true,
      updateLimit: true,
      tabLimit: true,
      InventoryList: [],
      InventoryFrom: {
        pageIndex: 0,
        pageSize: 10,
      },
      DefaultFrom: {
        pageIndex: 0,
        pageSize: 10,
        plotDbName: "",
        GLCID: "",
        YXDID: "",
        contract_id: "",
      },
      plot_List: [],
      SigningTable: [],
      buttonname: "",
      multipleSelection: [],
      plot_id: "",
      options3: [],
      ContractList: "",
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      totalamount: 0,
      DefaultcurrentPage: 1, //当前页
      DefaultreturnTotal: 0, //总共条数
      DefaultList: [],
      tableRow: {},
      radio: "",
      Clauseshow: false,
      fileindex: null,
      fileList: [],
      signingeditLimit: true,
      dayList: [],
      contract_start: "",
      contract_end: "",
    };
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
    radio() {
      if (this.radio !== "") {
        this.editLimit = false;
        this.deleteLimit = false;
      } else {
        this.editLimit = true;
        this.deleteLimit = true;
      }
    },
  },
  mounted() {
    queryZLPlot().then((response) => {
      this.plot_List = response;
    });
  },
  methods: {
    toexcel() {
      exportExpensesDetailedList(this.InventoryFrom).then((response) => {
        this.exceltype = false;
        const content = response;
        const blob = new Blob([content]);
        const fileName = `费用清单.xls`;
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    setcycle() {
      var _this = this;
      this.$nextTick(function () {
        if (this.TableForm.contract_start) {
          if (this.TableForm.contract_end) {
            if (
              new Date(this.TableForm.contract_end).valueOf() >=
              new Date(this.TableForm.contract_start).valueOf()
            ) {
              var date = diffDate(
                _this.TableForm.contract_start,
                _this.TableForm.contract_end
              );
              this.$set(this.TableForm, "lease_cycle", date);
            } else {
              this.$set(this.TableForm, "lease_cycle", "");
            }
          }
        }
      });
    },
    mouseOver(index) {
      this.fileindex = index;
    },
    mouseLeave() {
      this.fileindex = null;
    },
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    beforeFileUpload(file) {
      let index = 0;
      this.fileName = file.name;
      let fd = new FormData();
      fd.append("file", file);
      fd.append("dbName", this.DefaultFrom.plotDbName);
      fd.append("contractId", this.contract_id);
      this.formD = fd;
      uploadContractAccessory(this.formD).then((response) => {
        this.getFile();
      });
    },
    uploadModel() {
      //导入数据
    },
    downloadFile(file) {
      var link = document.createElement("a");
      link.setAttribute("download", "");
      link.href = file.attachmentUrl;
      link.click();
    },
    deleteFile(data) {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteContractAccessory({
            dbName: this.DefaultFrom.plotDbName,
            attachmentId: data.attachmentId,
            attachmentUrl: data.attachmentUrl,
          }).then((response) => {
            this.getFile();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    rowClick1(row) {
      this.$refs.multipleTable1.toggleRowSelection(row); //单击表格复选框选中
    },
    rowClick2(row) {
      this.$refs.multipleTable2.toggleRowSelection(row); //单击表格复选框选中
    },
    rowClick3(row) {
      this.tableRow = row;
      this.radio = this.DefaultList.indexOf(row); //单行点击单选按钮选中
    },
    handleCurrentChange(currentPage) {
      this.InventoryFrom.pageIndex = currentPage - 1;
      this.getInventory(); //获取表格数据
    },
    DefaulthandleCurrentChange(currentPage) {
      this.DefaultFrom.pageIndex = currentPage - 1;
      this.getDefault(); //获取表格数据
    },
    ZLchange() {
      this.$forceUpdate();
    },
    plotChange(index) {
      this.TableForm.plot_id = this.plot_List[index].id;
      this.TableForm.KHDA_ZJ = "";
      this.TableForm.lessor_id = "";

      this.DefaultFrom.plotDbName = this.plot_List[index].dbName;
      this.DefaultFrom.GLCID = this.plot_List[index].GLCID;
      this.DefaultFrom.YXDID = this.plot_List[index].YXDID;

      this.plot_id = this.plot_List[index].id;

      this.getday();

      depositAPi3({
        plot_id: this.plot_List[index].id,
      }).then((response) => {
        this.options3 = response;
      });
      queryZLCustomer({
        dbName: this.plot_List[index].dbName,
        GLCID: this.plot_List[index].GLCID,
        YXDID: this.plot_List[index].YXDID,
      }).then((response) => {
        this.ZLCustomer = response;
      });
      queryZLLessor({
        dbName: this.plot_List[index].dbName,
        GLCID: this.plot_List[index].GLCID,
        YXDID: this.plot_List[index].YXDID,
      }).then((response) => {
        this.ZLLessor = response;
        for (var i in response) {
          if (response[i].is_default == 1) {
            this.TableForm.lessor_id = response[i].lessor_id;
          }
        }
      });
    },
    handleSelectionChange(val) {
      if (val.length == 1) {
        this.editLimit = false;
        this.signingeditLimit = false;
      } else {
        this.editLimit = true;
        this.signingeditLimit = true;
      }

      if (val.length >= 1) {
        this.deleteLimit = false;
      } else {
        this.deleteLimit = true;
      }
      this.multipleSelection = val;
    },
    add() {
      switch (this.activeName) {
        case "1":
          this.Signingshow = true;
          this.$refs.SigningDialog.getSigningData(
            {
              contractId: this.contract_id,
              plotId: this.plot_id,
              contractStartDate: this.contract_start,
              contractEndDate: this.contract_end,
            },
            0,
            typeof this.TableForm.history_contract_id != "undefined"
          );
          break;
        case "2":
          this.Depositshow = true;
          this.$refs.DepositDialog.getDepositData(
            { contractId: this.contract_id, plot_id: this.plot_id },
            0
          );
          break;
        case "3":
          break;
        case "4":
          this.Clauseshow = true;
          this.$refs.ClauseDialog.getReportData(
            {
              plotDbName: this.DefaultFrom.plotDbName,
              GLCID: this.DefaultFrom.GLCID,
              YXDID: this.DefaultFrom.YXDID,
              contract_id: this.contract_id,
            },
            0
          );
          break;
        case "5":
          break;
      }
    },
    edit() {
      switch (this.activeName) {
        case "1":
          this.Signingshow = true;
          var data = this.multipleSelection[0];
          data.plot_id = this.plot_id;
          this.$refs.SigningDialog.getSigningData(
            data,
            1,
            typeof this.TableForm.history_contract_id != "undefined"
          );
          break;
        case "2":
          this.Depositshow = true;
          var data = this.multipleSelection[0];
          data.contractId = this.contract_id;
          data.plot_id = this.plot_id;
          this.$refs.DepositDialog.getDepositData(data, 1);
          break;
        case "3":
          break;
        case "4":
          this.Clauseshow = true;
          var data = JSON.parse(JSON.stringify(this.tableRow));
          data.plotDbName = this.DefaultFrom.plotDbName;
          data.GLCID = this.DefaultFrom.GLCID;
          data.YXDID = this.DefaultFrom.YXDID;
          this.$refs.ClauseDialog.getReportData(data, 1);
          break;
        case "5":
          break;
      }
    },
    signingEdit() {
      this.Signingshow = true;
      var data = this.multipleSelection[0];
      data.plot_id = this.plot_id;
      data.contractStartDate = this.contract_start;
      data.contractEndDate = this.contract_end;
      this.$refs.SigningDialog.getSigningData(
        data,
        2,
        typeof this.TableForm.history_contract_id != "undefined"
      );
    },
    deletecontract() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          switch (this.activeName) {
            case "1":
              var data = this.multipleSelection;
              var deletedata = [];
              for (var i in data) {
                deletedata.push(data[i].resourcesId);
              }
              var deletejson = deletedata.join(",");
              deleteClauseAPi({
                agreementResourcesId: deletejson,
                plotId: this.plot_id,
              }).then((response) => {
                this.getClause();
                this.$refs.multipleTable.clearSelection();
                this.multipleSelection = []; //选择后清空选中表格数据
              });
              break;
            case "2":
              var data = this.multipleSelection;
              var deletedata = [];
              for (var i in data) {
                deletedata.push(data[i].depositId);
              }
              var deletejson = deletedata.join(",");
              deleteSecurityDeposit({
                depositId: deletejson,
                plot_id: this.plot_id,
              }).then((response) => {
                this.getDeposit();
                this.$refs.multipleTable.clearSelection();
                this.multipleSelection = []; //选择后清空选中表格数据
              });
              break;
            case "3":
              break;
            case "4":
              deleteBreachClause({
                plotDbName: this.DefaultFrom.plotDbName,
                GLCID: this.DefaultFrom.GLCID,
                YXDID: this.DefaultFrom.YXDID,
                clause_id: this.tableRow.clause_id,
              }).then((response) => {
                this.getDefault();
                this.radio = "";
                this.tableRow = {}; //选择后清空选中表格数据
              });
              break;
            case "5":
              break;
          }
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    tabclick(data) {
      if (this.activeNamecheck == data.name) return;
      this.activeNamecheck = data.name;

      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable1.clearSelection();
      this.$refs.multipleTable2.clearSelection();
      this.multipleSelection = []; //选择后清空选中表格数据

      switch (data.index) {
        case "0":
          this.addLimit = false;
          this.editLimit = true;
          this.deleteLimit = true;
          this.createCostListLimit = true;
          this.buttonname = "复制";
          break;
        case "1":
          this.addLimit = false;
          this.editLimit = true;
          this.deleteLimit = true;
          this.createCostListLimit = true;
          this.buttonname = "修改";
          break;
        case "2":
          this.addLimit = true;
          this.editLimit = true;
          this.deleteLimit = true;
          this.createCostListLimit = false;
          this.buttonname = "修改";
          break;
        case "3":
          this.addLimit = false;
          this.editLimit = true;
          this.deleteLimit = true;
          this.createCostListLimit = true;
          this.buttonname = "修改";
          break;
        case "4":
          this.addLimit = true;
          this.editLimit = true;
          this.deleteLimit = true;
          this.createCostListLimit = true;
          this.buttonname = "修改";
          break;
      }
    },
    getReportData(data, type) {
      this.buttonname = "复制";

      if (type == 0) {
        data.rent_free_unit = 1;
        data.contract_type = 1;
        this.title = "新增";
        this.contract_id = "";
        this.addLimit = true;
        this.editLimit = true;
        this.signingeditLimit = true;

        this.deleteLimit = true;
        this.createCostListLimit = true;
        this.tabLimit = true;

        this.ZLCustomer = [];
        this.ZLLessor = [];
        this.SigningTable = [];
        this.ContractList = [];
        this.InventoryList = [];

        var nowday = new Date();
        nowday.setTime(nowday.getTime());
        data.signing_date =
          nowday.getFullYear() +
          "-" +
          (nowday.getMonth() + 1) +
          "-" +
          nowday.getDate();

        this.activeName = "1";
        this.activeNamecheck = "1";
        this.TableForm = JSON.parse(JSON.stringify(data));
      } else {
        this.title = "修改";
        this.contract_id = data.contract_id;
        this.plot_id = data.plot_id;

        var _this = this;
        const parent = this.plot_List;
        const id = data.plot_id;
        data.plot_index = parent.findIndex((d) => d.id === id); //寻找data的索引

        this.DefaultFrom.plotDbName = this.plot_List[data.plot_index].dbName;
        this.DefaultFrom.GLCID = this.plot_List[data.plot_index].GLCID;
        this.DefaultFrom.YXDID = this.plot_List[data.plot_index].YXDID;
        this.DefaultFrom.contract_id = data.contract_id;

        this.contract_start = data.contract_start;
        this.contract_end = data.contract_end;

        queryZLCustomer({
          dbName: this.plot_List[data.plot_index].dbName,
          GLCID: this.plot_List[data.plot_index].GLCID,
          YXDID: this.plot_List[data.plot_index].YXDID,
        }).then((response) => {
          this.ZLCustomer = response;
        });
        queryZLLessor({
          dbName: this.plot_List[data.plot_index].dbName,
          GLCID: this.plot_List[data.plot_index].GLCID,
          YXDID: this.plot_List[data.plot_index].YXDID,
        }).then((response) => {
          this.ZLLessor = response;
          this.TableForm = JSON.parse(JSON.stringify(data));
          this.getClause();
          this.getDeposit();
          this.getInventory();
          this.getDefault();
          this.getFile();
          this.getday();
        });
        depositAPi3({
          plot_id: data.plot_id,
        }).then((response) => {
          this.options3 = response;
        });

        this.addLimit = false;
        this.editLimit = true;
        this.signingeditLimit = true;

        this.deleteLimit = true;
        this.createCostListLimit = true;
        this.tabLimit = false;
        this.activeName = "1";
        this.activeNamecheck = "1";

        queryContractCostAmount({
          contract_id: this.contract_id,
          plot_id: this.plot_id,
        }).then((response) => {
          this.totalamount = response.data.Amount;
        });
      }
    },
    Generatinglist() {
      createCostList({
        contract_id: this.contract_id,
        plot_id: this.TableForm.plot_id,
      }).then((response) => {
        this.getInventory();
        queryContractCostAmount({
          contract_id: this.contract_id,
          plot_id: this.plot_id,
        }).then((response) => {
          this.totalamount = response.data.Amount;
        });
      });
    },
    getClause() {
      getClauseAPi({
        contractId: this.contract_id,
        id: this.TableForm.plot_id,
      }).then((response) => {
        this.SigningTable = response.data;
      });
    },
    getDeposit() {
      querySecurityDepositList({
        contractId: this.contract_id,
        id: this.TableForm.plot_id,
      }).then((response) => {
        this.ContractList = response;
      });
    },
    getInventory() {
      this.InventoryFrom.contract_id = this.contract_id;
      this.InventoryFrom.plot_id = this.plot_id;
      queryContractCostList(this.InventoryFrom).then((response) => {
        var data = response;
        var list = [];
        var repeat = [];
        var i = -1;
        var id = 1;
        for (var j in data) {
          if (
            repeat.indexOf(
              `${data[j].cost_period}${data[j].room_name}${data[j].charge_item}`
            ) == -1
          ) {
            list.push({});
            repeat.push(
              `${data[j].cost_period}${data[j].room_name}${data[j].charge_item}`
            );
            i++;
            list[i].children = [];
            list[i].children.push(data[j]);
          } else {
            list[
              repeat.indexOf(
                `${data[j].cost_period}${data[j].room_name}${data[j].charge_item}`
              )
            ].children.push(data[j]);
          }
        }
        for (var k in list) {
          var children = list[k].children;
          list[k].GLCID = 1;
          list[k].JT_ZJ = "xm_tfjt";
          list[k].YXDID = "";
          list[k].begin_date = children[0].begin_date;
          list[k].charge_item = children[0].charge_item;
          list[k].contract_id = "";
          list[k].cost_days = 0;
          list[k].cost_id = "";
          list[k].cost_period = children[0].cost_period;
          list[k].create_date = "";
          list[k].create_user = "";
          list[k].date_price = "";
          list[k].deduction_price = 0;
          list[k].end_date = children[children.length - 1].end_date;
          list[k].price = 0;
          list[k].receivable_date = children[0].receivable_date;
          list[k].resources_id = "";
          list[k].room_name = children[0].room_name;
          list[k].summary = `${children[0].begin_date} 至 ${
            children[children.length - 1].end_date
          }`;
          list[k].whether_pass = 0;
          list[k].id = id;
          id++;
          for (var index in children) {
            list[k].cost_days += parseFloat(children[index].cost_days);
            list[k].price += parseFloat(children[index].price);
            list[k].deduction_price += parseFloat(
              children[index].deduction_price
            );
            list[k].children[index].id = id;
            id++;
          }
        }
        this.InventoryList = JSON.parse(JSON.stringify(list));
      });
    },
    getDefault() {
      queryBreachClause(this.DefaultFrom).then((response) => {
        this.DefaultList = response.data;
        this.DefaultreturnTotal = response.total;
      });
    },
    getFile() {
      queryContractAccessory({
        dbName: this.DefaultFrom.plotDbName,
        contractId: this.DefaultFrom.contract_id,
      }).then((response) => {
        this.fileList = response;
      });
    },
    getday() {
      var _this = this;
      queryZLEarlyWarning({
        plot_id: this.plot_id,
      }).then((response) => {
        _this.dayList = response;
      });
    },
    building() {
      this.$message({
        message: "建设中...",
      });
    },
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (this.title == "新增") {
            if (this.contract_id) {
              this.cancle();
            } else {
              addContractMessage(_this.TableForm).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  this.$confirm(
                    "合同基本信息已新增完毕, 是否继续增加其他相关信息?",
                    "提示",
                    {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning",
                    }
                  )
                    .then(() => {
                      this.contract_id = response.data.contract_id;
                      this.plot_id = response.data.plot_id;
                      this.addLimit = false;
                      this.editLimit = true;

                      this.deleteLimit = true;
                      this.createCostListLimit = true;
                      this.DefaultFrom.contract_id = this.contract_id;
                      this.tabLimit = false;
                      this.TableForm.contract_id = response.data.contract_id;

                      this.contract_start = this.TableForm.contract_start;
                      this.contract_end = this.TableForm.contract_end;

                      this.title = "修改";

                      queryContractCostAmount({
                        contract_id: this.contract_id,
                        plot_id: this.plot_id,
                      }).then((response) => {
                        this.totalamount = response.data.Amount;
                      });
                    })
                    .catch(() => {
                      this.$emit("RefreshItem", 0);
                      this.$emit("update:show", false);
                      this.$nextTick(() => {
                        this.$refs.TableForm.resetFields(); //重置输入框提示
                      });
                    });
                }
              });
            }
          } else {
            updateContractMessage(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem", 1);
                this.$emit("update:show", false);
                this.$nextTick(() => {
                  this.$refs.TableForm.resetFields(); //重置输入框提示
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("RefreshItem", 0);
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
  components: {
    DepositDialog,
    SigningDialog,
    ClauseDialog,
  },
};
</script>

<style lang="scss">
.contractDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.contractDialog .el-date-editor {
  width: 100% !important;
  text-align: left;
}

.contractDialog .buttonBox {
  text-align: left;
  padding: 0 33px;
  overflow: auto;
}

.contractDialog .el-input-number {
  width: 100%;
}

.contractDialog .el-input-number input {
  text-align: left;
}

.contractDialog .el-tabs {
  padding: 0 33px;
}

.contractDialog .el-tabs__nav {
  background: #ffffff;
  border-top-right-radius: 10px !important;
}

.contractDialog .el-tabs--card > .el-tabs__header .el-tabs__item {
  border-left: none;
  border-bottom: none;
  color: #4d4d4d;
  background: #ffffff;
  font-weight: bold;
  border-top-right-radius: 10px !important;
  border-right: 1px solid #e4e7ed;
  width: 100px;
}

.contractDialog .el-tabs__item.is-active {
  background: #2e8ad7 !important;
  color: #ffffff !important;
  border-top-right-radius: 10px;
}

.contractDialog .el-tabs__header {
  margin-bottom: 0;
}

.contractDialog .updata {
  width: 100%;
  height: 300px;
  border: 1px solid #e4e7ed;
  text-align: left;
  padding: 10px;
}

.contractDialog .el-form-item {
  margin-bottom: 5px;
}

.contractDialog .totalamount {
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding: 0 20px;
}

.contractDialog .filelist {
  width: 100%;
  height: 240px;
  margin-top: 10px;
  overflow: auto;
  .unit {
    width: 100%;
    height: 40px;
    padding: 10px;
    .fileimg {
      height: 20px;
      display: inline-block;
      float: left;
    }
    span {
      line-height: 20px;
      font-size: 16px;
      display: inline-block;
      float: left;
      margin-left: 5px;
    }
    .closeimg {
      height: 16px;
      display: inline-block;
      float: right;
      position: relative;
      top: 2px;
    }
    .closeimg:active {
      opacity: 0.7;
    }
    .downloadimg {
      margin-right: 10px;
    }
  }
  .unit:hover {
    background: #eeeeee;
  }
}

.contractDialog {
  .el-dialog__body {
    padding: 10px 0;
  }

  .contracttitle {
    width: 100%;
    height: 40px;
    position: relative;
    .contractname {
      position: absolute;
      height: 40px;
      left: 35px;
      top: 0;
      width: 105px;
      line-height: 50px;
      background: #ffffff;
      text-align: left;
      z-index: 2;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(38, 38, 38, 1);
      img {
        position: relative;
        top: 3px;
      }
    }
    .contractline {
      position: absolute;
      top: 0;
      left: 45px;
      right: 45px;
      height: 25px;
      border-bottom: 1px dashed #ccc;
      z-index: 1;
    }
  }
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
  height: 55px;
}
</style>
