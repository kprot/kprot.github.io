<script setup lang="ts">
import { computed } from 'vue'
import { data as allPosts } from '../theme/posts.data'

const props = defineProps<{ limit?: number }>()
const posts = computed(() =>
  props.limit ? allPosts.slice(0, props.limit) : allPosts
)
</script>

<template>
  <ul class="post-list">
    <li v-for="post of posts" :key="post.url" class="post-item">
      <a :href="post.url" class="post-link">
        <span class="post-title">{{ post.title }}<span v-if="post.draft" class="post-draft-badge">草稿</span></span>
        <time class="post-date">{{ post.date.string }}</time>
      </a>
      <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p>
    </li>
    <li v-if="posts.length === 0" class="post-empty">还没有文章，很快就有。</li>
  </ul>
</template>

<style scoped>
.post-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}
.post-item {
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.post-item:last-child {
  border-bottom: none;
}
.post-link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  transition: color 0.2s;
}
.post-link:hover .post-title {
  color: var(--vp-c-brand-1);
}
.post-draft-badge {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0 0.4rem;
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 1.5;
  color: var(--vp-c-text-3);
  background: var(--vp-c-default-soft);
  border-radius: 4px;
  vertical-align: middle;
}
.post-date {
  flex-shrink: 0;
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}
.post-excerpt {
  margin: 0.5rem 0 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.post-empty {
  color: var(--vp-c-text-3);
  padding: 1rem 0;
}
@media (max-width: 560px) {
  .post-link {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
