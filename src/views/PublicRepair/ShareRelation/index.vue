<template>
  <div class="el-body">
    <div class="el-title">
      <div v-if="ztreeDataSourceList.length > 0">
        <!--树形组件-->
        <vue-ztree
          :list.sync="ztreeDataSourceList"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          :showInput="true"
          @getTreeData="getTreeData"
        ></vue-ztree>
      </div>
    </div>
    <div class="el-content">
      <div>
        <!-- 按钮begin -->
        <div class="buttonBox">
          <el-button
            type="primary"
            @click="addShareGroup"
            v-has="'ShareRelationAdd_has'"
            >新增分摊组</el-button
          >
          <el-button
            type="primary"
            :disabled="disabledupdate"
            :title="updateTitle()"
            @click="updateShareGroup"
            v-has="'ShareRelationUpdate_has'"
            >修改分摊组</el-button
          >
          <el-button
            type="danger"
            :disabled="disabledupdate"
            @click="deleteShareGroup"
            :title="updateTitle()"
            v-has="'ShareRelationDelete_has'"
            >删除分摊组</el-button
          >
          <el-button
            type="primary"
            :disabled="disabledupdate"
            @click="SetHousehold"
            :title="updateTitle()"
            v-has="'ShareRelationSet_has'"
            >设置户</el-button
          >
        </div>
        <!-- 按钮end -->
        <el-row :gutter="50">
          <el-col :span="13">
            <section class="table_title">
              <span>分摊组</span>
            </section>
            <!-- 对应组 表 begin -->
            <div>
              <el-table :data="groupTableData" border @row-click="rowclick">
                <el-table-column label="选择" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.$index" v-model="radio"
                      >&nbsp;</el-radio
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  prop="rownumber"
                  label="序号"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="groupName"
                  label="分摊组名称"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="groupCaption"
                  label="分摊组说明"
                  width="150"
                ></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
              </el-table>
            </div>
            <!-- 表 end -->

            <!-- 分页begin -->
            <div class="block" v-if="returnTotal">
              <el-pagination
                @current-change="handleCurrentChange1"
                :current-page.sync="currentPage"
                :page-size="queryPage1.pageSize"
                layout="prev, pager, next, jumper"
                :total="returnTotal"
              >
              </el-pagination>
            </div>
            <!-- 分页end -->
          </el-col>

          <el-col :span="11">
            <section class="table_title">
              <span>对应户</span>
            </section>
            <!-- 对应户 表 begin -->
            <div>
              <el-table :data="tableData" border>
                <el-table-column
                  fixed
                  prop="rownumber"
                  label="序号"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="cusName"
                  label="客户名称"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="roomNo"
                  label="所属资源"
                ></el-table-column>
                <el-table-column
                  prop="buildName"
                  label="所属楼栋"
                  width="150"
                ></el-table-column>
              </el-table>
            </div>
            <!-- 表 end -->

            <!-- 分页begin -->
            <div class="block" v-if="returnTotal1">
              <el-pagination
                @current-change="handleCurrentChange1"
                :current-page.sync="currentPage1"
                :page-size="queryPage1.pageSize"
                layout="prev, pager, next, jumper"
                :total="returnTotal1"
              >
              </el-pagination>
            </div>
            <!-- 分页end -->
          </el-col>
        </el-row>
      </div>

      <!-- 分摊组 弹框 begin -->
      <ShareGroupDialog
        :showShareGroup.sync="showShareGroup"
        ref="PopShareGroupChildren"
        @RefreshItem="RefreshList"
      ></ShareGroupDialog>
      <!-- 分摊组 弹框 end -->

      <!-- 设置户 弹框 begin -->
      <SetHouseholdDialog
        :showSet.sync="showSet"
        ref="PopSetHouseholdChildren"
        @RefreshItem="RefreshList_h"
      ></SetHouseholdDialog>
      <!-- 设置户 弹框 end -->
    </div>
  </div>
</template>

<script>
import vueZtree from "../../../components/Eltree/treeItem.vue";
import ShareGroupDialog from "./components/ShareGroupDialog"; //分摊组
import SetHouseholdDialog from "./components/SetHouseholdDialog"; //设置户
import {
  getTree,
  selectByPage,
  selectByPage_h,
  PubRepFundGroup_delete,
} from "@/api/PublicRepair/ShareRelation"; //js

export default {
  name: "ShareRelation",
  data() {
    return {
      disabledupdate: true, //禁用
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      showShareGroup: false, //分摊组 弹框 显示
      showSet: false, //设置户 弹框 显示
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      currentPage1: 1, //对应户 当前页
      returnTotal1: 0, //对应户 总条数
      ztreeDataSourceList: [],
      groupTableData: [], //分摊组 数组
      tableData: [], // 对应户 数组
      queryPage: {
        // 查询表 分摊组
        startRownumber: 0,
        pageSize: 10,
        belongPlot: null,
        partid: null,
        buildid: null,
      },
      queryPage1: {
        // 查询表 对应户
        startRownumber: 0,
        pageSize: 10,
        groupID: null,
      },
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disabledupdate = false;
      } else {
        this.disabledupdate = true;
      }
    },
  },
  mounted() {
    this.getTreeFun();
  },
  methods: {
    // 获取左边树
    getTreeFun() {
      getTree().then((response) => {
        var data = response.returnData;
        if (data) {
          this.ztreeDataSourceList = data;
          var v = [];
          for (var i = 0; i < this.ztreeDataSourceList.length; i++) {
            var val = this.ztreeDataSourceList[i];
            if (val.children.length != 0) {
              for (var j = 0; j < val.children.length; j++) {
                var valChild = val.children[j].children;
                if (valChild.length != 0) {
                  v = valChild[0];
                  break;
                }
              }
            }
            if (v.length != 0) {
              break;
            }
          }
          if (v.length != 0) {
            this.getTreeData(v);
          }
        }
      });
    },
    // 点击 获取树节点数据
    getTreeData(val) {
      //获取树形数据
      if (val.agencyType == 1) {
        // 集团
        var v = [];
        if (val.children.length != 0) {
          for (var i1 = 0; i1 < val.children.length; i1++) {
            //公司
            var val1 = val.children[i1];
            if (val1.children.length != 0) {
              v = val1.children[0];
              break;
            }
          }
        }
        if (v.length == 0) {
          this.showMessage("该物业集团暂无小区");
          return;
        }
        val = v;
      } else if (val.agencyType == 2) {
        // 公司
        var v = [];
        if (val.children.length != 0) {
          v = val.children[0];
        }
        if (v.length == 0) {
          this.showMessage("该公司暂无小区");
          return;
        }
        val = v;
      }
      this.queryPage.belongPlot = val.plotid;
      this.queryPage.partid = val.partid == 0 ? null : val.partid;
      this.queryPage.buildid = val.buildid == 0 ? null : val.buildid;
      this.clickOrgId = val.orgId;
      this.$nextTick(() => {
        this.$refs.dotree.setCheckTree(this.clickOrgId);
        this.RefreshList();
      });
    },
    // 提示信息
    showMessage(msg) {
      this.$message({
        message: msg,
        type: "error",
        duration: 2 * 1000,
      });
      this.$nextTick(() => {
        this.$refs.dotree.setCheckTree(this.clickOrgId);
      });
    },
    // 分摊组 下一页
    handleCurrentChange(currentPage) {
      this.queryPage.startRownumber =
        (currentPage - 1) * this.queryPage.pageSize;
      this.getTableData(); //获取表格数据
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    // 行点击
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.groupTableData.indexOf(row); //单行点击单选按钮选中
      this.queryPage1.groupID = row.groupID;
      this.getTableData_H();
    },
    // 获取 分摊组 列表 数据
    getTableData() {
      selectByPage(this.queryPage).then((response) => {
        this.tableData = []; //清空 对应户
        this.groupTableData = response.returnData;
        this.returnTotal = response.returnTotal;
      });
    },
    // 对应户 下一页
    handleCurrentChange1(currentPage) {
      this.queryPage1.startRownumber =
        (currentPage - 1) * this.queryPage1.pageSize;
      this.getTableData_H();
    },
    // 获取 对应户 列表
    getTableData_H() {
      selectByPage_h(this.queryPage1).then((response) => {
        this.tableData = response.returnData;
        this.returnTotal1 = response.returnTotal;
      });
    },
    // 新增分摊组
    addShareGroup() {
      this.showShareGroup = true;
      this.$refs.PopShareGroupChildren.getShareGroupData(this.queryPage, 0);
    },
    // 修改分摊组
    updateShareGroup() {
      this.showShareGroup = true;
      this.$refs.PopShareGroupChildren.getShareGroupData(this.tableRow, 1);
    },
    // 删除分摊组
    deleteShareGroup() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          PubRepFundGroup_delete(this.tableRow).then((response) => {
            this.radio = ""; //选择后清空选中表格按钮
            this.tableRow = {}; //选择后清空选中表格数据
            this.RefreshList();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    // 设置户
    SetHousehold() {
      this.showSet = true;
      this.$refs.PopSetHouseholdChildren.getData(this.tableRow);
    },
    //刷新 分摊组 表数据
    RefreshList() {
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.queryPage.startRownumber = 0; //点击树重置第一页0
      this.currentPage = 1; //点击树重置第一页
      this.getTableData();
    },
    // 刷新 对应户 表数据
    RefreshList_h() {
      this.queryPage1.startRownumber = 0; //点击树重置第一页0
      this.currentPage1 = 1; //点击树重置第一页
      this.getTableData_H();
    },
    // 修改标题提示
    updateTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
  },
  components: {
    vueZtree,
    ShareGroupDialog,
    SetHouseholdDialog,
  },
};
</script>

<style lang="scss" scoped>
.el-body {
  padding-left: 300px;
  .el-title {
    width: 300px;
    margin-left: -300px;
  }
  .table_title {
    margin-bottom: 10px;
    color: #444;
  }
  .el-table {
    max-height: 532px;
    overflow: auto;
  }
  .block {
    text-align: right;
    padding: 15px 0 5px 0;
  }
}
</style>
