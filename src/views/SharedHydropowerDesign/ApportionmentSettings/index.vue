<template>
  <div class="container MonthlyCar">
    <!-- 按钮begin -->
    <el-form label-width="85px">
      <el-row :gutter="30">
        <el-col :span="4" style="width: 300px">
          <el-form-item label="表级别：">
            <el-select v-model="searchList.FTZB_FTJB" clearable>
              <el-option
                v-for="item in option"
                :key="item.FTZB_FTJB"
                :label="item.level"
                :value="item.FTZB_FTJB"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 300px">
          <el-form-item label="表名称：">
            <el-input v-model="searchList.FTZB_ZBMC" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 300px">
          <el-form-item label="分摊类别：">
            <el-select v-model="searchList.FTZB_FTLB" clearable>
              <el-option label="直接用量分摊" value="直接用量分摊"></el-option>
              <el-option label="直接金额分摊" value="直接金额分摊"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 300px">
          <el-form-item label="分摊方式：">
            <el-select v-model="searchList.FTZB_FTFS" clearable>
              <el-option label="按表行度" value="按表行度"></el-option>
              <el-option label="按收费面积" value="按收费面积"></el-option>
              <el-option label="按资源" value="按资源"></el-option>
              <el-option label="不参与公摊" value="不参与公摊"></el-option>
              <el-option
                label="按电梯分摊算法"
                value="按电梯分摊算法"
                v-if="searchList.FTZB_FTLB == '直接用量分摊'"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="getdata()"
              v-has="'CashCollectionSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button type="primary" @click="addSetting(0)" v-has="'ASetAddTop_has'"
        >新增一级
      </el-button>
      <el-button
        type="primary"
        @click="addSetting(1)"
        :disabled="disableddo"
        v-has="'ASetAdd_has'"
        >新增
      </el-button>
      <el-button
        type="primary"
        @click="updateSetting"
        :disabled="disableddo"
        v-has="'ASetEdit_has'"
        >修改
      </el-button>
      <el-button
        type="danger"
        @click="deleteSetting"
        :disabled="disableddo"
        v-has="'ASetDelete_has'"
        >删除
      </el-button>
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table
        ref="singleTable"
        :data="tableData"
        max-height="480"
        border
        @row-click="rowclick"
        :tree-props="{ children: 'children' }"
        row-key="FTZB_ZJ"
      >
        <el-table-column fixed label="选择" width="50" type="">
          <template slot-scope="scope">
            <el-radio :label="scope.row.FTZB_ZJ" v-model="radio"
              >&nbsp;</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column prop="level" label="表级别" width="150">
        </el-table-column>
        <el-table-column prop="FTZB_ZBMC" label="总表名称" width="350">
        </el-table-column>
        <el-table-column prop="FTZB_FTLB" label="分摊类别" width="200">
        </el-table-column>
        <el-table-column prop="FTZB_FTFS" label="分摊方式" width="100">
        </el-table-column>
        <el-table-column prop="FTZB_SFXMMC" label="分摊项目名称" width="100">
        </el-table-column>
        <el-table-column prop="FTZB_XSXMMC" label="系数项目名称" width="100">
        </el-table-column>
        <el-table-column prop="FTZB_BBL" label="表倍率" width="100">
        </el-table-column>
        <el-table-column prop="FTZB_FTBL" label="分摊比例" width="100">
        </el-table-column>
        <el-table-column prop="FTZB_ZBJS" label="转表基数" width="100">
        </el-table-column>
        <el-table-column prop="FTZB_SJBMC" label="上级表名称" width="200">
        </el-table-column>
        <el-table-column prop="FTZB_ZBJE" label="总表金额" width="100">
        </el-table-column>
        <el-table-column prop="FTZB_FTJB" label="分摊级别" width="100">
        </el-table-column>
        <el-table-column prop="FTZB_BYDS" label="本月读数" width="100">
        </el-table-column>
      </el-table>
    </div>

    <SettingDialog
      :show.sync="show"
      ref="SettingDialog"
      @RefreshItem="RefreshList"
    ></SettingDialog>
  </div>
</template>
<script>
import {
  queryTotalTableLevel,
  queryTotalTable,
  delTotalTable,
  getMonthlyCarTotalMoney,
} from "@/api/SharedHydropowerDesign/ApportionmentSettings";
import SettingDialog from "./components/SettingDialog";
export default {
  name: "MonthlyCar",
  data() {
    return {
      tableData: [],
      searchList: {},
      show: false,
      radio: null,
      tableRow: {}, //修改数据
      option: [],
      disableddo: true,
    };
  },
  watch: {
    radio() {
      if (this.radio === null) {
        this.disableddo = true;
      } else {
        this.disableddo = false;
      }
    },
  },
  mounted() {
    queryTotalTableLevel().then((response) => {
      this.option = response;
    });
    this.getTableData();
  },
  methods: {
    getdata() {
      this.getTableData();
    },
    rowclick(row) {
      this.tableRow = row;
      this.radio = row.FTZB_ZJ;
      // if (this.radio === null) {

      // } else {
      //   if (this.radio === row.FTZB_ZJ) {
      //     this.tableRow = {}
      //     this.radio = null
      //   } else {
      //     this.tableRow = row
      //     this.radio = row.FTZB_ZJ
      //   }
      // }
    },
    getTableData() {
      queryTotalTable(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    addSetting(type) {
      this.show = true;
      if (type == 0) {
        this.$refs.SettingDialog.getPartitionData(
          {
            FTZB_ZBMC: "",
            FTZB_ZJ: "",
          },
          0
        );
      } else {
        this.$refs.SettingDialog.getPartitionData(
          {
            FTZB_ZBMC: this.tableRow.FTZB_ZBMC ? this.tableRow.FTZB_ZBMC : "",
            FTZB_ZJ: this.tableRow.FTZB_ZJ ? this.tableRow.FTZB_ZJ : "",
          },
          0
        );
      }
    },
    updateSetting() {
      this.show = true;
      this.$refs.SettingDialog.getPartitionData(this.tableRow, 1);
    },
    deleteSetting() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delTotalTable(this.tableRow).then((response) => {
            this.searchList.pageIndex = 0;
            this.currentPage = 1;
            this.radio = null; //选择后清空选中表格按钮
            this.RefreshList({});
          });
        })
        .catch(() => {
          this.radio = null; //清空选中
        });
    },
    //刷新表数据
    RefreshList(newobj) {
      queryTotalTable(this.searchList).then((response) => {
        this.tableData = response.data;
        this.radio = null;
        this.tableRow = {};
      });
    },
  },
  components: {
    SettingDialog,
  },
};
</script>
<style lang="scss">
.block {
  text-align: right;
}

.MonthlyCar .totalmoney {
  float: left;
  font-size: 16px;
  position: relative;
  top: 6px;
  left: 19px;
  color: #606266;
}

.MonthlyCar .el-date-editor {
  width: 100%;
}
</style>
