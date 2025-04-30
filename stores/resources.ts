import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getAllRows } from '~/shared/api/data';

interface StoreResource {
  id: number,
  enTitle: string,
  frTitle: string,
  geographicScopeId: string
}

export const useResourceStore = defineStore('resources', () => {
  const resources = ref<StoreResource[]>([]);

  const filtered = computed(() => resources.value.slice(0, 10));
  const count = computed(() => resources.value.length);

  function fetch() {
    return new Promise(async (resolve) => {
      const response = await getAllRows('RESOURCES', 'POST');

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

interface categoryLookup {
  id: string,
  en: string,
  fr: string
}

interface Categories {
  geographicScopes: categoryLookup[];
}

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Categories>({
    geographicScopes: []
  });
  

  function getByTypeId(type: keyof Categories, id: string, locale: 'en' | 'fr' = 'en') {
    let category = undefined;
    const lookup = categories.value[type].find((item) => item.id === id);
    if (lookup !== undefined) category = lookup[locale];
    return category;
  }

  function fetch() {
    return new Promise(async (resolve) => {
      const response = await getAllRows('GEOGRAPHIC SCOPES');

      categories.value.geographicScopes = response.map((record) => ({
        id: record.fields['ID'],
        en: record.fields['EN'],
        fr: record.fields['FR']
      }));

      resolve('fetched');
    });
  }

  return { getByTypeId, fetch }
})