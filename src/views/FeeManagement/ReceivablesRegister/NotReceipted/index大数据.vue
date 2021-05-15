<template>
  <div class="containerBox NotReceipted">
    <!-- 资源名称-   客户名称 start -->
    <section class="Resource_title">
      <span
        >资源名称：<span class="TextColor">{{ resourceName }}</span></span
      >
      <span
        >客户名称：<span class="TextColor">{{
          tableParameter.KHDA_KHMC
        }}</span></span
      >
      <span
        >欠款金额：<span class="TextColor">{{
          formatMoney(owMoney)
        }}</span></span
      >
      <span
        >选定欠款金额：<span class="TextColor checkQkMoney">{{
          formatMoney(CheckowMoney)
        }}</span></span
      >
      <span
        >收费面积：<span class="TextColor">{{ tollArea }}</span></span
      >
    </section>
    <!-- 资源名称- 客户名称end -->

    <!-- 搜索条件 start -->
    <section class="select">
      <el-form label-width="115px">
        <el-row :gutter="30">
          <el-col :span="5" style="width: 310px">
            <el-form-item label="收费项目:" label-width="70px">
              <el-select
                v-model="projectID"
                class="projectSelect"
                multiple
                collapse-tags
                clearable
              >
                <el-option
                  v-for="item in projectData"
                  :key="item.SFXM_ZJ"
                  :value="item.SFXM_ZJ"
                  :label="item.SFXM_SFXMMC"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 220px">
            <el-form-item label="开始年月:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.QSNY"
                type="month"
                placeholder="选择年月"
                format="yyyy-MM"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 220px">
            <el-form-item label="结束年月:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.JZNY"
                type="month"
                placeholder="选择年月"
                format="yyyy-MM"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5" style="width: 240px">
            <el-form-item label="类型:" label-width="70px">
              <el-select v-model="theWay">
                <el-option :value="1" label="按年月"></el-option>
                <el-option :value="2" label="按收费项目"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="width: 100px">
            <el-form-item label-width="0">
              <el-button
                type="success"
                @click="submit()"
                v-has="'ReceiClearedQuery_has'"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <!-- 搜索条件 end -->

    <!-- 按钮区域start -->
    <section class="buttonBox" ref="elbuttonBox">
      <el-row>
        <el-col :span="24">
          <el-button
            type="primary"
            :disabled="ReceiptedSeldisabledBtn"
            :title="ReceiptedSelTitle"
            @click="ReceiptedSelectDialog"
            v-has="'ReceiReceiptedSelect_has'"
            >收清选中</el-button
          >
          <el-button
            type="primary"
            @click="Single"
            :disabled="CostdisableBtn"
            v-has="'ReceiSingle_has'"
            >单个计算
          </el-button>
          <el-button
            type="primary"
            :disabled="CostdisableBtn"
            @click="CostAdjustmentDialog"
            v-has="'ReceiCostAdjustment_has'"
            >费用调整</el-button
          >
          <el-button
            type="primary"
            :disabled="ChargedisableBtn"
            @click="ChargeInformationDialog"
            v-has="'ReceiCostChargeInfo_has'"
            :title="chageInfoTitle"
            >收费相关信息</el-button
          >
          <el-button
            type="primary"
            @click="filedConfiClick"
            class="custom_field"
            icon="el-icon-setting"
            >自定义栏位
          </el-button>
        </el-col>
      </el-row>
    </section>
    <!-- 按钮区域end -->

    <!-- 表格列表start -->
    <div v-show="theWayTable == 1 && checkData.length > 0">
      <u-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="600"
        class="tableContent"
        @selection-change="changeFun"
        @row-click="rowClick"
        ref="NotResingleTable"
        use-virtual
        big-data-checkbox
        :row-height="30"
        :cell-class-name="cellcb"
        :data-changes-scroll-top="false"
      >
        <u-table-column
          label="选择"
          type="selection"
          @selection-change="changeFun"
          fixed
          width="50"
          :selectable="IsSelectionban"
        ></u-table-column>
        <div v-for="(item, index) in checkData" :key="index">
          <div v-if="item.content == '费用期间'">
            <u-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  v-model.trim="scope.row.FYSQ_ZY"
                  @change="zyChange(scope.row.FYSQ_ZY, scope.row.FYSQ_ZJ)"
                  @click.stop.native
                >
                </el-input>
              </template>
            </u-table-column>
          </div>
          <div v-else-if="item.content == '备注'">
            <u-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                <div v-if="scope.row.SFXM_SFCWF">
                  <el-select
                    v-model.trim="scope.row.FYSQ_BZ"
                    @change="
                      changeCarSelect(scope.row.FYSQ_ZJ, scope.row.FYSQ_BZ)
                    "
                  >
                    <el-option
                      v-for="item2 in scope.row.carcodes"
                      :key="item2.CLXX_CPH"
                      :value="item2.CLXX_CPH"
                      :label="item2.CLXX_CPH"
                      @click.stop.native
                    ></el-option>
                  </el-select>
                </div>
                <div v-else>
                  <el-input
                    type="textarea"
                    v-model.trim="scope.row.FYSQ_BZ"
                    @change="
                      changeCarSelect(scope.row.FYSQ_ZJ, scope.row.FYSQ_BZ)
                    "
                    @click.stop.native
                  >
                  </el-input>
                </div>
              </template>
            </u-table-column>
          </div>
          <div v-else-if="item.content == '挂起'">
            <u-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.FYSQ_GQ"
                  @change="HangCheck(scope.row.FYSQ_ZJ, scope.row.FYSQ_GQ)"
                >
                </el-checkbox>
              </template>
            </u-table-column>
          </div>
          <div v-else-if="item.content == '先票状态'">
            <u-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                {{
                  scope.row.FYSQ_XPKPZT == 1
                    ? "未申请"
                    : scope.row.FYSQ_XPKPZT == 2
                    ? "已申请"
                    : ""
                }}
              </template>
            </u-table-column>
          </div>
          <div v-else>
            <u-table-column
              :prop="formatMoney(item.field, item.content)"
              :label="item.content"
              :width="item.width"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ formatMoney(scope.row[item.field]) }}
              </template>
            </u-table-column>
          </div>
        </div>
      </u-table>
    </div>
    <div v-show="theWayTable == 2 && checkData.length > 0">
      <u-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="600"
        class="tableContent"
        @row-click="rowClick"
        ref="NotResingleTable"
        row-key="id"
        :data-changes-scroll-top="false"
        :treeConfig="{
          children: 'children',
          expandAll: false,
          lazy: true,
          load: load,
          hasChildren: 'hasChildren',
        }"
        big-data-checkbox
        :row-height="30"
        row-id="id"
        use-virtual
      >
        <u-table-column :tree-node="true"></u-table-column>

        <u-table-column label="" width="100" fixed>
          <template slot-scope="scope" slot="header">
            <el-checkbox
              v-model="allValue"
              @change="checkAll"
              :indeterminate="isIndeterminate"
            ></el-checkbox>
          </template>
          <template slot-scope="scope">
            <!-- <el-checkbox v-model="scope.row.isCheck" :indeterminate="scope.row.isdeter" @change="cChange(scope.row)"
              :disabled="!scope.row.canSelect">
            </el-checkbox> -->
            <el-checkbox
              v-model="scope.row.isCheck"
              @change="cChange(scope.row)"
              :disabled="!scope.row.canSelect"
            >
            </el-checkbox>
          </template>
        </u-table-column>

        <div v-for="(item, index) in checkData" :key="index">
          <div v-if="item.content == '费用期间'">
            <u-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  v-model.trim="scope.row.FYSQ_ZY"
                  @change="zyChange(scope.row.FYSQ_ZY, scope.row.FYSQ_ZJ)"
                  @click.stop.native
                >
                </el-input>
              </template>
            </u-table-column>
          </div>
          <div v-else-if="item.content == '备注'">
            <u-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                <div v-if="scope.row.SFXM_SFCWF">
                  <el-select
                    v-model.trim="scope.row.FYSQ_BZ"
                    @change="
                      changeCarSelect(scope.row.FYSQ_ZJ, scope.row.FYSQ_BZ)
                    "
                  >
                    <el-option
                      v-for="item2 in scope.row.carcodes"
                      :key="item2.CLXX_CPH"
                      :value="item2.CLXX_CPH"
                      :label="item2.CLXX_CPH"
                      @click.stop.native
                    ></el-option>
                  </el-select>
                </div>
                <div v-else>
                  <el-input
                    type="textarea"
                    v-model.trim="scope.row.FYSQ_BZ"
                    @change="
                      changeCarSelect(scope.row.FYSQ_ZJ, scope.row.FYSQ_BZ)
                    "
                    @click.stop.native
                  >
                  </el-input>
                </div>
              </template>
            </u-table-column>
          </div>
          <div v-else-if="item.content == '挂起'">
            <u-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.FYSQ_GQ"
                  @change="HangCheck(scope.row.FYSQ_ZJ, scope.row.FYSQ_GQ)"
                  v-if="!scope.row.isParent"
                ></el-checkbox>
              </template>
            </u-table-column>
          </div>
          <div v-else-if="item.content == '先票状态'">
            <u-table-column :label="item.content" :width="item.width">
              <template slot-scope="scope">
                {{
                  scope.row.FYSQ_XPKPZT == 1
                    ? "未申请"
                    : scope.row.FYSQ_XPKPZT == 2
                    ? "已申请"
                    : ""
                }}
              </template>
            </u-table-column>
          </div>
          <div v-else>
            <u-table-column
              :prop="formatMoney(item.field, item.content)"
              :label="item.content"
              :width="item.width"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ formatMoney(scope.row[item.field]) }}
              </template>
            </u-table-column>
          </div>
        </div>
      </u-table>
    </div>
    <!-- 表格列表end -->
    <!-- 收费相关信息 start -->
    <ChargeInformationDialog
      :showdialogCharge.sync="showdialogCharge"
      ref="ReceiptedSelectPopChildren"
      :tableRow="tableRow"
      :FKGX_ZJ="FKGX_ZJ"
    ></ChargeInformationDialog>
    <!-- 收费相关信息 end -->

    <!-- 收清选中弹窗start -->
    <ReceiptedSelectDialog
      :showdialog.sync="showdialog"
      @RefreshItem="RefreshList"
      ref="ReceiptedSelectPopChildren"
    >
    </ReceiptedSelectDialog>
    <!-- 收清选中弹窗end -->

    <!-- 费用调整弹窗start -->
    <CostAdjustmentDialog
      :showdialogCost.sync="showdialogCost"
      @RefreshItem="RefreshList"
      :FKGX_ZJ="FKGX_ZJ"
      ref="costChildren"
    ></CostAdjustmentDialog>
    <!-- 费用调整弹窗end -->

    <!-- 单个计算弹窗start -->
    <SingleCalculationDialog
      :showdialogSing.sync="showdialogSing"
      @RefreshItem="RefreshList"
      :FKGX_ZJ="FKGX_ZJ"
      ref="singleCalChildren"
    ></SingleCalculationDialog>
    <!-- 单个计算弹窗end  -->

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
import ReceiptedSelectDialog from "./components/ReceiptedSelectDialog"; //收清选中
import CostAdjustmentDialog from "./components/CostAdjustmentDialog"; //费用调整
import SingleCalculationDialog from "./components/SingleCalculationDialog"; //单个计算
import ChargeInformationDialog from "./components/ChargeInformationDialog"; //收费相关信息
import fieldMinxin from "@/components/FieldConfig/field.js"; //自定义栏位 注入

import {
  queryResourceNotReceipt,
  queryUncollectedFeesGroupByItemsApi,
  queryChildrenUncollectedFees,
  updateNote,
  updateSummary,
  queryChargeItem,
  hangUncollectedFeesApi,
} from "@/api/FeeManagement/NotReceipted"; //未收清款项Api
import { formatMoney } from "@/utils/global.js";
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "NotReceipted",
  props: ["resourceName"], //显示隐藏资源名称与禁用客户信息,父子传递信息,收费项目
  mixins: [fieldMinxin], //注入
  components: {
    ReceiptedSelectDialog,
    CostAdjustmentDialog,
    SingleCalculationDialog,
    ChargeInformationDialog,
    UTable,
    UTableColumn,
  },
  data() {
    return {
      multipleSelection: [], //选中数据
      ReceiptedSeldisabledBtn: true, //默认禁用
      CostdisableBtn: true, //费用调整默认禁用
      ChargedisableBtn: true, //默认收费相关信息默认禁用
      showdialog: false, //收清选中弹窗默认隐藏
      showdialogCost: false, //费用调整弹窗默认隐藏
      showdialogSing: false, //单个计算弹窗默认隐藏
      showdialogCharge: false, //收费相关信息默认隐藏
      showFieldConfig: false, //自定义栏位默认隐藏
      tableData: [],
      ReceiptedSelTitle: "",
      chageInfoTitle: "", //收费相关信息标题提示
      owMoney: "", //欠教款
      tollArea: "", //收费面积,
      toallMoney: 0, //选定金额
      selectType: 1, //1 按资源 2按客户,
      FKGX_ZJ: null,
      FCDM_LX: "", //树类型,
      tableRow: {},
      showBzdialog: false, //备注弹窗默认隐藏
      projectData: [], //收费项目数据
      time: [],
      projectID: [], //项目外键
      tableParameter: {},
      theWay: 1, //1 按年月  2按收费项目
      theWayTable: 1,
      arrNew: false,
      childrenArr: [], //存子级数组
      allValue: false, //全选
      isIndeterminate: false,
      code: "NotReceipted", //模块栏位配置编码
      tableDataLen: 0, //记录子级可以选中的总长度
      configData: [
        //默认配置栏位
        { content: "资源代码", width: 150, field: "FKGX_FJID" },
        { content: "所属年月", width: 100, field: "FYSQ_SSNY" },
        { content: "收费项目", width: 160, field: "FYSQ_SFXMMC" },
        { content: "先票状态", width: 80, field: "FYSQ_XPKPZT" },
        { content: "应收金额（含税）", width: 120, field: "FYSQ_YSJE" },
        { content: "已收金额", width: 80, field: "FYSQ_SSJE" },
        { content: "欠收金额", width: 80, field: "FYSQ_QSJE" },
        { content: "税率", width: 80, field: "FYSQ_YSSL" },
        { content: "应收不含税", width: 100, field: "FYSQ_YSBHS" },
        { content: "调整说明", width: 150, field: "FYSQ_TZSM" },
        { content: "调整人", width: 100, field: "FYSQ_TZR" },
        { content: "费用期间", width: 300, field: "FYSQ_ZY" },
        { content: "备注", width: 300, field: "FYSQ_BZ" },
        { content: "挂起", width: 50, field: "FYSQ_GQ", isShow: false },
        { content: "生成日期", width: 150, field: "FYSQ_SCRQ", isShow: false },
        { content: "计算单价", width: 100, field: "CGJS_JSDJ", isShow: false },
        { content: "计算面积", width: 100, field: "CGJS_CS", isShow: false },
        { content: "本月读数", width: 100, field: "ZBJS_BYDS", isShow: false },
        { content: "上月读数", width: 100, field: "ZBJS_SYDS", isShow: false },
        { content: "本月行度", width: 100, field: "ZBJS_BYXD", isShow: false },
      ],
    };
  },
  methods: {
    formatMoney(data, value) {
      if (data || data == 0) {
        if (
          value == "应收金额（含税）" ||
          value == "已收金额" ||
          value == "欠收金额" ||
          value == "应收不含税"
        ) {
          return data >= 0 && data
            ? formatMoney(data, true)
            : `-${formatMoney(0 - data, true)}`;
        } else {
          return data;
        }
      }
    },
    getInitial() {
      //计算table高度
      this.checkData = [];
      if (localStorage.getItem("theWayTable")) {
        //如果有选择类型  默认选中
        this.theWay = Number(localStorage.getItem("theWayTable"));
        this.theWayTable = Number(localStorage.getItem("theWayTable"));
      }
      this.getProjectRequest(); //收费项目查询
      this.getFieldConfig(this.code); //栏位配置查询
    },
    RecequeryByPage(obj, type) {
      //每次都进入这个方法
      this.tableData = []; //切换房间清空列表数据
      this.multipleSelection = []; //清空选中数据
      this.childrenArr = []; //清空懒加载展开数据
      this.selectType = type; //1 按资源 2按客户
      this.allValue = false; //清空按收费项目搜索的全选状态
      // this.isIndeterminate = false;//清空按收费项目搜索的半选状态
      obj.QSNY = this.tableParameter.QSNY;
      obj.JZNY = this.tableParameter.JZNY;
      obj.FYSQ_SFXMWJ = this.tableParameter.FYSQ_SFXMWJ;
      //this.projectID = [];//清空收费项目
      let newRowData = JSON.parse(JSON.stringify(obj)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址

      if (type == 1) {
        this.FKGX_ZJ = obj.FKGX_ZJ; //按资源获取房客关系主键
      } else {
        this.FKGX_ZJ = obj.KHDA_ZJ; //按客户获取客户档案主键
      }
      if (this.theWayTable == 1) {
        this.querResourceRequest(); //查询年月未收清费用
      } else {
        this.queryUncollectedFeesGroupByItems(); //查询收费项目未收清费用
      }
    },
    querResourceRequest() {
      //按年月查询
      queryResourceNotReceipt(this.tableParameter, this.selectType).then(
        (response) => {
          this.owMoney = response.QJK;
          this.tollArea = response.SFMJ;
          // var aa=[]
          // for(var i=0;i<20000;i++){//测试大数据
          //    var obj={FYSQ_SFXMMC:"物业管理费",FKGX_FJID:'1',FYSQ_SSNY:'1',FYSQ_SFXMMC:'1',FYSQ_XPKPZT:'1',FYSQ_YSJE:'1',FYSQ_SSJE:'1',FYSQ_QSJE:'1',FYSQ_YSSL:'1',FYSQ_YSBHS:'1',FYSQ_TZSM:'1',FYSQ_TZR:'1',FYSQ_ZY:'1',FYSQ_BZ:'1'}
          //    aa.push(obj)
          // }
          // this.tableData=aa
          this.tableData = response.list; //显示表格列表
        }
      );
    },
    queryUncollectedFeesGroupByItems() {
      //按收费项目查询
      queryUncollectedFeesGroupByItemsApi(
        this.tableParameter,
        this.selectType
      ).then((response) => {
        this.owMoney = response.QJK;
        this.tollArea = response.SFMJ;
        this.tableData = response.list; //显示表格列表
        if (this.tableData.length > 0) {
          this.tableDataLen = 0;
          this.tableData.forEach((item) => {
            this.$set(item, "isCheck", false);
            this.$set(item, "isdeter", false); //父级checkbox  半选状态
            this.$set(item, "isParent", true); //用来记录是否是父级  用来隐藏或显示挂起的checkbox
            this.tableDataLen++;
          });
        } else {
          this.multipleSelection = [];
        }
      });
    },
    getPermission(obj, type) {
      this.selectType = type;
      if (Object.keys(obj).length != 0) {
        this.FCDM_LX = obj.data.FCDM_LX;
        if (obj.data.FCDM_LX != "房间") {
          this.CostdisableBtn = true;
          this.ChargedisableBtn = true;
          this.isIndeterminate = false;
          this.owMoney = "";
          this.tollArea = "";
          this.tableParameter.KHDA_KHMC = "";
          this.tableData = [];
        }
      }
    },
    getProjectRequest() {
      queryChargeItem().then((response) => {
        //查询费用项目
        this.projectData = response;
      });
    },
    rowClick(row) {
      //单行选中
      this.tableRow = row;
      // this.$refs.NotResingleTable.toggleRowSelection(Array(row),true); //单击表格复选框选中
    },
    ReceiptedSelectDialog() {
      //点击收清选中弹窗显示
      this.showdialog = true;
      if (this.theWayTable == 2) {
        //按项目收清 获取选中的数据
        this.multipleSelection = [];
        this.tableData.forEach((item) => {
          if (item.isCheck) {
            this.multipleSelection.push(item);
          }
        });
        this.childrenArr.forEach((item) => {
          if (item.isCheck) {
            this.multipleSelection.push(item);
          }
        });
      }
      this.$refs.ReceiptedSelectPopChildren.getReceiptedSelect(
        this.multipleSelection,
        this.FKGX_ZJ,
        this.tableParameter,
        this.selectType,
        this.theWayTable
      ); //传递给弹窗数据
    },
    CostAdjustmentDialog() {
      //点击费用调整弹窗显示
      this.showdialogCost = true;
      this.$refs.costChildren.getData(
        this.tableParameter,
        this.selectType,
        this.theWayTable
      ); //传递给弹窗数据
    },
    ChargeInformationDialog() {
      //点击收费相关信息
      this.showdialogCharge = true;
    },
    Single() {
      //点击单个计算弹窗显示
      this.showdialogSing = true;
      this.$refs.singleCalChildren.getData(
        this.tableParameter,
        this.selectType,
        this.theWayTable
      ); //传递给弹窗数据
    },
    changeFun(val) {
      //全选
      this.multipleSelection = val;
    },
    RefreshList(obj, type, theWayTable) {
      //回调刷新
      this.selectType = type; //记录操作的类型 1按资源 2按客户
      this.theWayTable = theWayTable; //1按年月  2按收费项目
      this.tableData = [];
      this.multipleSelection = [];
      this.allValue = false;
      this.isIndeterminate = false;
      this.childrenArr = [];
      let newRowData = JSON.parse(JSON.stringify(obj)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      if (type == 1) {
        this.FKGX_ZJ = obj.FKGX_ZJ;
      } else {
        this.FKGX_ZJ = obj.KHDA_ZJ;
      }
      if (this.theWayTable == 1) {
        //每次回掉重新刷新列表数据
        this.querResourceRequest(); //查询年月未收清费用
      } else {
        this.queryUncollectedFeesGroupByItems(); //查询收费项目未收清费用
      }
    },
    updateCarNoRequest(vak) {
      updateNote(this.formList).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.$emit("RefreshItem", this.queryObj, this.selectType);
          this.cancle();
        }
      });
    },
    changeCarSelect(FYSQ_ZJ, val) {
      //修改车牌
      var data = {};
      data.FYSQ_ZJ = FYSQ_ZJ;
      data.FYSQ_BZ = val;
      updateNote(data).then((response) => {
        if (response.returnStatus == "SUCCESS") {
        }
      });
    },
    zyChange(val, FYSQ_ZJ) {
      //修改摘要
      updateSummary(FYSQ_ZJ, val).then((response) => {
        if (response.returnStatus == "SUCCESS") {
        }
      });
    },
    submit() {
      //搜索
      this.tableData = [];
      this.multipleSelection = [];
      this.tableParameter.FYSQ_SFXMWJ = "";
      this.projectID.forEach((item) => {
        this.tableParameter.FYSQ_SFXMWJ += item + ",";
      });
      this.tableParameter.FYSQ_SFXMWJ = this.tableParameter.FYSQ_SFXMWJ.substring(
        0,
        this.tableParameter.FYSQ_SFXMWJ.length - 1
      );
      if (this.theWay == 1) {
        this.theWayTable = 1;
        this.querResourceRequest(); //查询年月未收清费用
      } else {
        this.theWayTable = 2;
        this.isIndeterminate = false;
        this.queryUncollectedFeesGroupByItems(); //查询收费项目未收清费用
      }
      localStorage.setItem("theWayTable", this.theWayTable); //保存选择的类型 1按年月  2按收费项目
    },
    checkbox(row) {
      if (row.row.isChildren) {
        return "mycell";
      }
    },
    load(tree, resolve) {
      //懒加载
      setTimeout(() => {
        queryChildrenUncollectedFees(tree.FYSQ_FKGXWJ, tree.FYSQ_SFXMWJ).then(
          (response) => {
            var datas = response.data;
            var isParentIndex = 0;
            datas.forEach((item) => {
              if (item.FYSQ_XPKPZT == 1) {
                //申请中的数据允许修改
                ++isParentIndex;
                this.$set(item, "canSelect", true); //设置申请中的数据可勾选
                this.$set(item, "isCheck", tree.isCheck); //如果父级选中 默认子级也选中
                this.$set(item, "pid", tree.FYSQ_ZJ); //在子级中添加与父级相同的ID
                this.$set(item, "isParent", false); ////用来记录是否是子级  用来隐藏或显示挂起的checkbox
                this.childrenArr.push(item);
              } else {
                this.$set(item, "canSelect", false); //设置申请中的数据不可勾选
              }
            });
            this.childrenArr.forEach((item) => {
              if (tree.FYSQ_ZJ == item.pid) {
                this.$set(item, "len", isParentIndex); //保存子级中可勾选数据的长度
                if (tree.isCheck) {
                  this.multipleSelection.push(item);
                  this.$set(item, "isAdd", isParentIndex); //用来记录每个子级选中值 用来设定如果子级全部选中则对应的父级也选中
                } else {
                  this.$set(item, "isAdd", 0);
                }
              }
            });

            resolve(datas);
          }
        );
      }, 500);
    },
    cChange(val) {
      //checkbox选择事件
      var ParentDataArray = [];
      var ChildDataArray = [];
      if (!val.isChildren) {
        //父级checkbox选择事件
        var isRecord = 0;
        this.tableData.forEach((item) => {
          if (item.id == val.id) {
            this.$set(item, "isCheck", val.isCheck);
          }
        });
        this.childrenArr.forEach((item) => {
          //循环子级数据
          if (item.pid == val.FYSQ_ZJ && item.FYSQ_XPKPZT == 1) {
            //判断选中的主键如果等于子级主键
            this.$set(item, "isCheck", val.isCheck); //选中不选中设置
            if (item.isCheck) {
              //选中/不选中  改变对应子级的isAdd
              isRecord++;
            } else {
              if (isRecord > 0) {
                isRecord--;
              }
            }
            this.$set(item, "isAdd", isRecord);
          }
        });
        val.isdeter = false;
      } else {
        //子级checkbox选择事件
        if (val.isCheck) {
          //如果是选中状态
          this.childrenArr.forEach((item2) => {
            //循环子级数据
            if (item2.id == val.id) {
              //判断选中的pid与子级的是否相等
              this.$set(item2, "isCheck", val.isCheck); //选中不选中设置
              if (val.isCheck) {
                item2.isAdd++;
              }
              this.tableData.forEach((item) => {
                if (item.FYSQ_ZJ == val.pid) {
                  if (item2.isAdd == item2.len) {
                    //如果isAdd等于对应子级的len  则父级checkbox选中
                    item.isCheck = true; //如果子的checkbox都是选中状态 则父级的checkbox为选中状态
                    item.isdeter = false; //判断子级选中状态的时候  如果子级的数据都是选中状态 则设置子级的isIndeterminate为false 否则为true
                  } else {
                    item.isdeter = true;
                  }
                }
              });
            }
          });
        } else {
          //如果是取消选中状态
          this.childrenArr.forEach((item2) => {
            if (item2.id == val.id) {
              if (item2.isAdd > 0) {
                item2.isAdd--;
              }
              this.tableData.forEach((item, index) => {
                if (item.FYSQ_ZJ == val.pid) {
                  // this.$set(item,"isCheck",false)
                  if (item2.isAdd <= 0) {
                    //判断取消选中的时候子级中如果有选中的  则设置父级isIndeterminate为true
                    // this.$set(item,"isCheck",false)
                  } else {
                    // item.isdeter = true;
                  }
                }
              });
            }
          });
        }
      }
      console.log(this.tableData);
      // this.tableData=[...this.tableData]
      /**全选*/
      var index = 0; //全选状态累计
      this.tableData.forEach((item) => {
        if (item.isCheck) {
          index++;
          ParentDataArray.push(item);
          // this.isIndeterminate = true;
        }
      });
      /**每次选择  都获取选中的数据 */
      if (this.childrenArr.length > 0) {
        //如果子级有数据  判断是否有选中的  如果有全选Checkbox状态isIndeterminate为true  否则为false
        this.childrenArr.forEach((item) => {
          if (item.isCheck) {
            ChildDataArray.push(item);
            // this.isIndeterminate = true;
          }
        });
      }
      if (index == this.tableDataLen) {
        //如果index等于Data长度 则全选选中
        // this.isIndeterminate = false;
        this.allValue = true;
      } else {
        this.allValue = false;
      }
      this.multipleSelection = [];
      console.log(ParentDataArray.length);
      console.log(ChildDataArray.length);
      this.multipleSelection = [...ParentDataArray, ...ChildDataArray];
      console.log(this.multipleSelection);
    },
    checkAll(val) {
      //全选
      this.multipleSelection = [];
      this.tableData.forEach((item, index) => {
        this.$set(item, "isCheck", val);
        this.$set(this.tableData, index, item); //改变整个表格
        console.log(item);
        if (item.isCheck) {
          this.multipleSelection.push(item);
        }
      });
      this.childrenArr.forEach((item) => {
        if (item.canSelect) {
          item.isCheck = val;
          if (item.isCheck) {
            this.$set(item, "isAdd", item.len); //用来记录如果子级全部展开再全选的话   子级选中isAdd不对应问题
            this.multipleSelection.push(item);
          }
        }
      });
      // this.tableData = [...this.tableData]//全选改变整个表格
    },
    HangCheck(FYSQ_ZJ, val) {
      //挂起
      hangUncollectedFeesApi(FYSQ_ZJ, val).then((response) => {});
    },
    cellcb(row) {
      //隐藏小计checkbox
      if (!row.row.FYSQ_ZJ) {
        return "minCheck";
      }
    },
    IsSelectionban(row) {
      //禁用小计checkbox
      //多选按钮是否可选
      if (
        !row.FYSQ_ZJ ||
        (row.FYSQ_XPKPZT != 1 && row.FYSQ_XPKPZT != undefined)
      ) {
        //FYSQ_XPKPZT  先票开票状态1 未申请 2 已申请
        return false;
      } else {
        return true;
      }
    },
    getSummaries({ columns, data }) {
      //合计
      const means = []; // 合计
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push("合计");
        } else if (
          column.label != "应收金额（含税）" &&
          column.label != "已收金额" &&
          column.label != "欠收金额" &&
          column.label != "应收不含税"
        ) {
          means[columnIndex] = "";
        } else {
          const values = data.map((item) => Number(item[column.property]));
          // 合计
          if (!values.every((value) => isNaN(value))) {
            means[columnIndex] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                const realVal = Number(prev) + Number(curr);
                return parseFloat(realVal).toFixed(2);
              } else {
                return prev;
              }
            }, 0);
          } else {
            means[columnIndex] = "";
          }
        }
      });
      // 返回一个二维数组的表尾合计(不要平均值，你就不要在数组中添加)
      return [means];
    },
    fieldRefrefsh(obj) {
      //栏位配置回调刷新
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
  computed: {
    CheckowMoney() {
      var toallMoney = 0;
      var _this = this;
      if (this.theWay == 2) {
        var arr = [];
        if (this.childrenArr.length > 0) {
          this.childrenArr.forEach((item) => {
            if (item.isCheck) {
              arr.push(item.pid);
            }
          });
        }
        arr.forEach((item) => {
          _this.multipleSelection.forEach(function (item2) {
            //按项目查询  计算选定欠收金额
            if (item == item2.id && item2.isParent) {
              //判断如果是父级且有与子级相等的id   责删除掉这条数据不然计算会双倍叠加
              _this.multipleSelection.splice(
                _this.multipleSelection.indexOf(item2),
                1
              );
            }
          });
        });
      }
      this.multipleSelection.forEach(function (item) {
        toallMoney += Number(item.FYSQ_QSJE);
      });
      return toallMoney.toFixed(2);
    },
  },
  watch: {
    multipleSelection() {
      // console.log(this.multipleSelection)
      //选中表格复选框启用'收清选中按钮,隐藏标题提示'
      if (this.multipleSelection.length > 0) {
        this.ReceiptedSelTitle = "";
        this.ReceiptedSeldisabledBtn = false;
        this.PreferTitle = "";
        if (this.multipleSelection.length == 1) {
          this.tableRow = this.multipleSelection[0];
          this.ChargedisableBtn = false;
          this.chageInfoTitle = "";
        } else {
          this.ChargedisableBtn = true;
          this.chageInfoTitle = "只能查看单条选中列表信息";
        }
      } else {
        this.ChargedisableBtn = true;
        this.ReceiptedSelTitle = "选择表格对应的数据"; //收清选中
        this.ReceiptedSeldisabledBtn = true;
        this.PreferTitle = "选择表格对应的数据"; //优惠减免
        this.childrenArr.forEach((item) => {
          if (item.isCheck) {
            // this.isIndeterminate = true;
          } else {
            // this.isIndeterminate = false;
          }
        });
      }
    },
    selectType() {
      if (this.selectType != 1) {
        //按资源才可以费用调整
        this.CostdisableBtn = true;
        return;
      }
    },
    tableParameter() {
      if (Object.keys(this.tableParameter) != 0) {
        if (this.tableParameter.FKGX_ZT) {
          if (this.tableParameter.FKGX_ZT == 2) {
            //历史状态不可以费用调整
            this.CostdisableBtn = true;
          } else {
            if (this.selectType == 1) {
              this.CostdisableBtn = false;
            } else {
              this.CostdisableBtn = true;
            }
          }
        } else {
          this.CostdisableBtn = true;
        }
      } else {
        this.CostdisableBtn = true;
      }
    },
  },
};
</script>
<style lang="scss">
.NotReceipted {
  margin: 20px 20px 30px !important;
  .el-textarea__inner {
    min-height: 25px !important;
    height: 28px !important;
    padding: 0 15px !important;
    resize: none !important;
  }
  .Resource_title {
    line-height: 20px !important;
    margin-bottom: 15px !important;
    span {
      margin-right: 15px !important;
    }
    .checkQkMoney {
      color: #ff0000;
    }
  }
  .select {
    .projectSelect .el-input {
      width: 220px !important;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 120px !important;
    }
    .el-select__tags {
      width: auto !important;
      max-width: inherit !important;
      .el-tag.el-tag--info:nth-child(1) span {
        display: inline-block !important;
        width: 100px !important;
        vertical-align: middle !important;
        white-space: nowrap !important; /* 规定文本是否折行 */
        overflow: hidden !important; /* 规定超出内容宽度的元素隐藏 */
        text-overflow: ellipsis !important;
      }
    }
  }
  .button-text {
    color: #2e8ad7;
    text-decoration: underline;
    cursor: pointer;
    display: inline-block;
    height: 35px;
    padding: 0 5px;
    line-height: 35px;
  }
  .mycell .el-checkbox__input {
    display: none !important;
  }
  .cell {
    .el-input__inner {
      height: 28px !important;
    }
  }
  .custom_field {
    float: right;
  }
  .minCheck {
    background: rgba(33, 40, 48, 0.2) !important;
    .el-checkbox__input {
      display: none;
    }
    .el-textarea {
      display: none;
    }
  }
}

.tree--btn-wrapper-show {
  transform: rotate(90deg);
} //表格子级箭头向下
</style>
