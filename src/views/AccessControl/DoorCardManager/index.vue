<template>
  <div class="container">
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
              v-has="'DoorCardManagerAdd_has'"
              >新增</el-button
            >
            <el-button
              type="primary"
              @click="update()"
              :disabled="disabledupdate"
              v-has="'DoorCardManagerUpdate_has'"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="deleteTab()"
              :disabled="disabledelete"
              v-has="'DoorCardManagerDel_has'"
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
            prop="MJK_KH"
            label="卡号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="MJK_KMC"
            label="卡名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="MJK_CJR"
            label="创建人"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="MJK_YXQKSSJ"
            label="有效开始日期"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="MJK_YXQJSSJ"
            label="有效结束日期"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="MJK_CJSJ"
            label="创建时间"
            width="150"
          ></el-table-column>
          <el-table-column prop="MJK_BZ" label="备注"></el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div class="el-paginationR" v-if="returnTotal">
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
    <DoorCardDialog
      :showdialog.sync="showdialog"
      ref="PopChildren"
      @RefreshItem="RefreshList"
    ></DoorCardDialog>
  </div>
</template>
<script>
import DoorCardDialog from "./components/DoorCardDialog";
import {
  queryAccessControlCardApi,
  deleteAccessControlCardApi,
} from "@/api/AccessControl/DoorCardManager";
export default {
  name: "DoordeviceManager",
  data() {
    return {
      disabledAdd: false, //新增
      disabledupdate: true, //修改
      disabledelete: true, //删除
      radio: "", //选中
      tableData: [],
      tableRow: {},
      showdialog: false,
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      tableParameter: {
        pageIndex: 0,
        pageSize: 10,
      },
    };
  },
  components: {
    DoorCardDialog,
  },
  mounted() {
    this.queryOrgan(); //查询机构列表
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
    RefreshList() {
      //刷新
      this.radio = "";
      this.queryOrgan(); //查询列表数据F
    },
    queryOrgan() {
      //查询表格数据
      queryAccessControlCardApi(this.tableParameter).then((response) => {
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
            deleteAccessControlCardApi(this.tableRow.MJK_ZJ).then(() => {
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
}
</style>
