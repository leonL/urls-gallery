import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getResources } from '~/shared/api/data';

export const useResourceStore = defineStore('resource', () => {
  const resources = ref<{ id: string; title: string }[]>([]);

  const all = computed(() => resources.value);
  const filtered = computed(() => resources.value.slice(0, 10));
  const count = computed(() => resources.value.length);

  function fetchResources() {

    return new Promise(async (resolve) => {
      const response = await getResources();

      resources.value = response.records.map((record) => ({
        id: record.id,
        title: record.fields['TITLE EN'],
      }));
      resolve('fetched');
    });
  }

  return { resources, all, filtered, fetchResources, count }
})