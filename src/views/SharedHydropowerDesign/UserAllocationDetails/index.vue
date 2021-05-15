<template>
  <div class="el-body UserAllocationDetails">
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
            v-model="tableParameter.ZBFT_SFXMWJ"
            :placeholder="'收费项目'"
            @change="ChangeTableData()"
            style="margin-right: 30px"
          >
            <el-option :label="'全部'" :value="''"> </el-option>
            <el-option
              v-for="item in ApportionedProjectNameData"
              :key="item.SFXM_ZJ"
              :label="item.SFXM_SFXMMC"
              :value="item.SFXM_ZJ"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="tableParameter.ZBFT_SJBZJ"
            :placeholder="'分摊总表'"
            @change="ChangeTableData()"
            style="margin-right: 30px"
            filterable
          >
            <el-option :label="'全部'" :value="''"> </el-option>
            <el-option
              v-for="item in TotalTableNameAndZJData"
              :key="item.FTZB_ZJ"
              :label="item.FTZB_ZBMC"
              :value="item.FTZB_ZJ"
            >
            </el-option>
          </el-select>
          <el-button
            type="primary"
            @click="downloadData"
            :disabled="downloadtype"
            v-has="'UserAllocationDetailsDown_has'"
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
            <el-table-column prop="KHDA_KHMC" label="客户名称" width="150">
            </el-table-column>
            <el-table-column prop="FJDA_FJID" label="资源代码" width="150">
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
            <el-table-column prop="ZBFT_BMC" label="表名称"> </el-table-column>
            <!-- <el-table-column prop="ZBFT_SFXMMC" label="收费项目名称" width="180">
            </el-table-column> -->
          </el-table>
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
        <!-- 客户详情end -->
      </div>
    </div>
  </div>
</template>
<script>
import vueZtree from "../../../components/Eltree/treeItem.vue";
import {
  getTree,
  queryApportionmentDetailsApi,
  queryApportionedProjectNameApi,
  queryTotalTableNameAndZJApi,
  reportTablePageApi,
} from "@/api/SharedHydropowerDesign/UserAllocationDetails";
export default {
  name: "UserAllocationDetails",
  data() {
    return {
      ztreeDataSourceList: [], //资源树
      tableParameter: {
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
    this.getTreeFun(); //树查询
    this.ApportionedProjectName(); //收费项目查询
    this.TotalTableNameAndZJ(); //分摊总表查询
  },
  methods: {
    //分页函数
    handleCurrentChange(currentPage) {
      this.tableParameter.pageIndex = currentPage - 1;
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
        this.tableParameter.FCDM_ZJ = val.data.FCDM_ZJ;
        this.tableParameter.DLZJ = val.data.DLZJ;
        this.tableParameter.FCDM_LX = val.data.FCDM_LX;
        this.getTableData();
        this.downloadtype = false;
      } else {
        this.tableParameter.FCDM_ZJ = "";
        this.tableParameter.FCDM_LX = "";
        this.downloadtype = true;
      }
      //资源树点击事件
    },
    // 表数据(业主，租户)
    getTableData() {
      queryApportionmentDetailsApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    ChangeTableData() {
      this.currentPage = 1;
      this.getTableData();
    },
    //总表设置分摊项目、系数项目名称下拉列表查询
    ApportionedProjectName() {
      queryApportionedProjectNameApi().then((response) => {
        var data = response;
        if (data) {
          this.ApportionedProjectNameData = data;
        }
      });
    },
    //关系设定总表查询下拉框
    TotalTableNameAndZJ() {
      queryTotalTableNameAndZJApi().then((response) => {
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
      reportTablePageApi(this.tableParameter).then((response) => {
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
<style lang="scss">
.UserAllocationDetails {
  .el-content {
    padding: 20px 30px 0 30px;
  }
  .block {
    text-align: right;
    padding: 15px 0 5px 0;
  }
  .el-input__icon {
    line-height: 30px;
  }
}
</style>
