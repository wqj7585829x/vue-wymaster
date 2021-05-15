<template>
  <div class="RepairPlanDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancelForm"
      :close-on-click-modal="false"
      id="PlayScrollBody"
    >
      <el-form
        :label-position="labelPosition"
        label-width="145px"
        :model="formList"
        ref="ruleForms"
        :rules="rules"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="方案编号：" prop="WXFA_NO">
              <el-input type="text" v-model="formList.WXFA_NO"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编制人：" prop="WXFA_BZR">
              <el-input type="text" v-model="formList.WXFA_BZR"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="编制日期：" prop="WXFA_BZRQ">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="选择日期"
                v-model="formList.WXFA_BZRQ"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分摊标准：">
              <el-select v-model="formList.WXFA_FTBZ" placeholder="请选择">
                <el-option
                  v-for="item in butionOption"
                  :key="item.BMB_LXNR"
                  :label="item.BMB_LXNR"
                  :value="item.BMB_LXNR"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="方案说明：" prop="WXFA_FASM">
              <el-input type="textarea" v-model="formList.WXFA_FASM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="现场查看记录：" prop="WXFA_XCCKJL">
              <el-input
                type="textarea"
                v-model="formList.WXFA_XCCKJL"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="预算费用：" prop="WXFA_YSFY">
              <el-input
                type="text"
                v-model="formList.WXFA_YSFY"
                :disabled="disabledYSFY"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预算人：" prop="WXFA_YSR">
              <el-input type="text" v-model="formList.WXFA_YSR"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="预支费用：" prop="WXFA_YZFY">
              <el-input type="text" v-model="formList.WXFA_YZFY"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工程部签名：" prop="WXFA_GCBQM">
              <el-input type="text" v-model="formList.WXFA_GCBQM"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="管理部签名：" prop="WXFA_GLCQM">
              <el-input type="text" v-model="formList.WXFA_GLCQM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业主委员签名：" prop="WXFA_YZWYQM">
              <el-input type="text" v-model="formList.WXFA_YZWYQM"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="业主委员意见：" prop="WXFA_YZWYYJ">
              <el-input
                type="textarea"
                v-model="formList.WXFA_YZWYYJ"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：" prop="WXFA_BZ">
              <el-input type="textarea" v-model="formList.WXFA_BZ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 30px 0">
          <el-col>
            <el-form-item label="对应申请单：">
              <el-row :gutter="10" style="padding: 0">
                <el-col :span="6">
                  <el-form-item prop="keyword">
                    <el-select
                      v-model="tableParameter.keyword"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in boxSelectData"
                        :key="item.SSXM_ZJ"
                        :label="item.SSXM_MC"
                        :value="item.SSXM_MC"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-date-picker
                    v-model="daterange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-col>
                <el-col :span="6">
                  <el-button type="success" @click="getTableData()"
                    >查询</el-button
                  >
                </el-col>
              </el-row>
              <el-table
                :data="tableData"
                border
                style="width: 100%"
                tooltip-effect="dark"
                highlight-current-row
                ref="multipleTable"
                class="table-bill-model"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column
                  fixed
                  prop="WXD_WXDJNO"
                  label="登记单号"
                  width="150"
                ></el-table-column>
                <el-table-column
                  label="维修单号"
                  prop="WXD_NO"
                  width="200"
                ></el-table-column>
                <el-table-column
                  label="维修项目"
                  prop="WXDJ_XMMC"
                  width="200"
                ></el-table-column>
                <el-table-column label="开单时间" prop="WXD_KDSJ">
                  <template slot-scope="scope">
                    <el-date-picker
                      type="datetime"
                      :editable="false"
                      placeholder="选择日期"
                      v-model="scope.row.WXD_KDSJ"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureRoom" :loading="loading"
          >确 定</el-button
        >
        <el-button @click="cancelForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryNewRequisition,
  queryProjectDropDownBox,
  queryDistributionMethod,
  addMaintenanceProposal,
  queryRequisition,
  updateMaintenanceProposal,
  maintenancePlanNumberGeneration,
} from "@/api/PublicRepairManager/RepairPlan"; //维修方案新增
import { mapGetters } from "vuex";
import { currDate, getCurrMonthFirstDay } from "@/utils/global.js";
import { onlynumberpoint } from "@/utils/validate.js";
export default {
  props: ["showdialog"],
  data() {
    return {
      labelPosition: "left",
      visible: this.showdialog,
      title: "新增",
      formList: {},
      daterange: [],
      tableParameter: {
        keyword: null,
      },
      tableData: [], //列表list
      loading: false,
      diableinput: false,
      optType: 1, //1新增  2修改
      disabledYSFY: true,
      rules: {
        WXFA_NO: [
          { required: true, message: "请输入方案编号", trigger: "blur" },
        ],
        WXFA_BZR: [
          { required: true, message: "请输入编制人", trigger: "blur" },
        ],
        WXFA_FASM: [
          { required: true, message: "请输入方案说明", trigger: "blur" },
        ],
        WXFA_YSR: [
          { required: true, message: "请输入预算人", trigger: "blur" },
        ],
        WXFA_YZFY: [
          { required: true, message: "请输入预支费用", trigger: "blur" },
        ],
        WXFA_YSFY: [{ validator: onlynumberpoint, trigger: "blur" }],
        WXFA_YZFY: [{ validator: onlynumberpoint, trigger: "blur" }],
      },
      boxSelectData: [], //申请单列表下拉框数据
      butionOption: [], //分摊标准下拉框数据
      multipleSelection: [], //对应申请单列表选中数据
      idKey: "WXD_ZJ", // 标识列表数据中每一行的唯一键的名称\
    };
  },
  watch: {
    showdialog() {
      this.visible = this.showdialog;
      if (this.visible) {
        this.getProboxData();
        this.getTableList();
        this.getButionData();
      }
    },
  },
  computed: {
    ...mapGetters(["userName"]), //登录用户
  },
  methods: {
    // 判断新增，修改
    getData(data, type) {
      this.optType = type;
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData;
      if (type == 1) {
        this.title = "新增";
        this.formList.WXFA_BZRQ = currDate(true); //当前日期
        this.formList.WXFA_BZR = this.userName;
        this.formList.WXFA_YSFY = 0;
        this.formList.WXFA_YZFY = 0;
        this.getPlanNumber(); //获取维修方案编号
      } else {
        this.title = "修改";
        this.diableinput = true;
      }
    },
    getTableList() {
      //查询对应申请单列表
      this.daterange = [];
      this.daterange.push(getCurrMonthFirstDay());
      this.daterange.push(currDate(true));
      this.tableParameter.KSRQ = this.daterange[0];
      this.tableParameter.JSRQ = this.daterange[1];
      if (this.optType == 1) {
        queryNewRequisition(this.tableParameter).then((response) => {
          this.tableData = response;
        });
      } else {
        queryRequisition(this.formList.WXFA_ZJ).then((response) => {
          this.tableData = response;
          setTimeout(() => {
            for (var i = 0; i < this.tableData.length; i++) {
              this.$refs.multipleTable.toggleRowSelection(
                this.tableData[i],
                true
              );
            }
          }, 50);
        });
      }
    },
    getPlanNumber() {
      //获取维修方案编号
      maintenancePlanNumberGeneration(this.tableParameter).then((response) => {
        this.formList.WXFA_NO = response.num;
        this.formList = JSON.parse(JSON.stringify(this.formList)); //拷贝一份存储对象
      });
    },
    getTableData() {
      //对应单搜索查询
      this.multipleSelection = []; //清空选中的对应申请单列表数据
      this.tableParameter.KSRQ = this.daterange[0];
      this.tableParameter.JSRQ = this.daterange[1];
      queryNewRequisition(this.tableParameter).then((response) => {
        this.tableData = response;
      });
    },
    getProboxData() {
      //获取对应申请碟下拉列表数据
      queryProjectDropDownBox().then((response) => {
        this.boxSelectData = response;
      });
    },
    getButionData() {
      //分摊标准下拉查询
      queryDistributionMethod().then((response) => {
        //分摊标准下拉框查询
        this.butionOption = response;
      });
    },
    sureRoom() {
      //提交
      this.$refs.ruleForms.validate((valid) => {
        if (valid) {
          this.multipleSelection.forEach((item) => {});
          if (this.multipleSelection.length > 0) {
            var firstMc = this.multipleSelection[0].WXDJ_XMMC;
            for (var i = 0; i < this.multipleSelection.length; i++) {
              if (firstMc != this.multipleSelection[i].WXDJ_XMMC) {
                this.$message({
                  type: "warning",
                  message: "请选择同一维修项目的维修单",
                });
                return false;
              }
            }
          } else {
            this.$message({
              type: "warning",
              message: "未选择需要制定方案的维修单",
            });
            return false;
          }
          if (Number(this.formList.WXFA_YSFY) <= 0) {
            this.$confirm("预算费用小于或等于0!是否确定?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                if (this.optType == 1) {
                  //新增
                  addMaintenanceProposal(
                    this.formList,
                    this.multipleSelection
                  ).then((response) => {
                    if (response.returnStatus == "SUCCESS") {
                      let newobj = JSON.parse(JSON.stringify(this.formList));
                      this.$emit("RefreshItem", newobj);
                      this.cancelForm();
                    }
                  });
                } else {
                  updateMaintenanceProposal(
                    this.formList,
                    this.multipleSelection
                  ).then((response) => {
                    if (response.returnStatus == "SUCCESS") {
                      let newobj = JSON.parse(JSON.stringify(this.formList));
                      this.$emit("RefreshItem", newobj);
                      this.cancelForm();
                    }
                  });
                }
              })
              .catch(() => {});
          } else {
            if (this.optType == 1) {
              //新增
              addMaintenanceProposal(
                this.formList,
                this.multipleSelection
              ).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  let newobj = JSON.parse(JSON.stringify(this.formList));
                  this.$emit("RefreshItem", newobj);
                  this.cancelForm();
                }
              });
            } else {
              updateMaintenanceProposal(
                this.formList,
                this.multipleSelection
              ).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  let newobj = JSON.parse(JSON.stringify(this.formList));
                  this.$emit("RefreshItem", newobj);
                  this.cancelForm();
                }
              });
            }
          }
        } else {
          return false;
        }
      });
    },
    handleSelectionChange(val) {
      var wxd_fsfy = 0;
      this.multipleSelection = val;
      if (this.optType == 1) {
        if (this.multipleSelection.length > 0) {
          this.multipleSelection.forEach((item) => {
            wxd_fsfy += item.WXD_YSFY;
            //debugger
          });
          this.formList.WXFA_YSFY = wxd_fsfy;
        }
      }
    },
    cancelForm() {
      this.loading = false;
      this.$emit("update:showdialog", false);
      this.$nextTick(() => {
        this.$refs.ruleForms.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style lang="scss">
.RepairPlanDialog {
  .el-dialog-double /deep/ .el-dialog {
    width: 1100px;
  }
  .el-dialog-double .el-dialog__body {
    max-height: 800px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-input-group--append .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    color: #000 !important;
  }
  .el-date-editor .el-range-separator {
    padding: 0;
  }
}
</style>
