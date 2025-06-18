<script setup lang="ts">
  import type { Resource } from '~/stores/resources';
  import { useLookupStore } from '~/stores/lookups';
  
  const props = defineProps<{
    r: Resource
  }>();

  const { locale } = useI18n();
  
  const hasTranslation = computed(() => {
    return props.r.languageId === 'both';
  });

  const rLang = computed(() => {
    return hasTranslation.value ? locale.value : props.r.languageId as 'en' | 'fr';
  });

  const title = computed(() => {
    return props.r.title[rLang.value];
  });

  const hasDocUrl = computed(() => {
    const docUrl = props.r.docUrl[rLang.value];
    return docUrl !== '';
  });

  const url = computed(() => {
    const url = hasDocUrl.value ? props.r.docUrl[rLang.value] : props.r.webUrl[rLang.value];
    return url;
  });

  // const lookupStore = useLookupStore();

</script>

<template>
  <li class="resource">

    <h1 class="title">
      <a :href="url" target="_blank">{{ title }}</a>
      <span class="pdf" v-if="hasDocUrl">PDF</span>
    </h1>

  </li>
</template>
  
  <!-- <p></p>
  <p>{{ r.pubYear }}</p>
  <p>{{ lookupStore.getLabel('geoScopes', r.geographicScopeId, 'fr') }}</p>
  <p>{{ lookupStore.getLabel('languages', r.languageId) }}</p>
  <p>{{ lookupStore.getLabel('contentTypes', r.languageId) }}</p>
  <ul>
    <h5>content types (english)</h5>
    <li v-for="cTypeId in r.contentTypeIds" :key="cTypeId">
      <p>{{ lookupStore.getLabel('contentTypes', cTypeId) }}</p>
    </li>
    <h5>content types (francais)</h5>
    <li v-for="cTypeId in r.contentTypeIds" :key="cTypeId">
      <p>{{ lookupStore.getLabel('contentTypes', cTypeId, 'fr') }}</p>
    </li>
  </ul> -->