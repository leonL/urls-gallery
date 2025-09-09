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

  const { locale } = useI18n();

  function fetch() {
    return new Promise(async (resolve) => {
      const lookupStore = lookups.value;

      const fetchRequests = Object.entries(apiPaths).map(async ([key, value]) => {
        fetchLookupFromPath(value).then(result => lookupStore[key] = result);
      });

      await Promise.all(fetchRequests);

      resolve('fetched');
    });
  }

  function getLabel(store: string, id: string) {
    let label = undefined;
    const lookup = lookups.value[store].find(row => row.id === id);
    if (lookup !== undefined) label = lookup[locale.value];
    return label;
  }

  function getLabels(store: string, ids: Array<string>) {
    return ids.map(id => getLabel(store, id));
  }

  function getAllLabels(store: string) {
    return lookups.value[store].map(row => ({ id: row.id, name: row[locale.value]}));
  }

  return { lookups, getLabel, getLabels, getAllLabels, fetch }
});

async function fetchLookupFromPath(table: string) {
  const rows = await fetchLookupRows(table);

  return rows.map((r) => ({
    id: r.fields['ID'],
    en: r.fields['EN'],
    fr: r.fields['FR']
  }));
}