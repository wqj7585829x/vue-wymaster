<template>
  <div class="container OpeningRecord">
    <!-- 按钮begin -->
    <el-form label-width="85px">
      <el-row :gutter="30">
        <el-col :span="6" style="min-width: 220px">
          <el-form-item label="楼栋名称:" label-width="70px">
            <el-select
              v-model="queryDoorPage.KMJL_LDWJ"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.DLDA_ZJ"
                :label="item.DLDA_DLMC"
                :value="item.DLDA_ZJ"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="min-width: 220px">
          <el-form-item label="开始时间:" label-width="70px">
            <el-date-picker
              v-model="queryDoorPage.stateTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="min-width: 220px">
          <el-form-item label="结束时间:" label-width="70px">
            <el-date-picker
              v-model="queryDoorPage.endTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="min-width: 220px">
          <el-form-item label="" label-width="0px">
            <el-button type="success" @click="getTableData">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="DLDA_DLMC" label="楼栋名称" width="150">
      </el-table-column>
      <el-table-column label="开门人类型" width="150">
        <template slot-scope="scope">
          {{
            scope.row.KMJL_SFFK
              ? "访客"
              : scope.row.RYMJQX_RYLX == 2
              ? "家庭成员"
              : scope.row.FKGX_LX == 1
              ? "业主"
              : "租户"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="KMJL_KMR" label="开门人" width="150">
      </el-table-column>
      <el-table-column prop="KMJL_KMRSJH" label="开门人手机号" width="150">
      </el-table-column>
      <el-table-column label="开门方式">
        <template slot-scope="scope">
          {{ scope.row.KMJL_KMFS == 1 ? "门禁卡开门" : ""
          }}{{ scope.row.KMJL_KMFS == 2 ? "扫码开门" : ""
          }}{{ scope.row.KMJL_KMFS == 3 ? "动态密码开门" : ""
          }}{{ scope.row.KMJL_KMFS == 4 ? "人脸开门" : "" }}
        </template>
      </el-table-column>
      <el-table-column prop="KMJL_KMSJ" label="开门时间"> </el-table-column>
      <el-table-column prop="KMJL_BZ" label="备注"> </el-table-column>
    </el-table>

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > queryDoorPage.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="queryDoorPage.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->
  </div>
</template>
<script>
import {
  queryOpenDeerRecord,
  queryBuildingMessage,
} from "@/api/AccessControl/OpeningRecord";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      queryDoorPage: {
        // 查询表
        pageIndex: 0,
        pageSize: 10,
        KMJL_LDWJ: "",
        stateTime: "",
        endTime: "",
      },
      options: [],
    };
  },
  mounted() {
    queryBuildingMessage().then((response) => {
      this.options = response;
    });
    this.getTableData();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.queryDoorPage.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    // 表数据
    getTableData() {
      queryOpenDeerRecord(this.queryDoorPage).then((response) => {
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
<style>
.OpeningRecord .el-select {
  width: 100%;
}

.OpeningRecord .el-date-editor {
  width: 100% !important;
}
</style>
