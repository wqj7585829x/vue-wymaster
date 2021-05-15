<template>
  <div class="container">
    <!-- 搜索框start -->
    <section class="searchBox">
      <el-form label-width="105px" :model="queryPage">
        <el-row :gutter="30">
          <el-col :span="6" style="width: 300px">
            <el-form-item label="楼栋名称：">
              <el-select
                v-model="queryPage.DLDA_ZJ"
                placeholder="请选择"
                @change="BuildChange"
                clearable
              >
                <el-option
                  v-for="item in BuildArray"
                  :key="item.DLDA_ZJ"
                  :label="item.DLDA_DLMC"
                  :value="item.DLDA_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="资源名称：">
              <el-select
                v-model="queryPage.FJDA_ZJ"
                placeholder="请选择"
                :disabled="
                  queryPage.DLDA_ZJ == undefined || queryPage.DLDA_ZJ == ''
                "
                clearable
              >
                <el-option
                  v-for="item in RoomArray"
                  :key="item.FJDA_ZJ"
                  :label="item.FJDA_FJMC"
                  :value="item.FJDA_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="收费项目：">
              <el-select
                v-model="queryPage.SFXM_ZJ"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in ChargeItemsArray"
                  :key="item.SFXM_ZJ"
                  :label="item.SFXM_SFXMMC"
                  :value="item.SFXM_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="起始年月：">
              <el-date-picker
                v-model="queryPage.startMonth"
                format="yyyy-MM"
                value-format="yyyy-MM"
                type="month"
                placeholder="请选择"
                style="width: 165px"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 300px">
            <el-form-item label="截止年月：">
              <el-date-picker
                v-model="queryPage.endMonth"
                format="yyyy-MM"
                value-format="yyyy-MM"
                type="month"
                placeholder="请选择"
                style="width: 165px"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-form-item label-width="0px">
              <el-button
                type="success"
                @click="search"
                v-has="'ActualListSearch_has'"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <!-- 搜索框end -->
    <!-- 按钮操作 -->
    <section class="buttonBox">
      <el-row>
        <el-col :span="24">
          <el-button
            type="primary"
            @click="confirmMonth"
            :disabled="disabledEdit"
            v-has="'ActualListConfirmMonth_has'"
            >确认本月应收</el-button
          >
          <el-button
            type="primary"
            @click="cancelMonth"
            :disabled="disabledEdit"
            v-has="'ActualListCancelMonth_has'"
            >取消本月应收</el-button
          >
        </el-col>
      </el-row>
    </section>
    <!-- 表格 -->
    <el-row class="sysCon_Mt">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        class="tableContent"
        ref="singleTable"
        @selection-change="selectionChange"
      >
        <el-table-column label="选择" type="selection" fixed> </el-table-column>
        <el-table-column
          prop="YSLB_GLCMC"
          label="管理处名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_LDMC"
          label="楼栋名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_ZYMC"
          label="资源名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_ZYDZ"
          label="资源地址"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_YZDM"
          label="业主代码"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_YZMC"
          label="业主名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_ZHDM"
          label="租户代码"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_ZHMC"
          label="租户名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_SFMJ"
          label="收费面积"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_JSDJ"
          label="计算单价"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_SFXMMC"
          label="收费项目名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_FYSSNY"
          label="费用所属年月"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_FYQJ"
          label="费用期间"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_JEHS"
          label="金额（含税）"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_SL"
          label="税率"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_JEBHS"
          label="金额（不含税）"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="YSLB_SE"
          label="税额"
          width="150"
        ></el-table-column>
        <el-table-column prop="YSLB_YSZT" label="应收状态" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.YSLB_YSZT === 1 ? "确认应收" : "未确认" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
    <el-row>
      <span class="totalamount"
        ><span>金额(含税)合计：{{ YSLB_JEHS }}</span
        ><span>金额(不含税)合计：{{ YSLB_JEBHS }}</span></span
      >
      <span class="el-paginationR" v-if="queryPage.total">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="queryPage.currentPage"
          :page-size="queryPage.pageSize"
          layout="total,prev, pager, next, jumper"
          :total="queryPage.total"
        >
        </el-pagination>
      </span>
    </el-row>
  </div>
</template>

<script>
import {
  BuildArrayListApi,
  RoomArrayListApi,
  ChargeItemsArrayListApi,
  listApi,
  ReceivableListSumApi,
  confirmMonthApi,
  cancelMonthApi,
} from "@/api/ReceivableManage/ActualList";
export default {
  name: "ActualList",
  data() {
    return {
      queryPage: {
        pageIndex: 0,
        pageSize: 10,
        currentPage: 1,
        total: null, //总共条数
      }, //搜索条件
      BuildArray: [],
      RoomArray: [],
      ChargeItemsArray: [],
      tableData: [],
      YSLB_JEHS: 0, //金额(含税)合计
      YSLB_JEBHS: 0, //金额(不含税)合计
      disabledEdit: true,
      multipleSelection: [], //选中数据
    };
  },
  components: {},
  computed: {},
  watch: {
    "queryPage.DLDA_ZJ"() {
      if (this.queryPage.DLDA_ZJ == "" || this.queryPage.DLDA_ZJ == undefined) {
        this.queryPage.FJDA_ZJ = "";
      }
    },
    multipleSelection() {
      if (this.multipleSelection.length) {
        this.disabledEdit = false;
      } else {
        this.disabledEdit = true;
      }
    },
  },
  mounted() {
    this.list(); //查询列表
    this.BuildArrayList(); //楼栋名称
    this.ChargeItemsArrayList(); //收费项目名称
  },
  methods: {
    BuildArrayList() {
      //楼栋名称
      BuildArrayListApi(this.queryPage).then((response) => {
        if (response) {
          this.BuildArray = response;
        }
      });
    },
    BuildChange() {
      RoomArrayListApi(this.queryPage).then((response) => {
        if (response) {
          this.RoomArray = response;
        }
      });
    },
    ChargeItemsArrayList() {
      ChargeItemsArrayListApi(this.queryPage).then((response) => {
        if (response) {
          this.ChargeItemsArray = response;
        }
      });
    },
    search() {
      this.queryPage.pageIndex = 0; //重置第一页
      this.queryPage.currentPage = 1; //重置第一页
      this.list();
    },
    list() {
      listApi(this.queryPage).then((response) => {
        this.tableData = response.data;
        this.queryPage.total = response.total;
      });
      this.ReceivableListSum(); //应收列表统计
    },
    ReceivableListSum() {
      //应收列表统计
      ReceivableListSumApi(this.queryPage).then((response) => {
        if (response) {
          this.YSLB_JEHS = response.YSLB_JEHS;
          this.YSLB_JEBHS = response.YSLB_JEBHS;
        }
      });
    },
    //分页页签切换
    handleCurrentChange(currentPage) {
      this.queryPage.pageIndex = currentPage - 1;
      this.list();
    },
    selectionChange(val) {
      //全选
      this.multipleSelection = val;
    },
    confirmMonth() {
      //确认本月应收
      if (this.multipleSelection.length) {
        var obj = "";
        this.multipleSelection.forEach((item) => {
          obj += item.YSLB_ZJ + ",";
        });
        var objstr = obj.substring(0, obj.length - 1);
        confirmMonthApi(objstr).then((response) => {
          if ((response.returnStatus = "SUCCESS")) {
            this.list();
          }
        });
      }
    },
    cancelMonth() {
      //取消本月应收
      if (this.multipleSelection.length) {
        let obj = "";
        this.multipleSelection.forEach((item) => {
          obj += item.YSLB_ZJ + ",";
        });
        let objstr = obj.substring(0, obj.length - 1);
        cancelMonthApi(objstr).then((response) => {
          if ((response.returnStatus = "SUCCESS")) {
            this.list();
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.totalamount {
  float: left;
  margin-top: 20px;
  font-size: 14px;
  span {
    margin-right: 20px;
  }
}
.el-paginationR {
  float: right;
}
</style>
