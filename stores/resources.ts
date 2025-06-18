import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchResourceRows } from '~/shared/api/data';

export interface Resource { 
  id: number,
  languageId: string,
  title: {
    en: string;
    fr: string;
  },
  docUrl: {
    en: string;
    fr: string;
  },
  webUrl: {
    en: string;
    fr: string;
  },
  author: string,
  geographicScopeId: string,
  publicationId: string,
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
          languageId: getZeroIndexOrBlank(f['LANGUAGE ID']),
          title: {
            en: f['TITLE EN'],
            fr: f['TITLE FR']
          },
          docUrl: {
            en: getDocUrlOrBlank(f['DOCUMENT EN']),
            fr: getDocUrlOrBlank(f['DOCUMENT FR']),
          },
          webUrl: {
            en: f['LINK EN'],
            fr: f['LINK FR'],
          },
          author: f['AUTHOR'],
          geographicScopeId: getZeroIndexOrBlank(f['GEOGRAPHIC SCOPE ID']),
          publicationId: getZeroIndexOrBlank(f['PUBLICATION ID']),
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
  let valid = isNotBlank(r.pubYear) && isNotBlank(r.languageId);
  if (valid && (r.languageId === 'en' || r.languageId === 'both')) {
    valid = isNotBlank(r.docUrl.en) || isNotBlank(r.webUrl.en);
  }
  if (valid && (r.languageId === 'fr' || r.languageId === 'both')) {
    valid = isNotBlank(r.docUrl.fr) || isNotBlank(r.webUrl.fr);
  }
  return valid;
}

function isNotBlank(value: string | number) {
  return value !== undefined && value !== '';
}

function getDocUrlOrBlank(docData: Array<{url: string}> | undefined) {
  let url = '';
  if (docData !== undefined) url = docData[0].url;
  return url;
}

function getZeroIndexOrBlank(a: Array<string> | undefined) {
  let str = '';
  if (a !== undefined && a.length > 0) str = a[0];
  return str;
}