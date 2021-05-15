<template>
  <div class="BillManagement">
    <div class="el-do">
      <div class="button">
        <el-button
          type="primary"
          @click="addBill"
          :disabled="buttonadd"
          v-has="'BillClassAdd_has'"
          >新增</el-button
        >
        <el-button
          type="primary"
          @click="editBill"
          :disabled="buttontype"
          v-has="'BillClassEdit_has'"
          >修改</el-button
        >
        <el-button
          type="danger"
          @click="deleteBill"
          :disabled="buttontype"
          v-has="'BillClassDel_has'"
          >删除</el-button
        >
      </div>
    </div>
    <div class="el-detail">
      <div class="el-title">
        <div v-if="ztreeDataSourceList.length > 0">
          <!--树形组件-->
          <vuetree
            :list.sync="ztreeDataSourceList"
            :is-open="true"
            ref="dotree"
            :is-check="false"
            :showInput="false"
            @getTreeData="getTreeData"
          ></vuetree>
        </div>
      </div>
      <div class="el-content">
        <keep-alive>
          <component :is="tempComponent" ref="children"></component>
        </keep-alive>
      </div>
    </div>

    <!-- 弹框 begin -->
    <BIllClassDialog
      :show.sync="show"
      ref="BIllClassDialog"
      @RefreshItem="RefreshList"
    ></BIllClassDialog>
    <!-- 弹框 end -->
  </div>
</template>

<script>
import vuetree from "../../../components/Eltree/treeItem.vue";
import BIllClass from "./components/BIllClass.vue"; //票据分类
import BIllClassDialog from "./components/BIllClassDialog"; //新增修改票据分类
import {
  orgTreeBill,
  deleteBillSort,
  countBillClassification,
} from "@/api/FeeManagement/BillManagement.js";
import { Message } from "element-ui";

export default {
  name: "BillClass",
  data() {
    return {
      tempComponent: "BIllClass",
      ztreeDataSourceList: [],
      CostItemshow: false, //弹窗表示
      buttonadd: true,
      buttontype: true,
      show: false,
      treeData: {},
    };
  },
  mounted() {
    this.getTreeFun();
  },
  methods: {
    // 获取树
    getTreeFun(type) {
      var _this = this;
      orgTreeBill().then((response) => {
        var data = response;
        if (data) {
          _this.ztreeDataSourceList = data;
        }
      });
    },
    //获取树形数据
    getTreeData(val) {
      this.treeData = val.data;
      if (val.data.SJZJ === "") {
        this.buttontype = true;
        this.buttonadd = false;
      } else {
        this.buttontype = false;
        this.buttonadd = true;
      }
      this.setDetail(val.data);
    },
    //设置详情
    setDetail(val) {
      this.$refs.children.getTableData(val);
    },
    //新增
    addBill() {
      this.show = true;
      this.$refs.BIllClassDialog.getPartitionData(this.treeData, 0);
    },
    //修改
    editBill() {
      countBillClassification(this.treeData).then((response) => {
        if (response.returnStatus == "FAIL") {
          this.$message.error("该票据分类已经被使用不能修改！");
          return;
        }
        this.show = true;
        this.$refs.BIllClassDialog.getPartitionData(this.treeData, 1);
      });
    },
    //删除
    deleteBill() {
      countBillClassification(this.treeData).then((response) => {
        if (response.returnStatus == "FAIL") {
          this.$message.error("该票据分类已经被使用不能删除！");
          return;
        }
        this.dotype = 3;
        this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteBillSort(this.treeData).then((response) => {
              this.RefreshList({});
            });
          })
          .catch(() => {});
      });
    },
    // 刷新数据
    RefreshList(val) {
      this.buttontype = true;
      this.getTreeFun();
      this.setDetail(val);
    },
  },
  components: {
    vuetree,
    BIllClass,
    BIllClassDialog,
  },
};
</script>

<style lang="scss" scoped>
.BillManagement {
  height: 100%;
  width: 100%;
  overflow: auto;
  background: #ffffff;
  border-radius: 5px;
  .el-title {
    height: 100%;
    float: left;
    width: 220px;
    margin-left: -220px;
    padding: 0 17px;
    overflow: auto;
    border-right: 1px solid #f1f1f1;
  }
  .el-content {
    position: relative;
    float: right;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 10px 10px 0 10px;
  }
  .el-do {
    height: 100px;
    width: 100%;
    padding: 20px 30px;
  }

  .el-detail {
    height: 100%;
    width: 100%;
    overflow: auto;
    padding-left: 220px;
    border-top: 1px solid #f1f1f1;
  }

  .el-content {
    position: relative;
  }

  .button {
    margin-top: 10px;
  }
}
</style>
