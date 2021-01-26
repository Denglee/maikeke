<template>
  <el-tag class="tag-item-wrapper" :closable="!fixed" @close.prevent.stop="closeItem">
    <span class="tag-item-dot" />
    <slot />
  </el-tag>
</template>

<script>

export default {
  name: 'TagItem',
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeItem() {
      this.$emit('on-close')
    }
  }
}
</script>

