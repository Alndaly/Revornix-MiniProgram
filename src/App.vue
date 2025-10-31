<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch((options) => {
  console.log("App Launch", options);
  if (options?.scene == 1173) {
    uni.navigateTo({
      url: `/pages/document/create/index?category=1&url=${options.forwardMaterials[0].path}`,
    })
  }
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "@/global.scss";
</style>
