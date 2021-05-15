<template>
  <div class="container contract">
    <!-- 按钮begin -->
    <el-form label-width="75px">
      <el-row :gutter="30">
        <el-col :span="6" style="width:300px">
          <el-form-item label="项目名称:">
            <el-select v-model="liveForm.plot_id" clearable>
              <el-option v-for="(item,index) in plot_List" :key="index" :label="item.GLCNAME" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width:300px">
          <el-form-item label="资源名称:">
            <el-input v-model="liveForm.room_name" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width:300px">
          <el-form-item label="客户名称:">
            <el-input v-model="liveForm.KHDA_KHMC" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">

        <el-col :span="6" style="width:300px">
          <el-form-item label="合同类型:">
            <el-select v-model="liveForm.contract_type" clearable>
              <el-option label="租赁合同" :value="1"></el-option>
              <el-option label="销售合同" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width:300px">
          <el-form-item label="合同编号:">
            <el-input v-model="liveForm.contract_num" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button type="success" @click="handleCurrentChange(1)" v-has="'ContractSearchLive_has'">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button type="primary" @click="addcontract">入住</el-button>
      </el-button>
    </div>
    <!-- 按钮end -->
    <div class="resoureTable">
      <el-table ref="multipleTable" :data="tableData" border @row-click="rowClick">
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="GLCNAME" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="contract_num" label="合同编号" width="120"></el-table-column>
        <el-table-column prop="KHDA_KHMC" label="客户名称" width="120"></el-table-column>
        <el-table-column prop="company_name" label="出租方" width="120"></el-table-column>
        <el-table-column prop="manager" label="经办人" width="120"></el-table-column>
        <el-table-column prop="signing_date" label="签约日期" width="120"></el-table-column>
        <el-table-column prop="contract_start" label="合同起始" width="120"></el-table-column>
        <el-table-column prop="contract_end" label="合同截止" width="120"></el-table-column>
        <el-table-column prop="lease_cycle" label="租赁周期" width="120"></el-table-column>
        <el-table-column prop="rent_free_period" label="免租期" width="120"></el-table-column>
        <el-table-column prop="rent_free_unit" label="免租期单位" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.rent_free_unit ==1">天</div>
            <div v-if="scope.row.rent_free_unit ==2">月</div>
          </template>
        </el-table-column>
        <el-table-column prop="fee_start" label="费用计费开始日" width="120"></el-table-column>
        <el-table-column prop="fee_end" label="费用计费截止日" width="120"></el-table-column>
        <el-table-column prop="rental_area" label="出租面积" width="120"></el-table-column>
        <el-table-column prop="total_amount" label="合同总金额" width="120"></el-table-column>
        <el-table-column prop="down_payment" label="首付金额" width="120"></el-table-column>
        <el-table-column prop="deposit_total" label="押金总额" width="120"></el-table-column>
        <el-table-column prop="SFKM_SKFS" label="付款方式" width="120"></el-table-column>
        <el-table-column prop="contract_type" label="合同类型" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.contract_type ==1">租赁合同</div>
            <div v-if="scope.row.contract_type ==2">销售合同</div>
          </template>
        </el-table-column>
        <el-table-column prop="contract_description" label="合同描述" width="120"></el-table-column>
        <el-table-column prop="status" fixed="right" label="状态" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.status ==0">编辑中</div>
            <div v-if="scope.row.status ==1">审核中</div>
            <div v-if="scope.row.status ==11">审核通过</div>
            <div v-if="scope.row.status ==21">审核不通过</div>
            <div v-if="scope.row.status ==28">历史合同</div>
            <div v-if="scope.row.status ==29">合同取消</div>
            <div v-if="scope.row.status ==31">退租申请</div>
            <div v-if="scope.row.status ==32">正常验收</div>
            <div v-if="scope.row.status ==33">正常退租</div>
            <div v-if="scope.row.status ==34">入住</div>
            <div v-if="scope.row.status ==41">提前退租申请</div>
            <div v-if="scope.row.status ==42">部分验收</div>
            <div v-if="scope.row.status ==43">提前退租</div>
          </template>
        </el-table-column>
        <el-table-column prop="" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click.stop="checkcontract(scope.row.contract_id,scope.row.plot_id)" size="small"
              :disabled="scope.row.status!=1">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal>liveForm.pageSize">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-size="liveForm.pageSize" layout="total, prev, pager, next, jumper" :total="returnTotal">
      </el-pagination>
    </div>
    <!-- 分页end -->

    <TaxDialog :Taxshow.sync="Taxshow" ref="TaxDialog" @RefreshItem="RefreshItem"></TaxDialog>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TaxDialog from "./components/TaxDialog";
import { queryLeaseContract, queryZLPlot } from "@/api/Realtor/Contract";
export default {
  name: "",
  data() {
    return {
      liveForm: {
        plot_id: '',
        contract_num: '',
        KHDA_KHMC: '',
        contract_name: '',
        room_name: '',
        pageIndex: 0,
        pageSize: 10
      },
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      show: false,
      Taxshow: false,
      tableData: [],
      multipleSelection: [],
      editlimit: true,
      deletelimit: true,
      plot_List: [],
      radio: null,
      tableRow: {},
    };
  },
  mounted() {
    this.getTableData()

    queryZLPlot().then(response => {
      this.plot_List = response
    })
  },
  computed: {
    ...mapGetters(["userPlot"])
  },
  methods: {
    getTableData() {
      queryLeaseContract(this.liveForm).then(response => {
        this.tableData = response.data
        this.returnTotal = response.total
      })
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.liveForm.pageIndex = currentPage - 1
      this.getTableData(); //获取表格数据
      this.radio = null
      this.tableRow = {}
    },
    addcontract() {
      this.Taxshow = true
      this.$refs.TaxDialog.getReportData(this.tableRow, 0);
    },
    deletecontract() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {

        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    rowClick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    RefreshItem() {
      this.handleCurrentChange(1)
    }
  },
  components: {
    TaxDialog
  }
};
</script>

<style lang="scss">
.contract {
  .el-select {
    width: 100%;
  }
  .el-title {
    padding: 0;
  }
  .title {
    padding-top: 36px;
    .title-top {
      margin-top: -36px;
      height: 36px;
      width: 100%;
      .tt-tab {
        float: left;
        height: 36px;
        width: 50%;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(77, 77, 77, 1);
        background: rgba(223, 224, 230, 1);
      }
      .tt-check {
        font-weight: bold;
        color: rgba(46, 138, 215, 1);
        background: rgb(255, 255, 255);
      }
    }
    .title-body {
      width: 100%;
      height: 98%;
      padding: 0 10px;
      overflow: auto;
      .ztree_content_wrap {
        margin-top: 10px;
        text-align: center;
        .el-input__inner {
          width: 190px;
          height: 28px;
          background: rgba(223, 224, 230, 1);
          border-radius: 4px;
          margin: 0 !important;
          margin-bottom: 14px;
        }
        .el-tree {
          margin-top: 10px;
        }
      }
      .el-input {
        .el-input__inner {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
