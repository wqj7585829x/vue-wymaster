<template>
  <div class="ReceivablesRegister">
    <!-- 左边数：按资源与按客户-->
    <div class="el-title" style="height: 100%; overflow: hidden" ref="elTitle">
      <el-radio-group v-model="TreeNavBar" class="nav" @change="TreeNavSwich">
        <el-radio-button label="1">按资源</el-radio-button>
        <el-radio-button label="2">按客户</el-radio-button>
      </el-radio-group>
      <!--按资源数据列表start-->
      <div v-show="TreeNavBar == 1">
        <section
          v-if="ztreeDataSourceList && ztreeDataSourceList.length > 0"
          class="tree_wrap"
          :style="contentStyleObj"
          ref="tree_wrap"
        >
          <!--树形组件-->
          <vuetree
            :list.sync="ztreeDataSourceList"
            :showInput="true"
            @getTreeData="getTreeData"
            ref="dotree"
          ></vuetree>
        </section>
      </div>
      <!--按资源数据列表end-->

      <!--按客户数据列表start-->
      <section
        v-show="TreeNavBar == 2"
        class="fee_guest_wrap"
        :style="contentStyleObj"
      >
        <el-input
          v-model="filterguest"
          placeholder="按客户名称或客户代码"
          class="guest_input"
          clearable
          v-if="isLazyLoad == 0"
        >
        </el-input>
        <el-input
          v-model="filterguest"
          placeholder="按客户名称或客户代码"
          class="guest_input"
          @keyup.enter.native="getGuestClient"
          clearable
          v-else
        >
          <i slot="suffix" class="el-icon-search" @click="getGuestClient"></i>
        </el-input>
        <section class="filter_wrap">
          <el-radio-group
            v-model="arrears"
            class="list_group"
            @change="filterChange"
          >
            <el-radio :label="1">欠费</el-radio>
            <el-radio :label="2">未欠费</el-radio>
            <el-radio :label="0">全部</el-radio>
          </el-radio-group>
        </section>
        <u-table
          :data="GuestTablesData"
          border
          @row-click="GuestRowClick"
          highlight-current-row
          ref="GuestChildren"
          class="guest_table"
          use-virtual
          :row-height="30"
          :height="Uheight"
        >
          <u-table-column label="客户名称" prop="KHDA_KHMC">
            <template slot-scope="scope">
              <span class="client_img" v-if="scope.row.num > 1"
                ><img src="@/assets/comImgs/client_m.png"
              /></span>
              <span class="client_img" v-else
                ><img src="@/assets/comImgs/client_s.png"
              /></span>
              <span class="client_name">{{ scope.row.KHDA_KHMC }}</span>
            </template>
          </u-table-column>
          <u-table-column label="客户代码" prop="KHDA_KHID"></u-table-column>
        </u-table>
      </section>
      <!--按客户数据列表end-->
      <section class="common_list_wrap">
        <el-radio-group
          v-model="listStatus"
          class="list_group"
          @change="StatusChange"
        >
          <el-radio :label="1">当前</el-radio>
          <el-radio :label="3">待退</el-radio>
          <el-radio :label="4">所有</el-radio>
        </el-radio-group>
        <div class="table_wrap">
          <!--按资源查询客户数据列表start -->
          <el-table
            style="width: 100%"
            :data="GuestData"
            highlight-current-row
            @row-click="ResourceRowClick"
            class="gusest_table"
            v-if="TreeNavBar == 1"
            ref="ResourcesingleTable"
          >
            <el-table-column
              label="客户名称"
              prop="KHDA_KHMC"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="状态" prop="FKGX_ZT">
              <template slot-scope="scope">
                {{ scope.row.FKGX_ZT === 1 ? "当前" : "" }}
                {{ scope.row.FKGX_ZT === 2 ? "历史" : "" }}
                {{ scope.row.FKGX_ZT === 3 ? "待退" : "" }}
              </template>
            </el-table-column>
          </el-table>
          <!--按资源查询客户数据列表end-->

          <!--按客户查询资源数据列表start-->
          <el-table
            style="width: 100%"
            :data="ResourceData"
            highlight-current-row
            @row-click="ClientRowClick"
            class="gusest_table"
            v-if="TreeNavBar == 2"
            ref="GuestsingleTable"
          >
            <el-table-column
              label="对应资源代码"
              prop="FKGX_FJID"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="状态" prop="ZT"></el-table-column>
          </el-table>
          <!--按客户查询资源数据列表end-->
        </div>
      </section>
    </div>
    <!-- 右边模块 orgAdd-->
    <div class="el-content" ref="elContentH">
      <div class="nav_barHeight" ref="barHeight">
        <ul class="nav-bar">
          <li
            class="nav-li"
            @click="NavSwich('NotReceipted', 1)"
            v-if="this.ReceiNotReceipted_has()"
          >
            <span :class="{ on: isCheck == 1 }">未收清费用</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('ClearedReceivables', 2)"
            v-if="this.ReceiClearedReceivables_has()"
          >
            <span :class="{ on: isCheck == 2 }">已收清费用</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('CollectionCredentials', 3)"
            v-if="this.ReceiCollectionCredentialshas()"
          >
            <span :class="{ on: isCheck == 3 }">收款凭证</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('DisposableCharge', 4)"
            v-if="this.ReceiCollectionDisposableCharge()"
          >
            <span :class="{ on: isCheck == 4 }">一次性费用</span>
          </li>
          <li
            class="nav-li"
            @click="NavSwich('TicketBill', 5)"
            v-if="this.ReceiTicketBill_has()"
          >
            <span :class="{ on: isCheck == 5 }">票据</span>
          </li>
          <!-- <li class="nav-li" @click="NavSwich('ElectronicTicketBill',6)">
            <span :class="{'on':isCheck == 6}">电子发票</span></li> -->
        </ul>
      </div>
      <div>
        <!-- 各个模块组件 -->
        <keep-alive>
          <component
            :is="skzxcomp"
            :resourceName="resourceName"
            :TreeNavBar="TreeNavBar"
            ref="NavCompChildren"
            :clickTreeObjVal="clickTreeObjVal"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import vuetree from "../../../components/Eltree/treeItem.vue";
import NotReceipted from "./NotReceipted"; //未收清款项
import ClearedReceivables from "./ClearedReceivables"; //已收清款项
import CollectionCredentials from "./CollectionCredentials"; //收款凭证
import DisposableCharge from "./DisposableCharge"; //一次性费用
import TicketBill from "./TicketBill"; //票据
import ElectronicTicketBill from "./ElectronicTicketBill"; //电子发票
import { UTable, UTableColumn } from "umy-ui";
import {
  getTree,
  queryResourceClient,
  queryGuestClient,
  queryGuestResource,
  queryIsLazyLoadApi,
} from "@/api/FeeManagement/ReceivablesRegister"; //收款登记Api

export default {
  name: "ReceivablesRegister",
  data() {
    return {
      skzxcomp: "NotReceipted", //默认选中未收清款项NotReceipted
      isCheck: 1, //1
      clickTreeObjVal: {}, //传递点击树给费用调整
      ztreeDataSourceList: [], //按资源树数据
      tableSourceList: [], //按资源表格数据
      TreeNavBar: 1,
      content: null, //客户搜索
      filterguest: "", //客户搜索变量
      tableGuestList: [], //右边客户列表
      GuestData: [], //左边树客户列表
      ResourceData: [], //右边客户资源列表
      listStatus: 4, //资源或者客户 对应状态选中  状态1当天2历史3待退
      arrears: 1, //按客户列表筛选状态   0全部  1欠费 2未欠费
      resourceName: "", //资源名称
      parameObj: {}, //左侧点击的数据传递参数对象
      clientResourceRow: {}, //右边客户列表选中的的数据下的资源数据对象
      contentStyleObj: {
        height: "",
        overflow: "auto",
        clear: "both",
      },
      Uheight: "",
      isClick: false, //是否点击过按客户查询 默认没有点击
      isLazyLoad: 0, //是否延迟加载 1是  0否
      treeWrapscrollTop: 0, //资源树保存滚动条位置
    };
  },
  mounted() {
    this.isCheck = this.ReceiNotReceipted_has()
      ? 1
      : this.ReceiClearedReceivables_has()
      ? 2
      : this.ReceiCollectionCredentialshas()
      ? 3
      : this.ReceiCollectionDisposableCharge()
      ? 4
      : this.ReceiTicketBill_has()
      ? 5
      : "";
    this.skzxcomp = this.ReceiNotReceipted_has()
      ? "NotReceipted"
      : this.ReceiClearedReceivables_has()
      ? "ClearedReceivables"
      : this.ReceiCollectionCredentialshas()
      ? "CollectionCredentials"
      : this.ReceiCollectionDisposableCharge()
      ? "DisposableCharge"
      : this.ReceiTicketBill_has()
      ? "TicketBill"
      : "";
    this.getReourceList(); //查询资源树
    this.Uheight = this.$refs.elTitle.offsetHeight - 280 + "px";
    var _this = this;
  },
  methods: {
    ReceiNotReceipted_has() {
      //未收清款项
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ReceiNotReceipted_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ReceiClearedReceivables_has() {
      //已收清款项
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ReceiClearedReceivables_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ReceiCollectionCredentialshas() {
      //收款凭证
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ReceiCollectionCredentialshas") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ReceiCollectionDisposableCharge() {
      //一次性费用
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ReceiCollectionDisposableCharge") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    ReceiTicketBill_has() {
      //票据
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("ReceiTicketBill_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    getLoadzyRequest() {
      //获取配置显示状态   是否延迟加载
      var _this = this;
      queryIsLazyLoadApi().then((response) => {
        this.isLazyLoad = response.isLazyLoad;
        return new Promise(function (resolve, reject) {
          _this.getGuestClient(); //按客户查询
          resolve();
        });
      });
    },
    getReourceList() {
      //按资源查询数据
      var _this = this;
      this.isClick = false;
      getTree(this.filterguest).then((response) => {
        var data = response;
        this.ztreeDataSourceList = data;
        this.contentStyleObj.height =
          this.$refs.elTitle.offsetHeight - 210 + "px";
        this.$nextTick(() => {
          this.$refs.dotree.setCheckTree(this.ztreeDataSourceList[0].id);
        });
        this.$refs.NavCompChildren.getInitial(); //首次加载调用 获取未收清收费项目及栏位配置

        //前往收款登记
        if (this.$route.query.PJLYMX_FJID) {
          //首页票据查询--前往收款登记-更新
          this.$nextTick(() => {
            this.$refs.dotree.GofilterText(_this.$route.query.PJLYMX_FJID);
            this.isCheck = 3; //选中--收款凭证
            this.skzxcomp = CollectionCredentials; //显示--收款凭证页面
          });
        }
      });
    },

    //按资源点击事件
    getTreeData(val) {
      console.log(val);
      this.clickTreeObjVal = val; //点击树传值集团id，小区id，楼栋id等给费用调整
      this.resourceName = this.clickTreeObjVal.data.FCDM_MS; //树的资源的名称
      if (this.clickTreeObjVal.data.FCDM_LX == "房间") {
        this.getReourceListClient(this.clickTreeObjVal.data.FCDM_ZJ);
      } else {
        this.GuestData = [];
        this.parameObj = {};
      }
      this.$refs.NavCompChildren.getPermission(
        this.clickTreeObjVal,
        this.TreeNavBar
      ); //设置费用调整按钮是否可点击
    },
    getReourceListClient(FCDM_ZJ) {
      //按资源查询客户列表数据
      queryResourceClient(FCDM_ZJ, this.listStatus).then((response) => {
        this.GuestData = response;
        this.parameObj = this.GuestData[0];
        if (this.GuestData.length > 0) {
          this.parameObj = this.GuestData[0];
        } else {
          this.parameObj = {};
        }
        this.$refs.ResourcesingleTable.setCurrentRow(this.parameObj); //默认选中资源树客户列表第一个
        if (this.isCheck != "") {
          this.$refs.NavCompChildren.RecequeryByPage(
            this.parameObj,
            this.TreeNavBar
          ); //给子模块传递参数
        }
      });
    },
    /**左边树导航切换 */
    TreeNavSwich(index) {
      //index 1为按资源，2按客户
      this.TreeNavBar = index;
      if (this.TreeNavBar == 2) {
        this.resourceName = "";
        //获取右边客户列表
        if (!this.isClick) {
          //第一次调用获取用户接口
          this.getLoadzyRequest(); //动态配置 延迟加载
          this.isClick = true;
        }
      }
      this.$refs.NavCompChildren.getPermission(this.clickTreeObjVal, index); //设置费用调整按钮是否可点击
    },
    getGuestClient() {
      //按客户查询列表
      queryGuestClient(this.filterguest, this.arrears).then((response) => {
        this.tableGuestList = response;
      });
    },
    StatusChange(val) {
      this.listStatus = val;
      //单选按钮切换
      //TreeNavBar 1按资源 2按客户
      if (this.TreeNavBar == 1) {
        queryResourceClient(
          this.clickTreeObjVal.data.FCDM_ZJ,
          this.listStatus
        ).then((response) => {
          this.GuestData = response;
        });
      } else {
        //查询右边客户资源列表
        queryGuestResource(
          this.clientResourceRow.KHDA_ZJ,
          this.listStatus
        ).then((response) => {
          this.ResourceData = response;
        });
      }
    },
    filterChange() {
      //按客户 状态筛选改变事件 //欠费 未欠费 全部
      this.getGuestClient(); //查询客户列表
    },
    /**标签选项切换--未收清款项与收款凭证等其他选项 */
    NavSwich(val, index) {
      this.skzxcomp = val;
      this.isCheck = index;
      this.$nextTick(function () {
        this.$refs.NavCompChildren.RecequeryByPage(
          this.parameObj,
          this.TreeNavBar
        ); //未收清款项表格列表--按客户查询资源  点击资源列表
        this.$refs.NavCompChildren.getPermission(
          this.clickTreeObjVal,
          this.TreeNavBar
        ); //设置费用调整按钮是否可点击
      });
    },
    GuestRowClick(row) {
      //按客户列表  点击事件
      this.clientResourceRow = row;
      this.parameObj = row; //按客户列表  点击选中的对象 导航切换传递的参数
      this.$refs.dotree.resetChecked(); //点击客户列表时  重置左边树的选中
      if (this.isCheck != 5) {
        this.$nextTick(() => {
          this.$refs.NavCompChildren.RecequeryByPage(
            this.clientResourceRow,
            this.TreeNavBar
          ); //未收清款项表格列表--点击客户列表
        });
      }
      //查询按客户资源列表
      queryGuestResource(row.KHDA_ZJ, this.listStatus).then((response) => {
        this.ResourceData = response;
        this.parameObj = this.ResourceData[0];
        this.$refs.GuestsingleTable.setCurrentRow(this.ResourceData[0]); //默认选中资源树客户列表第一个
        if (this.isCheck == 5) {
          //如果是票据 需要资源列表的数据
          this.$nextTick(() => {
            this.$refs.NavCompChildren.RecequeryByPage(
              this.ResourceData[0],
              this.TreeNavBar
            ); //未收清款项表格列表--点击客户列表
          });
        }
      });
    },
    ResourceRowClick(row) {
      //资源树客户列表点击事件
      this.parameObj = row;
      this.$refs.NavCompChildren.RecequeryByPage(
        this.parameObj,
        this.TreeNavBar
      ); //未收清款项表格列表--按资源查询客户 点击客户查询
    },
    ClientRowClick(row) {
      //客户资源列表点击事件
      this.parameObj = row;
      if (this.isCheck == 5) {
        this.$refs.NavCompChildren.RecequeryByPage(row, this.TreeNavBar); //未收清款项表格列表--按客户查询资源  点击资源列表
      }
    },
  },
  computed: {
    GuestTablesData() {
      var _this = this;
      if (this.isLazyLoad == 1) {
        return this.tableGuestList;
      } else {
        return this.tableGuestList.filter((dataNews) => {
          return (
            (dataNews.KHDA_KHMC &&
              dataNews.KHDA_KHMC.toLowerCase().indexOf(
                this.filterguest.toLowerCase()
              ) > -1) ||
            (dataNews.KHDA_KHID &&
              dataNews.KHDA_KHID.toLowerCase().indexOf(
                this.filterguest.toLowerCase()
              ) > -1)
          ); //dataNews.KHDA_KHMC,dataNews.KHDA_KHID undefined判断才可以toLowerCase
        });
      }
    },
  },
  components: {
    vuetree,
    NotReceipted,
    ClearedReceivables,
    CollectionCredentials,
    DisposableCharge,
    TicketBill,
    ElectronicTicketBill,
    UTable,
    UTableColumn,
  },
  activated() {
    //进入会触发
    if (this.treeWrapscrollTop > 0) {
      //这句必须，不然scrollTop会undefined
      this.$refs.tree_wrap.scrollTop = this.treeWrapscrollTop;
    }
  },
  deactivated() {
    //退出后触发
    this.treeWrapscrollTop = this.$refs.tree_wrap.scrollTop;
  },
};
</script>
<style lang="scss">
.ReceivablesRegister {
  height: 100%;
  width: 100%;
  overflow: auto;
  padding-left: 220px;
  background: #fff;
  border-radius: 5px;
  .el-title {
    height: 100%;
    float: left;
    width: 220px;
    margin-left: -220px;
    overflow: auto;
    border-right: 1px solid #f1f1f1;
    padding: 0 !important;
    .el-radio-group {
      .el-radio-button__inner {
        padding: 10px 12px !important;
        height: 36px;
      }
    }
    .common_list_wrap {
      padding: 0 10px;
      .list_group {
        margin: 20px 0 !important;
      }
      .gusest_table {
        height: 120px;
        overflow: auto;
      }
      .el-radio {
        margin-right: 13px !important;
      }
      .table_wrap {
        .el-table::before {
          display: none;
        }
      }
    }
    .filter_wrap {
      margin-top: 10px;
      padding: 0 15px;
      .list_group {
        margin: 0px !important;
      }
      .el-radio {
        margin-right: 10px !important;
      }
      .el-radio__label {
        padding-left: 5px !important;
      }
    }
  }
  .el-content {
    padding: 0;
    overflow: auto;
    .nav_barHeight {
      height: 36px;
      background: #ebecf2;
      // position:sticky;//sticky实现粘性布局，介于relative与fixed之间;父元素不能overflowauto/hidden;如果要用overflow必须要用overflow:visible;
      // position:-webkit-sticky;
      // top:0;//须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同
      // z-index: 100;
    }
    .nav-bar {
      height: 36px;
      line-height: 36px;
      .nav-li {
        list-style-type: none;
        float: left;
        width: 120px;
        height: 36px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: rgba(77, 77, 77, 1);
        background: rgba(214, 215, 220, 1);
        .on {
          display: block;
          width: 120px;
          height: 36px;
          background: rgba(255, 255, 255, 1);
          border-radius: 0px 8px 0px 0px;
          overflow: hidden;
          color: #2e8ad7;
        }
      }
      :last-child {
        border-top-right-radius: 8px;
      }
    }
  }
  .fee_guest_wrap {
    margin-top: 10px;
    .guest_input {
      padding: 0 10px;
      .el-input__inner {
        width: 190px;
        height: 28px;
        outline: none;
        background: #dfe0e6;
        border: 1px solid #eceef2;
        border-radius: 20px;
        padding-right: 25px;
        margin: 0 !important;
      }
      .el-input__suffix {
        right: 20px;
        top: 6px;
      }
      .el-input__icon {
        line-height: 0 !important;
        height: auto !important;
      }
    }
    .guest_table {
      margin-top: 14px;
      overflow: auto;
      padding: 0 10px;
      .client_img {
        position: absolute;
        left: 5px;
        img {
          width: 16px;
        }
      }
      .client_name {
        margin-left: 10px;
      }
    }
  }
  .tree_wrap {
    padding: 0 10px;
    .el-tree {
      margin-top: 14px;
    }
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
  }
  .nav {
    width: 220px;
    .el-radio-button__inner {
      border: none !important;
      border-radius: 0 !important;
      width: 100% !important;
      color: #4d4d4d;
      font-weight: 700;
      font-size: 14px;
      background: rgba(214, 215, 220, 1);
    }
    .el-radio-button {
      width: 50%;
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: #2e8ad7;
      background: #fff;
      box-shadow: none;
      font-weight: 700;
      font-size: 14px;
    }
  }
}
</style>
