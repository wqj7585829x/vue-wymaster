<template>
  <div class="batchRecharge">
    <el-dialog
      v-dialogDrag
      title="批量充值"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        :model="batchRechargeForm"
        :rules="rules"
        ref="batchRechargeForm"
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
                label="户帐名"
                prop="accountName"
              ></el-table-column>
              <el-table-column
                label="客户名称"
                width="100"
                prop="cusName"
              ></el-table-column>
              <el-table-column
                label="所属资源"
                width="100"
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
        <div class="el-bottom">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="公维金批量充值金额："
                label-width="155px"
                prop="money"
              >
                <el-input v-model="batchRechargeForm.money"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="备注：" label-width="155px">
                <el-input
                  type="textarea"
                  v-model="batchRechargeForm.remark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
import { number } from "@/utils/validate.js";
import {
  findAccountTable,
  batchRecharge,
} from "@/api/PublicRepair/HouseholdAccountManage"; //js

export default {
  data() {
    return {
      visible: this.showBatchRecharge,
      ztreeDataSourceList: [],
      tableData: [],
      batchRechargeForm: {
        money: null,
        remark: null,
        fundAccountID: null,
      },
      rules: {
        money: [
          { required: true, message: "请输入充值金额", trigger: "blur" },
          { validator: number, trigger: "blur" },
        ],
      },
    };
  },
  props: {
    showBatchRecharge: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showBatchRecharge() {
      this.visible = this.showBatchRecharge;
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
        this.getTableData(val);
      });
    },
    // 获取表格数据
    getTableData(val) {
      var data = {};
      data.belongPlot = val.plotid;
      data.partid = val.partid == 0 ? null : val.partid;
      data.buildid = val.buildid == 0 ? null : val.buildid;
      if (val.agencyType == 7) {
        data.roomid = val.orgId.substring(1, val.orgId.length);
      } else {
        data.roomid = null;
      }
      findAccountTable(data).then((response) => {
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
    //  传入数据
    getBatchRechargeData(data) {
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
    //   批量充值
    sure() {
      this.$refs.batchRechargeForm.validate((valid) => {
        if (valid) {
          if (this.multipleSelection.length > 0) {
            this.batchRechargeForm.fundAccountID = "";
            this.multipleSelection.forEach((item) => {
              this.batchRechargeForm.fundAccountID =
                this.batchRechargeForm.fundAccountID + item.fundAccountID + ",";
            });
            this.batchRechargeForm.fundAccountID = this.batchRechargeForm.fundAccountID.substr(
              0,
              this.batchRechargeForm.fundAccountID.length - 1
            );
            batchRecharge(this.batchRechargeForm).then((response) => {
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
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:showBatchRecharge", false);
      this.$nextTick(() => {
        this.$refs.batchRechargeForm.resetFields(); //重置输入框提示
      });
    },
  },
  components: {
    vueZtree,
  },
};
</script>
<style lang="scss" scoped>
.batchRecharge /deep/ .el-dialog {
  width: 1000px;
}

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
.el-bottom {
  padding: 20px 0;
  border-top: 1px solid #eee;
}
</style>
