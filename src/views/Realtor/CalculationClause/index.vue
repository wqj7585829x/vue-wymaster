<template>
  <div class="CalculationClause">
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
              v-has="'CalculationClauseAdd_has'"
              >新增</el-button
            >
            <el-button
              type="primary"
              @click="update()"
              :disabled="disabledupdate"
              :title="updateTitle()"
              v-has="'CalculationClauseUpdate_has'"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="deleteTab()"
              :disabled="disabledelete"
              :title="detelteTitle()"
              v-has="'CalculationClauseDelete_has'"
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
            prop="itemName"
            label="项目名称"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="charge_item"
            label="收费项目"
            width="250"
          ></el-table-column>
          <el-table-column label="计价类型">
            <template slot-scope="scope">
              {{ scope.row.price_type == 1 ? "日总价" : ""
              }}{{ scope.row.price_type == 2 ? "月总价" : ""
              }}{{ scope.row.price_type == 3 ? "季度总价" : ""
              }}{{ scope.row.price_type == 4 ? "半年总价" : "" }}
              {{ scope.row.price_type == 5 ? "年总价" : ""
              }}{{ scope.row.price_type == 6 ? "日单价" : ""
              }}{{ scope.row.price_type == 7 ? "月单价" : ""
              }}{{ scope.row.price_type == 8 ? "季度单价" : "" }}
              {{ scope.row.price_type == 9 ? "半年单价" : ""
              }}{{ scope.row.price_type == 10 ? "年单价" : "" }}
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
          <!-- <el-table-column label="计费周期">
            <template slot-scope="scope">
              {{ scope.row.pricing_cycle == 1?'按自然月':'' }}{{ scope.row.pricing_cycle == 2?'按周期':'' }}
            </template>
          </el-table-column> -->
          <!-- <el-table-column prop="calculate_type" label="月费用计算方式">
            <template slot-scope="scope">
              {{ scope.row.calculate_type == 1?'日单价*天数':'' }}{{ scope.row.calculate_type == 2?'月单价*出租面积':'' }}{{ scope.row.calculate_type == 3?'日单价*出租面积*天数':'' }}{{ scope.row.calculate_type == 4?'年总价/12':'' }}
            </template>
          </el-table-column> -->
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
    <ClauseDialog
      :showdialog.sync="showdialog"
      ref="PopChildren"
      @RefreshItem="RefreshList"
    ></ClauseDialog>
  </div>
</template>
<script>
import ClauseDialog from "./components/ClauseDialog";
import {
  queryPricingTermSettingApi,
  deletePricingTermSettingApi,
} from "@/api/Realtor/CalculationClause";
export default {
  name: "CalculationClause",
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
    ClauseDialog,
  },
  mounted() {
    this.queryOrgan(); //查询列表
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
      queryPricingTermSettingApi(this.tableParameter).then((response) => {
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
            deletePricingTermSettingApi(this.tableRow).then((response) => {
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
.CalculationClause {
  margin: 20px 20px 30px;
}
</style>
