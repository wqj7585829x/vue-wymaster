<template>
  <div class="changeDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="75px"
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="30" class="newcontract">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="新合同编号:" prop="contract_num">
              <el-input v-model="TableForm.contract_num" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="变更时间:" prop="contract_change_date">
              <el-date-picker
                v-model="TableForm.contract_change_date"
                type="date"
                placeholder=""
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="变更人:" prop="contract_changer">
              <el-input
                v-model="TableForm.contract_changer"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="contracttitle">
          <div class="contractname">
            <img :src="require(`@/assets/comImgs/contract_list.png`)" alt="" />
            合同主表
          </div>
          <div class="contractline"></div>
        </div>
        <el-row :gutter="30">
          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="合同编号:" prop="oldcontract_num">
              <el-input
                v-model="TableForm.oldcontract_num"
                clearable
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="项目名称:" prop="plot_index">
              <el-select
                v-model="TableForm.plot_index"
                @change="plotChange"
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
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
                  :key="index"
                  :label="item.SFKM_SKFS"
                  :value="item.SFKM_ZJ"
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

          <el-col :span="6" style="min-width: 220px">
            <el-form-item label="合同类型:">
              <el-select v-model="TableForm.contract_type">
                <el-option label="租赁合同" :value="1"></el-option>
                <el-option label="销售合同" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="min-width: 220px">
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
        <el-button
          type="primary"
          @click="sure()"
          style="float: right"
          :disabled="suredisabled"
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
          >编辑
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
          v-has="'ContractOtherEdit_has'"
          >导出excel
        </el-button>
      </div>
      <!-- 按钮end -->

      <el-tabs v-model="activeName" type="card" @tab-click="tabclick">
        <el-tab-pane label="费用条款" name="1" :disabled="tabLimit">
          <div class="resoureTable">
            <el-table
              ref="multipleTable1"
              height="270"
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
                v-if="tableshow"
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
                label="建筑面积"
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
                label="单价单位"
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
            <div class="totalamount">总金额：{{ totalamount }}</div>
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
              <el-table-column
                prop="payableAmount"
                label="应缴金额"
                width="120"
              ></el-table-column>
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
              :height="245"
              :data="InventoryList"
              border
            >
              <el-table-column
                prop="date_price"
                label="日单价"
                width="120"
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
                width="120"
              ></el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                width="120"
              ></el-table-column>
            </el-table>
            <!-- 分页begin -->
            <div class="block">
              <div style="float: left">总金额：{{ totalamount }}</div>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="InventoryFrom.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="returnTotal"
                v-if="returnTotal > InventoryFrom.pageSize"
              >
              </el-pagination>
            </div>
            <!-- 分页end -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="违约条框" name="4" :disabled="tabLimit">
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
  addContractChangeMessage,
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
} from "@/api/Realtor/Contract";
import DepositDialog from "../../list/components/DepositDialog";
import SigningDialog from "../../list/components/SigningDialog";
import ClauseDialog from "../../list/components/ClauseDialog";
import config from "@/utils/config";
import { diffDate } from "@/utils/global.js";
export default {
  data() {
    return {
      visible: this.show,
      title: "变更", //标题
      categoryList: "",
      rules: {
        contract_num: [
          { required: true, message: "请输入合同编号", trigger: "blur" },
        ],
        contract_changer: [
          { required: true, message: "请输入变更人", trigger: "blur" },
        ],
        contract_change_date: [
          { required: true, message: "请输入变更时间", trigger: "blur" },
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
        decorate_start: [
          { required: true, message: "请选择装修起始", trigger: "blur" },
        ],
        decorate_end: [
          { required: true, message: "请选择装修截止", trigger: "blur" },
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
      tableshow: false,
      suredisabled: false,
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
      this.$nextTick(function () {
        if (this.TableForm.contract_start) {
          if (this.TableForm.contract_end) {
            if (
              new Date(this.TableForm.contract_end).valueOf() >=
              new Date(this.TableForm.contract_start).valueOf()
            ) {
              var date = diffDate(
                this.TableForm.contract_start,
                this.TableForm.contract_end
              );
              var value =
                date.year * 12 + date.month == 0
                  ? ""
                  : date.year * 12 + date.month + "月";
              value += date.day == 0 ? "" : date.day + "日";
              this.$set(this.TableForm, "lease_cycle", value);
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
      if (!this.tableshow) return;
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
    plotChange(index) {
      this.TableForm.plot_id = this.plot_List[index].id;
      this.TableForm.KHDA_ZJ = "";
      this.TableForm.lessor_id = "";

      this.DefaultFrom.plotDbName = this.plot_List[index].dbName;
      this.DefaultFrom.GLCID = this.plot_List[index].GLCID;
      this.DefaultFrom.YXDID = this.plot_List[index].YXDID;

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
            { contractId: this.contract_id, plotId: this.plot_id },
            0,
            1
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
          this.$refs.SigningDialog.getSigningData(data, 1, 1);
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
      this.$refs.SigningDialog.getSigningData(data, 2, 1);
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
              deleteSecurityDeposit({ depositId: deletejson }).then(
                (response) => {
                  this.getDeposit();
                  this.$refs.multipleTable.clearSelection();
                  this.multipleSelection = []; //选择后清空选中表格数据
                }
              );
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
      this.title = "变更";
      this.contract_id = data.contract_id;
      this.plot_id = data.plot_id;
      this.tableshow = false;
      this.suredisabled = false;

      data.oldcontract_num = data.contract_num;
      data.contract_num = "";

      data.contract_change_date = "";
      data.contract_changer = "";

      var _this = this;
      const parent = this.plot_List;
      const id = data.plot_id;
      data.plot_index = parent.findIndex((d) => d.id === id); //寻找data的索引

      this.DefaultFrom.plotDbName = this.plot_List[data.plot_index].dbName;
      this.DefaultFrom.GLCID = this.plot_List[data.plot_index].GLCID;
      this.DefaultFrom.YXDID = this.plot_List[data.plot_index].YXDID;
      this.DefaultFrom.contract_id = data.contract_id;

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
        // this.getInventory()
        this.getDefault();
        this.getFile();
      });
      depositAPi3({
        plot_id: data.plot_id,
      }).then((response) => {
        this.options3 = response;
      });

      this.addLimit = true;
      this.editLimit = true;
      this.signingeditLimit = true;

      this.deleteLimit = true;
      this.createCostListLimit = true;
      this.tabLimit = true;

      queryContractCostAmount({
        contract_id: this.contract_id,
        plot_id: this.plot_id,
      }).then((response) => {
        this.totalamount = response.data.Amount;
      });
    },
    Generatinglist() {
      createCostList({
        contract_id: this.contract_id,
        plot_id: this.TableForm.plot_id,
      }).then((response) => {
        this.getInventory();
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
        this.InventoryList = response;
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
    building() {
      this.$message({
        message: "建设中...",
      });
    },
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          addContractChangeMessage(_this.TableForm).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              _this.contract_id = response.data.contract_id;
              _this.plot_id = response.data.plot_id;
              _this.addLimit = false;
              _this.editLimit = true;

              _this.deleteLimit = true;
              _this.createCostListLimit = true;
              _this.DefaultFrom.contract_id = this.contract_id;
              _this.tabLimit = false;

              _this.tableshow = true;
              _this.suredisabled = true;

              _this.getClause();
              _this.getDeposit();
              _this.getDefault();
              _this.getFile();
            }
          });
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
.changeDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.changeDialog .el-date-editor {
  width: 100% !important;
  text-align: left;
}

.changeDialog .buttonBox {
  text-align: left;
  padding: 0 33px;
  overflow: auto;
}

.changeDialog .el-input-number {
  width: 100%;
}

.changeDialog .el-input-number input {
  text-align: left;
}

.changeDialog .el-tabs {
  padding: 0 33px;
}

.changeDialog .el-tabs__nav {
  background: #ffffff;
  border-top-right-radius: 10px !important;
}

.changeDialog .el-tabs--card > .el-tabs__header .el-tabs__item {
  border-left: none;
  border-bottom: none;
  color: #4d4d4d;
  background: #ffffff;
  font-weight: bold;
  border-top-right-radius: 10px !important;
  border-right: 1px solid #e4e7ed;
  width: 100px;
}

.changeDialog .el-tabs__item.is-active {
  background: #2e8ad7 !important;
  color: #ffffff !important;
  border-top-right-radius: 10px;
}

.changeDialog .el-tabs__header {
  margin-bottom: 0;
}

.changeDialog .updata {
  width: 100%;
  height: 300px;
  border: 1px solid #e4e7ed;
  text-align: left;
  padding: 10px;
}

.changeDialog .el-form-item {
  margin-bottom: 5px;
}

.changeDialog .totalamount {
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding: 0 20px;
}

.changeDialog .filelist {
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
  }
  .unit:hover {
    background: #eeeeee;
  }
}

.changeDialog {
  .newcontract {
    position: relative;
    top: 11px;
  }

  .el-dialog__body {
    padding: 0;
  }

  .contracttitle {
    width: 100%;
    height: 40px;
    position: relative;
    .contractname {
      position: absolute;
      height: 30px;
      left: 35px;
      top: 10px;
      width: 105px;
      line-height: 30px;
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
