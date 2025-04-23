import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useResourceStore = defineStore('resource', () => {
  const resources = ref([]);

  const all = computed(() => resources);
  const filtered = computed(() => resources.value.slice(0, 10));

  function fetch() {
    // implementation
    return null;
  }

  return { all, filtered, fetch }
})