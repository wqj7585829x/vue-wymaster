<!-- 员工档案 -->
<template>
  <div class="el-body">
    <div class="el-title">
      <div v-if="ztreeDataSourceList && ztreeDataSourceList.length > 0">
        <!--树形组件-->
        <vuetree
          :list.sync="ztreeDataSourceList"
          :showInput="false"
          @getTreeData="getTreeData"
        ></vuetree>
      </div>
    </div>
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form
          :label-position="labelPosition"
          label-width="85px"
          :model="tableParameter"
          class="demo-form-inline"
        >
          <el-row :gutter="30">
            <el-col :span="5" style="width: 300px">
              <el-form-item label="姓名：">
                <el-input v-model="tableParameter.empName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 300px">
              <el-form-item label="登录账号：">
                <el-input v-model="tableParameter.account"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 300px">
              <el-form-item label="账号状态：" prop="status">
                <el-select v-model="tableParameter.status">
                  <el-option label="启用" :value="1"></el-option>
                  <el-option label="禁用" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="5" style="width: 300px">
              <el-form-item label="联系方式：">
                <el-input v-model="tableParameter.contactWay"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 300px">
              <el-form-item label="职位：">
                <el-select
                  v-model="tableParameter.job"
                  placeholder="请选择"
                  :disabled="disabledAdd"
                >
                  <el-option
                    v-for="item in getJobData"
                    :label="item.jobTitle"
                    :value="item.sysId"
                    :key="item.sysId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 300px">
              <el-form-item
                label="在离职情况："
                prop="status"
                label-width="100px"
              >
                <el-select v-model="tableParameter.resignationWay">
                  <el-option label="在职" :value="0"></el-option>
                  <el-option label="辞职" :value="1"></el-option>
                  <el-option label="辞退" :value="2"></el-option>
                  <el-option label="退休" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="width: 120px">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="searchContent"
                  v-has="'empQuery_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 搜索框end -->
      <section class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              @click="addContent()"
              :disabled="disabledAdd"
              :title="addTitle"
              v-has="'empAdd_has'"
              >入职</el-button
            >
            <el-button
              type="primary"
              @click="updateContent()"
              :disabled="disabledupdate"
              :title="updateTitle()"
              v-has="'empUpdate_has'"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="resigContent()"
              :disabled="disabledelete"
              :title="detelteTitle()"
              v-has="'empDelete_has'"
              >离职</el-button
            >
          </el-col>
        </el-row>
      </section>
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
          <el-table-column
            fixed
            prop="rownumber"
            label="序号"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="empName"
            label="姓名"
            width="150"
          ></el-table-column>
          <el-table-column label="性别" width="100">
            <template slot-scope="scope">
              {{ scope.row.sex == 0 ? "女" : "" }}
              {{ scope.row.sex == 1 ? "男" : "" }}
            </template>
          </el-table-column>
          <el-table-column prop="plotName" label="所属机构"></el-table-column>
          <el-table-column
            prop="depName"
            label="所属部门"
            width="150"
          ></el-table-column>
          <el-table-column label="账号状态" width="80">
            <template slot-scope="scope">
              {{ scope.row.status == 0 ? "禁用" : "" }}
              {{ scope.row.status == 1 ? "启用" : "" }}
            </template>
          </el-table-column>
          <el-table-column prop="account" label="登录账号" width="150">
            <!--<template slot-scope="scope">{{ scope.row.entryDate }}</template>-->
          </el-table-column>
          <el-table-column
            prop="jobTitle"
            label="职位"
            width="150"
          ></el-table-column>
          <el-table-column label="在离职情况" width="100">
            <template slot-scope="scope">
              {{ scope.row.resignationWay == 0 ? "在职" : "" }}
              {{ scope.row.resignationWay == 1 ? "辞职" : "" }}
              {{ scope.row.resignationWay == 2 ? "辞退" : "" }}
              {{ scope.row.resignationWay == 3 ? "退休" : "" }}
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div class="el-paginationR" v-if="returnTotal">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="tableParameter.pageSize"
            layout="prev, pager, next, jumper"
            :total="returnTotal"
          >
          </el-pagination>
        </div>
      </el-row>
      <!-- 弹窗入职 -->
      <Entry
        :entryShow.sync="entryShow"
        ref="Entrychildren"
        :getJobData="getJobData"
        :getTreeObj="getTreeObj"
        @RefreshItem="RefreshList"
      ></Entry>
      <!-- 弹窗 离职 -->
      <Registion
        :resigShow.sync="resigShow"
        ref="Regischildrens"
        @RefreshItem="RefreshList"
      ></Registion>
    </div>
  </div>
</template>
<script>
import Entry from "./components/EntryDialog";
import Registion from "./components/ResignationDialog";
import vuetree from "../../../components/Eltree/treeItem.vue";
import {
  getTree,
  getJob,
  getEmployee,
  Resignation,
} from "@/api/Organization/EmployeeProfile";
export default {
  name: "EmployeeProfile",
  data() {
    return {
      addTitle: "请选择部门", //入职按钮提示
      disabledAdd: true, //入职
      disabledupdate: true, //修改
      disabledelete: true, //离职
      labelPosition: "left",
      entryShow: false, //入职 修改
      resigShow: false, //离职
      radio: "",
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      dialogFormVisible: false, //默认不弹窗,
      getJobData: [], //获取职位
      getTreeObj: {}, //树形对象 传递给子组件
      tableData: [], //列表数组
      tableParameter: {
        //列表参数
        startRownumber: 0,
        pageSize: 10,
        orgId: null,
        agencyType: null,
        empName: null,
        account: null,
        contactWay: null,
        status: 1,
        job: null,
        resignationWay: null,
      }, //列表参数
      ztreeDataSourceList: [],
      tableRow: {
        uid: null,
        account: "",
        password: null,
        empName: "",
        sex: "",
        birthday: "",
        birthplace: "",
        mailbox: "",
        IDNumber: "",
        contactWay: "",
        status: 1,
        remark: "",
        empJob: "",
        empPost: "",
        entryDate: "",
        type: 0,
        belongClique: null,
        belongComp: null,
        belongPlot: null,
        belongDep: null,
        agencyType: null,
      },
    };
  },
  mounted() {
    this.getTreeFun();
    this.getEmployeeList();
  },
  components: {
    Entry,
    vuetree,
    Registion,
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        this.disabledupdate = false;
      } else {
        this.disabledupdate = true;
      }
    },
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.tableParameter.startRownumber =
        (currentPage - 1) * this.tableParameter.pageSize;
      this.getEmployeeList();
      this.clearTable();
    },
    rowClick(row) {
      console.log(JSON.stringify(row));
      if (row.resignationWay != 0) {
        this.disabledelete = true;
      } else {
        this.disabledelete = false;
      }
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    //入职
    addContent() {
      this.type = 0;
      this.entryShow = true;
      this.radio = ""; //选择后清空选中表格按钮
      this.disabledelete = true;
      this.$refs.Entrychildren.getTableRow({}, 0);
    },
    //修改
    updateContent() {
      this.type = 1;
      this.entryShow = true;
      this.$refs.Entrychildren.getTableRow(this.tableRow, 1);
      this.getJobFun(this.tableRow.depId);
    },
    //离职
    resigContent() {
      this.resigShow = true;
      var uid = this.tableRow.uid;
      this.$refs.Regischildrens.getTableRow({}, uid);
    },
    //获取单个点击树形数据
    getTreeData(val) {
      this.tableParameter.startRownumber = 0;
      this.currentPage = 1;
      //alert(JSON.stringify(val));
      this.getTreeObj = val;
      this.clearTable();
      this.tableParameter.orgId = val.orgId;
      this.tableParameter.agencyType = val.agencyType;
      //只有在部门下才能入职
      if (val.agencyType == 4) {
        this.disabledAdd = false;
        this.addTitle = ""; //按钮可以点击时候  不需要提示信息
        this.getJobFun(val.orgId);
      } else {
        this.disabledAdd = true;
      }
      this.getEmployeeList();
    },
    //获取左边树
    getTreeFun() {
      getTree().then((response) => {
        var data = response.returnData;
        this.ztreeDataSourceList = data;
      });
    },
    //获取职位
    getJobFun(oid) {
      var data = {};
      data.depId = oid;
      getJob(data).then((response) => {
        var data = response.returnData;
        this.getJobData = data;
      });
    },
    //获取列表数据
    getEmployeeList() {
      getEmployee(this.tableParameter).then((response) => {
        var data = response.returnData;
        this.returnTotal = response.returnTotal;
        this.tableData = data;
      });
    },
    RefreshList(newRowObj) {
      this.getEmployeeList();
      this.tableRow = newRowObj;
    },
    updateTitle() {
      //修改标题提示
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
    detelteTitle() {
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
    clearTable() {
      this.tableRow = {};
      this.radio = "";
      this.disabledelete = true;
    },
    searchContent() {
      this.clearTable();
      this.getEmployeeList();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-body {
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-paginationR {
    text-align: right;
    margin-top: 20px;
  }
  .el-radio__label {
    padding-left: 0;
  }
}
</style>
