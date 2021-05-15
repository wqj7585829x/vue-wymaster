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
        label-width="85px"
        :model="AccountForm"
        :rules="rules"
        ref="AccountForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="户帐名：" prop="accountName">
              <el-input v-model="AccountForm.accountName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="客户名称：" prop="TenantRelationID">
              <el-select
                v-model="AccountForm.TenantRelationID"
                :disabled="disabledCus"
                @change="cusChange"
                v-show="AccountForm.roomid"
              >
                <el-option
                  v-for="item in cusData"
                  :key="item.tenanId"
                  :label="item.cusName"
                  :value="item.tenanId"
                ></el-option>
              </el-select>
              <span class="TextColor" v-show="AccountForm.roomid == null">{{
                AccountForm.cusName
              }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="所属楼栋：">
              <span class="TextColor">{{ AccountForm.buildName }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="所属资源：">
              <span class="TextColor">{{ AccountForm.roomNo }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收费面积：">
              <span class="TextColor">{{ AccountForm.chargeArea }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="AccountForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findCusByRoomId,
  add,
  modify,
} from "@/api/PublicRepair/HouseholdAccountManage"; //js

export default {
  data() {
    return {
      visible: this.showAccount,
      title: "", //标题
      cusData: [], //客户名称 数组
      disabledCus: false, //修改 不能修改 客户名称
      AccountForm: {
        accountName: null, //新增 默认 房间名-客户名称-公维金户帐
        TenantRelationID: null,
        buildName: null,
        chargeArea: null,
        remark: null,
        roomid: null,
        roomNo: null,
        cusName: null,
        fundAccountID: null,
      },
      rules: {
        accountName: [
          { required: true, message: "请输入户帐名", trigger: "blur" },
        ],
        TenantRelationID: [
          { required: true, message: "请选择客户名称", trigger: "change" },
        ],
      },
    };
  },
  props: {
    showAccount: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showAccount() {
      this.visible = this.showAccount;
    },
  },
  methods: {
    //   判断建账，修改
    getAccountData(data, type) {
      this.AccountForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "建账";
        this.disabledCus = false;
        this.AccountForm.TenantRelationID = "";
        this.AccountForm.accountName = "";
      } else {
        this.title = "修改";
        this.disabledCus = true;
      }
      if (this.AccountForm.roomid) {
        this.findCusByRoomId();
      } else {
        this.rules.TenantRelationID[0].required = false;
      }
    },
    // 查询 客户
    findCusByRoomId() {
      findCusByRoomId(this.AccountForm.roomid).then((response) => {
        this.cusData = response.returnData;
        this.AccountForm.roomNo = this.cusData[0].roomNo;
        if (this.cusData.length == 1) {
          this.AccountForm.TenantRelationID = this.cusData[0].tenanId;
        }
        if (this.disabledCus == false) {
          this.cusChange();
        } else {
          for (var i = 0; i < this.cusData.length; i++) {
            if (this.AccountForm.cusName == this.cusData[i].cusName) {
              this.AccountForm.TenantRelationID = this.cusData[i].tenanId;
              break;
            }
          }
        }
      });
    },
    // 客户名称 变化
    cusChange() {
      if (this.AccountForm.TenantRelationID) {
        for (var i = 0; i < this.cusData.length; i++) {
          if (this.AccountForm.TenantRelationID == this.cusData[i].tenanId) {
            this.AccountForm.accountName =
              this.AccountForm.roomNo +
              "-" +
              this.cusData[i].cusName +
              "-" +
              "公维金户帐";
            break;
          }
        }
      } else {
        this.AccountForm.accountName =
          this.AccountForm.roomNo + "-" + "公维金户帐";
      }
    },
    //   新增/修改
    sure() {
      this.$refs.AccountForm.validate((valid) => {
        if (valid) {
          if (this.disabledCus) {
            //修改
            modify(this.AccountForm).then((response) => {
              var data = response.returnData[0];
              if (data.status) {
                this.$emit("RefreshItem");
                this.cancle();
              }
            });
          } else {
            //新增
            add(this.AccountForm).then((response) => {
              var data = response.returnData[0];
              if (data.status) {
                this.$emit("RefreshItem");
                this.cancle();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:showAccount", false);
      this.$nextTick(() => {
        this.$refs.AccountForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
