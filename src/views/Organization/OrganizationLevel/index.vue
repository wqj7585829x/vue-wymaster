<template>
  <div class="container">
    <!-- 右边内容区域 -->
    <div class="el-content">
      <!-- 按钮操作 -->
      <section class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button type="primary" @click="synchronize()" v-if="isShowSync"
              >数据同步</el-button
            >
            <el-button
              type="primary"
              @click="add()"
              :disabled="disabledAdd"
              :title="addTitle"
              v-has="'OrganizationLevelAdd_has'"
              >新增</el-button
            >
            <el-button
              type="primary"
              @click="update()"
              :disabled="disabledupdate"
              :title="updateTitle()"
              v-has="'OrganizationLevelUpate_has'"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="deleteTab()"
              :disabled="disabledelete"
              :title="detelteTitle()"
              v-has="'OrganizationLevelDel_has'"
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
            prop="JGJB_BH"
            label="编号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="JGJB_JBH"
            label="级别号"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="JGJB_MC"
            label="名称"
            width="200"
          ></el-table-column>
          <el-table-column prop="JGJB_MS" label="描述"></el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div class="el-paginationR" v-if="returnTotal">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="tableParameter.pageSize"
            layout="total,sizes,prev, pager, next, jumper"
            :total="returnTotal"
          >
          </el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 弹窗 单列布局start -->
    <OrgLeveDialog
      :showdialog.sync="showdialog"
      ref="PopChildren"
      @RefreshItem="RefreshList"
    ></OrgLeveDialog>
  </div>
</template>
<script>
import OrgLeveDialog from "./components/OrganizationLevelDialog";
import {
  queryOrgLevel,
  DeleteOrgLevel,
} from "@/api/Organization/OrganizationLevel";
export default {
  name: "OrganizationLevel",
  data() {
    return {
      disabledAdd: false, //新增
      disabledupdate: true, //修改
      disabledelete: true, //删除
      radio: "", //选中
      tableData: [],
      tableRow: {
        JGJB_ZJ: null,
        JGJB_BH: null,
        JGJB_JBH: null,
        JGJB_MC: null,
        JGJB_MS: null,
      },
      showdialog: false,
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      tableParameter: {
        pageIndex: 0,
        pageSize: 10,
      },
      addTitle: "新增", //新增按钮 提示信息,
      CheckOrgId: null, //选择部门  默认选中id
      SupName: "", //上级机够名称
      ClickOrgId: null, //记录点击过的id
      isShowSync: false, //默认隐藏数据同步按钮
    };
  },
  components: {
    OrgLeveDialog,
  },
  mounted() {
    this.queryOrgan(); //查询机构列表
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        if (this.tableRow.JGJB_YS) {
          //如果日默认的数据则不可删除与修改
          this.disabledupdate = true;
          this.disabledelete = true;
        } else {
          this.disabledupdate = false;
          this.disabledelete = false;
        }
      } else {
        this.disabledupdate = true;
        this.disabledelete = true;
      }
    },
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.tableParameter.pageSize = val;
      this.queryOrgan();
    },
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
      queryOrgLevel(this.tableParameter).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
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
            DeleteOrgLevel(this.tableRow).then((response) => {
              this.tableParameter.pageIndex = 0; //分页重置第一页
              this.currentPage = 1; //分页重置第一页
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
  },
};
</script>
<style lang="scss" scoped>
.container {
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
