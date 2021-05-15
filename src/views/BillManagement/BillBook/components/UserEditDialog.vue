<template>
  <div class="UserEditDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div class="tree">
        <vuetree
          class="tree"
          :list.sync="ztreeDataList"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          :showCheckbox="true"
          :showInput="true"
        ></vuetree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryEmployeeTree } from "@/api/FeeManagement/BillManagement";
import vuetree from "@/components/Eltree/treeItem.vue";
export default {
  data() {
    return {
      visible: this.UserEditshow,
      title: "人员选择", //标题
      ztreeDataList: [],
      username: [],
    };
  },
  props: {
    UserEditshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    UserEditshow() {
      this.visible = this.UserEditshow;
    },
  },
  methods: {
    getTreeFun(val) {
      //获取资源树
      this.username = val.split(";");
      var _this = this;
      queryEmployeeTree().then((response) => {
        var data = response;
        if (data) {
          _this.ztreeDataList = data;
          var treeId = "";
          var reason = [];
          for (var j in data) {
            var list = data[j].children;
            for (var i in list) {
              var unit = list[i].children;
              for (var k in unit) {
                if (val.indexOf(unit[k].name) > -1) {
                  reason.push(unit[k].id);
                }
              }
            }
          }

          this.$nextTick(() => {
            this.$refs.dotree.clearSearch();
            this.$refs.dotree.setCheckedKeys(treeId, reason);
          });
        }
      });
    },
    //确认
    sure() {
      var data = this.$refs.dotree.getTreeCheckedNodes();
      var account = [];
      var value = [];
      var i = 0;
      //统计列表中使用人字段中各个使用人出现的次数-begin
      var lists = this.username;
      var listvalue = {};
      var listchose = [];
      for (var m in lists) {
        if (listchose.indexOf(lists[m]) == -1) {
          listchose.push(lists[m]);
          listvalue[lists[m]] = 1;
        } else {
          listvalue[lists[m]]++;
        }
      }
      //统计列表中使用人字段中各个使用人出现的次数-end

      //存储选中的使用人的名字和account-begin
      for (var item in data) {
        if (data[item].data.roleId) {
          if (data[item].data.roleId == "u") {
            account[i] = data[item].data.account;
            value[i] = data[item].data.name;
            i++;
          }
        }
      }
      //存储选中的使用人的名字和account-end

      //统计当前选中的使用人的名字出现的次数-begin
      var lists = this.username;
      var listvalues = {};
      var listchoses = [];
      for (var n in value) {
        if (listchoses.indexOf(value[n]) == -1) {
          listchoses.push(value[n]);
          listvalues[value[n]] = 1;
        } else {
          listvalues[value[n]]++;
        }
      }
      //统计当前选中的使用人的名字出现的次数-end

      //查看哪些是之前已经选择使用人被取消选择（对被选择过的使用人进行比较，对比原来使用人和当前选中出现次数是否一致，如果选中出现次数比原先使用人次数小则说明当前使用人被取消选择，则记录被取消的这个使用人名字。）-begin
      var deletelist = [];
      for (var index in listvalue) {
        if (listvalue[index] > listvalues[index]) {
          deletelist.push(index);
        }
      }
      //end

      //循环数组，删除已经被取消选择的使用人 - begin
      for (var k = value.length; k >= 0; k--) {
        if (deletelist.indexOf(value[k]) > -1) {
          value.splice(k, 1);
          account.splice(k, 1);
        }
      }
      //循环数组，删除已经被取消选择的使用人 - end

      account = account.join(";");
      value = value.join(";");
      this.$emit("getUser", account, value);
      this.cancle();
    },
    // 取消
    cancle() {
      this.$emit("update:UserEditshow", false);
    },
  },
  components: {
    vuetree,
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tree {
  height: 450px;
  overflow: auto;
}
.tree > div {
  margin-top: 0;
}
</style>
<style>
.UserDialog li {
  float: left;
  padding: 10px 15px;
  width: 88px;
}

.UserEditDialog .el-dialog__body {
  padding: 0;
}

.UserEditDialog .el-tree {
  padding-left: 20px;
}
</style>
