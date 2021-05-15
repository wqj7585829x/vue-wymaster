<template>
  <div class="StandardDefinition">
    <div class="el-do">
      <div class="button">
        <el-button
          type="primary"
          @click="CostItemAdd()"
          v-has="'StanCostAdd_has'"
          >新增费用项目</el-button
        >
        <el-button
          type="primary"
          @click="ChargesAdd()"
          :disabled="ChargesAddtype"
          v-has="'StanChargeAdd_has'"
          >新增项目标准
        </el-button>
        <el-button
          type="primary"
          @click="CostItemEdit()"
          :disabled="buttontype"
          v-has="'StanEdit_has'"
          >修改</el-button
        >
        <el-button
          type="primary"
          @click="FeeCycle()"
          :disabled="FeeCycleType"
          v-has="'StanFeeCycle_has'"
          >收费周期
        </el-button>
        <el-button type="primary" @click="Refresh()" v-has="'StanReFresh_has'"
          >刷新</el-button
        >
        <el-button
          type="danger"
          @click="deletePartition()"
          :disabled="buttontype"
          v-has="'StanDelete_has'"
          >删除
        </el-button>
      </div>
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
        <keep-alive>
          <component
            :is="tempComponent"
            ref="children"
            @getData="getData"
          ></component>
        </keep-alive>
      </div>
    </div>

    <!-- 弹框 begin -->
    <CostItemDialog
      :CostItemshow.sync="CostItemshow"
      ref="CostItemDialog"
      @RefreshItem="RefreshList"
    ></CostItemDialog>
    <ChargesDialog
      :Chargesshow.sync="Chargesshow"
      ref="ChargesDialog"
      @RefreshItem="RefreshList"
    ></ChargesDialog>
    <meterstandardDialog
      :meterstandardshow.sync="meterstandardshow"
      ref="meterstandardDialog"
      @RefreshItem="RefreshList"
    ></meterstandardDialog>
    <FeecycleDialog
      :Feecycleshow.sync="Feecycleshow"
      ref="FeecycleDialog"
    ></FeecycleDialog>
    <!-- 弹框 end -->
  </div>
</template>

<script>
import vuetree from "../../../components/Eltree/treeItem.vue";
import CostItem from "./components/CostItem.vue"; //费用项目
import Charges from "./components/Charges.vue"; //常规标准
import meterstandard from "./components/meterstandard.vue"; //走表标准
import CostItemDialog from "./components/CostItemDialog"; //新增修改费用项目
import ChargesDialog from "./components/ChargesDialog"; //新增修改常规标准
import meterstandardDialog from "./components/meterstandardDialog"; //新增修改走表标准
import FeecycleDialog from "./components/FeecycleDialog"; //费用周期
import {
  getTree,
  refresh,
  deleteExpenseItem,
  deleteExpenseItemCharges,
  deleteExpenseItemMeterstandard,
  administrativeAndOperating,
} from "@/api/FeeManagement/StandardDefinition.js";
import { Message } from "element-ui";

export default {
  name: "StandardDefinition",
  data() {
    return {
      tempComponent: "CostItem",
      ztreeDataSourceList: [],
      CostItemData: {},
      ChargesData: {},
      CostItemshow: false, //弹窗表示
      Chargesshow: false, //弹窗表示
      meterstandardshow: false, //弹窗表示
      Feecycleshow: false, //弹窗表示
      ChargesAddtype: true, //弹窗表示
      getDataDetail: {}, //当前选中的费用项目或者费用标准对应详情
      category: "project", //判断费用项目或者项目标准标识
      subordinate: false, //费用项目存在下级无法修改，判断标识
      treeid: "", //当前选中费用项目id
      childtreeid: "", //当前选中项目标准id
      parenttreeid: "", //当前选中项目标准父级id
      parentdata: "", //当前选中项目标准父级数据
      dotype: 0, //0：新增费用项目；1：新增项目标准;2:修改；3：删除
      FeeCycleType: true, //收费周期权限标识
      buttontype: true, //修改和删除按钮表示
      parentIndex: 0, //当前选中费用项目索引
      GLCID: "",
      YXDID: "",
      Charges: "",
      parentsdata: "",
      node: "",
    };
  },
  mounted() {
    this.getTreeFun();
    this.getadministrativeAndOperating();
  },
  methods: {
    // 获取资源树
    getTreeFun(type) {
      var _this = this;
      getTree().then((response) => {
        var data = response;
        if (data) {
          _this.ztreeDataSourceList = data;
          var val = data[0];
          _this.$nextTick(() => {
            switch (
              _this.dotype //通过操作标识dotype更新数据
            ) {
              case 0:
                _this.$refs.dotree.setCheckTree(type ? type : val.id);
                _this.getTreeData(val);
                break;
              case 1:
                _this.$refs.dotree.setCheckTree(_this.treeid);
                _this.CostItemData =
                  _this.ztreeDataSourceList[_this.parentIndex];
                _this.getTreeData(_this.CostItemData);
                break;
              case 2:
                switch (this.category) {
                  case "project":
                    _this.$refs.dotree.setCheckTree(_this.treeid);
                    this.$refs.children.getTableData("");
                    _this.buttontype = false;
                    break;
                  case "standard":
                    _this.$refs.dotree.setCheckTree(_this.childtreeid);
                    break;
                }
                break;
            }
          });
        }
      });
    },
    //获取树形数据
    getTreeData(val, node) {
      this.category = val.data.CODE;
      this.Charges = val.data.kind;
      this.node = node;

      switch (
        val.data.CODE //CODE用于表示当前数据类型，project表示费用项目、standard表示费用标准
      ) {
        case "category":
          this.treeid = val.id;
          this.buttontype = true;
          this.parentsdata = val;
          this.FeeCycleType = true;
          break;
        case "project": //
          // this.treeid = val.id
          this.tempComponent = "CostItem";
          this.CostItemData = val;
          this.subordinate = val.children.length === 0 ? false : true;
          this.FeeCycleType = true;
          this.ChargesAddtype = false;
          // this.parentIndex = this.ztreeDataSourceList.indexOf(val) //获取当前费用标准索引
          this.parentsdata = node.parent.data;
          this.parentdata = node.parent.data;
          this.buttontype = false;
          break;
        case "standard": //
          this.CostItemData = node.parent.data;
          this.parentsdata = node.parent.parent.data;
          this.childtreeid = val.id;
          this.parenttreeid = node.parent.data.id;
          this.parentdata = node.parent.data;
          if (val.data.LB == "常规标准") {
            this.tempComponent = "Charges";
          }
          if (val.data.LB == "走表标准") {
            this.tempComponent = "meterstandard";
          }
          this.ChargesData = val;
          this.ChargesAddtype = true;
          this.buttontype = false;
          // if(val.data.LB == '常规标准'){
          //   this.FeeCycleType = false //当费用标准为常规标准时，费用周期按钮可以点击
          // }else{
          //   this.FeeCycleType = true
          // }
          break;
      }
      this.$nextTick(() => {
        this.$refs.dotree.setCheckTree(val.id);
        this.$refs.children.getTableData(val.data);
      });
    },
    //新增费用项目
    CostItemAdd() {
      this.dotype = 0;
      this.CostItemshow = true;
      this.$refs.CostItemDialog.getCostItemData(
        {
          GLCID: this.GLCID,
          YXDID: this.YXDID,
          SFXM_SFYX: false,
        },
        0
      );
    },
    //新增收费标准
    ChargesAdd() {
      //收费标准根据类型跳转不同弹窗，convention：常规；oneTimeFee：一次性；goWatch：走表
      this.dotype = 1;
      if (
        this.CostItemData.data.COST == "convention" ||
        this.CostItemData.data.COST == "oneTimeFee"
      ) {
        this.Chargesshow = true;
        this.$refs.ChargesDialog.getCostItemData(
          {
            GLCID: this.GLCID,
            YXDID: this.YXDID,
            CGBZ_SFXMWJ: this.CostItemData.data.SFXM_ZJ,
            COST: this.CostItemData.data.COST,
            SFXM_SFCWF: this.getDataDetail.SFXM_SFCWF,
          },
          0
        );
      }

      if (this.CostItemData.data.COST == "goWatch") {
        this.meterstandardshow = true;
        this.$refs.meterstandardDialog.getCostItemData(
          {
            GLCID: this.GLCID,
            YXDID: this.YXDID,
            ZBBZ_SFXMWJ: this.CostItemData.data.SFXM_ZJ,
          },
          0
        );
      }
    },
    //编辑费用项目
    CostItemEdit() {
      this.dotype = 2;
      switch (this.category) {
        case "project":
          this.CostItemshow = true;
          this.getDataDetail.LB = this.CostItemData.data.LB;
          this.getDataDetail.subordinate = this.subordinate;
          this.$refs.CostItemDialog.getCostItemData(this.getDataDetail, 1);
          break;
        case "standard":
          if (
            this.ChargesData.data.COST == "convention" ||
            this.CostItemData.data.COST == "oneTimeFee"
          ) {
            this.Chargesshow = true;
            this.getDataDetail.LB = this.ChargesData.data.LB;
            this.getDataDetail.SFXM_ZJ = this.ChargesData.data.SFXM_ZJ;
            this.getDataDetail.COST = this.CostItemData.data.COST;
            this.$refs.ChargesDialog.getCostItemData(this.getDataDetail, 1);
          }
          if (this.ChargesData.data.COST == "goWatch") {
            this.meterstandardshow = true;
            this.getDataDetail.LB = this.ChargesData.data.LB;
            this.getDataDetail.COST = this.CostItemData.data.COST;
            this.$refs.meterstandardDialog.getCostItemData(
              this.getDataDetail,
              1
            );
          }

          break;
      }
    },
    //刷新
    Refresh() {
      refresh().then((response) => {});
    },
    //删除费用项目
    deletePartition() {
      var _this = this;
      this.dotype = 3;
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          switch (_this.category) {
            case "project":
              _this.getDataDetail.LB = _this.CostItemData.data.LB;
              deleteExpenseItem(_this.getDataDetail).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  // this.remove(this.CostItemData, 0);
                  this.getTreeFun();
                  this.buttontype = true;
                  this.FeeCycleType = true;
                  this.ChargesAddtype = true;
                  _this.$refs.children.getTableData("");
                }
              });
              break;
            case "standard":
              _this.getDataDetail.LB = _this.ChargesData.data.LB;

              if (
                _this.CostItemData.data.COST == "convention" ||
                this.CostItemData.data.COST == "oneTimeFee"
              ) {
                deleteExpenseItemCharges(_this.getDataDetail).then(
                  (response) => {
                    if (response.returnStatus == "SUCCESS") {
                      // this.remove(this.ChargesData, 1);
                      getTree().then((response) => {
                        var data = response;
                        if (data) {
                          this.ztreeDataSourceList = data;
                        }
                      });
                      this.buttontype = true;
                      this.FeeCycleType = true;
                      _this.$refs.children.getTableData("");
                    }
                  }
                );
              }
              if (_this.CostItemData.data.COST == "goWatch") {
                deleteExpenseItemMeterstandard(_this.getDataDetail).then(
                  (response) => {
                    if (response.returnStatus == "SUCCESS") {
                      // this.remove(this.ChargesData, 1);
                      getTree().then((response) => {
                        var data = response;
                        if (data) {
                          this.ztreeDataSourceList = data;
                        }
                      });
                      this.buttontype = true;
                      this.FeeCycleType = true;
                      _this.$refs.children.getTableData("");
                    }
                  }
                );
              }

              break;
          }
        })
        .catch(() => {});
    },
    //删除节点，从树数组中去掉已删除数组
    // remove(data, type) {//data：删除的数据；type：0表示费用项目，1表示费用标准
    //   const parent = type === 0 ? this.parentsdata.children : this.CostItemData.children
    //   const children = data;
    //   const index = parent.findIndex(d => d.id === children.id); //寻找data的索引

    //   if (!type) {
    //     this.ztreeDataSourceList[this.ztreeDataSourceList.indexOf(this.parentsdata)].children.splice(index, 1);
    //   } else {

    //     const parents = this.ztreeDataSourceList
    //     const childrens = this.parentsdata
    //     const i = parents.findIndex(d => d.id === childrens.id); //寻找data的索引

    //     const p = this.ztreeDataSourceList[i].children
    //     const c = this.CostItemData
    //     const j = p.findIndex(d => d.id === c.id); //寻找data的索引

    //     this.CostItemData.children.splice(index, 1);
    //     this.ztreeDataSourceList[i].children[j] = this.CostItemData
    //   }
    //   this.ztreeDataSourceList = JSON.parse(JSON.stringify(this.ztreeDataSourceList))
    // },
    //收费周期
    FeeCycle() {
      this.Feecycleshow = true;
      this.$refs.FeecycleDialog.getTableData(this.ChargesData.data.CGBZ_ZJ);
    },
    //获得详情参数
    getData(val) {
      if (this.category == "project") {
        if (val.SFXM_FYLB == "外部导入") {
          this.ChargesAddtype = true;
        } else {
          this.ChargesAddtype = false;
        }
      }
      if (this.category == "standard") {
        if (this.Charges == "convention") {
          if (val.SHOW == "YES") {
            this.FeeCycleType = false;
          } else {
            this.FeeCycleType = true;
          }
        } else {
          this.FeeCycleType = true;
        }
      }
      this.getDataDetail = val;
    },
    // 刷新数据
    RefreshList(type) {
      if (!type) {
        this.getTreeFun();
        this.ChargesAddtype = true;
      } else {
        switch (this.category) {
          case "project":
            this.$refs.children.getTableData(this.CostItemData.data);
            break;
          case "standard":
            this.$refs.children.getTableData(this.ChargesData.data);
            break;
        }
        this.getTreeFun();
      }
    },
    getadministrativeAndOperating() {
      administrativeAndOperating().then((response) => {
        this.GLCID = response.GLCID;
        this.YXDID = response.YXDID;
      });
    },
  },
  components: {
    vuetree,
    CostItem,
    Charges,
    meterstandard,
    CostItemDialog,
    ChargesDialog,
    meterstandardDialog,
    FeecycleDialog,
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1366px) {
  .StandardDefinition {
    height: 100%;
    width: 100%;
    overflow: auto;
    background: #ffffff;
    border-radius: 5px;
    .el-title {
      height: 100%;
      float: left;
      width: 300px;
      margin-left: -300px;
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
      padding: 10px 30px 0 30px;
    }
    .el-do {
      height: 100px;
      width: 100%;
      padding: 20px 30px;
    }

    .el-detail {
      height: 85%;
      width: 100%;
      overflow: auto;
      padding-left: 300px;
      border-top: 1px solid #f1f1f1;
    }

    .el-content {
      position: relative;
    }

    .button {
      margin-top: 10px;
    }
  }
}

@media screen and (max-width: 1366px) {
  .StandardDefinition {
    height: 100%;
    width: 100%;
    overflow: auto;
    background: #ffffff;
    border-radius: 5px;
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
      overflow: auto;
      padding: 10px 10px 0 10px;
    }
    .el-do {
      height: 100px;
      width: 100%;
      padding: 20px 30px;
    }

    .el-detail {
      height: 73%;
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
}
</style>
