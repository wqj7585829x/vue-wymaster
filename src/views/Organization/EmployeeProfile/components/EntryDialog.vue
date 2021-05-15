<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        :label-position="labelPosition"
        label-width="85px"
        :model="tableRow"
        ref="tableForm"
        :rules="sureRules"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="姓名：" prop="empName">
              <el-input type="text" v-model="tableRow.empName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="性别：" prop="sex">
              <el-select v-model="tableRow.sex" placeholder="请选择性别">
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="生日：" prop="birthday">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="tableRow.birthday"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="籍贯：" prop="birthplace">
              <el-input type="text" v-model="tableRow.birthplace"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="邮箱：" prop="mailbox">
              <el-input v-model="tableRow.mailbox"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="身份证号：" prop="IDNumber">
              <el-input v-model="tableRow.IDNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="手机号：" prop="contactWay">
              <el-input v-model="tableRow.contactWay"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:">
              <el-input type="textarea" v-model="tableRow.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="line-btm"></el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="登录账号：" prop="account">
              <el-input type="text" v-model="tableRow.account"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="密码：" prop="password">
              <el-input
                type="password"
                v-model="tableRow.password"
                :placeholder="Placeholder"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="账号状态：" prop="status">
              <el-radio-group v-model="tableRow.status">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="line-btm"></el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="职位：" prop="empJob">
              <el-select v-model="tableRow.empJob" placeholder="请选择">
                <el-option
                  v-for="item in getJobData"
                  :label="item.jobTitle"
                  :value="item.sysId"
                  :key="item.sysId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="职务：" prop="empPost">
              <el-input v-model="tableRow.empPost"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="入职日期：" prop="entryDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="tableRow.entryDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          :gutter="50"
          class="el-row-line-top"
          v-show="showResignationWay"
        >
          <el-col :span="12">
            <el-form-item label="离职方式：" prop="resignationWay">
              <el-input
                v-model="tableRow.resignationWay"
                :disabled="ReadonlyShow"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="离职日期：" prop="resignationDate">
              <el-input
                type="text"
                v-model="tableRow.resignationDate"
                :disabled="ReadonlyShow"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" v-show="showResignationWay">
          <el-col :span="12">
            <el-form-item label="离职说明：" prop="resignationEexplain">
              <el-input
                type="text"
                v-model="tableRow.resignationEexplain"
                :disabled="ReadonlyShow"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureEntry">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { AddEntry, UpdateEntry } from "@/api/Organization/EmployeeProfile";
import {
  onlymailbox,
  onlyphonenomust,
  onlyidentitycard,
} from "@/utils/validate.js";
export default {
  data() {
    return {
      title: "", //标题
      visible: this.entryShow,
      labelPosition: "left",
      radio: 1,
      OperType: 0, //0 新增  1修改,
      tableRow: {},
      showResignationWay: false, //是否显示离职状态,
      ReadonlyShow: true, //输入框只读
      Placeholder: "",
      sureRules: {
        empName: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
        ],
        mailbox: [{ validator: onlymailbox, trigger: "blur" }],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change",
          },
        ],
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change",
          },
        ],
        empJob: [
          {
            required: true,
            message: "请选择职位",
            trigger: "change",
          },
        ],
        contactWay: [{ validator: onlyphonenomust, trigger: "blur" }],
        IDNumber: [{ validator: onlyidentitycard, trigger: "blur" }],
      },
    };
  },
  props: {
    entryShow: {
      type: Boolean,
      default: false,
    },
    getJobData: {
      type: Array,
    },
    getTreeObj: {
      type: Object,
      default: {},
    },
  },
  watch: {
    entryShow() {
      this.visible = this.entryShow;
    },
  },
  computed: {},
  methods: {
    getTableRow(data, type) {
      var _this = this;
      this.OperType = type;
      let newData = JSON.parse(JSON.stringify(data));
      this.tableRow = newData;
      if (this.OperType == 0) {
        this.sureRules.password = [
          { required: true, message: "请输入密码", trigger: "change" },
        ];
        this.title = "入职";
        this.tableRow.status = 1;
        this.showResignationWay = false;
        this.Placeholder = "";
      } else {
        this.sureRules.password = "";
        this.Placeholder = "******";
        this.title = "修改";
        //在职情况不显示
        if (data.resignationWay != 0) {
          this.showResignationWay = true;
          if (data.resignationWay == 1) {
            this.$set(this.tableRow, "resignationWay", "辞职");
          } else if (data.resignationWay == 2) {
            this.$set(this.tableRow, "resignationWay", "辞退");
          } else {
            this.$set(this.tableRow, "resignationWay", "退休");
          }
        }
      }
    },
    sureEntry() {
      //agencyType 1集团  2公司 3小区  4部门

      /***新增才需要传 树形机构类型及机构ID */
      if (this.OperType == 0) {
        if (this.getTreeObj.agencyType == 1) {
          this.tableRow.belongClique = this.getTreeObj.orgId;
          this.tableRow.agencyType = 1;
        } else if (this.getTreeObj.agencyType == 2) {
          this.tableRow.belongComp = this.getTreeObj.orgId;
          this.tableRow.agencyType = 2;
        } else if (this.getTreeObj.agencyType == 3) {
          this.tableRow.belongPlot = this.getTreeObj.orgId;
          this.tableRow.agencyType = 3;
        } else {
          this.tableRow.belongDep = this.getTreeObj.orgId;
          this.tableRow.agencyType = 4;
        }
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            AddEntry(this.tableRow).then((response) => {
              this.loading = false;
              var data = response.returnData[0];
              if (data.status) {
                let newobj = JSON.parse(JSON.stringify(this.tableRow));
                this.$emit("RefreshItem", newobj);
                this.cancle();
              }
            });
          } else {
            return false;
          }
        });
      } else {
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            UpdateEntry(this.tableRow).then((response) => {
              this.loading = false;
              var data = response.returnData[0];
              if (data.status) {
                let newobj = JSON.parse(JSON.stringify(this.tableRow));
                this.$emit("RefreshItem", newobj);
                this.cancle();
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    cancle() {
      this.$emit("update:entryShow", false);
      this.$nextTick(() => {
        this.$refs.tableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style lang="scss">
.line-btm {
  border-top: 1px solid #eeeeee;
  margin-bottom: 20px;
}
</style>
