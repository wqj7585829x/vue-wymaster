<template>
  <div class="el-body PrepayMent">
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
      <div>
        <el-form :rules="sureRules" :model="tableparame" ref="tableForm">
          <el-row>
            <el-col>
              <el-form-item label="选择冲抵费用年月：">
                <el-radio-group v-model="CaluDate">
                  <el-radio :label="1">所有欠费年月</el-radio>
                  <el-radio :label="0">指定欠费年月:</el-radio>
                  <span>
                    <el-date-picker
                      type="date"
                      :disabled="disabledYSRQ"
                      v-model="tableparame.QSNY"
                      placeholder="开始日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </span>
                  <span class="date_title">至</span>
                  <span>
                    <el-date-picker
                      type="date"
                      :disabled="disabledYSRQ"
                      v-model="tableparame.ZZNY"
                      placeholder="结束日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </span>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="ment_title">选择预交冲抵方案:</div>
              <u-table
                :data="tableData"
                border
                style="width: 100%"
                max-height="600"
                class="tableContent"
                row-key="id"
                :tree-props="{
                  children: 'children',
                  hasChildren: 'hasChildren',
                }"
              >
                <u-table-column label="全选" width="100" fixed>
                  <template slot-scope="scope" slot="header">
                    <el-checkbox
                      v-model="allCheck"
                      @change="checkAll"
                      :indeterminate="isIndeterminate"
                      >全选</el-checkbox
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-checkbox
                      v-model="scope.row.isCheck"
                      :indeterminate="scope.row.isdeter"
                      @change="cChange(scope.row)"
                    ></el-checkbox>
                  </template>
                </u-table-column>
                <u-table-column
                  label="预交方案"
                  width="150"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{
                      scope.row.level == "parent"
                        ? scope.row.YJFA_FAMC
                        : scope.row.SFXM_SFXMMC
                    }}
                  </template>
                </u-table-column>
                <u-table-column
                  prop="SFXM_FYLB"
                  label="费用类别"
                  width="150"
                  show-overflow-tooltip
                >
                </u-table-column>
                <u-table-column
                  prop="YJFA_CDSX"
                  label="冲抵级别"
                  width="150"
                  show-overflow-tooltip
                >
                </u-table-column>
                <u-table-column
                  prop="YJFA_CDNYSX"
                  label="冲抵费用年月顺序"
                  show-overflow-tooltip
                >
                </u-table-column>
              </u-table>
            </el-col>
          </el-row>
          <el-row class="sure_wrap">
            <el-col>
              <div class="ment_title">确定冲抵:</div>
              <el-form-item label="填制日期：" prop="TZRQ">
                <el-date-picker
                  type="date"
                  v-model="tableparame.TZRQ"
                  placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <el-button
                  type="primary"
                  class="sure_btn"
                  @click="subPrepayMent"
                  v-has="'PMsubPrepayhas'"
                  >预交冲抵
                </el-button>
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
  queryAcceptingThePlanApi,
  acceptingTheOffsetApi,
} from "@/api/PrepayManagement/PrepayMent"; //预交冲抵js
import { currDate } from "@/utils/global.js";
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "PrepayMent",
  components: { vueZtree, UTable, UTableColumn },
  watch: {
    CaluDate() {
      if (this.CaluDate == 0) {
        this.disabledYSRQ = false;
      } else {
        this.disabledYSRQ = true;
      }
    },
  },
  data() {
    return {
      allCheck: false,
      startDate: "",
      CaluDate: 1, //费用应收日期
      ztreeDataSourceList: [], //左边树 数据
      disabledYSRQ: true,
      tableparame: {
        QSNY: "",
        ZZNY: "",
      },
      tableData: [],
      sureRules: {
        TZRQ: [{ required: true, message: "", trigger: "blur" }],
      },
      multipleSelection: [], //选中数据
      isIndeterminate: false,
    };
  },
  mounted() {
    this.$set(this.tableparame, "TZRQ", currDate(true));
    this.getTreeFun(); //树查询
    this.getDataList(); //预交方案查询
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
    getDataList() {
      queryAcceptingThePlanApi().then((response) => {
        this.tableData = response;
        var i = 1;
        if (this.tableData.length > 0) {
          this.tableData.forEach((item) => {
            this.$set(item, "id", i);
            i++;
            this.$set(item, "isCheck", false);
            this.$set(item, "len", item.children.length);
            this.$set(item, "isdeter", false); //父级checkbox  半选状态
            if (item.children.length > 0) {
              item.children.forEach((item2) => {
                this.$set(item2, "isAdd", 0);
                this.$set(item2, "id", i);
                i++;
              });
            }
          });
        }
      });
    },
    // 点击 获取树节点数据
    getTreeData(val) {
      //获取树形数据
      this.clickTreeObjVal = val;
    },
    cChange(val) {
      //checkbox选择事件
      if (val.level == "parent") {
        //父级checkbox选择事件
        var isRecord = 0;
        if (val.children.length > 0) {
          val.children.forEach((item) => {
            //循环子级数据
            if (item.YJFYXM_YJFAWJ == val.YJFA_ZJ) {
              //判断选中的主键如果等于子级主键
              this.$set(item, "isCheck", val.isCheck); //选中不选中设置
              if (item.isCheck) {
                //选中/不选中  改变对应子级的isAdd
                isRecord++;
              } else {
                if (isRecord > 0) {
                  isRecord--;
                }
              }
              this.$set(item, "isAdd", isRecord);
            }
          });
        }
        val.isdeter = false;
      } else {
        //子级checkbox选择事件
        if (val.isCheck) {
          //如果是选中状态
          this.tableData.forEach((item) => {
            if (item.children.length > 0) {
              item.children.forEach((child) => {
                if (item.YJFA_ZJ == val.YJFYXM_YJFAWJ) {
                  child.isAdd++;
                  if (child.isAdd == item.len) {
                    //如果isAdd等于对应子级的len  则父级checkbox选中
                    this.$set(item, "isCheck", true);
                    item.isdeter = false; //判断子级选中状态的时候  如果子级的数据都是选中状态 则设置子级的isIndeterminate为false 否则为true
                  } else {
                    item.isdeter = true;
                  }
                }
              });
            }
          });
        } else {
          //如果是取消选中状态
          this.tableData.forEach((item) => {
            if (item.children.length > 0) {
              item.children.forEach((child) => {
                if (item.YJFA_ZJ == val.YJFYXM_YJFAWJ) {
                  child.isAdd--;
                  this.$set(item, "isCheck", false);
                  if (child.isAdd <= 0) {
                    //判断取消选中的时候子级中如果有选中的  则设置父级isIndeterminate为true
                    item.isdeter = false;
                  } else {
                    item.isdeter = true;
                  }
                }
              });
            }
          });
        }
      }
      /**全选*/
      var index = 0; //全选状态累计
      var newAdd = 0;
      this.multipleSelection = [];
      this.tableData.forEach((item) => {
        if (item.isCheck) {
          index++;
          this.multipleSelection.push(item);
          this.isIndeterminate = true;
        } else {
          if (index > 0) {
            index--;
          }
        }
        if (item.children.length > 0) {
          item.children.forEach((child) => {
            if (child.isCheck) {
              this.multipleSelection.push(child);
              this.isIndeterminate = true;
              newAdd++; //记录子级是否有选中状态
            }
          });
        }
      });
      if (newAdd == 0) {
        //0为子级没有选中状态   则设置isIndeterminate为false
        this.isIndeterminate = false;
      }
      if (index == this.tableData.length) {
        //如果index等于Data长度 则全选选中
        this.isIndeterminate = false;
        this.allCheck = true;
      } else {
        this.allCheck = false;
      }
    },
    checkAll(val) {
      //全选
      var isRecord = 0;
      this.isIndeterminate = false;
      this.multipleSelection = [];
      this.tableData.forEach((item) => {
        this.$set(item, "isCheck", val);
        this.$set(item, "isdeter", false);
        if (item.isCheck) {
          this.multipleSelection.push(item);
        }
        if (item.children.length > 0) {
          item.children.forEach((child) => {
            if (child.YJFYXM_YJFAWJ == item.YJFA_ZJ) {
              //判断选中的主键如果等于子级主键
              this.$set(child, "isCheck", val);
              if (child.isCheck) {
                //选中/不选中  改变对应子级的isAdd
                isRecord++;
              } else {
                if (isRecord > 0) {
                  isRecord--;
                }
              }
              this.$set(child, "isAdd", isRecord);
            }
          });
        }
      });
    },
    subPrepayMent() {
      //预交冲抵提交
      if (this.CaluDate == 0) {
        if (this.tableparame.QSNY == "") {
          this.$message({ message: "请选择开始日期", type: "warning" });
          return;
        } else if (this.tableparame.ZZNY == "") {
          this.$message({ message: "请选择结束日期", type: "warning" });
          return;
        }
      }
      var zj = "";
      var YJFA_ZJ = "";
      var YJFYXM_ZJ = "";
      var checkedAry = this.$refs.dotree.getTreeCheckedNodes();
      if (checkedAry.length <= 0) {
        this.$message({ message: "请选择左边项目树", type: "warning" });
        return;
      }
      if (this.multipleSelection.length <= 0) {
        this.$message({ message: "请选择预交冲抵方案", type: "warning" });
        return;
      }
      /**房客关系主键 */
      if (checkedAry.length > 0) {
        checkedAry.forEach((item) => {
          if (item.data.FCDM_LX == "客户") {
            zj += item.data.FKGX_ZJ + ",";
          }
        });
      }
      zj = zj.substring(0, zj.length - 1);
      this.tableparame.FKGX_ZJ = zj; //房客关系主键
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((item) => {
          if (item.YJFYXM_YJFAWJ && item.YJFYXM_ZJ) {
            YJFA_ZJ += item.YJFYXM_YJFAWJ + ",";
            YJFYXM_ZJ += item.YJFYXM_ZJ + ",";
          } else {
            item.children.forEach((child) => {
              YJFA_ZJ += child.YJFYXM_YJFAWJ + ",";
              YJFYXM_ZJ += child.YJFYXM_ZJ + ",";
            });
          }
        });
      }
      YJFA_ZJ = YJFA_ZJ.substring(0, YJFA_ZJ.length - 1);
      /**预交方案主键去重 start*/
      let arrycode = YJFA_ZJ.split(",");
      arrycode = Array.from(new Set(arrycode));
      var nextOperatorCode = (arrycode = arrycode.toLocaleString());
      /**预交方案主键去重 end*/

      YJFYXM_ZJ = YJFYXM_ZJ.substring(0, YJFYXM_ZJ.length - 1);
      /**预交方案主键去重 start*/
      let arrycode2 = YJFYXM_ZJ.split(",");
      arrycode2 = Array.from(new Set(arrycode2));
      var nextOperatorCode2 = (arrycode2 = arrycode2.toLocaleString());
      /**预交费用项目主键去重 end*/

      this.tableparame.YJFYXM_ZJ = nextOperatorCode2; //预交费用项目主键
      this.tableparame.YJFA_ZJ = nextOperatorCode; //预交方案主键
      this.$refs.tableForm.validate((valid) => {
        if (valid) {
          acceptingTheOffsetApi(this.tableparame).then(() => {});
        }
      });
    },
  },
};
</script>

<style lang="scss">
.PrepayMent {
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
  .el-form-item__label {
    font-size: 15px;
    font-weight: bold;
  }
  .ment_title {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .date_title {
    display: inline-block;
    font-size: 14px;
    padding: 0 10px;
  }
  .el-radio-group {
    margin-left: 10px;
  }
  .sure_btn {
    margin-left: 10px !important;
  }
  .ztree_content_wrap {
    margin-top: 10px;
    .el-input__inner {
      width: 190px;
      height: 28px;
      background: rgba(223, 224, 230, 1);
      border-radius: 4px;
      margin: 0 !important;
      margin-bottom: 14px;
    }
    .el-tree {
      margin-top: 10px;
    }
  }
  .el-table__expand-icon {
    position: absolute;
    left: 15px;
    line-height: 16px !important;
  }
}
</style>
