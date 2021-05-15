<template>
  <!--已收清模块-->
  <div class="ClearedReceivables">
    <!-- 资源名称-   客户名称 start -->
    <section class="Resource_wrap">
      <el-form label-width="115px">
        <el-row :gutter="30">
          <el-col :span="5" style="width: auto">
            <el-form-item label="" label-width="10px;">
              <span class="current_resource"
                >资源名称：<span class="TextColor">{{
                  resourceName
                }}</span></span
              >
              <span class="current_client"
                >客户名称：<span class="TextColor">{{
                  tableParameter.KHDA_KHMC
                }}</span></span
              >
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 220px">
            <el-form-item label="开始年月:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.QSNY"
                type="month"
                placeholder="选择年月"
                format="yyyy-MM"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 200px">
            <el-form-item label="结束年月:" label-width="70px">
              <el-date-picker
                v-model="tableParameter.JZNY"
                type="month"
                placeholder="选择年月"
                format="yyyy-MM"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="width: 100px">
            <el-form-item label-width="0">
              <el-button
                type="success"
                @click="submit()"
                v-has="'ReceiClearedQuery_has'"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="3" class="custom_field">
            <el-button
              type="primary"
              @click="filedConfiClick"
              icon="el-icon-setting"
              >自定义栏位
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <!-- 资源名称- 客户名称end -->
    <!-- 表格列表start -->
    <u-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%"
      max-height="650"
      class="tableContent"
      @row-click="rowClick"
      ref="singleTable"
      use-virtual
      :row-height="30"
      :cell-class-name="cellcb"
    >
      <div v-for="(item, index) in checkData" :key="index">
        <div v-if="item.content == '资源代码'">
          <u-table-column :label="item.content" :width="item.width" fixed>
            <template slot-scope="scope">
              {{ scope.row.FKGX_FJID }}
            </template>
          </u-table-column>
        </div>
        <div v-else-if="item.content == '费用区间'">
          <u-table-column :label="item.content" :width="item.width">
            <template slot-scope="scope">
              {{ scope.row.FYSQ_ZY ? scope.row.FYSQ_ZY : scope.row.FYSQ_TZSM }}
            </template>
          </u-table-column>
        </div>
        <div v-else>
          <u-table-column
            :prop="formatMoney(item.field, item.content)"
            :label="item.content"
            :width="item.width"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ formatMoney(scope.row[item.field]) }}
            </template>
          </u-table-column>
        </div>
      </div>
    </u-table>
    <!-- 表格列表end -->
    <!-- 自定义栏位start -->
    <FieldConfig
      :showFieldConfig.sync="showFieldConfig"
      @RefreshItem="fieldRefrefsh"
      ref="fieldChildren"
    >
    </FieldConfig>
    <!-- 自定义栏位end  -->
  </div>
</template>
<script>
import {
  queryClearedCharges,
  querReceiptList,
  querWalkList,
} from "@/api/FeeManagement/ClearedReceivables"; //已收清款项Api
import { getLastYearYestdy, currDate, formatMoney } from "@/utils/global.js";
import { UTable, UTableColumn } from "umy-ui";
import fieldMinxin from "@/components/FieldConfig/field.js"; //自定义栏位 注入
export default {
  name: "ClearedReceivables",
  props: ["clickTreeObjVal", "resourceName"], //显示隐藏资源名称与禁用客户信息,父子传递信息,收费项目
  mixins: [fieldMinxin], //注入
  components: { UTable, UTableColumn, fieldMinxin },
  data() {
    return {
      tableData: [],
      tableParameter: {
        QSNY: null,
        JZNY: null,
      },
      RecetableData: [], //交款明细
      WalktableData: [], //走表读数
      FKGX_ZJ: null,
      beginendDate: null, //默认费用年月为空
      selectType: 1, //1按资源 2按客户
      code: "ClearedReceivables", //模块栏位配置编码
      showFieldConfig: false, //自定义栏位默认隐藏
      configData: [
        //默认配置栏位
        { content: "资源代码", width: 150, field: "FKGX_FJID" },
        { content: "所属年月", width: 120, field: "FYSQ_SSNY" },
        { content: "收费项目", width: 160, field: "FYSQ_SFXMMC" },
        { content: "应收金额（含税）", width: 120, field: "FYSQ_YSJE" },
        { content: "实收金额", width: 100, field: "FYSQ_SSJE" },
        { content: "税率", width: 80, field: "FYSQ_YSSL" },
        { content: "实收(不含税)", width: 120, field: "FYSQ_SSBHS" },
        { content: "计算单价", width: 100, field: "CGJS_JSDJ", isShow: false },
        { content: "计算面积", width: 100, field: "CGJS_CS", isShow: false },
        { content: "本月读数", width: 100, field: "ZBJS_BYDS", isShow: false },
        { content: "上月读数", width: 100, field: "ZBJS_SYDS", isShow: false },
        { content: "本月行度", width: 100, field: "ZBJS_BYXD", isShow: false },
        { content: "费用区间", width: 350, field: "FYSQ_ZY" },
        { content: "备注", width: "", field: "FYSQ_BZ" },
      ],
    };
  },
  methods: {
    formatMoney(data, value) {
      if (data || data == 0) {
        if (
          value == "应收金额（含税）" ||
          value == "实收金额" ||
          value == "实收(不含税)"
        ) {
          return data >= 0 && data
            ? formatMoney(data, true)
            : `-${formatMoney(0 - data, true)}`;
        } else {
          return data;
        }
      }
    },
    RecequeryByPage(obj, type) {
      //已收清款项表格列表
      this.time = [];
      this.selectType = type;
      if (this.selectType == 1) {
        this.tableParameter.nStyle = 1;
        this.tableParameter.FKGX_ZJ = obj.FKGX_ZJ;
      } else {
        this.tableParameter.nStyle = 4;
        this.tableParameter.FKGX_ZJ = obj.KHDA_ZJ;
      }
      this.tableParameter.KHDA_KHMC = obj.KHDA_KHMC;
      this.tableParameter.SFBZ = "人民币";
      /**每次切换不重置 日期 start*/
      if (
        sessionStorage.getItem("clearedReceive_QSNY") &&
        sessionStorage.getItem("clearedReceive_QSNY") != "null"
      ) {
        this.tableParameter.QSNY = sessionStorage.getItem(
          "clearedReceive_QSNY"
        );
      } else {
        this.tableParameter.QSNY = getLastYearYestdy(new Date(), false); //当前日期的前一年
      }

      if (
        sessionStorage.getItem("clearedReceive_JZNY") &&
        sessionStorage.getItem("clearedReceive_JZNY") != "null"
      ) {
        this.tableParameter.JZNY = sessionStorage.getItem(
          "clearedReceive_JZNY"
        );
      } else {
        this.tableParameter.JZNY = currDate(false); //当前日期
      }
      /**每次切换不重置 日期 end*/

      this.getDataList();
      this.getFieldConfig(this.code); //栏位配置查询
    },
    getDataList() {
      queryClearedCharges(this.tableParameter).then((response) => {
        this.tableData = response; //显示表格列表
        if (this.tableData) {
          if (this.tableData.length > 0) {
            this.$refs.singleTable.setCurrentRow(this.tableData[0]); //默认选中表格第一个
            //this.getReceiptData(this.tableData[0]); //默认查询第一条收清 交款明细
            //this.getWalkData(this.tableData[0]); //默认查询第一条收清 走表读数
          } else {
            this.RecetableData = []; //清空交款明细数据
            this.WalktableData = []; //清空走表数据
          }
        }
      });
    },
    cellcb(row) {
      //隐藏小计checkbox
      if (!row.row.FYSQ_ZJ) {
        return "minCheck";
      }
    },
    submit() {
      //保存开始/结束日期   每次切换不重置
      sessionStorage.setItem("clearedReceive_QSNY", this.tableParameter.QSNY);
      sessionStorage.setItem("clearedReceive_JZNY", this.tableParameter.JZNY);
      this.getDataList();
      //查询
    },
    rowClick(row) {
      this.getReceiptData(row); //查询收清 交款明细
      this.getWalkData(row); //查询收清 走表读数
    },
    getPermission(obj, type) {
      this.selectType = type;
      if (Object.keys(obj).length != 0) {
        if (obj.data.FCDM_LX != "房间") {
          this.tableParameter.KHDA_KHMC = "";
          this.tableData = []; //清空列表数据
        }
      }
    },
    getReceiptData(obj) {
      //交款明细
      querReceiptList(obj.FYSQ_ZJ).then((response) => {
        this.RecetableData = response;
      });
    },
    getWalkData(obj) {
      //走表读数
      querWalkList(this.tableParameter.FKGX_ZJ, obj.FYSQ_SFXMWJ).then(
        (response) => {
          this.WalktableData = response;
        }
      );
    },
    fieldRefrefsh(obj) {
      //栏位配置回调刷新
      this.checkData = [];
      this.saveConfig(obj, this.code); //保存栏位配置
    },
    filedConfiClick() {
      //自定义栏位
      this.showFieldConfig = true;
      this.$refs.fieldChildren.getReceiptData(
        this.queryData,
        this.configData,
        this.code
      );
    },
  },
};
</script>
<style lang="scss">
.ClearedReceivables {
  margin: 10px 20px 30px;
  .Resource_wrap {
    .current_resource {
      color: #666;
      font-size: 14px;
    }
    .current_client {
      margin-left: 10px;
      color: #666;
      font-size: 14px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 120px;
    }
  }
  .custom_field {
    float: right;
  }
  .content_wrap {
    text-align: center;
    .flex_wrap {
      display: flex;
      .payment_table {
        flex: 1;
        border-right: 2px solid #eee;
      }
      .walk_table {
        flex: 1;
      }
    }
  }
  .minCheck {
    background: rgba(33, 40, 48, 0.2) !important;
  }
}
</style>
