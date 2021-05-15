<template>
  <div class="Stransfer">
    <div class="table-left">
      <div class="content">
        <div class="title">待选记录</div>
        <div class="search">
          <el-input
            v-model="transferForm.keyword1"
            class="input"
            placeholder="根据资源代码、客户名称和表名称筛选"
          ></el-input>
          <el-button type="primary" @click="getqueryPendingResource"
            >搜索</el-button
          >
          <span v-if="showtype">待选笔数:{{ tableindex1.length }}</span>
          <div v-if="!showtype" style="margin-left: 20px; margin-bottom: 5px">
            待选笔数:{{ tableindex1.length }}
          </div>
        </div>
        <div class="body">
          <pl-table
            ref="singleTable1"
            @select="pinSelect"
            :data="tableData1"
            :height="535"
            @row-click="rowclick1"
            border
            @selection-change="selectionlist1"
            style="width: 100%:height:100%"
            :row-height="35"
            use-virtual
          >
            <pl-table-column type="selection" width="55"></pl-table-column>
            <pl-table-column
              width="150"
              property="ZBJS_FJID"
              label="资源代码"
            ></pl-table-column>
            <pl-table-column
              width="150"
              property="ZBJS_KHMC"
              label="客户名称"
            ></pl-table-column>
            <pl-table-column
              width="150"
              property="ZBJS_BMC"
              label="表名称"
            ></pl-table-column>
            <pl-table-column
              width="150"
              property="ZBJS_DLMC"
              label="楼栋名称"
            ></pl-table-column>
            <pl-table-column
              width="150"
              property="ZBJS_SFXMMC"
              label="项目名称"
            ></pl-table-column>
          </pl-table>
        </div>
      </div>
    </div>
    <div class="table-button">
      <div class="do">
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          @click="relativewait"
          v-has="'AlloToSelected_has'"
          circle
          :disabled="checkboxlist1.length === 0"
        >
        </el-button>
      </div>
      <div class="do">
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          @click="relativealready"
          v-has="'AlloOutSelected_has'"
          circle
          :disabled="checkboxlist2.length === 0"
        ></el-button>
      </div>
    </div>
    <div class="table-right">
      <div class="content">
        <div class="title">已选记录</div>
        <div class="search">
          <el-input
            v-model="transferForm.keyword2"
            class="input"
            placeholder="按资源代码定位"
          ></el-input>
          <el-button type="primary" @click="search">搜索</el-button>
          <span v-if="showtype">已选笔数:{{ tableindex2.length }}</span>
          <div v-if="!showtype" style="margin-left: 20px; margin-bottom: 5px">
            已选笔数:{{ tableindex2.length }}
          </div>
        </div>
        <div class="body">
          <div
            class="table1"
            :style="`height:${
              totaltable.FTZB_FTFS == '按表行度' ||
              (totaltable.FTZB_FTFS == '按指定比例' &&
                totaltable.FTZB_FTLB == '用量差分摊')
                ? 47
                : 100
            }%`"
          >
            <pl-table
              ref="singleTable2"
              :data="tableData2"
              @select="pinSelect1"
              :height="
                totaltable.FTZB_FTFS == '按表行度' ||
                (totaltable.FTZB_FTFS == '按指定比例' &&
                  totaltable.FTZB_FTLB == '用量差分摊')
                  ? 228
                  : 535
              "
              border
              @row-click="rowclick2"
              @selection-change="selectionlist2"
              style="width: 100%:height:100%"
              :row-height="35"
              use-virtual
            >
              <pl-table-column type="selection" width="55"></pl-table-column>
              <pl-table-column
                width="150"
                property="ZBJS_FJID"
                label="资源代码"
              ></pl-table-column>
              <pl-table-column
                width="150"
                property="ZBJS_KHMC"
                label="客户名称"
              ></pl-table-column>
              <pl-table-column
                width="150"
                property="ZBJS_BMC"
                label="表名称"
              ></pl-table-column>
              <pl-table-column
                width="150"
                property="ZBJS_DLMC"
                label="楼栋名称"
              ></pl-table-column>
              <pl-table-column
                width="150"
                property="ZBJS_SFXMMC"
                label="项目名称"
              ></pl-table-column>
            </pl-table>
          </div>
          <div
            class="t2-title"
            v-if="
              totaltable.FTZB_FTFS == '按表行度' ||
              (totaltable.FTZB_FTFS == '按指定比例' &&
                totaltable.FTZB_FTLB == '用量差分摊')
            "
          >
            分摊系数
          </div>
          <div
            class="table2"
            v-if="
              totaltable.FTZB_FTFS == '按表行度' ||
              (totaltable.FTZB_FTFS == '按指定比例' &&
                totaltable.FTZB_FTLB == '用量差分摊')
            "
          >
            <pl-table
              ref="singleTable3"
              :data="tableData3"
              :height="250"
              border
              style="width: 100%:height:100%"
            >
              <pl-table-column
                fixed
                label="选择"
                width="50"
                :row-height="35"
                use-virtual
              >
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.checked"
                    @change="handleSelectionChange(scope.row)"
                    >&nbsp;
                  </el-checkbox>
                </template>
              </pl-table-column>
              <pl-table-column
                width="150"
                property="ZBJS_FJID"
                label="资源代码"
              ></pl-table-column>
              <pl-table-column
                width="150"
                property="ZBJS_KHMC"
                label="客户名称"
              ></pl-table-column>
              <pl-table-column
                width="150"
                property="ZBJS_BMC"
                label="表名称"
              ></pl-table-column>
              <pl-table-column
                width="150"
                property="ZBJS_DLMC"
                label="楼栋名称"
              ></pl-table-column>
              <pl-table-column
                width="150"
                property="ZBJS_SFXMMC"
                label="项目名称"
              ></pl-table-column>
            </pl-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  queryChildrenTable,
  queryDistributionCoefficient,
  queryPendingResource,
  relationshipBindingLeftToRight,
  relationshipBindingRightToLeft,
  checkAllocationFactor,
} from "@/api/FeeManagement/AllocationSettings";
import { PlTable, PlTableColumn, PlxTableGrid, PlxTableColumn } from "pl-table";
export default {
  data() {
    return {
      input: "",
      tableData1: [], //待选记录展示表格数据
      tableData2: [], //已选记录展示表格数据
      tableData3: [], //分摊系数表格数据
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
      checkboxlist1: [], //已选数据当前选中数据
      checkboxlist2: [], //待选数据当前选中数据
      checkboxlistall1: [], //已选数据总选中数据
      checkboxlistall2: [], //待选数据总选中数据
      transferForm: {}, //接口调用数据索引
      dom1: "", //待选记录表格dom用于滚动
      dom2: "", //已选记录表格dom用于滚动
      choosenum1: 0,
      choosenum2: 0,
      totaltable: {},
      multipleSelection: [],
      origin: -1, // 这里给一个变量作为起点
      pin: false, // 这里给一个变量，默认为false，不按住
      origin1: -1, // 这里给一个变量作为起点
      origin2: -1, // 这里给一个变量作为起点
      showtype: true,
    };
  },
  components: {
    PlTable,
    PlTableColumn,
  },
  mounted() {
    this.showtype = window.screen.width > 1025 ? true : false;
    window.addEventListener("keydown", (code) => {
      // 这个是获取键盘按住事件
      // console.log(code); // 这个是你按住键盘打印出键盘信息，在浏览器中自行查看
      if (code.keyCode === 16 && code.shiftKey) {
        // 判断是否按住shift键，是就把pin赋值为true
        this.pin = true;
      }
    });
    window.addEventListener("keyup", (code) => {
      // 这个是获取键盘松开事件
      if (code.keyCode === 16) {
        // 判断是否松开shift键，是就把pin赋值为false
        this.pin = false;
      }
    });
  },
  created() {},
  methods: {
    pinSelect(item, index) {
      this.$nextTick(() => {
        const data = this.tableData1; // 获取所以数据
        const origin = this.origin; // 起点数 从-1开始
        const endIdx = index.index; // 终点数
        if (this.pin && item.includes(data[origin])) {
          // 判断按住
          const sum = Math.abs(origin - endIdx) + 1; // 这里记录终点
          const min = Math.min(origin, endIdx); // 这里记录起点
          let i = 0;
          while (i < sum) {
            const j = min + i;
            this.$refs.singleTable1.toggleRowSelection([
              {
                row: this.tableData1[j],
                selected: true,
              },
            ]); // 通过ref打点调用toggleRowSelection方法，第二个必须为true
            i++;
          }
        } else {
          this.origin = index.index; // 没按住记录起点
        }
      });
    },
    pinSelect1(item, index) {
      this.$nextTick(() => {
        const data = this.tableData2; // 获取所以数据
        const origin1 = this.origin1; // 起点数 从-1开始
        const endIdx = index.index; // 终点数
        if (this.pin && item.includes(data[origin1])) {
          // 判断按住
          const sum = Math.abs(origin1 - endIdx) + 1; // 这里记录终点
          const min = Math.min(origin1, endIdx); // 这里记录起点
          let i = 0;
          while (i < sum) {
            const j = min + i;
            this.$refs.singleTable2.toggleRowSelection([
              {
                row: this.tableData2[j],
                selected: true,
              },
            ]); // 通过ref打点调用toggleRowSelection方法，第二个必须为true
            i++;
          }
        } else {
          this.origin1 = index.index; // 没按住记录起点
        }
      });
    },
    handleSelectionChange(val) {
      checkAllocationFactor({
        type: val.checked,
        ZBFT_FKGXWJ: val.ZBJS_FKGXWJ,
        FTZB_ZJ: this.transferForm.FTZB_ZJ,
        ZBFTXS_ZBJSWJ: val.ZBJS_ZJ,
        ZBFT_ZJ: val.ZBFT_ZJ,
      }).then((response) => {
        if (
          this.totaltable.FTZB_FTFS == "按表行度" ||
          (this.totaltable.FTZB_FTFS == "按指定比例" &&
            this.totaltable.FTZB_FTLB == "用量差分摊")
        ) {
          this.getqueryDistributionCoefficient();
        }
      });
    },
    settable(data) {
      this.totaltable = data;
    },
    rowclick1(index) {
      const data = this.tableData1; // 获取所以数据
      const origin = this.origin; // 起点数 从-1开始
      const endIdx = index.index; // 终点数
      if (this.pin) {
        // 判断按住
        const sum = Math.abs(origin - endIdx) + 1; // 这里记录终点
        const min = Math.min(origin, endIdx); // 这里记录起点
        let i = 0;
        while (i < sum) {
          const j = min + i;
          this.$refs.singleTable1.toggleRowSelection([
            {
              row: this.tableData1[j],
              selected: true,
            },
          ]); // 通过ref打点调用toggleRowSelection方法，第二个必须为true
          i++;
        }
      } else {
        this.origin = index.index; // 没按住记录起点
        this.$refs.singleTable1.toggleRowSelection([
          {
            row: index,
          },
        ]);
      }
    },
    selectionlist1(val) {
      this.checkboxlist1 = val;
      // if(val.length == this.totaltableData1.length){
      //   this.checkboxlistall1 = this.totaltableData1
      // }
      // if(val.length == 0){
      //   this.checkboxlistall1 = []
      // }
      var items = val;
      var alldata = JSON.parse(JSON.stringify(this.checkboxlistall1));
      items.forEach((item) => {
        if (alldata.indexOf(item) == -1) {
          alldata.push(item);
        }
      });
      this.choosenum1 = alldata.length;
    },
    rowclick2(index) {
      const data = this.tableData2; // 获取所以数据
      const origin1 = this.origin1; // 起点数 从-1开始
      const endIdx = index.index; // 终点数
      if (this.pin) {
        // 判断按住
        const sum = Math.abs(origin1 - endIdx) + 1; // 这里记录终点
        const min = Math.min(origin1, endIdx); // 这里记录起点
        let i = 0;
        while (i < sum) {
          const j = min + i;
          this.$refs.singleTable2.toggleRowSelection([
            {
              row: this.tableData2[j],
              selected: true,
            },
          ]); // 通过ref打点调用toggleRowSelection方法，第二个必须为true
          i++;
        }
      } else {
        this.origin1 = index.index; // 没按住记录起点
        this.$refs.singleTable2.toggleRowSelection([
          {
            row: index,
          },
        ]);
      }
    },
    selectionlist2(val) {
      this.checkboxlist2 = val;

      var items = val;
      var alldata = JSON.parse(JSON.stringify(this.checkboxlistall2));
      items.forEach((item) => {
        if (alldata.indexOf(item) == -1) {
          alldata.push(item);
        }
      });
      this.choosenum2 = alldata.length;
    },
    //   判断新增，修改
    getPartitionData(data, type) {
      //0 查询已经和待选记录 1 清空记录 2 查询已选记录
      this.transferForm = JSON.parse(JSON.stringify(data));
      if (type == 0 || type == 2) {
        this.tableData1 = []; //待选记录展示表格数据
        this.tableData2 = []; //已选记录展示表格数据
        this.tableData3 = []; //分摊系数表格数据
        this.totaltableData1 = []; //待选记录全部数据
        this.totaltableData2 = []; //已选记录记录全部数据
        if (type == 0) {
          this.getqueryPendingResource();
        }
        this.getqueryChildrenTable();
        if (
          this.totaltable.FTZB_FTFS == "按表行度" ||
          (this.totaltable.FTZB_FTFS == "按指定比例" &&
            this.totaltable.FTZB_FTLB == "用量差分摊")
        ) {
          this.getqueryDistributionCoefficient();
        }
        this.checkboxlist1 = [];
        this.checkboxlist2 = [];
      }
      if (type == 1) {
        this.tableData1 = []; //待选记录展示表格数据
        this.tableData2 = []; //已选记录展示表格数据
        this.tableData3 = []; //分摊系数表格数据
        this.totaltableData1 = []; //待选记录全部数据
        this.totaltableData2 = []; //已选记录记录全部数据
      }
    },
    //待选记录
    getqueryPendingResource() {
      queryPendingResource(this.transferForm).then((response) => {
        this.totaltableData1 = response;
        this.tableindex1.length = response.length;
        this.tableData1 = this.totaltableData1;

        this.tableData1.forEach((item, index) => {
          // 遍历索引,赋值给data数据
          item.index = index;
        });
      });
    },
    //已选记录
    getqueryChildrenTable() {
      queryChildrenTable(this.transferForm).then((response) => {
        this.totaltableData2 = response;
        this.tableindex2.length = response.length;
        this.tableData2 = this.totaltableData2;
        this.tableData2.forEach((item, index) => {
          // 遍历索引,赋值给data数据
          item.index = index;
        });
      });
    },
    //分摊记录
    getqueryDistributionCoefficient() {
      queryDistributionCoefficient(this.transferForm).then((response) => {
        this.tableData3 = response;
      });
    },
    //待选记录搜索
    search() {
      this.getqueryChildrenTable();
      if (
        this.totaltable.FTZB_FTFS == "按表行度" ||
        (this.totaltable.FTZB_FTFS == "按指定比例" &&
          this.totaltable.FTZB_FTLB == "用量差分摊")
      ) {
        this.getqueryDistributionCoefficient();
      }
    },
    //待选记录操作 左到右
    relativewait() {
      var items = this.checkboxlist1;
      items.forEach((item) => {
        if (this.checkboxlistall1.indexOf(item) == -1) {
          this.checkboxlistall1.push(item);
        }
      }); //checkboxlistall1只在滚动到顶部和底部切换数据记录数据，对比当前数据并存入总选中数据，保证所有选中记录存入checkboxlistall1
      var list = [];
      var items = this.checkboxlistall1;
      items.forEach((item) => {
        list.push(
          item.ZBJS_DLMC == "分摊总表"
            ? {
                ftzb_zj: item.ZBJS_ZJ,
                ZBJS_ZJ: item.ZBJS_ZJ,
                ZBJS_FKGXWJ: item.ZBJS_FKGXWJ,
              }
            : {
                ZBJS_ZJ: item.ZBJS_ZJ,
                ZBJS_FKGXWJ: item.ZBJS_FKGXWJ,
              }
        );
      }); //选中记录构造接口部分参数LIst
      var _this = this;
      relationshipBindingLeftToRight({
        FTZB_ZJ: this.transferForm.FTZB_ZJ,
        FTZB_ZBMC: this.transferForm.FTZB_ZBMC,
        FTZB_FTJB: this.transferForm.FTZB_FTJB,
        FTZB_FTFS: this.transferForm.FTZB_FTFS,
        type:
          this.totaltable.FTZB_FTFS == "按表行度" ||
          (this.totaltable.FTZB_FTFS == "按指定比例" &&
            this.totaltable.FTZB_FTLB == "用量差分摊")
            ? 1
            : 0,
        list: list,
      }).then((response) => {
        //操作完成后数据刷新重置-begin
        this.getqueryPendingResource();
        this.getqueryChildrenTable();
        if (
          this.totaltable.FTZB_FTFS == "按表行度" ||
          (this.totaltable.FTZB_FTFS == "按指定比例" &&
            this.totaltable.FTZB_FTLB == "用量差分摊")
        ) {
          this.getqueryDistributionCoefficient();
        }
        this.checkboxlist1 = [];
        this.checkboxlist2 = [];
        this.checkboxlistall1 = [];
        this.checkboxlistall2 = [];
        this.$refs.singleTable1.clearSelection();
        this.$refs.singleTable2.clearSelection();
        this.$emit("RefreshItem");
        //操作完成后数据刷新重置-end
      });
    },
    //待选记录全选操作 左到右，全选操作只把当前展示200笔数据进行操作
    relativewaitAll() {
      var items = this.tableData1;
      var list = [];
      items.forEach((item) => {
        list.push(
          item.ZBJS_DLMC == "分摊总表"
            ? {
                ftzb_zj: item.ZBJS_ZJ,
                ZBJS_ZJ: item.ZBJS_ZJ,
                ZBJS_FKGXWJ: item.ZBJS_FKGXWJ,
              }
            : {
                ZBJS_ZJ: item.ZBJS_ZJ,
                ZBJS_FKGXWJ: item.ZBJS_FKGXWJ,
              }
        );
      });
      relationshipBindingLeftToRight({
        FTZB_ZJ: this.transferForm.FTZB_ZJ,
        FTZB_ZBMC: this.transferForm.FTZB_ZBMC,
        FTZB_FTJB: this.transferForm.FTZB_FTJB,
        FTZB_FTFS: this.transferForm.FTZB_FTFS,
        type:
          this.totaltable.FTZB_FTFS == "按表行度" ||
          (this.totaltable.FTZB_FTFS == "按指定比例" &&
            this.totaltable.FTZB_FTLB == "用量差分摊")
            ? 1
            : 0,
        list: list,
      }).then((response) => {
        this.getqueryPendingResource();
        this.getqueryChildrenTable();
        if (
          this.totaltable.FTZB_FTFS == "按表行度" ||
          (this.totaltable.FTZB_FTFS == "按指定比例" &&
            this.totaltable.FTZB_FTLB == "用量差分摊")
        ) {
          this.getqueryDistributionCoefficient();
        }
        this.checkboxlist1 = [];
        this.checkboxlist2 = [];
        this.checkboxlistall1 = [];
        this.checkboxlistall2 = [];
        this.$refs.singleTable1.clearSelection();
        this.$refs.singleTable2.clearSelection();
        this.$emit("RefreshItem");
      });
    },
    //已选记录操作 右到左，同待选记录
    relativealready() {
      var items = this.checkboxlist2;
      items.forEach((item) => {
        if (this.checkboxlistall2.indexOf(item) == -1) {
          this.checkboxlistall2.push(item);
        }
      });
      var list = [];
      var items = this.checkboxlistall2;
      items.forEach((item) => {
        list.push(
          item.ZBJS_DLMC == "分摊总表"
            ? {
                ftzb_zj: item.ZBFT_ZBJSZJ,
                ZBFT_ZJ: item.ZBJS_ZJ,
              }
            : {
                ZBFT_ZJ: item.ZBJS_ZJ,
              }
        );
      });
      relationshipBindingRightToLeft({
        FTZB_ZJ: this.transferForm.FTZB_ZJ,
        FTZB_ZBMC: this.transferForm.FTZB_ZBMC,
        FTZB_FTJB: this.transferForm.FTZB_FTJB,
        FTZB_FTFS: this.transferForm.FTZB_FTFS,
        list: list,
        type:
          this.totaltable.FTZB_FTFS == "按表行度" ||
          (this.totaltable.FTZB_FTFS == "按指定比例" &&
            this.totaltable.FTZB_FTLB == "用量差分摊")
            ? 1
            : 0,
      }).then((response) => {
        this.getqueryPendingResource();
        this.getqueryChildrenTable();
        if (
          this.totaltable.FTZB_FTFS == "按表行度" ||
          (this.totaltable.FTZB_FTFS == "按指定比例" &&
            this.totaltable.FTZB_FTLB == "用量差分摊")
        ) {
          this.getqueryDistributionCoefficient();
        }
        this.checkboxlist1 = [];
        this.checkboxlist2 = [];
        this.checkboxlistall1 = [];
        this.checkboxlistall2 = [];
        this.$refs.singleTable1.clearSelection();
        this.$refs.singleTable2.clearSelection();
        this.$emit("RefreshItem");
      });
    },
    //已选记录全部操作 右到左，同待选记录
    relativealreadyAll() {
      var items = this.tableData2;
      var list = [];
      items.forEach((item) => {
        list.push(
          item.ZBJS_DLMC == "分摊总表"
            ? {
                ftzb_zj: item.ZBFT_ZBJSZJ,
                ZBFT_ZJ: item.ZBJS_ZJ,
              }
            : {
                ZBFT_ZJ: item.ZBJS_ZJ,
              }
        );
      });
      relationshipBindingRightToLeft({
        FTZB_ZJ: this.transferForm.FTZB_ZJ,
        FTZB_ZBMC: this.transferForm.FTZB_ZBMC,
        FTZB_FTJB: this.transferForm.FTZB_FTJB,
        FTZB_FTFS: this.transferForm.FTZB_FTFS,
        list: list,
        type:
          this.totaltable.FTZB_FTFS == "按表行度" ||
          (this.totaltable.FTZB_FTFS == "按指定比例" &&
            this.totaltable.FTZB_FTLB == "用量差分摊")
            ? 1
            : 0,
      }).then((response) => {
        this.getqueryPendingResource();
        this.getqueryChildrenTable();
        if (
          this.totaltable.FTZB_FTFS == "按表行度" ||
          (this.totaltable.FTZB_FTFS == "按指定比例" &&
            this.totaltable.FTZB_FTLB == "用量差分摊")
        ) {
          this.getqueryDistributionCoefficient();
        }
        this.checkboxlist1 = [];
        this.checkboxlist2 = [];
        this.checkboxlistall1 = [];
        this.checkboxlistall2 = [];
        this.$refs.singleTable1.clearSelection();
        this.$refs.singleTable2.clearSelection();
        this.$emit("RefreshItem");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.Stransfer {
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
      padding-top: 70px;
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
      .search {
        width: 100%;
        height: 70px;
        margin-top: -70px;
        padding-top: 18px;
        .input {
          width: 40%;
          margin: 0 20px;
        }
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
      padding-top: 70px;
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
      .search {
        width: 100%;
        height: 70px;
        margin-top: -70px;
        padding-top: 18px;
        .input {
          width: 40%;
          margin: 0 20px;
        }
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
.Stransfer .pl-table {
  height: 100%;
}
.Stransfer .el-button.is-circle {
  width: inherit;
  min-width: inherit;
  height: inherit;
  margin-bottom: inherit;
}

.Stransfer .el-button {
  min-width: 0px !important;
  height: 40px;
}
</style>
