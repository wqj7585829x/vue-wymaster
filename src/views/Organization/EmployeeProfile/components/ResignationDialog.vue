<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="离职"
      :visible.sync="visible"
      class="el-dialog-single"
      @close="$emit('update:resigShow', false)"
      :close-on-click-modal="false"
    >
      <el-form label-width="90px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="离职方式：">
              <el-select
                v-model="resignations.resignationWay"
                style="width: 100%"
              >
                <el-option label="辞职" :value="1"></el-option>
                <el-option label="辞退" :value="2"></el-option>
                <el-option label="退休" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="离职日期：">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="resignations.resignationDate"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="离职说明：">
              <el-input
                type="textarea"
                v-model="resignations.resignationEexplain"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureResignation()">确 定</el-button>
        <el-button @click="$emit('update:resigShow', false)">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Resignation } from "@/api/Organization/EmployeeProfile";
export default {
  data() {
    return {
      visible: this.resigShow,
      resignations: {
        //离职参数
        uid: null,
        resignationWay: null,
        resignationDate: null,
        resignationEexplain: null,
      },
    };
  },
  props: {
    resigShow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    resigShow() {
      this.visible = this.resigShow;
    },
  },
  methods: {
    getTableRow(data, uid) {
      this.resignations = data;
      this.resignations.uid = uid;
    },
    sureResignation() {
      Resignation(this.resignations).then((response) => {
        var data = response.returnData[0];
        if (data.status) {
          this.$emit("update:resigShow", false);
          this.$emit("RefreshItem");
        }
      });
    },
  },
};
</script>
<style scoped>
.el-date-editor.el-input {
  width: 100%;
}
</style>
