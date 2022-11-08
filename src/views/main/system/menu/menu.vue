<template>
  <div class="menu">
    <pageContent :content-config="contentConfig" />
  </div>
</template>

<script lang="ts" setup>
import pageContent from '@/components/page-content'
import contentConfig from './config/content.config'
</script>

<style scoped></style>
