<template>
  <div class="el-body ChargeEntry" ref="ChargeEntryRef">
    <div class="el-title">
      <div v-if="ztreeDataSourceList.length > 0">
        <!--树形组件-->
        <vue-ztree
          :list.sync="ztreeDataSourceList"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          @getTreeData="getTreeData"
        ></vue-ztree>
      </div>
    </div>
    <div class="el-content">
      <div class="standardRight">
        <!-- 搜索框begin -->
        <div class="select">
          <el-form label-width="115px">
            <el-row :gutter="30">
              <el-col :span="6" style="width: 270px">
                <el-form-item label="类型筛选:" label-width="70px">
                  <el-select
                    v-model="tableParameter.selectCategory"
                    @change="typeChange"
                  >
                    <el-option
                      label="走表费用(按表读数)"
                      :key="1"
                      value="按表读数"
                    ></el-option>
                    <el-option
                      label="走表费用(按输入量)"
                      :key="2"
                      value="按输入量"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6" style="width: 250px">
                <el-form-item label="收费项目:" label-width="70px">
                  <el-select
                    v-model="tableParameter.SFXM_ZJ"
                    @change="itemChange"
                    clearable
                  >
                    <el-option
                      v-for="item in itemData"
                      :key="item.SFXM_ZJ"
                      :label="item.SFXM_SFXMMC"
                      :value="item.SFXM_ZJ"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6" style="width: 250px">
                <el-form-item label="资源代码:" label-width="70px">
                  <el-input v-model="tableParameter.ZBJS_FJID"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" style="width: 250px">
                <el-form-item label-width="0px">
                  <el-button
                    @click="searchContent"
                    type="success"
                    v-has="'WalthroughChargeEntryQuery_has'"
                    >查询
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 搜索框end -->

        <!-- 按钮begin -->
        <div class="buttonBox">
          <el-button
            type="primary"
            @click="updateWalkEntry"
            :disabled="disabledupdate"
            :title="updateTitle()"
            v-has="'WalthroughChargeEntryUpdate_has'"
            >修改</el-button
          >
          <el-button
            type="primary"
            @click="updateBatch"
            :disabled="disablebath"
            :title="bathDateTitle()"
            v-has="'WalthroughChargeEntryBath_has'"
            >批量日期</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-download"
            @click="downloadModel"
            v-has="'WalthroughDown_has'"
            >数据导出
          </el-button>
          <el-button
            type="primary"
            @click="filedConfiClick"
            class="custom_field"
            icon="el-icon-setting"
            v-has="'WalthroughChargeEntryConfig_has'"
            >自定义栏位
          </el-button>
          <span class="importa_wrap">
            <el-upload
              :name="filedata"
              accept=".xls"
              :action="UploadUrl()"
              :before-upload="beforeFileUpload"
              :show-file-list="false"
            >
              <el-button
                type="primary"
                icon="el-icon-upload"
                size="mini"
                @click="uploadModel"
                :disabled="disableUpload"
                v-has="'WalthroughUpload_has'"
                >数据导入</el-button
              >
            </el-upload>
          </span>
          <span class="importa_wrap lrrd_wrap">
            <el-form label-width="100px">
              <el-form-item label="录入日期：" label-width="70px">
                <el-date-picker
                  v-model="yearAndMonth"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="lrrqChange"
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
          </span>
        </div>
        <!-- 按钮end -->
      </div>
      <div class="table_wrap">
        <!--按表读数列表 end-->
        <u-table
          :data="tableData"
          border
          @row-click="rowclick"
          @cell-click="rowclick"
          :max-height="tableHeight"
          :summary-method="getSummaries"
          :show-summary="true"
          use-virtual
          :row-height="35"
          :data-changes-scroll-top="false"
          @table-body-scroll="bodyScroll"
          ref="table"
        >
          <u-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </u-table-column>
          <u-table-column
            label="序号"
            type="index"
            width="70"
            fixed
          ></u-table-column>
          <div v-for="(item, index) in checkData" :key="index">
            <div v-if="item.content == '本月读数'">
              <u-table-column
                :label="item.content"
                :width="item.width"
                :key="Math.random()"
                v-if="typeValue == 1"
              >
                <template slot-scope="scope">
                  <el-input
                    onkeyup="if(isNaN(value))execCommand('undo')"
                    v-model.trim="scope.row.ZBJS_BYDS"
                    @change="saveInputChange(scope.row, true)"
                    :disabled="scope.row.ZBJS_KSSK"
                    @keyup.native="show($event, scope.$index)"
                    :class="`byds_input_` + scope.$index"
                    @click.stop.native
                  >
                  </el-input>
                </template>
              </u-table-column>
            </div>
            <div v-else-if="item.content == '上月读数'">
              <u-table-column
                :label="item.content"
                :width="item.width"
                :key="Math.random()"
                v-if="typeValue == 1"
              >
                <template slot-scope="scope">
                  <el-input
                    onkeyup="if(isNaN(value))execCommand('undo')"
                    v-model.trim="scope.row.ZBJS_SYDS"
                    @change="saveInputChange(scope.row)"
                    :disabled="scope.row.ZBJS_KSSK"
                    @keyup.native="show($event, scope.$index)"
                    :class="`kssk_input_` + scope.$index"
                    @click.stop.native
                  >
                  </el-input>
                </template>
              </u-table-column>
            </div>
            <div v-else-if="item.content == '本月行度' && typeValue == 2">
              <u-table-column
                :label="item.content"
                :width="item.width"
                :key="Math.random()"
              >
                <template slot-scope="scope">
                  <el-input
                    onkeyup="if(isNaN(value))execCommand('undo')"
                    v-model.trim="scope.row.ZBJS_BYXD"
                    @change="saveInputChange(scope.row, true)"
                    :disabled="scope.row.ZBJS_KSSK"
                    @keyup.native="show($event, scope.$index)"
                    :class="`kssk_input_` + scope.$index"
                    @click.stop.native
                  >
                  </el-input>
                </template>
              </u-table-column>
            </div>
            <div v-else-if="item.content == '本次录入日期'">
              <u-table-column
                :label="item.content"
                :width="item.width"
                :key="Math.random()"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.ZBJS_LRRQ"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @change="saveInputChange(scope.row)"
                    :disabled="scope.row.ZBJS_KSSK"
                    :clearable="false"
                    @click.stop.native
                  >
                  </el-date-picker>
                </template>
              </u-table-column>
            </div>
            <div v-else-if="item.content == '上次录入日期'">
              <u-table-column
                :label="item.content"
                :width="item.width"
                :key="Math.random()"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.ZBJS_SCLRRQ"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @change="saveInputChange(scope.row)"
                    :disabled="scope.row.ZBJS_KSSK"
                    :clearable="false"
                    @click.stop.native
                  >
                  </el-date-picker>
                </template>
              </u-table-column>
            </div>
            <div v-else-if="item.content == '表倍率'">
              <u-table-column
                :label="item.content"
                :width="item.width"
                :key="Math.random()"
                v-if="typeValue === 1"
              >
                <template slot-scope="scope">
                  {{ scope.row.ZBJS_BBL }}
                </template>
              </u-table-column>
            </div>
            <div v-else-if="item.content == '收款中'">
              <u-table-column
                :label="item.content"
                :width="item.width"
                :key="Math.random()"
              >
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.ZBJS_KSSK"
                    disabled
                  ></el-checkbox>
                </template>
              </u-table-column>
            </div>
            <div v-else-if="item.content == '金额'">
              <u-table-column
                :label="item.content"
                :width="item.width"
                :key="Math.random()"
                v-if="typeValue === 1"
              >
                <template slot-scope="scope">
                  {{ formatMoney(scope.row.ZBJS_SFJE) }}
                </template>
              </u-table-column>
            </div>
            <div v-else>
              <u-table-column
                :prop="item.field"
                :label="item.content"
                :width="item.width"
                :key="Math.random()"
                show-overflow-tooltip
              >
              </u-table-column>
            </div>
          </div>
        </u-table>
      </div>
      <!-- 修改弹框 begin -->
      <WalkEntryDialog
        :showEntry.sync="showEntry"
        :getTreeObj="getTreeObj"
        ref="PopWalkChildren"
        @RefreshItem="RefreshList"
      ></WalkEntryDialog>
      <!-- 修改弹框 end -->
      <!-- 批量日期弹框 begin -->
      <bathDateDialog
        :showBath.sync="showBath"
        ref="PopBathChildren"
        @RefreshItem="RefreshList"
      ></bathDateDialog>
      <!-- 批量日期弹框 end -->
      <!-- 自定义栏位start -->
      <FieldConfig
        :showFieldConfig.sync="showFieldConfig"
        @RefreshItem="fieldRefrefsh"
        ref="fieldChildren"
      >
      </FieldConfig>
      <!-- 自定义栏位end  -->
    </div>
  </div>
</template>

<script>
import config from "@/utils/config";
import vueZtree from "../../../../components/Eltree/treeItem.vue";
import WalkEntryDialog from "./components/WalkEntryDialog"; //修改
import bathDateDialog from "./components/bathDateDialog"; //批量日期
import { UTable, UTableColumn } from "umy-ui";
import {
  getTree,
  queryChargeItem,
  queryWalkEntryList,
  transferTable,
  saveTableRead,
  saveForInputQuantity,
  downloadExcel,
  excelFileUpload,
  queryIsStartGathering,
} from "@/api/FeeManagement/WalkthroughEntry"; //数据录入js
import { queryDateType } from "@/api/FeeManagement/ParameterSettings";
import { Message } from "element-ui";
import { formatMoney, currDate } from "@/utils/global.js";
import fieldMinxin from "@/components/FieldConfig/field.js"; //自定义栏位 注入
export default {
  name: "ChargeEntry",
  mixins: [fieldMinxin], //注入
  data() {
    return {
      radio: "",
      disabledupdate: true, //修改
      disablebath: true, //批量
      disableDown: true, //默认下载模板不可点击
      disableUpload: false, //默认导入数据不可点击
      ztreeDataSourceList: [], //左边树数据
      multipleSelection: [], //按客户选中数据
      tableData: [], //列表数据
      itemData: [], //收费项目数据
      tableParameter: {
        ZBJS_FJID: null,
        FCDM_ZJ: null,
        ZBJS_GLQWJ: null,
        selectCategory: "按表读数",
        SFXM_ZJ: null,
        state: 1,
      },
      typeValue: 1, //1 按表读数  2 输入量
      getTreeObj: {},
      showEntry: false, //默认修改弹出隐藏
      showBath: false, //默认批量日期弹出隐藏
      tableRow: {},
      filedata: "filedata",
      disabledZBBZ: false, //默认转表标志可以修改
      newIndex: 0, //记录选中的input  下标
      currentClssName: "", //当前选中的class
      yearAndMonth: "", //收费所属年月
      tableHeight: 600, //明细表格高度
      code: "ChargeEntryDS", //默认模块栏位配置为按表读数
      showFieldConfig: false, //自定义栏位默认隐藏
      DSconfigData: [
        //表读数默认配置栏位
        { content: "资源代码", width: 150, field: "ZBJS_FJID" },
        { content: "客户名称", width: 150, field: "KHDA_KHMC" },
        { content: "上上月读数", width: 100, field: "ZBJS_SSYDS" },
        { content: "本月读数", width: 120, field: "ZBJS_BYDS" },
        { content: "上月读数", width: 120, field: "ZBJS_SYDS" },
        { content: "本月行度", width: 120, field: "ZBJS_BYXD" },
        { content: "本次录入日期", width: 150, field: "ZBJS_LRRQ" },
        { content: "上次录入日期", width: 150, field: "ZBJS_SCLRRQ" },
        { content: "表代码", width: 150, field: "ZBJS_BDM" },
        { content: "表名称", width: 200, field: "ZBJS_BMC" },
        { content: "表倍率", width: 80, field: "ZBJS_BBL" },
        { content: "收费项目名称", width: 200, field: "ZBJS_SFXMMC" },
        { content: "标准名称", width: 200, field: "ZBJS_ZBBZMC" },
        { content: "金额", width: 100, field: "ZBJS_SFJE" },
        { content: "录入人", width: 100, field: "ZBJS_XGR" },
        { content: "收款中", width: "", field: "ZBJS_KSSK" },
      ],
      SLconfigData: [
        //数量量默认配置栏位
        { content: "资源代码", width: 150, field: "ZBJS_FJID" },
        { content: "客户名称", width: 150, field: "KHDA_KHMC" },
        { content: "上上月读数", width: 100, field: "ZBJS_SSYDS" },
        { content: "本月行度", width: 120, field: "ZBJS_BYXD" },
        { content: "本次录入日期", width: 150, field: "ZBJS_LRRQ" },
        { content: "上次录入日期", width: 150, field: "ZBJS_SCLRRQ" },
        { content: "表代码", width: 150, field: "ZBJS_BDM" },
        { content: "表名称", width: 200, field: "ZBJS_BMC" },
        { content: "收费项目名称", width: 200, field: "ZBJS_SFXMMC" },
        { content: "标准名称", width: 200, field: "ZBJS_ZBBZMC" },
        { content: "录入人", width: 100, field: "ZBJS_XGR" },
        { content: "收款中", width: "", field: "ZBJS_KSSK" },
      ],
      configData: [],
    };
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        if (this.tableRow.ZBJS_KSSK) {
          this.disabledupdate = true;
          this.disabledZBBZ = true;
        } else {
          this.disabledupdate = false;
          this.disabledZBBZ = false;
        }
      } else {
        this.disabledupdate = true;
      }
    },
    typeValue() {
      //类型是按输入量时  隐藏金额字段并且设置最后一个字段铺满表格
      if (this.typeValue == 2) {
        this.checkData.forEach((item, index) => {
          if (item.content == "金额") {
            this.checkData.splice(this.checkData.indexOf(item), 1);
          }
        });
        this.checkData.forEach((item, index) => {
          if (index == this.checkData.length - 1) {
            item.width = "";
          }
        });
      }
    },
  },
  beforeUpdate() {
    this.$nextTick(() => {
      //在数据加载完，重新渲染表格
      this.$refs["table"].doLayout();
    });
  },
  methods: {
    formatMoney(data) {
      if (data) {
        return data >= 0 && data
          ? formatMoney(data, true)
          : `-${formatMoney(0 - data, true)}`;
      }
    },
    beforeFileUpload(file) {
      let index = 0;
      this.fileName = file.name;
      let fd = new FormData();
      fd.append("filedata", file);
      this.formD = fd;
      if (this.tableParameter.selectCategory == "按表读数") {
        index = 0;
      } else {
        index = 1;
      }
      excelFileUpload(this.formD, index).then((response) => {
        //文件上传
        var blobReader = new Response(response).json();
        blobReader.then((res) => {
          if (res.returnStatus == "SUCCESS") {
            Message({
              message: res.message,
              type: "success",
              duration: 2 * 1000,
            });
            this.getTabList();
          } else {
            Message({
              message: res.message,
              type: "warning",
              duration: 2 * 1000,
            });
          }
        });
      });
    },
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    getHeight() {
      //动态计算表格高度
      // 需要减去的高度
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 100;
      // 窗口变化重置表格高度
      window.onresize = () => {
        this.tableHeight =
          window.innerHeight - this.$refs.table.$el.offsetTop - 100;
      };
    },
    getRowTable() {
      this.configData = this.DSconfigData;
      this.getHeight();
      this.getTreeFun();
      this.getPayObject();
      this.getDateType();
      this.getFieldConfig(this.code); //栏位配置查询
    },
    // 获取左边树
    getTreeFun() {
      getTree().then((response) => {
        var data = response;
        if (data) {
          this.ztreeDataSourceList = data;
          if (this.ztreeDataSourceList.length > 0) {
            this.$nextTick(() => {
              this.$refs.dotree.setCheckTree(this.ztreeDataSourceList[0].id); //默认选中第一条
              this.tableParameter.DLMC = this.ztreeDataSourceList[0].data.FCDM_MC; //楼栋名称
              this.tableParameter.GLCMC = this.ztreeDataSourceList[0].data.FCDM_MC; //管理处名称
              this.tableParameter.GLQMC = this.ztreeDataSourceList[0].data.FCDM_MC; //管理区名称
              this.getTabList();
            });
          }
        }
      });
    },
    getTabList() {
      //查询列表数据
      queryWalkEntryList(this.tableParameter).then((response) => {
        this.tableData = response;
      });
    },
    //获取收费项目
    getPayObject() {
      queryChargeItem(1).then((response) => {
        this.itemData = response;
      });
    },
    // 点击 获取树节点数据
    getTreeData(val, node) {
      this.clearTab();
      this.tableParameter.ZBJS_GLQWJ = val.data.FCDM_GLQZJ; //管理区名称
      this.tableParameter.FCDM_ZJ = val.data.FCDM_ZJ; //大楼主键
      this.tableParameter.DLMC = val.data.FCDM_MC; //楼栋名称
      this.tableParameter.GLCMC = val.data.FCDM_MC; //管理处名称
      this.tableParameter.GLQMC = val.data.FCDM_MC; //管理区名称
      if (val.data.FCDM_LX == "大楼") {
        this.disablebath = false;
      } else {
        this.tableParameter.FCDM_ZJ = "";
        this.disablebath = true;
      }

      this.getTabList();
    },
    // 行点击
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    updateWalkEntry() {
      //修改
      this.showEntry = true;
      this.$refs.PopWalkChildren.getWalkData(this.tableRow, this.typeValue);
    },
    updateBatch() {
      this.radio = "";
      //批量日期
      this.showBath = true;
      this.$refs.PopBathChildren.getBathDate(
        this.tableParameter.FCDM_ZJ,
        this.typeValue,
        this.tableParameter.selectCategory,
        this.tableParameter.SFXM_ZJ,
        this.tableParameter.ZBJS_FJID
      );
    },
    saveInputChange(row, flag) {
      //本月读数、上月读数、录入日期修改
      row.ZBBZ_INT = 0; //默认转表标志为0
      if (flag) {
        this.$set(row, "ZBJS_LRRQ", this.yearAndMonth);
        row.ZBJS_LRRQ = this.yearAndMonth;
      }
      if (this.typeValue == 1) {
        //按表度数修改
        if (Number(row.ZBJS_BYDS) < Number(row.ZBJS_SYDS)) {
          this.$message({
            message: "本月读数小于上月读数,请重新输入",
            type: "warning",
          });
          return false;
        } else {
          var byhdNumber = (row.ZBJS_BYDS - row.ZBJS_SYDS) * row.ZBJS_BBL;
          saveTableRead(row).then((response) => {
            this.$set(row, "ZBJS_BYXD", byhdNumber);
          });
        }
      } else {
        //按输入量修改
        console.log(JSON.stringify(row));
        saveForInputQuantity(row).then((response) => {});
      }
    },
    getDateType() {
      //查询收费所属年月
      queryDateType().then((response) => {
        if (
          localStorage.getItem("lrrqDate") &&
          localStorage.getItem("lrrqDate") != "null"
        ) {
          this.yearAndMonth = localStorage.getItem("lrrqDate");
        } else {
          this.yearAndMonth = response.data.yearAndMonth.yearAndMonth + "-01";
        }
      });
    },
    typeChange(val) {
      //筛选类型切换
      if (val == "按表读数") {
        this.typeValue = 1;
        this.code = "ChargeEntryDS";
        this.configData = this.DSconfigData;
      } else {
        this.typeValue = 2;
        this.code = "ChargeEntrySL";
        this.configData = this.SLconfigData;
      }
      this.$nextTick(() => {
        this.clearTab();
        this.getTabList();
      });
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
    fieldRefrefsh(obj) {
      //栏位配置回调刷新
      this.checkData = [];
      this.saveConfig(obj, this.code); //保存栏位配置
    },
    lrrqChange(val) {
      //录入日期选择事件
      localStorage.setItem("lrrqDate", val);
      this.yearAndMonth = localStorage.getItem("lrrqDate");
    },
    searchContent() {
      //查询
      this.clearTab();
      this.getTabList();
    },
    itemChange(val) {
      //收费项目切换
      this.clearTab();
      this.tableParameter.SFXM_ZJ = val;
      this.getTabList();
    },
    getSummaries({ columns, data }) {
      //合计
      const means = []; // 合计
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push("合计");
        } else if (column.label !== "本月行度" && this.typeValue == 1) {
          means[columnIndex] = "";
        } else if (column.label !== "本月读数" && this.typeValue == 2) {
          means[columnIndex] = "";
        } else {
          const values = data.map((item) => Number(item[column.property]));
          // 合计
          if (!values.every((value) => isNaN(value))) {
            means[columnIndex] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                // const realVal = Number(prev) + Number(curr);
                // return parseFloat(realVal).toFixed(2)
                return this.$math.add(prev, curr);
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
    downloadModel() {
      queryIsStartGathering(this.tableParameter).then((response) => {
        //判断是否可以下载模板
        if (response.returnStatus == "SUCCESS") {
          if (response.data.type == 1) {
            this.downRequest();
          } else {
            this.$confirm(
              "当前导出数据存在开始收款数据,继续导出将会过滤开始收款数据!",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                this.downRequest();
              })
              .catch(() => {});
          }
        }
      });
    },
    downRequest() {
      //数据导出
      downloadExcel(this.tableParameter).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `走表数据.xls`;
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
    uploadModel() {
      //导入数据
    },
    // 刷新 表
    RefreshList(type, newRowObj) {
      if (type == 1) {
        this.tableParameter.selectCategory = "按表读数";
      } else {
        this.tableParameter.selectCategory = "按输入量";
      }
      this.getTabList();
      this.tableRow = newRowObj; //弹窗确定后更新表格选中值
    },
    // 修改标题提示
    updateTitle() {
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
    //批量日期提示
    bathDateTitle() {
      if (this.disablebath) {
        return "请选择楼栋";
      }
    },
    clearTab() {
      //重置数据
      this.radio = "";
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      this.tableRow = {};
    },
    bodyScroll(scrollTop) {
      //table 滚动事件
      let inputAll;
      if (this.currentClssName.indexOf("byds_input_") != -1) {
        inputAll = document.querySelectorAll(
          ".byds_input_" + this.newIndex + " input"
        );
      } else if (this.currentClssName.indexOf("kssk_input_") != -1) {
        inputAll = document.querySelectorAll(
          ".kssk_input_" + this.newIndex + " input"
        );
      } else if (this.currentClssName.indexOf("byxd_input_") != -1) {
        inputAll = document.querySelectorAll(
          ".byxd_input_" + this.newIndex + " input"
        );
      }
      this.$nextTick(() => {
        if (inputAll) {
          inputAll[0].focus();
        }
      });
    },
    //键盘触发事件
    show(ev, index) {
      this.currentClssName = ev.target.offsetParent.className; //当前选中的class
      //向上 =38
      if (ev.keyCode == 38) {
        if (index > 0) {
          index--;
        }
      }
      // //下 = 40
      if (ev.keyCode == 40) {
        index++;
      }
      let inputAll;

      if (this.currentClssName.indexOf("byds_input_") != -1) {
        //本月读数class
        inputAll = document.querySelectorAll(".byds_input_" + index + " input"); //根据Index 获取要选中input
      } else if (this.currentClssName.indexOf("kssk_input_") != -1) {
        //上月读数class
        inputAll = document.querySelectorAll(".kssk_input_" + index + " input");
      } else if (this.currentClssName.indexOf("byxd_input_") != -1) {
        //本月行度class
        inputAll = document.querySelectorAll(".byxd_input_" + index + " input");
      }
      inputAll[0].focus();
      this.newIndex = index; //记录最后一条数据的index  用于下拉滚动的时候从记录的那条数据开始获取焦点
    },
  },
  components: {
    vueZtree,
    WalkEntryDialog,
    bathDateDialog,
    UTable,
    UTableColumn,
  },
};
</script>

<style lang="scss">
.ChargeEntry {
  padding-left: 220px;
  background: none !important;
  .el-title {
    float: left;
    width: 220px;
    margin-left: -220px;
    overflow: auto;
    padding: 0 10px;
  }
  .el-content {
    float: right;
    width: 100%;
    height: 100%;
    padding: 30px;
    overflow: auto;
    border-left: 1px solid #f1f1f1;
  }
  .importa_wrap {
    display: inline-block;
  }
  .lrrd_wrap {
    margin-left: 20px;
  }
  .table_wrap {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 120px;
      .el-input__icon {
        line-height: 30px;
      }
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100% !important;
  }
  .custom_field {
    float: right;
    margin-top: 4px;
  }
}
</style>
