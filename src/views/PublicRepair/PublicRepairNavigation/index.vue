<template>
  <div class="container">
    <el-form>
      <el-row :gutter="30">
        <el-col :span="7" class="cursor">
          <img :src="image[0]" alt="" @click="navigationTo(0)" />
        </el-col>

        <el-col :span="1" class="arrow">
          <img :src="image[3]" alt="" />
        </el-col>

        <el-col :span="7" class="cursor">
          <img :src="image[1]" alt="" @click="navigationTo(1)" />
        </el-col>

        <el-col :span="1" class="arrow">
          <img :src="image[3]" alt="" />
        </el-col>

        <el-col :span="7" class="cursor">
          <img :src="image[2]" alt="" @click="navigationTo(2)" />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "PublicRepairNavigation",
  data() {
    return {
      image: [
        require("@/assets/repairImgs/1.png"),
        require("@/assets/repairImgs/2.png"),
        require("@/assets/repairImgs/3.png"),
        require("@/assets/repairImgs/arrow.png"),
      ],
    };
  },
  methods: {
    navigationTo(val) {
      switch (val) {
        case 0:
          if (
            sessionStorage
              .getItem("buttenpremissions")
              .indexOf("HAManageNav_has") > -1
          ) {
            this.$router.push({ path: "/PublicRepair/HouseholdAccountManage" });
          } else {
            this.$message({ message: "户帐管理无权限访问！" });
          }
          break;
        case 1:
          if (
            sessionStorage
              .getItem("buttenpremissions")
              .indexOf("ShareRelationNav_has") > -1
          ) {
            this.$router.push({ path: "/PublicRepair/ShareRelation" });
          } else {
            this.$message({ message: "分摊组户关系无权限访问！" });
          }
          break;
        case 2:
          if (
            sessionStorage
              .getItem("buttenpremissions")
              .indexOf("UseManageNav_has") > -1
          ) {
            this.$router.push({ path: "/PublicRepair/UseManage" });
          } else {
            this.$message({ message: "公维金使用管理无权限访问！" });
          }
          break;
      }
    },
  },
};
</script>
<style scoped>
.container {
  padding-top: 100px;
}
.arrow {
  position: relative;
  top: 95px;
}

.cursor {
  cursor: pointer;
}

.cursor:active {
  opacity: 0.6;
}
</style>
