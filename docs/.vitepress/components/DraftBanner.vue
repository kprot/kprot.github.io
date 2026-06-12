<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = useData()
const isDev = import.meta.env.DEV
</script>

<template>
  <div v-if="isDev && frontmatter.draft" class="draft-banner">
    草稿 · 仅本地可见，不会发布到线上
  </div>
</template>

<style scoped>
.draft-banner {
  margin: 0 0 1.5rem;
  padding: 0.5rem 0.9rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-default-soft);
  border-left: 3px solid var(--vp-c-text-3);
  border-radius: 4px;
}
</style>
