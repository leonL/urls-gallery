import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchLookupRows } from '~/shared/api/data';
import { lookupNameInStore, mapRowsToLookupStore, type Lookup } from './base';

export const useGeoScopeLookupStore = defineStore('geographicScopes', () => {
  const geographicScopes = ref<Lookup[]>([]);

  function fetch() {
    return new Promise(async (resolve) => {
      const rows = await fetchLookupRows('GEOGRAPHIC SCOPES');

      geographicScopes.value = mapRowsToLookupStore(rows);

      resolve('fetched');
    });
  }

  function getNameById(id: string, locale: 'en' | 'fr' = 'en') {
    return lookupNameInStore(geographicScopes.value, id, locale);
  }

  return { getNameById, fetch }
})