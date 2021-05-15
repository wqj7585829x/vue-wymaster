<template>
  <div class="container AllocationEntry">
    <!-- 搜索框start -->
    <section class="searchBox">
      <el-form label-width="105px" :model="tableParameter">
        <el-row :gutter="30">
          <el-col :span="6" style="width: 300px">
            <el-form-item label="分摊级别：" prop="SFKM_SKFS">
              <el-select v-model="tableParameter.FTZB_FTJB" clearable>
                <el-option
                  v-for="item in LevelData"
                  :key="item.FTZB_FTJB"
                  :value="item.FTZB_FTJB"
                  :label="item.level"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 300px">
            <el-form-item label="表名称：">
              <el-input v-model="tableParameter.FTZB_ZBMC" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 300px">
            <el-form-item label="表代码：">
              <el-input v-model="tableParameter.FTZB_BDM" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 300px">
            <el-form-item label="分摊方式：">
              <el-select v-model="tableParameter.FTZB_FTFS" clearable>
                <el-option label="按表行度" value="按表行度"></el-option>
                <el-option label="按收费面积" value="按收费面积"></el-option>
                <el-option label="按资源" value="按资源"></el-option>
                <el-option label="不参与公摊" value="不参与公摊"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-form-item label-width="0px">
              <el-button
                type="success"
                @click="searchList"
                v-has="'AllocationEntyQuery_has'"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <!-- 搜索框end -->
    <!-- 按钮操作 -->
    <section class="buttonBox">
      <el-row>
        <el-col :span="24">
          <el-button
            type="primary"
            @click="Calculation"
            v-has="'AllocationEntyCalculation_has'"
            >分摊计算</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-download"
            @click="ExportModel"
            v-has="'AllocationEntyDown_has'"
            >数据导出</el-button
          >
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
                v-has="'AllocationEntyUpload_has'"
                >数据导入</el-button
              >
            </el-upload>
          </span>
        </el-col>
      </el-row>
    </section>
    <!-- 表格 -->
    <el-row class="sysCon_Mt">
      <u-table
        :data="tableData"
        ref="plTreeTable"
        fixed-columns-roll
        height="650"
        :treeConfig="{ children: 'children', expandAll: false }"
        use-virtual
        row-id="id"
        :data-changes-scroll-top="false"
        @table-body-scroll="bodyScroll"
        :row-height="35"
        border
      >
        <u-table-column
          :tree-node="true"
          prop="FTZB_ZBMC"
          label="表名称"
          width="300"
        ></u-table-column>
        <u-table-column prop="isVirtualTable" label="表类型" width="100">
          <template slot-scope="scope">
            {{
              scope.row.FTZB_FTJB == 0
                ? "一级"
                : scope.row.FTZB_FTJB == 1
                ? "二级"
                : scope.row.FTZB_FTJB == 2
                ? "三级"
                : scope.row.FTZB_FTJB == 3
                ? "四级"
                : ""
            }}
          </template>
        </u-table-column>
        <u-table-column prop="isVirtualTable" label="分摊级别" width="100">
          <template slot-scope="scope">
            {{
              scope.row.isVirtualTable == 0
                ? "实际表"
                : scope.row.isVirtualTable == 1
                ? "虚拟表"
                : ""
            }}
          </template>
        </u-table-column>
        <u-table-column
          prop="FTZB_BDM"
          label="表号"
          width="150"
        ></u-table-column>
        <u-table-column
          prop="FTZB_BBL"
          label="表倍率"
          width="80"
        ></u-table-column>
        <u-table-column
          prop="FTZB_FTLB"
          label="分摊类别"
          width="150"
        ></u-table-column>
        <u-table-column
          prop="FTZB_FTFS"
          label="分摊方式"
          width="150"
        ></u-table-column>
        <u-table-column
          prop="FTZB_JNDJ"
          label="单价"
          width="100"
        ></u-table-column>
        <u-table-column prop="FTZB_SYDS" label="上期录入" width="150">
          <template
            slot-scope="scope"
            v-if="scope.row.FTZB_FTLB == '直接用量分摊'"
          >
            <div v-if="scope.row.FTZB_FTLB == '直接用量分摊'">
              <el-input
                onkeyup="if(isNaN(value))execCommand('undo')"
                v-model.trim="scope.row.FTZB_SYDS"
                @change="saveInputChange(scope.row, 1)"
                @keyup.native="show($event, scope.$index)"
                :class="`syds_input_` + scope.$index"
                @click.stop.native
              >
              </el-input>
            </div>
            <div v-else>
              {{ scope.row.FTZB_SYDS }}
            </div>
          </template>
        </u-table-column>
        <u-table-column prop="FTZB_BYDS" label="本期录入" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.FTZB_FTLB == '直接用量分摊'">
              <el-input
                onkeyup="if(isNaN(value))execCommand('undo')"
                v-model.trim="scope.row.FTZB_BYDS"
                @change="saveInputChange(scope.row, 1)"
                @keyup.native="show($event, scope.$index)"
                :class="`byds_input_` + scope.$index"
                @click.stop.native
              >
              </el-input>
            </div>
            <div v-else>
              {{ scope.row.FTZB_BYDS }}
            </div>
          </template>
        </u-table-column>
        <u-table-column prop="FTZB_BYXD" label="本期用量" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.FTZB_ZBMC == '本期实际分摊量'">
              <el-input
                onkeyup="if(isNaN(value))execCommand('undo')"
                v-model.trim="scope.row.FTZB_BYXD"
                @change="saveInputChange(scope.row, 3)"
                @keyup.native="show($event, scope.$index)"
                :class="`byxd_input_` + scope.$index"
                @click.stop.native
              >
              </el-input>
            </div>
            <div v-else>
              {{ scope.row.FTZB_BYXD }}
            </div>
          </template>
        </u-table-column>
        <u-table-column prop="FTZB_ZBJE" label="本期金额" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.FTZB_FTLB == '直接金额分摊'">
              <el-input
                onkeyup="if(isNaN(value))execCommand('undo')"
                onafterpaste="if(isNaN(value))execCommand('undo')"
                v-model.trim="scope.row.FTZB_ZBJE"
                @change="saveInputChange(scope.row, 2)"
                @keyup.native="show($event, scope.$index)"
                :class="`zbje_input_` + scope.$index"
                @click.stop.native
              >
              </el-input>
            </div>
            <div v-else>
              {{ scope.row.FTZB_ZBJE }}
            </div>
          </template>
        </u-table-column>
        <u-table-column prop="FTZB_SCCBRQ" label="上期录入日期" width="150">
          <template slot-scope="scope">
            <div
              v-if="scope.row.isVirtualTable == 0 && scope.row.isUserMeter == 0"
            >
              <el-date-picker
                v-model="scope.row.FTZB_SCCBRQ"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="saveInputChange(scope.row, 4)"
                :disabled="scope.row.ZBJS_KSSK"
                :clearable="false"
                @click.stop.native
              >
              </el-date-picker>
            </div>
            <div v-else>
              {{ scope.row.FTZB_SCCBRQ }}
            </div>
          </template>
        </u-table-column>
        <u-table-column prop="FTZB_CBRQ" label="本期录入日期" width="150">
          <template slot-scope="scope">
            <div
              v-if="scope.row.isVirtualTable == 0 && scope.row.isUserMeter == 0"
            >
              <el-date-picker
                v-model="scope.row.FTZB_CBRQ"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="saveInputChange(scope.row, 4)"
                :disabled="scope.row.ZBJS_KSSK"
                :clearable="false"
                @click.stop.native
              >
              </el-date-picker>
            </div>
            <div v-else>
              {{ scope.row.FTZB_CBRQ }}
            </div>
          </template>
        </u-table-column>
        <u-table-column prop="FTZB_SFJE" label="缴交金额"></u-table-column>
      </u-table>
    </el-row>
    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > tableParameter.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="tableParameter.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->
  </div>
</template>

<script>
import {
  queryTotalTableLevelApi,
  getSharingTableTreeApi,
  editMeterReadingApi,
  editMoneyApi,
  editThisPeriodApportionmentApi,
  apportionmentCalculationApi,
  exportSharingTableApi,
  importSharingTableApi,
  editEntryDateApi,
} from "@/api/SharedHydropowerDesign/AllocationEntry";
import { UTable, UTableColumn } from "umy-ui";
import config from "@/utils/config";
import { Message } from "element-ui";
export default {
  name: "AllocationEntry",
  data() {
    return {
      tableData: [], //列表数据
      LevelData: [], //分摊级别
      filedata: "file",
      newIndex: 0, //记录选中的input  下标
      currentClssName: "", //当前选中的class
      tableParameter: {
        pageIndex: 0,
        pageSize: 50,
      }, //搜索条件
      currentPage: 1, //当前页
      returnTotal: 10, //总共条数
    };
  },
  components: {
    UTable,
    UTableColumn,
  },
  computed: {},
  mounted() {
    this.getLevel(); //分摊级别查询
    this.getTabList(); //列表查询
  },
  methods: {
    //分页函数
    handleCurrentChange(currentPage) {
      this.tableParameter.pageIndex = currentPage - 1;
      this.getTabList(); //获取表格数据
    },
    getTabList() {
      //查询列表数据
      getSharingTableTreeApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        console.log("this.returnTotal----" + this.returnTotal);
      });
    },
    getLevel() {
      //获取分摊级别
      queryTotalTableLevelApi().then((response) => {
        this.LevelData = response;
      });
    },
    saveInputChange(data, type) {
      if (type == 1) {
        //编辑本月读数和上月读数
        editMeterReadingApi(data).then((response) => {
          // var byhdNumber = (data.FTZB_BYDS - data.FTZB_SYDS) * data.FTZB_BBL;
          // this.$set(data, "FTZB_BYXD", byhdNumber);
          this.getTabList();
        });
      } else if (type == 2) {
        //编辑本期金额
        editMoneyApi(data).then((response) => {
          this.getTabList();
        });
      } else if (type == 3) {
        //编辑本期实际分摊量
        editThisPeriodApportionmentApi(data).then((response) => {
          this.getTabList();
        });
      } else {
        //编辑录入日期
        editEntryDateApi(data).then((response) => {
          this.getTabList();
        });
      }
    },
    ExportModel() {
      //数据导出
      exportSharingTableApi(this.tableParameter).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `分摊总表数据.xls`;
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
    beforeFileUpload(file) {
      //数据导入
      let index = 0;
      this.fileName = file.name;
      let fd = new FormData();
      fd.append("file", file);
      this.formD = fd;
      importSharingTableApi(this.formD).then((response) => {
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
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    Calculation() {
      //分摊计算
      apportionmentCalculationApi().then((response) => {
        this.getTabList();
      });
    },
    searchList() {
      //查询
      this.currentPage = 1;
      this.getTabList();
    },
    bodyScroll(scrollTop) {
      //table 滚动事件
      let inputAll;
      if (this.currentClssName.indexOf("byds_input_") != -1) {
        inputAll = document.querySelectorAll(
          ".byds_input_" + this.newIndex + " input"
        );
      } else if (this.currentClssName.indexOf("syds_input_") != -1) {
        inputAll = document.querySelectorAll(
          ".syds_input_" + this.newIndex + " input"
        );
      } else if (this.currentClssName.indexOf("byxd_input_") != -1) {
        inputAll = document.querySelectorAll(
          ".byxd_input_" + this.newIndex + " input"
        );
      } else if (this.currentClssName.indexOf("zbje_input_") != -1) {
        inputAll = document.querySelectorAll(
          ".zbje_input_" + this.newIndex + " input"
        );
      }
      this.$nextTick(() => {
        if (inputAll && Object.keys(inputAll).length != 0) {
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
        //本期录入
        inputAll = document.querySelectorAll(".byds_input_" + index + " input"); //根据Index 获取要选中input
      } else if (this.currentClssName.indexOf("syds_input_") != -1) {
        //上期录入
        inputAll = document.querySelectorAll(".syds_input_" + index + " input");
      } else if (this.currentClssName.indexOf("byxd_input_") != -1) {
        //本期用量
        inputAll = document.querySelectorAll(".byxd_input_" + index + " input");
      } else if (this.currentClssName.indexOf("zbje_input_") != -1) {
        //本期金额
        inputAll = document.querySelectorAll(".zbje_input_" + index + " input");
      }
      if (inputAll && Object.keys(inputAll).length != 0) {
        inputAll[0].focus();
      }
      this.newIndex = index; //记录最后一条数据的index  用于下拉滚动的时候从记录的那条数据开始获取焦点
    },
  },
};
</script>
<style lang="scss">
.AllocationEntry {
  .tree--btn-wrapper {
    position: absolute;
    left: 3px;
  }
  .importa_wrap {
    display: inline-block;
  }
  .tree--btn-wrapper.tree--btn-wrapper-show {
    transform: rotate(90deg);
  }
  .tree--btn-wrapper {
    transition: transform 0.2s ease-in-out;
    color: #333 !important;
    font-size: 16px;
    cursor: pointer;
  }
  .block {
    text-align: right;
    padding: 15px 0 5px 0;
  }
  .sysCon_Mt {
    .el-input__inner {
      text-align: center;
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: auto !important;
  }
}
</style>
