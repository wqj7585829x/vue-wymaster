<template>
  <div class="GWJJY container" ref="GWJJY">
    <!-- 按钮begin -->
    <el-form
      label-width="85px"
      :model="GWJJYForm"
      :rules="rules"
      ref="GWJJYForm"
    >
      <el-row :gutter="30">
        <el-col :span="5" style="width: 250px">
          <el-form-item label="管理处：">
            <el-select v-model="index" @change="GLCchange">
              <el-option
                v-for="(item, index) in plotlist"
                :key="index"
                :label="item.GLCNAME"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 250px">
          <el-form-item label="资源名称：" prop="HZ_FJMC">
            <el-select v-model="GWJJYForm.HZ_FJMC" filterable clearable>
              <el-option
                v-for="item in roomList"
                :key="item.FJDA_FJMC"
                :label="item.FJDA_FJMC"
                :value="item.FJDA_FJMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 250px">
          <el-form-item label="客户名称：">
            <el-input v-model="GWJJYForm.KHDA_KHMC" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col
          :span="5"
          style="width: 250px; padding-right: 0; padding-top: 2px"
        >
          <el-button type="primary" @click="getTableData">查询</el-button>
          <el-button
            type="success"
            @click="downloData"
            :disabled="GWJJYForm.list == ''"
            >导出excel
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!--  表begin -->
    <div class="resoureTable">
      <el-table
        ref="multipleTable"
        :summary-method="getSummaries"
        show-summary
        :data="tableData"
        border
        :height="height"
        v-loading="loading"
        element-loading-text="数据加载中，请耐心等待..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(200, 200, 200, 0.5)"
        empty-text="　"
      >
        <el-table-column prop="HZ_ZH" label="账号" width="200">
        </el-table-column>
        <el-table-column prop="HZ_FJMC" label="资源名称" width="150">
        </el-table-column>
        <el-table-column prop="HZ_KHMC" label="客户名称" width="150">
        </el-table-column>
        <el-table-column prop="HZ_SFMJ" label="收费面积" width="150">
        </el-table-column>
        <el-table-column prop="HZ_YE" label="余额" width="100">
        </el-table-column>
        <el-table-column prop="FKGX_LX" label="类型" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.FKGX_LX == 1 || scope.row.FKGX_LX == '1'"
              >业主</span
            >
            <span v-if="scope.row.FKGX_LX == 2 || scope.row.FKGX_LX == '2'"
              >租户</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="HZ_BZ" label="备注"> </el-table-column>
      </el-table>
    </div>
    <!--  表 end -->

    <!-- 分页begin -->
    <!-- <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
          :page-size="GWJJYForm.pageSize" layout="total, prev, pager, next, jumper" :total="returnTotal">
        </el-pagination>
      </div> -->
    <!-- 分页end -->
  </div>
</template>

<script>
import {
  queryRoom,
  queryPublicSecurityBalance,
  isLeader,
  queryRoomByPlot,
  exportExcelOfPublicSecurity,
} from "@/api/Home/Home";
import { mapGetters } from "vuex";
export default {
  name: "GWJJY",
  data() {
    return {
      title: "公维金金额", //标题
      tableData: [],
      GWJJYForm: {
        list: "",
        plotDbName: "",
        GLCID: "",
        YXDID: "",
        HZ_FJMC: "",
        HZ_KHMC: "",
        pageIndex: 0,
        pageSize: 100,
      },
      index: 0,
      zydata: [],
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      rules: {
        HZ_FJMC: [
          { required: true, message: "请选择资源名称", trigger: "blur" },
        ],
      },
      plotlist: [
        {
          GLCID: "",
          GLCNAME: "全部",
          YXDID: "",
          dbName: "",
        },
      ],
      roomList: [],
      height: 150,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["userPlot"]),
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getPartitionData();
      }, 1000);
    });
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (
          !values.every((value) => isNaN(value)) &&
          column.property != "HZ_FJMC" &&
          column.property != "HZ_KHMC" &&
          column.property != "FKGX_LX"
        ) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index].toFixed(2);
          sums[index] += " 元";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    GLCchange(index) {
      this.GWJJYForm.plotDbName = this.plotlist[index].dbName;
      this.GWJJYForm.GLCID = this.plotlist[index].GLCID;
      this.GWJJYForm.YXDID = this.plotlist[index].YXDID;
      this.GWJJYForm.HZ_FJMC = "";
      this.getroom();
    },
    getroom() {
      queryRoomByPlot(this.GWJJYForm).then((response) => {
        this.roomList = response;
      });
    },
    //   判断新增，修改
    getPartitionData() {
      this.loading = false;
      this.height =
        this.$refs.GWJJY.offsetHeight -
        this.$refs.GWJJYForm.$el.offsetHeight -
        60;
      this.index = 0;
      this.GWJJYForm = {
        plotDbName: "",
        GLCID: "",
        YXDID: "",
        HZ_FJMC: "",
        HZ_KHMC: "",
        list: "",
        pageIndex: 0,
        pageSize: 100,
      };
      this.tableData = [];
      this.plotlist = [
        {
          GLCID: "",
          GLCNAME: "全部",
          YXDID: "",
          dbName: "",
        },
      ];

      this.plotlist = this.plotlist.concat(this.userPlot);
      var parent = this.plotlist;
      var children;
      var index;
      if (sessionStorage.getItem("plotItem") == null) {
        index = 1;
      } else {
        children = JSON.parse(sessionStorage.getItem("plotItem"));
        index = parent.findIndex(
          (d) =>
            d.GLCID === children.GLCID &&
            d.YXDID === children.YXDID &&
            d.dbName === children.dbName
        ); //寻找data的索引
      }
      var _this = this;
      isLeader().then((response) => {
        if (response.isLeader) {
          _this.GWJJYForm.plotDbName = _this.plotlist[0].dbName;
          _this.GWJJYForm.GLCID = _this.plotlist[0].GLCID;
          _this.GWJJYForm.YXDID = _this.plotlist[0].YXDID;
          _this.getroom();
        } else {
          _this.index = index;
          _this.GWJJYForm.plotDbName = _this.plotlist[index].dbName;
          _this.GWJJYForm.GLCID = _this.plotlist[index].GLCID;
          _this.GWJJYForm.YXDID = _this.plotlist[index].YXDID;
          _this.getroom();
        }
      });
      // this.getTableData()
    },
    handleCurrentChange(currentPage) {
      this.GWJJYForm.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.tableRow = {}; //选择后清空选中表格数据
    },
    getTableData() {
      this.$refs["GWJJYForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          queryPublicSecurityBalance(this.GWJJYForm).then((response) => {
            var data = response.data;
            this.GWJJYForm.list = JSON.stringify(data);
            this.tableData = data;
            this.returnTotal = response.total;
            this.loading = false;
          });
        } else {
          return false;
        }
      });
    },
    downloData() {
      this.$refs["GWJJYForm"].validate((valid) => {
        if (valid) {
          exportExcelOfPublicSecurity(this.GWJJYForm).then((response) => {
            const content = response;
            const blob = new Blob([content]);
            const fileName = `${this.title}.xls`;
            if ("download" in document.createElement("a")) {
              // 非IE下载
              const elink = document.createElement("a");
              elink.download = fileName;
              elink.style.display = "none";
              elink.href = URL.createObjectURL(blob);
              document.body.appendChild(elink);
              elink.click();
              URL.revokeObjectURL(elink.href); // 释放URL 对象
              document.body.removeChild(elink);
            } else {
              // IE10+下载
              navigator.msSaveBlob(blob, fileName);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消
  },
};
</script>
<style>
.GWJJY .el-dialog__body {
  padding: 20px;
  overflow: auto;
  height: 700px;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}

.GWJJY .el-dialog-fourfold .el-row {
  margin: 0 !important;
  padding: 0 !important;
}

.GWJJY .el-dialog__body {
  padding: 20px;
  overflow: auto;
  height: 700px;
}
.GWJJY .el-loading-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.GWJJY .el-loading-spinner {
  top: 50% !important;
  position: absolute;
}
</style>
