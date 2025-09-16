<script setup lang="ts">
  import { useResourceStore } from './stores/resources';
  import { useLookupStore } from './stores/lookups';
  
  const resourceStore = useResourceStore();
  const lookupStore = useLookupStore();
  await callOnce('resources', () => resourceStore.fetch());
  await callOnce('categories', () => lookupStore.fetch());

</script>

<template>
  <div>
    <h1>{{ resourceStore.count }} Resources</h1>
    <ul>
      <li v-for="r in resourceStore.filtered" :key="r.id">
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
      </li>
    </ul>
  </div>
</template>
