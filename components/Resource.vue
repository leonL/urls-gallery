<script setup lang="ts">
  import type { Resource } from '~/stores/resources';
  import { useLookupStore } from '~/stores/lookups';

  const lookupStore = useLookupStore();

  const props = defineProps<{
    r: Resource
  }>()

</script>

<template>
  <p>{{ r.enTitle }}</p>
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
  </ul>
</template>