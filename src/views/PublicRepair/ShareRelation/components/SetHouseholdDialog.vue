<template>
  <div class="set">
    <el-dialog
      v-dialogDrag
      title="设置户"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form label-width="85px">
        <div class="el-body">
          <div class="el-title">
            <div v-if="ztreeDataSourceList.length > 0">
              <!--树形组件-->
              <vue-ztree
                :list.sync="ztreeDataSourceList"
                :is-open="true"
                ref="dotree"
                :is-check="false"
                :showInput="false"
                @getTreeData="getTreeData"
              ></vue-ztree>
            </div>
          </div>
          <div class="transfer">
            <div class="el-transfer-table">
              <p class="el-transfer-table__header">待选记录</p>
              <div class="el-transfer-table__search">
                <el-input
                  placeholder="请输入内容"
                  v-model="waitingValue"
                  clearable
                ></el-input>
              </div>
              <div class="el-transfer-table__body">
                <el-table
                  :data="wTableData"
                  ref="leftTable"
                  @row-click="leftrowclick"
                  border
                  style="width: 100%"
                  max-height="340"
                  @selection-change="selectionlistleft"
                >
                  <el-table-column
                    type="selection"
                    width="50"
                  ></el-table-column>
                  <el-table-column
                    label="客户名称"
                    width="100"
                    prop="cusName"
                  ></el-table-column>
                  <el-table-column
                    label="所属资源"
                    prop="roomNo"
                  ></el-table-column>
                  <el-table-column
                    label="所属楼栋"
                    width="100"
                    prop="buildName"
                  ></el-table-column>
                </el-table>
              </div>
            </div>
            <div class="el-transfer-button">
              <el-button
                type="primary"
                icon="el-icon-arrow-left"
                circle
                @click="leftbutton()"
                :disabled="buttontyperight"
                :plain="buttontyperight"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-arrow-right"
                circle
                @click="rightbutton()"
                :disabled="buttontypeleft"
                :plain="buttontypeleft"
              ></el-button>
            </div>
            <div class="el-transfer-table">
              <p class="el-transfer-table__header">已选记录</p>
              <div class="el-transfer-table__search">
                <el-input
                  placeholder="请输入内容"
                  v-model="selectedValue"
                  clearable
                ></el-input>
              </div>
              <div class="el-transfer-table__body">
                <el-table
                  :data="yTableData"
                  ref="rightTable"
                  border
                  style="width: 100%"
                  max-height="340"
                  @row-click="rightrowclick"
                  @cell-click="handleCellClick"
                  @selection-change="selectionlistright"
                >
                  <el-table-column
                    type="selection"
                    width="50"
                  ></el-table-column>
                  <el-table-column
                    label="客户名称"
                    width="100"
                    prop="cusName"
                  ></el-table-column>
                  <el-table-column
                    label="所属资源"
                    prop="roomNo"
                  ></el-table-column>
                  <el-table-column
                    label="所属楼栋"
                    width="100"
                    prop="buildName"
                  ></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import vueZtree from "../../../../components/Eltree/treeItem.vue";
import {
  FindTreeByPlotPartBuildid,
  beSelect,
  selected,
  PubRepFundGroupR_add,
  PubRepFundGroupR_delete,
} from "@/api/PublicRepair/ShareRelation"; //js

export default {
  data() {
    return {
      visible: this.showSet,
      ztreeDataSourceList: [], // 左边树
      queryParameter: {
        plotid: null,
        partid: null,
        buildid: null,
        groupID: null,
        value: null,
      },
      tableData: [], //待选 表 数据
      selectedTableData: [], //已选 表 数据
      waitingValue: "", // 待选 搜索
      selectedValue: "", // 已选 搜索
      buttontyperight: true,
      buttontypeleft: true,
      checkboxlistleft: [], //待选记录-选中
      checkboxlistright: [], //已选记录-选中
    };
  },
  props: {
    showSet: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showSet() {
      this.visible = this.showSet;
    },
  },
  computed: {
    wTableData() {
      var _this = this;
      return this.tableData.filter(function (dataNews) {
        return Object.keys(dataNews).some(function (key) {
          return String(dataNews[key]).indexOf(_this.waitingValue) > -1;
        });
      });
    },
    yTableData() {
      var _this = this;
      return this.selectedTableData.filter(function (dataNews) {
        return Object.keys(dataNews).some(function (key) {
          return String(dataNews[key]).indexOf(_this.selectedValue) > -1;
        });
      });
    },
  },
  methods: {
    getData(data) {
      this.queryParameter = data;
      this.queryParameter.plotid = data.belongPlot;
      this.queryParameter.value = null;
      this.getTreeFun();
    },
    // 获取左边树
    getTreeFun() {
      FindTreeByPlotPartBuildid(this.queryParameter).then((response) => {
        var data = response.returnData;
        if (data) {
          this.ztreeDataSourceList = data;
          this.ztreeDataSourceList.forEach((item) => {
            item.iconClass = "TreePlotIcon";
            if (item.children.length != 0) {
              item.children.forEach((item) => {
                item.iconClass = "TreeHouseIcon";
                if (item.children.length != 0) {
                  item.children.forEach((item) => {
                    item.iconClass = "TreeBuildIcon";
                  });
                }
              });
            }
          });
          for (var i = 0; i < this.ztreeDataSourceList.length; i++) {
            var val = this.ztreeDataSourceList[i];
            if (val.children.length != 0) {
              for (var j = 0; j < val.children.length; j++) {
                var valChild = val.children[j].children;
                if (valChild.length != 0) {
                  this.getTreeData(valChild[0]);
                  break;
                }
              }
              break;
            }
          }
        }
      });
    },
    // 点击 树节点 获取数据
    getTreeData(val) {
      var b = val.orgId.substr(0, 1);
      if (b == "o") {
        // 小区
        var v = [];
        if (val.children.length != 0) {
          for (var i1 = 0; i1 < val.children.length; i1++) {
            //分区
            var val1 = val.children[i1];
            if (val1.children.length != 0) {
              v = val1.children[0];
              break;
            }
          }
        }
        if (v.length == 0) {
          this.showMessage("该小区暂无楼栋");
          return;
        }
        val = v;
      } else if (b == "p") {
        // 公司
        var v = [];
        if (val.children.length != 0) {
          v = val.children[0];
        }
        if (v.length == 0) {
          this.showMessage("该分区暂无楼栋");
          return;
        }
        val = v;
      } else if (b == "b") {
        this.queryParameter.buildid = val.orgId.substr(1, val.orgId.length - 1);
      }
      //获取树形数据
      this.$nextTick(() => {
        this.$refs.dotree.setCheckTree(val.orgId);
        this.gettable_beSelect();
        this.gettable_selected();
      });
    },
    // 提示信息
    showMessage(msg) {
      this.$message({
        message: msg,
        type: "error",
        duration: 2 * 1000,
      });
      this.$nextTick(() => {
        this.$refs.dotree.setCheckTree(this.clickOrgId);
      });
    },
    // 获取 待选 户
    gettable_beSelect() {
      beSelect(this.queryParameter).then((response) => {
        this.tableData = response.returnData;
      });
    },
    // 获取 已选 户
    gettable_selected() {
      selected(this.queryParameter).then((response) => {
        var data = response.returnData;
        if (data) {
          this.selectedTableData = data;
        }
      });
    },
    // 左边 表 行 点击
    leftrowclick(row) {
      this.$refs.leftTable.toggleRowSelection(row);
    },
    // 右边 表 行 点击
    rightrowclick(row) {
      this.$refs.rightTable.toggleRowSelection(row);
    },
    // 待选 记录选中列表
    selectionlistleft(val) {
      this.checkboxlistleft = val;
      if (val.length == 0) {
        this.buttontypeleft = true;
      } else {
        this.buttontypeleft = false;
      }
    },
    // 已选 记录选中列表
    selectionlistright(val) {
      this.checkboxlistright = val;
      if (val.length == 0) {
        this.buttontyperight = true;
      } else {
        this.buttontyperight = false;
      }
    },
    // 待选 添加到 已选记录
    rightbutton() {
      var olddatalist = this.checkboxlistleft;
      var json = {};
      var datalist = "";
      for (var item1 in olddatalist) {
        if (parseInt(item1) == olddatalist.length - 1) {
          datalist += olddatalist[item1].TenantRelationID;
        } else {
          datalist += olddatalist[item1].TenantRelationID + ",";
        }
      }
      json.groupID = this.queryParameter.groupID;
      json.TenantRelationID = datalist;
      PubRepFundGroupR_add(json).then((response) => {
        if (response.returnData[0].status == 1) {
          this.gettable_beSelect();
          this.gettable_selected();
        }
      });
    },
    // 已选 添加到 待选记录
    leftbutton() {
      var olddatalist = this.checkboxlistright;
      var datalist = "";
      for (var item1 in olddatalist) {
        if (parseInt(item1) == olddatalist.length - 1) {
          datalist += olddatalist[item1].groupRID;
        } else {
          datalist += olddatalist[item1].groupRID + ",";
        }
      }

      PubRepFundGroupR_delete({ groupRID: datalist }).then((response) => {
        if (response.returnData[0].status == 1) {
          this.gettable_beSelect();
          this.gettable_selected();
        }
      });
    },
    handleCellClick(row, column, cell, event) {
      if (this.oldtable != null) {
        this.$set(this.oldtable, "flag", false);
      }
      this.oldtable = row;
      this.$set(row, "flag", true);
      this.$nextTick(function () {
        if (cell.querySelector("input")) {
          cell.querySelector("input").select();
        }
      });
    },
    inputMouseblur(val) {
      //鼠标离开时间
      this.$set(val, "flag", false);
    },
    inputMousechange(val) {
      //输入框值改变
      this.$set(val, "flag", false);
    },
    // 取消
    cancle() {
      this.$emit("RefreshItem");
      this.$emit("update:showSet", false);
    },
  },
  components: {
    vueZtree,
  },
};
</script>
<style lang="scss" scoped>
.el-dialog-double /deep/ .el-dialog__body {
  padding: 0;
}
.set /deep/ .el-dialog {
  width: 1100px;
}
.el-body {
  height: 500px;
}
</style>
<style lang="scss" scoped>
.el-transfer-table {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  display: inline-block;
  vertical-align: middle;
  width: 385px;
  max-height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  &__header {
    height: 40px;
    line-height: 40px;
    background: #f5f7fa;
    margin: 0;
    padding-left: 15px;
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #000;
    text-align: left;
  }
  &__search {
    width: 250px;
    text-align: left;
    padding: 10px;
  }
  &__body {
    height: 365px;
  }
}

.el-transfer-button {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  display: inline-block;
  vertical-align: middle;
  width: 80px;
  max-height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}
</style>
<style>
.transfer {
  padding-top: 20px;
}
.el-transfer-table__search .el-input__inner {
  border-radius: 30px;
}
.transfer .el-transfer-button {
  border: 0;
  width: auto;
}

.transfer .el-button.is-circle {
  width: auto;
  display: block;
  margin: 10px;
}
</style>
