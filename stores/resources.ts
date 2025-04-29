import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getAllResources } from '~/shared/api/data';

export const useResourceStore = defineStore('resource', () => {
  const config = useRuntimeConfig();
  const resources = ref<{ id: string; title: string }[]>([]);

  const filtered = computed(() => resources.value.slice(0, 10));
  const count = computed(() => resources.value.length);

  function fetchResources() {
    return new Promise(async (resolve) => {
      resources.value = await getAllResources(config);
      resolve('fetched');
    });
  }

  return { resources, filtered, count, fetchResources }
})