  <template>
  <div class="main-view">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MainView',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView2.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss">
.main-view {
  box-sizing: border-box;
  background: #fff;
}
</style>
