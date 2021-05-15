<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="设置分摊组户"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item>
              <div class="el-transfer-table">
                <p class="el-transfer-table__header">选择分摊组</p>
                <div class="el-transfer-table__search">
                  <el-input
                    placeholder="请输入分摊组名称"
                    v-model="value"
                    clearable
                  ></el-input>
                </div>
                <div class="el-transfer-table__body">
                  <el-table
                    :data="groupTableData"
                    ref="multipleTable"
                    @row-click="rowClick"
                    border
                    style="width: 100%"
                    height="235"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column fixed type="selection" width="50">
                    </el-table-column>
                    <el-table-column
                      label="分摊组名称"
                      prop="groupName"
                    ></el-table-column>
                  </el-table>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="2">
                  <img :src="require('@/assets/repairImgs/right.png')" alt="" class="el-transfer-table__img">
                </el-col> -->
          <el-col :span="12">
            <div class="el-transfer-table">
              <p class="el-transfer-table__header">对应户</p>
              <div class="el-transfer-table__body">
                <el-table
                  :data="tableData"
                  border
                  style="width: 100%"
                  height="290"
                >
                  <el-table-column
                    label="客户名称"
                    prop="cusName"
                  ></el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  PubRepFundGroup_selectByProject,
  PubRepFundProject_selectGroupR,
} from "@/api/PublicRepair/UseManage"; //js

export default {
  data() {
    return {
      visible: this.showGroup,
      groupTable: [], // 分摊组 表 数据
      value: "", // 搜索 分摊组
      tableData: [], // 对应户 表 数据
      multipleSelection: [], //多选 数组
      obj: {
        pubProjectID: null,
        belongPlot: null,
        groupID: null,
      },
    };
  },
  props: {
    showGroup: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showGroup() {
      this.visible = this.showGroup;
    },
    multipleSelection() {
      this.getTableData();
    },
  },
  computed: {
    groupTableData() {
      var _this = this;
      return this.groupTable.filter(function (dataNews) {
        return Object.keys(dataNews).some(function (key) {
          return String(dataNews[key]).indexOf(_this.value) > -1;
        });
      });
    },
  },
  methods: {
    getData(data) {
      this.obj = data;
      this.tableData = [];
      this.getGroupTableData();
    },
    // 获取 分摊组
    getGroupTableData() {
      PubRepFundGroup_selectByProject(this.obj).then((response) => {
        this.groupTable = response.returnData;
        var rows = [];
        this.groupTable.forEach((item) => {
          if (item.check) {
            rows.push(item);
          }
        });
        this.$nextTick(() => {
          this.toggleSelection(rows);
        });
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      }
    },
    // 点击 行
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 获取 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取 对应户
    getTableData() {
      var groupID = "";
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((item) => {
          groupID += item.groupID + ",";
        });
      } else {
        this.tableData = [];
        return;
      }
      this.obj.groupID = groupID.substr(0, groupID.length - 1);
      PubRepFundProject_selectGroupR(this.obj).then((response) => {
        this.tableData = response.returnData[0].groupRList;
      });
    },
    // 确定
    sure() {
      this.$emit("RefreshItem", this.obj.groupID);
      this.cancle();
    },
    // 取消
    cancle() {
      this.$emit("update:showGroup", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-transfer-table {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  display: inline-block;
  vertical-align: middle;
  max-height: 100%;
  width: 100%;
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
  &__body {
    max-height: 290px;
    /deep/ .el-table thead {
      line-height: 22px;
    }
  }
  &__search {
    width: 250px;
    text-align: left;
    padding: 10px;
    /deep/ .el-input__inner {
      border-radius: 17.5px;
    }
  }
  // &__img {
  //   margin-top: 130px;
  // }
}
</style>
