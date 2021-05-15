<template>
  <div class="resoureRight" v-show="ResourceShow">
    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button
        type="primary"
        @click="addResource"
        :disabled="disabledadd"
        v-has="'HouAdd_has'"
        >新增</el-button
      >
      <el-button
        type="primary"
        @click="updateResource"
        :disabled="disabledupdate"
        v-has="'HouEdit_has'"
        >修改</el-button
      >
      <el-button
        type="danger"
        @click="deleteResource"
        :disabled="disabledelete"
        v-has="'HouDel_has'"
        >删除</el-button
      >
    </div>
    <!-- 按钮end -->

    <!-- 名称 表begin -->
    <div class="resoureTable">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        @row-click="rowclick"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="HZ_ZH" label="户帐账户" width="200">
        </el-table-column>
        <el-table-column prop="HZ_SFMJ" label="收费面积" width="150">
        </el-table-column>
        <el-table-column prop="HZ_YE" label="余额" width="100">
        </el-table-column>
        <el-table-column prop="HZ_KYJE" label="可用金额" width="150">
        </el-table-column>
        <el-table-column prop="HZ_JZRQ" label="建帐日期" width="250">
        </el-table-column>
        <el-table-column prop="HZ_KHMC" label="客户名称"> </el-table-column>
      </el-table>
    </div>
    <!-- 名称 表 end -->

    <!-- 弹框 begin -->
    <ResourceDialog
      :show.sync="show"
      ref="ResourceDialog"
      @RefreshItem="RefreshList"
    ></ResourceDialog>
    <!-- 弹框 end -->
  </div>
</template>

<script>
import ResourceDialog from "./ResourceDialog"; //新增,删除
import {
  queryHouseholdAccount,
  deleteHouseholdAccount,
  getAddHouseholdAccountParameter,
} from "@/api/PublicRepairManager/HouseAccounts";

export default {
  data() {
    return {
      disabledadd: true,
      disabledupdate: true, //修改
      disabledelete: true, //删除
      ResourceShow: false, // 组件 显示
      show: false, // 弹框 显示
      title: "", // 标题
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      getTreeObj: {}, // 树对象 传递给 子组件
      tableData: [], //列表参数
      queryResourcePage: {},
      Utype: 1,
      addData: {
        KHDA_ZJ: "",
      },
    };
  },
  watch: {
    radio() {
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
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    // 获取  table  数据
    getTableDataList(val, type) {
      this.queryResourcePage = {
        FJZJ: type == 0 ? val.data.FJZJ : val.FJZJ,
        KHDA_ZJ: type == 0 ? "" : val.KHDA_ZJ,
      };
      this.ResourceShow = true;
      this.currentPage = 1;
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      if (type == 1) {
        this.addData.KHDA_ZJ = val.KHDA_ZJ;
        this.addData.FJDA_FJID = val.FJDA_FJID;
      }
      this.getTableData();
    },
    // 新增
    addResource() {
      this.show = true;
      this.AddHouseholdAccountParameter(this.addData);
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    // 修改
    updateResource() {
      this.show = true;
      this.$refs.ResourceDialog.getResourceData(this.tableRow, 1);
    },
    // 删除
    deleteResource() {
      var _this = this;
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteHouseholdAccount(this.tableRow).then((response) => {
            this.queryResourcePage.pageIndex = 0;
            this.currentPage = 1;
            this.radio = ""; //选择后清空选中表格按钮
            this.RefreshList({});
            this.$nextTick(() => {
              this.setAddbutton(_this.Utype);
            });
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    AddHouseholdAccountParameter(data) {
      getAddHouseholdAccountParameter(data).then((response) => {
        this.$refs.ResourceDialog.getResourceData(response, 0);
      });
    },
    setAddbutton(type) {
      //新增需要列表无数据才有权限
      this.Utype = type;
      setTimeout(() => {
        this.$nextTick(() => {
          if (type || this.tableData.length != 0) {
            this.disabledadd = true;
          } else {
            this.disabledadd = false;
          }
        });
      }, 50);
    },
    setZJ(data) {
      this.addData.KHDA_ZJ = data.KHDA_ZJ;
      this.addData.FJDA_FJID = data.FKGX_FJID;
    },
    // 表数据
    getTableData() {
      queryHouseholdAccount(this.queryResourcePage).then((response) => {
        this.tableData = response;
        this.returnTotal = response.total;
        this.$nextTick(() => {
          this.setAddbutton(this.Utype);
        });
      });
    },
    //刷新表数据
    RefreshList(newobj) {
      this.tableRow = newobj;
      this.getTableData();
    },
    // 修改标题提示
    updateTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
    // 删除标题提示
    detelteTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
  },
  components: {
    ResourceDialog,
  },
};
</script>

<style lang="scss" scoped>
.resoureTable {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
