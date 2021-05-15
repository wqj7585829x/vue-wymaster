<template>
  <div>
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="105px"
        :model="groupForm"
        :rules="rules"
        ref="groupForm"
      >
        <el-row>
          <el-col>
            <el-form-item label="分摊组名称：" prop="groupName">
              <el-input v-model="groupForm.groupName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="分摊组说明：">
              <el-input v-model="groupForm.groupCaption"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="groupForm.remark"></el-input>
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
import { add, modify } from "@/api/PublicRepair/ShareRelation"; //js

export default {
  data() {
    return {
      visible: this.showShareGroup,
      title: "", //标题
      groupForm: {
        belongPlot: null,
        partid: 0,
        buildid: 0,
        groupName: null,
        groupCaption: null,
        remark: null,
        groupID: null,
      },
      rules: {
        groupName: [
          { required: true, message: "请输入分摊组名称", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    showShareGroup: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showShareGroup() {
      this.visible = this.showShareGroup;
    },
  },
  methods: {
    //   判断新增，修改
    getShareGroupData(data, type) {
      this.groupForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "新增分摊组";
      } else {
        this.title = "修改分摊组";
      }
    },
    //   新增/修改
    sure() {
      this.$refs.groupForm.validate((valid) => {
        if (valid) {
          if (this.title == "新增分摊组") {
            add(this.groupForm).then((response) => {
              var data = response.returnData[0];
              if (data.status) {
                this.$emit("RefreshItem");
                this.cancle();
              }
            });
          } else {
            modify(this.groupForm).then((response) => {
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
      this.$emit("update:showShareGroup", false);
      this.$nextTick(() => {
        this.$refs.groupForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
