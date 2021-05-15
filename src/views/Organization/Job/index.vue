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
              title="请选择部门"
              v-has="'JobAdd_has'"
              >新增</el-button
            >
            <el-button
              type="primary"
              @click="update()"
              :disabled="disabledupdate"
              :title="updateTitle()"
              v-has="'JobModify_has'"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="deleteTab()"
              :disabled="disabledelete"
              :title="detelteTitle()"
              v-has="'JobDelete_has'"
              >删除</el-button
            >
          </el-col>
        </el-row>
      </section>
      <!-- 表格 -->
      <el-row class="sysCon_Mt">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
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
            prop="rownumber"
            label="序号"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="jobTitle"
            label="职位名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="cliqueName"
            label="所属机构"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="depName"
            label="所属部门"
            width="200"
          ></el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template slot-scope="scope">
              {{ scope.row.status === 1 ? "启用" : "" }}
              {{ scope.row.status === 0 ? "禁用" : "" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="jobDescription"
            label="职位说明"
          ></el-table-column>
        </el-table>
      </el-row>
      <!-- 分页 -->
      <el-row>
        <div class="el-paginationR" v-if="returnTotal">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="queryPageList.pageSize"
            layout="prev, pager, next, jumper"
            :total="returnTotal"
          >
          </el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 弹窗 单列布局start -->
    <JobDialog
      :showdialog.sync="showdialog"
      :getTreeDialogData="getTreeDialogData"
      @poplist="poplist"
      ref="JobChildren"
    ></JobDialog>
  </div>
</template>
<script>
import vuetree from "../../../components/Eltree/treeItem.vue";
import JobDialog from "./components/JobDialog";
import { organFindTree, queryPageApi, JobDelete } from "@/api/Organization/Job";
export default {
  name: "Job",
  data() {
    return {
      isFirst: true, //一进来默认选中第一个集团左边数
      clickOrgId: "",
      disabledAdd: true, //新增
      disabledupdate: true, //修改
      disabledelete: true, //删除
      radio: "", //选中
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      tableData: [], //表格列表数据
      ztreeDataSourceList: [],
      showdialog: false,
      getTreeDialogData: {}, //点击树查询数据返回到新增弹窗
      queryPageList: {
        startRownumber: 0,
        pageSize: 10,
        orgId: "",
        agencyType: "",
      },
      formList: {
        sysId: null,
        depId: "",
        jobTitle: "",
        jobDescription: "",
        status: 1,
        agencyType: "",
      },
      tableRow: {}, //修改数据
    };
  },
  components: {
    vuetree,
    JobDialog,
  },
  mounted() {
    this.FindTree(); //默认进来查询左边数
  },
  // activated(){//生命周期activated keep-alive组件激活时调用。该钩子在服务器端渲染期间不被调用。
  //   this.FindTree()//默认进来查询左边数
  // },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disabledupdate = false;
        this.disabledelete = false;
      } else {
        this.disabledupdate = true;
        this.disabledelete = true;
      }
    },
  },
  methods: {
    handleCurrentChange(currentPage) {
      //console.log(`当前页: ${currentPage}`)
      this.queryPageList.startRownumber =
        (currentPage - 1) * this.queryPageList.pageSize;
      this.queryPage();
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    rowClick(row) {
      //console.log(JSON.stringify(row))
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    FindTree() {
      //查询左边数
      organFindTree().then((response) => {
        this.ztreeDataSourceList = response.returnData;
        if (this.isFirst) {
          //this.isFirst=false
          this.$nextTick(function () {
            this.$refs.dotree.setCheckTree(this.ztreeDataSourceList[0].orgId); //设置左边数选中
          });
          this.getTreeData(this.ztreeDataSourceList[0]);
        }
      });
    },
    poplist(newRowObj) {
      //弹窗确定后,重新查询左边数与表格数据
      //this.FindTree()
      this.queryPage();
      this.tableRow = newRowObj; //弹窗确定后更新表格选中值
    },
    getTreeData(val) {
      //获取点击树形数据
      this.queryPageList.startRownumber = 0; //点击树重置第一页0
      this.currentPage = 1; //点击树重置第一页
      //console.log(JSON.stringify(val));
      this.getTreeDialogData = val; //点击树的数据返回到新增弹窗
      //this.agencyType=val.agencyType  //点击部门类型4才显示右边新增修改删除列表
      if (val.agencyType == 4) {
        this.disabledAdd = false;
        this.disabledupdate = true;
        this.disabledelete = true;
      } else {
        this.disabledAdd = true;
        this.disabledupdate = true;
        this.disabledelete = true;
      }
      this.queryPageList.orgId = val.orgId;
      this.queryPageList.agencyType = val.agencyType;
      this.queryPage();
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    add() {
      //新增
      this.showdialog = true;
      this.$refs.JobChildren.getTableRow(this.formList, 0);
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    update() {
      //修改
      if (Object.keys(this.tableRow) != "") {
        this.showdialog = true;
        this.$refs.JobChildren.getTableRow(this.tableRow, 1);
      }
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
            JobDelete(this.tableRow).then((response) => {
              if (response.returnData[0].status) {
                this.FindTree();
                this.queryPage();
              }
              this.radio = ""; //清空选中
            });
          })
          .catch(() => {
            this.radio = ""; //清空选中
          });
      }
    },
    queryPage() {
      //查询表格数据
      queryPageApi(this.queryPageList).then((response) => {
        this.tableData = response.returnData;
        this.returnTotal = response.returnTotal;
      });
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
}
</style>
