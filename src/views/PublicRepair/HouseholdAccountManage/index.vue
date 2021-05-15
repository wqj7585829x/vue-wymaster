<template>
  <div class="el-body">
    <div class="el-title">
      <el-radio-group v-model="TreeNavBar">
        <el-radio-button label="0" @click.native="TreeNavSwich(0)"
          >按资源</el-radio-button
        >
        <el-radio-button label="1" @click.native="TreeNavSwich(1)"
          >按客户</el-radio-button
        >
      </el-radio-group>
      <div v-if="ztreeDataSourceList.length > 0" v-show="TreeNavBar == 0">
        <!--树形组件-->
        <vue-ztree
          :list.sync="ztreeDataSourceList"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          :showInput="true"
          @getTreeData="getTreeData"
        ></vue-ztree>
      </div>
      <section v-show="TreeNavBar == 1" class="guest_wrap">
        <el-input
          v-model="filterguest"
          placeholder="搜索"
          class="guest_input"
        ></el-input>
        <el-table
          :data="tables"
          highlight-current-row
          border
          @row-click="GuestRowClick"
        >
          <el-table-column label="客户名称" prop="cusName"></el-table-column>
          <el-table-column
            label="手机号"
            prop="contactNumber"
          ></el-table-column>
        </el-table>
      </section>
    </div>
    <div class="el-content">
      <div>
        <!-- 资源名称，收费面积 begin -->
        <div class="Resource_title" v-show="cusName == ''">
          <section>
            <span
              >资源名称：<span class="TextColor">{{ resource }}</span></span
            >
            <span
              >收费面积：<span class="TextColor">{{ chargeArea }}</span></span
            >
          </section>
        </div>
        <!-- 资源名称，收费面积 end -->
        <!-- 搜索框begin -->
        <div class="searchBox">
          <el-form label-width="85px">
            <el-row :gutter="30">
              <el-col :span="12" v-show="cusName != ''">
                <el-form-item label="客户名称：">
                  <span class="TextColor">{{ cusName }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="5" v-show="cusName == ''" style="width: 300px">
                <el-form-item label="客户信息：">
                  <el-select v-model="queryPage.status" @change="statusChange">
                    <el-option
                      v-for="item in GuestOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="5" v-show="cusName == ''" style="width: 215px">
                <el-form-item label="" label-width="0px">
                  <span v-show="queryPage.status == 1">
                    <el-select v-model="queryPage.cusId">
                      <el-option
                        label="所有客户"
                        value=""
                        v-if="currentData.length > 1"
                      ></el-option>
                      <el-option
                        v-for="item in cusData"
                        :key="item.cusId"
                        :label="item.cusName + '-' + cusTypeName(item.cusType)"
                        :value="item.cusId"
                        v-if="item.status == 1"
                      ></el-option>
                    </el-select>
                  </span>
                  <span v-show="queryPage.status == 2">
                    <el-select v-model="queryPage.cusId">
                      <el-option
                        label="所有客户"
                        value=""
                        v-if="historyData.length > 1"
                      ></el-option>
                      <el-option
                        v-for="item in cusData"
                        :key="item.cusId"
                        :label="item.cusName + '-' + cusTypeName(item.cusType)"
                        :value="item.cusId"
                        v-if="item.status == 2"
                      ></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>

              <el-col :span="4" v-show="cusName == ''">
                <el-form-item label-width="0px">
                  <el-button
                    type="success"
                    @click="onSubmit"
                    v-has="'HAManageSubmit_has'"
                    >查询</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 搜索框end -->

        <!-- 按钮begin -->
        <div class="buttonBox">
          <el-button
            type="primary"
            :disabled="disabledAccount"
            @click="createAccountAction"
            v-has="'HAManageAdd_has'"
            >建账</el-button
          >
          <el-button
            type="primary"
            @click="batchCreateAction"
            v-has="'HAManageBatchAdd_has'"
            >批量建账</el-button
          >
          <el-button
            type="primary"
            @click="updateAccountAction"
            :disabled="disableupdate"
            :title="updateTitle()"
            v-has="'HAManageUpdate_has'"
            >修改</el-button
          >
          <el-button
            type="primary"
            @click="payAction"
            :disabled="disableupdate"
            :title="updateTitle()"
            v-has="'HAManageRecharge_has'"
            >充值</el-button
          >
          <el-button
            type="primary"
            @click="batchPayAction"
            v-has="'HAManageBatchRecharge_has'"
            >批量充值</el-button
          >
          <el-button
            type="primary"
            @click="payRecordAction"
            :disabled="disableupdate"
            :title="updateTitle()"
            v-has="'HAManageRechargeSelect_has'"
            >公维金充值明细</el-button
          >
          <el-button
            type="primary"
            @click="useRecordAction"
            :disabled="disableupdate"
            :title="updateTitle()"
            v-has="'HAManageShareSelect_has'"
            >公维金使用记录</el-button
          >
        </div>
        <!-- 按钮end -->

        <!-- 表 begin -->
        <div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            @row-click="rowclick"
          >
            <el-table-column fixed label="选择" width="50">
              <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio"
                  >&nbsp;</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column fixed prop="rownumber" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="accountName" label="户帐名" width="200">
            </el-table-column>
            <el-table-column prop="cusName" label="客户名称" width="150">
            </el-table-column>
            <el-table-column prop="roomNo" label="所属资源" width="150">
            </el-table-column>
            <el-table-column prop="balance" label="余额" width="150">
            </el-table-column>
            <el-table-column prop="AmountUsed" label="已用金额" width="150">
            </el-table-column>
            <el-table-column prop="chargeArea" label="收费面积" width="150">
            </el-table-column>
            <el-table-column prop="buildName" label="所属楼栋" width="150">
            </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
            <el-table-column prop="createDate" label="建账日期" width="150">
            </el-table-column>
          </el-table>
        </div>
        <!-- 表 end -->

        <!-- 分页begin -->
        <div class="block" v-if="returnTotal">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="queryPage.pageSize"
            layout="prev, pager, next, jumper"
            :total="returnTotal"
          >
          </el-pagination>
        </div>
        <!-- 分页end -->
      </div>

      <!-- 建账 弹框 begin -->
      <AccountDialog
        :showAccount.sync="showAccount"
        ref="PopAccountChildren"
        @RefreshItem="RefreshList"
      ></AccountDialog>
      <!-- 建账 弹框 end -->

      <!-- 批量建账 弹框 begin -->
      <BatchAccountDialog
        :showBatchAccount.sync="showBatchAccount"
        ref="PopBatchAccountChildren"
        @RefreshItem="RefreshList"
      ></BatchAccountDialog>
      <!-- 批量建账 弹框 end -->

      <!-- 充值 弹框 begin -->
      <RechargeDialog
        :showRecharge.sync="showRecharge"
        ref="PopRechargeChildren"
        @RefreshItem="RefreshList"
      ></RechargeDialog>
      <!-- 充值 弹框 end -->

      <!-- 批量充值 弹框 begin -->
      <BatchRechargeDialog
        :showBatchRecharge.sync="showBatchRecharge"
        ref="PopBatchRechargeChildren"
        @RefreshItem="RefreshList"
      ></BatchRechargeDialog>
      <!-- 批量充值 弹框 end -->

      <!-- 公维金充值明细 弹框 begin -->
      <RechargeRecordDialog
        :showRechargeRecord.sync="showRechargeRecord"
        ref="PopRechargeRecordChildren"
      ></RechargeRecordDialog>
      <!-- 公维金充值明细 弹框 end -->

      <!-- 公维金使用记录 弹框 begin -->
      <UseRecordDialog
        :showUseRecord.sync="showUseRecord"
        ref="PopUseRecordChildren"
      ></UseRecordDialog>
      <!-- 公维金使用记录 弹框 end -->
    </div>
  </div>
</template>

<script>
import vueZtree from "../../../components/Eltree/treeItem.vue";
import AccountDialog from "./components/AccountDialog"; //建账
import BatchAccountDialog from "./components/BatchAccountDialog"; //批量建账
import RechargeDialog from "./components/RechargeDialog"; //充值
import BatchRechargeDialog from "./components/BatchRechargeDialog"; //批量充值
import UseRecordDialog from "./components/UseRecordDialog"; //公维金使用记录
import RechargeRecordDialog from "./components/RechargeRecordDialog"; //公维金充值明细
import {
  getTree,
  GuestList,
  findCusAndResource,
  selectByPage,
} from "@/api/PublicRepair/HouseholdAccountManage"; //js

export default {
  name: "HouseholdAccountManage",
  data() {
    return {
      resource: "",
      chargeArea: "",
      TreeNavBar: 0, //搜索切换
      filterguest: "", //客户搜索变量
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      showAccount: false, //建账 弹框 显示
      showBatchAccount: false, //批量建账 弹框 显示
      showRecharge: false, //充值 弹框 显示
      showBatchRecharge: false, //批量充值 弹框 显示
      showUseRecord: false, //公维金使用记录 弹框 显示
      showRechargeRecord: false, //公维金充值明细 弹框 显示
      currentPage: 1, //当前页
      returnTotal: 2, //总共条数
      ztreeDataSourceList: [], //按资源 树数据
      cusTableData: [], //按客户 客户数据
      clickOrgId: "", //记录选中的树id
      GuestOption: [
        { value: 1, label: "当前" },
        { value: 2, label: "历史" },
      ], //客户信息默认类型
      cusData: [], //客户信息下拉框值
      cusName: "", //客户名称
      disabledAccount: false, //建账按钮 按客户 禁用
      disableupdate: true, //修改 禁用
      currentData: [], //当前 客户
      historyData: [], //历史 客户
      queryPage: {
        // 查询表
        startRownumber: 0,
        pageSize: 10,
        belongPlot: null,
        partid: null,
        buildid: null,
        roomid: null,
        cusId: null,
        status: 1,
      },
      tableData: [],
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disableupdate = false;
      } else {
        this.disableupdate = true;
      }
    },
  },
  computed: {
    tables() {
      var _this = this;
      return this.cusTableData.filter(function (dataNews) {
        return Object.keys(dataNews).some(function (key) {
          return String(dataNews[key]).indexOf(_this.filterguest) > -1;
        });
      });
    },
  },
  mounted() {
    this.getTreeFun(); //查询资源树
    this.getGuestFun(); //查询左边按客户搜索信息
  },
  methods: {
    //获取左边树
    getTreeFun() {
      getTree().then((response) => {
        var data = response.returnData;
        if (data) {
          this.ztreeDataSourceList = data;
          var v = [];
          for (var i = 0; i < this.ztreeDataSourceList.length; i++) {
            //集团
            var val = this.ztreeDataSourceList[i];
            if (val.children.length != 0) {
              for (var i1 = 0; i1 < val.children.length; i1++) {
                //公司
                var val1 = val.children[i1];
                if (val1.children.length != 0) {
                  for (var i2 = 0; i2 < val1.children.length; i2++) {
                    //小区
                    var val2 = val1.children[i2];
                    if (val2.children.length != 0) {
                      for (var i3 = 0; i3 < val2.children.length; i3++) {
                        //分区
                        var val3 = val2.children[i3];
                        if (val3.children.length != 0) {
                          //楼栋
                          for (var i4 = 0; i4 < val3.children.length; i4++) {
                            var val4 = val3.children[i4];
                            if (val4.children.length != 0) {
                              for (
                                var i5 = 0;
                                i5 < val4.children.length;
                                i5++
                              ) {
                                //房间
                                v = val4.children[0];
                                break;
                              }
                              if (v.length != 0) {
                                break;
                              }
                            }
                            if (v.length != 0) {
                              break;
                            }
                          }
                        }
                        if (v.length != 0) {
                          break;
                        }
                      }
                      if (v.length != 0) {
                        break;
                      }
                    }
                  }
                  if (v.length != 0) {
                    break;
                  }
                }
              }
              if (v.length != 0) {
                break;
              }
            }
          }
          if (v.length != 0) {
            this.getTreeData(v);
          }
        }
      });
    },
    // 点击 获取树节点数据
    getTreeData(val) {
      if (val.agencyType == 1) {
        // 集团
        var v = [];
        if (val.children.length != 0) {
          for (var i1 = 0; i1 < val.children.length; i1++) {
            //公司
            var val1 = val.children[i1];
            if (val1.children.length != 0) {
              for (var i2 = 0; i2 < val1.children.length; i2++) {
                //小区
                var val2 = val1.children[i2];
                if (val2.children.length != 0) {
                  for (var i3 = 0; i3 < val2.children.length; i3++) {
                    //分区
                    var val3 = val2.children[i3];
                    if (val3.children.length != 0) {
                      //楼栋
                      for (var i4 = 0; i4 < val3.children.length; i4++) {
                        var val4 = val3.children[i4];
                        if (val4.children.length != 0) {
                          for (var i5 = 0; i5 < val4.children.length; i5++) {
                            //房间
                            v = val4.children[0];
                            break;
                          }
                          if (v.length != 0) {
                            break;
                          }
                        }
                      }
                      if (v.length != 0) {
                        break;
                      }
                    }
                  }
                  if (v.length != 0) {
                    break;
                  }
                }
              }
              if (v.length != 0) {
                break;
              }
            }
          }
        }
        if (v.length == 0) {
          this.showMessage("该物业集团暂无房间");
          return;
        }
        val = v;
      } else if (val.agencyType == 2) {
        // 公司
        var v = [];
        if (val.children.length != 0) {
          for (var i2 = 0; i2 < val.children.length; i2++) {
            //小区
            var val2 = val.children[i2];
            if (val2.children.length != 0) {
              for (var i3 = 0; i3 < val2.children.length; i3++) {
                //分区
                var val3 = val2.children[i3];
                if (val3.children.length != 0) {
                  //楼栋
                  for (var i4 = 0; i4 < val3.children.length; i4++) {
                    var val4 = val3.children[i4];
                    if (val4.children.length != 0) {
                      for (var i5 = 0; i5 < val4.children.length; i5++) {
                        //房间
                        v = val4.children[0];
                        break;
                      }
                      if (v.length != 0) {
                        break;
                      }
                    }
                  }
                  if (v.length != 0) {
                    break;
                  }
                }
              }
              if (v.length != 0) {
                break;
              }
            }
          }
        }
        if (v.length == 0) {
          this.showMessage("该公司暂无房间");
          return;
        }
        val = v;
      } else if (val.agencyType == 3) {
        // 小区
        var v = [];
        if (val.children.length != 0) {
          for (var i3 = 0; i3 < val.children.length; i3++) {
            //分区
            var val3 = val.children[i3];
            if (val3.children.length != 0) {
              //楼栋
              for (var i4 = 0; i4 < val3.children.length; i4++) {
                var val4 = val3.children[i4];
                if (val4.children.length != 0) {
                  for (i5 = 0; i5 < val4.children.length; i5++) {
                    //房间
                    v = val4.children[0];
                    break;
                  }
                  if (v.length != 0) {
                    break;
                  }
                }
              }
              if (v.length != 0) {
                break;
              }
            }
          }
        }
        if (v.length == 0) {
          this.showMessage("该小区暂无房间");
          return;
        }
        val = v;
      } else if (val.agencyType == 5) {
        // 分区
        var v = [];
        if (val.children.length != 0) {
          for (var i4 = 0; i4 < val.children.length; i4++) {
            var val4 = val.children[i4];
            if (val4.children.length != 0) {
              for (var i5 = 0; i5 < val4.children.length; i5++) {
                //房间
                v = val4.children[0];
                break;
              }
              if (v.length != 0) {
                break;
              }
            }
            if (v.length != 0) {
              break;
            }
          }
        }
        if (v.length == 0) {
          this.showMessage("该分区暂无房间");
          return;
        }
        val = v;
      } else if (val.agencyType == 6) {
        // 楼栋
        var v = [];
        if (val.children.length != 0) {
          for (var i5 = 0; i5 < val.children.length; i5++) {
            //房间
            v = val.children[0];
            break;
          }
        }
        if (v.length == 0) {
          this.showMessage("该楼栋暂无房间");
          return;
        }
        val = v;
      }
      // 获取 小区、分区、楼栋、房间 id
      this.queryPage.belongPlot = val.plotid;
      this.queryPage.partid = val.partid;
      this.queryPage.buildid = val.buildid;
      this.queryPage.roomid = val.orgId.substring(1, val.orgId.length);

      //赋值
      this.clickOrgId = val.orgId;
      this.$nextTick(() => {
        this.$refs.dotree.setCheckTree(this.clickOrgId);
        this.getCusAndResource(); //点击房间才显示数据
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
    //按客户搜索列表
    getGuestFun() {
      GuestList().then((response) => {
        if (response.returnData) {
          this.cusTableData = response.returnData;
        }
      });
    },
    // 获取客户
    getCusAndResource() {
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.queryPage.startRownumber = 0; //点击树重置第一页0
      this.currentPage = 1; //点击树重置第一页
      this.queryPage.status = 1;
      this.queryPage.cusId = "";
      findCusAndResource(this.queryPage).then((response) => {
        this.cusData = response.returnData;
        this.currentData = [];
        this.historyData = [];
        if (this.cusData.length > 0) {
          this.resource = this.cusData[0].resource;
          this.chargeArea = this.cusData[0].chargeArea;
          this.cusData.forEach((item) => {
            if (item.status == 1) {
              this.currentData.push(item);
            } else {
              this.historyData.push(item);
            }
          });
          if (this.currentData.length == 1) {
            this.queryPage.cusId = this.currentData[0].cusId;
          }
        }
        this.getTableData();
      });
    },
    // 根据cusType判断客户类型
    cusTypeName(cusType) {
      if (cusType === 1) {
        return "个人业主";
      }
      if (cusType === 2) {
        return "个人租户";
      }
      if (cusType === 3) {
        return "个人住户";
      }
      if (cusType === 4) {
        return "公司业主";
      }
      if (cusType === 5) {
        return "公司租户";
      }
    },
    // 选择客户信息
    statusChange(type) {
      this.queryPage.cusId = "";
      if (type == 1) {
        if (this.currentData.length == 1) {
          this.queryPage.cusId = this.currentData[0].cusId;
        }
      } else {
        if (this.historyData.length == 1) {
          this.queryPage.cusId = this.historyData[0].cusId;
        }
      }
    },
    // 按客户 行点击
    GuestRowClick(row) {
      this.cusName = row.cusName;
      this.queryPage.cusId = row.cusId;
      this.onSubmit();
    },
    // 下一页
    handleCurrentChange(currentPage) {
      this.queryPage.startRownumber =
        (currentPage - 1) * this.queryPage.pageSize;
      this.getTableData(); //获取表格数据
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    // 表格 行点击
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    // 获取 表 数据
    getTableData() {
      selectByPage(this.queryPage, this.cusName).then((response) => {
        this.tableData = response.returnData;
        this.returnTotal = response.returnTotal;
        if (this.TreeNavBar == 0 && this.currentData.length == 1) {
          if (this.tableData.length == 0) {
            this.disabledAccount = false;
          } else {
            this.disabledAccount = true;
          }
        } else {
          this.disabledAccount = true;
        }
      });
    },
    // 查询
    onSubmit() {
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.queryPage.startRownumber = 0; //点击树重置第一页0
      this.currentPage = 1; //点击树重置第一页
      this.getTableData();
    },
    // 建账
    createAccountAction() {
      this.showAccount = true;
      var data = {};
      data.roomid = this.queryPage.roomid;
      data.buildName = this.cusData[0].buildName;
      data.chargeArea = this.chargeArea;
      this.$refs.PopAccountChildren.getAccountData(data, 0);
    },
    // 修改
    updateAccountAction() {
      this.showAccount = true;
      this.tableRow.roomid = this.queryPage.roomid;
      this.$refs.PopAccountChildren.getAccountData(this.tableRow, 1);
    },
    // 批量建账
    batchCreateAction() {
      this.showBatchAccount = true;
      this.$refs.PopBatchAccountChildren.getBatchAccountData(
        this.ztreeDataSourceList
      );
    },
    // 充值
    payAction() {
      this.showRecharge = true;
      this.$refs.PopRechargeChildren.getRechargeData(this.tableRow);
    },
    // 批量充值
    batchPayAction() {
      this.showBatchRecharge = true;
      this.$refs.PopBatchRechargeChildren.getBatchRechargeData(
        this.ztreeDataSourceList
      );
    },
    // 公维金充值明细
    payRecordAction() {
      this.showRechargeRecord = true;
      this.$refs.PopRechargeRecordChildren.getData(this.tableRow.fundAccountID);
    },
    // 公维金使用记录
    useRecordAction() {
      this.showUseRecord = true;
      this.$refs.PopUseRecordChildren.getData(this.tableRow.fundAccountID);
    },
    /**左边树导航切换 */
    TreeNavSwich(index) {
      this.TreeNavBar = index;
      this.queryPage.cusId = "";
      if (index) {
        this.queryPage.belongPlot = null;
        this.queryPage.partid = null;
        this.queryPage.buildid = null;
        this.queryPage.roomid = null;
        this.disabledAccount = true;
      } else {
        this.cusName = "";
        this.disabledAccount = false;
        this.onSubmit();
      }
    },
    //刷新表数据
    RefreshList() {
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.queryPage.startRownumber = 0; //点击树重置第一页0
      this.currentPage = 1; //点击树重置第一页
      this.getTableData();
    },
    // 修改标题提示
    updateTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
  },
  components: {
    vueZtree,
    AccountDialog,
    BatchAccountDialog,
    RechargeDialog,
    BatchRechargeDialog,
    UseRecordDialog,
    RechargeRecordDialog,
  },
};
</script>

<style lang="scss" scoped>
.el-body {
  padding-left: 300px;
  .el-title {
    width: 300px;
    margin-left: -300px;
    .el-radio-group {
      width: 250px;
      margin: 20px auto -10px auto;
      text-align: center;
      .el-radio-button__inner {
        padding: 10px 12px !important;
      }
    }
  }
  .sum {
    margin-top: 20px;
    font-size: 14px;
    color: #606266;
  }
  .block {
    text-align: right;
    padding: 15px 0 5px 0;
  }
}
</style>
<style lang="scss">
.guest_wrap {
  margin-top: 17px;
  .guest_input {
    .el-input__inner {
      width: auto;
      outline: none;
      border: 1px solid #eceef2;
      border-radius: 20px;
      height: 30px;
      margin: 15px 30px;
    }
  }
}
</style>
