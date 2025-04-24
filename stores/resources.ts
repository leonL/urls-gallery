import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRuntimeConfig } from '#imports';

interface ApiRecord {
  id: string;
  fields: {
    'TITLE EN': string;
  };
}

interface ApiResponse {
  records: ApiRecord[];
}

export const useResourceStore = defineStore('resource', () => {
  const resources = ref<{ id: string; title: string }[]>([]);
  const error = ref<string | null>(null);

  const all = computed(() => resources.value);
  const filtered = computed(() => resources.value.slice(0, 10));
  const count = computed(() => resources.value.length);
  const loading = ref(false);

  function fetchResources() {
    const resourcesUrl = 'https://api.airtable.com/v0/app393cel1ZJ5Wi13/RESOURCES';
    const config = useRuntimeConfig();
    error.value = null;

    return new Promise(async (resolve) => {

      try {
        const response = await $fetch<ApiResponse>(resourcesUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${config.airtableApiKey}`
          }
        });
  
        resources.value = response.records.map((record) => ({
          id: record.id,
          title: record.fields['TITLE EN'],
        }));
      } catch (err) {
        error.value = (err as Error).message;
      } finally {
        resolve('fetched');
      }
    });
  }

  return { resources, all, filtered, fetchResources, count, loading, error }
})