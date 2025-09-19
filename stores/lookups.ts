import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchLookupRows, fetchLookupCategoryRows } from '~/shared/api/data';

interface Lookup {
  id: string,
  en: string,
  fr: string
}

interface LookupCategory {
  categoryId: string,
  en: string,
  fr: string,
  lookupIds: Array<string> 
}

interface LookupStore {
  [key: string]: Array<Lookup>
}

interface LookupCategoryStore {
  [key: string]: Array<LookupCategory>
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
  const lookupCategories = ref<LookupCategoryStore>({});

  const { locale } = useI18n();

  function fetch() {
    return new Promise(async (resolve) => {
      const lookupStore = lookups.value;
      const lookupCategoryStore = lookupCategories.value;

      const fetchRequests = Object.entries(apiPaths).map(async ([key, value]) => {
        const result = await fetchLookupFromPath(value);
        lookupStore[key] = result;
      });
      const issueCategoryFetch = fetchLookupCategoryFromPath('ISSUE CATEGORIES').then(result => {
        lookupCategoryStore.issues = result;
      });
      fetchRequests.push(issueCategoryFetch);

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

  function getAllCategoryLabels(store: string) {
    return lookupCategories.value[store].map(row => 
      ({ id: row.categoryId, name: row[locale.value], lookupIds: row.lookupIds })
    );
  }

  return { lookups, lookupCategories, getLabel, getLabels, getAllLabels, getAllCategoryLabels, fetch }
});

async function fetchLookupFromPath(table: string) {
  const rows = await fetchLookupRows(table);

  return rows.map((r) => ({
    id: r.fields['ID'],
    en: r.fields['EN'],
    fr: r.fields['FR']
  }));
}

async function fetchLookupCategoryFromPath(table: string) {
  const rows = await fetchLookupCategoryRows(table);

  return rows.map((r) => ({
    categoryId: r.fields['ID'],
    en: r.fields['EN'],
    fr: r.fields['FR'],
    lookupIds: r.fields['IDS']
  }));  
}