<template>
  <div class="el-body PrepayUse">
    <div class="el-title">
      <div v-if="ztreeDataSourceList.length > 0">
        <!--树形组件-->
        <vue-ztree
          :list.sync="ztreeDataSourceList"
          :showInput="true"
          ref="dotree"
          @getTreeData="getTreeData"
        >
        </vue-ztree>
      </div>
    </div>
    <div class="el-content">
      <ul class="resrouce_wrap">
        <li>
          <p class="title">当前资源</p>
          <p class="content_value">{{ resourceName }}</p>
        </li>
        <span class="resource_line"></span>
        <li>
          <p class="title">合计使用金额</p>
          <p class="content_value"><span>￥</span>{{ totalYE }}</p>
        </li>
        <span class="resource_line"></span>
        <li>
          <p class="title">合计预交金额</p>
          <p class="content_value"><span>￥</span>{{ totalJE }}</p>
        </li>
      </ul>
      <u-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="600"
        class="tableContent"
      >
        <u-table-column
          prop="YJSY_SFYX"
          label="是否有效"
          width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.YJSY_SFYX == 0 ? "无效" : "有效" }}
          </template>
        </u-table-column>
        <u-table-column
          prop="FJDA_FJID"
          label="资源代码"
          width="150"
          show-overflow-tooltip
        >
        </u-table-column>
        <u-table-column
          prop="KHDA_KHMC"
          label="客户名称"
          width="150"
          show-overflow-tooltip
        >
        </u-table-column>
        <u-table-column
          prop="YJFA_FAMC"
          label="预交项目"
          width="150"
          show-overflow-tooltip
        >
        </u-table-column>
        <u-table-column
          prop="YJSY_SYRQ"
          label="使用日期"
          width="120"
          show-overflow-tooltip
        >
        </u-table-column>
        <u-table-column
          prop="YJSY_SYJE"
          label="使用金额"
          width="100"
          show-overflow-tooltip
        >
        </u-table-column>
        <u-table-column
          prop="YJSY_SYFS"
          label="使用方式"
          width="150"
          show-overflow-tooltip
        >
        </u-table-column>
        <u-table-column
          prop="YJSY_JKLX"
          label="交款类型"
          width="120"
          show-overflow-tooltip
        >
        </u-table-column>
        <u-table-column
          prop="YJSY_TZR"
          label="填制人"
          width="120"
          show-overflow-tooltip
        >
        </u-table-column>
        <u-table-column
          prop="YJSY_YJR"
          label="预交人"
          width="100"
          show-overflow-tooltip
        >
        </u-table-column>
        <u-table-column
          prop="YJSY_SYR"
          label="使用人"
          width="100"
          show-overflow-tooltip
        >
        </u-table-column>
        <u-table-column prop="YJSY_BZ" label="备注" show-overflow-tooltip>
        </u-table-column>
      </u-table>
    </div>
  </div>
</template>

<script>
import vueZtree from "../../../components/Eltree/treeItem.vue";
import {
  getTree,
  queryAcceptingTheUseApi,
  queryTotalAmountUsedApi,
  queryAddUpTheAdvanceBalanceApi,
} from "@/api/PrepayManagement/PrepayUse"; //预交使用js
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "PrepayUse",
  components: { vueZtree, UTable, UTableColumn },
  data() {
    return {
      ztreeDataSourceList: [], //左边树 数据
      tableData: [],
      sureRules: {},
      clickTreeObjVal: {},
      totalYE: 0, //合计余额
      totalJE: 0, //合计金额
      resourceName: "--", //资源名称
    };
  },
  mounted() {
    this.getTreeFun();
  },
  methods: {
    // 获取左边树
    getTreeFun() {
      getTree().then((response) => {
        var data = response;
        this.ztreeDataSourceList = data;
        if (this.ztreeDataSourceList.length > 0) {
          this.$nextTick(() => {
            this.$refs.dotree.setCheckTree(this.ztreeDataSourceList[0].id); //默认选中第一条
          });
        }
      });
    },
    // 点击 获取树节点数据
    getTreeData(val, node) {
      //获取树形数据
      this.clickTreeObjVal = val;
      if (this.clickTreeObjVal.data.FCDM_LX == "客户") {
        this.getTableList(); //列表数据查询
        this.queryAddUpTheAdvanceBalance(); //合计余额查询
        this.queryTotalAmountUsed(); //合计金额查询
        this.resourceName = node.parent.data.data.FCDM_MC;
      }
    },
    getTableList() {
      //列表查询
      queryAcceptingTheUseApi(this.clickTreeObjVal.data.FKGX_ZJ).then(
        (response) => {
          this.tableData = response;
        }
      );
    },
    queryAddUpTheAdvanceBalance() {
      //合计余额查询
      queryAddUpTheAdvanceBalanceApi(this.clickTreeObjVal.data.FKGX_ZJ).then(
        (response) => {
          this.totalYE = response.YJYE_YJKYE;
        }
      );
    },
    queryTotalAmountUsed() {
      //合计金额查询
      queryTotalAmountUsedApi(this.clickTreeObjVal.data.FKGX_ZJ).then(
        (response) => {
          this.totalJE = response.YJSY_SYJE;
        }
      );
    },
  },
};
</script>

<style lang="scss">
.PrepayUse {
  .el-title {
    width: 220px;
    margin-left: -220px;
    padding: 0 10px;
  }
  .resrouce_wrap {
    margin-bottom: 15px;
    li {
      display: inline-block;
      padding: 0 30px;
      vertical-align: middle;
      height: 70px;
      .title {
        color: #666;
      }
      .content_value {
        margin-top: 10px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .resource_line {
      display: inline-block;
      vertical-align: middle;
      width: 1px;
      height: 40px;
      border: 1px solid #eee;
    }
  }
  .tableContent {
    clear: both;
  }
  .ztree_content_wrap {
    margin-top: 10px;
    .el-input__inner {
      width: 190px;
      height: 28px;
      background: rgba(223, 224, 230, 1);
      border-radius: 4px;
      margin: 0 !important;
      margin-bottom: 14px;
    }
    .el-tree {
      margin-top: 10px;
    }
  }
}
</style>
