<template>
  <div class="TaxsDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :rules="rules"
        :model="TaxsForm"
        ref="TaxsForm"
      >
        <el-row :gutter="30">
          <el-col :span="6" style="width: 400px">
            <el-form-item label="房间号：" prop="room_id">
              <el-select
                v-model="TaxsForm.room_id"
                filterable
                clearable
                @change="roomchange"
              >
                <el-option
                  v-for="item in xmdata"
                  :key="item.room_id"
                  :label="item.room_name"
                  :value="item.room_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="width: 250px">
            <el-form-item label="入住时间：" prop="in_time">
              <el-date-picker
                v-model="TaxsForm.in_time"
                type="date"
                placeholder=""
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="buttonBox">
        房屋状况
        <el-button
          type="primary"
          class="edit"
          @click="addhouse"
          v-has="'ContractLiveHouseAdd_has'"
          >新增</el-button
        >
        <el-button
          type="primary"
          class="edit1"
          @click="edithouse"
          :disabled="radio1 === null"
          v-has="'ContractLiveHouseEdit_has'"
          >修改</el-button
        >
        <el-button
          type="primary"
          class="edit2"
          @click="deletehouse"
          :disabled="radio1 === null"
          v-has="'ContractLiveHouseDelete_has'"
          >删除</el-button
        >
      </div>
      <el-table
        ref="multipleTable"
        :data="houselist"
        border
        height="120"
        @row-click="rowclick1"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio1">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="150"
        ></el-table-column>
        <el-table-column prop="photo" label="照片地址" width="150">
          <template slot-scope="scope">
            <a @click="imgshow(scope.row.photo)">查看</a>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
      </el-table>
      <div class="buttonBox" style="margin-top: 50px">
        交接当天各项表显示
        <el-button
          type="primary"
          class="edit"
          @click="addtable"
          v-has="'ContractLiveTableAdd_has'"
          >新增</el-button
        >
        <el-button
          type="primary"
          class="edit1"
          @click="edittable"
          :disabled="radio2 === null"
          v-has="'ContractLiveTableEdit_has'"
          >修改</el-button
        >
        <el-button
          type="primary"
          class="edit2"
          @click="deletetable"
          :disabled="radio2 === null"
          v-has="'ContractLiveTableDelete_has'"
          >删除</el-button
        >
      </div>
      <el-table
        ref="multipleTable"
        :data="tablelist"
        border
        height="120"
        @row-click="rowclick2"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio2">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="meter_name" label="仪表名称"></el-table-column>
        <el-table-column
          prop="check_in_date"
          label="入住抄表日期"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="check_in_reading"
          label="入住抄表读数"
          width="130"
        ></el-table-column>
        <!-- <el-table-column prop="leaseback_date" label="退租抄表日期" width="170"></el-table-column>
        <el-table-column prop="leaseback_reading" label="退租抄表读数" width="130"></el-table-column> -->
      </el-table>
      <div class="buttonBox" style="margin-top: 50px">
        设施设备交接验收明细表
        <el-button
          type="primary"
          class="edit"
          @click="adddetail"
          v-has="'ContractLiveDetailAdd_has'"
          >新增</el-button
        >
        <el-button
          type="primary"
          class="edit1"
          @click="editdetail"
          :disabled="radio3 === null"
          v-has="'ContractLiveDetailEdit_has'"
          >修改</el-button
        >
        <el-button
          type="primary"
          class="edit2"
          @click="deletedetail"
          :disabled="radio3 === null"
          v-has="'ContractLiveDetailDelete_has'"
          >删除</el-button
        >
      </div>
      <el-table
        ref="multipleTable"
        :data="detaillist"
        border
        height="120"
        @row-click="rowclick3"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio3">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="brand" label="品牌"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column
          prop="check_in_status"
          label="入住状况"
        ></el-table-column>
        <el-table-column prop="upload_photo" label="上传照片">
          <template slot-scope="scope">
            <a @click="imgshow(scope.row.upload_photo)">查看</a>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="sure"
          :disabled="
            houselist.length == 0 &&
            tablelist.length == 0 &&
            detaillist.length == 0
          "
          >确 定</el-button
        >
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>

    <HousesDialog
      :Housesshow.sync="Housesshow"
      ref="HousesDialog"
      @RefreshItem="gethouse"
    ></HousesDialog>
    <TableDialog
      :Tableshow.sync="Tableshow"
      ref="TableDialog"
      @RefreshItem="gettable"
    ></TableDialog>
    <DetailDialog
      :Detailshow.sync="Detailshow"
      ref="DetailDialog"
      @RefreshItem="getdetail"
    ></DetailDialog>

    <el-dialog v-dialogDrag title="图片" :visible.sync="imgVisible">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in imglist" :key="item">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryRoomName,
  queryHomeCondition,
  queryMeter,
  queryDeviceDetail,
  deleteHomeCondition,
  deleteMeter,
  deleteDeviceDetail,
  keepingLiveIn,
} from "@/api/Realtor/Contract";
import HousesDialog from "./HousesDialog";
import TableDialog from "./TableDialog";
import DetailDialog from "./DetailDialog";
export default {
  data() {
    return {
      visible: this.Taxshow,
      title: "入住", //标题
      categoryList: "",
      rules: {
        room_id: [{ required: true, message: "请选择房间", trigger: "change" }],
        in_time: [
          { required: false, message: "请选择入住时间", trigger: "blur" },
        ],
      },
      TaxsForm: {
        in_time: "",
      },
      Housesshow: false,
      Tableshow: false,
      Detailshow: false,
      xmdata: [],
      room_id: "",
      houselist: [],
      tablelist: [],
      detaillist: [],
      radio1: null,
      radio2: null,
      radio3: null,
      tableRow1: {},
      tableRow2: {},
      tableRow3: {},
      imgVisible: false,
      imglist: "",
    };
  },
  props: {
    Taxshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Taxshow() {
      this.visible = this.Taxshow;
    },
  },
  mounted() {},
  methods: {
    imgshow(val) {
      if (val) {
        this.imglist = val.split(";");
        this.imgVisible = true;
      } else {
        this.$message({
          message: "暂无图片",
        });
      }
    },
    rowclick1(row) {
      this.tableRow1 = row;
      this.radio1 = this.houselist.indexOf(row); //单行点击单选按钮选中
    },
    rowclick2(row) {
      this.tableRow2 = row;
      this.radio2 = this.tablelist.indexOf(row); //单行点击单选按钮选中
    },
    rowclick3(row) {
      this.tableRow3 = row;
      this.radio3 = this.detaillist.indexOf(row); //单行点击单选按钮选中
    },
    roomchange(val) {
      if (val) {
        this.room_id = val;
        this.gethouse();
        this.gettable();
        this.getdetail();
      } else {
        this.room_id = "";
        this.houselist = [];
        this.tablelist = [];
        this.detaillist = [];
      }
    },
    //   判断新增，修改
    getReportData(data) {
      this.houselist = [];
      this.tablelist = [];
      this.detaillist = [];
      this.radio1 = null;
      this.radio2 = null;
      this.radio3 = null;
      this.tableRow1 = {};
      this.tableRow2 = {};
      this.tableRow3 = {};

      var day = new Date();
      day.setTime(day.getTime());
      var now =
        day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
      data.in_time = now;
      data.room_id = "";

      this.TaxsForm = JSON.parse(JSON.stringify(data));
      queryRoomName({
        plotDbName: data.db_name,
        GLCID: data.GLCID,
        YXDID: data.YXDID,
        contract_id: data.contract_id,
        status: 1,
      }).then((response) => {
        var data = response.data;
        this.xmdata = data;
        if (data) {
          this.TaxsForm.room_id = data[0].room_id;
          this.room_id = data[0].room_id;
          this.gethouse();
          this.gettable();
          this.getdetail();
        }
      });
    },
    gethouse(id) {
      var _this = this;
      queryHomeCondition({
        plotDbName: this.TaxsForm.db_name,
        GLCID: this.TaxsForm.GLCID,
        YXDID: this.TaxsForm.YXDID,
        contract_id: this.TaxsForm.contract_id,
        room_id: this.room_id,
      }).then((response) => {
        var data = response.data;
        _this.houselist = data;
        if (typeof _this.radio1 != "object") {
          _this.tableRow1 = data[_this.radio1];
        }
      });
    },
    gettable(id) {
      queryMeter({
        plotDbName: this.TaxsForm.db_name,
        GLCID: this.TaxsForm.GLCID,
        YXDID: this.TaxsForm.YXDID,
        contract_id: this.TaxsForm.contract_id,
        room_id: this.room_id,
      }).then((response) => {
        var data = response.data;
        this.tablelist = data;
        if (typeof this.radio2 != "object") {
          this.tableRow2 = data[this.radio2];
        }
      });
    },
    getdetail(id) {
      queryDeviceDetail({
        plotDbName: this.TaxsForm.db_name,
        GLCID: this.TaxsForm.GLCID,
        YXDID: this.TaxsForm.YXDID,
        contract_id: this.TaxsForm.contract_id,
        room_id: this.room_id,
      }).then((response) => {
        var data = response.data;
        this.detaillist = data;
        if (typeof this.radio3 != "object") {
          this.tableRow3 = data[this.radio3];
        }
      });
    },
    addhouse() {
      this.rules.in_time[0].required = false;
      this.$refs["TaxsForm"].validate((valid) => {
        if (valid) {
          this.Housesshow = true;
          this.$refs.HousesDialog.getReportData(
            {
              plotDbName: this.TaxsForm.db_name,
              GLCID: this.TaxsForm.GLCID,
              YXDID: this.TaxsForm.YXDID,
              contract_id: this.TaxsForm.contract_id,
              room_id: this.room_id,
            },
            0
          );
        } else {
          return false;
        }
      });
    },
    addtable() {
      this.rules.in_time[0].required = false;
      this.$refs["TaxsForm"].validate((valid) => {
        if (valid) {
          this.Tableshow = true;
          this.$refs.TableDialog.getReportData(
            {
              plotDbName: this.TaxsForm.db_name,
              GLCID: this.TaxsForm.GLCID,
              YXDID: this.TaxsForm.YXDID,
              contract_id: this.TaxsForm.contract_id,
              room_id: this.room_id,
            },
            0
          );
        } else {
          return false;
        }
      });
    },
    adddetail() {
      this.rules.in_time[0].required = false;
      this.$refs["TaxsForm"].validate((valid) => {
        if (valid) {
          this.Detailshow = true;
          this.$refs.DetailDialog.getReportData(
            {
              plotDbName: this.TaxsForm.db_name,
              GLCID: this.TaxsForm.GLCID,
              YXDID: this.TaxsForm.YXDID,
              contract_id: this.TaxsForm.contract_id,
              room_id: this.room_id,
            },
            0
          );
        } else {
          return false;
        }
      });
    },
    edithouse() {
      this.rules.in_time[0].required = false;
      this.$refs["TaxsForm"].validate((valid) => {
        if (valid) {
          this.Housesshow = true;
          var table = this.tableRow1;
          table.in_time = this.TaxsForm.in_time;
          table.plotDbName = this.TaxsForm.db_name;
          table.GLCID = this.TaxsForm.GLCID;
          table.YXDID = this.TaxsForm.YXDID;
          table.contract_id = this.TaxsForm.contract_id;
          table.room_id = this.room_id;
          this.$refs.HousesDialog.getReportData(table, 1);
        } else {
          return false;
        }
      });
    },
    edittable() {
      this.rules.in_time[0].required = false;
      this.$refs["TaxsForm"].validate((valid) => {
        if (valid) {
          this.Tableshow = true;
          var table = this.tableRow2;
          table.in_time = this.TaxsForm.in_time;
          table.plotDbName = this.TaxsForm.db_name;
          table.GLCID = this.TaxsForm.GLCID;
          table.YXDID = this.TaxsForm.YXDID;
          table.contract_id = this.TaxsForm.contract_id;
          table.room_id = this.room_id;
          this.$refs.TableDialog.getReportData(table, 1);
        } else {
          return false;
        }
      });
    },
    editdetail() {
      this.rules.in_time[0].required = false;
      this.$refs["TaxsForm"].validate((valid) => {
        if (valid) {
          this.Detailshow = true;
          var table = this.tableRow3;
          table.in_time = this.TaxsForm.in_time;
          table.plotDbName = this.TaxsForm.db_name;
          table.GLCID = this.TaxsForm.GLCID;
          table.YXDID = this.TaxsForm.YXDID;
          table.contract_id = this.TaxsForm.contract_id;
          table.room_id = this.room_id;
          this.$refs.DetailDialog.getReportData(table, 1);
        } else {
          return false;
        }
      });
    },
    deletehouse() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteHomeCondition({
            plotDbName: this.TaxsForm.db_name,
            GLCID: this.TaxsForm.GLCID,
            YXDID: this.TaxsForm.YXDID,
            id: this.tableRow1.id,
          }).then((response) => {
            this.radio1 = null;
            this.gethouse();
          });
        })
        .catch(() => {
          this.radio1 = null; //清空选中
        });
    },
    deletetable() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMeter({
            plotDbName: this.TaxsForm.db_name,
            GLCID: this.TaxsForm.GLCID,
            YXDID: this.TaxsForm.YXDID,
            id: this.tableRow2.id,
          }).then((response) => {
            this.radio2 = null;
            this.gettable();
          });
        })
        .catch(() => {
          this.radio2 = null; //清空选中
        });
    },
    deletedetail() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteDeviceDetail({
            plotDbName: this.TaxsForm.db_name,
            GLCID: this.TaxsForm.GLCID,
            YXDID: this.TaxsForm.YXDID,
            id: this.tableRow3.id,
          }).then((response) => {
            this.radio3 = null;
            this.getdetail();
          });
        })
        .catch(() => {
          this.radio3 = null; //清空选中
        });
    },
    //   新增/修改分区
    sure() {
      this.rules.in_time[0].required = true;
      var _this = this;
      this.$refs["TaxsForm"].validate((valid) => {
        if (valid) {
          const parent = this.xmdata;
          const id = this.TaxsForm.room_id;
          const index = parent.findIndex((d) => d.room_id === id);
          keepingLiveIn({
            plotDbName: this.TaxsForm.db_name,
            GLCID: this.TaxsForm.GLCID,
            YXDID: this.TaxsForm.YXDID,
            contract_id: this.TaxsForm.contract_id,
            room_name: parent[index].room_name,
            room_id: this.TaxsForm.room_id,
            in_time: this.TaxsForm.in_time,
          }).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              this.$emit("RefreshItem", 0);
              this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("update:Taxshow", false);
      this.$nextTick(() => {
        this.$refs.TaxsForm.resetFields(); //重置输入框提示
      });
    },
    RefreshItem() {},
  },
  components: {
    HousesDialog,
    TableDialog,
    DetailDialog,
  },
};
</script>

<style lang="scss" scope>
.TaxsDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.TaxsDialog .el-input-number {
  width: 100%;
}

.TaxsDialog .el-input-number input {
  text-align: left;
}

.TaxsDialog .buttonBox {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 33px;
  margin-bottom: 10px;
}

.TaxsDialog .edit {
  position: absolute;
  right: 180px;
  top: 0;
}

.TaxsDialog .edit1 {
  position: absolute;
  right: 90px;
  top: 0;
}

.TaxsDialog .edit2 {
  position: absolute;
  right: 0px;
  top: 0;
}

.TaxsDialog .el-dialog__body {
  padding: 30px 20px;
}

.TaxsDialog .el-dialog-treble .el-row {
  padding: 0;
  margin: 0 -15px !important;
}

.TaxsDialog .el-carousel img {
  height: 100%;
}
</style>
