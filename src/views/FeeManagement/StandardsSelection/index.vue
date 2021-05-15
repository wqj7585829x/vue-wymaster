<template>
  <div class="el-body">
    <div class="el-title">
      <div v-if="ztreeDataSourceList.length > 0">
        <!--树形组件-->
        <vue-ztree
          :list.sync="ztreeDataSourceList"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          @getTreeData="getTreeData"
        ></vue-ztree>
      </div>
    </div>
    <div class="el-content">
      <div class="standardRight">
        <!-- 搜索框begin -->
        <div class="select">
          <el-form label-width="75px">
            <el-row :gutter="50">
              <el-col :span="6" style="width: 300px">
                <el-form-item label="类型筛选：">
                  <el-select
                    v-model="queryStanSelByPage.type"
                    @change="typeChange"
                  >
                    <el-option label="常规类" :key="1" :value="1"></el-option>
                    <el-option label="走表类" :key="2" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6" style="width: 300px">
                <el-form-item label="收费项目：">
                  <el-select
                    v-model="queryStanSelByPage.SFXM_ZJ"
                    @change="itemChange"
                    clearable
                  >
                    <el-option
                      v-for="item in itemData"
                      :key="item.SFXM_ZJ"
                      :label="item.SFXM_SFXMMC"
                      :value="item.SFXM_ZJ"
                    ></el-option>
                  </el-select>
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
            @click="addWalkMeter"
            :disabled="disabledadd"
            :title="addTitle"
            v-has="'StandardsSelectionAdd_has'"
            >新增走表</el-button
          >
          <el-button
            type="primary"
            @click="updateWalkMeter"
            :disabled="disabledupdate"
            :title="updateTitle()"
            v-has="'StandardsSelectionUpdate_has'"
            >修改</el-button
          >
          <!-- <el-button type="danger"  @click="deleteWalkMeter" :disabled="disabledelete" :title="detelteTitle()">删除</el-button> -->
          <el-button
            type="primary"
            @click="batchShow"
            :disabled="disabledbatch"
            :title="batchTitle()"
            v-has="'StandardsSelectionBatch_has'"
            >批量</el-button
          >
          <el-button
            type="primary"
            @click="CancelApplication"
            :disabled="disabledNumApp"
            v-if="isChargeStandardApprovedFlag"
            >取消审核</el-button
          >
          <el-button
            type="primary"
            @click="RefreshBtn"
            v-has="'StandardsSelectionRefresh_has'"
            >刷新</el-button
          >
          <el-button
            type="danger"
            @click="deleteWalkMeter"
            :disabled="disabledelete"
            v-has="'StandardsSelectionDel_has'"
            >删除</el-button
          >
          <el-button
            type="primary"
            @click="filedConfiClick"
            class="custom_field"
            icon="el-icon-setting"
            v-has="'StandardsSelectionConfig_has'"
            >自定义栏位
          </el-button>
        </div>
        <!-- 按钮end -->

        <!-- 常规类列表 begin -->

        <u-table
          v-if="typeValue == 1"
          ref="multipleTable"
          :data="tableData"
          border
          @row-click="rowclick"
          :max-height="tableHeight"
          :data-changes-scroll-top="false"
          use-virtual
          :row-height="35"
        >
          <u-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </u-table-column>
          <div v-for="(item, index) in checkData" :key="index">
            <div v-if="item.content == '收款中'">
              <u-table-column :label="item.content" :width="item.width">
                <template slot-scope="scope">
                  <span v-if="scope.row.ZBJS_KSSK"
                    ><el-checkbox
                      v-model="scope.row.ZBJS_KSSK"
                      disabled
                    ></el-checkbox
                  ></span>
                  <span v-else-if="scope.row.CGJS_KSSK"
                    ><el-checkbox
                      v-model="scope.row.CGJS_KSSK"
                      disabled
                    ></el-checkbox
                  ></span>
                  <span v-else><el-checkbox disabled></el-checkbox></span>
                </template>
              </u-table-column>
            </div>
            <div v-else>
              <u-table-column
                :prop="item.field"
                :label="item.content"
                :width="item.width"
                :key="Math.random()"
                show-overflow-tooltip
              >
              </u-table-column>
            </div>
          </div>
        </u-table>

        <!-- 常规类列表 end -->
        <!-- 走表类列表 begin -->
        <u-table
          v-if="typeValue == 2"
          ref="multipleTable"
          :data="tableData"
          border
          @row-click="rowclick"
          :max-height="tableHeight"
          :data-changes-scroll-top="false"
          use-virtual
          :row-height="35"
        >
          <u-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </u-table-column>
          <div v-for="(item, index) in checkData" :key="index">
            <div v-if="item.content == '收款中'">
              <u-table-column :label="item.content" :width="item.width">
                <template slot-scope="scope">
                  <span v-if="scope.row.ZBJS_KSSK"
                    ><el-checkbox v-model="scope.row.ZBJS_KSSK"></el-checkbox
                  ></span>
                  <span v-else-if="scope.row.CGJS_KSSK"
                    ><el-checkbox v-model="scope.row.CGJS_KSSK"></el-checkbox
                  ></span>
                  <span v-else><el-checkbox disabled></el-checkbox></span>
                </template>
              </u-table-column>
            </div>
            <div v-else>
              <u-table-column
                :prop="item.field"
                :label="item.content"
                :width="item.width"
                :key="Math.random()"
                show-overflow-tooltip
              >
              </u-table-column>
            </div>
          </div>
        </u-table>
        <!-- 走表类列表 end -->
      </div>

      <!-- 修改弹框 begin -->
      <StandardsDialog
        :showUpdateDisable.sync="showUpdateDisable"
        ref="PopStandChildren"
        @RefreshItem="RefreshList"
      >
      </StandardsDialog>
      <!-- 修改弹框 end -->

      <!-- 新增走表 弹框 begin -->
      <WalkTableDialog
        :showWalk.sync="showWalk"
        ref="PopWalkChildren"
        @RefreshItem="RefreshList"
        :getTreeObj="getTreeObj"
      ></WalkTableDialog>
      <!-- 新增走表 弹框 end -->

      <!-- 批量 弹框 begin -->
      <BatchDialog
        :showBatch.sync="showBatch"
        :getTreeObj="getTreeObj"
        ref="PopBatchChildren"
        @RefreshItem="RefreshList"
      >
      </BatchDialog>
      <!-- 批量 弹框 end -->

      <!-- 自定义栏位start -->
      <FieldConfig
        :showFieldConfig.sync="showFieldConfig"
        @RefreshItem="fieldRefrefsh"
        ref="fieldChildren"
      >
      </FieldConfig>
      <!-- 自定义栏位end  -->
    </div>
  </div>
</template>

<script>
import vueZtree from "../../../components/Eltree/treeItem.vue";
import StandardsDialog from "./components/StandardsDialog"; //修改
import WalkTableDialog from "./components/WalkTableDialog"; //新增走表
import BatchDialog from "./components/BatchDialog"; //批量
import fieldMinxin from "@/components/FieldConfig/field.js"; //自定义栏位 注入
import {
  getTree,
  queryChargeItem,
  queryCommonList,
  queryWalkList,
  refreshTableBtn,
  deleteGoWatchApi,
  getChargingStandardApprovedApi,
  CancelApplicationApi,
} from "@/api/FeeManagement/StandardsSelection"; //标准选用js
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "StandardsSelection",
  mixins: [fieldMinxin], //注入
  data() {
    return {
      radio: "",
      disabledadd: true, //新增走表
      disabledupdate: true, //修改
      disabledelete: true, //删除
      disabledbatch: true, //批量
      disabledNumApp: true, //取消审核
      labelName: "常规费用", //项目类别名称
      ztreeDataSourceList: [], //左边树数据
      itemData: [], //项目类别数据
      tableData: [], //列表数据
      tableOnceData: {},
      queryStanSelByPage: {
        type: 1,
        SFXM_ZJ: null,
      },
      tableParameter: {
        CGJS_SFXMWJ: "",
        CGJS_FJWJ: null,
        ZBJS_DLWJ: null,
        ZBJS_SFXMWJ: "",
        ZBJS_FJWJ: null,
        SFXM_ID: null,
        SFXM_MC: null,
        CGJS_DLWJ: null,
        CGJS_FJWJ: null,
        ZBJS_DLWJ: null,
        ZBJS_FJWJ: null,
      },
      typeValue: 1, //1 常规类  2 走表类
      showUpdateDisable: false, //默认修改弹窗隐藏
      showBatch: false, //默认批量弹窗隐藏
      showWalk: false, //默认新增走表弹窗隐藏
      getTreeObj: {},
      isAdd: false, //是否 新增走表
      addTitle: "", //新增走表按钮标题提示
      code: "StandardsSelectionCG", //默认模块栏位配置为常规类
      showFieldConfig: false, //自定义栏位默认隐藏
      CGconfigData: [
        //常规类默认配置栏位
        { content: "收款中", width: 75, field: "ZBJS_KSSK" },
        { content: "资源代码", width: 150, field: "CGJS_FJID" },
        { content: "资源名称", width: 150, field: "FJDA_FJMC" },
        { content: "客户名称", width: 150, field: "KHDA_KHMC" },
        { content: "状态", width: 100, field: "FKGX_ZT" },
        { content: "项目名称", width: 150, field: "CGJS_SFXMMC" },
        { content: "标准名称", width: 150, field: "CGJS_CGBZMC" },
        { content: "定价方式", width: 120, field: "CGJS_DJFS" },
        { content: "客户类别", width: 100, field: "FKGX_LX" },
        { content: "设定日期", width: "", field: "CGJS_QCRQ" },
      ],
      ZBconfigData: [
        //走表类默认配置栏位
        { content: "收款中", width: 75, field: "ZBJS_KSSK" },
        { content: "资源代码", width: 150, field: "ZBJS_FJID" },
        { content: "资源名称", width: 150, field: "FJDA_FJMC" },
        { content: "表名称", width: 150, field: "ZBJS_BMC" },
        { content: "表代码", width: 150, field: "ZBJS_BDM" },
        { content: "客户名称", width: 150, field: "ZBJS_KHMC" },
        { content: "状态", width: 100, field: "FKGX_ZT" },
        { content: "项目名称", width: 150, field: "ZBJS_SFXMMC" },
        { content: "标准名称", width: 150, field: "ZBJS_ZBBZMC" },
        { content: "客户类别", width: 100, field: "FKGX_LX" },
        { content: "设定日期", width: "", field: "ZBJS_QCRQ" },
      ],
      configData: [],
      tableHeight: 600, //表格默认高度
      isChargeStandardApprovedFlag: 0, //获取是否开启集团审核,默认0不开启
    };
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        if (this.tableOnceData.CGJS_KSSK || this.tableOnceData.ZBJS_KSSK) {
          this.disabledupdate = true;
        } else {
          this.disabledupdate = false;
        }
        /**判断新增走表按钮是否可点击 */
        if (Object.keys(this.getTreeObj).length != 0) {
          if (
            this.getTreeObj.data.FCDM_LX == "房间" &&
            this.tableData.length > 0 &&
            this.tableParameter.ZBJS_SFXMWJ != "" &&
            this.tableOnceData.FKGX_ZT !== "待退"
          ) {
            //如果类型是走表类且房间有数据   新增走表按钮才可以点击
            this.isAdd = true;
            this.addTitle = "";
          } else {
            this.isAdd = false;
            if (this.tableOnceData.FKGX_ZT == "待退") {
              this.addTitle = "待退状态不可新增";
            } else {
              this.addTitle = "";
            }
          }
          if (
            this.getTreeObj.data.FCDM_LX == "房间" &&
            this.queryStanSelByPage.type == 2 &&
            this.tableParameter.ZBJS_SFXMWJ != "" &&
            this.tableData.length >= 2 &&
            !this.tableOnceData.CGJS_KSSK
          ) {
            this.disabledelete = false;
          } else {
            this.disabledelete = true;
          }
        } else {
          this.isAdd = false;
        }

        if (this.tableOnceData.num && this.tableOnceData.num > 0) {
          this.disabledNumApp = false;
        } else {
          this.disabledNumApp = true;
        } //判断如果num大于0，可以点击‘取消审核’
      } else {
        this.disabledupdate = true;
        this.disabledelete = true;
        this.isAdd = false;
        this.disabledNumApp = true;
        this.addTitle = "请选择表格数据";
      }
    },
    isAdd() {
      if (this.isAdd) {
        this.disabledadd = false;
        this.addTitle = "";
      } else {
        this.disabledadd = true;
      }
    },
  },
  mounted() {
    this.configData = this.CGconfigData; //默认配置显示常规类
    this.getTreeFun();
    this.typeChange(1);
    this.getChargingStandardApproved(); //获取是否开启集团审核
  },
  beforeUpdate() {
    this.$nextTick(() => {
      //在数据加载完，重新渲染表格
      this.$refs["multipleTable"].doLayout();
    });
  },
  methods: {
    getChargingStandardApproved() {
      //获取是否开启集团审核
      getChargingStandardApprovedApi().then((response) => {
        if (response) {
          this.isChargeStandardApprovedFlag = response.isChargeStandardApproved; //是否开启 1开启
        }
      });
    },
    CancelApplication() {
      //取消审核
      this.$confirm("此操作将取消审核此对应数据, 是否继续?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          CancelApplicationApi(this.tableOnceData).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.radio = ""; //清空选中
              this.getTabList();
            }
          });
        })
        .catch(() => {});
    },
    // 获取左边树
    getTreeFun() {
      getTree().then((response) => {
        var data = response;
        if (data) {
          this.ztreeDataSourceList = data;
          if (this.ztreeDataSourceList.length > 0) {
            this.$nextTick(() => {
              this.$refs.dotree.setCheckTree(this.ztreeDataSourceList[0].id); //默认选中第一条
            });
          }
        }
      });
    },
    // 点击 获取树节点数据
    getTreeData(val) {
      this.getTreeObj = val;
      if (val.data.FCDM_LX == "大楼" || val.data.FCDM_LX == "房间") {
        if (val.data.FCDM_LX == "大楼") {
          this.tableParameter.CGJS_DLWJ = val.data.FCDM_ZJ; //常规大楼外键id
          this.tableParameter.ZBJS_DLWJ = val.data.FCDM_ZJ; //常规大楼外键id
          this.tableParameter.CGJS_FJWJ = null;
          this.tableParameter.ZBJS_FJWJ = null;
        } else {
          this.tableParameter.CGJS_FJWJ = val.data.FCDM_ZJ; //常规房间外键id
          this.tableParameter.ZBJS_FJWJ = val.data.FCDM_ZJ; //走表房间外键id
          this.tableParameter.CGJS_DLWJ = null;
          this.tableParameter.ZBJS_DLWJ = null;
        }
        this.getTabList();
      } else {
        this.tableData = [];
        this.disabledbatch = true;
      }
      this.radio = ""; //选择后清空选中表格按钮
      this.tableOnceData = {}; //选择后清空选中表格数据
    },
    // 类型筛选 获取 收费项目
    typeChange(val) {
      this.queryStanSelByPage.SFXM_ZJ = ""; //清空选中的收费项目
      this.radio = ""; //清空选中的列表
      this.tableOnceData = {}; //选择后清空选中表格数据
      this.typeValue = val;
      this.tableParameter.CGJS_SFXMWJ = ""; //清空常规类收费项目主键
      this.tableParameter.ZBJS_SFXMWJ = ""; //清空走表类收费项目主键
      if (val == 1) {
        this.showupdatebtn = false;
        this.showdeletebtn = false;
        this.labelName = "常规费用";
      } else if (val == 2) {
        this.showupdatebtn = true;
        this.showdeletebtn = true;
        this.labelName = "走表费用";
      }
      if (this.typeValue == 1) {
        //1 常规类   2走表类
        this.code = "StandardsSelectionCG";
        this.configData = this.CGconfigData;
      } else {
        this.code = "StandardsSelectionZB";
        this.configData = this.ZBconfigData;
      }
      this.getTabList();
      this.$nextTick(() => {
        queryChargeItem(this.labelName).then((response) => {
          this.itemData = response;
        });
      });
    },
    getTabList() {
      if (this.typeValue == 1) {
        //获取常规列表数据
        queryCommonList(this.tableParameter).then((response) => {
          this.tableData = response;
          //选中树并且选择收费项目 才可以批量
          this.$nextTick(() => {
            if (
              this.tableParameter.CGJS_SFXMWJ != "" &&
              this.getTreeObj.data.FCDM_LX == "大楼" &&
              this.tableData.length > 0
            ) {
              this.disabledbatch = false;
            } else {
              this.disabledbatch = true;
            }
            this.getFieldConfig(this.code); //栏位配置查询
            this.getHeight(); //表格高度
          });
        });
      } else {
        //获取走表列表数据
        queryWalkList(this.tableParameter).then((response) => {
          this.tableData = response;
          //选中树并且选择收费项目 才可以批量
          this.$nextTick(() => {
            if (
              this.tableParameter.ZBJS_SFXMWJ != "" &&
              this.getTreeObj.data.FCDM_LX == "大楼" &&
              this.tableData.length > 0
            ) {
              this.disabledbatch = false;
            } else {
              this.disabledbatch = true;
            }
            this.getFieldConfig(this.code); //栏位配置查询
          });
        });
      }
    },
    // 收费项目 选择
    itemChange(val) {
      //选中树并且选择收费项目 才可以批量
      if (
        val &&
        this.getTreeObj.data.FCDM_LX == "大楼" &&
        this.tableData.length > 0
      ) {
        this.disabledbatch = false;
      } else {
        this.disabledbatch = true;
      }
      this.radio = "";
      this.tableOnceData = {}; //选择后清空选中表格数据
      if (this.typeValue == 1) {
        this.tableParameter.CGJS_SFXMWJ = val;
      } else {
        this.tableParameter.ZBJS_SFXMWJ = val;
      }
      this.itemData.forEach((item) => {
        if (val == item.SFXM_ZJ) {
          this.tableParameter.SFXM_ID = val;
          this.tableParameter.SFXM_MC = item.SFXM_SFXMMC;
        }
      });
      this.getTabList();
    },
    filedConfiClick() {
      //自定义栏位
      this.showFieldConfig = true;
      this.$refs.fieldChildren.getReceiptData(
        this.queryData,
        this.configData,
        this.code
      );
    },
    // 行点击
    rowclick(row) {
      this.tableOnceData = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    // 新增走表
    addWalkMeter() {
      this.showWalk = true;
      this.$refs.PopWalkChildren.getWalkMeterData(
        this.tableOnceData,
        this.tableParameter.SFXM_ID,
        this.typeValue,
        this.tableData.length + 1
      );
    },
    // 修改
    updateWalkMeter() {
      this.showUpdateDisable = true;
      this.$refs.PopStandChildren.getStandsData(
        this.tableOnceData,
        this.typeValue,
        2
      );
    },
    // 删除
    deleteWalkMeter() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteGoWatchApi(this.tableOnceData).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.radio = ""; //清空选中
              this.getTabList();
            }
          });
        })
        .catch(() => {});
    },
    // 批量
    batchShow() {
      this.radio = "";
      this.showBatch = true;
      this.$refs.PopBatchChildren.getBatchData(
        this.tableParameter,
        this.typeValue
      );
    },
    RefreshBtn() {
      //按钮刷新
      refreshTableBtn().then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.$nextTick(() => {
            this.radio = ""; //清空选中
            this.getTabList();
          });
        }
      });
    },
    // 刷新 表
    RefreshList(type, newRowObj) {
      //this.radio = ""; //清空选中
      this.queryStanSelByPage.type = type;
      this.getTabList();
      this.tableOnceData = newRowObj;
    },
    fieldRefrefsh(obj) {
      //栏位配置回调刷新
      this.checkData = [];
      this.saveConfig(obj, this.code); //保存栏位配置
    },
    // 修改标题提示
    updateTitle() {
      //设置默认收款方式 修改 删除提示
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
    // 批量标题提示
    batchTitle() {
      if (this.disabledbatch) {
        return "请选择大楼与收费项目";
      }
    },
    getHeight() {
      //动态计算表格高度
      // 需要减去的高度
      this.tableHeight =
        window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 100;
      // 窗口变化重置表格高度
      window.onresize = () => {
        this.tableHeight =
          window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 100;
      };
    },
  },
  components: {
    vueZtree,
    WalkTableDialog,
    BatchDialog,
    StandardsDialog,
    fieldMinxin,
    UTable,
    UTableColumn,
  },
};
</script>

<style lang="scss" scoped>
.el-body {
  padding-left: 220px;
}
.el-body /deep/ .el-title {
  width: 220px;
  margin-left: -220px;
}
.custom_field {
  float: right;
}
</style>
