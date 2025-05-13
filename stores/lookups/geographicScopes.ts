import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllRows } from '~/shared/api/data';
import { lookupNameInStore, mapRowsToLookupStore, type Lookup } from './base';

export const useGeoScopeLookupStore = defineStore('geographicScopes', () => {
  const geographicScopes = ref<Lookup[]>([]);

  function fetch() {
    return new Promise(async (resolve) => {
      const rows = await getAllRows('GEOGRAPHIC SCOPES');

      geographicScopes.value = mapRowsToLookupStore(rows);

      resolve('fetched');
    });
  }

  function getNameById(id: string, locale: 'en' | 'fr' = 'en') {
    return lookupNameInStore(geographicScopes.value, id, locale);
  }

  return { getNameById, fetch }
})