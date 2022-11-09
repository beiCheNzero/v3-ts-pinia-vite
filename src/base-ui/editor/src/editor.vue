<template>
  <div class="ljl-editor" ref="editorRef"></div>
</template>

<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount, ref, reactive } from 'vue'

interface IProps {
  value: string
  zIndex: number
  height: number
  width: number
  focus: boolean
}
</script>

<style scoped lang="less">
.ljl-editor {
}
</style>
