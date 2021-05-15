<template>
  <div class="el-body HouseAccounts">
    <!-- 左边数：按资源与按客户 -->
    <div class="el-title" style="height: 100%" ref="elTitle">
      <el-radio-group v-model="TreeNavBar" class="nav">
        <el-radio-button label="1" @click.native="TreeNavSwich(1)"
          >按资源</el-radio-button
        >
        <el-radio-button label="2" @click.native="TreeNavSwich(2)"
          >按客户</el-radio-button
        >
      </el-radio-group>
      <div
        v-if="ztreeDataSourceList && ztreeDataSourceList.length > 0"
        v-show="TreeNavBar == 1"
        class="tree_wrap"
        :style="contentStyleObj"
      >
        <!--树形组件-->
        <vuetree
          :list.sync="ztreeDataSourceList"
          :showInput="true"
          @getTreeData="getTreeData"
          ref="dotree"
        ></vuetree>
      </div>
      <section v-show="TreeNavBar == 2" class="guest_wrap">
        <el-input
          type="search"
          v-model="filterguest"
          placeholder="按客户名称或客户代码"
          class="guest_input"
        ></el-input>
        <el-table
          :data="GuestTablesData"
          border
          @row-click="GuestRowClick"
          highlight-current-row
          ref="GuestChildren"
          class="guest_table"
        >
          <el-table-column label="客户名称" prop="KHDA_KHMC"></el-table-column>
        </el-table>
      </section>
      <section class="common_list_wrap">
        <div class="table_wrap">
          <el-table
            style="width: 100%"
            :data="GuestData"
            height="160"
            highlight-current-row
            @row-click="ResourceRowClick"
            class="gusest_table"
            v-if="TreeNavBar == 1"
            ref="ResourcesingleTable"
          >
            <el-table-column
              label="客户名称"
              prop="KHDA_KHMC"
              width="135"
            ></el-table-column>
            <el-table-column label="状态" prop="FKGX_ZT">
              <template slot-scope="scope">
                {{ scope.row.FKGX_ZT === 1 ? "当前" : "" }}
                {{ scope.row.FKGX_ZT === 2 ? "历史" : "" }}
                {{ scope.row.FKGX_ZT === 3 ? "待退" : "" }}
              </template>
            </el-table-column>
            <el-table-column label="类型" prop="LX"></el-table-column>
          </el-table>
          <el-table
            style="width: 100%"
            :data="ResourceData"
            height="160"
            highlight-current-row
            @row-click="ClientRowClick"
            class="gusest_table"
            v-if="TreeNavBar == 2"
            ref="GuestsingleTable"
          >
            <el-table-column
              label="对应资源代码"
              prop="FKGX_FJID"
              width="135"
            ></el-table-column>
            <el-table-column label="状态" prop="ZT"></el-table-column>
            <el-table-column label="类型" prop="LX"></el-table-column>
          </el-table>
        </div>
      </section>
    </div>
    <!-- 右边模块 orgAdd-->
    <div class="el-content">
      <keep-alive>
        <component :is="tempComponent" ref="children"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import vuetree from "../../../components/Eltree/treeItem.vue";
import estate from "./components/estate.vue"; //分区名称
import Zone from "./components/Zone.vue"; //分区名称
import Building from "./components/Building.vue"; //楼栋名称
import Resource from "./components/Resource.vue"; //资源名称
import Resources from "./components/Resources.vue"; //资源名称
import {
  getTree,
  queryResourceClient,
  queryGuestClient,
  queryGuestResource,
} from "@/api/FeeManagement/ReceivablesRegister"; //收款登记Api

export default {
  name: "HouseAccounts",
  data() {
    return {
      skzxcomp: "NotReceipted", //默认选中未收清款项NotReceipted
      clickTreeObjVal: {}, //传递点击树给费用调整
      ztreeDataSourceList: [],
      TreeNavBar: 1,
      content: null, //客户搜索
      filterguest: "", //客户搜索变量
      tableGuestList: [], //右边客户列表
      GuestData: [], //左边树客户列表
      ResourceData: [], //右边客户资源列表
      tempComponent: "estate",
      restempComponent: "estate",
      FJZJ: "",
      DLZJ: "",
      FCDM_GLQZJ: "",
      Listdata: "",
      contentStyleObj: {
        height: "",
        overflow: "auto",
        clear: "both",
      },
    };
  },
  mounted() {
    this.getReourceList(); //查询资源树
  },
  methods: {
    getReourceList(type) {
      //获取左边树
      var _this = this;
      getTree().then((response) => {
        var data = response;
        this.ztreeDataSourceList = data;
        this.contentStyleObj.height =
          this.$refs.elTitle.offsetHeight - 200 + "px";
        this.$nextTick(() => {
          document.getElementsByClassName("el-tree")[0].style.height =
            this.$refs.elTitle.offsetHeight - 255 + "px";
          document.getElementsByClassName("guest_table")[0].style.height =
            this.$refs.elTitle.offsetHeight - 255 + "px";

          this.$refs.dotree.setCheckTree(this.ztreeDataSourceList[0].id);
          //获取右边客户列表
          queryGuestClient().then((response) => {
            this.tableGuestList = response;
          });

          this.$nextTick(() => {
            this.$refs.children.getTableDataList();
          });
        });
      });
    },

    // 点击 获取树节点数据
    getTreeData(val, node) {
      this.Listdata = val;
      switch (val.data.FCDM_LX) {
        case "管理处":
          this.tempComponent = "estate";
          this.restempComponent = "estate";
          break;
        case "管理区":
          this.tempComponent = "Zone";
          this.restempComponent = "Zone";
          break;
        case "大楼":
          this.tempComponent = "Building";
          this.restempComponent = "Building";
          break;
        case "房间":
          this.tempComponent = "Resource";
          this.restempComponent = "Resource";
          this.FJZJ = val.data.FJZJ;
          this.DLZJ = node.parent.data.data.DLZJ;
          break;
      }
      this.$nextTick(() => {
        if (this.tempComponent != "") {
          this.$refs.dotree.setCheckTree(val.id);
          val.FJZJ = this.FJZJ;
          val.DLZJ = this.DLZJ;
          console.log(val);
          this.$refs.children.getTableDataList(val, 0);
        }
      });
      if (val.data.FCDM_LX == "房间") {
        this.ResourceClient(val.data);
      } else {
        this.GuestData = [];
      }
    },
    GuestRowClick(row) {
      this.GuestResource(row.KHDA_ZJ);
      // this.FJZJ = row.FKGX_FJWJ
    },
    ResourceClient(data) {
      queryResourceClient(data.FCDM_ZJ, 4).then((response) => {
        this.GuestData = response;
        // if(this.tempComponent == "Resource"&&this.GuestData.length==1){
        //   this.$refs.children.setAddbutton(false);
        //   this.$refs.children.setZJ(response[0])
        // }else{
        this.$refs.children.setAddbutton(true);
        // }
      });
    },
    GuestResource(KHDA_ZJ) {
      queryGuestResource(KHDA_ZJ, 4).then((response) => {
        this.ResourceData = response;
        if (this.tempComponent == "Resources") {
          if (response) {
            var datalist = {};
            datalist.FJZJ = response[0].FKGX_FJWJ;
            datalist.DLZJ = response[0].FJDA_DLWJ;
            datalist.KHDA_ZJ = response[0].KHDA_ZJ;
            datalist.FJDA_FJID = response[0].FKGX_FJID;
            this.$refs.children.getTableDataList(datalist, 1);
          }
          if (response.length == 1) {
            this.$refs.children.setAddbutton(false);
          } else {
            this.$refs.children.setAddbutton(true);
          }
        }
      });
    },
    ResourceRowClick(row) {
      var val = row;
      val.FJZJ = this.FJZJ;
      val.DLZJ = this.DLZJ;
      this.$refs.children.setZJ(row);
      this.$refs.children.getTableDataList(val, 1);
      this.$refs.children.setAddbutton(false);
    },
    ClientRowClick(row) {
      this.$refs.children.setZJ(row);
      var datalist = {};
      datalist.FJZJ = row.FKGX_FJWJ;
      datalist.DLZJ = row.FJDA_DLWJ;
      datalist.KHDA_ZJ = row.KHDA_ZJ;
      datalist.FJDA_FJID = row.FKGX_FJID;
      this.$refs.children.getTableDataList(datalist, 1);
      this.$refs.children.setAddbutton(false);
    },
    /**左边树导航切换 */
    TreeNavSwich(index) {
      //index:1为按资源，2按客户
      this.TreeNavBar = index;

      if (this.TreeNavBar == 2) {
        this.filterguest = "";
        this.tempComponent = "Resources";
        this.$nextTick(() => {
          this.$refs.children.setAddbutton(true);
          this.$refs.children.getTableDataList(
            {
              FJZJ: "",
              KHDA_ZJ: "",
            },
            1
          );
          if (document.getElementsByClassName("current-row").length > 0) {
            document
              .getElementsByClassName("current-row")[0]
              .classList.remove("current-row");
          }
          this.ResourceData = [];
        });
      } else {
        if (this.Listdata != "") {
          this.tempComponent = this.restempComponent;
          this.$nextTick(() => {
            this.$refs.children.getTableDataList(this.Listdata, 0);
          });
          this.$refs.children.getTableDataList(this.Listdata, 0);
        } else {
          this.tempComponent = "estate";
          this.$nextTick(() => {
            this.$refs.children.getTableDataList();
          });
        }
      }
    },
  },
  computed: {
    GuestTablesData() {
      var _this = this;
      return this.tableGuestList.filter((dataNews) => {
        //return Object.keys(dataNews).some((key)=> {
        return String(dataNews.KHDA_KHMC).indexOf(this.filterguest) > -1;
        //});
      });
    },
  },
  components: {
    vuetree,
    estate,
    Zone,
    Building,
    Resource,
    Resources,
  },
};
</script>
<style lang="scss">
.HouseAccounts {
  padding-left: 220px;
  .el-title {
    width: 220px;
    margin-left: -220px;
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
        height: 150px;
      }
      .el-radio {
        margin-right: 13px !important;
      }
    }
  }
  .el-content {
    padding: 20px;
    .nav_barHeight {
      height: 48px;
    }
    .nav-bar {
      position: absolute;
      background: #fff;
      z-index: 10;
      left: 380px;
      right: 30px;
      margin: 0;
      padding: 0;
      border-bottom: 1px solid #eceef2;
      height: 49px;
      line-height: 49px;
      .nav-li {
        position: relative;
        list-style-type: none;
        float: left;
        width: 148px;
        height: 48px;
        text-align: center;
        font-size: 16px;
        color: #666;
        background: #fff;
        border-right: 1px solid #eceef2;
        .on {
          display: block;
          position: absolute;
          width: 148px;
          background: #2e8ad7;
          top: 0;
          left: 0;
          height: 4px;
          z-index: 0;
        }
      }
    }
  }
  .guest_wrap {
    margin-top: 10px;
    padding: 0 10px;
    .guest_input {
      .el-input__inner {
        width: 190px;
        height: 28px;
        background: #dfe0e6;
        border-radius: 4px;
        margin: 0 !important;
      }
    }
    .guest_table {
      margin-top: 14px;
      overflow: auto;
    }
  }
  .tree_wrap {
    padding: 0 10px;
    .el-tree {
      height: 450px;
      margin-top: 14px;
      overflow: auto;
    }
  }
  .ztree_content_wrap {
    margin-top: 10px;
    .el-input__inner {
      width: 100%;
      height: 28px;
      background: rgba(223, 224, 230, 1);
      border-radius: 4px;
      margin: 0 !important;
      margin-bottom: 14px;
    }
  }
  .nav {
    width: 219px;
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
