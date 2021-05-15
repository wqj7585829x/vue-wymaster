<!-- 收款方式 -->
<template>
  <div class="PaymentMethodRealtor">
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select" ref="elResourece">
        <el-form label-width="120px">
          <el-row :gutter="30">
            <el-col :span="6" style="width: 300px">
              <el-form-item label="项目名称:" label-width="70px">
                <el-select v-model="tableParameter.name" @change="PlotChange">
                  <el-option
                    v-for="(item, index) in userPlot"
                    :key="index"
                    :value="item.GLCNAME"
                    :label="item.GLCNAME"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="width: 0">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'PaymentRealtorQuery_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              class="btn_multiple"
              :title="setDefaultTitle"
              @click="setPayment"
              v-has="'PaymentRealtorDefault_has'"
              >设置默认收款方式</el-button
            >
            <el-button
              type="primary"
              class="btn_multiple"
              @click="canclePayment"
              v-has="'PaymentRealtorCancle_has'"
            >
              取消默认收款方式</el-button
            >
            <el-button
              type="primary"
              @click="addPaymentWay()"
              v-has="'PaymentRealtorAdd_has'"
              >新增</el-button
            >
            <el-button
              type="primary"
              @click="editPaymentWay()"
              :disabled="disabledupdate"
              :title="updateTitle()"
              v-has="'PaymentRealtorUpdate_has'"
              >修改
            </el-button>
            <el-button
              type="danger"
              @click="deletePaymentWay()"
              :disabled="disabledupdate"
              :title="updateTitle()"
              v-has="'PaymentRealtorDel_has'"
              >删除
            </el-button>
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
      :name="tableParameter.name"
      @RefreshItem="RefreshList"
    >
    </paydialog>
    <!--修改弹窗 end-->
    <!--设置默认收款方式 start-->
    <defaultDialog
      :showDefalutdialog.sync="showDefalutdialog"
      ref="Defalultchildren"
      @RefreshItem="RefreshList"
      :name="tableParameter.name"
    >
    </defaultDialog>
    <!--设置默认收款方式 end-->
  </div>
</template>
<script>
import paydialog from "./components/PaymentWayDialog";
import defaultDialog from "./components/defalutPayDialog";
import {
  queryPaymentMethodPageApi,
  deletePaymentMethodApi,
  updateDefaultPaymentMethodApi,
} from "@/api/Realtor/ParameterSetRealtor"; //参数设置js
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["currentPlot", "userPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  data() {
    return {
      tableOnceData: {},
      radio: "",
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      showdialog: false, //默认不弹窗,
      showDefalutdialog: false, //默认设置收款方式隐藏
      disabledupdate: true, //修改 删除按钮 默认不可用
      disabledSet: true, //设置默认收款方式按钮  默认不可用
      disabledCancle: true, //取消默认收款方式按钮  默认不可用
      setDefaultTitle: "", //设置默认收款方式按钮 标题提示
      tableData: [],
      tableParameter: {
        //列表参数
        pageIndex: 0,
        pageSize: 10,
      },
      name: "",
    };
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        this.disabledupdate = false;
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
      }
    },
    currentPlot() {
      this.tableParameter.name = this.currentPlot; //监听//当前选中的小区
    },
    userPlot() {
      this.userPlot.forEach((item) => {
        if (item.GLCNAME == this.currentPlot) {
          this.tableParameter.dbName = item.dbName;
          this.tableParameter.GLCID = item.GLCID;
          this.tableParameter.YXDID = item.YXDID;
          let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
          this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
          this.$nextTick(() => {
            this.getTabList();
          });
        }
      });
    },
  },
  mounted() {
    this.tableParameter.name = this.currentPlot; //监听//当前选中的小区
    this.userPlot.forEach((item) => {
      if (item.GLCNAME == this.currentPlot) {
        this.tableParameter.dbName = item.dbName;
        this.tableParameter.GLCID = item.GLCID;
        this.tableParameter.YXDID = item.YXDID;
        let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
        this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
        this.$nextTick(() => {
          this.getTabList();
        });
      }
    });
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
      queryPaymentMethodPageApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
        if (this.tableData.length > 0) {
          this.tableData.forEach((item) => {
            if (item.SFKM_SKFS == item.defaultMethodName) {
              item.isDefalutType = true;
              this.name = item.defaultMethodName;
            } else {
              item.isDefalutType = false;
            }
          });
        }
        this.returnTotal = response.total;
      });
    },
    PlotChange(val) {
      //项目名称改变事件
      if (val) {
        this.userPlot.forEach((item) => {
          if (item.GLCNAME == val) {
            this.tableParameter.dbName = item.dbName;
            this.tableParameter.GLCID = item.GLCID;
            this.tableParameter.YXDID = item.YXDID;
            let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
            this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
            this.getTabList();
          }
        });
      } else {
        this.tableParameter.dbName = "";
        this.tableParameter.GLCID = "";
        this.tableParameter.YXDID = "";
      }
    },
    submit() {
      this.tableParameter.pageIndex = 0;
      this.currentPage = 1;
      this.getTabList();
    },
    setPayment() {
      //设置默认收款方式
      this.showDefalutdialog = true;
    },
    canclePayment() {
      updateDefaultPaymentMethodApi(this.tableParameter).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.radio = ""; //清空选中
          this.name = ""; //清空默认收款方式
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
          deletePaymentMethodApi(
            this.tableOnceData.SFKM_ZJ,
            this.tableParameter
          ).then((response) => {
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

<style lang="scss">
.PaymentMethodRealtor {
  position: relative;
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
