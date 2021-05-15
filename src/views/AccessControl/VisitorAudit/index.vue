<template>
  <div class="container">
    <!-- 按钮begin -->
    <el-form label-width="85px">
      <el-row :gutter="30">
        <el-col :span="5" style="width: 300px">
          <el-form-item label="楼栋名称：" class="TextColor">
            <el-select
              v-model="buildname"
              placeholder="请选择"
              @change="buildChange"
              clearable
            >
              <el-option
                v-for="(item, index) in buildList"
                :key="index"
                :label="item.DLDA_DLMC"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="房间名称：" class="TextColor">
            <el-select
              v-model="searchList.FKSQ_FJMC"
              placeholder="请选择"
              clearable
            >
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

        <el-col :span="5" style="width: 300px">
          <el-form-item label="审核状态：" class="TextColor">
            <el-select
              v-model="searchList.FKSQ_ZT"
              placeholder="请选择"
              clearable
            >
              <el-option label="审核中" :value="0"></el-option>
              <el-option label="通过" :value="1"></el-option>
              <el-option label="不通过" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="访客姓名：">
            <el-input v-model="searchList.FKSQ_SQRXM" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label="访客电话：">
            <el-input v-model="searchList.FKSQ_SQRSJH" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 330px">
          <el-form-item label="访客身份证：" label-width="100px">
            <el-input v-model="searchList.FKSQ_SQRSFZH" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7" style="width: 500px">
          <el-form-item label="来访时间：" prop="Data">
            <el-date-picker
              type="datetimerange"
              v-model="searchData"
              @change="timechange"
              is-range
              start-placeholder="来访开始时间"
              end-placeholder="来访截止时间"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width: 300px">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="getdata()"
              v-has="'VisitorAuditSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 客户详情begin -->
    <div class="customedetail">
      <el-table ref="singleTable" :data="tableData" max-height="500" border>
        <el-table-column
          prop="FKSQ_ZT"
          label="审核状态"
          width="100"
          :formatter="formatterFKXX_ZT"
        >
        </el-table-column>
        <el-table-column prop="FKSQ_DLMC" label="楼栋名称" width="250">
        </el-table-column>
        <el-table-column prop="FKSQ_FJMC" label="房间名称" width="250">
        </el-table-column>
        <el-table-column prop="FKSQ_LFSJ" label="来访时间" width="200">
        </el-table-column>
        <el-table-column prop="FKSQ_SQRXM" label="访客姓名" width="200">
        </el-table-column>
        <el-table-column prop="FKSQ_SQRSJH" label="访客手机号" width="200">
        </el-table-column>
        <el-table-column prop="FKSQ_FKRS" label="访客人数" width="150">
        </el-table-column>
        <el-table-column prop="FKSQ_LFYY" label="来访缘由" width="250">
        </el-table-column>
        <el-table-column prop="FKSQ_SQRSFZH" label="访客身份证号" width="150">
        </el-table-column>
        <el-table-column prop="FKSQ_YYZGX" label="与业主关系" width="250">
        </el-table-column>
      </el-table>

      <!-- 分页begin -->
      <div class="block" v-if="returnTotal > searchList.pageSize">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="searchList.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="returnTotal"
        >
        </el-pagination>
      </div>
      <!-- 分页end -->
    </div>
    <!-- end -->
    <el-dialog
      v-dialogDrag
      title="审核不通过原因"
      :visible.sync="DialogVisible"
      width="30%"
      style="text-align: center"
    >
      <el-input
        class="reason"
        type="textarea"
        :rows="2"
        placeholder="作废原因"
        v-model="invalidval"
        style="padding: 0 30px"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryBuilding,
  queryRoom,
  queryVisitorRecord,
} from "@/api/AccessControl/VisitorAudit";
export default {
  name: "CategorySet",
  data() {
    return {
      DialogVisible: false,
      tableData: [],
      searchData: [],
      buildname: "",
      searchList: {
        FKSQ_ZT: "",
        FKSQ_DLMC: "",
        FKSQ_FJMC: "",
        beginDate: "",
        endDate: "",
        FKSQ_SQRXM: "",
        FKSQ_SQRSJH: "",
        FKSQ_SQRSFZH: "",
        pageIndex: 0,
        pageSize: 10,
      },
      tableData: [],
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      buildList: [],
      roomList: [],
      uncheckdata: {},
      invalidval: "",
    };
  },
  watch: {},
  mounted() {
    this.searchBuilding();
    this.getdata();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.searchList.pageIndex = currentPage - 1;
      this.getdata(); //获取表格数据
    },
    searchBuilding() {
      queryBuilding().then((response) => {
        this.buildList = response;
      });
    },
    buildChange(index) {
      this.roomList = [];
      this.searchList.FKSQ_DLMC =
        index === "" ? "" : this.buildList[index].DLDA_DLMC;
      this.searchRoom(this.buildList[index].DLDA_ZJ);
    },
    searchRoom(FJDA_DLWJ) {
      queryRoom({ FJDA_DLWJ: FJDA_DLWJ }).then((response) => {
        this.roomList = response;
      });
    },
    timechange(data) {
      this.searchList.beginDate = data === null ? "" : data[0];
      this.searchList.endDate = data === null ? "" : data[1];
    },
    formatterFKXX_ZT(row, column) {
      return row.FKSQ_ZT == 0 ? "审核中" : row.FKSQ_ZT == 1 ? "通过" : "不通过";
    },
    handleuncheck(data) {
      this.DialogVisible = true;
      this.invalidval = "";
      this.uncheckdata = data;
    },
    submit() {
      auditNoPass({
        FKXX_ZJ: this.uncheckdata.FKXX_ZJ,
        FKXX_SHJGSM: this.invalidval,
      }).then((response) => {
        this.DialogVisible = false;
        this.getdata();
      });
    },
    getdata() {
      queryVisitorRecord(this.searchList).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
