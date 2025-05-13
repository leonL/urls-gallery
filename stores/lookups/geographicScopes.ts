import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllRows } from '~/shared/api/data';

interface Lookup {
  id: string,
  en: string,
  fr: string
}

export const useGeoScopeStore = defineStore('geographicScopes', () => {
  const geographicScopes = ref<Lookup[]>([]);

  function fetch() {
    return new Promise(async (resolve) => {
      const response = await getAllRows('GEOGRAPHIC SCOPES');

      geographicScopes.value = response.map((record) => ({
        id: record.fields['ID'],
        en: record.fields['EN'],
        fr: record.fields['FR']
      }));

      resolve('fetched');
    });
  }

  function getNameById(id: string, locale: 'en' | 'fr' = 'en') {
    let name = undefined;
    const lookup = geographicScopes.value.find((item) => item.id === id);
    if (lookup !== undefined) name = lookup[locale];
    return name;
  }

  return { getNameById, fetch }
})