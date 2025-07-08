import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchLookupRows } from '~/shared/api/data';

interface Lookup {
  id: string,
  en: string,
  fr: string
}

interface LookupStore {
  [key: string]: Array<Lookup>
}

const apiPaths = {
  geoScopes: 'GEOGRAPHIC SCOPES',
  languages: 'LANGUAGES',
  contentTypes: 'CONTENT TYPES',
  organizations: 'ORGANIZATIONS',
  publications: 'PUBLICATIONS',
  issues: 'ISSUES'
}

export const useLookupStore = defineStore('lookup', () => {
  const lookups = ref<LookupStore>({});

  function fetch() {
    return new Promise(async (resolve) => {
      const store = lookups.value;

      await Promise.all(
        Object.entries(apiPaths).map(async ([key, value]) => {
          store[key] = await fetchFromPath(value);
        })
      );

      resolve('fetched');
    });
  }

  function getLabel(store: string, id: string, locale: 'en' | 'fr' = 'en') {
    let label = undefined;
    const lookup = lookups.value[store].find(row => row.id === id);
    if (lookup !== undefined) label = lookup[locale];
    return label;
  }

  function getLabels(store: string, ids: Array<string>, locale: 'en' | 'fr' = 'en') {
    return ids.map(id => getLabel(store, id, locale));
  }

  function getAllLabels(store: string, locale: 'en' | 'fr' = 'en') {
    return lookups.value[store].map(row => ({ id: row.id, name: row[locale]}));
  }

  return { lookups, getLabel, getLabels, getAllLabels, fetch }
});

async function fetchFromPath(table: string) {
  const rows = await fetchLookupRows(table);

  return rows.map((r) => ({
    id: r.fields['ID'],
    en: r.fields['EN'],
    fr: r.fields['FR']
  }));
}  