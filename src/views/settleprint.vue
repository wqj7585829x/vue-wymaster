<template>
  <section class="settleprint">
    <el-button class="button" type="primary" @click="print">打印</el-button>
    <div id="subOutputRank-print">
      <img :src="imgdata" alt="" />
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      imgdata: "",
    };
  },
  mounted() {
    this.imgdata = sessionStorage.getItem("settleprint");
  },
  methods: {
    print() {
      this.$nextTick(() => {
        let subOutputRankPrint = document.getElementById("subOutputRank-print");
        console.log(subOutputRankPrint.innerHTML);
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.settleprint {
  text-align: center;
  position: relative;
  #subOutputRank-print {
    margin: 0 auto;
    width: 750px;
    img {
      width: 100%;
    }
  }
  .button {
    position: fixed;
    right: 10px;
    top: 10px;
  }
}
</style>

<style lang="scss">
.ReceiptBody {
  /* 打印css */
  @media print {
    /* 打印去掉页眉页脚 */
    @page {
      size: auto A4 landscape;
      margin: 3mm;
    }
  }
}
</style>
