<template>
  <div class="el-body">
    <div class="el-title">
      <div v-if="ztreeDataSourceList.length > 0">
        <vue-ztree
          :list.sync="ztreeDataSourceList"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          class="zree-w"
          @getTreeData="getTreeData"
        ></vue-ztree>
      </div>
    </div>
    <div class="el-content">
      <div class="tabletop">
        <!-- 按钮begin -->
        <div class="button buttonBox">
          <el-button
            type="primary"
            :disabled="disableadd"
            @click="addLadder"
            v-has="'LadAdd_has'"
            >手动梯登记</el-button
          >
          <el-button
            type="primary"
            :disabled="disableadd"
            @click="addLadderAM"
            v-has="'LadAMAdd_has'"
            >自动梯登记</el-button
          >
          <el-button
            type="primary"
            :disabled="disabledupdate"
            @click="updateLadder"
            v-has="'LadEdit_has'"
            >修改</el-button
          >
          <el-button
            type="primary"
            :disabled="disabledelete"
            @click="deleteLadder"
            v-has="'LadDel_has'"
            >删除</el-button
          >
          <el-button type="primary" @click="RelationEdit" v-has="'LadRela_has'"
            >梯户关系</el-button
          >
        </div>
        <!-- 按钮end -->

        <!-- 客户详情begin -->
        <div class="customedetail">
          <el-table
            ref="singleTable"
            :data="tableData"
            border
            style="width: 100%"
            @row-click="rowclick"
          >
            <el-table-column fixed label="选择" width="50">
              <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio"
                  >&nbsp;</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column prop="TB_TMC" label="梯名称" width="250">
            </el-table-column>
            <el-table-column prop="TB_TBH" label="梯编号" width="250">
            </el-table-column>
            <el-table-column prop="TB_TWZ" label="梯位置" width="250">
            </el-table-column>
            <el-table-column prop="TB_BZ" label="备注"> </el-table-column>
            <el-table-column prop="" fixed="right" label="对应户" width="100">
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
        <!-- 客户详情end -->
      </div>
    </div>

    <!-- 弹框 begin -->
    <LadderDialog
      :show.sync="show"
      ref="LadderDialog"
      @RefreshItem="RefreshList"
    ></LadderDialog>
    <LadderDialogAM
      :AMshow.sync="AMshow"
      ref="LadderAMDialog"
      @RefreshItem="RefreshList"
    ></LadderDialogAM>
    <LadderRelation
      :LRshow.sync="LRshow"
      ref="LadderRelation"
      @RefreshItem="RefreshList"
    ></LadderRelation>
    <DoorDetail :Dshow.sync="Dshow" ref="DoorDetail"></DoorDetail>
    <!-- 弹框 end -->
  </div>
</template>
<script>
import LadderDialog from "./components/LadderDialog"; //新增,修改
import LadderDialogAM from "./components/LadderDialogAM"; //自动生成
import LadderRelation from "./components/LadderRelation"; //梯户关系
import DoorDetail from "./components/DoorDetail"; //对应户
import vueZtree from "../../../components/Eltree/treeItem.vue";
import {
  queryLadderTree,
  queryLadder,
  deleteLadder,
} from "@/api/PublicRepairManager/LadderHouse";
import { defer } from "q";
export default {
  name: "LadderHouse",
  data() {
    return {
      ztreeDataSourceList: [], //资源树
      searchList: {
        TB_DLWJ: "",
        TB_GLQWJ: "",
        TB_tZJ: "",
      }, //列表搜索条件
      show: false, // 弹框 显示
      AMshow: false, // 弹框 显示
      LRshow: false, // 弹框 显示
      Dshow: false, // 弹框 显示
      tableData: [], //列表参数
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      disabledupdate: true, //修改
      disabledelete: true, //删除
      disableadd: true, //添加梯
      editData: {},
      treeid: "",
    };
  },
  mounted() {
    this.getTreeFun();
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
    getTreeFun(treeid) {
      //获取资源树
      var _this = this;
      queryLadderTree().then((response) => {
        var data = response;
        if (data) {
          _this.ztreeDataSourceList = data;
          this.$nextTick(() => {
            if (treeid) {
              this.$refs.dotree.setCheckTree(this.treeid);
            }
          });
        }
      });
    },
    detailsfunc(data, type) {
      this.Dshow = true;
      this.$refs.DoorDetail.getPartitionData({ TFGX_TWJ: data.TB_ZJ });
    },
    getTreeData(val, node) {
      this.treeid = val.id;
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.tableData = [];
      this.searchList.FCDM_LX = val.data.FCDM_LX;
      if (val.data.FCDM_LX == "大楼") {
        this.searchList.TB_DLWJ = val.data.FCDM_ZJ;
        this.searchList.TB_ZJ = "";
        this.getTableData();
        this.disableadd = false;
        var parents = node.parent.data.data;

        this.editData = val.data;
        this.editData.FCDM_GLQID = parents.FCDM_ID;
        this.editData.FCDM_GLQZJ = parents.FCDM_ZJ;
        this.editData.FCDM_FGLX = parents.FCDM_FGLX;
        this.editData.FCDM_GLQMC = parents.FCDM_MC;
      } else {
        this.disableadd = true;
      }
      if (val.data.FCDM_LX == "梯") {
        this.searchList.TB_DLWJ = "";
        this.searchList.TB_ZJ = val.data.FCDM_ZJ;
        this.getTableData();
      }
      if (val.data.FCDM_LX == "管理处") {
        this.searchList.TB_GLQWJ = "";
        this.searchList.TB_DLWJ = "";
        this.searchList.TB_tZJ = "";
      }
      if (val.data.FCDM_LX == "管理区") {
        this.searchList.TB_GLQWJ = val.data.FCDM_ZJ;
        this.searchList.TB_DLWJ = "";
        this.searchList.TB_tZJ = "";
      }
      if (val.data.FCDM_LX == "大楼") {
        this.searchList.TB_GLQWJ = "";
        this.searchList.TB_DLWJ = val.data.FCDM_ZJ;
        this.searchList.TB_tZJ = "";
      }
      if (val.data.FCDM_LX == "梯") {
        this.searchList.TB_GLQWJ = "";
        this.searchList.TB_DLWJ = "";
        this.searchList.TB_tZJ = val.data.FCDM_ZJ;
      }
      //资源树点击事件
    },
    // 新增
    addLadder() {
      this.show = true;
      this.$refs.LadderDialog.getPartitionData(
        {
          FCDM_ZJ: this.editData.FCDM_ZJ,
          FCDM_ID: this.editData.FCDM_ID,
          FCDM_GLQID: this.editData.FCDM_GLQID,
          FCDM_GLQZJ: this.editData.FCDM_GLQZJ,
          FCDM_FGLX: this.editData.FCDM_FGLX,
        },
        0
      );
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    // 新增生成
    addLadderAM() {
      this.AMshow = true;
      this.$refs.LadderAMDialog.initialize(this.editData, 0);
    },
    // 修改
    updateLadder() {
      this.show = true;
      this.$refs.LadderDialog.getPartitionData(this.tableRow, 1);
    },
    // 删除
    deleteLadder() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteLadder(this.tableRow).then((response) => {
            this.currentPage = 1;
            this.radio = ""; //选择后清空选中表格按钮
            this.RefreshList({});
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    // 表关系
    RelationEdit() {
      this.LRshow = true;
      this.$refs.LadderRelation.getPartitionData({
        TB_GLQWJ: this.searchList.TB_GLQWJ,
        TB_DLWJ: this.searchList.TB_DLWJ,
        TB_ZJ: this.searchList.TB_tZJ,
      });
    },
    // 表数据
    getTableData() {
      var data = JSON.parse(JSON.stringify(this.searchList));
      if (this.searchList.FCDM_LX == "梯") {
        data.TB_DLWJ = "";
      }
      queryLadder(data).then((response) => {
        this.tableData = response;
      });
    },
    //刷新表数据
    RefreshList(newobj) {
      this.tableRow = newobj;
      this.getTableData();
      this.getTreeFun(this.treeid);
    },
  },
  components: {
    vueZtree,
    LadderDialog,
    LadderDialogAM,
    LadderRelation,
    DoorDetail,
  },
};
</script>
<style lang="scss" scoped>
.el-body {
  height: 100%;
  width: 100%;
  overflow: inherit;
  padding-left: 220px;
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
    float: right;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 25px 30px 0 30px;
  }
}

.tabletop {
  padding: 0px 30px 0 30px;
}

.val {
  width: 170px;
  height: 35px;
}

.select {
  width: 100%;
}

.customedetail {
  width: 100%;
  overflow: auto;
}

.customedetail2 {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}

.tablebottom {
  border-top: 4px solid #eff0f0;
  padding: 16px 30px 0 30px;
}

.typechange {
  width: 106px;
  height: 35px;
  background: #ffffff;
  color: #2e8ad7;
}
.typecheck {
  background: #fff;
  color: #3a8ee6;
  border-color: #3a8ee6;
  border-radius: 0 !important;
  width: 102px;
}

.tablebody {
  padding: 0 30px;
}

.totalmoney {
  padding: 30px 30px 10px 30px;
  font-size: 14px;
  color: #666;
  text-align: left;
}

.table .el-table__row {
  height: 52px;
}

.table .el-table .current-row {
  background: #f3f7ff;
}

.table .cell {
  text-align: center;
}

.table .is-leaf {
  height: 52px;
  background: #eff0f0 !important;
}

.tree .el-scrollbar__wrap {
  margin-right: -10px !important;
}

.select .el-select {
  width: 100%;
}

.el-form-margin-bottom {
  margin-bottom: 20px;
}

.el-table .cell {
  text-decoration: underline;
}

.table-title {
  padding: 16px 0 10px 0;
  font-size: 18px;
  color: #666;
  text-align: center;
}
</style>

<style>
.customedetail .el-table__empty-text {
  left: 548px !important;
}
</style>
