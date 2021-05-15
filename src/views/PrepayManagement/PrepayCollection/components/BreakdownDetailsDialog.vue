<template>
  <div class="BreakdownDetailsDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div class="detail">
        <el-table ref="singleTable2" max-height="200" :data="tableData">
          <el-table-column prop="check" label="选择是否可冲抵项目" width="130">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.check"
                @change="checkchange(scope.$index)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="FJID" label="房间" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="CDSX" label="冲抵顺序">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.CDSX"
                :precision="0"
                :step="1"
                :controls="false"
                :min="0"
                :disabled="!scope.row.check"
              >
              </el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryOffsetResources,
  updateOffsetResources,
} from "@/api/PrepayManagement/PrepayCollection";
export default {
  data() {
    return {
      visible: this.bshow,
      title: "冲抵指定资源编辑", //标题
      rules: {
        DLDA_DLID: [{ required: true, trigger: "blur" }],
      },
      tableData: [],
      YJYE_ZJ: "",
    };
  },
  props: {
    bshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    bshow() {
      this.visible = this.bshow;
    },
  },
  mounted() {},
  methods: {
    checkchange(index) {
      if (!this.tableData[index].check) {
        delete this.tableData[index].CDSX;
      }
    },
    //   判断新增，修改
    getReportData(data) {
      this.YJYE_ZJ = data.YJYE_ZJ;
      this.tableData = [];
      queryOffsetResources({
        YJYE_ZDFKGXC: data.YJYE_ZDFKGXC,
        YJYE_ZDFJIDC: data.YJYE_ZDFJIDC,
        YJYE_KHWJ: data.YJYE_KHWJ,
      }).then((response) => {
        var data = response.data;
        data.forEach((item) => {
          if (typeof item.CDSX == "number") {
            item.check = true;
          }
        });
        this.tableData = data;
      });
    },
    //   新增/修改分区
    sure() {
      var data = this.tableData;
      var arr = [];
      var CDSX = [];
      for (var i in data) {
        if (data[i].check) {
          arr.push(data[i]);
        }
      }
      for (var j in arr) {
        //查询每一笔数据的冲抵顺序，冲抵顺序有值时则记录起来，最后统计有值的笔数对比总比，如果值不对等则有冲抵顺序未填写。
        if (arr[j].CDSX != 0 && arr[j].CDSX != "" && arr[j].CDSX != undefined) {
          CDSX.push("1");
        }
      }
      if (arr.length == 0) {
        this.$message({
          message: "至少选择一笔才可以进行冲抵指定资源编辑！",
          type: "warning",
        });
        return;
      }
      if (arr.length != CDSX.length) {
        this.$message({
          message: "部分勾选的可冲抵项目未填写冲抵顺序！",
          type: "warning",
        });
        return;
      }
      for (var i = 1; i < arr.length; i++) {
        var preIndex = i - 1;
        var current = arr[i];
        while (preIndex >= 0 && arr[preIndex].CDSX > current.CDSX) {
          arr[preIndex + 1] = arr[preIndex];
          preIndex--;
        }
        arr[preIndex + 1] = current;
      }
      var FKGX_ZJ = [];
      var FJID = [];
      for (var k in arr) {
        FKGX_ZJ.push(arr[k].FKGX_ZJ);
        FJID.push(arr[k].FJID);
      }
      updateOffsetResources({
        YJYE_ZJ: this.YJYE_ZJ,
        FKGX_ZJ: FKGX_ZJ.join(","),
        FJID: FJID.join(","),
      }).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.$emit("RefreshItem");
          this.cancle();
        }
      });
    },
    cancle() {
      this.$emit("update:bshow", false);
    },
  },
};
</script>

<style>
.BreakdownDetailsDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.BreakdownDetailsDialog .el-input-number {
  width: 100%;
}

.BreakdownDetailsDialog .el-input-number input {
  text-align: left;
}

.BreakdownDetailsDialog .detail {
  padding: 0 10px;
}
</style>
