<template>
  <div class="SigningDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :model="SigningForm"
        :rules="rules"
        ref="SigningForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="项目名称:" prop="optionsindex1">
              <el-select
                v-model="SigningForm.optionsindex1"
                placeholder="请选择项目名称"
                @change="changeoptions1"
                :disabled="true"
              >
                <el-option
                  v-for="(item, index) in options1"
                  :key="index"
                  :label="item.GLCNAME"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房间名称:" prop="optionsindex4">
              <el-select
                v-model="SigningForm.optionsindex4"
                placeholder="请选择房间名称"
                @change="changeoptions4"
                filterable
              >
                <el-option
                  v-for="(item, index) in options4"
                  :key="index"
                  :label="item.FJDA_FJMC"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="建筑面积:" prop="constructionArea">
              <el-input
                v-model="SigningForm.constructionArea"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="出租面积:" prop="rentalArea">
              <el-input-number
                v-model="SigningForm.rentalArea"
                :precision="4"
                :step="0.0001"
                :min="0"
                :max="SigningForm.rentableArea"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="可出租面积:" prop="rentableArea">
              <el-input-number
                v-model="SigningForm.rentableArea"
                :disabled="true"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <div
          style="
            width: 100%;
            border-bottom: 1px dashed #ccc;
            margin-bottom: 5px;
          "
        ></div>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="费用项目:" prop="chargeItem">
              <el-select
                v-model="SigningForm.chargeItem"
                placeholder="请选择费用项目"
                @change="changeoptions5"
              >
                <el-option
                  v-for="(item, index) in options5"
                  :key="index"
                  :label="item.chargeItem"
                  :value="item.chargeItem"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="计价类型:" prop="priceType">
              <el-select
                v-model="SigningForm.priceType"
                placeholder="请选择单价"
                @change="changeoptions6"
              >
                <el-option
                  v-for="(item, index) in options6"
                  :key="index"
                  :label="item.priceTypeStr"
                  :value="item.priceType"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="单价:" prop="price">
              <el-select
                v-model="SigningForm.price"
                placeholder="请选择单价单位"
                @change="changeoptions7"
              >
                <el-option
                  v-for="(item, index) in options7"
                  :key="index"
                  :label="item.price"
                  :value="item.price"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="单价单位:" prop="priceUnit">
              <el-select
                v-model="SigningForm.priceUnit"
                placeholder="请选择计价类型"
              >
                <el-option
                  v-for="(item, index) in options8"
                  :key="index"
                  :label="item.priceUnitStr"
                  :value="item.priceUnit"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="开始时间:" prop="startTime">
              <el-date-picker
                v-model="SigningForm.startTime"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="结束时间:" prop="endTime">
              <el-date-picker
                v-model="SigningForm.endTime"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="调租起始:" prop="adjustmentIncreasingStart">
              <el-date-picker
                v-model="SigningForm.adjustmentIncreasingStart"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="调租截止:" prop="adjustmentIncreasingCutoff">
              <el-date-picker
                v-model="SigningForm.adjustmentIncreasingCutoff"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="递增周期:" prop="adjustmentIncreasingCycle">
              <el-input
                v-model="SigningForm.adjustmentIncreasingCycle"
                placeholder="请填写周期"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="递增类型:"
              prop="adjustmentIncreasingRangeType"
            >
              <el-select
                v-model="SigningForm.adjustmentIncreasingRangeType"
                placeholder="请选择"
              >
                <el-option label="百分比" :value="0"></el-option>
                <el-option label="金额" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col
            :span="12"
            v-if="this.SigningForm.adjustmentIncreasingRangeType == 0"
          >
            <el-form-item label="递增幅度:" prop="carCode">
              <el-input
                v-model="SigningForm.adjustmentIncreasingPercentage"
                placeholder="请填写"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
            v-if="this.SigningForm.adjustmentIncreasingRangeType == 1"
          >
            <el-form-item label="递增幅度:" prop="carCode">
              <el-input
                v-model="SigningForm.adjustmentIncreasingPrice"
                placeholder="请填写"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="备注:" prop="carCode">
              <el-input v-model="SigningForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="sure"
          :disabled="SigningForm.rentableArea <= 0"
          >确 定</el-button
        >
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  optionsApi1,
  optionsApi2,
  optionsApi3,
  optionsApi4,
  optionsApi5,
  optionsApi6,
  optionsApi7,
  optionsApi8,
  addClauseAPi,
  updateAPI,
  queryRoom,
} from "@/api/Realtor/Contract";
export default {
  data() {
    return {
      visible: this.Signingshow,
      title: "新增", //标题
      categoryList: "",
      rules: {
        optionsindex1: [
          { required: true, message: "请选择项目名称", trigger: "blur" },
        ],
        optionsindex2: [
          { required: true, message: "请选择分区名称", trigger: "blur" },
        ],
        optionsindex3: [
          { required: true, message: "请选择楼栋名称", trigger: "blur" },
        ],
        optionsindex4: [
          { required: true, message: "请选择房间名称", trigger: "blur" },
        ],

        rentalArea: [
          { required: true, message: "请输入出租面积", trigger: "blur" },
        ],

        chargeItem: [
          { required: true, message: "请选择费用项目", trigger: "blur" },
        ],
        price: [{ required: true, message: "请选择单价", trigger: "blur" }],
        priceUnit: [
          { required: true, message: "请选择单价单位", trigger: "blur" },
        ],
        priceType: [
          { required: true, message: "请选择计价类型", trigger: "blur" },
        ],

        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
      },
      SigningForm: {
        optionsindex1: "",
        optionsindex2: "",
        optionsindex3: "",
        optionsindex4: "",
      },
      tableData: [],
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      options5: [],
      options6: [],
      options7: [],
      options8: [],
      plot_id: "",
      changetype: false,
    };
  },
  props: {
    Signingshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Signingshow() {
      this.visible = this.Signingshow;
    },
  },
  mounted() {},
  methods: {
    getoptions1() {
      optionsApi1({
        id: this.plot_id,
      }).then((response) => {
        this.options1 = response;
        this.SigningForm.optionsindex1 = 0;
        this.changeoptions1(0);
      });
    },
    getoptions1s() {
      //初始化项目名称
      optionsApi1({
        id: this.SigningForm.plot_id,
      }).then((response) => {
        this.options1 = response;

        const parent = response;
        const id = parseInt(this.SigningForm.plot_id);
        this.SigningForm.optionsindex1 = parent.findIndex((d) => d.id === id); //寻找data的索引
      });
      var _this = this;

      optionsApi4({
        dbName: this.SigningForm.dbName,
        GLCID: this.SigningForm.GLCID,
        YXDID: this.SigningForm.YXDID,
        changetype: this.changetype,
        contract_id: this.SigningForm.contractId,
        contractEndDate: this.SigningForm.contractEndDate,
        contractStartDate: this.SigningForm.contractStartDate,
        resourcesId: this.SigningForm.resourcesId,
      }).then((response) => {
        this.options4 = response;

        const parent = response;
        const id = this.SigningForm.roomId;
        this.SigningForm.optionsindex4 = parent.findIndex(
          (d) => d.roomId === id
        ); //寻找data的索引
        this.SigningForm.rentableArea =
          response[this.SigningForm.optionsindex4].rentableArea;
        this.SigningForm.rentalArea =
          this.SigningForm.rentalArea > this.SigningForm.rentableArea
            ? this.SigningForm.rentableArea
            : this.SigningForm.rentalArea;
      });
    },
    getoptions5() {
      var _this = this;
      optionsApi5({
        id: this.plot_id,
      }).then((response) => {
        _this.options5 = response;
      });
    },
    getoptions5s() {
      var _this = this;
      optionsApi5({
        id: this.plot_id,
      }).then((response) => {
        _this.options5 = response;
      });
      optionsApi8({
        chargeItem: this.SigningForm.chargeItem,
        id: this.plot_id,
      }).then((response) => {
        this.options6 = response;
      });
      optionsApi6({
        chargeItem: this.SigningForm.chargeItem,
        priceType: this.SigningForm.priceType,
        id: this.plot_id,
      }).then((response) => {
        this.options7 = response;
      });
      optionsApi7({
        chargeItem: this.SigningForm.chargeItem,
        priceType: this.SigningForm.priceType,
        price: this.SigningForm.price,
        id: this.plot_id,
      }).then((response) => {
        this.options8 = response;
      });
    },
    // changeoptions1(index) {
    //   this.SigningForm.plotId = this.options1[index].id
    //   this.SigningForm.GLCID = this.options1[index].GLCID
    //   this.SigningForm.YXDID = this.options1[index].YXDID
    //   optionsApi2({
    //     dbName: this.options1[index].dbName,
    //     GLCID: this.options1[index].GLCID,
    //     YXDID: this.options1[index].YXDID,
    //     changetype: this.changetype,
    //     contract_id: this.SigningForm.contractId
    //   }).then(response => {
    //     this.options2 = response
    //     this.SigningForm.optionsindex2 = ''
    //     this.SigningForm.optionsindex3 = ''
    //     this.SigningForm.optionsindex4 = ''

    //     this.SigningForm.partitionId = ''
    //     this.SigningForm.buildId = ''
    //     this.SigningForm.roomId = ''
    //     this.SigningForm.roomName = ''
    //   })
    // },
    // changeoptions2(index) {
    //   this.SigningForm.partitionId = this.options2[index].partitionId
    //   optionsApi3({
    //     dbName: this.options1[this.SigningForm.optionsindex1].dbName,
    //     GLCID: this.options1[this.SigningForm.optionsindex1].GLCID,
    //     YXDID: this.options1[this.SigningForm.optionsindex1].YXDID,
    //     changetype: this.changetype,
    //     contract_id: this.SigningForm.contractId
    //   }).then(response => {
    //     this.options3 = response
    //     this.SigningForm.optionsindex3 = ''
    //     this.SigningForm.optionsindex4 = ''

    //     this.SigningForm.buildId = ''
    //     this.SigningForm.roomId = ''
    //     this.SigningForm.roomName = ''
    //     this.options4 = []
    //   })
    // },
    changeoptions1(index) {
      optionsApi4({
        dbName: this.options1[this.SigningForm.optionsindex1].dbName,
        GLCID: this.options1[this.SigningForm.optionsindex1].GLCID,
        YXDID: this.options1[this.SigningForm.optionsindex1].YXDID,
        changetype: this.changetype,
        contract_id: this.SigningForm.contractId,
        contractEndDate: this.SigningForm.contractEndDate,
        contractStartDate: this.SigningForm.contractStartDate,
        resourcesId: this.SigningForm.resourcesId,
      }).then((response) => {
        this.options4 = response;
        this.SigningForm.optionsindex4 = "";

        this.SigningForm.roomId = "";
        this.SigningForm.roomName = "";
      });
    },
    changeoptions4(index) {
      this.$forceUpdate();
      this.SigningForm.roomId = this.options4[index].roomId;
      this.SigningForm.roomName = this.options4[index].FJDA_FJMC;
      this.SigningForm.constructionArea = this.options4[index].FJDA_JZMJ;
      this.SigningForm.rentableArea = parseFloat(
        this.options4[index].rentableArea
      );
      this.SigningForm.rentalArea =
        this.SigningForm.rentalArea > this.SigningForm.rentableArea
          ? this.SigningForm.rentableArea
          : this.SigningForm.rentalArea;
    },
    changeoptions5() {
      optionsApi8({
        chargeItem: this.SigningForm.chargeItem,
        id: this.plot_id,
      }).then((response) => {
        this.options6 = response;
        this.SigningForm.priceType = response[0].priceType;
        optionsApi6({
          chargeItem: this.SigningForm.chargeItem,
          priceType: this.SigningForm.priceType,
          id: this.plot_id,
        }).then((response) => {
          this.options7 = response;
          this.SigningForm.price = response[0].price;
          optionsApi7({
            chargeItem: this.SigningForm.chargeItem,
            priceType: this.SigningForm.priceType,
            price: this.SigningForm.price,
            id: this.plot_id,
          }).then((response) => {
            this.options8 = response;
            this.SigningForm.priceUnit = response[0].priceUnit;
          });
        });
      });
    },
    changeoptions6() {
      optionsApi6({
        chargeItem: this.SigningForm.chargeItem,
        priceType: this.SigningForm.priceType,
        id: this.plot_id,
      }).then((response) => {
        this.options7 = response;
        this.SigningForm.price = response[0].price;
        optionsApi7({
          chargeItem: this.SigningForm.chargeItem,
          priceType: this.SigningForm.priceType,
          price: this.SigningForm.price,
          id: this.plot_id,
        }).then((response) => {
          this.options8 = response;
          this.SigningForm.priceUnit = response[0].priceUnit;
        });
      });
    },
    changeoptions7() {
      optionsApi7({
        chargeItem: this.SigningForm.chargeItem,
        priceType: this.SigningForm.priceType,
        price: this.SigningForm.price,
        id: this.plot_id,
      }).then((response) => {
        this.options8 = response;
        this.SigningForm.priceUnit = response[0].priceUnit;
      });
    },
    //   判断新增，修改
    getSigningData(value, type, changetype) {
      this.changetype = changetype;
      var data = JSON.parse(JSON.stringify(value));
      this.options1 = [];
      this.options2 = [];
      this.options3 = [];
      this.options4 = [];
      this.options5 = [];
      this.options6 = [];
      this.options7 = [];
      this.options8 = [];
      if (type == 0) {
        this.title = "新增";
        this.plot_id = data.plotId;
        data = {
          contractEndDate: data.contractEndDate,
          contractStartDate: data.contractStartDate,
          contractId: data.contractId,
          plotId: data.plotId,
          resourcesId: "",
          optionsindex1: "",
          optionsindex2: "",
          optionsindex3: "",
          optionsindex4: "",
        };
        this.SigningForm = JSON.parse(JSON.stringify(data));
        this.getoptions1();
        this.getoptions5();
      }
      if (type == 1) {
        this.title = "复制";
        data.startTime = "";
        data.endTime = "";
        data.adjustmentIncreasingStart = "";
        data.adjustmentIncreasingCutoff = "";

        data.optionsindex1 = "";
        data.optionsindex2 = "";
        data.optionsindex3 = "";
        data.optionsindex4 = "";

        this.plot_id = data.plot_id;

        this.SigningForm = JSON.parse(JSON.stringify(data));
        this.getoptions1s();
        this.getoptions5s();
      }
      if (type == 2) {
        this.title = "修改";
        data.optionsindex1 = "";
        data.optionsindex2 = "";
        data.optionsindex3 = "";
        data.optionsindex4 = "";

        this.plot_id = data.plot_id;

        this.SigningForm = JSON.parse(JSON.stringify(data));
        this.getoptions1s();
        this.getoptions5s();
      }

      // queryRoom({
      //   plot_id: this.plot_id,
      //   contract_id: data.contractId
      // }).then(response => {
      //   this.options4 = response
      // })
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["SigningForm"].validate((valid) => {
        if (valid) {
          if (this.title === "修改") {
            updateAPI(_this.SigningForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            addClauseAPi(_this.SigningForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("update:Signingshow", false);
      this.$nextTick(() => {
        this.$refs.SigningForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.SigningDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.SigningDialog .el-input-number {
  width: 100%;
}

.SigningDialog .el-input-number input {
  text-align: left;
}
</style>
