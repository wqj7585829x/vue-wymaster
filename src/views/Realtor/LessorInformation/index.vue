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
            <el-col :span="6" style="width: 300px">
              <el-form-item label="类型:" label-width="100px">
                <el-select
                  v-model="tableParameter.lessor_type"
                  placeholder="请选择类型"
                  @change="changeType"
                  clearable
                >
                  <el-option :value="1" label="个人"></el-option>
                  <el-option :value="2" label="公司"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 300px">
              <el-form-item label="名称:" label-width="100px">
                <el-input
                  v-model="tableParameter.company_name"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              style="width: 300px"
              v-if="tableParameter.lessor_type == 2"
            >
              <el-form-item label="纳税人识别号:" label-width="100px">
                <el-input
                  v-model="tableParameter.taxpayer_identifier"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              style="width: 300px; padding-right: 0"
              v-if="tableParameter.lessor_type == 1"
            >
              <el-form-item label="身份证号:" label-width="100px">
                <el-input
                  v-model="tableParameter.lessor_identifier"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 300px; padding-right: 0">
              <el-form-item label="电话:" label-width="100px">
                <el-input
                  v-model="tableParameter.company_phone"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="width: 0">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="submit()"
                  v-has="'LessorInformationQuery_has'"
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
              class="btn_multiple"
              :disabled="disableDefault"
              @click="setDefaultLess"
              v-has="'LessorSetDefault_has'"
              >设置默认出租方
            </el-button>
            <el-button
              type="primary"
              @click="add()"
              :disabled="disabledAdd"
              v-has="'LessorInformationAdd_has'"
              >新增
            </el-button>
            <el-button
              type="primary"
              @click="update()"
              :disabled="disabledupdate"
              :title="updateTitle()"
              v-has="'LessorInformationUpdate_has'"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="deleteTab()"
              :disabled="disabledelete"
              :title="detelteTitle()"
              v-has="'LessorInformationDelete_has'"
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
          <el-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="默认出租方" width="110">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.is_default"
                disabled
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="plotName"
            label="项目名称"
            width="250"
          ></el-table-column>
          <el-table-column label="类型" width="250">
            <template slot-scope="scope">
              {{ scope.row.lessor_type == 1 ? "个人" : "公司" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="company_name"
            label="名称"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="legal_representative"
            label="法定代表人"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="bank_name"
            label="开户行"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="receivingn_account"
            label="收款账号"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="lessor_identifier"
            label="身份证号"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="taxpayer_identifier"
            label="纳税人识别号"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="company_phone"
            label="电话"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="company_address"
            label="地址"
            width="250"
          ></el-table-column>
        </el-table>
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
  queryLessorInformationApi,
  deleteLessorInformationApi,
  defaultSettingsApi,
} from "@/api/Realtor/LessorInformation";
import { queryPlotsWithAuthorityApi } from "@/api/Realtor/CalculationClause";
export default {
  name: "LessorInformation",
  data() {
    return {
      disabledAdd: false, //新增
      disabledupdate: true, //修改
      disabledelete: true, //删除
      disableDefault: true, //设置默认出租方
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
        company_name: "",
        company_phone: "",
        taxpayer_identifier: "",
        plotId: "",
        lessor_type: "",
        lessor_identifier: "",
      },
    };
  },
  components: {
    LessorInformationDialog,
  },
  mounted() {
    this.queryOrgan(); //查询列表
    this.queryAuthtorquest(); //项目名称查询
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        this.disableDefault = false;
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
        this.disableDefault = true;
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
      queryLessorInformationApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
        if (this.tableData.length > 0) {
          this.tableData.forEach((item) => {
            item.is_default = item.is_default == 1 ? true : false;
          });
        }
        this.returnTotal = response.total;
      });
    },
    queryAuthtorquest() {
      //项目名称
      queryPlotsWithAuthorityApi().then((response) => {
        this.projectNameData = response;
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
            deleteLessorInformationApi(this.tableRow).then((response) => {
              this.radio = ""; //清空选中
              this.queryOrgan();
            });
          })
          .catch(() => {
            this.radio = ""; //清空选中
          });
      }
    },
    setDefaultLess() {
      //设置默认出租方
      defaultSettingsApi(this.tableRow).then((response) => {
        this.radio = ""; //清空选中
        this.queryOrgan();
      });
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
