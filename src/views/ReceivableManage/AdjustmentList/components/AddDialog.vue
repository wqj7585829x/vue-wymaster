<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible="dialogFormVisible"
    @close="cancelForm"
    :close-on-click-modal="false"
    class="el-dialog-single"
  >
    <el-form
      label-width="120px"
      :model="formList"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="楼栋名称：" prop="YSLB_LDWJ">
            <el-select
              v-model="formList.YSLB_LDWJ"
              placeholder="请选择"
              @change="BuildChange"
              :disabled="OperType == 1"
              clearable
            >
              <el-option
                v-for="item in BuildArray"
                :key="item.YSLB_LDWJ"
                :label="item.YSLB_LDMC"
                :value="item.YSLB_LDWJ"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="资源名称：" prop="YSLB_ZYWJ">
            <el-select
              v-model="formList.YSLB_ZYWJ"
              placeholder="请选择"
              :disabled="
                formList.YSLB_LDWJ == undefined ||
                formList.YSLB_LDWJ == '' ||
                OperType == 1
              "
              clearable
            >
              <el-option
                v-for="item in RoomArray"
                :key="item.YSLB_ZYWJ"
                :label="item.YSLB_ZYMC"
                :value="item.YSLB_ZYWJ"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="收费项目：" prop="YSLB_SFXMWJ">
            <el-select
              v-model="formList.YSLB_SFXMWJ"
              :disabled="OperType == 1"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in ChargeItemsArray"
                :key="item.YSLB_SFXMWJ"
                :label="item.YSLB_SFXMMC"
                :value="item.YSLB_SFXMWJ"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="金额（含税）：" prop="YSLB_JEHS">
            <el-input-number
              v-model="formList.YSLB_JEHS"
              :min="0"
              :controls="false"
              style="width: 100%"
            ></el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="费用所属年月：" prop="YSLB_FYSSNY">
            <el-date-picker
              v-model="formList.YSLB_FYSSNY"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              placeholder="请选择"
              style="width: 100%"
              :disabled="OperType == 1"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="调整说明：" prop="YSLB_TZSM">
            <el-input
              v-model="formList.YSLB_TZSM"
              type="textarea"
              placeholder="请选择"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm()">确 定</el-button>
      <el-button @click="cancelForm()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  BuildArrayListApi,
  RoomArrayListApi,
  ChargeItemsArrayListApi,
  addApi,
  editApi,
} from "@/api/ReceivableManage/AdjustmentList";
export default {
  props: ["showdialog"],
  watch: {
    showdialog() {
      this.dialogFormVisible = this.showdialog;
    },
    "formList.YSLB_LDWJ"() {
      if (
        this.formList.YSLB_LDWJ == "" ||
        this.formList.YSLB_LDWJ == undefined
      ) {
        this.formList.YSLB_ZYWJ = "";
      }
    },
  },
  data() {
    return {
      title: "",
      dialogFormVisible: this.showdialog,
      OperType: 0, //0 新增  1修改
      formList: {},
      BuildArray: [],
      RoomArray: [],
      ChargeItemsArray: [],
      rules: {
        YSLB_LDWJ: [{ required: true, message: "", trigger: "blur" }],
        YSLB_ZYWJ: [{ required: true, message: "", trigger: "blur" }],
        YSLB_SFXMWJ: [{ required: true, message: "", trigger: "blur" }],
        SFXM_ZJ: [{ required: true, message: "", trigger: "blur" }],
        YSLB_JEHS: [{ required: true, message: "", trigger: "blur" }],
        YSLB_FYSSNY: [{ required: true, message: "", trigger: "blur" }],
      },
    };
  },
  methods: {
    getTableRow(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      // console.log(newRowData)
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.BuildArrayList(); //楼栋名称
      this.ChargeItemsArrayList(); //收费项目
      this.OperType = type;
      if (this.OperType == 0) {
        //0：新增  1：修改
        this.title = "新增";
      } else {
        this.title = "修改";
      }
    },
    BuildArrayList() {
      //楼栋名称
      BuildArrayListApi().then((response) => {
        if (response) {
          this.BuildArray = response;
          this.BuildArray.forEach((item) => {
            this.$set(item, "YSLB_LDWJ", item.DLDA_ZJ);
            this.$set(item, "YSLB_LDMC", item.DLDA_DLMC);
          });
          if (this.formList.YSLB_LDWJ) {
            //如果楼栋主键有值，则查询房间名称
            this.BuildChange();
          }
        }
      });
    },
    BuildChange() {
      this.formList.DLDA_ZJ = this.formList.YSLB_LDWJ;
      RoomArrayListApi(this.formList).then((response) => {
        if (response) {
          this.RoomArray = response;
          this.RoomArray.forEach((item) => {
            this.$set(item, "YSLB_ZYWJ", item.FJDA_ZJ);
            this.$set(item, "YSLB_ZYMC", item.FJDA_FJMC);
            this.$set(item, "YSLB_ZYDM", item.FJDA_FJID);
            this.$set(item, "YSLB_SFMJ", item.FJDA_SFMJ);
          });
        }
      });
    },
    ChargeItemsArrayList() {
      ChargeItemsArrayListApi().then((response) => {
        if (response) {
          this.ChargeItemsArray = response;
          this.ChargeItemsArray.forEach((item) => {
            this.$set(item, "YSLB_SFXMWJ", item.SFXM_ZJ);
            this.$set(item, "YSLB_SFXMMC", item.SFXM_SFXMMC);
            this.$set(item, "YSLB_SL", item.SFXM_SL);
          });
        }
      });
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.BuildArray.forEach((item) => {
            if (this.formList.YSLB_LDWJ == item.YSLB_LDWJ) {
              this.formList.YSLB_LDMC = item.YSLB_LDMC;
            }
          });
          this.RoomArray.forEach((item) => {
            if (this.formList.YSLB_ZYWJ == item.YSLB_ZYWJ) {
              this.formList.YSLB_ZYMC = item.YSLB_ZYMC;
              this.formList.YSLB_ZYDM = item.YSLB_ZYDM;
              this.formList.FJDA_FJMC = item.FJDA_FJMC;
              this.formList.YSLB_SFMJ = item.YSLB_SFMJ;
            }
          });
          this.ChargeItemsArray.forEach((item) => {
            if (this.formList.YSLB_SFXMWJ == item.YSLB_SFXMWJ) {
              this.formList.YSLB_SFXMMC = item.YSLB_SFXMMC;
              this.formList.YSLB_SL = item.YSLB_SL;
            }
          });
          if (this.OperType == 0) {
            addApi(this.formList).then((response) => {
              //修改
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj); //确定后发送$emit绑定父数据
                this.cancelForm();
              }
            });
          } else {
            editApi(this.formList).then((response) => {
              //修改
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(this.formList));
                this.$emit("RefreshItem", newobj); //确定后发送$emit绑定父数据
                this.cancelForm();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancelForm() {
      //取消关闭
      this.$emit("update:showdialog", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
