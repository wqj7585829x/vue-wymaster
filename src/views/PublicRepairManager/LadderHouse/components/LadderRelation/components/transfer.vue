<template>
  <div class="LadderRelationtransfer">
    <div class="table-left">
      <div class="content">
        <div class="title">待选记录</div>
        <!-- <div class="search">
            <el-input v-model="transferForm.keyword1" class="input" placeholder="根据资源代码、客户名称和表名称筛选"></el-input>
            <el-button type="primary" @click="getqueryPendingResource">搜索</el-button>
          </div> -->
        <div class="body">
          <u-table
            ref="singleTable1"
            :data="tableData1"
            :height="322"
            :row-height="35"
            @row-click="rowclick1"
            border
            @selection-change="selectionlist1"
            style="width: 100%:height:100%"
            use-virtual
          >
            <u-table-column type="selection" width="55"></u-table-column>
            <u-table-column
              width="150"
              property="TFGX_KHMC"
              label="客户名称"
            ></u-table-column>
            <u-table-column
              width="150"
              property="TFGX_FJID"
              label="房间代码"
            ></u-table-column>
            <u-table-column
              width="150"
              property="TFGX_KHID"
              label="客户代码"
            ></u-table-column>
          </u-table>
        </div>
      </div>
    </div>
    <div class="table-button">
      <div class="do">
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          @click="relativewait"
          v-has="'LadToRela_has'"
          circle
          :disabled="checkboxlist1.length === 0"
        >
        </el-button>
      </div>
      <!-- <div class="do">
        <el-button type="primary" icon="el-icon-d-arrow-right" @click="relativewaitAll" v-has="'LadToRela_has'" circle>
        </el-button>
      </div> -->
      <div class="do">
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          @click="relativealready"
          v-has="'LadOutRela_has'"
          circle
          :disabled="checkboxlist2.length === 0"
        >
        </el-button>
      </div>
      <!-- <div class="do">
        <el-button type="primary" icon="el-icon-d-arrow-left" @click="relativealreadyAll" v-has="'LadOutRela_has'"
          circle></el-button>
      </div> -->
    </div>
    <div class="table-right">
      <div class="content">
        <div class="title">已选记录</div>
        <!-- <div class="search">
           <el-input v-model="transferForm.keyword2" class="input" placeholder="按资源代码定位"></el-input>
           <el-button type="primary" @click="search">搜索</el-button>
          </div> -->
        <div class="body">
          <u-table
            ref="singleTable2"
            :data="tableData2"
            :height="322"
            :row-height="35"
            border
            @row-click="rowclick2"
            @selection-change="selectionlist2"
            style="width: 100%:height:100%"
            use-virtual
          >
            <u-table-column type="selection" width="55"></u-table-column>
            <u-table-column
              width="150"
              property="TFGX_KHMC"
              label="客户名称"
            ></u-table-column>
            <u-table-column
              width="150"
              property="TFGX_FJID"
              label="房间代码"
            ></u-table-column>
            <u-table-column
              width="150"
              property="TFGX_KHID"
              label="客户代码"
            ></u-table-column>
          </u-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  queryPendingResource,
  querySelectedResource,
  ladderRelationshipBinding,
} from "@/api/PublicRepairManager/LadderHouse";
import { UTable, UTableColumn } from "umy-ui";
export default {
  data() {
    return {
      input: "",
      tableData1: [], //待选记录展示表格数据
      tableData2: [], //已选记录展示表格数据
      totaltableData1: [], //待选记录全部数据
      totaltableData2: [], //已选记录记录全部数据
      tableindex1: {
        begin: 0,
        end: 200,
        length: 0,
      }, //待选记录滚动分页索引
      tableindex2: {
        begin: 0,
        end: 200,
        length: 0,
      }, //已选记录滚动分页索引
      checkboxlist1: [], //待选数据当前选中数据
      checkboxlist2: [], //已选数据当前选中数据
      transferForm: {}, //接口调用数据索引
      dom1: "", //待选记录表格dom用于滚动
      dom2: "", //已选记录表格dom用于滚动
    };
  },
  components: {
    UTable,
    UTableColumn,
  },
  methods: {
    rowclick1(row) {
      this.$refs.singleTable1.toggleRowSelection(row);
    },
    selectionlist1(val) {
      this.checkboxlist1 = val;
    },
    rowclick2(row) {
      this.$refs.singleTable2.toggleRowSelection(row);
    },
    selectionlist2(val) {
      this.checkboxlist2 = val;
    },
    //
    getPartitionData(data, type) {
      this.transferForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.tableData1 = []; //待选记录展示表格数据
        this.totaltableData1 = []; //待选记录全部数据
        this.getqueryPendingResource();
      }
      if (type == 1) {
        this.tableData2 = []; //已选记录展示表格数据
        this.totaltableData2 = []; //已选记录记录全部数据
        this.getquerySelectedResource();
      }
    },
    //待选记录
    getqueryPendingResource() {
      queryPendingResource(this.transferForm).then((response) => {
        this.tableData1 = response;
      });
    },
    //已选记录
    getquerySelectedResource() {
      querySelectedResource(this.transferForm).then((response) => {
        this.tableData2 = response;
      });
    },
    //待选记录搜索
    search() {
      this.getquerySelectedResource();
    },
    //待选记录操作 左到右
    relativewait() {
      var items = this.checkboxlist1;
      var list = [];
      items.forEach((item) => {
        list.push({
          TFGX_TWJ: this.transferForm.TFGX_TWJ,
          TFGX_FKGXWJ: item.TFGX_FKGXWJ,
          TFGX_FJID: item.TFGX_FJID,
          TFGX_KHID: item.TFGX_KHID,
          TFGX_KHMC: item.TFGX_KHMC,
          TFGX_DLWJ: item.TFGX_DLWJ,
        });
      }); //选中记录构造接口部分参数LIst
      var _this = this;
      ladderRelationshipBinding({
        flag: 1,
        list: list,
      }).then((response) => {
        //操作完成后数据刷新重置-begin
        this.getqueryPendingResource();
        this.getquerySelectedResource();
        this.checkboxlist1 = [];
        this.checkboxlist2 = [];
        this.$refs.singleTable1.clearSelection();
        this.$refs.singleTable2.clearSelection();
        //操作完成后数据刷新重置-end
      });
    },
    //待选记录全选操作 左到右，全选操作只把当前展示200笔数据进行操作
    relativewaitAll() {
      var items = this.tableData1;
      var list = [];
      items.forEach((item) => {
        list.push({
          TFGX_TWJ: this.transferForm.TFGX_TWJ,
          TFGX_FKGXWJ: item.TFGX_FKGXWJ,
          TFGX_FJID: item.TFGX_FJID,
          TFGX_KHID: item.TFGX_KHID,
          TFGX_KHMC: item.TFGX_KHMC,
          TFGX_DLWJ: item.TFGX_DLWJ,
        });
      });
      ladderRelationshipBinding({
        flag: 1,
        list: list,
      }).then((response) => {
        this.getqueryPendingResource();
        this.getquerySelectedResource();
        this.checkboxlist1 = [];
        this.checkboxlist2 = [];
        this.$refs.singleTable1.clearSelection();
        this.$refs.singleTable2.clearSelection();
      });
    },
    //已选记录操作 右到左，同待选记录
    relativealready() {
      var items = this.checkboxlist2;
      var list = [];
      items.forEach((item) => {
        list.push({
          TFGX_TWJ: this.transferForm.TFGX_TWJ,
          TFGX_FKGXWJ: item.TFGX_FKGXWJ,
          TFGX_FJID: item.TFGX_FJID,
          TFGX_KHID: item.TFGX_KHID,
          TFGX_KHMC: item.TFGX_KHMC,
          TFGX_DLWJ: item.TFGX_DLWJ,
          TFGX_ZJ: item.TFGX_ZJ,
        });
      });
      ladderRelationshipBinding({
        flag: 0,
        list: list,
      }).then((response) => {
        this.getqueryPendingResource();
        this.getquerySelectedResource();
        this.checkboxlist1 = [];
        this.checkboxlist2 = [];
        this.$refs.singleTable1.clearSelection();
        this.$refs.singleTable2.clearSelection();
      });
    },
    //已选记录全部操作 右到左，同待选记录
    relativealreadyAll() {
      var items = this.tableData2;
      var list = [];
      items.forEach((item) => {
        list.push({
          TFGX_TWJ: this.transferForm.TFGX_TWJ,
          TFGX_FKGXWJ: item.TFGX_FKGXWJ,
          TFGX_FJID: item.TFGX_FJID,
          TFGX_KHID: item.TFGX_KHID,
          TFGX_KHMC: item.TFGX_KHMC,
          TFGX_DLWJ: item.TFGX_DLWJ,
          TFGX_ZJ: item.TFGX_ZJ,
        });
      });
      ladderRelationshipBinding({
        flag: 0,
        list: list,
      }).then((response) => {
        this.getqueryPendingResource();
        this.getquerySelectedResource();
        this.checkboxlist1 = [];
        this.checkboxlist2 = [];
        this.$refs.singleTable1.clearSelection();
        this.$refs.singleTable2.clearSelection();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.LadderRelationtransfer {
  width: 100%;
  height: 100%;
  .table-left {
    float: left;
    height: 100%;
    width: 48%;
    padding: 30px;
    .content {
      position: relative;
      width: 100%;
      height: 100%;
      padding-top: 15px;
      border: 1px solid #eeeeee;
      .title {
        position: absolute;
        height: 20px;
        line-height: 20px;
        left: 10px;
        top: -11px;
        background: #fff;
        padding: 0 5px;
      }
      .body {
        width: 100%;
        height: 100%;
      }
    }
  }
  .table-button {
    float: left;
    height: 100%;
    width: 4%;
    margin-top: 10%;
    text-align: center;
    .do {
      margin-top: 20px;
    }
  }
  .table-right {
    float: left;
    height: 100%;
    width: 48%;
    padding: 30px;
    .content {
      position: relative;
      width: 100%;
      height: 100%;
      padding-top: 15px;
      border: 1px solid #eeeeee;
      .title {
        position: absolute;
        height: 20px;
        line-height: 20px;
        left: 10px;
        top: -11px;
        background: #fff;
        padding: 0 5px;
      }
      .body {
        width: 100%;
        height: 100%;
        .table1 {
          width: 100%;
          height: 47%;
        }
        .t2-title {
          width: 100%;
          height: 6%;
          line-height: 1.9;
          padding-left: 15px;
        }
        .table2 {
          width: 100%;
          height: 47%;
        }
      }
    }
  }
}
</style>

<style>
.LadderRelationtransfer .u-table {
  height: 100%;
}
.LadderRelationtransfer .el-button.is-circle {
  width: inherit;
  height: inherit;
  min-width: 30px;
}
</style>
