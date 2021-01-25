<template>
  <div class="header-bar clear-fix">
    <div class="header-right clear-fix">
      <FullScreen />

    </div>
  </div>
</template>

<script>
// import FoldSideMenu from '../../../components/FoldSideMenu'
// import BreadCrumbs from '../../../components/BreadCrumbs'
import FullScreen from './FullScreen/index'
// import LangSelect from '../../../components/LangSelect'
// import GitHubLink from '../../../components/GitHubLink'
// import UserAvatar from '../../../components/UserAvatar'

export default {
  components: {
    FullScreen,
  }
}
</script>

<style lang="scss">
  .header-bar {
    height: 32px;
    padding: 16px 20px;
    .header-right {
      float: right;
      width: 200px;
    }
  }
</style>
