<template>
  <div class="container DoorKeyReview_new">
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form label-width="110px">
          <el-row :gutter="30">
            <el-col :span="6" style="width: 270px">
              <el-form-item label="状态:" label-width="70px">
                <el-select v-model="tableParameter.RYMJQX_ZT">
                  <el-option label="全部" :value="3"></el-option>
                  <el-option label="审核中" :value="0"></el-option>
                  <el-option label="审核通过" :value="1"></el-option>
                  <el-option label="审核不通过" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 270px">
              <el-form-item label="申请人:" label-width="70px">
                <el-input
                  v-model="tableParameter.RYMJQX_XM"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 270px">
              <el-form-item label="手机号:" label-width="70px">
                <el-input
                  oninput="value=value.replace(/[^\d]/g,'')"
                  :maxlength="11"
                  v-model="tableParameter.RYMJQX_SJH"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 270px">
              <el-form-item label="身份证号:" label-width="70px">
                <el-input
                  v-model="tableParameter.RYMJQX_SFZH"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="width: 0">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'PassManagerQuery_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 按钮区域start -->
      <section class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              :disabled="disableShow"
              @click="passClick"
              v-has="'PassKeyReviewPass_has'"
              >审核通过
            </el-button>
            <el-button
              type="primary"
              :disabled="disableShow"
              @click="nopassClick"
              v-has="'PassKeyReviewNoPass_has'"
            >
              审核不通过</el-button
            >
            <el-button
              type="primary"
              :disabled="disableRevokeShow"
              @click="revokeClick"
              >撤销</el-button
            >
          </el-col>
        </el-row>
      </section>
      <!-- 按钮区域end -->
      <!-- 表格列表start -->
      <section>
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
          <!-- <el-table-column prop="GLCNAME" label="小区名称" width="200"></el-table-column> -->
          <el-table-column
            prop="DLDA_DLMC"
            label="楼栋名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="FJDA_FJMC"
            label="房间名称"
            width="150"
          ></el-table-column>
          <el-table-column prop="RYMJQX_ZT" label="状态" width="150">
            <template slot-scope="scope">
              {{ scope.row.RYMJQX_ZT == 0 ? "审核中" : ""
              }}{{ scope.row.RYMJQX_ZT == 1 ? "审核通过" : ""
              }}{{ scope.row.RYMJQX_ZT == 2 ? "审核不通过" : "" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="RYMJQX_XM"
            label="申请人"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="RYMJQX_SJH"
            label="手机号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="RYMJQX_SFZH"
            label="身份证号"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="RYMJQX_SQSJ"
            label="申请时间"
            width="160"
          ></el-table-column>
          <el-table-column label="正面照" width="160">
            <template slot-scope="scope">
              <el-popover placement="top-start" title="" trigger="hover">
                <img
                  :src="scope.row.RYMJQX_RLURL"
                  alt=""
                  style="width: 150px; height: 150px"
                />
                <img
                  slot="reference"
                  :src="scope.row.RYMJQX_RLURL"
                  style="width: 30px; height: 30px"
                />
              </el-popover>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="MJSQ_SHR" label="审批人" width="160"></el-table-column> -->
          <el-table-column
            prop="RYMJQX_SHSJ"
            label="审批时间"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="RYMJQX_SHYJ"
            label="审批不通过原因"
            width="160"
          ></el-table-column>
        </el-table>
        <!-- 分页 -->
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
      </section>
    </div>
    <!-- 审核不通过弹窗 start -->
    <NonPassDialog
      :showNopassdialog.sync="showNopassdialog"
      ref="nopassChildren"
      @RefreshItem="RefreshList"
    >
    </NonPassDialog>
    <!-- 审核不通过弹窗end -->
  </div>
</template>
<script>
import {
  elqueryEntranceGuardKeyApi,
  elupdateEntranceGuardKeyApi,
  deleteEntranceGuardKeyApi,
} from "@/api/AccessControl/DoorKeyReview"; //门禁权限审核
import NonPassDialog from "./components/NonPassDialog";
import { currDate } from "@/utils/global.js";
export default {
  name: "DoorKeyReview_new",
  data() {
    return {
      disableShow: true,
      disableRevokeShow: true, //默认撤销按钮不可点击
      radio: "",
      tableData: [], //表格数据
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      tableParameter: {
        //搜索列表参数
        pageIndex: 0,
        pageSize: 10,
        RYMJQX_ZT: 3,
        RYMJQX_XM: "",
        RYMJQX_SJH: "",
        RYMJQX_SFZH: "",
      },
      time: [],
      detailRow: {},
      showNopassdialog: false,
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disableRevokeShow = false;
        if (this.detailRow.RYMJQX_ZT == 0) {
          this.disableShow = false;
        }
      } else {
        this.disableShow = true;
        this.disableRevokeShow = true;
      }
    },
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      //列表数据查询
      elqueryEntranceGuardKeyApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    handleCurrentChange(currentPage) {
      this.tableParameter.pageIndex = currentPage - 1;
      this.getTableList();
      this.radio = ""; //选择后清空选中表格按钮
      this.detailRow = {}; //选择后清空选中表格数据
    },
    rowClick(row) {
      this.detailRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    timeChange(val) {
      if (val) {
        this.tableParameter.FJSH_SQSJ_begin = val[0];
        this.tableParameter.FJSH_SQSJ_end = val[1];
      } else {
        this.tableParameter.FJSH_SQSJ_begin = null;
        this.tableParameter.FJSH_SQSJ_end = null;
      }
    },
    passClick() {
      this.$confirm("是否通过所选项？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          elupdateEntranceGuardKeyApi(this.detailRow, 1).then((response) => {
            this.radio = ""; //选择后清空选中表格按钮
            this.detailRow = {}; //选择后清空选中表格数据
            this.getTableList();
          });
        })
        .catch(() => {});
    },
    nopassClick() {
      this.showNopassdialog = true;
      this.$refs.nopassChildren.getData(this.detailRow.RYMJQX_ID);
    },
    revokeClick() {
      //撤销
      this.$confirm("是否撤销所选项？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteEntranceGuardKeyApi(this.detailRow, 2).then((response) => {
            this.radio = ""; //选择后清空选中表格按钮
            this.detailRow = {}; //选择后清空选中表格数据
            this.getTableList();
          });
        })
        .catch(() => {});
    },
    RefreshList() {
      this.radio = ""; //选择后清空选中表格按钮
      this.detailRow = {}; //选择后清空选中表格数据
      this.getTableList();
    },
    submit() {
      this.radio = ""; //选择后清空选中表格按钮
      this.detailRow = {}; //选择后清空选中表格数据
      this.getTableList();
    },
  },
  components: {
    NonPassDialog,
  },
};
</script>
