<template>
  <div class="container">
    <!-- 内容区域 -->
    <div class="el-content">
      <!-- 按钮begin -->
      <div class="button buttonBox">
        <el-button type="primary" @click="addTable" v-has="'RepRegAdd_has'"
          >新增</el-button
        >
        <el-button
          type="primary"
          @click="eidtTable"
          :disabled="disableddo"
          v-has="'RepRegEdit_has'"
          >修改</el-button
        >
        <el-button
          type="danger"
          @click="deletePartition"
          :disabled="disableddo"
          v-has="'RepRegDel_has'"
          >删除</el-button
        >
        <el-button
          type="primary"
          @click="setladder"
          :disabled="disableddo && disableset"
          v-has="'RepRegSet_has'"
          >所属梯户设置
        </el-button>
      </div>
      <!-- 按钮end -->

      <!-- 客户详情begin -->
      <div class="customedetail">
        <el-table
          ref="singleTable"
          :data="tableData"
          v-if="maxheight"
          :max-height="maxheight"
          border
          style="width: 100%"
          @row-click="rowclick"
        >
          <el-table-column label="选择" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="SSXM_MC" label="项目名称" width="250">
          </el-table-column>
          <el-table-column prop="SSXM_XMLX" label="项目类型" width="250">
          </el-table-column>
          <el-table-column prop="SSXM_WXLB" label="项目类别" width="250">
          </el-table-column>
          <el-table-column prop="SSXM_DZ" label="地址"> </el-table-column>
        </el-table>
      </div>
    </div>

    <ProjectDialog
      :show.sync="show"
      ref="ProjectDialog"
      @RefreshItem="RefreshList"
    ></ProjectDialog>
    <Subordinate :Sshow.sync="Sshow" ref="Subordinate"></Subordinate>
  </div>
</template>
<script>
import {
  queryProject,
  deleteProject,
  checkOriginalEvents,
} from "@/api/PublicRepairManager/RepairRegister";
import ProjectDialog from "./components/ProjectDialog"; //新增总表,修改
import Subordinate from "../components/Subordinate"; //所属梯户
export default {
  name: "GeneralTable",
  data() {
    return {
      tableData: [], //列表参数
      disableddo: true,
      disableset: true,
      radio: "", //单选按钮
      show: false, //新增 弹框 标识
      Sshow: false,
      maxheight: 0,
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disableddo = false;
      } else {
        this.disableddo = true;
      }
    },
  },
  created() {
    this.maxheight = window.screen.width > 1025 ? 500 : 300;
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getRowTable() {},
    rowclick(row) {
      //单行点击单选按钮选中
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      checkOriginalEvents(row).then((response) => {
        if (response === 0) {
          this.disableset = false;
        } else {
          this.disableset = true;
        }
      });
    },
    // 表数据
    getTableData() {
      queryProject().then((response) => {
        this.tableData = response;
      });
    },
    //设置所属梯户
    setladder() {
      this.Sshow = true;
      this.$refs.Subordinate.getPartitionData(
        { SSXM_ZJ: this.tableRow.SSXM_ZJ, WXDJ_ZJ: "" },
        1
      );
    },
    //新增总表
    addTable() {
      this.show = true;
      this.$refs.ProjectDialog.getPartitionData({}, 0);
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    //编辑总表
    eidtTable() {
      this.show = true;
      this.$refs.ProjectDialog.getPartitionData(this.tableRow, 1);
    },
    // 删除总表
    deletePartition() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteProject(this.tableRow).then((response) => {
            this.radio = ""; //选择后清空选中表格按钮
            this.RefreshList({});
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    RefreshList(newobj) {
      this.tableRow = newobj;
      this.getTableData();
    },
  },
  components: {
    ProjectDialog,
    Subordinate,
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
<style>
.container .el-input-number {
  width: auto;
}
</style>
