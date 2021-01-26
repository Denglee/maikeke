<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="renderTag(to)">
    <slot />
  </component>
</template>

<script>
// import { isExternal } from '@/assets/js/utils/validate'
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
     isExternal(path) {
        // console.log(path);
        return /^(https?:|mailto:|tel:)/.test(path)
     },
    renderTag(url) {
      if (this.isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
