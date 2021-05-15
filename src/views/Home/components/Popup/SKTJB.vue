<template>
  <div class="SKTJB container" ref="SKTJB">
    <!-- 按钮begin -->
    <el-form label-width="105px" ref="ELForm" :rules="rules" :model="data">
      <el-row :gutter="30">
        <el-col :span="5" style="width: 400px">
          <el-form-item label="管理处：" prop="BMJG_JGMC">
            <el-input
              v-model="data.BMJG_JGMC"
              :title="data.BMJG_JGMC"
              clearable
              readonly
            >
              <el-button
                slot="append"
                icon="el-icon-edit-outline"
                @click="DivSearch()"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" style="width: 400px">
          <el-form-item label="收费项目名称：">
            <el-select
              v-model="data.SFXM_SFXMMC"
              multiple
              collapse-tags
              filterable
              clearable
              reserve-keyword
            >
              <el-option
                v-for="(item, index) in ChargeItemlist"
                :key="index"
                :label="item.SFXM_SFXMMC"
                :value="item.SFXM_SFXMMC"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="5"
          style="width: 250px; padding-right: 0; padding-top: 2px"
        >
          <el-button type="success" @click="getTableData">查询</el-button>
          <el-button
            type="success"
            @click="downloData"
            :disabled="tableData.length == 0"
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
        :data="tableData"
        border
        v-loading="loading"
        element-loading-text="数据计算量大，请耐心等待，加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(200, 200, 200, 0.5)"
        show-summary
        :summary-method="getSummaries"
        :height="height"
      >
        <el-table-column
          prop="GLCName"
          label="小区名称"
          width="100"
          v-if="plotshow"
        >
        </el-table-column>
        <el-table-column prop="FYSQ_SFXMMC" label="费用项目" width="100">
        </el-table-column>
        <el-table-column label="应收金额">
          <el-table-column prop="WN_YSJE" label="往年应收" width="90">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.WN_YSJE) }}
            </template>
          </el-table-column>
          <el-table-column prop="BN_YSJE" label="本年应收" width="110">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.BN_YSJE) }}
            </template>
          </el-table-column>
          <el-table-column prop="BN_TZJE" label="累计调整" width="90">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.BN_TZJE) }}
            </template>
          </el-table-column>
          <el-table-column prop="Z_YSJE" label="累计应收" width="90">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.Z_YSJE) }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="实收金额">
          <el-table-column prop="DR_SSJE" label="今日收入" width="90">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.DR_SSJE) }}
            </template>
          </el-table-column>
          <el-table-column label="月度累计">
            <el-table-column prop="BY_SSJE" label="本月收入" width="90">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.BY_SSJE) }}
              </template>
            </el-table-column>
            <el-table-column prop="SNTQ_MONTH_SSJE" label="上年同期" width="90">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.SNTQ_MONTH_SSJE) }}
              </template>
            </el-table-column>
            <el-table-column prop="BYYSNTQ_CE" label="差额" width="80">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.BYYSNTQ_CE) }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="年度累计">
            <el-table-column prop="BN_SSJE" label="本年收入" width="90">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.BN_SSJE) }}
              </template>
            </el-table-column>
            <el-table-column prop="SNTQ_YEAR_SSJE" label="上年同期" width="90">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.SNTQ_YEAR_SSJE) }}
              </template>
            </el-table-column>
            <el-table-column prop="BNYSNTQ_CE" label="差额" width="80">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.BNYSNTQ_CE) }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="项款归属">
            <el-table-column prop="WNQS_SSJE" label="往年欠数" width="90">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.WNQS_SSJE) }}
              </template>
            </el-table-column>
            <el-table-column prop="BNYS_SSJE" label="本年应收" width="90">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.BNYS_SSJE) }}
              </template>
            </el-table-column>
            <el-table-column prop="WLYS_SSJE" label="未来预收" width="90">
              <template slot-scope="scope">
                {{ formatMoney(scope.row.WLYS_SSJE) }}
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="WNYSJE" label="往年预收本年"> </el-table-column>
        <el-table-column prop="FYSJL" label="费用收缴率(%)"> </el-table-column>
      </el-table>
    </div>
    <!--  表 end -->

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > data.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="data.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->
    <SKTJBResource
      :show.sync="show"
      ref="SKTJBResource"
      @getResource="getResource"
    ></SKTJBResource>
  </div>
</template>

<script>
import {
  queryStatisticsOfCharges,
  isLeader,
  exportExcelOfStatisticsCharges,
  queryAllChargeItemByOrg,
  getCollectionStatisticsByChargeItem,
} from "@/api/Home/Home";
import { mapGetters } from "vuex";
import { formatMoney } from "@/utils/global.js";
import SKTJBResource from "./components/SKTJBResource";
export default {
  name: "SKTJB",
  data() {
    return {
      title: "收费统计表", //标题
      tableData: [],
      data: {
        pageIndex: 0,
        pageSize: 11,
        BMJG_JGMC: "",
        BMJG_ZJ: "",
        SFXM_SFXMMC: [],
      },
      index: 0,
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      ChargeItemlist: [],
      loading: false,
      sums: {},
      height: 0,
      show: false,
      rules: {
        BMJG_JGMC: [{ required: true, trigger: "blur" }],
      },
      plotshow: false,
    };
  },
  components: {
    SKTJBResource,
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getPartitionData();
      }, 1000);
    });
  },
  methods: {
    DivSearch() {
      //弹窗打开
      this.show = true;
      this.$refs.SKTJBResource.setData();
    },
    getResource(data) {
      //弹窗确认后赋值
      this.data.BMJG_ZJ = data.BMJG_ZJ;
      this.data.BMJG_JGMC = data.BMJG_JGMC;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 16 && this.data.SFXM_SFXMMC.length == 0) {
          sums[index] =
            (parseFloat(sums[15].replace(/,/g, "")) +
              parseFloat(sums[9].replace(/,/g, ""))) /
            parseFloat(sums[2].replace(/,/g, ""));
          sums[index] = (sums[index] * 100.0).toFixed(2);
          return;
        }
        if (index === 17 && this.data.SFXM_SFXMMC.length > 0) {
          sums[index] =
            (parseFloat(
              sums[16].replace(/,/g, "") ? sums[16].replace(/,/g, "") : 0
            ) +
              parseFloat(
                sums[10].replace(/,/g, "") ? sums[10].replace(/,/g, "") : 0
              )) /
            parseFloat(
              sums[3].replace(/,/g, "") ? sums[3].replace(/,/g, "") : 0
            );
          sums[index] = (sums[index] * 100.0).toFixed(2);
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = this.formatMoney(sums[index].toFixed(2));
        } else {
          sums[index] = "";
        }
      });
      this.sums = sums;
      return sums;
    },
    formatMoney(data) {
      if (data) {
        return data >= 0
          ? formatMoney(data, true)
          : `-${formatMoney(0 - data, true)}`;
      } else {
        return 0;
      }
    },
    getPartitionData(data) {
      this.height =
        this.$refs.SKTJB.offsetHeight - this.$refs.ELForm.$el.offsetHeight - 60;
      this.tableData = [];
      this.loading = false;
      queryAllChargeItemByOrg().then((response) => {
        this.ChargeItemlist = response;
      });
    },
    handleCurrentChange(currentPage) {
      this.Data.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.tableRow = {}; //选择后清空选中表格数据
    },
    getTableData() {
      this.$refs["ELForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.plotshow = this.data.SFXM_SFXMMC.length > 0;
          var data = JSON.parse(JSON.stringify(this.data));
          data.SFXM_SFXMMC = data.SFXM_SFXMMC.join(",");
          queryStatisticsOfCharges(
            data,
            this.data.SFXM_SFXMMC.length == 0
          ).then((response) => {
            // response = { "returnStatus": "SUCCESS", "data": [{ "BYYSNTQ_CE": 82404.20, "WN_YSJE": 134177.20, "Z_YSJE": 1938809.20, "SNTQ_MONTH_SSJE": 67250.60, "WLYS_SSJE": 0.00, "WNYSJE": 30018.80, "FYSJL": 19.8100, "BNYSNTQ_CE": -3796.60, "SNTQ_YEAR_SSJE": 331221.60, "BN_YSJE": 1804632.00, "BN_SSJE": 327425.00, "FYSQ_SFXMMC": "物业管理费", "DR_SSJE": 1732.80, "BNYS_SSJE": 307394.40, "WNQS_SSJE": 20030.60, "BY_SSJE": 149654.80 }, { "BYYSNTQ_CE": 13508.20, "WN_YSJE": 15999.00, "Z_YSJE": 269966.60, "SNTQ_MONTH_SSJE": 10121.10, "WLYS_SSJE": 0.00, "WNYSJE": 4706.30, "FYSJL": 22.1600, "BNYSNTQ_CE": 1130.70, "SNTQ_YEAR_SSJE": 50437.50, "BN_YSJE": 253967.60, "BN_SSJE": 51568.20, "FYSQ_SFXMMC": "公共维修金", "DR_SSJE": 273.60, "BNYS_SSJE": 48534.00, "WNQS_SSJE": 3034.20, "BY_SSJE": 23629.30 }, { "BYYSNTQ_CE": 67955.00, "WN_YSJE": 41377.00, "Z_YSJE": 564697.00, "SNTQ_MONTH_SSJE": 24685.00, "WLYS_SSJE": 0.00, "WNYSJE": 79920.00, "FYSJL": 50.8800, "BNYSNTQ_CE": -27725.00, "SNTQ_YEAR_SSJE": 214045.00, "BN_YSJE": 523320.00, "BN_SSJE": 186320.00, "FYSQ_SFXMMC": "车位管理费", "DR_SSJE": 2400.00, "BNYS_SSJE": 182480.00, "WNQS_SSJE": 3840.00, "BY_SSJE": 92640.00 }, { "BYYSNTQ_CE": 0.00, "WN_YSJE": 0.00, "Z_YSJE": 0.00, "SNTQ_MONTH_SSJE": 0.00, "WLYS_SSJE": 0.00, "WNYSJE": 0.00, "FYSJL": 0, "BNYSNTQ_CE": 0.00, "SNTQ_YEAR_SSJE": 0.00, "BN_YSJE": 0.00, "BN_SSJE": 0.00, "FYSQ_SFXMMC": "POS机手续费", "DR_SSJE": 0.00, "BNYS_SSJE": 0.00, "WNQS_SSJE": 0.00, "BY_SSJE": 0.00 }, { "BYYSNTQ_CE": 0.00, "WN_YSJE": 0.00, "Z_YSJE": 0.00, "SNTQ_MONTH_SSJE": 0.00, "WLYS_SSJE": 0.00, "WNYSJE": 0.00, "FYSJL": 0, "BNYSNTQ_CE": 0.00, "SNTQ_YEAR_SSJE": 0.00, "BN_YSJE": 0.00, "BN_SSJE": 0.00, "FYSQ_SFXMMC": "临时停车费", "DR_SSJE": 0.00, "BNYS_SSJE": 0.00, "WNQS_SSJE": 0.00, "BY_SSJE": 0.00 }, { "BYYSNTQ_CE": 1235.90, "WN_YSJE": 29777.80, "Z_YSJE": 29777.80, "SNTQ_MONTH_SSJE": 906.60, "WLYS_SSJE": 0.00, "WNYSJE": 0.00, "FYSJL": 0, "BNYSNTQ_CE": -155.70, "SNTQ_YEAR_SSJE": 3260.70, "BN_YSJE": 0.00, "BN_SSJE": 3105.00, "FYSQ_SFXMMC": "代收公摊水费", "DR_SSJE": 13.00, "BNYS_SSJE": 0.00, "WNQS_SSJE": 3105.00, "BY_SSJE": 2142.50 }, { "BYYSNTQ_CE": 25654.40, "WN_YSJE": 188427.20, "Z_YSJE": 188427.20, "SNTQ_MONTH_SSJE": 12776.50, "WLYS_SSJE": 0.00, "WNYSJE": 0.00, "FYSJL": 0, "BNYSNTQ_CE": 1341.00, "SNTQ_YEAR_SSJE": 60141.90, "BN_YSJE": 0.00, "BN_SSJE": 61482.90, "FYSQ_SFXMMC": "公摊电费", "DR_SSJE": 191.60, "BNYS_SSJE": 0.00, "WNQS_SSJE": 61482.90, "BY_SSJE": 38430.90 }, { "BYYSNTQ_CE": 21171.20, "WN_YSJE": 119322.00, "Z_YSJE": 119322.00, "SNTQ_MONTH_SSJE": 10649.60, "WLYS_SSJE": 0.00, "WNYSJE": 0.00, "FYSJL": 0, "BNYSNTQ_CE": 867.20, "SNTQ_YEAR_SSJE": 46252.80, "BN_YSJE": 0.00, "BN_SSJE": 47120.00, "FYSQ_SFXMMC": "代收自来水水费及污水处理费", "DR_SSJE": 89.60, "BNYS_SSJE": 0.00, "WNQS_SSJE": 47120.00, "BY_SSJE": 31820.80 }, { "BYYSNTQ_CE": 0.00, "WN_YSJE": 365245.40, "Z_YSJE": 365245.40, "SNTQ_MONTH_SSJE": 0.00, "WLYS_SSJE": 0.00, "WNYSJE": 0.00, "FYSJL": 0, "BNYSNTQ_CE": -36152.00, "SNTQ_YEAR_SSJE": 36152.00, "BN_YSJE": 0.00, "BN_SSJE": 0.00, "FYSQ_SFXMMC": "装修押金", "DR_SSJE": 0.00, "BNYS_SSJE": 0.00, "WNQS_SSJE": 0.00, "BY_SSJE": 0.00 }, { "BYYSNTQ_CE": 0.00, "WN_YSJE": 186619.00, "Z_YSJE": 186619.00, "SNTQ_MONTH_SSJE": 0.00, "WLYS_SSJE": 0.00, "WNYSJE": 0.00, "FYSJL": 0, "BNYSNTQ_CE": -45179.00, "SNTQ_YEAR_SSJE": 45179.00, "BN_YSJE": 0.00, "BN_SSJE": 0.00, "FYSQ_SFXMMC": "土头清运费", "DR_SSJE": 0.00, "BNYS_SSJE": 0.00, "WNQS_SSJE": 0.00, "BY_SSJE": 0.00 }, { "BYYSNTQ_CE": 0.00, "WN_YSJE": 8100.00, "Z_YSJE": 8100.00, "SNTQ_MONTH_SSJE": 0.00, "WLYS_SSJE": 0.00, "WNYSJE": 0.00, "FYSJL": 0, "BNYSNTQ_CE": 0.00, "SNTQ_YEAR_SSJE": 0.00, "BN_YSJE": 0.00, "BN_SSJE": 0.00, "FYSQ_SFXMMC": "出入证", "DR_SSJE": 0.00, "BNYS_SSJE": 0.00, "WNQS_SSJE": 0.00, "BY_SSJE": 0.00 }, { "BYYSNTQ_CE": 0.00, "WN_YSJE": 5980.00, "Z_YSJE": 5980.00, "SNTQ_MONTH_SSJE": 0.00, "WLYS_SSJE": 0.00, "WNYSJE": 0.00, "FYSJL": 0, "BNYSNTQ_CE": 0.00, "SNTQ_YEAR_SSJE": 0.00, "BN_YSJE": 0.00, "BN_SSJE": 0.00, "FYSQ_SFXMMC": "门禁扣", "DR_SSJE": 0.00, "BNYS_SSJE": 0.00, "WNQS_SSJE": 0.00, "BY_SSJE": 0.00 }, { "BYYSNTQ_CE": -23195.00, "WN_YSJE": 1244479.00, "Z_YSJE": 1288019.00, "SNTQ_MONTH_SSJE": 23195.00, "WLYS_SSJE": 0.00, "WNYSJE": 0.00, "FYSJL": 100.0000, "BNYSNTQ_CE": -285479.00, "SNTQ_YEAR_SSJE": 329019.00, "BN_YSJE": 43540.00, "BN_SSJE": 43540.00, "FYSQ_SFXMMC": "定额临时停车费", "DR_SSJE": 0.00, "BNYS_SSJE": 0.00, "WNQS_SSJE": 0.00, "BY_SSJE": 0.00 }, { "BYYSNTQ_CE": 0.00, "WN_YSJE": 5000.00, "Z_YSJE": 5000.00, "SNTQ_MONTH_SSJE": 0.00, "WLYS_SSJE": 0.00, "WNYSJE": 0.00, "FYSJL": 0, "BNYSNTQ_CE": 0.00, "SNTQ_YEAR_SSJE": 0.00, "BN_YSJE": 0.00, "BN_SSJE": 0.00, "FYSQ_SFXMMC": "电梯使用押金", "DR_SSJE": 0.00, "BNYS_SSJE": 0.00, "WNQS_SSJE": 0.00, "BY_SSJE": 0.00 }], "x_token": "BFA029C0353D3FF23917CB246C438B11149556DA1DA7ADDAE955AAEE0A2A8CE4E12F30781F31D10BE696914A16A91CDACE3A58B41BC072416A21299A0D450650D73A50DB25F4A02DEA56D1F4280EB3923F14CB9B4D62A6283F77523C21730E50202D087737FB855AAD1EEFF3BAE19C4A8912A070ED70831120067709A26A6518F992A9BBEEB8924EA23D68E01F50C4185ACBFD863FF45D0CE83D4F821BF73705565140E463900DA1B7A9F0D41508D0F37DD4AC65DA3AB79A8EAFA81FF87971B826BA635F97B42D26F6A53CA158D45B08919B3D9A3BB2331543D4FBEB8FD2E89E" }
            var data = response.data;
            this.tableData = data;
            this.loading = false;
            this.returnTotal = response.total;
            //表单总高度
            let tableHeight = document.getElementsByClassName("el-table")[0]
              .offsetHeight;
            //表头高度
            let headerHeight = document.getElementsByClassName(
              "el-table__header-wrapper"
            )[0].offsetHeight;
            //要等表单渲染完成后才能拿到合计行的高度
            this.$nextTick(() => {
              //合计行高度
              let footerHeight = document.getElementsByClassName(
                "el-table__footer-wrapper"
              )[0].offsetHeight;
              //设置表单正文高度
              document.getElementsByClassName(
                "el-table__body-wrapper"
              )[0].style.height =
                tableHeight - headerHeight - footerHeight + "px";

              var oDiv = document.getElementsByClassName(
                "el-table__body-wrapper"
              )[0];

              oDiv.style.overflow = "auto";
            });
          });
        } else {
          return false;
        }
      });
    },
    downloData() {
      var data = JSON.parse(JSON.stringify(this.data));
      data.SFXM_SFXMMC = data.SFXM_SFXMMC.join(",");
      var list = JSON.parse(JSON.stringify(this.tableData));
      var total = {};
      for (var i in this.sums) {
        total[i] = this.sums[i];
      }
      list.push(total);
      data.data = JSON.stringify(list);
      exportExcelOfStatisticsCharges(data).then((response) => {
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
    },
  },
};
</script>
<style>
.SKTJB .el-dialog__body {
  padding: 20px;
  overflow: auto;
  height: 700px;
}
.SKTJB .el-loading-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.SKTJB .el-loading-spinner {
  top: 50% !important;
  position: absolute;
}
.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>

<style lang="scss">
.SKTJB {
  .el-table--border:after,
  .el-table--group:after,
  .el-table:before {
    background-color: RGB(124, 124, 124);
  }

  .el-table--border,
  .el-table--group {
    border-color: rgb(124, 124, 124);
  }

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid RGB(124, 124, 124);
  }

  .el-table--border th,
  .el-table--border th.gutter:last-of-type {
    border-bottom: 1px solid RGB(124, 124, 124);
  }

  .el-table--border td,
  .el-table--border th {
    border-right: 1px solid RGB(124, 124, 124);
  }
  .el-table__body tr > td,
  .el-table--enable-row-hover .el-table__body tr > td {
    border-bottom: 1px solid RGB(124, 124, 124);
  }
  .el-table__footer-wrapper {
    border-top: 1px solid RGB(124, 124, 124);
    overflow: auto !important;
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow: auto !important;
  }

  .el-input-group__append {
    padding: 0;
  }

  .el-button--default {
    min-width: 0;
    margin-right: 0 !important;
  }

  .el-select {
    width: 100%;
  }

  .el-table__footer-wrapper tbody td,
  .el-table__header-wrapper tbody td {
    background-color: #b5b5b5;
    color: #262626;
  }
}
</style>
