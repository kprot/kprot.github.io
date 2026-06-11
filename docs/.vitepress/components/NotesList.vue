<script setup lang="ts">
import { computed } from 'vue'
import { data as allNotes } from '../theme/notes.data'

const props = defineProps<{ limit?: number }>()
const notes = computed(() =>
  props.limit ? allNotes.slice(0, props.limit) : allNotes
)
</script>

<template>
  <div class="notes-feed">
    <article v-for="note of notes" :key="note.url" class="note-item">
      <time class="note-date">{{ note.date.string }}</time>
      <div class="note-body" v-html="note.html" />
    </article>
    <p v-if="notes.length === 0" class="note-empty">还没有碎念，很快就有。</p>
  </div>
</template>

<style scoped>
.notes-feed {
  margin: 2rem 0;
}
.note-item {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.note-item:last-child {
  border-bottom: none;
}
.note-date {
  display: block;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
  margin-bottom: 0.5rem;
}
.note-body :deep(p) {
  margin: 0.4rem 0;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}
.note-body :deep(p:first-child) {
  margin-top: 0;
}
.note-empty {
  color: var(--vp-c-text-3);
}
</style>
