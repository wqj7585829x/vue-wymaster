<template>
  <div class="container Customer">
    <!-- 按钮begin -->
    <el-form label-width="75px">
      <el-row :gutter="30">
        <el-col :span="6" style="width: 300px">
          <el-form-item label="项目名称:">
            <el-select
              v-model="searchList.index"
              @change="plotChange"
              clearable
            >
              <el-option
                v-for="(item, index) in plot_List"
                :key="index"
                :label="item.plotName"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="房间名称:">
            <el-input v-model="searchList.FJDA_FJMC" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="房间代码:">
            <el-input v-model="searchList.FJDA_FJID" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px">
          <el-form-item label="资产分类:">
            <el-select v-model="searchList.FJDA_ZCFL" clearable>
              <el-option label="自有" :value="1"></el-option>
              <el-option label="代管" :value="2"></el-option>
              <el-option label="经营性" :value="3"></el-option>
              <el-option label="临时经营性" :value="4"></el-option>
              <el-option label="其他" :value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 300px">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="handleCurrentChange(1)"
              v-has="'HousingResourcesSearch_has'"
              >查询
            </el-button>
            <el-button
              type="primary"
              @click="showRoom"
              v-has="'HousingResourcesstatus_has'"
              >房态图
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table ref="singleTable" :data="tableData" max-height="450" border>
        <el-table-column
          prop="plotName"
          label="项目名称"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="FJDA_FJMC"
          label="房间名称"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="FJDA_LC"
          label="层数"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="FJDA_SFMJ"
          label="收费面积"
          width="80"
        ></el-table-column>

        <el-table-column
          prop="FJDA_JZMJ"
          label="建筑面积"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="FJDA_FJID"
          label="资源代码"
          width="160"
        ></el-table-column>
        <el-table-column prop="FJDA_ZCFL" label="资产分类" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.FJDA_ZCFL === 1">自有</div>
            <div v-if="scope.row.FJDA_ZCFL === 2">代管</div>
            <div v-if="scope.row.FJDA_ZCFL === 3">经营性</div>
            <div v-if="scope.row.FJDA_ZCFL === 4">临时经营性</div>
            <div v-if="scope.row.FJDA_ZCFL === 5">其他</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="FJDA_CX"
          label="朝向"
          width="100"
        ></el-table-column>
        <el-table-column prop="FJDA_SFKZ" label="是否空置" width="80">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.FJDA_SFKZ"
              :disabled="true"
            ></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column prop="FJDA_CZZT" label="入住状态" width="80">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.FJDA_CZZT"
              :disabled="true"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          prop="FJDA_ZYLX"
          label="资源类型"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="FJDA_GLQMC"
          label="分区名称"
          width="200"
        ></el-table-column>
        <el-table-column prop="FJDA_DLMC" label="楼栋名称"></el-table-column>
      </el-table>
    </div>

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > searchList.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="searchList.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      ></el-pagination>
    </div>

    <!-- 分页end -->
    <RoomStatusDialog
      :show.sync="show"
      ref="RoomStatusDialog"
    ></RoomStatusDialog>
  </div>
</template>
<script>
import {
  queryHouseResource,
  queryPlotsWithAuthority,
} from "@/api/Realtor/Customer";
import RoomStatusDialog from "./components/RoomStatusDialog";
export default {
  name: "MonthlyCar",
  data() {
    return {
      tableData: [],
      searchList: {
        pageIndex: 0,
        pageSize: 10,
        FJDA_FJMC: "",
        FJDA_FJID: "",
        GLCID: "",
        YXDID: "",
        index: "",
        plotDbName: "",
      },
      show: false,
      radio: null,
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      Familyshow: false,
      plot_List: [],
    };
  },
  watch: {},
  mounted() {
    this.getTableData();
    queryPlotsWithAuthority().then((response) => {
      this.plot_List = response;
    });
  },
  methods: {
    showRoom() {
      this.show = true;
      this.$refs.RoomStatusDialog.getReportData();
    },
    plotChange(index) {
      if (index === "") {
        this.searchList.plotDbName = "";
        this.searchList.GLCID = "";
        this.searchList.YXDID = "";
        this.searchList.plotName = "";
      } else {
        this.searchList.plotDbName = this.plot_List[index].plotDbName;
        this.searchList.GLCID = this.plot_List[index].GLCID;
        this.searchList.YXDID = this.plot_List[index].YXDID;
        this.searchList.plotName = this.plot_List[index].plotName;
      }
    },
    handleCurrentChange(currentPage) {
      this.searchList.pageIndex = currentPage - 1;
      this.currentPage = currentPage;
      this.getTableData(); //获取表格数据
      this.radio = null; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    getTableData() {
      queryHouseResource(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
  },
  components: {
    RoomStatusDialog,
  },
};
</script>
<style lang="scss">
.block {
  text-align: right;
}

.Customer .el-select {
  width: 100%;
}
</style>
