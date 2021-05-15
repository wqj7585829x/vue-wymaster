<template>
  <div class="TestDialog">
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
          <el-col :span="6" style="width: 250px">
            <el-form-item label="入住时间：" prop="in_time">
              <el-date-picker
                v-model="TaxsForm.in_time"
                type="date"
                placeholder=""
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="buttonBox">房屋状况</div>
      <el-table ref="multipleTable" :data="houselist" border height="120">
        <el-table-column
          prop="room_name"
          label="房间名称"
          width="150"
        ></el-table-column>
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
        <el-table-column prop="money" label="扣款" width="150">
          <template slot-scope="scope">
            <el-input-number
              class="moneyinput"
              v-model="scope.row.money"
              :precision="4"
              :step="0.0001"
              :min="0"
              :controls="false"
            >
            </el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div class="buttonBox" style="margin-top: 50px">交接当天各项表显示</div>
      <el-table ref="multipleTable" :data="tablelist" border height="120">
        <el-table-column
          prop="room_name"
          label="房间名称"
          width="150"
        ></el-table-column>
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
        <el-table-column prop="leaseback_date" label="退租抄表日期" width="250">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.leaseback_date"
              type="date"
              placeholder=""
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop="leaseback_reading"
          label="退租抄表读数"
          width="130"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.leaseback_reading"
              :precision="4"
              :step="0.0001"
              :min="0"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div class="buttonBox" style="margin-top: 50px">
        设施设备交接验收明细表
      </div>
      <el-table ref="multipleTable" :data="detaillist" border height="120">
        <el-table-column
          prop="room_name"
          label="房间名称"
          width="150"
        ></el-table-column>
        <el-table-column prop="name" label="名称" width="120"></el-table-column>
        <el-table-column
          prop="brand"
          label="品牌"
          width="120"
        ></el-table-column>
        <el-table-column prop="model" label="型号" width="80"></el-table-column>
        <el-table-column prop="num" label="数量" width="80"></el-table-column>
        <el-table-column
          prop="check_in_status"
          label="入住状况"
          width="120"
        ></el-table-column>
        <el-table-column prop="leaseback_status" label="退租状况">
          <template slot-scope="scope">
            <el-input v-model="scope.row.leaseback_status"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="upload_photo" label="上传照片" width="100">
          <template slot-scope="scope">
            <a @click="imgshow(scope.row.upload_photo)">查看</a>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="扣款" width="150">
          <template slot-scope="scope">
            <el-input-number
              class="moneyinput"
              v-model="scope.row.money"
              :precision="4"
              :step="0.0001"
              :min="0"
              :controls="false"
            >
            </el-input-number>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>

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
  roomCheckAndAccept,
} from "@/api/Realtor/Contract";
export default {
  data() {
    return {
      visible: this.Taxshow,
      title: "验收", //标题
      categoryList: "",
      rules: {
        in_time: [
          { required: true, message: "请选择入住时间", trigger: "blur" },
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
    roomchange(val) {
      if (val) {
        this.gethouse();
        this.gettable();
        this.getdetail();
      } else {
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

      var day = new Date();
      day.setTime(day.getTime());
      var now =
        day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
      data.in_time = now;

      this.TaxsForm = JSON.parse(JSON.stringify(data));
      queryRoomName({
        plotDbName: data.db_name,
        GLCID: data.GLCID,
        YXDID: data.YXDID,
        contract_id: data.contract_id,
        status: 2,
      }).then((response) => {
        var data = response.data;
        this.xmdata = data;
        if (data) {
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
      }).then((response) => {
        var data = response.data;
        _this.houselist = data;
      });
    },
    gettable(id) {
      queryMeter({
        plotDbName: this.TaxsForm.db_name,
        GLCID: this.TaxsForm.GLCID,
        YXDID: this.TaxsForm.YXDID,
        contract_id: this.TaxsForm.contract_id,
      }).then((response) => {
        var data = response.data;
        this.tablelist = data;
      });
    },
    getdetail(id) {
      queryDeviceDetail({
        plotDbName: this.TaxsForm.db_name,
        GLCID: this.TaxsForm.GLCID,
        YXDID: this.TaxsForm.YXDID,
        contract_id: this.TaxsForm.contract_id,
      }).then((response) => {
        var data = response.data;
        this.detaillist = data;
      });
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TaxsForm"].validate((valid) => {
        if (valid) {
          var houselist = this.houselist;
          var detaillist = this.detaillist;
          var tablelist = this.tablelist;
          var house_deduct_money = [];
          var house_id = [];
          var device_deduct_money = [];
          var device_id = [];
          var room_namelist = [];
          var room_idlist = [];
          var tabledate = [];
          var tablenum = [];
          var meter_id = [];
          var leaseback_status = [];

          for (var i in houselist) {
            house_deduct_money.push(
              houselist[i].money ? houselist[i].money : 0
            );
            house_id.push(houselist[i].id);
            if (room_idlist.indexOf(houselist[i].room_id)) {
              room_namelist.push(houselist[i].room_name);
              room_idlist.push(houselist[i].room_id);
            }
          }

          for (var i in tablelist) {
            if (tablelist[i].leaseback_date && tablelist[i].leaseback_reading) {
              tabledate.push(tablelist[i].leaseback_date);
              tablenum.push(tablelist[i].leaseback_reading);
              meter_id.push(tablelist[i].id);
            } else {
              this.$message({
                message: "请填写所有退租抄表日期和读数",
              });
              return;
            }
            house_id.push(tablelist[i].id);
            if (room_idlist.indexOf(tablelist[i].room_id)) {
              room_namelist.push(tablelist[i].room_name);
              room_idlist.push(tablelist[i].room_id);
            }
          }

          for (var i in detaillist) {
            if (detaillist[i].money) {
              device_deduct_money.push(detaillist[i].money);
              device_id.push(detaillist[i].id);
              leaseback_status.push(detaillist[i].leaseback_status);
            }
            house_id.push(detaillist[i].id);
            if (room_idlist.indexOf(detaillist[i].room_id)) {
              room_namelist.push(detaillist[i].room_name);
              room_idlist.push(detaillist[i].room_id);
            }
          }

          roomCheckAndAccept({
            plotDbName: this.TaxsForm.db_name,
            GLCID: this.TaxsForm.GLCID,
            YXDID: this.TaxsForm.YXDID,
            contract_id: this.TaxsForm.contract_id,
            out_time: this.TaxsForm.in_time,
            house_deduct_money: house_deduct_money.join(","),
            house_id: house_id.join(","),
            device_deduct_money: device_deduct_money.join(","),
            device_id: device_id.join(","),
            room_name: room_namelist.join(","),
            room_id: room_idlist.join(","),
            leaseback_date: tabledate.join(","),
            leaseback_reading: tablenum.join(","),
            meter_id: meter_id.join(","),
            leaseback_status: leaseback_status.join(","),
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
    RefreshItem() {
      this.handleCurrentChange(1);
    },
  },
};
</script>

<style lang="scss" scope>
.TestDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.TestDialog .el-input-number {
  width: 100%;
}

.TestDialog .el-input-number input {
  text-align: left;
}

.TestDialog .buttonBox {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 33px;
  margin-bottom: 10px;
}

.TestDialog .edit {
  position: absolute;
  right: 180px;
  top: 0;
}

.TestDialog .edit1 {
  position: absolute;
  right: 90px;
  top: 0;
}

.TestDialog .edit2 {
  position: absolute;
  right: 0px;
  top: 0;
}

.TestDialog .el-dialog__body {
  padding: 30px 20px;
}

.TestDialog .el-dialog-treble .el-row {
  padding: 0;
  margin: 0 -15px !important;
}

.TestDialog .el-carousel img {
  height: 100%;
}
</style>
