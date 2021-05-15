<template>
  <div class="el-body">
    <!-- 左边数 -->
    <div class="el-title">
      <div v-if="ztreeDataSourceList && ztreeDataSourceList.length > 0">
        <!--树形组件-->
        <vuetree
          :list.sync="ztreeDataSourceList"
          :showInput="false"
          @getTreeData="getTreeData"
          ref="dotree"
        ></vuetree>
      </div>
    </div>
    <!-- 右边内容区域 -->
    <div class="el-content">
      <!-- 按钮操作 -->
      <section class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              @click="add()"
              :disabled="disabledAdd"
              :title="addTitle"
              v-has="'InstitutionalAdd_has'"
              >新增</el-button
            >
            <el-button
              type="primary"
              @click="addGroup()"
              :disabled="disabledAdd"
              v-if="isShowGroup"
              >新增集团</el-button
            >
            <el-button
              type="primary"
              @click="update()"
              :disabled="disabledupdate"
              :title="updateTitle()"
              v-has="'InstitutionalUpdate_has'"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="deleteTab()"
              :disabled="disabledelete"
              :title="detelteTitle()"
              v-has="'InstitutionalDel_has'"
              >删除</el-button
            >
          </el-col>
        </el-row>
      </section>
      <!-- 表格 -->
      <el-row class="sysCon_Mt">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          class="tableContent"
          ref="singleTable"
          @row-click="rowClick"
        >
          <el-table-column label="选择" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="BMJG_JGBH"
            label="机构编号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="BMJG_JGMC"
            label="机构名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="BMJG_JGJB"
            label="机构级别"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="BMJG_DH"
            label="管理处电话"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="BMJG_CJRQ"
            label="创建日期"
            width="100"
          ></el-table-column>
          <el-table-column prop="BMJG_SFYX" label="是否有效" width="150">
            <template slot-scope="scope">
              {{ scope.row.BMJG_SFYX === true ? "是" : "" }}
              {{ scope.row.BMJG_SFYX === false ? "否" : "" }}
            </template>
          </el-table-column>
          <el-table-column prop="BMJG_BZ" label="备注"></el-table-column>
        </el-table>
      </el-row>
      <!-- 分页 -->
      <el-row>
        <div class="el-paginationR" v-if="returnTotal">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="queryOrganPage.pageSize"
            layout="total,sizes,prev, pager, next, jumper"
            :total="returnTotal"
          >
          </el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 弹窗 单列布局start -->
    <InstDialog
      :showdialog.sync="showdialog"
      :getTreeDialogData="getTreeDialogData"
      @RefreshItem="RefreshList"
      ref="PopChildren"
    ></InstDialog>
  </div>
</template>
<script>
import vuetree from "../../../components/Eltree/treeItem";
import InstDialog from "./commponents/InstDialog";
import {
  organFindTree,
  QueryOrganList,
  DeleteOrgan,
} from "@/api/Organization/Institutional";
export default {
  name: "Institutional",
  data() {
    return {
      disabledAdd: false, //新增
      addTitle: "", //新增标题提示
      disabledupdate: true, //修改
      disabledelete: true, //删除
      radio: "", //选中
      tableData: [],
      tableRow: {}, //修改数据
      getTreeDialogData: {}, //点击树查询数据返回到新增弹窗
      showdialog: false,
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      ztreeDataSourceList: [],
      queryOrganPage: {
        id: null,
        pageIndex: 0,
        pageSize: 10,
      },
      checkedTree: {}, //选中的树
      isShowGroup: false, //默认隐藏新增集团按钮
      ClickOrgId: null, //记录点击过的id
      haveChildrenOrg: false, //如果点击的树下面有子级的不能直接删除
      nodeParentName: "", //上级部门
    };
  },
  components: {
    vuetree,
    InstDialog,
  },
  mounted() {
    this.FindTree(0); //默认进来查询左边数
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        this.disabledupdate = false;
        if (this.haveChildrenOrg) {
          this.disabledelete = true;
        } else {
          this.disabledelete = false;
        }
      } else {
        this.disabledupdate = true;
        this.disabledelete = true;
      }
    },
    disabledAdd() {
      if (this.disabledAdd) {
        this.addTitle = "岗位下不能新增";
      } else {
        this.addTitle = "";
      }
    },
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryOrganPage.pageSize = val;
      this.queryOrgan();
    },
    handleCurrentChange(currentPage) {
      this.queryOrganPage.pageIndex = currentPage - 1;
      this.queryOrgan();
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    rowClick(row) {
      //表格单行点击
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      this.haveChildrenOrg = row.haveChildrenOrg; //为true  不可删除
    },
    add() {
      this.showdialog = true;
      this.$refs.PopChildren.getTableRow(
        {},
        0,
        this.checkedTree,
        this.nodeParentName
      );
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    addGroup() {
      //新增集团
      this.showdialog = true;
      this.$refs.PopChildren.getTableRow(
        {},
        2,
        this.checkedTree,
        this.nodeParentName
      );
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    update() {
      if (Object.keys(this.tableRow) != "") {
        this.showdialog = true;
        this.$refs.PopChildren.getTableRow(
          this.tableRow,
          1,
          this.checkedTree,
          this.nodeParentName
        );
      }
    },
    FindTree(val) {
      //查询左边树
      organFindTree().then((response) => {
        this.ztreeDataSourceList = response;
        if (this.ztreeDataSourceList.length > 0) {
          if (val == 1) {
            //刷新选中
            this.$nextTick(function () {
              this.$refs.dotree.setCheckTree(this.ClickOrgId); //设置左边树选中
            });
          } else {
            //默认选中第一条数据
            this.$nextTick(() => {
              this.$refs.dotree.setCheckTree(this.ztreeDataSourceList[0].id); //默认选中第一条
              this.checkedTree = this.ztreeDataSourceList[0];
              this.queryOrganPage.id = this.ztreeDataSourceList[0].data.BMJG_ZJ;
              this.ClickOrgId = this.ztreeDataSourceList[0].id; //记录点击过的树 id
              this.queryOrgan();
            });
          }
        }
      });
    },
    RefreshList(val, newRowObj) {
      //弹窗确定重新查询左边数
      this.FindTree(val);
      this.queryOrgan();
      this.tableRow = newRowObj; //弹窗确定后更新表格选中值
    },
    queryOrgan() {
      //查询右边列表数据
      QueryOrganList(this.queryOrganPage).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    getTreeData(val, node) {
      if (val.data.BMJG_JGJB == "岗位") {
        this.disabledAdd = true;
      } else {
        this.disabledAdd = false;
      }
      this.checkedTree = val;
      this.nodeParentName = node.parent.data.name;
      this.queryOrganPage.pageIndex = 0; //点击树重置第一页0
      this.currentPage = 1; //点击树重置第一
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.queryOrganPage.id = val.data.BMJG_ZJ;
      this.ClickOrgId = val.id; //记录点击过的树 id
      this.queryOrgan();
    },
    deleteTab() {
      //删除选中表格数据
      if (Object.keys(this.tableRow) != "") {
        this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            DeleteOrgan(this.tableRow).then((response) => {
              this.queryOrganPage.pageIndex = 0; //点击树重置第一页0
              this.currentPage = 1; //点击树重置第一
              this.FindTree();
              this.queryOrgan();
              this.radio = ""; //清空选中
            });
          })
          .catch(() => {
            this.radio = ""; //清空选中
          });
      }
    },
    updateTitle() {
      //修改标题提示
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
    detelteTitle() {
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
  },
};
</script>
<style lang="scss" scoped>
.el-body {
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-paginationR {
    text-align: right;
    margin-top: 20px;
  }
  .buttonBox {
    display: none;
  }
}
</style>
