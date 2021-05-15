<template>
  <div class="LeaseDialog">
    <el-dialog v-dialogDrag :title="title" class="el-dialog-treble" :visible.sync="visible" @close="cancle"
      :close-on-click-modal="false">

      <div class="chooseroom" v-if="title=='提前退租'">
        <div class="room">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
          </el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedLease" @change="handleCheckedLeaseChange">
            <el-checkbox v-for="item in lease" :label="item.FJDA_ZJ" :key="item.FJDA_ZJ">{{item.FJDA_FJMC}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

      <div class="buttonBox" v-if="title=='提前退租'">
        <el-button type="primary" @click="dofeeWithdrawal" :disabled="checkedLease.length===0"
          v-has="'ContractApplyLease_has'">费用撤回</el-button>
        </el-button>
      </div>

      <el-tabs v-model="activeName" type="card" @tab-click='tabclick'>
        <el-tab-pane label="未收清费用" name="1">
          <div class="resoureTable">
            <el-table ref="multipleTable1" :data="tableData1" border @selection-change="handleSelectionChange"
              @row-click="rowClick">
              <el-table-column fixed label="选择" type="selection" width="50" v-if="title=='提前退租'"></el-table-column>
              <el-table-column prop="FYSQ_SSNY" label="所属年月" width="120"></el-table-column>
              <el-table-column prop="FJDA_FJID" label="房间代码" width="120"></el-table-column>
              <el-table-column prop="FYSQ_SFXMMC" label="收费项目名称" width="150"></el-table-column>
              <el-table-column prop="FYSQ_ZY" label="摘要" width="180"></el-table-column>
              <el-table-column prop="FYSQ_QSJE" label="欠收金额" width="80"></el-table-column>
              <el-table-column prop="FYSQ_YSJE" label="应收金额" width="80"></el-table-column>
              <el-table-column prop="FYSQ_SSJE" label="实收金额" width="80"></el-table-column>
              <el-table-column prop="FYSQ_YSRQ" label="应收日期" width="120"></el-table-column>
              <el-table-column prop="FYSQ_TZNY" label="调整年月" width="120"></el-table-column>
              <el-table-column prop="FYSQ_TZR" label="调整人" width="120"></el-table-column>
              <el-table-column prop="FYSQ_TZSM" label="调整说明" width="120"></el-table-column>
              <el-table-column prop="FYSQ_FYJE" label="费用金额" width="80"></el-table-column>
              <el-table-column prop="FYSQ_JMJE" label="减免金额" width="80"></el-table-column>
            </el-table>
          </div>
          <div class="totalamount">未收清费用合计：¥{{totalamount}}</div>
        </el-tab-pane>
        <el-tab-pane label="已收清费用" name="2">
          <div class="resoureTable">
            <div class="resoureTable">
              <el-table ref="multipleTable2" :data="tableData2" border>
                <el-table-column prop="FYSQ_SSNY" label="所属年月" width="120"></el-table-column>
                <el-table-column prop="FJDA_FJID" label="房间代码" width="120"></el-table-column>
                <el-table-column prop="FYSQ_SFXMMC" label="收费项目名称" width="150"></el-table-column>
                <el-table-column prop="FYSQ_ZY" label="摘要" width="180"></el-table-column>
                <el-table-column prop="FYSQ_QSJE" label="欠收金额" width="80"></el-table-column>
                <el-table-column prop="FYSQ_YSJE" label="应收金额" width="80"></el-table-column>
                <el-table-column prop="FYSQ_SSJE" label="实收金额" width="80"></el-table-column>
                <el-table-column prop="FYSQ_YSRQ" label="应收日期" width="120"></el-table-column>
                <el-table-column prop="FYSQ_TZNY" label="调整年月" width="120"></el-table-column>
                <el-table-column prop="FYSQ_TZR" label="调整人" width="120"></el-table-column>
                <el-table-column prop="FYSQ_TZSM" label="调整说明" width="120"></el-table-column>
                <el-table-column prop="FYSQ_FYJE" label="费用金额" width="80"></el-table-column>
                <el-table-column prop="FYSQ_JMJE" label="减免金额" width="80"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="押金/保证金" name="3">
          <div class="resoureTable">
            <el-table ref="multipleTable3" :data="tableData3" border>
              <el-table-column prop="FJDA_FJID" label="房间代码" width="150"></el-table-column>
              <el-table-column prop="YCXSF_SFXMMC" label="收费项目" width="150"></el-table-column>
              <el-table-column prop="YCXSF_SFJE" label="缴费金额" width="120"></el-table-column>
              <el-table-column prop="YCXSF_SFRQ" label="缴费日期" width="180"></el-table-column>
              <el-table-column prop="YCXSF_BZ" label="备注"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="入住移交" name="4">
          <div class="resoureTable">
            <el-table ref="multipleTable4" :data="tableData4" border>
              <el-table-column prop="title" label="标题" width="150"></el-table-column>
              <el-table-column prop="photo" label="照片" width="150">
                <template slot-scope="scope">
                  <a @click="imgshow(scope.row.photo)">查看</a>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="描述"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="违约条款" name="5">
          <div class="resoureTable">
            <el-table ref="multipleTable5" :data="tableData5" border>
              <el-table-column prop="clause_name" label="条款名称" width="150"></el-table-column>
              <el-table-column prop="clause_content" label="条款内容"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog v-dialogDrag title="图片" :visible.sync="imgVisible">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in imglist" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
import { queryUncollectedFeeByRoom, queryClearedFeeByRoom, queryDepositPayment, queryHouseMessage, queryContractClause, queryRoomByContract, feeWithdrawal, earlyLease, updateContractState, getUncollectedFeeTotalMoney } from "@/api/Realtor/Contract";
export default {
  data() {
    return {
      visible: this.Leaseshow,
      title: "退租", //标题
      categoryList: "",
      rules: {},
      LeaseForm: {},
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      totalamount: 0,
      activeName: '1',
      checkAll: false,
      checkedLease: [],
      lease: [],
      isIndeterminate: false,
      ContractList: [],
      imgVisible: false,
      imglist: '',
      multipleSelection: []
    };
  },
  props: {
    Leaseshow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    Leaseshow() {
      this.visible = this.Leaseshow;
    }
  },
  mounted() { },
  methods: {
    dofeeWithdrawal() {
      this.$confirm("即将对选中数据进行费用撤回, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = this.multipleSelection
          var list = []
          for (var i in data) {
            list.push(data[i].FYSQ_ZJ)
          }
          feeWithdrawal({
            dbName: this.LeaseForm.dbName,
            GLCID: this.LeaseForm.GLCID,
            YXDID: this.LeaseForm.YXDID,
            FYSQ_ZJ: list.join(',')
          }).then(response => {
            queryUncollectedFeeByRoom(this.LeaseForm).then(response => {
              this.tableData1 = response.data;
            });
            getUncollectedFeeTotalMoney(this.LeaseForm).then(response => {
              this.totalamount = response.data.totalMoney;
            });
          });
        })
        .catch(() => {
        });

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    rowClick(row) {
      this.$refs.multipleTable1.toggleRowSelection(row); //单击表格复选框选中
    },
    imgshow(val) {
      if (val) {
        this.imglist = val.split(';')
        this.imgVisible = true
      } else {
        this.$message({
          message: '暂无图片'
        });
      }
    },
    getlist() {
      queryUncollectedFeeByRoom(this.LeaseForm).then(response => {
        this.tableData1 = response.data;
      });
      queryClearedFeeByRoom(this.LeaseForm).then(response => {
        this.tableData2 = response.data;
      });
      queryDepositPayment(this.LeaseForm).then(response => {
        this.tableData3 = response.data;
      });
      queryHouseMessage(this.LeaseForm).then(response => {
        this.tableData4 = response.data;
      });
      queryContractClause(this.LeaseForm).then(response => {
        this.tableData5 = response.data;
      });
      getUncollectedFeeTotalMoney(this.LeaseForm).then(response => {
        this.totalamount = response.data.totalMoney;
      });
    },
    handleCheckAllChange(val) {
      if (val) {
        var data = this.lease
        this.checkedLease = []
        for (var i in data) {
          this.checkedLease.push(data[i].FJDA_ZJ)
        }
        this.getlist()
      } else {
        this.checkedLease = []
      }
      this.isIndeterminate = false;
    },
    handleCheckedLeaseChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.lease.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.lease.length;

      if (this.checkedLease.length != 0) {
        this.LeaseForm.FJDA_ZJ = this.checkedLease.join(',')
        this.getlist()
      } else {
        this.tableData1 = []
        this.tableData2 = []
        this.tableData3 = []
        this.tableData4 = []
        this.tableData5 = []
      }

    },
    tabclick() {

    },
    getReportData(data, type) {
      this.LeaseForm = {
        dbName: data.db_name,
        GLCID: data.GLCID,
        YXDID: data.YXDID,
        contractId: data.contract_id,
        FJDA_ZJ: ''
      };

      this.tableData1 = []
      this.tableData2 = []
      this.tableData3 = []
      this.tableData4 = []
      this.tableData5 = []

      this.isIndeterminate = false;
      this.checkAll = false
      this.activeName = '1'


      if (type == 0) {
        this.title = "退租";
        this.getlist()
      } else {
        this.title = "提前退租";
        this.checkedLease = []
        queryRoomByContract(this.LeaseForm).then(response => {
          this.lease = response.data;
        });
        // this.getlist()
      }
    },
    //   新增/修改分区
    sure() {
      if (this.title == "退租") {
        updateContractState(this.LeaseForm).then(response => {
          if (response.returnStatus == 'SUCCESS') {
            this.$emit("RefreshItem");
            this.cancle()
          }
        })
      } else {
        if (this.checkedLease.length == 0) {
          this.$message({
            message: '房间未选择！',
            type: 'warning'
          });
          return
        }
        var data = this.lease
        var list = []
        var name = []
        var FJDA_ZJ = []
        for (var i in data) {
          if (this.checkedLease.indexOf(data[i].FJDA_ZJ) > -1) {
            list.push(data[i].resources_id)
            name.push(data[i].FJDA_FJMC)
            FJDA_ZJ.push(data[i].FJDA_ZJ)
          }
        }
        this.LeaseForm.resourcesId = list.join(',')
        this.LeaseForm.FJDA_FJMC = name.join(',')
        this.LeaseForm.FJDA_ZJ = FJDA_ZJ.join(',')
        earlyLease(this.LeaseForm).then(response => {
          if (response.returnStatus == 'SUCCESS') {
            this.$emit("RefreshItem");
            this.cancle()
          }
        })
      }
    },
    cancle() {
      this.$emit("update:Leaseshow", false);
    }
  }
};
</script>

<style lang='scss'>
.LeaseDialog .el-tabs {
  padding: 0 33px;
}

.LeaseDialog .el-tabs__nav {
  background: #ffffff;
  border-top-right-radius: 10px !important;
}

.LeaseDialog .el-tabs--card > .el-tabs__header .el-tabs__item {
  border-left: none;
  border-bottom: none;
  color: #4d4d4d;
  background: #ffffff;
  font-weight: bold;
  border-top-right-radius: 10px !important;
  border-right: 1px solid #e4e7ed;
  width: 100px;
}

.LeaseDialog .el-tabs__item.is-active {
  background: #2e8ad7 !important;
  color: #ffffff !important;
  border-top-right-radius: 10px;
}

.LeaseDialog .el-tabs__header {
  margin-bottom: 0;
}

.LeaseDialog .chooseroom {
  width: 100%;
  height: 80px;
  padding: 0 33px;
  .room {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(217, 217, 215, 1);
    border-radius: 8px;
    text-align: left;
    padding: 10px 20px 0 20px;
  }
}
.LeaseDialog .totalamount {
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding: 0 20px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(44, 138, 216, 1);
}

.LeaseDialog .buttonBox {
  padding-left: 33px;
  text-align: left;
  padding-bottom: 7px;
}

.LeaseDialog .el-carousel img {
  height: 100%;
}
</style>