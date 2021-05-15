<template>
  <div class="SingleCalculationDialog">
    <el-dialog
      v-dialogDrag
      title="单个计算"
      :visible="dialogFormVisible"
      :close-on-click-modal="false"
      class="el-dialog-single"
      @close="cancelForm"
    >
      <el-form
        :label-position="labelPosition"
        label-width="115px"
        ref="tableForm"
        :rules="sureRules"
        :model="tableData"
      >
        <el-row>
          <el-col>
            <el-form-item label="计算方式：" prop="type">
              <el-radio-group v-model="tableData.type" @change="radiaoChange">
                <el-radio label="c">费用生成</el-radio>
                <el-radio label="d">删除费用</el-radio>w
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="费用开始年月：" prop="QSFYNY">
              <el-date-picker
                type="month"
                v-model="tableData.QSFYNY"
                placeholder="开始年月"
                format="yyyy-MM"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="费用结束年月：" prop="JZFYNY">
              <el-date-picker
                type="month"
                v-model="tableData.JZFYNY"
                placeholder="结束年月"
                format="yyyy-MM"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="checkH">
          <el-col>
            <el-form-item label="选择费用项目：" :rules="{ required: true }">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="checkedAllItem"
                >全选</el-checkbox
              >
              <el-tree
                :data="CaluTreeData"
                show-checkbox
                :props="defaultProps"
                class="paymentTree"
                node-key="id"
                ref="tree"
                @check-change="handleCheckChange"
              ></el-tree>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chargeGenerationAction">{{
          btnTitle
        }}</el-button>
        <el-button type="danger" @click="cancelForm">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { QuerySingleTree, addCosts } from "@/api/FeeManagement/NotReceipted";
import { queryDateType } from "@/api/FeeManagement/ParameterSettings";
import { currDate } from "@/utils/global.js";
export default {
  props: ["showdialogSing", "FKGX_ZJ"],
  data() {
    var validateStartDate = (rule, value, callback) => {
      if (value == "" || value == null) {
        callback(new Error("费用开始年月不能为空"));
      } else if (
        parseInt(value.split("-")[0] + value.split("-")[1]) <
        parseInt(
          this.yearAndMonth.split("-")[0] + this.yearAndMonth.split("-")[1]
        )
      ) {
        callback(new Error("费用开始年月不能小于当前年月  "));
      } else {
        callback();
      }
    };
    var validateEndDate = (rule, value, callback) => {
      if (value == "" || value == null) {
        callback(new Error("费用结束年月不能为空"));
      } else if (
        parseInt(value.split("-")[0] + value.split("-")[1]) <
        parseInt(
          this.tableData.QSFYNY.split("-")[0] +
            this.tableData.QSFYNY.split("-")[1]
        )
      ) {
        callback(new Error("费用结束年月不能小于费用开始年月"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: this.showdialogCost,
      labelPosition: "left",
      checkAll: false, // 全选
      isIndeterminate: false,
      defaultProps: {
        //树默认结构
        children: "children",
        label: "name",
      },
      tableData: {
        type: "c",
        FKGX_ZJ: null,
        SFXM_ZJ: null,
        CGBZ_ZJ: null,
        ZBBZ_ZJ: null,
        QSFYNY: null,
        JZFYNY: null,
      },
      CaluTreeData: [], //费用树
      sureRules: {
        QSFYNY: [
          { required: true, validator: validateStartDate, trigger: "change" },
        ],
        JZFYNY: [
          { required: true, validator: validateEndDate, trigger: "change" },
        ],
      },
      btnTitle: "生成", //按钮显示名称
      queryObj: {},
      selectType: 1, //1 按资源 2按客户,
      yearAndMonth: "",
      theWayTable: 1, //按年月  2按收费项目
    };
  },
  watch: {
    showdialogSing() {
      this.dialogFormVisible = this.showdialogSing;
      if (this.dialogFormVisible) {
        this.isIndeterminate = false;
        this.getChargeItem();
        this.getDateType();
      }
    },
  },
  methods: {
    getData(obj, type, theWayTable) {
      this.queryObj = obj;
      this.selectType = type;
      this.theWayTable = theWayTable; //按年月  2按收费项目
      if (this.tableData.type == "d") {
        this.btnTitle = "删除";
      } else {
        this.btnTitle = "生成";
      }
    },
    // 获取费用项目
    getChargeItem() {
      this.checkAll = false;
      QuerySingleTree().then((response) => {
        this.CaluTreeData = response;
      });
    },
    getDateType() {
      //获取收费年月
      queryDateType().then((response) => {
        this.yearAndMonth = response.data.yearAndMonth.yearAndMonth;
        this.tableData.QSFYNY = response.data.yearAndMonth.yearAndMonth;
        this.tableData.JZFYNY = response.data.yearAndMonth.yearAndMonth;
      });
    },
    // 费用项目 树 选择 change
    handleCheckChange(data, checked, indeterminate) {
      if (checked) {
        var ary = this.$refs.tree.getCheckedKeys();
        for (var i = 0; i < this.CaluTreeData.length; i++) {
          var item = this.CaluTreeData[i].id;
          if (ary.indexOf(item) === -1) {
            this.isIndeterminate = true;
            this.checkAll = false;
            break;
          } else {
            this.isIndeterminate = false;
            this.checkAll = true;
          }
        }
      } else {
        this.isIndeterminate = true;
        this.checkAll = false;
      }
    },
    // 全选
    checkedAllItem(val) {
      this.checkAll = val;
      this.isIndeterminate = false;
      if (val) {
        this.$refs.tree.setCheckedNodes(this.CaluTreeData);
      } else {
        this.$refs.tree.setCheckedNodes([]);
      }
    },
    // 生成费用
    chargeGenerationAction() {
      //项目树
      var chargeid = ""; //收费项目id
      var convenid = ""; //常规项目id
      var walkid = ""; //走表项目id
      var nodeArr = this.$refs.tree.getCheckedNodes();

      var newNodeArr = [];
      if (nodeArr.length > 0) {
        for (var i = 0; i < nodeArr.length; i++) {
          if (nodeArr[i].data.LX == 0) {
            //获取类型为0的id
            chargeid = chargeid + nodeArr[i].data.FYXMBZ_ZJ + ",";
            if (nodeArr[i].children.length > 0) {
              i = i + nodeArr[i].children.length;
            }
          } else {
            newNodeArr.push(nodeArr[i]); //获取父级未选中的id
          }
        }

        newNodeArr.forEach(function (item) {
          if (item.data.FYLB == "常规费用") {
            convenid = convenid + item.data.FYXMBZ_ZJ + ",";
          }
          if (item.data.FYLB == "走表费用") {
            walkid = walkid + item.data.FYXMBZ_ZJ + ",";
          }
        });
      } else {
        this.$message({
          message: "请选择费用项目",
          type: "warning",
        });
        return;
      }

      var data = {};
      var costId = "";
      data.FKGX_ZJ = this.FKGX_ZJ; //房客关系主键

      data.SFXM_ZJ = chargeid.substr(0, chargeid.length - 1); //收费项目id

      data.CGBZ_ZJ = convenid.substr(0, convenid.length - 1); //常规项目id
      data.ZBBZ_ZJ = walkid.substr(0, walkid.length - 1); //走表项目id

      data.QSFYNY = this.tableData.QSFYNY;
      data.JZFYNY = this.tableData.JZFYNY;
      data.type = this.tableData.type;

      //return;
      if (this.tableData.type == "c") {
        //费用生成
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            addCosts(data).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit(
                  "RefreshItem",
                  this.queryObj,
                  this.selectType,
                  this.theWayTable
                );
                this.cancelForm();
              }
            });
          } else {
            return false;
          }
        });
      } else {
        //费用删除
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            addCosts(data).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.$emit(
                  "RefreshItem",
                  this.queryObj,
                  this.selectType,
                  this.theWayTable
                );
                this.cancelForm();
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    cancelForm() {
      this.$emit("update:showdialogSing", false);
      this.$nextTick(() => {
        this.$refs.tableForm.resetFields(); //重置输入框提示
      });
    },
    radiaoChange(val) {
      if (val == "d") {
        this.btnTitle = "删除";
      } else {
        this.btnTitle = "生成";
      }
    },
  },
};
</script>
<style lang="scss">
.SingleCalculationDialog {
  .el-date-editor--daterange.el-input__inner {
    width: 380px;
  }
  .checkH .el-form-item {
    margin-bottom: 0;
  }
  .checkH .el-form-item__content {
    margin-left: 105px;
    margin-top: 5px;
  }
  .paymentTree {
    margin-top: 6px;
    height: 400px;
    overflow: auto;
  }
}
</style>
