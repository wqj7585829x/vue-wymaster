<template>
  <div class="RoomStatusDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div>
        <el-select
          v-model="TableForm.status"
          placeholder="请选择状态"
          style="width: 22.5%"
          @change="optionchange"
          clearable
        >
          <el-option label="全部" :value="''"></el-option>
          <el-option label="未出租" :value="0"></el-option>
          <el-option label="已出租" :value="1"></el-option>
          <el-option label="签约中" :value="2"></el-option>
        </el-select>
        <el-select
          v-model="TableForm.index1"
          placeholder="请选择项目处"
          style="width: 22.5%"
          @change="optionchange1"
        >
          <el-option
            v-for="(item, index) in options1"
            :key="index"
            :label="item.GLCNAME"
            :value="index"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="TableForm.DLDA_ZJ"
          placeholder="请选择大楼"
          style="width: 22.5%"
          @change="optionchange2"
          clearable
        >
          <el-option
            v-for="(item, index) in options2"
            :key="index"
            :label="item.DLDA_DLMC"
            :value="item.DLDA_ZJ"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="TableForm.FJDA_FJMC"
          placeholder="请选择房间"
          style="width: 22.5%"
          @change="optionchange"
          clearable
          filterable
        >
          <el-option
            v-for="(item, index) in options3"
            :key="index"
            :label="item.FJDA_FJMC"
            :value="item.FJDA_FJMC"
          >
          </el-option>
        </el-select>
      </div>
      <div class="roombodys">
        <div class="room" v-for="(item, index) in roomlist">
          <div class="roomtitle">{{ index }}</div>
          <div class="roombody">
            <div
              :class="`roomunit color-${unit.status}`"
              v-for="unit in item"
              @click="showcontract(unit)"
            >
              <div class="roomname">{{ unit.FJDA_FJMC }}</div>
              <div class="roomtype">
                {{
                  unit.status === 0
                    ? "未出租"
                    : unit.status === 1
                    ? "已出租"
                    : "签约中"
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>

    <ContractMesDialog
      :Contractshow.sync="Contractshow"
      ref="ContractMesDialog"
    ></ContractMesDialog>
  </div>
</template>

<script>
import {
  queryRoomAvailabilityFigure,
  queryZLPlot,
  queryZLBuildingMessage,
  queryZLRoom,
} from "@/api/Realtor/Customer";
import { mapGetters } from "vuex";
import ContractMesDialog from "./ContractMesDialog";
export default {
  data() {
    return {
      visible: this.show,
      title: "房态图", //标题
      categoryList: "",
      TableForm: {
        index1: "",
      },
      tableData: [],
      plot_List: [],
      options1: [],
      options2: [],
      options3: [],
      roomlist: [],
      Contractshow: false,
    };
  },
  computed: {
    ...mapGetters(["currentPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  components: {
    ContractMesDialog,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      this.visible = this.show;
    },
  },
  methods: {
    showcontract(unit) {
      if (unit.status === 0) return;
      this.Contractshow = true;
      this.$refs.ContractMesDialog.getReportData(unit);
    },
    optionchange1(index) {
      this.TableForm.DLDA_ZJ = "";
      this.TableForm.FJDA_FJMC = "";
      this.TableForm.dbName = this.options1[index].dbName;
      this.TableForm.GLCID = this.options1[index].GLCID;
      this.TableForm.YXDID = this.options1[index].YXDID;
      this.getopther();
      queryRoomAvailabilityFigure(this.TableForm).then((response) => {
        this.roomlist = response.data;
      });
    },
    optionchange2() {
      this.$forceUpdate();
      this.TableForm.FJDA_FJMC = "";
      queryZLRoom({
        dbName: this.TableForm.dbName,
        GLCID: this.TableForm.GLCID,
        YXDID: this.TableForm.YXDID,
        DLDA_ZJ: this.TableForm.DLDA_ZJ,
      }).then((response) => {
        this.options3 = response;
      });
      queryRoomAvailabilityFigure(this.TableForm).then((response) => {
        this.roomlist = response.data;
      });
    },
    optionchange() {
      this.$forceUpdate();
      queryRoomAvailabilityFigure(this.TableForm).then((response) => {
        this.roomlist = response.data;
      });
    },
    getopther() {
      queryZLBuildingMessage({
        dbName: this.TableForm.dbName,
        GLCID: this.TableForm.GLCID,
        YXDID: this.TableForm.YXDID,
      }).then((response) => {
        this.options2 = response;
        this.TableForm.DLDA_ZJ = "";
      });
      queryZLRoom({
        dbName: this.TableForm.dbName,
        GLCID: this.TableForm.GLCID,
        YXDID: this.TableForm.YXDID,
      }).then((response) => {
        this.options3 = response;
        this.TableForm.FJDA_FJMC = "";
      });
    },
    //   判断新增，修改
    getReportData() {
      queryZLPlot().then((response) => {
        this.options1 = response;
        var parent = this.options1;
        var children = this.currentPlot;
        this.TableForm.index1 = parent.findIndex((d) => d.GLCNAME === children);

        this.TableForm.dbName = this.options1[this.TableForm.index1].dbName;
        this.TableForm.GLCID = this.options1[this.TableForm.index1].GLCID;
        this.TableForm.YXDID = this.options1[this.TableForm.index1].YXDID;

        this.getopther();
        this.optionchange();
      });
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style lang="scss" scope>
.RoomStatusDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.RoomStatusDialog .el-dialog {
  height: 500px;
}

.RoomStatusDialog .el-input-number {
  width: 100%;
}

.RoomStatusDialog .el-input-number input {
  text-align: left;
}

.RoomStatusDialog .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(44, 138, 216, 1);
  text-align: left;
  padding-left: 16px;
  margin-bottom: 16px;
}

.RoomStatusDialog {
  .roombodys {
    height: 365px;
    overflow: auto;
    margin-top: 10px;
    .room {
      margin: 0 15px;
      padding-top: 14px;
      .roomtitle {
        text-align: left;
        padding-left: 15px;
        font-weight: bold;
        width: 100%;
      }
      .roombody {
        overflow: auto;
        .roomunit {
          width: 22.5%;
          float: left;
          margin-left: 2%;
          height: 70px;
          border-radius: 8px;
          margin-top: 10px;
          position: relative;
          .roomname {
            position: absolute;
            top: 5px;
            left: 10px;
            font-size: 14px;
            font-weight: 700;
          }
          .roomtype {
            position: absolute;
            right: 10px;
            bottom: 5px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .roomunit:nth-child(4n + 0) {
          margin-right: 2%;
        }
        .color-0 {
          background: rgba(240, 244, 247, 1);
        }
        .color-1 {
          background: rgba(250, 107, 114, 1);
          color: #fff;
        }
        .color-2 {
          background: rgba(44, 138, 216, 1);
          color: #fff;
        }
        .roomunit:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
