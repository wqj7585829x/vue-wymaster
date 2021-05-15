<!-- 关系设定 -->
<template>
  <div class="SetRelation">
    <div class="el-do">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form
          :label-position="labelPosition"
          label-width="85px"
          class="demo-form-inline"
        >
          <el-row :gutter="30">
            <el-col :span="8" style="width: 500px">
              <el-form-item label="分摊总表名称：" label-width="125px">
                <el-select v-model="reindex" @change="tablechange" filterable>
                  <el-option
                    v-for="(item, index) in tableData"
                    :key="item.FTZB_ZJ"
                    :label="item.FTZB_ZBMC"
                    :value="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="" label-width="0">
                分摊类别:{{ RelationForm.FTZB_FTLB }}　　分摊方式:{{
                  RelationForm.FTZB_FTFS
                }}　　分摊项目名称:{{ RelationForm.SFXMMC
                }}<br />系数项目名称:{{ RelationForm.XSXMMC }}　　表倍率:{{
                  RelationForm.FTZB_BBL
                }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 搜索框end -->
    </div>
    <div class="el-detail">
      <div class="el-title">
        <div v-if="ztreeDataSourceList.length > 0">
          <!--树形组件-->
          <vuetree
            :list.sync="ztreeDataSourceList"
            :is-open="true"
            ref="dotree"
            :is-check="false"
            :showInput="false"
            @getTreeData="getTreeData"
          ></vuetree>
        </div>
      </div>
      <div class="el-content">
        <transfer ref="transfer" @RefreshItem="getTableData"></transfer>
      </div>
    </div>
  </div>
</template>
<script>
import vuetree from "../../../../components/Eltree/treeItem.vue";
import transfer from "./components/transfer.vue";
import {
  queryOrgTreeNoRoom,
  queryTotalTableNameAndZJ,
} from "@/api/FeeManagement/AllocationSettings";
export default {
  name: "SetRelation",
  data() {
    return {
      labelPosition: "left",
      tempComponent: "SetRelation",
      ztreeDataSourceList: [],
      tableData: [],
      RelationForm: {},
      FCDM_ID: "",
      reindex: 0,
      Treetype: "",
    };
  },
  mounted() {
    this.getTreeFun();
    this.TotalTableNameAndZJ();
  },
  methods: {
    getRowTable() {},
    // 获取资源树
    getTreeFun(type) {
      var _this = this;
      queryOrgTreeNoRoom().then((response) => {
        var data = response;
        if (data) {
          _this.ztreeDataSourceList = data;
        }
      });
    },
    getTreeData(val) {
      if (val.data.FCDM_LX != "管理处") {
        this.FCDM_ID = val.data.FCDM_ID;
        this.Treetype = val.data.FCDM_LX;
        this.$refs.transfer.getPartitionData(
          {
            FTZB_ZJ: this.RelationForm.FTZB_ZJ,
            FTZB_XSXMWJ: this.RelationForm.FTZB_XSXMWJ,
            FTZB_SFXMWJ: this.RelationForm.FTZB_SFXMWJ,
            FCDM_ID: this.FCDM_ID,
            FTZB_ZBMC: this.RelationForm.FTZB_ZBMC,
            FTZB_FTJB: this.RelationForm.FTZB_FTJB,
            FTZB_FTFS: this.RelationForm.FTZB_FTFS,
            FTZB_SJBZJ: this.RelationForm.FTZB_SJBZJ,
            FCDM_LX: val.data.FCDM_LX,
          },
          0
        );
      } else {
        this.$refs.transfer.getPartitionData({}, 1);
      }
      //资源树点击事件
    },
    //总表切换
    tablechange() {
      this.RelationForm = this.tableData[this.reindex];
      this.$refs.transfer.settable(this.tableData[this.reindex]);
      this.$refs.transfer.getPartitionData(
        {
          FTZB_ZJ: this.RelationForm.FTZB_ZJ,
          FTZB_XSXMWJ: this.RelationForm.FTZB_XSXMWJ,
          FTZB_SFXMWJ: this.RelationForm.FTZB_SFXMWJ,
          FCDM_ID: this.FCDM_ID,
          FTZB_ZBMC: this.RelationForm.FTZB_ZBMC,
          FTZB_FTJB: this.RelationForm.FTZB_FTJB,
          FTZB_FTFS: this.RelationForm.FTZB_FTFS,
          FTZB_SJBZJ: this.RelationForm.FTZB_SJBZJ,
          FCDM_LX: this.Treetype,
        },
        0
      );
    },
    //关系设定总表查询下拉框
    TotalTableNameAndZJ() {
      queryTotalTableNameAndZJ().then((response) => {
        var data = response;
        if (data) {
          this.reindex = data.length === 0 ? "" : this.reindex;
          this.tableData = data;
          this.RelationForm = data[0];
          this.$refs.transfer.settable(data[0]);
        }
      });
    },
    getTableData() {
      var _this = this;
      queryTotalTableNameAndZJ().then((response) => {
        var data = response;
        if (data) {
          this.tableData = data;
          _this.RelationForm = data[_this.reindex];
        }
      });
    },
  },
  components: {
    vuetree,
    transfer,
  },
};
</script>

<style lang="scss" scoped>
.SetRelation {
  height: 100%;
  width: 100%;
  overflow: auto;
  background: #ffffff;
  border-radius: 5px;
  padding-top: 70px;
  .el-title {
    height: 100%;
    float: left;
    width: 220px;
    margin-left: -220px;
    padding: 0 17px;
    overflow: auto;
    border-right: 1px solid #f1f1f1;
  }
  .el-content {
    position: relative;
    float: right;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .el-do {
    width: 100%;
    padding: 0px 30px;
    margin-top: -70px;
    .select {
      margin-top: 20px;
    }
  }

  .el-detail {
    height: 100%;
    width: 100%;
    overflow: auto;
    padding-left: 220px;
    border-top: 1px solid #f1f1f1;
  }

  .el-content {
    position: relative;
  }

  .button {
    margin-top: 10px;
  }
}
</style>
<style>
.SetRelation .el-select {
  width: 100%;
}
.SetRelation .el-form-item__content {
  line-height: 1.3;
}
</style>
