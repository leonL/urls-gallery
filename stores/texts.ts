import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchTextRows } from '~/shared/api/data';

interface Text {
  id: string,
  subtitle: string,
  aboutLibrary: string,
  aboutNbwc: string,
  aboutOpenCall: string
}

interface TextStore {
  [lang: string]: Text;
}

export const useTextStore = defineStore('text', () => {
  const texts = ref<TextStore>({})

  function getByType(type: keyof Text, lang: string = 'en') {
    return texts.value[lang][type];
  }

  function fetch() {
    return new Promise(async (resolve) => {
      const response = await fetchTextRows();

      response.forEach(r => {
        const f = r.fields;
        texts.value[f['ID'].toLowerCase()] = {
          id: r.id,
          subtitle: f['HOME:SUBTITLE'],
          aboutLibrary: f['ABOUT:LIBRARY'],
          aboutNbwc: f['ABOUT:NBWC'],
          aboutOpenCall: f['ABOUT:OPEN CALL']
        }
      });

      resolve('fetched');
    });
  }

  return { texts, fetch, getByType }
});