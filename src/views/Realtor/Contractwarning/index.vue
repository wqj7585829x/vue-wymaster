<template>
  <div class="container LessorInformation">
    <!-- 右边内容区域 -->
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form label-width="120px">
          <el-row :gutter="30">
            <el-col :span="6" style="width: 300px">
              <el-form-item label="项目名称:" label-width="100px">
                <el-select v-model="tableParameter.plotId" clearable>
                  <el-option
                    v-for="item in projectNameData"
                    :key="item.plotId"
                    :value="item.plotId"
                    :label="item.plotName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 300px; padding-right: 0">
              <el-form-item label="预警天数:" label-width="100px">
                <el-input
                  v-model="tableParameter.warningDays"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="width: 0">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'ContractwarningSearch_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 按钮区域start -->
      <!-- 按钮操作 -->
      <section class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              @click="add()"
              :disabled="disabledAdd"
              v-has="'ContractwarningAdd_has'"
              >新增
            </el-button>
            <el-button
              type="primary"
              @click="update()"
              :disabled="disabledupdate"
              :title="updateTitle()"
              v-has="'ContractwarningEdit_has'"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="deleteTab()"
              :disabled="disabledelete"
              :title="detelteTitle()"
              v-has="'ContractwarningDelete_has'"
              >删除</el-button
            >
          </el-col>
        </el-row>
      </section>
      <!-- 表格 -->
      <el-row class="sysCon_Mt">
        <u-table
          :data="tableData"
          style="width: 80%"
          border
          class="tableContent"
          ref="singleTable"
          @row-click="rowClick"
          :row-height="35"
          max-height="500"
        >
          <u-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </u-table-column>
          <u-table-column prop="plotName" label="项目名称"></u-table-column>
          <u-table-column prop="warningDays" label="预警天数">
            <template slot-scope="scope">
              <span>≤{{ scope.row.warningDays }}</span>
            </template>
          </u-table-column>
        </u-table>
        <div class="el-paginationR" v-if="returnTotal" style="width: 40%">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="tableParameter.pageSize"
            layout="total,prev, pager, next, jumper"
            :total="returnTotal"
          >
          </el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 弹窗 单列布局start -->
    <LessorInformationDialog
      :showdialog.sync="showdialog"
      ref="PopChildren"
      @RefreshItem="RefreshList"
    >
    </LessorInformationDialog>
  </div>
</template>
<script>
import LessorInformationDialog from "./components/LessorInformationDialog";
import {
  queryEarlyWarning,
  deleteEarlyWarning,
  queryPlotsWithAuthority,
} from "@/api/Realtor/Contractwarning";
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "Contractwarning",
  data() {
    return {
      disabledAdd: false, //新增
      disabledupdate: true, //修改
      disabledelete: true, //删除
      radio: "", //选中
      tableData: [],
      projectNameData: [],
      tableRow: {},
      showdialog: false,
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      tableParameter: {
        pageIndex: 0,
        pageSize: 10,
        plotId: "",
        warningDays: "",
      },
    };
  },
  components: {
    LessorInformationDialog,
    UTable,
    UTableColumn,
  },
  mounted() {
    this.queryAuthtorquest(); //项目名称查询
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
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
      //分页点击
      this.tableParameter.pageIndex = currentPage - 1;
      this.queryOrgan();
      this.radio = ""; //清空选中
    },
    rowClick(row) {
      //表格单行点击
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    add() {
      this.showdialog = true;
      this.$refs.PopChildren.getTableRow({}, 0);
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    update() {
      if (Object.keys(this.tableRow) != "") {
        this.showdialog = true;
        this.$refs.PopChildren.getTableRow(this.tableRow, 1);
      }
    },
    RefreshList(newRowObj) {
      //刷新
      this.tableRow = newRowObj;
      this.queryOrgan(); //查询列表数据
    },
    queryOrgan() {
      //查询表格数据
      queryEarlyWarning(this.tableParameter).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    queryAuthtorquest() {
      //项目名称
      queryPlotsWithAuthority().then((response) => {
        this.projectNameData = response;
        if (sessionStorage.getItem("plotItem") == null) {
          this.tableParameter.plotId = "";
          this.queryOrgan(); //查询列表
        } else {
          var parent = this.projectNameData;
          var children = JSON.parse(sessionStorage.getItem("plotItem"));
          var index = parent.findIndex(
            (d) =>
              d.GLCID === children.GLCID &&
              d.YXDID === children.YXDID &&
              d.dbName === children.dbName
          ); //寻找data的索引
          this.tableParameter.plotId = index >= 0 ? parent[index].plotId : "";
          this.queryOrgan(); //查询列表
        }
      });
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
            deleteEarlyWarning(this.tableRow).then((response) => {
              this.radio = ""; //清空选中
              this.queryOrgan();
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
    changeType(val) {
      //筛选类型改变事件
      this.tableParameter.taxpayer_identifier = "";
      this.tableParameter.lessor_identifier = "";
    },
    submit() {
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      this.radio = "";
      this.tableRow = "";
      this.queryOrgan();
    },
  },
};
</script>
<style lang="scss">
.LessorInformation {
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
