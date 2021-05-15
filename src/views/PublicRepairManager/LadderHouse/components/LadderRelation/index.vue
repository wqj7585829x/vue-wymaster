<!-- 关系设定 -->
<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="梯户关系"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :LRshow="LRshow"
      :close-on-click-modal="false"
    >
      <div class="LadderRelation">
        <div class="el-do">
          <!-- 搜索框begin -->
          <div class="select">
            <el-form
              :label-position="labelPosition"
              label-width="85px"
              class="demo-form-inline"
            >
              <el-row :gutter="30">
                <el-col :span="5" style="width: 300px">
                  <el-form-item label="所属梯:" label-width="125px">
                    <el-select v-model="reindex" @change="tablechange">
                      <el-option
                        v-for="(item, index) in tableData"
                        :key="item.TB_ZJ"
                        :label="item.TB_TMC"
                        :value="index"
                      >
                      </el-option>
                    </el-select>
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
            <transfer ref="transfer"></transfer>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import vuetree from "../../../../../components/Eltree/treeItem.vue";
import transfer from "./components/transfer.vue";
import {
  queryLadderTreeWithoutLadder,
  queryLadderDropDownBox,
} from "@/api/PublicRepairManager/LadderHouse";

export default {
  name: "LadderRelation",
  data() {
    return {
      visible: this.LRshow,
      labelPosition: "left",
      tempComponent: "LadderRelation",
      ztreeDataSourceList: [],
      tableData: [],
      RelationForm: {},
      FCDM_ID: "",
      reindex: 0,
      Treetype: "",
      ZJlist: {},
    };
  },
  mounted() {
    this.getTreeFun();
  },
  props: {
    LRshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    LRshow() {
      this.visible = this.LRshow;
    },
  },
  methods: {
    //
    getPartitionData(data) {
      var val = JSON.parse(JSON.stringify(data));
      this.reindex = 0;
      this.LadderDropDownBox(val);
    },
    // 获取资源树
    getTreeFun(type) {
      var _this = this;
      queryLadderTreeWithoutLadder().then((response) => {
        var data = response;
        if (data) {
          _this.ztreeDataSourceList = data;
        }
      });
    },
    getTreeData(val) {
      this.ZJlist = {
        HZ_GLQWJ: val.data.FCDM_LX === "管理区" ? val.data.FCDM_ZJ : "",
        HZ_DLWJ: val.data.FCDM_LX === "大楼" ? val.data.FCDM_ZJ : "",
      };
      this.$refs.transfer.getPartitionData(
        {
          HZ_GLQWJ: this.ZJlist.HZ_GLQWJ,
          HZ_DLWJ: this.ZJlist.HZ_DLWJ,
          TFGX_TWJ: this.RelationForm.TB_ZJ,
        },
        0
      );
      //资源树点击事件
    },
    //总表切换
    tablechange() {
      this.RelationForm = this.tableData[this.reindex];
      this.$refs.transfer.getPartitionData(
        {
          HZ_GLQWJ: this.ZJlist.HZ_GLQWJ,
          HZ_DLWJ: this.ZJlist.HZ_DLWJ,
          TFGX_TWJ: this.RelationForm.TB_ZJ,
        },
        0
      );
      this.$refs.transfer.getPartitionData(
        {
          TFGX_TWJ: this.RelationForm.TB_ZJ,
        },
        1
      );
    },
    //关系设定总表查询下拉框
    LadderDropDownBox(val) {
      var _this = this;
      queryLadderDropDownBox(val).then((response) => {
        var data = response;
        if (data) {
          _this.reindex = data.length === 0 ? "" : _this.reindex;
          _this.tableData = data;
          _this.RelationForm = data[0];
          _this.$refs.transfer.getPartitionData(
            {
              TFGX_TWJ: _this.RelationForm.TB_ZJ,
            },
            1
          );
        }
      });
    },
    //取消
    cancle() {
      this.$emit("update:LRshow", false);
    },
  },
  components: {
    vuetree,
    transfer,
  },
};
</script>

<style lang="scss" scoped>
.LadderRelation {
  height: 500px;
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  padding-top: 70px;
  .el-title {
    height: 100%;
    float: left;
    width: 250px;
    margin-left: -250px;
    padding: 0 17px;
    overflow: auto;
    border-right: 1px solid #f1f1f1;
  }
  .el-content {
    position: relative;
    float: right;
    width: 100%;
    height: 100%;
    overflow: auto;
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
    padding-left: 250px;
    border-top: 1px solid #f1f1f1;
  }

  .el-content {
    position: relative;
    overflow: hidden;
  }

  .button {
    margin-top: 10px;
  }
}
</style>
