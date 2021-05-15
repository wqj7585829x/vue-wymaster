<template>
  <div class="el-body PrepayCollection">
    <!-- 左边数：按资源与按客户-->
    <div class="el-title" style="height: 100%; overflow: auto" ref="elTitle">
      <div v-if="ztreeDataSourceList.length > 0">
        <vue-ztree
          :list.sync="ztreeDataSourceList"
          :showInput="true"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          class="zree-w"
          :showCheckbox="true"
          @getTreeData="getTreeData"
          @getTreeCheckData="getTreeCheckData"
        >
        </vue-ztree>
      </div>
    </div>
    <!-- 右边模块 orgAdd-->
    <div class="el-content" ref="elContentH">
      <div class="nav_barHeight" ref="barHeight">
        <ul class="nav-bar">
          <li class="nav-li" @click="NavSwich('PreRegistration', 1)">
            <span :class="{ on: isCheck == 1 }">预交登记</span>
          </li>
          <li class="nav-li" @click="NavSwich('PrePaidCertificate', 2)">
            <span :class="{ on: isCheck == 2 }">预交凭证</span>
          </li>
        </ul>
      </div>
      <div>
        <!-- 各个模块组件 -->
        <keep-alive>
          <component :is="skzxcomp" ref="NavCompChildren"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import vueZtree from "@/components/Eltree/treeItem.vue";
import PreRegistration from "./components/PreRegistration"; //预交登记
import PrePaidCertificate from "./components/PrePaidCertificate"; //预交凭证
import { queryOrgTreeHaveClient } from "@/api/PrepayManagement/PrepayCollection";
export default {
  name: "PrepayCollection",
  data() {
    return {
      skzxcomp: "PreRegistration", //默认选中预交登记PreRegistration
      isCheck: "1",
      ztreeDataSourceList: [],
      data: {},
    };
  },
  components: {
    vueZtree,
    PreRegistration,
    PrePaidCertificate,
  },
  mounted() {
    queryOrgTreeHaveClient().then((response) => {
      var data = response;
      if (data) {
        this.ztreeDataSourceList = data;
      }
    });
  },
  methods: {
    getTreeCheckData() {
      //树选中事件
      var data = this.$refs.dotree.getTreeCheckedNodes();
      var KHDA_ZJ = [];
      var FKGX_ZJ = [];
      var payer = [];
      for (var i in data) {
        if (data[i].data.FCDM_LX == "客户") {
          KHDA_ZJ.push(data[i].data.KHDA_ZJ);
          FKGX_ZJ.push(data[i].data.FKGX_ZJ);
          payer.push(data[i].data.FCDM_MC);
        }
      }
      if (this.skzxcomp == "PreRegistration") {
        this.$refs.NavCompChildren.setKHMes(
          KHDA_ZJ.join(","),
          FKGX_ZJ.join(","),
          payer.join(",")
        );
      }
    },
    getTreeData(data) {
      //树点击事件
      this.data = data;
      if (this.skzxcomp == "PreRegistration") {
        if (data.data.FCDM_LX == "房间") {
          if (data.children.length > 0) {
            var FKGX_ZJ = data.children[0].data.FKGX_ZJ;
            var FCDM_MC = data.children[0].data.FCDM_MC;
            this.$refs.NavCompChildren.BalanceMes(FKGX_ZJ, FCDM_MC);
          }
        } else if (data.data.FCDM_LX == "客户") {
          var FKGX_ZJ = data.data.FKGX_ZJ;
          var FCDM_MC = data.data.FCDM_MC;
          this.$refs.NavCompChildren.BalanceMes(FKGX_ZJ, FCDM_MC);
        } else {
          this.$refs.NavCompChildren.clearMes();
        }
      } else {
        if (data.data.FCDM_LX == "房间") {
          if (data.children.length > 0) {
            var FKGX_ZJ = data.children[0].data.FKGX_ZJ;
            var KHDA_ZJ = data.children[0].data.KHDA_ZJ;
            this.$refs.NavCompChildren.voucher(FKGX_ZJ, KHDA_ZJ);
          }
        } else if (data.data.FCDM_LX == "客户") {
          var FKGX_ZJ = data.data.FKGX_ZJ;
          var KHDA_ZJ = data.data.KHDA_ZJ;
          this.$refs.NavCompChildren.voucher(FKGX_ZJ, KHDA_ZJ);
        } else {
          this.$refs.NavCompChildren.clearMes();
        }
      }
    },
    NavSwich(val, index) {
      this.skzxcomp = val;
      this.isCheck = index;
      this.$nextTick(() => {
        this.getTreeData(this.data);
      });
      // this.$refs.NavCompChildren.clearMes()
    },
  },
};
</script>
<style lang="scss">
.el-body {
  border-radius: 0;
}
.el-body.PrepayCollection {
  padding-left: 220px;
  .el-title {
    width: 220px;
    margin-left: -220px;
    padding: 10px !important;
  }
  .el-content {
    padding: 0;
    overflow: inherit;
    .nav_barHeight {
      height: 36px;
      background: #ebecf2;
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
  .ztree_content_wrap {
    margin: 0;
    .el-input__inner {
      width: 190px;
      height: 28px;
      background: #dfe0e6;
      border-radius: 4px;
      margin: 0 !important;
      margin-bottom: 14px;
    }
    .el-tree {
      margin-top: 10px;
    }
  }
}
</style>
