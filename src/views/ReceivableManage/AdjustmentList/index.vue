<template>
  <div class="container">
    <!-- 搜索框start -->
    <section class="searchBox">
      <el-form label-width="105px" :model="queryPage">
        <el-row :gutter="30">
          <el-col :span="6" style="width: 300px">
            <el-form-item label="楼栋名称：">
              <el-select
                v-model="queryPage.DLDA_ZJ"
                placeholder="请选择"
                @change="BuildChange"
                clearable
              >
                <el-option
                  v-for="item in BuildArray"
                  :key="item.DLDA_ZJ"
                  :label="item.DLDA_DLMC"
                  :value="item.DLDA_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="资源名称：">
              <el-select
                v-model="queryPage.FJDA_ZJ"
                placeholder="请选择"
                :disabled="
                  queryPage.DLDA_ZJ == undefined || queryPage.DLDA_ZJ == ''
                "
                clearable
              >
                <el-option
                  v-for="item in RoomArray"
                  :key="item.FJDA_ZJ"
                  :label="item.FJDA_FJMC"
                  :value="item.FJDA_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="收费项目：">
              <el-select
                v-model="queryPage.SFXM_ZJ"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in ChargeItemsArray"
                  :key="item.SFXM_ZJ"
                  :label="item.SFXM_SFXMMC"
                  :value="item.SFXM_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="起始年月：">
              <el-date-picker
                v-model="queryPage.startMonth"
                format="yyyy-MM"
                value-format="yyyy-MM"
                type="month"
                placeholder="请选择"
                style="width: 165px"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="截止年月：">
              <el-date-picker
                v-model="queryPage.endMonth"
                format="yyyy-MM"
                value-format="yyyy-MM"
                type="month"
                placeholder="请选择"
                style="width: 165px"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="审核状态：">
              <el-select
                v-model="queryPage.YSLB_SHZT"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in StatusArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-form-item label-width="0px">
              <el-button
                type="success"
                @click="search"
                v-has="'AdjustmentListSearch_has'"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <!-- 搜索框end -->
    <!-- 按钮操作 -->
    <section class="buttonBox">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="add" v-has="'AdjustmentListAdd_has'"
            >新增</el-button
          >
          <el-button
            type="primary"
            @click="edit"
            :disabled="disabledEdit"
            v-has="'AdjustmentListEdit_has'"
            >修改</el-button
          >
          <el-button
            type="danger"
            @click="del"
            :disabled="disabledDel"
            v-has="'AdjustmentListDel_has'"
            >删除</el-button
          >
          <el-button
            type="primary"
            @click="submitAudit"
            :disabled="disabledAudit"
            v-has="'AdjustmentListAudit_has'"
            >提交审核</el-button
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
        @selection-change="selectionChange"
      >
        <el-table-column label="选择" type="selection" fixed> </el-table-column>
        <el-table-column
          prop="YSLB_GLCMC"
          label="管理处名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_LDMC"
          label="楼栋名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_ZYMC"
          label="资源名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_ZYDZ"
          label="资源地址"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_YZDM"
          label="业主代码"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_YZMC"
          label="业主名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_ZHDM"
          label="租户代码"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_ZHMC"
          label="租户名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_SFMJ"
          label="收费面积"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_JSDJ"
          label="计算单价"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_SFXMMC"
          label="收费项目名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_FYSSNY"
          label="费用所属年月"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_FYQJ"
          label="费用期间"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_JEHS"
          label="金额（含税）"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_SL"
          label="税率"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_JEBHS"
          label="金额（不含税）"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_SE"
          label="税额"
          width="150"
        ></el-table-column>
        <el-table-column prop="YSLB_YSZT" label="应收状态" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.YSLB_YSZT === 1 ? "确认应收" : "未确认" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="YSLB_TZSM"
          label="调整说明"
          width="150"
        ></el-table-column>
        <el-table-column prop="YSLB_SHZT" label="审核状态" width="150">
          <template slot-scope="scope">
            <span
              >{{ scope.row.YSLB_SHZT === 0 ? "未审核" : ""
              }}{{ scope.row.YSLB_SHZT === 1 ? "审核中" : ""
              }}{{ scope.row.YSLB_SHZT === 2 ? "审核通过" : ""
              }}{{ scope.row.YSLB_SHZT === 3 ? "审核不通过" : "" }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
    <el-row>
      <span class="totalamount"
        ><span>金额(含税)合计：{{ YSLB_JEHS }}</span
        ><span>金额(不含税)合计：{{ YSLB_JEBHS }}</span></span
      >
      <span class="el-paginationR" v-if="queryPage.total">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="queryPage.currentPage"
          :page-size="queryPage.pageSize"
          layout="total,prev, pager, next, jumper"
          :total="queryPage.total"
        >
        </el-pagination>
      </span>
    </el-row>
    <!-- 弹窗 单列布局start -->
    <AddDialog
      :showdialog.sync="showdialog"
      ref="PopChildren"
      @RefreshItem="RefreshList"
    ></AddDialog>
  </div>
</template>

<script>
import {
  BuildArrayListApi,
  RoomArrayListApi,
  ChargeItemsArrayListApi,
  listApi,
  ReceivableListSumApi,
  DeleteApi,
  submitAuditApi,
} from "@/api/ReceivableManage/AdjustmentList";
import AddDialog from "./components/AddDialog";
export default {
  name: "AdjustmentList",
  data() {
    return {
      queryPage: {
        pageIndex: 0,
        pageSize: 10,
        currentPage: 1,
        total: null, //总共条数
      }, //搜索条件
      BuildArray: [],
      RoomArray: [],
      ChargeItemsArray: [],
      StatusArray: [
        { label: "未审核", value: 0 },
        { label: "审核中", value: 1 },
        { label: "审核通过", value: 2 },
        { label: "审核不通过", value: 3 },
      ],
      tableData: [],
      YSLB_JEHS: 0, //金额(含税)合计
      YSLB_JEBHS: 0, //金额(不含税)合计
      disabledEdit: true,
      disabledDel: true,
      disabledAudit: true,
      showdialog: false,
      multipleSelection: [], //选中数据
    };
  },
  components: {
    AddDialog,
  },
  computed: {},
  watch: {
    "queryPage.DLDA_ZJ"() {
      if (this.queryPage.DLDA_ZJ == "" || this.queryPage.DLDA_ZJ == undefined) {
        this.queryPage.FJDA_ZJ = "";
      }
    },
    multipleSelection() {
      if (this.multipleSelection.length) {
        this.disabledDel = false;
        if (this.multipleSelection.length == 1) {
          this.disabledEdit = false;
        } else {
          this.disabledEdit = true;
        }
        //提交审核按钮启用/禁用
        let num = 0;
        this.multipleSelection.forEach((item) => {
          if (item.YSLB_SHZT === 0 || item.YSLB_SHZT === 3) {
            //1代表审核中，才可以启用‘审核’按钮
            num++;
          }
        });
        if (this.multipleSelection.length == num) {
          this.disabledAudit = false; //启用‘审核’按钮
        } else {
          this.disabledAudit = true; //禁用用‘审核’按钮
        }
      } else {
        this.disabledEdit = true;
        this.disabledDel = true;
        this.disabledAudit = true;
      }
    },
  },
  mounted() {
    this.list(); //查询列表
    this.BuildArrayList(); //楼栋名称
    this.ChargeItemsArrayList(); //收费项目
  },
  methods: {
    BuildArrayList() {
      //楼栋名称
      BuildArrayListApi().then((response) => {
        if (response) {
          this.BuildArray = response;
        }
      });
    },
    BuildChange() {
      RoomArrayListApi(this.queryPage).then((response) => {
        if (response) {
          this.RoomArray = response;
        }
      });
    },
    ChargeItemsArrayList() {
      ChargeItemsArrayListApi().then((response) => {
        if (response) {
          this.ChargeItemsArray = response;
        }
      });
    },
    search() {
      this.queryPage.pageIndex = 0; //重置第一页
      this.queryPage.currentPage = 1; //重置第一页
      this.list();
    },
    list() {
      listApi(this.queryPage).then((response) => {
        this.tableData = response.data;
        this.queryPage.total = response.total;
      });
      this.ReceivableListSum(); //应收列表统计
    },
    ReceivableListSum() {
      //应收列表统计
      ReceivableListSumApi(this.queryPage).then((response) => {
        if (response) {
          this.YSLB_JEHS = response.YSLB_JEHS;
          this.YSLB_JEBHS = response.YSLB_JEBHS;
        }
      });
    },
    //分页页签切换
    handleCurrentChange(currentPage) {
      this.queryPage.pageIndex = currentPage - 1;
      this.list();
    },
    selectionChange(val) {
      //全选
      this.multipleSelection = val;
    },
    add() {
      //新增
      this.showdialog = true;
      this.$refs.PopChildren.getTableRow({}, 0);
    },
    edit() {
      //修改
      this.showdialog = true;
      this.$refs.PopChildren.getTableRow(this.multipleSelection[0], 1);
    },
    del() {
      //删除
      if (this.multipleSelection.length) {
        this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var obj = "";
            this.multipleSelection.forEach((item) => {
              obj += item.YSLB_ZJ + ",";
            });
            var objstr = obj.substring(0, obj.length - 1);
            DeleteApi(objstr).then((response) => {
              this.queryPage.pageIndex = 0; //点击树重置第一页
              this.queryPage.currentPage = 1; //点击树重置第一页
              this.list(); //数据库列表查询
            });
          })
          .catch(() => {});
      }
    },
    submitAudit() {
      //审核
      if (this.multipleSelection.length) {
        var obj = "";
        this.multipleSelection.forEach((item) => {
          obj += item.YSLB_ZJ + ",";
        });
        var objstr = obj.substring(0, obj.length - 1);
        submitAuditApi(objstr).then((response) => {
          if ((response.returnStatus = "SUCCESS")) {
            this.list();
          }
        });
      }
    },
    RefreshList(newRowObj) {
      //刷新
      this.list(); //查询列表
    },
  },
};
</script>
<style lang="scss" scoped>
.totalamount {
  float: left;
  margin-top: 20px;
  font-size: 14px;
  span {
    margin-right: 20px;
  }
}
.el-paginationR {
  float: right;
}
</style>
