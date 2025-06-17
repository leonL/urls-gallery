import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchResourceRows } from '~/shared/api/data';

export interface Resource { 
  id: number,
  enTitle: string,
  frTitle: string,
  languageId: string,
  linkEn: string,
  urlEn: string,
  linkFr: string,
  urlFr: string,
  geographicScopeId: string,
  pubId: string,
  contentTypeIds: Array<string>,
  organizationIds: Array<string>,
  issueIds: Array<string>,
  pubYear: number,
  pubMonth: number,
  pubDay: number
}

export const useResourceStore = defineStore('resource', () => {
  const resources = ref<Resource[]>([]);
  
  const count = computed(() => resources.value.length);
  
  const valid = computed(() => resources.value.filter((r) => isValid(r)) ); 
  const validCount = computed(() => valid.value.length);
  
  const filtered = computed(() => resources.value.slice(0, 10));

  function fetch() {
    return new Promise(async (resolve) => {
      const response = await fetchResourceRows();

      resources.value = response.map((r, id) => {
        const f = r.fields;
        const resource = {
          id, 
          enTitle: f['TITLE EN'],
          frTitle: f['TITLE FR'],
          languageId: getZeroIndexOrBlank(f['LANGUAGE ID']),
          linkEn: f['DOCUMENT EN'],
          urlEn: f['LINK EN'],
          linkFr: f['DOCUMENT FR'],
          urlFr: f['LINK FR'],
          geographicScopeId: getZeroIndexOrBlank(f['GEOGRAPHIC SCOPE ID']),
          pubId: getZeroIndexOrBlank(f['PUBLICATION ID']),
          contentTypeIds: f['CONTENT TYPE IDS'],
          organizationIds: f['ORGANIZATION IDS'],
          issueIds: f['ISSUE IDS'],
          pubYear: f['PUBLICATION YEAR'],
          pubMonth: f['PUBLICATION MONTH'],
          pubDay: f['PUBLICATION DAY']
        }
        return resource;
    });

      resolve('fetched');
    });
  }

  return { resources, count, valid, validCount, filtered, fetch }
})

function isValid(r: Resource) {
  let valid = hasField(r, 'pubYear') && hasField(r, 'languageId');
  if (valid && r.languageId === 'en' || r.languageId === 'both') {
    valid = hasField(r, 'linkEn') || hasField(r, 'urlEn');
  }
  if (valid && r.languageId === 'fr' || r.languageId === 'both') {
    valid = hasField(r, 'linkFr') || hasField(r, 'urlFr');
  }
  return valid;
}

function hasField(r: Resource, field: keyof Resource) {
  return r[field] !== undefined && r[field] !== '';
}

function getZeroIndexOrBlank(a: Array<string> | undefined) {
  let str = '';
  if (a !== undefined && a.length > 0) str = a[0];
  return str;
}