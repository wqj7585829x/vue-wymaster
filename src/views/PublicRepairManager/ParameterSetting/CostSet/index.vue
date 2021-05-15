<!-- 费用设置 -->
<template>
  <div class="FormSet">
    <div class="el-content">
      <el-row>
        <el-col :span="24">
          <el-button
            type="primary"
            @click="addCost()"
            :disabled="disabledAdd"
            v-has="'ParameCostSetAdd_has'"
            >新增</el-button
          >
          <el-button
            type="primary"
            @click="updateCost()"
            :disabled="disabledupdate"
            :title="updateTitle()"
            v-has="'ParameCostSetUpdate_has'"
            >修改</el-button
          >
          <el-button
            type="danger"
            @click="deletePaymentWay()"
            :disabled="disabledupdate"
            :title="updateTitle()"
            v-has="'ParameCostSetDel_has'"
            >删除</el-button
          >
        </el-col>
      </el-row>
      <el-row class="sysCon_Mt">
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          class="tableContent"
          @row-click="rowClick"
        >
          <el-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="WXJFYCD_WXJXM"
            label="维修金项目"
          ></el-table-column>
          <el-table-column
            prop="WXJFYCD_FYLB"
            label="费用类别"
          ></el-table-column>
          <el-table-column prop="WXJFYCD_BZ" label="收费项目"></el-table-column>
        </el-table>
      </el-row>
    </div>
    <!--新增弹窗 start-->
    <CostDialog
      :showdialog.sync="showdialog"
      ref="children"
      @RefreshItem="RefreshList"
    ></CostDialog>
    <!--修改弹窗 end-->
  </div>
</template>
<script>
import CostDialog from "./components/CostDialog";
import {
  queryCostsSet,
  delCostSet,
} from "@/api/PublicRepairManager/ParameterSetting";
export default {
  data() {
    return {
      tableOnceData: {},
      radio: "",
      disabledAdd: true, //新增按钮默认可点击
      showdialog: false, //默认不弹窗,
      disabledupdate: true, //修改 删除按钮 默认不可用
      tableData: [],
      tableParameter: {
        //列表参数
      },
    };
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        this.disabledupdate = false;
      } else {
        this.disabledupdate = true;
      }
    },
    tableData() {
      if (this.tableData.length > 0) {
        this.disabledAdd = true;
      } else {
        this.disabledAdd = false;
      }
    },
  },
  methods: {
    getRowTable() {
      this.getTabList();
    },
    getTabList() {
      //获取列表数据
      queryCostsSet().then((response) => {
        this.tableData = response;
      });
    },
    rowClick(row) {
      this.tableOnceData = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    addCost() {
      //新增
      this.radio = ""; //选择后清空选中表格按钮
      this.showdialog = true;
      this.$refs.children.getData({}, 1);
    },
    updateCost() {
      //修改
      this.showdialog = true;
      this.$refs.children.getData(this.tableOnceData, 2);
    },
    deletePaymentWay() {
      //删除
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delCostSet(this.tableOnceData.WXJFYCD_ZJ).then((response) => {
            this.radio = ""; //清空选中
            this.getTabList();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    RefreshList(newRowObj) {
      //刷新列表
      this.tableOnceData = newRowObj;
      this.getTabList();
    },
    updateTitle() {
      //设置默认收款方式 修改 删除提示
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
  },
  components: {
    CostDialog,
  },
};
</script>

<style lang="scss" scoped>
.FormSet {
  position: relative;
  .el-content {
    padding: 30px 30px 0 30px;
    .sysCon_Mt {
      margin-top: 28px;
    }
  }
  .el-input__inner {
    width: 100%;
  }
  .el-paginationR {
    text-align: right;
    margin-top: 20px;
  }
  .el-radio__label {
    padding: 0;
  }
  .gb_img {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
  }
}
</style>
