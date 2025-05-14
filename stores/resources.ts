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
        languageId: r.fields['LANGUAGE ID'][0],
        geographicScopeId: r.fields['GEOGRAPHIC SCOPE ID'][0],
        publicationId: r.fields['PUBLICATION ID'][0],
        contentTypeIds: r.fields['CONTENT TYPE IDS'],
        organizationIds: r.fields['ORGANIZATION IDS'],
        issueIds: r.fields['ISSUE IDS']
      }));

      resolve('fetched');
    });
  }

  return { resources, filtered, count, fetch }
})