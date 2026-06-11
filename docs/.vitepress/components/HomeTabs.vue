<script setup lang="ts">
import { ref } from 'vue'
import PostList from './PostList.vue'
import NotesList from './NotesList.vue'

const tab = ref<'posts' | 'notes'>('posts')
</script>

<template>
  <div class="home-tabs">
    <div class="tab-bar">
      <button :class="{ active: tab === 'posts' }" @click="tab = 'posts'">文章</button>
      <button :class="{ active: tab === 'notes' }" @click="tab = 'notes'">碎念</button>
    </div>
    <PostList v-if="tab === 'posts'" :limit="8" />
    <NotesList v-else :limit="8" />
  </div>
</template>

<style scoped>
.tab-bar {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-top: 1rem;
}
.tab-bar button {
  background: none;
  border: none;
  padding: 0.6rem 0.25rem;
  margin-bottom: -1px;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color 0.2s;
}
.tab-bar button:hover {
  color: var(--vp-c-text-1);
}
.tab-bar button.active {
  color: var(--vp-c-text-1);
  border-bottom-color: var(--vp-c-brand-1);
}
</style>
