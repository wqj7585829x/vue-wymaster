<template>
  <div class="el-body DataComputing">
    <div class="el-title">
      <div v-if="ztreeDataSourceList.length > 0">
        <!--树形组件-->
        <vue-ztree
          :list.sync="ztreeDataSourceList"
          :showInput="true"
          :showCheckbox="true"
          ref="dotree"
          @getTreeData="getTreeData"
        ></vue-ztree>
      </div>
    </div>
    <div class="el-content">
      <!-- 按钮begin -->
      <div class="buttonBox">
        <el-button
          type="primary"
          @click="chargeGenerationAction"
          v-has="'DataComputingGeneration_has'"
          >{{ CaluTxt }}
        </el-button>
        <el-button
          type="primary"
          @click="refresh"
          v-has="'DataComputingRefresh_has'"
          >刷新</el-button
        >
      </div>
      <!-- 按钮end -->
      <div>
        <el-form
          label-width="125px"
          :rules="sureRules"
          :model="tableData"
          ref="tableForm"
        >
          <el-row>
            <el-col>
              <el-form-item label="计算方式：">
                <el-radio-group v-model="CaluTradio1" @change="Waychange">
                  <el-radio :label="1">费用生成</el-radio>
                  <el-radio :label="0">删除费用</el-radio>
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
          <el-row>
            <el-col>
              <el-form-item label="费用应收日期：">
                <el-radio-group v-model="CaluDate">
                  <el-radio :label="1">按系统收费参数设置</el-radio>
                  <el-radio :label="0">指定日期</el-radio>
                  <span>
                    <el-date-picker
                      type="date"
                      :disabled="disabledYSRQ"
                      v-model="tableData.YSRQ"
                      placeholder="结束日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      class="specify_date"
                    >
                    </el-date-picker>
                  </span>
                </el-radio-group>
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
                  >全选
                </el-checkbox>
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
      </div>
    </div>
  </div>
</template>

<script>
import vueZtree from "../../../components/Eltree/treeItem.vue";
import {
  getTree,
  queryCaluTree,
  generateCosts,
  delCosts,
} from "@/api/FeeManagement/DataComputing"; //费用生成js
import { queryDateType } from "@/api/FeeManagement/ParameterSettings";
import { currDate } from "@/utils/global.js";
export default {
  name: "DataComputing",
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
      CaluTreeData: [], //费用项目 数据
      CaluTradio1: 1, //计算方式
      CaluDate: 1, //费用应收日期
      ztreeDataSourceList: [], //左边树 数据
      checkAll: false, // 全选
      isIndeterminate: false,
      clickTreeObjVal: "",
      yearAndMonth: "",
      disabledYSRQ: true,
      defaultProps: {
        children: "children",
        label: "name",
      },
      tableData: {
        QSFYNY: "",
        JZFYNY: "",
        YSRQ: "",
        GLCID: null,
        YXDID: null,
      },
      sureRules: {
        QSFYNY: [
          { required: true, validator: validateStartDate, trigger: "blur" },
        ],
        JZFYNY: [
          { required: true, validator: validateEndDate, trigger: "blur" },
        ],
      },
      CaluTxt: "生成费用",
    };
  },
  watch: {
    CaluDate() {
      if (this.CaluDate == 0) {
        this.disabledYSRQ = false;
      } else {
        this.disabledYSRQ = true;
      }
    },
  },
  mounted() {
    this.getTreeFun();
    this.getChargeItem();
    this.getDateType();
  },
  activated() {
    //路由keepalive等于true进来重新加载右边接口，左边树不加载接口
    this.getChargeItem();
    this.getDateType();
  },
  methods: {
    // 获取左边树
    getTreeFun() {
      getTree().then((response) => {
        var data = response;
        this.ztreeDataSourceList = data;
        if (this.ztreeDataSourceList.length > 0) {
          this.$nextTick(() => {
            this.$refs.dotree.setCheckTree(this.ztreeDataSourceList[0].id); //默认选中第一条
          });
        }
      });
    },
    // 点击 获取树节点数据
    getTreeData(val) {
      //获取树形数据
      this.clickTreeObjVal = val;
    },
    Waychange(val) {
      //计算方式切换
      if (val == 0) {
        this.CaluTxt = "删除费用";
      } else {
        this.CaluTxt = "生成费用";
      }
    },
    getDateType() {
      //获取收费年月
      queryDateType().then((response) => {
        this.tableData = response.data;
        this.tableData.YSRQ = currDate(true);
        this.yearAndMonth = response.data.yearAndMonth.yearAndMonth;
        this.tableData.QSFYNY = response.data.yearAndMonth.yearAndMonth;
        this.tableData.JZFYNY = response.data.yearAndMonth.yearAndMonth;
        this.tableData = JSON.parse(JSON.stringify(this.tableData));
      });
    },
    // 获取费用项目
    getChargeItem() {
      this.isIndeterminate = false;
      this.checkAll = false;
      queryCaluTree().then((response) => {
        this.CaluTreeData = response;
      });
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
        this.isIndeterminate = false;
        this.checkAll = false;
      }
    },

    // 生成费用
    chargeGenerationAction() {
      //资源树
      var checkedAry = this.$refs.dotree.getTreeCheckedNodes();
      var areaid = ""; //管理区id
      var buildid = ""; //楼栋id
      var roomid = ""; //房间id
      var resouceGLQArr = [];
      var resouceDLArr = [];
      var resouceFJArr = [];
      if (checkedAry.length > 0) {
        if (checkedAry[0].data.FCDM_LX == "管理处") {
          checkedAry = checkedAry.splice(1);
        }
        for (var i = 0; i < checkedAry.length; i++) {
          var z = 0;
          if (checkedAry[i].data.FCDM_LX == "管理区") {
            areaid = areaid + checkedAry[i].data.FCDM_ZJ + ",";
            for (var j = 0; j < checkedAry[i].children.length; j++) {
              if (checkedAry[i].children[j].children.length > 0) {
                z = z + checkedAry[i].children[j].children.length;
              }
            }
            if (checkedAry[i].children.length > 0) {
              i = i + checkedAry[i].children.length + z;
            }
          } else {
            resouceGLQArr.push(checkedAry[i]); //获取父级未选中的id
          }
        }
        for (var j = 0; j < resouceGLQArr.length; j++) {
          if (resouceGLQArr[j].data.FCDM_LX == "大楼") {
            //获取类型为0的id
            buildid = buildid + resouceGLQArr[j].data.FCDM_ZJ + ",";
            if (resouceGLQArr[j].children.length > 0) {
              j = j + resouceGLQArr[j].children.length;
            }
          } else {
            resouceDLArr.push(resouceGLQArr[j]); //获取父级未选中的id
          }
        }

        if (resouceDLArr.length > 0) {
          resouceDLArr.forEach((item) => {
            roomid += item.data.FCDM_ZJ + ",";
          });
        }
      } else {
        this.$message({
          message: "请选择管理处",
          type: "warning",
        });
        return;
      }
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
      data.FCDM_GLQ_ZJ = areaid.substr(0, areaid.length - 1); //管理区id
      data.FCDM_DL_ZJ = buildid.substr(0, buildid.length - 1); //楼栋id
      data.FCDM_ZJ = roomid.substr(0, roomid.length - 1); //房间id

      data.FYXM = chargeid.substr(0, chargeid.length - 1); //收费项目id
      data.CGBZ = convenid.substr(0, convenid.length - 1); //常规项目id
      data.ZBBZ = walkid.substr(0, walkid.length - 1); //走表项目id

      data.QSFYNY = this.tableData.QSFYNY;
      data.JZFYNY = this.tableData.JZFYNY;
      if (this.CaluDate == 0) {
        data.YSRQ = this.tableData.YSRQ;
      } else {
        data.YSRQ = "";
      }
      data.GLCID = this.tableData.GLCID;
      data.YXDID = this.tableData.YXDID;

      //return;
      if (this.CaluTradio1 == 1) {
        //费用生成
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            generateCosts(data).then((response) => {});
          } else {
            return false;
          }
        });
      } else {
        //费用删除
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            delCosts(data).then((response) => {});
          } else {
            return false;
          }
        });
      }
    },
    refresh() {
      //刷新
      this.getTreeFun();
      this.getChargeItem();
      this.getDateType();
    },
  },
  components: {
    vueZtree,
  },
};
</script>

<style lang="scss">
.el-body {
  padding-left: 220px;
}
.DataComputing {
  .el-title {
    width: 220px;
    margin-left: -220px;
    padding: 0 10px;
  }
  .el-date-editor--daterange.el-input__inner {
    width: 350px;
  }
  .el-date-editor.el-input {
    width: 180px;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
  .checkH .el-form-item {
    margin-bottom: 0;
  }
  .paymentTree {
    margin-top: 6px;
  }
  .ztree_content_wrap {
    margin-top: 10px;
    .el-tree {
      margin-top: 10px;
    }
    .el-input__inner {
      width: 190px;
      height: 28px;
      background: rgba(223, 224, 230, 1);
      border-radius: 4px;
      margin: 0 !important;
      margin-bottom: 14px;
    }
  }
  .specify_date {
    .el-input__icon {
      line-height: 30px !important;
    }
  }
}
</style>
