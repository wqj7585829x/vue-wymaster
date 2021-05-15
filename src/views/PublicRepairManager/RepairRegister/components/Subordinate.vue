<template>
  <div class="Subordinate">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="tabsindex" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="所属梯" name="0">
          <div class="content">
            <div class="el-body">
              <div class="el-title">
                <div v-if="ladderTreeList.length > 0">
                  <!--树形组件-->
                  <vuetree
                    :list.sync="ladderTreeList"
                    :is-open="true"
                    ref="dotree"
                    :is-check="false"
                    :showInput="false"
                    @getTreeData="getTreeData"
                  ></vuetree>
                </div>
              </div>
              <div class="el-content">
                <div class="title">
                  <el-form
                    :label-position="labelPosition"
                    label-width="85px"
                    class="demo-form-inline"
                  >
                    <el-row :gutter="30">
                      <el-col :span="5" style="width: 200px">
                        <el-form-item label="" label-width="0">
                          <el-input v-model="ladderForm.PRM"></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="4">
                        <el-form-item label-width="0px">
                          <el-button type="success" @click="LadderList"
                            >查询</el-button
                          >
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
                <div class="body">
                  <el-checkbox-group
                    v-model="checkLadder"
                    @change="Ladderchange"
                    class="checkList"
                  >
                    <el-checkbox
                      v-for="name in ladders"
                      :label="name"
                      :key="name"
                      >{{ name }}</el-checkbox
                    >
                  </el-checkbox-group>
                </div>
                <div class="LcheckAll">
                  <el-checkbox
                    :indeterminate="isLadder"
                    v-model="LcheckAll"
                    @change="LadderAllchange"
                    :disabled="ladders.length === 0"
                    >全选</el-checkbox
                  >
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="所属户" name="1">
          <div class="content door-content">
            <div class="title">
              <el-form
                :label-position="labelPosition"
                label-width="85px"
                class="demo-form-inline"
              >
                <el-row :gutter="30">
                  <el-col :span="5" style="width: 200px">
                    <el-form-item label="" label-width="0">
                      <el-input v-model="DoorForm.PRM"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="4">
                    <el-form-item label-width="0px">
                      <el-button type="success" @click="DoorList"
                        >查询</el-button
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="body">
              <el-checkbox-group
                v-model="checkDoor"
                @change="Doorchange"
                class="checkList"
              >
                <el-checkbox v-for="name in Doors" :label="name" :key="name">{{
                  name
                }}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="LcheckAll">
              <el-checkbox
                :indeterminate="isDoor"
                v-model="DcheckAll"
                @change="DoorAllchange"
                :disabled="Doors.length === 0"
                >全选</el-checkbox
              >
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
  queryLadderTree,
  queryLadder,
  queryDoor,
  queryLadderForAll,
  queryDoorForAll,
  projectOwnership,
  registeredOwnership,
  queryOriginalLadder,
  queryOriginalDoor,
} from "@/api/PublicRepairManager/RepairRegister";
import vuetree from "../../../../components/Eltree/treeItem.vue";
import { nextTick } from "q";
export default {
  data() {
    return {
      labelPosition: "left",
      visible: this.show,
      title: "所属登记", //标题
      tabsindex: "0",
      ladderTreeList: [],
      LcheckAll: false, //梯-begin
      checkLadder: [],
      ladders: [],
      Allladders: [],
      isLadder: false,
      ladderForm: {},
      LCheckList: "", //梯-end
      DcheckAll: false, //户-begin
      checkDoor: [],
      Doors: [],
      AllDoors: [],
      isDoor: false,
      DoorForm: {},
      DCheckList: "", //户-end
      WXDJ_ZJ: "",
      SSXM_ZJ: "",
      settype: "",
    };
  },
  props: {
    Sshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Sshow() {
      this.visible = this.Sshow;
    },
  },
  methods: {
    handleClick(val) {
      switch (val.name) {
        case "0":
          break;
        case "1":
          if (this.checkLadder.length === 0) {
            this.$alert("你没有选择所属梯，请选择！", "提示", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$nextTick(() => {
                  this.tabsindex = "0";
                });
              },
            });
          } else {
            var result = this.checkLadder.join(";");
            var sst = [];
            this.Allladders.forEach((item) => {
              if (result.indexOf(item.TB_TMC) > -1) {
                sst.push(item.TB_ZJ);
              }
            });
            this.DoorForm.ALLTWJ = sst.join(",");
            this.DoorList();
          }
          break;
      }
    },
    getPartitionData(data, type) {
      this.settype = type;

      this.WXDJ_ZJ = data.WXDJ_ZJ;
      this.SSXM_ZJ = data.SSXM_ZJ;
      this.Allladders = [];
      this.ladders = [];
      this.checkLadder = [];
      this.LCheckList = "";

      this.checkDoor = [];
      this.DCheckList = "";

      (this.tabsindex = "0"), (this.LcheckAll = true);
      this.DcheckAll = true;

      this.LadderCheckList(data, type);
      this.DoorCheckList(data, type);

      this.getTreeFun();
    },
    // 获取资源树
    getTreeFun(type) {
      var _this = this;
      queryLadderTree().then((response) => {
        var data = response;
        if (data) {
          _this.ladderTreeList = data;
        }
      });
    },
    //梯-begin
    LadderAllchange(val) {
      this.checkLadder = val ? this.ladders : [];
      this.isLadder = false;
    },
    Ladderchange(value) {
      let LadderCount = value.length;
      this.LcheckAll = LadderCount === this.ladders.length;
      this.isLadder = LadderCount > 0 && LadderCount < this.ladders.length;
    },
    LadderList() {
      this.Allladders = [];
      this.ladders = [];
      var _this = this;
      queryLadderForAll(this.ladderForm).then((response) => {
        _this.Allladders = response;
        response.forEach((item) => {
          _this.ladders.push(item.TB_TMC);
          if (
            _this.LCheckList.indexOf(item.TB_TMC) > -1 &&
            _this.checkLadder.indexOf(item.TB_TMC) == -1
          ) {
            _this.checkLadder.push(item.TB_TMC);
          }
        });
        if (_this.ladders.length == _this.checkLadder.length) {
          this.LcheckAll = true;
        }
      });
    },
    LadderCheckList(val) {
      var _this = this;
      var sst = [];
      if (val.SSXM_ZJ != "") {
        queryLadder({ SSXM_ZJ: val.SSXM_ZJ, WXDJ_ZJ: val.WXDJ_ZJ }).then(
          (response) => {
            response.forEach((item) => {
              this.LCheckList += item.TB_TMC + ";";
              this.ladders.push(item.TB_TMC);
              this.checkLadder.push(item.TB_TMC);
              this.Allladders.push(item);
              sst.push(item.TB_ZJ);
            });
            _this.DoorForm.ALLTWJ = sst.join(",");
            this.LCheckList = this.LCheckList.split(";");
            if (sst.length == 0) {
              this.LcheckAll = false;
            }
          }
        );
      }
      if (val.WXDJ_ZJ != "") {
        queryOriginalLadder({ WXDJ_ZJ: val.WXDJ_ZJ }).then((response) => {
          response.forEach((item) => {
            this.LCheckList += item.TB_TMC + ";";
            this.ladders.push(item.TB_TMC);
            this.checkLadder.push(item.TB_TMC);
            this.Allladders.push(item);
            sst.push(item.TB_ZJ);
          });
          _this.DoorForm.ALLTWJ = sst.join(",");
          this.LCheckList = this.LCheckList.split(";");
          if (sst.length == 0) {
            this.LcheckAll = false;
          }
        });
      }
    },
    //梯-end
    //户-begin
    DoorAllchange(val) {
      this.checkDoor = val ? this.Doors : [];
      this.isDoor = false;
    },
    Doorchange(value) {
      let DoorCount = value.length;
      this.DcheckAll = DoorCount === this.Doors.length;
      this.isDoor = DoorCount > 0 && DoorCount < this.Doors.length;
    },
    DoorList() {
      this.AllDoors = [];
      this.Doors = [];
      queryDoorForAll(this.DoorForm).then((response) => {
        this.AllDoors = response;
        response.forEach((item) => {
          this.Doors.push(item.HZ_FJID);
          if (
            this.DCheckList.indexOf(item.HZ_FJID) > -1 &&
            this.checkDoor.indexOf(item.HZ_FJID) == -1
          ) {
            this.checkDoor.push(item.HZ_FJID);
          }
          if (this.Doors.length == this.checkDoor.length) {
            this.DcheckAll = true;
          }
        });
      });
    },
    DoorCheckList(val) {
      if (val.SSXM_ZJ != "") {
        queryDoor({ SSXM_ZJ: val.SSXM_ZJ }).then((response) => {
          response.forEach((item) => {
            this.DCheckList += item.HZ_FJID + ";";
            this.Doors.push(item.HZ_FJID);
            this.checkDoor.push(item.HZ_FJID);
            this.AllDoors.push(item);
          });
          this.DCheckList = this.DCheckList.split(";");
          if (this.Doors.length == 0) {
            this.DcheckAll = false;
          }
        });
      }
      if (val.WXDJ_ZJ != "") {
        queryOriginalDoor({ WXDJ_ZJ: val.WXDJ_ZJ }).then((response) => {
          response.forEach((item) => {
            this.DCheckList += item.HZ_FJID + ";";
            this.Doors.push(item.HZ_FJID);
            this.checkDoor.push(item.HZ_FJID);
            this.AllDoors.push(item);
          });
          if (this.Doors.length == 0) {
            this.DcheckAll = false;
          }
        });
      }
    },
    //户-end
    //树点击事件
    getTreeData(val) {
      switch (val.data.FCDM_LX) {
        case "管理处":
          this.ladderForm.TB_DLWJ = "";
          this.ladderForm.TB_ZJ = "";
          this.ladderForm.TB_GLQWJ = "";
          break;
        case "管理区":
          this.ladderForm.TB_DLWJ = "";
          this.ladderForm.TB_ZJ = "";
          this.ladderForm.TB_GLQWJ = val.data.FCDM_ZJ;
          break;
        case "大楼":
          this.ladderForm.TB_DLWJ = val.data.FCDM_ZJ;
          this.ladderForm.TB_ZJ = "";
          this.ladderForm.TB_GLQWJ = "";
          break;
        case "梯":
          this.ladderForm.TB_DLWJ = "";
          this.ladderForm.TB_ZJ = val.data.FCDM_ZJ;
          this.ladderForm.TB_GLQWJ = "";
          break;
      }
      this.LadderList();
    },
    // 确认
    sure() {
      if (this.checkLadder.length == 0) {
        this.$message({
          message: "你没有选择所属梯，请选择！",
          type: "warning",
        });
        return;
      }
      var Lresult = this.checkLadder;
      var sst = [];
      var ssh = [];
      var allsst = [];
      this.Allladders.forEach((item) => {
        if (Lresult.indexOf(item.TB_TMC) > -1) {
          sst.push({
            TB_ZJ: item.TB_ZJ,
          });
          allsst.push(item.TB_ZJ);
        }
      });
      if (this.checkDoor.length === 0) {
        this.$confirm(
          "您没有选择费用分摊住户，是否为选择梯的所有用户?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            this.DoorForm.ALLTWJ = allsst.join(",");
            queryDoorForAll(this.DoorForm).then((response) => {
              this.AllDoors = response;
              var Dresult = this.Doors.join(";");
              this.AllDoors.forEach((item) => {
                ssh.push({
                  HZ_ZJ: item.HZ_ZJ,
                });
              });
              var value =
                this.settype === 0
                  ? {
                      WXDJ_ZJ: this.WXDJ_ZJ,
                      TB_ZJ: JSON.stringify(sst),
                      HZ_ZJ: JSON.stringify(ssh),
                    }
                  : {
                      SSXM_ZJ: this.SSXM_ZJ,
                      TB_ZJ: JSON.stringify(sst),
                      HZ_ZJ: JSON.stringify(ssh),
                    };
              if (this.settype === 0) {
                registeredOwnership(value).then((response) => {
                  if (response.returnStatus == "SUCCESS") {
                    this.$emit("RefreshItem", {});
                    this.cancle();
                  }
                });
              } else {
                projectOwnership(value).then((response) => {
                  if (response.returnStatus == "SUCCESS") {
                    this.$emit("RefreshItem", {});
                    this.cancle();
                  }
                });
              }
            });
          })
          .catch(() => {
            var value =
              this.settype === 0
                ? {
                    WXDJ_ZJ: this.WXDJ_ZJ,
                    TB_ZJ: JSON.stringify(sst),
                    HZ_ZJ: "[]",
                  }
                : {
                    SSXM_ZJ: this.SSXM_ZJ,
                    TB_ZJ: JSON.stringify(sst),
                    HZ_ZJ: "[]",
                  };
            if (this.settype === 0) {
              registeredOwnership(value).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  this.$emit("RefreshItem", {});
                  this.cancle();
                }
              });
            } else {
              projectOwnership(value).then((response) => {
                if (response.returnStatus == "SUCCESS") {
                  this.$emit("RefreshItem", {});
                  this.cancle();
                }
              });
            }
          });
      } else {
        var Dresult = this.checkDoor.join(";");
        this.AllDoors.forEach((item) => {
          if (Dresult.indexOf(item.HZ_FJID) > -1) {
            ssh.push({
              HZ_ZJ: item.HZ_ZJ,
            });
          }
        });
        var value =
          this.settype === 0
            ? {
                WXDJ_ZJ: this.WXDJ_ZJ,
                TB_ZJ: JSON.stringify(sst),
                HZ_ZJ: JSON.stringify(ssh),
              }
            : {
                SSXM_ZJ: this.SSXM_ZJ,
                TB_ZJ: JSON.stringify(sst),
                HZ_ZJ: JSON.stringify(ssh),
              };
        if (this.settype === 0) {
          registeredOwnership(value).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$emit("RefreshItem", {});
              this.cancle();
            }
          });
        } else {
          projectOwnership(value).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$emit("RefreshItem", {});
              this.cancle();
            }
          });
        }
      }
    },
    // 取消
    cancle() {
      this.$emit("update:Sshow", false);
    },
  },
  components: {
    vuetree,
  },
};
</script>

<style lang="scss" scoped>
.hisowner {
  height: 150px;
  width: 100%;
}
.content {
  height: 400px;
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

.el-body {
  padding-left: 180px;
}
.el-body /deep/ .el-title {
  width: 180px;
  margin-left: -180px;
}

.el-body /deep/ .el-content {
  position: relative;
  .title {
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    padding-top: 10px;
  }
  .body {
    position: absolute;
    top: 50px;
    bottom: 30px;
    left: 0;
    right: 0;
    padding: 5px 15px;
    overflow: auto;
  }
  .LcheckAll {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 30px;
    padding: 5px 15px;
    text-align: left;
  }
}

.door-content {
  position: relative;
  .title {
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    padding-top: 10px;
  }
  .body {
    position: absolute;
    top: 50px;
    bottom: 30px;
    left: 0;
    right: 0;
    padding: 5px 15px;
    overflow: auto;
  }
  .LcheckAll {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 30px;
    padding: 5px 15px;
    text-align: left;
  }
}
</style>

<style lang="scss">
.Subordinate .select {
  margin-bottom: 30px;
}

.Subordinate .el-dialog__body {
  padding: 0 !important;
}

.Subordinate .el-card__header {
  padding: 8px 20px !important;
}

.Subordinate .el-card__body {
  overflow: auto;
  padding: 5px !important;
}
.Subordinate .el-checkbox-group {
  text-align: left !important;
}
.Subordinate .el-tabs__content {
  padding: 0 !important;
}

.Subordinate .checkList .el-checkbox {
  margin-bottom: 10px;
}
.Subordinate .checkList .el-checkbox__label {
  width: 140px;
}

.Subordinate .door-content .el-checkbox__label {
  width: 200px;
}
</style>
