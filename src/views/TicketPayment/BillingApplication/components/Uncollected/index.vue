<template>
  <div class="container Uncollected">
    <!-- 按钮begin -->
    <el-form label-width="105px">
      <el-row :gutter="30">
        <el-col :span="4" style="width: 320px">
          <el-form-item label="房间名称:" class="uForm">
            <el-input
              v-model="searchList.FJDA_MC"
              :title="searchList.FJDA_MC"
              clearable
              :disabled="true"
            >
              <el-button
                slot="append"
                icon="el-icon-edit-outline"
                @click="RoomChoose"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 320px">
          <el-form-item label="客户名称:">
            <el-select
              v-model="searchList.KHDA_KHMC"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(item, index) in options4"
                :key="index"
                :label="item.KHDA_KHMC"
                :value="item.KHDA_KHMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 320px">
          <el-form-item label="所属年月起:">
            <el-date-picker
              type="month"
              placeholder="请输入起始所属年月"
              v-model="searchList.FYSQ_KSSSNY"
              format="yyyy-MM"
              value-format="yyyy-MM"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 320px">
          <el-form-item label="所属年月止:">
            <el-date-picker
              type="month"
              placeholder="请输入截止所属年月"
              v-model="searchList.FYSQ_JZSSNY"
              format="yyyy-MM"
              value-format="yyyy-MM"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="4" style="width: 320px">
          <el-form-item label="收费项目:">
            <el-select
              v-model="searchList.SFXM_ZJ"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(item, index) in options2"
                :key="index"
                :label="item.SFXM_SFXMMC"
                :value="item.SFXM_ZJ"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="4"  style="width:320px">
          <el-form-item label="先票开票状态:" label-width="105px">
            <el-select v-model="searchList.FYSQ_XPKPZT" filterable clearable>
              <el-option label="未申请" :value="1"></el-option>
              <el-option label="申请中" :value="2"></el-option>
              <el-option label="未开票" :value="11"></el-option>
              <el-option label="已开票" :value="12"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="handleCurrentChange()"
              v-has="'BAUncollectedSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button
        type="primary"
        @click="ApplyInvoice"
        :disabled="multipleSelection.length == 0"
        v-has="'BAUncollectedApply_has'"
        >申请开票
      </el-button>
    </div>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <u-table
        ref="singleTable"
        height="500"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
        use-virtual
        big-data-checkbox
        :row-height="35"
      >
        <u-table-column
          label="选择"
          type="selection"
          :selectable="selectInit"
          width="50"
        >
        </u-table-column>
        <u-table-column prop="DLDA_DLMC" label="大楼名称" width="200">
        </u-table-column>
        <u-table-column prop="FJDA_FJMC" label="房间名称" width="200">
        </u-table-column>
        <u-table-column prop="KHDA_KHMC" label="客户名称" width="200">
        </u-table-column>
        <u-table-column prop="FYSQ_SSNY" label="所属年月" width="100">
        </u-table-column>
        <u-table-column prop="FYSQ_SFXMMC" label="收费项目" width="200">
        </u-table-column>
        <u-table-column prop="FYSQ_XPKPYE" label="可开票余额" width="120">
        </u-table-column>
        <u-table-column prop="FYSQ_YSJE" label="应收金额（含税）" width="120">
        </u-table-column>
        <u-table-column prop="FYSQ_YSSL" label="税率" width="120">
        </u-table-column>
        <u-table-column
          prop="FYSQ_YSBHS"
          label="应收金额（不含税）"
          width="140"
        >
        </u-table-column>
        <u-table-column prop="FYSQ_YSSE" label="税额" width="120">
        </u-table-column>
        <u-table-column prop="FYSQ_SSJE" label="实收金额" width="120">
        </u-table-column>
        <u-table-column prop="FYSQ_QSJE" label="欠收金额" width="120">
        </u-table-column>
        <u-table-column prop="FYSQ_XPKPLX" label="开票类型" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.FYSQ_XPKPLX === '1'">发票</span>
            <span v-if="scope.row.FYSQ_XPKPLX === '2'">收据</span>
          </template>
        </u-table-column>
      </u-table>
    </div>

    <checkDialog
      :show.sync="show"
      ref="checkDialog"
      @RefreshItem="handleCurrentChange()"
    ></checkDialog>
    <Resource
      :Rshow.sync="Rshow"
      ref="Resource"
      @getResource="getResource"
    ></Resource>
  </div>
</template>
<script>
import {
  queryBuildingMessage,
  queryRoomMessage,
  queryClientForRoom,
  queryUncollectedApplyBill,
  queryXPAllPayItems,
} from "@/api/TicketPayment/Bill";
import checkDialog from "./components/checkDialog";
import { UTable, UTableColumn } from "umy-ui";
import Resource from "./../components/Resource";
export default {
  name: "Uncollected",
  data() {
    return {
      tableData: [],
      tableData1: [],
      searchList: {
        index2: "",
        index3: "",
        KHDA_ZJ: "",
      },
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      radio: null,
      tableRow: {}, //修改数据
      multipleSelection: [],
      show: false,
      disabledbutton: true,
      options2: [],
      options3: [],
      options4: [],
      selectList: [],
      Rshow: false,
    };
  },
  components: {
    checkDialog,
    UTable,
    UTableColumn,
    Resource,
  },
  watch: {},
  mounted() {
    this.getTableData();
    queryClientForRoom({}).then((response) => {
      this.options4 = response;
    });
    queryXPAllPayItems({}).then((response) => {
      this.options2 = response;
    });
  },
  methods: {
    selectInit(row, index) {
      if (row.FYSQ_XPKPYE == 0) {
        return false; //可勾选
      } else {
        return true; //不可勾选
      }
    },
    RoomChoose() {
      this.Rshow = true;
    },
    getResource(data) {
      this.searchList.FJDA_ZJ = data.list.join(",");
      this.searchList.FJDA_MC = data.name.join(",");
    },
    ApplyInvoice() {
      this.show = true;
      this.$refs.checkDialog.getReportData(this.multipleSelection);
    },
    handleCurrentChange() {
      this.getTableData(); //获取表格数据
      this.$refs.singleTable.clearSelection();
      this.multipleSelection = []; //选择后清空选中表格数据
    },
    rowClick(row) {
      if (row.FYSQ_XPKPYE === 0) {
        return;
      }
      this.$refs.singleTable.toggleRowSelection([
        {
          row: row,
        },
      ]); //单击表格复选框选中
    },
    handleSelectionChange(val, row) {
      // var totallist = this.tableData
      // var FJDA_ZJ = row.FJDA_ZJ
      // var SFXM_ZJ = row.SFXM_ZJ
      // var FYSQ_SSNY = parseInt(row.FYSQ_SSNY.replace('-', ''))
      // var XP_SFGLKP = row.XP_SFGLKP
      // var FYSQ_XPKPZT = row.FYSQ_XPKPZT
      // var FYSQ_ZJ = []

      // if (FYSQ_XPKPZT === 1) {
      //   if (val.indexOf(row) > -1) {
      //     for (var n in val) {
      //       FYSQ_ZJ.push(val[n].FYSQ_ZJ)
      //     }
      //     if (XP_SFGLKP === 1) {
      //       for (var j in totallist) {
      //         var FJDA_ZJs = totallist[j].FJDA_ZJ
      //         var FYSQ_SSNYs = parseInt(totallist[j].FYSQ_SSNY.replace('-', ''))
      //         if (FJDA_ZJs == FJDA_ZJ && FYSQ_SSNYs <= FYSQ_SSNY) {
      //           if (FYSQ_ZJ.indexOf(totallist[j].FYSQ_ZJ) == -1 && totallist[j].XP_SFGLKP === 1 && totallist[j].FYSQ_XPKPZT === 1) {
      //             val.push(totallist[j])
      //             this.$refs.singleTable.toggleRowSelection([{
      //               row: totallist[j], selected: true
      //             }]);
      //           }
      //         }
      //       }
      //     } else {
      //       for (var j in totallist) {
      //         var SFXM_ZJs = totallist[j].SFXM_ZJ
      //         var FJDA_ZJs = totallist[j].FJDA_ZJ
      //         var FYSQ_SSNYs = parseInt(totallist[j].FYSQ_SSNY.replace('-', ''))
      //         if (FJDA_ZJs == FJDA_ZJ && SFXM_ZJs == SFXM_ZJ && FYSQ_SSNYs <= FYSQ_SSNY && totallist[j].FYSQ_XPKPZT === 1) {
      //           if (FYSQ_ZJ.indexOf(totallist[j].FYSQ_ZJ) == -1) {
      //             val.push(totallist[j])
      //             this.$refs.singleTable.toggleRowSelection([{
      //               row: totallist[j], selected: true
      //             }]);
      //           }
      //         }
      //       }
      //     }
      //     this.selectList = val
      //   } else {
      //     val = this.selectList.length === 0 ? val : this.selectList
      //     for (var n in val) {
      //       FYSQ_ZJ.push(val[n].FYSQ_ZJ)
      //     }
      //     if (XP_SFGLKP === 1) {
      //       for (var j in totallist) {
      //         var FJDA_ZJs = totallist[j].FJDA_ZJ
      //         var FYSQ_SSNYs = parseInt(totallist[j].FYSQ_SSNY.replace('-', ''))
      //         if (FJDA_ZJs == FJDA_ZJ && FYSQ_SSNYs >= FYSQ_SSNY) {
      //           if (FYSQ_ZJ.indexOf(totallist[j].FYSQ_ZJ) > -1 && totallist[j].XP_SFGLKP === 1 && totallist[j].FYSQ_XPKPZT === 1) {
      //             const p = val
      //             const c = totallist[j].FYSQ_ZJ
      //             const m = p.findIndex(d => d.FYSQ_ZJ === c);
      //             val.splice(m, 1)
      //             this.$refs.singleTable.toggleRowSelection([{
      //               row: totallist[j], selected: false
      //             }]);
      //           }
      //         }
      //       }
      //     } else {
      //       for (var j in totallist) {
      //         var SFXM_ZJs = totallist[j].SFXM_ZJ
      //         var FJDA_ZJs = totallist[j].FJDA_ZJ
      //         var FYSQ_SSNYs = parseInt(totallist[j].FYSQ_SSNY.replace('-', ''))
      //         if (FJDA_ZJs == FJDA_ZJ && SFXM_ZJs == SFXM_ZJ && FYSQ_SSNYs >= FYSQ_SSNY && totallist[j].FYSQ_XPKPZT === 1) {
      //           if (FYSQ_ZJ.indexOf(totallist[j].FYSQ_ZJ) > -1) {
      //             const p = val
      //             const c = totallist[j].FYSQ_ZJ
      //             const m = p.findIndex(d => d.FYSQ_ZJ === c);
      //             val.splice(m, 1)
      //             this.$refs.singleTable.toggleRowSelection([{
      //               row: totallist[j], selected: false
      //             }]);
      //           }
      //         }
      //       }
      //     }

      //   }
      // }
      var data = val;
      var TimeZones = [];

      this.disabledbutton = false;

      this.multipleSelection = val;
    },
    getTableData() {
      var data = JSON.parse(JSON.stringify(this.searchList));
      data.SFXM_ZJ = data.SFXM_ZJ.join(",");
      data.KHDA_KHMC = data.KHDA_KHMC.join(",");
      queryUncollectedApplyBill(data).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.disabledbutton = true;
        this.selectList = [];
      });
    },
  },
};
</script>
<style lang="scss" scope>
.Uncollected .block {
  text-align: right;
  padding: 15px 50px 5px 0 !important;
}

.Uncollected .el-input {
  width: 100% !important;
}

.Uncollected .totalmoney {
  float: left;
  font-size: 16px;
  position: relative;
  top: 6px;
  left: 19px;
  color: #606266;
}

.Uncollected .el-select {
  width: 100%;
}

.Uncollected .uForm .el-input {
  padding-top: 3px;
}

.Uncollected .uForm .el-input-group__append {
  padding: 0;
}

.Uncollected .uForm .el-button--default {
  min-width: 0;
  margin-right: 0 !important;
}
</style>
