<template>
  <div class="TotalreadingEntry">
    <div class="el-content">
      <div class="standardRight">
        <!-- 搜索框begin -->
        <div class="select" ref="SelectRef">
          <el-form label-width="85px">
            <el-row :gutter="50">
              <el-col :span="6" style="width: 300px">
                <el-form-item label="收费项目：">
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

              <el-col :span="5" style="width: 300px">
                <el-form-item label="分摊表名称：">
                  <el-input v-model="tableParameter.FTZB_ZBMC"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="5" style="width: 300px">
                <el-form-item label="上级表名称：">
                  <el-input v-model="tableParameter.FTZB_SJBMC"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="width: 0px">
                <el-form-item label-width="0px">
                  <el-button
                    @click="searchContent"
                    type="success"
                    v-has="'WalthroughTotalreadingEntryQuery_has'"
                    >查询
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 搜索框end -->

        <!-- 按钮begin -->
        <div class="buttonBox" ref="ButtonRef">
          <el-button
            type="primary"
            @click="updateWalkEntry"
            :disabled="disabledupdate"
            :title="updateTitle()"
            v-has="'WalthroughTotalreadingEntryUpdate_has'"
            >修改</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-download"
            @click="downloadModel"
            v-has="'WalthroughTotalreadDown_has'"
            >数据导出
          </el-button>
          <el-button
            type="primary"
            @click="filedConfiClick"
            class="custom_field"
            icon="el-icon-setting"
            v-has="'WalthroughTotalreadConfig_has'"
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
                v-has="'WalthroughTotalreadUpload_has'"
                >数据导入
              </el-button>
            </el-upload>
          </span>
          <el-button
            type="primary"
            @click="updateBatch"
            v-has="'WalthroughTotalreadBatch_has'"
            style="margin-right: 10px"
            >批量日期</el-button
          >
          <el-button
            type="primary"
            @click="divideCount"
            v-has="'AlloDivideCount_has'"
            >分摊计算</el-button
          >
          <span class="importa_wrap lrrd_wrap">
            <el-form label-width="100px">
              <el-form-item label="录入日期：" label-width="70px">
                <el-date-picker
                  v-model="yearAndMonth"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="cbrqChange"
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
          </span>
        </div>
        <!-- 按钮end -->

        <!-- 常规类列表 begin -->
        <div class="table_wrap">
          <u-table
            :data="tableData"
            border
            @row-click="rowclick"
            :max-height="tableHeight"
            :summary-method="getSummaries"
            :show-summary="true"
            use-virtual
            :row-height="35"
            @table-body-scroll="bodyScroll"
            ref="table"
          >
            <u-table-column label="选择" width="50" fixed>
              <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio"
                  >&nbsp;</el-radio
                >
              </template>
            </u-table-column>
            <u-table-column
              label="序号"
              type="index"
              width="70"
              fixed
            ></u-table-column>
            <div v-for="(item, index) in checkData" :key="index">
              <div v-if="item.content == '上月读数'">
                <u-table-column
                  :label="item.content"
                  :width="item.width"
                  :key="Math.random()"
                >
                  <template slot-scope="scope">
                    <el-input
                      onkeyup="if(isNaN(value))execCommand('undo')"
                      v-model.trim="scope.row.FTZB_SYDS"
                      @change="saveInputChange(scope.row)"
                      @keyup.native="show($event, scope.$index)"
                      :class="`syds_input_` + scope.$index"
                      @click.stop.native
                    ></el-input>
                  </template>
                </u-table-column>
              </div>
              <div v-else-if="item.content == '本月读数'">
                <u-table-column
                  :label="item.content"
                  :width="item.width"
                  :key="Math.random()"
                >
                  <template slot-scope="scope">
                    <el-input
                      onkeyup="if(isNaN(value))execCommand('undo')"
                      v-model.trim="scope.row.FTZB_BYDS"
                      @change="saveInputChange(scope.row, true)"
                      @keyup.native="show($event, scope.$index)"
                      :class="`byds_input_` + scope.$index"
                      @click.stop.native
                    ></el-input>
                  </template>
                </u-table-column>
              </div>
              <div v-else-if="item.content == '追加用量'">
                <u-table-column
                  :label="item.content"
                  :width="item.width"
                  :key="Math.random()"
                >
                  <template slot-scope="scope">
                    <el-input
                      onkeyup="if(isNaN(value))execCommand('undo')"
                      v-model.trim="scope.row.FTZB_ZJYL"
                      @change="saveInputChange(scope.row)"
                      @keyup.native="show($event, scope.$index)"
                      :class="`zjyl_input_` + scope.$index"
                      @click.stop.native
                    ></el-input>
                  </template>
                </u-table-column>
              </div>
              <div v-else-if="item.content == '分摊金额'">
                <u-table-column
                  prop="FTZB_ZBJE"
                  :label="item.content"
                  :width="item.width"
                  :key="Math.random()"
                >
                  <template slot-scope="scope">
                    <el-input
                      onkeyup="if(isNaN(value))execCommand('undo')"
                      onafterpaste="if(isNaN(value))execCommand('undo')"
                      v-model.trim="scope.row.FTZB_ZBJE"
                      @change="saveInputChange(scope.row)"
                      @keyup.native="show($event, scope.$index)"
                      :class="`zbje_input_` + scope.$index"
                      @click.stop.native
                    ></el-input>
                  </template>
                </u-table-column>
              </div>
              <div v-else-if="item.content == '抄表日期'">
                <u-table-column
                  :label="item.content"
                  :width="item.width"
                  :key="Math.random()"
                >
                  <template slot-scope="scope">
                    <el-date-picker
                      v-model="scope.row.FTZB_CBRQ"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      @change="saveInputChange(scope.row)"
                      :clearable="false"
                    >
                    </el-date-picker>
                  </template>
                </u-table-column>
              </div>
              <div v-else-if="item.content == '上期抄表日期'">
                <u-table-column
                  :label="item.content"
                  :width="item.width"
                  :key="Math.random()"
                >
                  <template slot-scope="scope">
                    <el-date-picker
                      v-model="scope.row.FTZB_SCCBRQ"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      @change="saveInputChange(scope.row)"
                      :clearable="false"
                    >
                    </el-date-picker>
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
        <!-- 常规类列表 end -->
      </div>
      <!-- 修改弹框 begin -->
      <TotalReadEntryDialog
        :showEntry.sync="showEntry"
        ref="PopReadChildren"
        @RefreshItem="RefreshList"
      >
      </TotalReadEntryDialog>
      <!-- 修改弹框 end -->
      <!-- 批量日期弹框 begin -->
      <TotalBathDateDialog
        :showBath.sync="showBath"
        ref="PopBathChildren"
        @RefreshItem="RefreshList"
      >
      </TotalBathDateDialog>
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
import TotalReadEntryDialog from "./components/TotalReadEntryDialog"; //修改
import TotalBathDateDialog from "./components/TotalBathDateDialog"; //批量日期
import { UTable, UTableColumn } from "umy-ui";
import {
  queryChargeItem,
  querySplitInto,
  saveSplitInto,
  TotalReadtransferTable,
  downloadExcelReading,
  excelFileUploadSplitData,
} from "@/api/FeeManagement/WalkthroughEntry"; //数据录入js
import { allocationCalculation } from "@/api/FeeManagement/AllocationSettings";
import { queryDateType } from "@/api/FeeManagement/ParameterSettings";
import { Message } from "element-ui";
import { formatMoney, currDate } from "@/utils/global.js";
import fieldMinxin from "@/components/FieldConfig/field.js"; //自定义栏位 注入
export default {
  name: "TotalreadingEntry",
  mixins: [fieldMinxin], //注入
  data() {
    return {
      radio: "",
      disabledupdate: true, //修改
      tableData: [], //列表数据
      tableParameter: {
        FTZB_ZBMC: null,
        SFXM_ZJ: null,
        FTZB_SJBMC: null,
        state: 2,
      },
      tableRow: {},
      itemData: [], //收费项目数据
      showEntry: false, //默认修改弹出隐藏
      showBath: false, //批量日期弹窗默认隐藏
      filedata: "filedata",
      currentClssName: "", //当前选中的class
      yearAndMonth: "", //收费所属年月
      tableHeight: 600, //明细表格高度
      code: "TotalreadingEntry", //默认模块栏位配置为按表读数
      showFieldConfig: false, //自定义栏位默认隐藏
      configData: [
        //表读数默认配置栏位
        { content: "分摊表名称", width: 250, field: "FTZB_ZBMC" },
        { content: "上月读数", width: 120, field: "FTZB_SYDS" },
        { content: "本月读数", width: 120, field: "FTZB_BYDS" },
        { content: "追加用量", width: 120, field: "FTZB_ZJYL" },
        { content: "本月行度", width: 100, field: "FTZB_BYXD" },
        { content: "分摊金额", width: 100, field: "FTZB_ZBJE" },
        { content: "分摊用量", width: 100, field: "FTZB_FTYL" },
        { content: "上级表名称", width: 250, field: "FTZB_SJBMC" },
        { content: "抄表日期", width: 150, field: "FTZB_CBRQ" },
        { content: "上期抄表日期", width: 150, field: "FTZB_SCCBRQ" },
        { content: "录入人", width: 100, field: "FTZB_XGR" },
        { content: "收费项目名称", width: "", field: "FTZB_SFXMMC" },
      ],
    };
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        this.disabledupdate = false;
      } else {
        this.disabledupdate = true;
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
      if (data || data == 0) {
        return data >= 0 && data
          ? formatMoney(data, true)
          : `-${formatMoney(0 - data, true)}`;
      }
    },
    //批量日期
    updateBatch() {
      this.radio = "";
      //批量日期
      this.showBath = true;
      this.$refs.PopBathChildren.getBathDate(
        this.tableParameter.SFXM_ZJ,
        this.tableParameter.FTZB_ZBMC,
        this.tableParameter.FTZB_SJBMC
      );
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
      this.getHeight();
      this.getPayObject();
      this.getTabList();
      this.getDateType();
      this.getFieldConfig(this.code); //栏位配置查询
    },
    getTabList() {
      //查询列表数据
      querySplitInto(this.tableParameter).then((response) => {
        this.tableData = response;
      });
    },
    beforeFileUpload(file) {
      let index = 0;
      this.fileName = file.name;
      let fd = new FormData();
      fd.append("filedata", file);
      this.formD = fd;
      excelFileUploadSplitData(this.formD).then((response) => {
        //文件上传
        this.radio = ""; //选择后清空选中表格按钮
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
    saveInputChange(row, flag) {
      ////本月读数、上月读数、抄表日期修改
      row.ZBBZ_INT = 0;
      if (flag) {
        this.$set(row, "FTZB_CBRQ", this.yearAndMonth);
        row.FTZB_CBRQ = this.yearAndMonth;
      }
      if (Number(row.FTZB_BYDS) < Number(row.FTZB_SYDS)) {
        this.$message({
          message: "本月读数小于上月读数,请重新输入",
          type: "warning",
        });
        return false;
      } else {
        if (!row.FTZB_BBL) {
          row.FTZB_SYDS = 1;
        }
        row.FTZB_BYXD = (
          (row.FTZB_BYDS - row.FTZB_SYDS) * row.FTZB_BBL +
          Number(row.FTZB_ZJYL)
        ).toFixed(2);
        saveSplitInto(row).then((response) => {});
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
    cbrqChange(val) {
      //录入日期选择事件
      localStorage.setItem("lrrqDate", val);
      this.yearAndMonth = localStorage.getItem("lrrqDate");
    },
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    downloadModel() {
      //下载模板
      downloadExcelReading(this.tableParameter, this.tableData).then(
        (response) => {
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
        }
      );
    },
    //获取收费项目
    getPayObject() {
      queryChargeItem(2).then((response) => {
        this.itemData = response;
      });
    },
    // 行点击
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
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
    updateWalkEntry() {
      //修改
      this.showEntry = true;
      this.$refs.PopReadChildren.getData(this.tableRow);
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
    //分摊计算
    divideCount() {
      allocationCalculation().then((response) => {
        this.getTabList();
      });
    },
    getSummaries({ columns, data }) {
      //合计
      const means = []; // 合计
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push("合计");
        } else if (column.label !== "本月行度" && column.label !== "分摊金额") {
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
    // 刷新 表
    RefreshList() {
      this.clearTab();
      this.getTabList();
    },
    // 修改标题提示
    updateTitle() {
      //设置默认收款方式 修改 删除提示
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
    // 修改标题提示
    clearTab() {
      //重置数据
      this.radio = "";
      this.tableRow = {};
    },
    bodyScroll(scrollTop) {
      //table 滚动事件
      let inputAll;
      if (this.currentClssName.indexOf("syds_input_") != -1) {
        inputAll = document.querySelectorAll(
          ".syds_input_" + this.newIndex + " input"
        );
      } else if (this.currentClssName.indexOf("byds_input_") != -1) {
        inputAll = document.querySelectorAll(
          ".byds_input_" + this.newIndex + " input"
        );
      } else if (this.currentClssName.indexOf("zjyl_input_") != -1) {
        inputAll = document.querySelectorAll(
          ".zjyl_input_" + this.newIndex + " input"
        );
      } else if (this.currentClssName.indexOf("zbje_input_") != -1) {
        inputAll = document.querySelectorAll(
          ".zbje_input_" + this.newIndex + " input"
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
      if (this.currentClssName.indexOf("syds_input_") != -1) {
        //上月读数class
        inputAll = document.querySelectorAll(".syds_input_" + index + " input"); //根据Index 获取要选中input
      } else if (this.currentClssName.indexOf("byds_input_") != -1) {
        //本月读数class
        inputAll = document.querySelectorAll(".byds_input_" + index + " input");
      } else if (this.currentClssName.indexOf("zjyl_input_") != -1) {
        //追加用量class
        inputAll = document.querySelectorAll(".zjyl_input_" + index + " input");
      } else if (this.currentClssName.indexOf("zbje_input_") != -1) {
        inputAll = document.querySelectorAll(".zbje_input_" + index + " input");
      }
      inputAll[0].focus();
      this.newIndex = index; //记录最后一条数据的index  用于下拉滚动的时候从记录的那条数据开始获取焦点
    },
  },
  components: {
    TotalReadEntryDialog,
    TotalBathDateDialog,
    UTable,
    UTableColumn,
  },
};
</script>

<style lang="scss" scoped>
.TotalreadingEntry {
  float: right;
  width: 100%;
  padding: 30px 30px 0 30px;
  overflow: auto;
  .importa_wrap {
    display: inline-block;
  }
  .lrrd_wrap {
    margin-left: 20px;
  }
  .el-table {
    .el-table--scrollable-x .el-table__body-wrapper {
      overflow-x: visible;
    }
    .el-table__body-wrapper {
      overflow: visible;
    }

    .el-table__header-wrapper {
      overflow: visible;
    }

    .el-table__footer-wrapper {
      overflow: visible;
    }

    .el-table::after {
      position: relative !important;
    }
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
