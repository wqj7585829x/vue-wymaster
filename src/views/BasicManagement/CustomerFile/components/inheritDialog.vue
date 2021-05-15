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
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="float: left; padding: 3px 0" type="text"
            >需继承业主</span
          >
        </div>
        <div
          v-for="(item, index) in hisownertable"
          :key="index"
          class="text item"
          @change="inheritchange"
        >
          <el-radio v-model="hisowner" :label="index">{{ item.KHMC }}</el-radio>
        </div>
      </el-card>

      <el-tabs v-model="tabsindex" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="收费项目" name="0" v-if="CusInheritCost_has()">
          <div class="content">
            <el-checkbox-group v-model="CostProject">
              <el-checkbox
                :label="item.SFXMWJ"
                v-for="(item, index) in CostProjecttable"
                :key="index"
                @change="CostProjectChange(index)"
                >{{ item.SFXMMC }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史费用" name="1" v-if="CusInheritHistory_has()">
          <div class="content">
            <el-table
              ref="HisCosttable"
              :data="HisCosttable"
              max-height="450"
              border
              @row-click="HisCosttableclick"
              style="width: 100%"
              @selection-change="selectionHisCost"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                width="150"
                property="FYSQ_SSNY"
                label="年月"
              ></el-table-column>
              <el-table-column
                width="250"
                property="FYSQ_QCRQ"
                label="期初日期"
              ></el-table-column>
              <el-table-column
                width="250"
                property="FYSQ_QMRQ"
                label="期末日期"
              ></el-table-column>
              <el-table-column
                width="200"
                property="费用项目名称"
                label="费用项目名称"
              ></el-table-column>
              <el-table-column
                width="150"
                property="FYSQ_SFBZ"
                label="收费币种"
              ></el-table-column>
              <el-table-column
                width="150"
                property="FYSQ_YSJE"
                label="应收金额"
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
                property="FYSQ_FYJE"
                label="费用金额"
              ></el-table-column>
              <el-table-column
                width="150"
                property="FYSQ_TZBJ"
                label="调整本金"
              ></el-table-column>
              <el-table-column
                width="150"
                property="FYSQ_CYCP"
                label="参与出盘"
              ></el-table-column>
              <el-table-column
                width="150"
                property="FYSQ_SSNY"
                label="所属年月"
              ></el-table-column>
              <el-table-column
                width="250"
                property="FYSQ_YSRQ"
                label="应收日期"
              ></el-table-column>
              <el-table-column
                width="150"
                property="FYSQ_TZSM"
                label="调整说明"
              ></el-table-column>
              <el-table-column
                width="250"
                property="FYSQ_ZY"
                label="摘要"
              ></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="一次性费用" name="2" v-if="CusInheritOnce_has()">
          <div class="content">
            <div class="content">
              <el-table
                ref="OnceCosttable"
                :data="OnceCosttable"
                max-height="450"
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
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryInheritOwner,
  queryInheritChargeAndSharing,
  inheritChargeItem,
  queryHistoricalOweFullyInherit,
  inheritAllOwe,
  queryOneTimeCostFullyInherit,
  inheritOneTimeCost,
} from "@/api/BasicManagement/CustomerFile";
export default {
  data() {
    return {
      labelPosition: "left",
      visible: this.show,
      title: "参数继承", //标题
      hisowner: 0, //历史业主
      CostProject: [], //收费项目
      hisownertable: [],
      CostProjecttable: [],
      HisCosttable: [],
      OnceCosttable: [],
      searchFile: {},
      radio: null,
      tabindex: "0",
      HisCosttablecList: [],
      selectionOnceCostList: [],
      tabsindex: "0",
      newkey: "",
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
    CostProjectChange(index) {
      //收费项目选中额外传值——————收费项目外键首字母含义 c常规计算 z走表计算 f分摊项目，当选中为走表计算或者分摊项目其中一个时，则需要改一下首字母另一个一起传入
      if (this.CostProjecttable[index].SFXMWJ.slice(0, 1) != "C") {
        if (
          this.CostProject.indexOf(this.CostProjecttable[index].SFXMWJ) > -1
        ) {
          if (this.CostProjecttable[index].SFXMWJ.slice(0, 1) == "Z") {
            this.CostProject.push(
              this.CostProjecttable[index].SFXMWJ.replace("Z", "F")
            );
          } else {
            this.CostProject.push(
              this.CostProjecttable[index].SFXMWJ.replace("F", "Z")
            );
          }
        } else {
          if (this.CostProjecttable[index].SFXMWJ.slice(0, 1) == "Z") {
            this.CostProject.splice(
              this.CostProject.indexOf(
                this.CostProjecttable[index].SFXMWJ.replace("Z", "F")
              ),
              1
            );
          } else {
            this.CostProject.splice(
              this.CostProject.indexOf(
                this.CostProjecttable[index].SFXMWJ.replace("F", "Z")
              ),
              1
            );
          }
        }
      }
    },
    CusInheritCost_has() {
      //收费项目按钮权限
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("CusInheritCost_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    CusInheritHistory_has() {
      //历史费用按钮权限
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("CusInheritHistory_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    CusInheritOnce_has() {
      //一次性费用按钮权限
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("CusInheritOnce_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    getPartitionData(data, type) {
      this.searchFile.FKGX_FJWJ = data.FKGX_FJWJ;
      this.searchFile.FKGX_ZJ = data.FKGX_ZJ;
      this.newkey = data.FKGX_ZJ;
      this.searchFile.KHDA_KHMC = data.KHDA_KHMC;

      this.searchFile.FYSQ_SFXMMC = "";
      this.searchFile.FYSQ_XSNY = "";

      this.searchFile.GLCID = data.GLCID;
      this.searchFile.YXDID = data.YXDID;

      this.hisowner = 0;
      this.tabsindex = this.CusInheritCost_has()
        ? "0"
        : this.CusInheritHistory_has()
        ? "1"
        : "2";
      this.CostProject = [];
      this.HisCosttablecList = [];
      this.selectionOnceCostList = [];
      this.getowner();
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
    //获得继承业主
    getowner() {
      var _this = this;
      queryInheritOwner(this.searchFile).then((response) => {
        _this.hisownertable = response;
        this.searchFile.FKGX_ZJ = response[0].FKGX_ZJ;
        this.getCostProject();
        this.getHisCost();
        this.getOnceCost();
      });
    },
    //获得收费项目和分摊关系
    getCostProject() {
      var _this = this;
      queryInheritChargeAndSharing(this.searchFile).then((response) => {
        _this.CostProjecttable = response;
      });
    },
    //获得历史欠费
    getHisCost() {
      var _this = this;
      queryHistoricalOweFullyInherit(this.searchFile).then((response) => {
        _this.HisCosttable = response;
      });
    },
    //获得一次性费用
    getOnceCost() {
      var _this = this;
      queryOneTimeCostFullyInherit(this.searchFile).then((response) => {
        _this.OnceCosttable = response;
      });
    },
    inheritchange() {
      this.searchFile.FKGX_ZJ = this.hisownertable[this.hisowner].FKGX_ZJ;
      this.getCostProject();
      this.getHisCost();
      this.getOnceCost();
    },
    // 确认
    sure() {
      if (this.CostProject.length == 0) {
        this.$message.error("没有选择要继承的收费参数，请检查！");
        return;
      }
      inheritChargeItem({
        FKGX_ZJ: this.searchFile.FKGX_ZJ,
        NEW_FKGX_ZJ: this.newkey,
        SFXMWJ: this.CostProject.join(",") + ",",
        NewKHMC: this.searchFile.KHDA_KHMC,
      }).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.$emit("RefreshItem");
          this.cancle();
        }
      });

      var data = this.HisCosttablecList;
      var obj = [];
      for (var i in data) {
        obj.push({
          FKGX_ZJ: this.newkey,
          oldOwner: this.hisownertable[this.hisowner].KHMC,
          FYSQ_FYSQWJ: data[i].FYSQ_ZJ,
          newOwner: this.searchFile.KHDA_KHMC,
          FYSQ_CGNY: data[i].FYSQ_CGNY == undefined ? "" : data[i].FYSQ_CGNY,
          FYSQ_SQRQ: data[i].FYSQ_SQRQ == undefined ? "" : data[i].FYSQ_SQRQ,
          FYSQ_SSNY: data[i].FYSQ_SSNY == undefined ? "" : data[i].FYSQ_SSNY,
          YXDID: this.searchFile.YXDID,
          GLCID: this.searchFile.GLCID,
        });
      }
      inheritAllOwe(obj).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.$emit("RefreshItem");
          this.cancle();
        }
      });

      var data = this.selectionOnceCostList;
      var obj = [];
      for (var i in data) {
        obj.push({
          YXDID: this.searchFile.YXDID,
          GLCID: this.searchFile.GLCID,
          FKGX_ZJ: this.newkey,
          oldOwner: this.hisownertable[this.hisowner].KHMC,
          newOwner: this.searchFile.KHDA_KHMC,
          YCXSF_YCXSFWJ: data[i].YCXSF_ZJ,
          YCXSF_TKJE: data[i].YCXSF_TKJE == undefined ? 0 : data[i].YCXSF_TKJE,
        });
      }
      inheritOneTimeCost(obj).then((response) => {
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
.hisowner {
  height: 150px;
  width: 100%;
}
.content {
  height: 450px;
  width: 100%;
}

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
</style>
