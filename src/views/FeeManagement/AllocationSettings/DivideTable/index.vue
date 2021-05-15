<template>
  <div class="el-body DivideTable">
    <div class="el-title">
      <div v-if="ztreeDataSourceList.length > 0">
        <vue-ztree
          :list.sync="ztreeDataSourceList"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          class="zree-w"
          @getTreeData="getTreeData"
        ></vue-ztree>
      </div>
    </div>
    <div class="el-content">
      <div class="tabletop">
        <!-- 按钮begin -->
        <div class="button buttonBox">
          <el-select
            v-model="searchDivideTable.SFXMMC"
            :placeholder="'收费项目'"
            @change="handleCurrentChange(1)"
            style="margin-right: 30px"
          >
            <el-option :label="'全部'" :value="''"> </el-option>
            <el-option
              v-for="item in ApportionedProjectNameData"
              :key="item.SFXM_ZJ"
              :label="item.SFXM_SFXMMC"
              :value="item.SFXM_SFXMMC"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="searchDivideTable.FTZBMC"
            :placeholder="'分摊总表'"
            @change="handleCurrentChange(1)"
            style="margin-right: 30px"
            filterable
          >
            <el-option :label="'全部'" :value="''"> </el-option>
            <el-option
              v-for="item in TotalTableNameAndZJData"
              :key="item.FTZB_ZJ"
              :label="item.FTZB_ZBMC"
              :value="item.FTZB_ZBMC"
            >
            </el-option>
          </el-select>
          <el-button
            type="primary"
            @click="downloadData"
            :disabled="downloadtype"
            >导出excel</el-button
          >
        </div>
        <!-- 按钮end -->

        <!-- 客户详情begin -->
        <div class="customedetail">
          <el-table
            ref="singleTable"
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column prop="ZBFT_KSSK" label="开始收款" width="120">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.ZBFT_KSSK"
                  :disabled="true"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="ZBFT_KHMC" label="客户名称" width="150">
            </el-table-column>
            <el-table-column prop="ZBFT_FJID" label="资源代码" width="150">
            </el-table-column>
            <el-table-column prop="FJDA_FJMC" label="资源名称" width="150">
            </el-table-column>
            <el-table-column prop="ZBFT_FTYL" label="分摊用量" width="120">
            </el-table-column>
            <el-table-column prop="ZBFT_FTJE" label="分摊金额" width="120">
            </el-table-column>
            <el-table-column prop="ZBFT_FTFS" label="分摊方式" width="120">
            </el-table-column>
            <el-table-column
              prop="ZBFT_SJBMC"
              label="上级分摊表名称"
              width="300"
            >
            </el-table-column>
            <el-table-column prop="ZBFT_FTXS" label="分摊系数" width="120">
            </el-table-column>
            <el-table-column prop="ZBFT_FTBL" label="分摊比例" width="80">
            </el-table-column>
            <el-table-column prop="ZBFT_BMC" label="表名称" width="180">
            </el-table-column>
            <el-table-column
              prop="ZBFT_SFXMMC"
              label="收费项目名称"
              width="180"
            >
            </el-table-column>
          </el-table>
          <!-- 分页begin -->
          <div class="block" v-if="returnTotal > searchDivideTable.pageSize">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="searchDivideTable.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="returnTotal"
            >
            </el-pagination>
          </div>
          <!-- 分页end -->
        </div>
        <!-- 客户详情end -->
      </div>
    </div>
  </div>
</template>
<script>
import vueZtree from "../../../../components/Eltree/treeItem.vue";
import {
  getTree,
  queryTable,
  allocationCalculation,
  queryApportionedProjectName,
  queryTotalTableNameAndZJ,
  reportTablePage,
} from "@/api/FeeManagement/AllocationSettings";
import { defer } from "q";
export default {
  name: "DivideTable",
  data() {
    return {
      ztreeDataSourceList: [], //资源树
      searchDivideTable: {
        FCDM_ZJ: "",
        FCDM_LX: "",
        pageIndex: 0,
        pageSize: 10,
      }, //客户档案列表搜索条件
      tableData: [], //列表参数
      currentPage: 1, //当前页
      returnTotal: 10, //总共条数
      ApportionedProjectNameData: [],
      TotalTableNameAndZJData: [],
      downloadtype: true,
    };
  },
  mounted() {
    this.getTreeFun();
  },
  methods: {
    getRowTable() {
      this.ApportionedProjectName();
      this.TotalTableNameAndZJ();
    },
    //分页函数
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.searchDivideTable.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
    },
    getTreeFun() {
      //获取资源树
      var _this = this;
      getTree().then((response) => {
        var data = response;
        if (data) {
          _this.ztreeDataSourceList = data;
        }
      });
    },
    getTreeData(val) {
      this.tableData = [];
      if (val.data.FCDM_LX == "大楼" || val.data.FCDM_LX == "房间") {
        this.searchDivideTable.FCDM_ZJ = val.data.FCDM_ZJ;
        this.searchDivideTable.FCDM_LX = val.data.FCDM_LX;
        this.getTableData();
        this.downloadtype = false;
      } else {
        this.searchDivideTable.FCDM_ZJ = "";
        this.searchDivideTable.FCDM_LX = "";
        this.downloadtype = true;
      }
      //资源树点击事件
    },
    // 表数据(业主，租户)
    getTableData() {
      queryTable(this.searchDivideTable).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    //总表设置分摊项目、系数项目名称下拉列表查询
    ApportionedProjectName() {
      queryApportionedProjectName().then((response) => {
        var data = response;
        if (data) {
          this.ApportionedProjectNameData = data;
        }
      });
    },
    //关系设定总表查询下拉框
    TotalTableNameAndZJ() {
      queryTotalTableNameAndZJ().then((response) => {
        var data = response;
        if (data) {
          this.TotalTableNameAndZJData = data;
        }
      });
    },
    //刷新表数据
    RefreshList(newobj) {
      this.tableRow = newobj;
      this.getTableData();
    },
    downloadData() {
      reportTablePage(this.searchDivideTable).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `走表分摊.xls`;
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
  },
  components: {
    vueZtree,
  },
};
</script>
<style lang="scss" scoped>
.el-body {
  height: 100%;
  width: 100%;
  overflow: inherit;
  padding-left: 220px;
  background: #ffffff;
  border-radius: 5px;
  .el-title {
    height: 100%;
    float: left;
    width: 220px;
    margin-left: -220px;
    padding: 0 17px;
    overflow: auto;
    border-right: 1px solid #f1f1f1;
  }
  .el-content {
    float: right;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 25px 30px 0 30px;
  }
}

.tabletop {
  padding: 0px 30px 0 30px;
}

.val {
  width: 170px;
  height: 35px;
}

.select {
  width: 100%;
}

.customedetail {
  width: 100%;
  overflow: auto;
}

.customedetail2 {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}

.tablebottom {
  border-top: 4px solid #eff0f0;
  padding: 16px 30px 0 30px;
}

.typechange {
  width: 106px;
  height: 35px;
  background: #ffffff;
  color: #2e8ad7;
}
.typecheck {
  background: #fff;
  color: #3a8ee6;
  border-color: #3a8ee6;
  border-radius: 0 !important;
  width: 102px;
}

.tablebody {
  padding: 0 30px;
}

.totalmoney {
  padding: 30px 30px 10px 30px;
  font-size: 14px;
  color: #666;
  text-align: left;
}

.table .el-table__row {
  height: 52px;
}

.table .el-table .current-row {
  background: #f3f7ff;
}

.table .cell {
  text-align: center;
}

.table .is-leaf {
  height: 52px;
  background: #eff0f0 !important;
}

.tree .el-scrollbar__wrap {
  margin-right: -10px !important;
}

.select .el-select {
  width: 100%;
}

.el-form-margin-bottom {
  margin-bottom: 20px;
}

.el-table .cell {
  text-decoration: underline;
}

.table-title {
  padding: 16px 0 10px 0;
  font-size: 18px;
  color: #666;
  text-align: center;
}
</style>

<style>
.customedetail .el-table__empty-text {
  left: 548px !important;
}

.DivideTable .el-input {
  margin-bottom: 15px;
}
</style>
