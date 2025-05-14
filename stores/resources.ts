import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchResourceRows } from '~/shared/api/data';

interface Resource { 
  id: number,
  enTitle: string,
  frTitle: string,
  languageId: string,
  geographicScopeId: string,
  publicationId: string,
  contentTypeIds: Array<string>,
  organizationIds: Array<string>,
  issueIds: Array<string>
}

export const useResourceStore = defineStore('resource', () => {
  const resources = ref<Resource[]>([]);

  const filtered = computed(() => resources.value.slice(0, 10));
  const count = computed(() => resources.value.length);

  function fetch() {
    return new Promise(async (resolve) => {
      const response = await fetchResourceRows();

      resources.value = response.map((r, id) => ({
        id, 
        enTitle: r.fields['TITLE EN'],
        frTitle: r.fields['TITLE FR'],
        languageId: getZeroIndexOrBlank(r.fields['LANGUAGE ID']),
        geographicScopeId: getZeroIndexOrBlank(r.fields['GEOGRAPHIC SCOPE ID']),
        publicationId: getZeroIndexOrBlank(r.fields['PUBLICATION ID']),
        contentTypeIds: r.fields['CONTENT TYPE IDS'],
        organizationIds: r.fields['ORGANIZATION IDS'],
        issueIds: r.fields['ISSUE IDS']
      }));

      resolve('fetched');
    });
  }

  return { resources, filtered, count, fetch }
})

function getZeroIndexOrBlank(a: Array<string> | undefined) {
  let str = '';
  if (a !== undefined && a.length > 0) str = a[0];
  return str;
}