<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="充值"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :model="rechargeForm"
        :rules="rules"
        ref="rechargeForm"
      >
        <el-row>
          <el-col>
            <el-form-item label="客户名称：">
              <span class="TextColor">{{ rechargeForm.cusName }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="所属资源：">
              <span class="TextColor">{{ rechargeForm.roomNo }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="所属楼栋：">
              <span class="TextColor">{{ rechargeForm.buildName }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="充值金额：" prop="money">
              <el-input v-model="rechargeForm.money"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="备注：">
              <el-input
                type="textarea"
                v-model="rechargeForm.remark"
              ></el-input>
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
import { Recharge } from "@/api/PublicRepair/HouseholdAccountManage"; //js
import { number } from "@/utils/validate.js";

export default {
  data() {
    return {
      visible: this.showRecharge,
      title: "", //标题
      rechargeForm: {
        cusName: null,
        roomNo: null,
        buildName: null,
        money: null,
        remark: null,
        fundAccountID: null,
      },
      rules: {
        money: [
          { required: true, message: "请输入充值金额", trigger: "blur" },
          { validator: number, trigger: "blur" },
        ],
      },
    };
  },
  props: {
    showRecharge: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showRecharge() {
      this.visible = this.showRecharge;
    },
  },
  methods: {
    // 判断新增，修改
    getRechargeData(data) {
      this.rechargeForm = JSON.parse(JSON.stringify(data));
      this.rechargeForm.remark = null;
    },
    // 充值
    sure() {
      this.$refs.rechargeForm.validate((valid) => {
        if (valid) {
          Recharge(this.rechargeForm).then((response) => {
            var data = response.returnData[0];
            if (data.status) {
              this.$emit("RefreshItem");
              this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:showRecharge", false);
      this.$nextTick(() => {
        this.$refs.rechargeForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
