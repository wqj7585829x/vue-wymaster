<template>
  <div class="container BillBook">
    <!-- 内容区域 -->
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form
          :label-position="labelPosition"
          label-width="85px"
          class="demo-form-inline"
        >
          <el-row :gutter="30">
            <el-col :span="3" style="width: 200px">
              <el-form-item label="" label-width="0">
                <el-select v-model="BillForm.type" @change="searchChange">
                  <el-option label="票据分类" value="票据分类"></el-option>
                  <el-option label="票据名称" value="票据名称"></el-option>
                  <el-option label="票据号" value="票据号"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="5" style="width: 200px">
              <el-form-item label="" label-width="0">
                <el-input
                  v-model="BillForm.PJLY_PJFL"
                  v-if="BillForm.type == '票据分类'"
                ></el-input>
                <el-input
                  v-model="BillForm.PJLY_PJMC"
                  v-if="BillForm.type == '票据名称'"
                ></el-input>
                <el-input
                  v-model="BillForm.PJLYMX_PJH"
                  v-if="BillForm.type == '票据号'"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="getTableData()"
                  v-has="'BillBookSearch_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 300px">
              <el-form-item label="票据状态">
                <el-select v-model="BillForm.PJLY_ZT" @change="typechange">
                  <el-option label="全部" value="全部"></el-option>
                  <el-option label="正使用" value="正使用"></el-option>
                  <el-option label="已用完" value="已用完"></el-option>
                  <el-option label="已核销" value="已核销"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 搜索框end -->

      <!-- 按钮begin -->
      <div class="button buttonBox">
        <el-button
          type="primary"
          @click="addTable"
          :disabled="isLazyLoad"
          v-has="'BillBookAdd_has'"
          >新增</el-button
        >
        <el-button
          type="primary"
          @click="eidtTable"
          :disabled="disableddo"
          v-has="'BillBookEdit_has'"
          >修改
        </el-button>
        <el-button
          type="danger"
          @click="deletePartition"
          :disabled="disableddo || isLazyLoad"
          v-has="'BillBookDel_has'"
        >
          删除
        </el-button>
      </div>
      <!-- 按钮end -->

      <!-- 客户详情begin -->
      <div class="customedetail">
        <el-table
          ref="singleTable"
          :data="tableData"
          max-height="500"
          border
          style="width: 100%"
          @row-click="rowclick"
          @expand-change="queryBillAmount"
        >
          <el-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form
                label-position="left"
                label-width="100px"
                inline
                class="demo-table-expand"
              >
                <el-form-item label="票据本总金额:">
                  <span class="expand-text">{{ props.row.PJBJE }}</span>
                </el-form-item>
                <el-form-item label="当前票据号:">
                  <span class="expand-text">{{ props.row.DQPJH }}</span>
                </el-form-item>
                <el-form-item label="已用票据号:">
                  <span class="expand-text">{{ props.row.YY }}</span>
                </el-form-item>
                <el-form-item label="未用票据号:">
                  <span class="expand-text">{{ props.row.WY }}</span>
                </el-form-item>
                <el-form-item label="作废票据号:">
                  <span class="expand-text">{{ props.row.ZF }}</span>
                </el-form-item>
                <el-form-item label="共计:">
                  <span class="expand-text">{{ props.row.GJ }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="PJLY_PJMC" label="票据名称" width="250">
          </el-table-column>
          <el-table-column prop="PJLY_PJFL" label="票据分类" width="150">
          </el-table-column>
          <el-table-column prop="PJLY_ZT" label="票据状态" width="150">
          </el-table-column>
          <el-table-column prop="PJLY_SSNY" label="所属年月" width="150">
          </el-table-column>
          <el-table-column prop="PJLY_PJLX" label="票据类型" width="150">
          </el-table-column>
          <el-table-column
            prop="PJLY_SYR"
            label="使用人"
            width="200"
            :formatter="formatterPJLY_SYR"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="PJLY_LSHCD" label="流水号长度" width="150">
          </el-table-column>
          <el-table-column prop="PJLY_MAX" label="最大号" width="150">
          </el-table-column>
          <el-table-column prop="PJLY_MIN" label="最小号" width="150">
          </el-table-column>
          <el-table-column prop="PJLY_ZDJE" label="最大金额" width="150">
          </el-table-column>
          <el-table-column prop="PJLY_ZDHS" label="最大行度" width="150">
          </el-table-column>
          <el-table-column prop="PJLY_GRPJ" label="是否购入票据" width="150">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.PJLY_GRPJ"
                :disabled="true"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="PJLY_CJSJ" label="创建时间" width="200">
          </el-table-column>
          <el-table-column prop="PJLY_BBMC" label="报表名称" width="150">
          </el-table-column>
          <el-table-column
            prop="PJLY_ZDHQPJH"
            label="自动获取票据号"
            width="150"
          >
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.PJLY_ZDHQPJH"
                :disabled="true"
              ></el-checkbox>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="" fixed="right" label="使用人" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="Userfunc(scope.row)" size="small">查看</el-button>
            </template>
          </el-table-column> -->
          <el-table-column prop="" fixed="right" label="详情" width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="detailsfunc(scope.row)"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <BillDialog
      :show.sync="show"
      ref="BillDialog"
      @RefreshItem="RefreshList"
    ></BillDialog>
    <detailDialog
      :detailshow.sync="detailshow"
      ref="detailDialog"
    ></detailDialog>
    <UserDialog :Usershow.sync="Usershow" ref="UserDialog"></UserDialog>
  </div>
</template>
<script>
import {
  queryBillBook,
  queryBillAmount,
  deleteBillBook,
  judgmentDeleteBill,
  getBillDistributeType,
} from "@/api/FeeManagement/BillManagement";
import BillDialog from "./components/BillDialog"; //新增总表,修改
import detailDialog from "./components/detailDialog"; //详情
import UserDialog from "./components/UserDialog"; //用户详情
export default {
  name: "BillBook",
  data() {
    return {
      labelPosition: "left",
      tableData: [], //列表参数
      disableddo: true,
      radio: "", //单选按钮
      tableRow: {}, //选中数据
      show: false, //新增 弹框 标识
      detailshow: false, //详情 弹框 标识
      Usershow: false, //用户 弹框 标识
      BillForm: {
        type: "票据分类",
        PJLY_ZT: "正使用",
        PJLY_PJFL: "",
        PJLY_PJMC: "",
        PJLYMX_PJH: "",
      },
      BillNum: {},
      isLazyLoad: true,
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
  mounted() {
    this.getTableData();
    getBillDistributeType().then((response) => {
      this.isLazyLoad = response.bill_distribute_type === 1 ? false : true;
    });
  },
  methods: {
    formatterPJLY_SYR(row, column) {
      var data = row.PJLY_SYR ? row.PJLY_SYR : "";
      if (data.charAt(data.length - 1) == ";") {
        data = data.substring(0, data.length - 1);
      }
      return data.replace(/;/g, "、");
    },
    rowclick(row) {
      //单行点击单选按钮选中
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      // this.getBillNum(row)
    },
    searchChange() {
      this.BillForm.PJLY_PJFL = "";
      this.BillForm.PJLY_PJMC = "";
      this.BillForm.PJLYMX_PJH = "";
    },
    typechange() {
      this.getTableData();
    },
    detailsfunc(row) {
      this.detailshow = true;
      this.$refs.detailDialog.getPartitionData(row.PJLY_ZJ);
    },
    Userfunc(row) {
      this.Usershow = true;
      this.$refs.UserDialog.getPartitionData(row.PJLY_SYR);
    },
    UserEditfunc(row) {
      this.UserEditshow = true;
      this.$refs.UserEditDialog.getTreeFun();
    },
    // 表数据
    getTableData() {
      queryBillBook(this.BillForm).then((response) => {
        this.tableData = response;
        // this.getBillNum(response[0])
      });
    },
    //票据本总金额查询当前票据号
    getBillNum(val) {
      queryBillAmount(val).then((response) => {
        this.BillNum = response[0];
      });
    },
    // 加载票据本展开明细
    queryBillAmount(row, expandedRows) {
      // 没值才加载
      if (!row.DQPJH) {
        queryBillAmount(row).then((response) => {
          let data = response.data;
          row.DQPJH = data.DQPJH;
          row.GJ = data.GJ;
          row.PJBJE = data.PJBJE;
          row.WY = data.WY;
          row.YY = data.YY;
          row.ZF = data.ZF;
          this.$refs.singleTable.doLayout();
        });
      }
    },
    //新增总表
    addTable() {
      this.show = true;
      this.$refs.BillDialog.getPartitionData({}, 0);
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    //编辑总表
    eidtTable() {
      this.show = true;
      this.$refs.BillDialog.getPartitionData(this.tableRow, 1, this.isLazyLoad);
    },
    // 删除总表
    deletePartition() {
      judgmentDeleteBill(this.tableRow).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              deleteBillBook(this.tableRow).then((response) => {
                this.radio = ""; //选择后清空选中表格按钮
                this.tableRow = {}; //选择后清空选中表格数据
                this.RefreshList();
              });
            })
            .catch(() => {
              this.radio = ""; //清空选中
            });
        } else {
          this.$message.error("该票据本已有票据号使用过，不能删除，请检查！");
        }
      });
    },
    RefreshList(newobj) {
      this.tableRow = newobj;
      this.getTableData();
    },
  },
  components: {
    BillDialog,
    detailDialog,
    UserDialog,
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
  text-align: left;
  padding: 0 52px;
  width: 500px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.expand-text {
  position: relative;
  top: 3px;
}
</style>
<style>
.container .el-input-number {
  width: auto;
}
.BillBook .el-button--small {
  width: inherit !important;
}
</style>
