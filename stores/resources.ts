import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchResourceRows } from '~/shared/api/data';

interface Resource { 
  id: number,
  enTitle: string,
  frTitle: string,
  geographicScopeId: string
}

export const useResourceStore = defineStore('resources', () => {
  const resources = ref<Resource[]>([]);

  const filtered = computed(() => resources.value.slice(0, 10));
  const count = computed(() => resources.value.length);

  function fetch() {
    return new Promise(async (resolve) => {
      const response = await fetchResourceRows();

      resources.value = response.map((record, id) => ({
        id, 
        enTitle: record.fields['TITLE EN'],
        frTitle: record.fields['TITLE FR'],
        geographicScopeId: record.fields['GEOGRAPHIC SCOPE ID'][0]
      }));

      resolve('fetched');
    });
  }

  return { resources, filtered, count, fetch }
})