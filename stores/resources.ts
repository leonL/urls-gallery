import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchResourceRows } from '~/shared/api/data';

interface Resource { 
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
  
  const valid = computed(() => {
    let valid = resources.value;
    valid = valid.filter((r) => r.languageId !== '');
    valid = valid.filter((r) => r.pubYear !== undefined);
    valid = valid.filter((r) => {
      return (r.languageId === 'en' || r.languageId === 'both') ? r.linkEn !== undefined || r.urlEn !== undefined : true;
    });
    valid = valid.filter((r) => {
      return (r.languageId === 'fr' || r.languageId === 'both') ? r.linkFr !== undefined || r.urlFr !== undefined : true;
    });
    return valid;
  }); 
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

function getZeroIndexOrBlank(a: Array<string> | undefined) {
  let str = '';
  if (a !== undefined && a.length > 0) str = a[0];
  return str;
}