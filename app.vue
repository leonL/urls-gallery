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
        <p>{{ lookupStore.getLabel('geoScopes', r.geographicScopeId, 'fr') }}</p>
        <p>{{ lookupStore.getLabel('languages', r.languageId) }}</p>
        <p>{{ lookupStore.getLabel('contentTypes', r.languageId) }}</p>
      </li>
    </ul>
  </div>
</template>
