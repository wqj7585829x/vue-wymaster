<!-- 收款方式 -->
<template>
  <div class="payment-way">
    <div class="el-content">
      <div class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              class="btn_multiple"
              :title="setDefaultTitle"
              @click="setPayment"
              v-has="'ParamePaymentSetDeaultWay_has'"
              >设置默认收款方式</el-button
            >
            <el-button
              type="primary"
              class="btn_multiple"
              @click="canclePayment"
              v-has="'ParamePaymentCancelWay_has'"
            >
              取消默认收款方式
            </el-button>
            <el-button
              type="primary"
              @click="addPaymentWay()"
              v-has="'ParamePaymentAdd_has'"
              >新增</el-button
            >
            <el-button
              type="primary"
              @click="editPaymentWay()"
              :disabled="disabledupdate"
              :title="updateTitle()"
              v-has="'ParamePaymentUpdate_has'"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="deletePaymentWay()"
              :disabled="disabledDel"
              :title="updateTitle()"
              v-has="'ParamePaymentDel_has'"
              >删除</el-button
            >
          </el-col>
        </el-row>
      </div>
      <el-row class="sysCon_Mt">
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          class="tableContent"
          @row-click="rowClick"
        >
          <el-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="默认收款方式" width="110">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.isDefalutType"
                disabled
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="是否有效" width="110">
            <template slot-scope="scope">
              {{ scope.row.SFKM_SFYX ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="SFKM_SKFSLX"
            label="收款方式类型"
          ></el-table-column>
          <el-table-column prop="SFKM_SKFS" label="收款方式"></el-table-column>
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
    <!--新增 修改弹窗 start-->
    <paydialog
      :showdialog.sync="showdialog"
      ref="children"
      @RefreshItem="RefreshList"
    ></paydialog>
    <!--修改弹窗 end-->
    <!--设置默认收款方式 start-->
    <defaultDialog
      :showDefalutdialog.sync="showDefalutdialog"
      ref="Defalultchildren"
      @RefreshItem="RefreshList"
    >
    </defaultDialog>
    <!--设置默认收款方式 end-->
  </div>
</template>
<script>
import paydialog from "./components/PaymentWayDialog";
import defaultDialog from "./components/defalutPayDialog";
import {
  queryPaymentWay,
  delPaymentWay,
  updateDefaultPayment,
} from "@/api/FeeManagement/ParameterSettings";
export default {
  data() {
    return {
      tableOnceData: {},
      radio: "",
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      showdialog: false, //默认不弹窗,
      showDefalutdialog: false, //默认设置收款方式隐藏
      disabledupdate: true, //修改 删除按钮 默认不可用
      disabledDel: true, //删除 删除按钮 默认不可用
      disabledSet: true, //设置默认收款方式按钮  默认不可用
      disabledCancle: true, //取消默认收款方式按钮  默认不可用
      setDefaultTitle: "", //设置默认收款方式按钮 标题提示
      tableData: [],
      tableParameter: {
        //列表参数
        pageIndex: 0,
        pageSize: 10,
      },
    };
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        this.disabledDel = false;
        if (this.tableOnceData.isDefalutType) {
          this.disabledupdate = false;
        } else {
          this.disabledupdate = true;
        }
        if (this.tableOnceData.SFKM_SKFSLX == "收取") {
          this.disabledSet = false;
          this.setDefaultTitle = "";
        } else {
          this.disabledSet = true;
          this.setDefaultTitle = "只有收款方式类型为收取的才能设置默认收款方式";
        }
        if (this.tableOnceData.isDefalutType) {
          //只有是默认收款方式的选项才可以取消
          this.disabledCancle = false;
        } else {
          this.disabledCancle = true;
        }
      } else {
        this.disabledCancle = true;
        this.disabledupdate = true;
        this.disabledDel = true;
      }
    },
  },
  methods: {
    handleCurrentChange(currentPage) {
      //分页点击
      this.tableParameter.pageIndex = currentPage - 1;
      this.getTabList();
      this.radio = ""; //清空选中
    },
    rowClick(row) {
      this.tableOnceData = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    getTabList() {
      //获取列表数据
      queryPaymentWay(this.tableParameter).then((response) => {
        this.tableData = response.data;
        if (this.tableData.length > 0) {
          this.tableData.forEach((item) => {
            if (item.SFKM_SKFS == item.defaultMethodName) {
              item.isDefalutType = true;
            } else {
              item.isDefalutType = false;
            }
          });
        }
        this.returnTotal = response.total;
      });
    },
    setPayment() {
      //设置默认收款方式
      this.showDefalutdialog = true;
    },
    canclePayment() {
      var data = {};
      data.SFKM_ZJ = "";
      data.defaultMethodName = "";
      updateDefaultPayment(data).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.radio = ""; //清空选中
          this.getTabList();
        }
      });
    },
    addPaymentWay() {
      //新增
      this.radio = ""; //选择后清空选中表格按钮
      this.showdialog = true;
      this.$refs.children.getRow({}, 0);
    },
    editPaymentWay() {
      //修改
      this.showdialog = true;
      this.$refs.children.getRow(this.tableOnceData, 1);
    },
    deletePaymentWay() {
      //删除
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delPaymentWay(this.tableOnceData.SFKM_ZJ).then((response) => {
            this.tableParameter.pageIndex = 0; //点击树重置第一页0
            this.currentPage = 1; //点击树重置第一
            this.radio = ""; //清空选中
            this.getTabList();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    closePaymentWay() {
      //关闭按钮
      this.$emit("closePay");
    },
    getRowTable() {
      this.getTabList();
    },
    RefreshList(newRowObj) {
      //刷新列表
      this.radio = "";
      this.getTabList();
      this.tableOnceData = newRowObj; //弹窗确定后更新表格选中值
      if (this.tableOnceData.SFKM_SKFSLX == "收取") {
        this.disabledSet = false;
        this.setDefaultTitle = "";
      } else {
        this.disabledSet = true;
        this.setDefaultTitle = "只有收款方式类型为收取的才能设置默认收款方式";
      }
    },
    updateTitle() {
      //设置默认收款方式 修改 删除提示
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
  },
  components: {
    paydialog,
    defaultDialog,
  },
};
</script>

<style lang="scss" scoped>
.payment-way {
  position: relative;
  .el-content {
    padding: 30px 30px 0 30px;
  }
  .el-input__inner {
    width: 100%;
  }
  .el-paginationR {
    text-align: right;
    margin-top: 20px;
  }
  .el-radio__label {
    padding: 0;
  }
  .gb_img {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
  }
}
</style>
