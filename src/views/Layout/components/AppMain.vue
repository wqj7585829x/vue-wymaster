<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- :include="cachedViews"  :include="['aa']"-->
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
    <div style="text-align: center">技术支持：厦门市众合百易科技有限公司</div>
  </section>
</template>
<script>
import { UserButton } from "@/api/User/User";
import { mapGetters } from "vuex";
export default {
  name: "AppMain",
  computed: {
    ...mapGetters(["visitedviews", "cachedViews"]),
    key() {
      //return this.$route.fullPath
      //return this.$route.name !== undefined? this.$route.name: this.$route + +new Date()
      return this.$route.fullPath;
      //return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    },
  },
  created() {},
  methods: {},
};
</script>
