<template>
  <div class="container PrepayScheme">
    <div class="PrepaySchemesubject">
      <el-table
        ref="singleTable1"
        height="350"
        border
        :data="tableData"
        @row-click="rowclick"
        highlight-current-row
      >
        <el-table-column prop="YJFA_FAMC" label="方案名称"> </el-table-column>
        <el-table-column prop="YJFA_CDSX" label="冲抵级别"> </el-table-column>
        <el-table-column prop="YJFA_QZFS" label="取整方式"> </el-table-column>
        <el-table-column prop="YJFA_JQWS" label="精确位数"> </el-table-column>
        <el-table-column prop="YJFA_SL" label="税率"> </el-table-column>
        <el-table-column prop="YJFA_CDNYSX" label="冲抵年月顺序">
          <template slot-scope="scope">
            <span v-if="scope.row.YJFA_CDNYSX">由新到旧</span>
            <span v-if="!scope.row.YJFA_CDNYSX">由旧到新</span>
          </template>
        </el-table-column>
        <el-table-column prop="YJFA_SFBZ" label="币种"> </el-table-column>
        <el-table-column prop="YJFA_YJND" label="预交年度"> </el-table-column>
      </el-table>
    </div>
    <div class="PrepaySchemedetail">
      <div class="title">冲抵明细</div>
      <el-table ref="singleTable2" height="250" :data="tableDatas">
        <el-table-column prop="SFXM_SFXMMC" label="可冲抵项目">
        </el-table-column>
        <el-table-column prop="YJFYXM_YXJXH" label="冲抵顺序">
        </el-table-column>
      </el-table>
    </div>

    <PSdetailDialog
      :show.sync="show"
      ref="PSdetailDialog"
      @RefreshItem="getTableData"
    ></PSdetailDialog>
  </div>
</template>
<script>
import PSdetailDialog from "./components/PSdetailDialog";
import {
  queryAcceptingThePlan,
  queryAcceptingThePlanDetail,
} from "@/api/PrepayManagement/PrepayScheme";
export default {
  name: "PrepayScheme",
  data() {
    return {
      tableData: [],
      tableDatas: [],
      radio: null,
      show: false,
      TableForm: {},
    };
  },
  components: {
    PSdetailDialog,
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      //查询列表
      queryAcceptingThePlan(this.TableForm).then((response) => {
        this.tableData = response;
      });
    },
    psadd() {
      //新增
    },
    psedit() {
      //修改
      this.show = true;
    },
    psdelete() {
      //删除
    },
    psdetailedit() {
      //编辑
    },
    rowclick(row) {
      queryAcceptingThePlanDetail({
        YJFA_ZJ: row.YJFA_ZJ,
      }).then((response) => {
        this.tableDatas = response;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.PrepayScheme .PrepaySchemesubject {
  width: 70%;
}

.PrepayScheme .PrepaySchemedetail {
  width: 30%;
}

.PrepayScheme .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 32px;
}
</style>
