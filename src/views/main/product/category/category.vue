<template>
  <div class="category">
    <pageSearch :searchConfig="searchConfig" />
    <pageContent :contentConfig="contentConfig" />
  </div>
</template>

<script lang="ts" setup>
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
</script>

<style scoped></style>
