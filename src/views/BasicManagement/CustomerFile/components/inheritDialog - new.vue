<template>
  <div class="inheritDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="tabsindex" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="收费项目" name="0">
          <div class="content">
            <el-checkbox-group v-model="CostProject">
              <el-checkbox
                :label="item.SFXMWJ"
                v-for="(item, index) in CostProjecttable"
                :key="index"
                :disabled="true"
              >
                {{ item.SFXMMC }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史费用" name="1">
          <div class="content second">
            <el-tabs
              tab-position="left"
              v-model="hisindex"
              @tab-click="hishandleClick"
              style="height: 450px"
            >
              <el-tab-pane label="完全继承" name="0">
                <el-table
                  ref="HisCosttable"
                  :data="HisCosttable"
                  height="450"
                  border
                  @row-click="HisCosttableclick"
                  @selection-change="selectionHisCost"
                  style="width: 100%"
                >
                  <el-table-column
                    type="selection"
                    width="50"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_SFXMMC"
                    label="收费项目"
                  ></el-table-column>
                  <el-table-column
                    width="250"
                    property="FYSQ_SSNY"
                    label="所属年月"
                  ></el-table-column>
                  <el-table-column
                    width="250"
                    property="FYSQ_ZY"
                    label="费用期间"
                  ></el-table-column>
                  <el-table-column
                    width="200"
                    property="FYSQ_YSJE"
                    label="应收金额"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_YSBHS"
                    label="应收不含税"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_SSJE"
                    label="实收金额"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_QSJE"
                    label="欠收金额"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_YSSL"
                    label="税率"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_TZSM"
                    label="调整说明"
                  ></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="拆分继承" name="1">
                <div class="title">旧对象欠费对象</div>
                <el-table
                  ref="HisCosttable"
                  :data="oldObject"
                  height="200"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    width="150"
                    property="FYSQ_SFXMMC"
                    label="收费项目"
                  ></el-table-column>
                  <el-table-column
                    width="250"
                    property="FYSQ_SSNY"
                    label="所属年月"
                  ></el-table-column>
                  <el-table-column
                    width="250"
                    property="FYSQ_ZY"
                    label="费用期间"
                  ></el-table-column>
                  <el-table-column
                    width="200"
                    property="FYSQ_YSJE"
                    label="应收金额"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_YSBHS"
                    label="应收不含税"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_SSJE"
                    label="实收金额"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_QSJE"
                    label="欠收金额"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_YSSL"
                    label="税率"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_TZSM"
                    label="调整说明"
                  ></el-table-column>
                </el-table>
                <div class="title">新对象欠费对象</div>
                <el-table
                  ref="HisCosttable"
                  :data="newObject"
                  height="200"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    width="150"
                    property="FYSQ_SFXMMC"
                    label="收费项目"
                  ></el-table-column>
                  <el-table-column
                    width="250"
                    property="FYSQ_SSNY"
                    label="所属年月"
                  ></el-table-column>
                  <el-table-column
                    width="250"
                    property="FYSQ_ZY"
                    label="费用期间"
                  ></el-table-column>
                  <el-table-column
                    width="200"
                    property="FYSQ_YSJE"
                    label="应收金额"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_YSBHS"
                    label="应收不含税"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_SSJE"
                    label="实收金额"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_QSJE"
                    label="欠收金额"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_YSSL"
                    label="税率"
                  ></el-table-column>
                  <el-table-column
                    width="150"
                    property="FYSQ_TZSM"
                    label="调整说明"
                  ></el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
        <el-tab-pane label="一次性费用" name="2">
          <div class="content">
            <div class="content">
              <el-table
                ref="OnceCosttable"
                :data="OnceCosttable"
                height="450"
                border
                @row-click="OnceCostclick"
                style="width: 100%"
                @selection-change="selectionOnceCost"
              >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_SFXMMC"
                  label="收费项目"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_PZH"
                  label="凭证号"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_SKFS"
                  label="收款方式"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_JKR"
                  label="交款人"
                ></el-table-column>
                <el-table-column
                  width="200"
                  property="YCXSF_JFJSR"
                  label="交款经办人"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_SFBZ"
                  label="币种"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_SFJE"
                  label="收费金额"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_SFRQ"
                  label="收费日期"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_TKJE"
                  label="退款金额"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_TKYE"
                  label="余额"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_BZ"
                  label="备注"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_ZFSJ"
                  label="作废日期"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_ZFR"
                  label="作废人"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_ZFYY"
                  label="作废原因"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_PJLX"
                  label="票据类型"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_TKFS"
                  label="退款方式"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_TKRQ"
                  label="退款日期"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="YCXSF_TFJSR"
                  label="退款经办人"
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="预交费用" name="3" disabled>
          <div class="content">
            <div class="content"></div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure" v-preventReClick
          >确 定</el-button
        >
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryChargeAndSharing,
  inheritChargeItem,
  queryUncollectedChargesNoSplit,
  queryUncollectedChargesSplit,
  inheritAllOwe,
  queryOneTimeCost,
  inheritOneTimeCost,
  inherit,
} from "@/api/BasicManagement/CustomerFile";
export default {
  data() {
    return {
      labelPosition: "left",
      visible: this.show,
      title: "参数继承", //标题
      CostProject: [], //收费项目
      CostProjecttable: [],
      HisCosttable: [],
      OnceCosttable: [],
      searchFile: {},
      radio: null,
      tabindex: "0",
      hisindex: "0",
      HisCosttablecList: [],
      selectionOnceCostList: [],
      tabsindex: "0",
      newkey: "",
      newObject: [],
      oldObject: [],
      OldTable: [],
    };
  },
  props: {
    inheritshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    inheritshow() {
      this.visible = this.inheritshow;
    },
    radio() {
      if (this.radio !== "") {
        this.disabledo = false;
      } else {
        this.disabledo = true;
      }
    },
  },
  methods: {
    getPartitionData(data, type) {
      this.tabsindex = "0";
      this.hisindex = "0";
      this.CostProject = [];
      this.HisCosttablecList = [];
      this.selectionOnceCostList = [];

      this.searchFile = data;
      this.getCostProject();
      this.getOnceCost();
      this.getCharges();
    },
    selectionHisCost(val) {
      //待选记录选中列表
      this.HisCosttablecList = val;
    },
    HisCosttableclick(row) {
      //历史费用选中列表
      this.$refs.HisCosttable.toggleRowSelection(row);
    },
    selectionOnceCost(val) {
      //待选记录选中列表
      this.selectionOnceCostList = val;
    },
    OnceCostclick(row) {
      this.$refs.OnceCosttable.toggleRowSelection(row);
    },
    handleClick(tab, event) {
      this.tabindex = tab.index;
    },
    hishandleClick(tab, event) {
      this.hisindex = tab.index;
    },
    //获得收费项目和分摊关系
    getCostProject() {
      var _this = this;
      queryChargeAndSharing(this.searchFile).then((response) => {
        _this.CostProjecttable = response.data;
        _this.CostProject = [];
        _this.CostProjecttable.forEach((item) => {
          this.CostProject.push(item.SFXMWJ);
        });
      });
    },
    //查询历史欠费
    getCharges() {
      var _this = this;
      queryUncollectedChargesNoSplit(this.searchFile).then((response) => {
        _this.HisCosttable = response.data;
      });
      queryUncollectedChargesSplit(this.searchFile).then((response) => {
        _this.newObject = response.data.newObject;
        _this.oldObject = response.data.oldObject;
        var data = response.data.oldObject;
        var list = [];
        for (var i in data) {
          if (data[i].handle == 1) {
            list.push(data[i]);
          }
        }
        this.OldTable = {
          newObject: response.data.newObject,
          oldObject: list,
        };
      });
    },
    //获得一次性费用
    getOnceCost() {
      var _this = this;
      queryOneTimeCost(this.searchFile).then((response) => {
        _this.OnceCosttable = response.data;
      });
    },
    // 确认
    sure() {
      var data = this.selectionOnceCostList;
      var YCXSF_YCXSFWJ = [];
      var YCXSF_TKJE = [];
      for (var i in data) {
        YCXSF_YCXSFWJ.push(data[i].YCXSF_ZJ);
        YCXSF_TKJE.push(
          data[i].YCXSF_TKJE == undefined ? 0 : data[i].YCXSF_TKJE
        );
      }

      inherit(
        this.hisindex == "0"
          ? {
              OLD_FKGX_ZJ: this.searchFile.OLD_FKGX_ZJ,
              NEW_FKGX_ZJ: this.searchFile.NEW_FKGX_ZJ,
              SFXM_ZJ: this.CostProject.join(","),
              NEW_KHMC: this.searchFile.NEW_KHMC,
              OLD_KHMC: this.searchFile.OLD_KHMC,
              YCXSF_YCXSFWJ: YCXSF_YCXSFWJ.join(","),
              YCXSF_TKJE: YCXSF_TKJE.join(","),
              data: JSON.stringify(this.HisCosttablecList),
              split: 0,
            }
          : {
              OLD_FKGX_ZJ: this.searchFile.OLD_FKGX_ZJ,
              NEW_FKGX_ZJ: this.searchFile.NEW_FKGX_ZJ,
              SFXM_ZJ: this.CostProject.join(","),
              NEW_KHMC: this.searchFile.NEW_KHMC,
              OLD_KHMC: this.searchFile.OLD_KHMC,
              YCXSF_YCXSFWJ: YCXSF_YCXSFWJ.join(","),
              YCXSF_TKJE: YCXSF_TKJE.join(","),
              newObject: JSON.stringify(this.OldTable.newObject),
              oldObject: JSON.stringify(this.OldTable.oldObject),
              split: 1,
            }
      ).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.$emit("RefreshItem");
          this.cancle();
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:inheritshow", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  height: 20px;
  line-height: 20px;
  float: left;
  width: 33%;
  text-align: left;
  margin-bottom: 15px;
  padding-left: 15px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>

<style lang="scss">
.inheritDialog .content {
  height: 450px;
  width: 100%;
}

.inheritDialog .title {
  padding: 5px 10px;
  text-align: left;
  color: rgb(48, 48, 48);
  font-weight: bold;
}

.inheritDialog .select {
  margin-bottom: 30px;
}

.inheritDialog .el-dialog__body {
  padding: 0 !important;
}

.inheritDialog .el-card__header {
  padding: 8px 20px !important;
}

.inheritDialog .el-card__body {
  overflow: auto;
  padding: 15px 15px 0 15px !important;
}
.inheritDialog .el-checkbox-group {
  text-align: left !important;
}

.inheritDialog
  .second
  .el-tabs--bottom
  .el-tabs--left
  > .el-tabs__header
  .el-tabs__item:last-child,
.el-tabs--bottom .el-tabs--right > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--bottom.el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:last-child,
.el-tabs--bottom.el-tabs--card > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--top .el-tabs--left > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--top .el-tabs--right > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--top.el-tabs--border-card > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
  padding-right: 10px;
}

.inheritDialog .el-dialog-treble .el-tabs__item {
  padding: 0 10px !important;
}
</style>
