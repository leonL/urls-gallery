<script setup lang="ts">
  import type { Resource } from '~/stores/resources';
  import { useLookupStore } from '~/stores/lookups';

  const lookupStore = useLookupStore();
  
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

  const hasAuthor = computed(() => {
    return props.r.author !== undefined &&  props.r.author !== '';
  });

  const hasOrganizations = computed(() => {
    return props.r.organizationIds !== undefined &&  props.r.organizationIds.length > 0;
  });

  const organizations = computed(() => {
    const orgIds = props.r.organizationIds;
    const orgsArray = lookupStore.getLabels('organizations', orgIds, rLang.value);
    return orgsArray.join(", ");
  });

</script>

<template>
  <li class="resource">

    <h1 class="title">
      <a :href="url" target="_blank">{{ title }}</a>
      <span class="pdf" v-if="hasDocUrl">PDF</span>
    </h1>

     <div class="accreditation">
      <div>
        <span v-if="hasAuthor">{{ props.r.author }}</span>
        <span v-if="hasAuthor && hasOrganizations"> &#8226; </span>
        <span v-if="hasOrganizations">{{ organizations }}</span>
      </div>
    </div>
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