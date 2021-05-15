<template>
  <div class="container RoomManager">
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select_search">
        <el-form label-width="105px">
          <el-row :gutter="30">
            <el-col :span="5" style="width: 320px">
              <el-form-item label="状态:">
                <el-select v-model="tableParameter.STATE">
                  <el-option label="全部" :value="3"></el-option>
                  <el-option label="审核中" :value="0"></el-option>
                  <el-option label="审核通过" :value="1"></el-option>
                  <el-option label="审核不通过" :value="2"></el-option>
                  <el-option label="业主取消成功" :value="11"></el-option>
                  <el-option label="家庭成员取消成功" :value="12"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 320px">
              <el-form-item label="申请人手机号:">
                <el-input
                  oninput="value=value.replace(/[^\d]/g,'')"
                  :maxlength="11"
                  v-model="tableParameter.FJSH_SQRSJH"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 320px">
              <el-form-item label="申请人身份证号:">
                <el-input
                  v-model="tableParameter.FJSH_SFZH"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 320px">
              <el-form-item label="房间名称:">
                <el-input
                  v-model="tableParameter.FJSH_FJMC"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 320px">
              <el-form-item label="开始时间：">
                <el-date-picker
                  v-model="tableParameter.FJSH_SQSJ_begin"
                  type="datetime"
                  placeholder="开始时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 320px">
              <el-form-item label="结束时间：">
                <el-date-picker
                  v-model="tableParameter.FJSH_SQSJ_end"
                  type="datetime"
                  placeholder="结束时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="width: 320px">
              <el-form-item label-width="0">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'RoomManagerQuery_has'"
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
              v-has="'RoomManagerPass_has'"
              >审核通过
            </el-button>
            <el-button
              type="primary"
              :disabled="disableShow"
              @click="nopassClick"
              v-has="'RoomManagerNoPass_has'"
              >审核不通过
            </el-button>
            <el-button
              type="primary"
              :disabled="disableBackShow"
              @click="backClick"
              >强制回退
            </el-button>
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
          @selection-change="changeFun"
          @row-click="rowClick"
          ref="multipleTable"
        >
          <el-table-column
            label="选择"
            type="selection"
            fixed
            @selection-change="changeFun"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="FJSH_XQMC"
            label="小区名称"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="FJSH_LDMC"
            label="楼栋名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="FJSH_FJMC"
            label="房间名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="FJSH_SQRSJH"
            label="申请人手机号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="FJSH_YZMC"
            label="业主名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="FJSH_YZSJH"
            label="业主手机号"
            width="150"
          ></el-table-column>
          <el-table-column prop="STATE" label="状态" width="150">
            <template slot-scope="scope">
              {{ scope.row.STATE === 0 ? "审核中" : "" }}
              {{ scope.row.STATE === 1 ? "审核通过" : "" }}
              {{ scope.row.STATE === 2 ? "审核不通过" : "" }}
              {{ scope.row.STATE === 11 ? "业主取消成功" : "" }}
              {{ scope.row.STATE === 12 ? "家庭成员取消成功" : "" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="FJSH_SFZH"
            label="身份证号"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="FJSH_SQSJ"
            label="申请时间"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="FJSH_SHSJ"
            label="审核时间"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="FJSH_SHR"
            label="审核人"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="FJSH_SQR"
            label="申请人"
            width="100"
          ></el-table-column>

          <el-table-column
            prop="FJSH_SQSM"
            label="申请说明"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="FJSH_YYZGX"
            label="与业主关系"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="FJSH_JGSM"
            label="结果说明"
            width="200"
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
  queryRoomAudit,
  auditPass,
  cancelRoomAuditApi,
} from "@/api/BasicManagement/RoomManager"; //房间管理
import NonPassDialog from "./components/NonPassDialog";
import { currDate } from "@/utils/global.js";
export default {
  name: "RoomManager",
  data() {
    return {
      disableShow: true,
      disableBackShow: true, //强制回退按钮默认隐藏
      tableData: [], //表格数据
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      tableParameter: {
        //搜索列表参数
        STATE: 3,
        FJSH_SQRSJH: null,
        FJSH_SFZH: null,
        FJSH_FJMC: null,
        FJSH_SQSJ_begin: null,
        FJSH_SQSJ_end: null,
        pageIndex: 0,
        pageSize: 10,
      },
      time: [],
      showNopassdialog: false,
      multipleSelection: [],
      recoredSH: true, //记录选中的数据是否包含除审核中的数据
      recoredBack: true, //记录选中的数据是否包含除审核通的数据
    };
  },
  watch: {
    multipleSelection() {
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((item) => {
          if (item.STATE != 0) {
            this.recoredSH = false;
            this.disableShow = true;
          }
          if (item.STATE != 1) {
            this.recoredBack = false;
            this.disableBackShow = true;
          }
        });
        if (this.recoredSH) {
          //如果选中的数据都是审核中的
          this.disableShow = false;
        } else {
          this.recoredSH = true;
        }
        if (this.recoredBack) {
          this.disableBackShow = false;
        } else {
          this.recoredBack = true;
        }
      } else {
        this.disableBackShow = true;
        this.disableShow = true;
      }
    },
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      //列表数据查询
      queryRoomAudit(this.tableParameter).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    handleCurrentChange(currentPage) {
      this.tableParameter.pageIndex = currentPage - 1;
      this.getTableList();
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row); //单击表格复选框选中
    },
    changeFun(val) {
      this.multipleSelection = val;
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
      var list = [];
      this.$confirm("是否通过所选项？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.multipleSelection.forEach((item) => {
            var obj = {};
            obj = item;
            obj.FJSH_JGSM = "申请通过";
            list.push(obj);
          });
          auditPass(list).then((response) => {
            this.getTableList();
          });
        })
        .catch(() => {});
    },
    nopassClick() {
      this.showNopassdialog = true;
      this.$refs.nopassChildren.getData(this.multipleSelection);
    },
    backClick() {
      var list = [];
      this.$confirm("是否强制回退？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.multipleSelection.forEach((item) => {
            var obj = {};
            obj.FJSH_ZJ = item.FJSH_ZJ;
            obj.FJSH_SHSJ = item.FJSH_SHSJ;
            obj.FJSH_SQR = item.FJSH_SQR;
            list.push(obj);
          });
          cancelRoomAuditApi(list).then((response) => {
            this.getTableList();
          });
        })
        .catch(() => {});
    },
    RefreshList() {
      this.getTableList();
    },
    submit() {
      this.getTableList();
    },
  },
  components: {
    NonPassDialog,
  },
};
</script>
<style lang="scss" scoped>
.RoomManager {
  .select_search {
    .el-select {
      width: 100%;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
  }
}
</style>
