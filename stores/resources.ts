import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getAllRows } from '~/shared/api/data';

interface StoreResource {
  id: number,
  enTitle: string,
  frTitle: string
}

export const useResourceStore = defineStore('resource', () => {
  const resources = ref<StoreResource[]>([]);

  const filtered = computed(() => resources.value.slice(0, 10));
  const count = computed(() => resources.value.length);

  function fetchResources() {
    return new Promise(async (resolve) => {
      const response = await getAllRows('RESOURCES');

      resources.value = response.map((record, id) => ({
        id, 
        enTitle: record.fields['TITLE EN'],
        frTitle: record.fields['TITLE FR']
      }));

      resolve('fetched');
    });
  }

  return { resources, filtered, count, fetchResources }
})