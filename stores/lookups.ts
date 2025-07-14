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
  issues: Array<LookupCategory>
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
  const lookupCategories = ref<LookupCategoryStore>({ issues: [] });

  function fetch() {
    return new Promise(async (resolve) => {
      const lookupStore = lookups.value;
      const lookupCategoryStore = lookupCategories.value;

      const fetchRequests = Object.entries(apiPaths).map(async ([key, value]) => {
        fetchLookupFromPath(value).then(result => lookupStore[key] = result);
      });
      const issueCategoryFetch = fetchLookupCategoryFromPath('ISSUE CATEGORIES').then(result => {
        lookupCategoryStore.issues = result;
      });
      fetchRequests.push(issueCategoryFetch);

      await Promise.all(fetchRequests);

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

  return { lookups, lookupCategories, getLabel, getLabels, getAllLabels, fetch }
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