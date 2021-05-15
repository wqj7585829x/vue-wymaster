<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="批量建账"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :model="BatchAccountForm"
        ref="BatchAccountForm"
      >
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
          <div class="el-content">
            <el-table
              ref="multipleTable"
              :data="tableData"
              border
              @row-click="rowclick"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                label="客户名称"
                width="100"
                prop="cusName"
              ></el-table-column>
              <el-table-column
                label="所属资源"
                prop="resource"
              ></el-table-column>
              <el-table-column
                label="所属楼栋"
                width="100"
                prop="buildName"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vueZtree from "../../../../components/Eltree/treeItem.vue";
import {
  batchAccount,
  batchAdd,
} from "@/api/PublicRepair/HouseholdAccountManage"; //js

export default {
  data() {
    return {
      visible: this.showBatchAccount,
      ztreeDataSourceList: [], //左边树
      tableData: [], //表格数据
      clickOrgId: "", //选择的树
      multipleSelection: [], //多选 数据
      BatchAccountForm: {
        TenantRelationID: null,
      },
    };
  },
  props: {
    showBatchAccount: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showBatchAccount() {
      this.visible = this.showBatchAccount;
    },
  },
  methods: {
    // 点击 获取树节点数据
    getTreeData(val) {
      //获取树形数据
      if (val.agencyType == 1) {
        // 集团
        var v = [];
        if (val.children.length != 0) {
          for (var i1 = 0; i1 < val.children.length; i1++) {
            //公司
            var val1 = val.children[i1];
            if (val1.children.length != 0) {
              v = val1.children[0];
              break;
            }
          }
        }
        if (v.length == 0) {
          this.showMessage("该物业集团暂无小区");
          return;
        }
        val = v;
      } else if (val.agencyType == 2) {
        // 公司
        var v = [];
        if (val.children.length != 0) {
          v = val.children[0];
        }
        if (v.length == 0) {
          this.showMessage("该公司暂无小区");
          return;
        }
        val = v;
      }
      this.clickOrgId = val.orgId;
      this.$nextTick(() => {
        this.$refs.dotree.setCheckTree(this.clickOrgId);
        this.getTableData(val);
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
    // 获取表格数据
    getTableData(val) {
      var data = {};
      data.orgId = val.orgId.substring(1, val.orgId.length);
      data.agencyType = val.agencyType;
      batchAccount(data).then((response) => {
        this.tableData = response.returnData;
      });
    },
    // 行 点击
    rowclick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 获取 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 传入数据
    getBatchAccountData(data) {
      this.ztreeDataSourceList = data;
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
    },
    // 批量建账
    sure() {
      if (this.multipleSelection.length > 0) {
        this.BatchAccountForm.TenantRelationID = "";
        this.multipleSelection.forEach((item) => {
          this.BatchAccountForm.TenantRelationID =
            this.BatchAccountForm.TenantRelationID + item.tenanId + ",";
        });
        this.BatchAccountForm.TenantRelationID = this.BatchAccountForm.TenantRelationID.substr(
          0,
          this.BatchAccountForm.TenantRelationID.length - 1
        );
        batchAdd(this.BatchAccountForm).then((response) => {
          var data = response.returnData[0];
          if (data.status) {
            this.$emit("RefreshItem");
            this.cancle();
          }
        });
      } else {
        this.$message({
          message: "请选择表格数据",
          type: "error",
          duration: 2 * 1000,
        });
      }
    },
    // 取消
    cancle() {
      this.$emit("update:showBatchAccount", false);
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
.el-body {
  height: 400px;
  padding-left: 300px;
  .el-title {
    width: 300px;
    margin-left: -300px;
  }
}
</style>
