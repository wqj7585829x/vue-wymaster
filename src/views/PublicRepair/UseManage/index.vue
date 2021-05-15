<template>
  <div class="el-body">
    <!-- 搜索框begin -->
    <div class="select">
      <el-form label-width="85px" :model="queryProjectPage">
        <el-row :gutter="30">
          <el-col :span="6" style="width: 300px">
            <el-form-item label="维修项目名称：" label-width="115px">
              <el-input v-model="queryProjectPage.pubProjectName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="所属集团：">
              <el-select
                v-model="queryProjectPage.belongClique"
                @change="findCliquechange"
                clearable
              >
                <el-option
                  v-for="item in findCliquelist"
                  :key="item.cliqId"
                  :label="item.name"
                  :value="item.cliqId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="所属物业：">
              <el-select
                v-model="queryProjectPage.belongComp"
                @change="findTenchange"
                clearable
              >
                <el-option
                  v-for="item in findTenlist"
                  :key="item.tenId"
                  :label="item.name"
                  :value="item.tenId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="所属小区：">
              <el-select
                v-model="queryProjectPage.belongPlot"
                @change="findPlotchange"
                clearable
              >
                <el-option
                  v-for="item in findPlotlist"
                  :key="item.plotId"
                  :label="item.name"
                  :value="item.plotId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="审批状态：" label-width="115px">
              <el-select v-model="queryProjectPage.approvalStatus" clearable>
                <el-option label="未提交审批" value="0"></el-option>
                <el-option label="待审批" value="1"></el-option>
                <el-option label="审批通过" value="2"></el-option>
                <el-option label="审批不通过" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="是否分摊：">
              <el-select v-model="queryProjectPage.share" clearable>
                <el-option label="否" value="0"></el-option>
                <el-option label="是" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label-width="0px">
              <el-button
                type="success"
                @click="onSubmit"
                v-has="'UseManageSubmit_has'"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 搜索框end -->

    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button type="primary" @click="addProject" v-has="'UseManageAdd_has'"
        >新增</el-button
      >
      <el-button
        type="primary"
        @click="updateProject"
        :disabled="disabledupdate"
        :title="updateTitle()"
        v-has="'UseManageModify_has'"
        >修改</el-button
      >
      <el-button
        type="danger"
        @click="deleteProject"
        :disabled="disabledupdate"
        :title="updateTitle()"
        v-has="'UseManageDelete_has'"
        >删除</el-button
      >
      <el-button
        type="primary"
        @click="submitProject"
        :disabled="disabledupdate"
        :title="updateTitle()"
        v-has="'UseManageSubApproval_has'"
        >提交审批</el-button
      >
      <el-button
        type="primary"
        @click="approvalProject"
        :disabled="disabledApproval"
        :title="approvalTitle()"
        v-has="'UseManageApproval_has'"
        >审批</el-button
      >
      <el-button
        type="primary"
        @click="shareProject"
        :disabled="disabledshare"
        :title="shareTitle()"
        v-has="'UseManageShare_has'"
        >执行分摊</el-button
      >
    </div>
    <!-- 按钮end -->

    <!-- 维修项目 表 begin -->
    <div class="resoureTable">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        @cell-click="rowclick"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column fixed prop="rownumber" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="pubProjectName" label="维修项目名称" width="200">
        </el-table-column>
        <el-table-column prop="approvalStatus" label="审批状态" width="100">
          <template slot-scope="scope">
            {{ scope.row.approvalStatus === 0 ? "未提交审批" : "" }}
            {{ scope.row.approvalStatus === 1 ? "待审批" : "" }}
            {{ scope.row.approvalStatus === 2 ? "审批通过" : "" }}
            {{ scope.row.approvalStatus === 3 ? "审批不通过" : "" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="pubProjectMoney"
          label="项目使用金额"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.pubProjectMoney ? scope.row.pubProjectMoney : 0 }}
          </template>
        </el-table-column>
        <el-table-column prop="shareStandard" label="分摊标准" width="150">
          <template slot-scope="scope">
            {{ scope.row.shareStandard === 1 ? "平均分摊" : "" }}
            {{ scope.row.shareStandard === 2 ? "按收费面积分摊" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="share" label="是否分摊" width="100">
          <template slot-scope="scope">
            {{ scope.row.share === 0 ? "否" : "" }}
            {{ scope.row.share === 1 ? "是" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="shareDate" label="分摊日期" width="100">
        </el-table-column>
        <el-table-column prop="type" label="项目类型" width="100">
          <template slot-scope="scope">
            {{ scope.row.type === 1 ? "大项目" : "" }}
            {{ scope.row.type === 2 ? "小项目" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="progress" label="工程进度" width="100">
          <template slot-scope="scope">
            {{ scope.row.progress === 1 ? "未完成" : "" }}
            {{ scope.row.progress === 2 ? "已完成" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="repairType" label="维修类别" width="150">
          <template slot-scope="scope">
            {{ scope.row.repairType === 1 ? "公共设施" : "" }}
            {{ scope.row.repairType === 2 ? "共用部位/公用设备" : "" }}
            {{ scope.row.repairType === 3 ? "自用部位" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="belongCliqueName" label="所属集团" width="150">
        </el-table-column>
        <el-table-column prop="belongCompName" label="所属物业" width="150">
        </el-table-column>
        <el-table-column prop="belongPlotName" label="所属小区" width="150">
        </el-table-column>
        <el-table-column prop="repairDepartment" label="报修部门" width="150">
        </el-table-column>
        <el-table-column prop="processer" label="处理人" width="100">
        </el-table-column>
        <el-table-column prop="repairDate" label="报修日期" width="100">
        </el-table-column>
        <el-table-column prop="repairAddress" label="报修地点">
        </el-table-column>
        <el-table-column prop="startDate" label="开工日期" width="100">
        </el-table-column>
        <el-table-column prop="endDate" label="完工日期" width="100">
        </el-table-column>
        <el-table-column prop="creater" label="登记人" width="100">
        </el-table-column>
        <el-table-column prop="explain" label="项目说明"> </el-table-column>
      </el-table>
    </div>
    <!-- 维修项目 表 end -->

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="queryProjectPage.pageSize"
        layout="prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->

    <div class="tablebottom">
      <el-button-group>
        <el-button
          @click="showShareGroupTable"
          :class="{ typecheck: groupTableShow }"
          >对应分摊组</el-button
        >
        <el-button
          @click="showHuTable"
          :class="{ typecheck: householdTableShow }"
          >对应户</el-button
        >
      </el-button-group>
      <!-- 对应分摊组 表 begin -->
      <div v-show="groupTableShow">
        <el-table :data="groupTableData" border>
          <el-table-column prop="groupName" label="分摊组名称" width="150">
          </el-table-column>
          <el-table-column prop="groupCaption" label="分摊组说明">
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
        </el-table>
      </div>
      <!-- 对应分摊组 表 end -->

      <!-- 对应户 表 begin -->
      <div v-show="householdTableShow">
        <el-table :data="householdTableData" border>
          <el-table-column prop="cusName" label="客户名称" width="150">
          </el-table-column>
          <el-table-column prop="roomNo" label="所属资源"> </el-table-column>
          <el-table-column prop="buildName" label="所属楼栋" width="200">
          </el-table-column>
        </el-table>
      </div>
      <!-- 对应户 表 end -->
    </div>

    <!-- 新增 begin -->
    <ProjectDialog
      :show.sync="show"
      ref="PopProjectChildren"
      @RefreshItem="RefreshList"
    ></ProjectDialog>
    <!-- 弹框 end -->

    <!-- 审批 begin -->
    <ApprovalDialog
      :showApproval.sync="showApproval"
      ref="PopApprovalChildren"
      @RefreshItem="approvalRefresh"
    ></ApprovalDialog>
    <!-- 弹框 end -->

    <!-- 分摊余额不足用户 begin -->
    <ShareDialog
      :showShare.sync="showShare"
      ref="PopShareChildren"
    ></ShareDialog>
    <!-- 弹框 end -->
  </div>
</template>

<script>
import ProjectDialog from "./components/ProjectDialog"; //新增
import ApprovalDialog from "./components/ApprovalDialog"; //审批
import ShareDialog from "./components/ShareDialog"; //审批
import {
  findClique,
  findTen,
  findPlot,
  PubRepFundProject_selectByPage,
  PubRepFundProject_selectGroupR,
  PubRepFundProject_delete,
  subApproval,
  share,
} from "@/api/PublicRepair/UseManage"; //js

export default {
  name: "UseManage",
  data() {
    return {
      disabledupdate: true, //修改
      disabledApproval: true, //审批
      disabledshare: true, //执行分摊
      show: false, //新增 弹框 显示
      showApproval: false, //审批 弹框
      showShare: false, //分摊余额不足用户 弹框
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      groupTableShow: true, //对应组 控制显示
      householdTableShow: false, //对应户 控制显示
      tableData: [], // 维修项目 表 数据
      queryProjectPage: {
        // 查询表
        startRownumber: 0,
        pageSize: 5,
        pubProjectName: null,
        belongClique: null,
        belongComp: null,
        belongPlot: null,
        approvalStatus: null,
        share: null,
      },
      groupTableData: [], //分摊组 表 数据
      householdTableData: [], //对应户 表 数据
      findCliquelist: [], //集团列表
      findTenlist: [], //公司列表
      findPlotlist: [], //小区列表
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        if (
          this.tableRow.approvalStatus == 0 ||
          this.tableRow.approvalStatus == 3
        ) {
          //修改、删除、提交审批  未提交审批、审批不通过
          this.disabledupdate = false;
        } else {
          this.disabledupdate = true;
        }
        if (this.tableRow.approvalStatus == 1) {
          // 审批 待审批状态
          this.disabledApproval = false;
        } else {
          this.disabledApproval = true;
        }
        if (this.tableRow.approvalStatus == 2 && this.tableRow.share == 0) {
          //只有审核通过后且还未分摊的才可以执行分摊
          this.disabledshare = false;
        } else {
          this.disabledshare = true;
        }
      } else {
        this.disabledupdate = true;
        this.disabledApproval = true;
        this.disabledshare = true;
      }
    },
  },
  mounted() {
    this.getfindClique();
    this.getTableData();
  },
  methods: {
    // 获取集团
    getfindClique() {
      findClique().then((response) => {
        this.findCliquelist = response.returnData;
      });
    },
    // 获取公司
    getfindTen() {
      findTen(this.queryProjectPage).then((response) => {
        this.findTenlist = response.returnData;
      });
    },
    // 获取小区
    getfindPlot() {
      findPlot(this.queryProjectPage).then((response) => {
        this.findPlotlist = response.returnData;
      });
    },
    // 所属集团 change
    findCliquechange(val) {
      this.queryProjectPage.belongClique = val;
      this.queryProjectPage.belongComp = null;
      this.queryProjectPage.belongPlot = null;
      this.findPlotlist = [];
      this.disabledSet = true;
      this.getfindTen();
    },
    // 所属物业 change
    findTenchange(val) {
      this.queryProjectPage.belongComp = val;
      this.queryProjectPage.belongPlot = null;
      this.getfindPlot();
    },
    // 所属小区 change
    findPlotchange(val) {
      this.queryProjectPage.belongPlot = val;
      this.disabledSet = false;
    },
    // 表数据
    getTableData() {
      PubRepFundProject_selectByPage(this.queryProjectPage).then((response) => {
        this.tableData = response.returnData;
        this.returnTotal = response.returnTotal;
      });
    },
    // 下一页
    handleCurrentChange(currentPage) {
      this.queryProjectPage.startRownumber =
        (currentPage - 1) * this.queryProjectPage.pageSize;
      this.getTableData(); //获取表格数据
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.groupTableData = [];
      this.householdTableData = [];
    },
    // 行 点击
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      this.getGroupTableData();
    },
    // 获取 对应组 对应户
    getGroupTableData() {
      PubRepFundProject_selectGroupR(this.tableRow).then((response) => {
        this.groupTableData = response.returnData[0].groupList;
        this.householdTableData = response.returnData[0].groupRList;
      });
    },
    // 查询
    onSubmit() {
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.queryProjectPage.startRownumber = 0; //点击树重置第一页0
      this.currentPage = 1; //点击树重置第一页
      this.groupTableData = [];
      this.householdTableData = [];
      this.getTableData();
    },
    // 新增
    addProject() {
      this.show = true;
      this.$refs.PopProjectChildren.getProjectData({}, 0);
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.groupTableData = [];
      this.householdTableData = [];
    },
    // 修改
    updateProject() {
      this.show = true;
      this.$refs.PopProjectChildren.getProjectData(this.tableRow, 1);
    },
    // 删除
    deleteProject() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          PubRepFundProject_delete(this.tableRow).then((response) => {
            this.radio = ""; //选择后清空选中表格按钮
            this.tableRow = {}; //选择后清空选中表格数据
            this.groupTableData = [];
            this.householdTableData = [];
            this.getTableData();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    // 提交审批
    submitProject() {
      this.$confirm("此操作将提交该笔维修项目进行审批, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          subApproval(this.tableRow).then((response) => {
            this.radio = ""; //选择后清空选中表格按钮
            this.tableRow = {}; //选择后清空选中表格数据
            this.groupTableData = [];
            this.householdTableData = [];
            this.getTableData();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    // 审批
    approvalProject() {
      this.showApproval = true;
      this.$refs.PopApprovalChildren.getApprovalData(
        this.tableRow.pubProjectID
      );
    },
    // 执行分摊
    shareProject() {
      this.$confirm("此操作将对该笔维修项目执行分摊, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          share(this.tableRow).then((response) => {
            this.radio = ""; //选择后清空选中表格按钮
            this.tableRow = {}; //选择后清空选中表格数据
            this.groupTableData = [];
            this.householdTableData = [];
            var data = response.returnData;
            if (data[0].status == 2) {
              this.$nextTick(() => {
                this.showShare = true;
                this.$refs.PopShareChildren.getData(data);
              });
            } else {
              this.getTableData();
            }
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    //刷新表数据
    RefreshList(newobj) {
      this.tableRow = newobj;
      this.getTableData();
    },
    // 审批 刷新
    approvalRefresh() {
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.groupTableData = [];
      this.householdTableData = [];
      this.getTableData();
    },
    // 对应分摊组 表 显示
    showShareGroupTable() {
      this.groupTableShow = true;
      this.householdTableShow = false;
    },
    // 对应户 表 显示
    showHuTable() {
      this.householdTableShow = true;
      this.groupTableShow = false;
    },
    // 修改标题提示
    updateTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      } else {
        if (
          this.tableRow.approvalStatus != 0 ||
          this.tableRow.approvalStatus != 3
        ) {
          return "表格对应数据的审批状态应为未提交审批或者审批不通过";
        }
      }
    },
    // 审批标题提示
    approvalTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      } else {
        if (this.tableRow.approvalStatus != 1) {
          return "表格对应数据的审批状态应为待审批";
        }
      }
    },
    // 执行分摊标题提示
    shareTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      } else {
        if (this.tableRow.approvalStatus != 2 && this.tableRow.share != 0) {
          return "只有审核通过后且还未分摊的才可以执行分摊";
        }
      }
    },
  },
  components: {
    ProjectDialog,
    ApprovalDialog,
    ShareDialog,
  },
};
</script>

<style lang="scss" scoped>
.el-body {
  padding: 30px 30px 0 30px;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}

.tablebottom {
  border-top: 4px solid #eff0f0;
  padding-top: 16px;
  padding-bottom: 16px;
  .el-button-group .el-button {
    border-color: #3a8ee6;
    color: #3a8ee6;
    border-radius: 0 !important;
    width: 102px;
  }
  .el-table {
    width: 600px;
    max-height: 200px;
    overflow: auto;
  }
}

.typecheck {
  background: #3a8ee6 !important;
  color: #fff !important;
}
</style>
