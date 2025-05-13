<script setup lang="ts">
  import { useResourceStore } from './stores/resources';
  import { useGeoScopeLookupStore } from './stores/lookups/geographicScopes';
  
  const resourceStore = useResourceStore();
  const geoScopeLookup = useGeoScopeLookupStore();
  await callOnce('resources', () => resourceStore.fetch());
  await callOnce('categories', () => geoScopeLookup.fetch());

</script>

<template>
  <div>
    <h1>{{ resourceStore.count }} Resources</h1>
    <ul>
      <li v-for="r in resourceStore.filtered" :key="r.id">
        <p>{{ r.enTitle }}</p>
        <p>{{ geoScopeLookup.getNameById(r.geographicScopeId, 'fr') }}</p>
      </li>
    </ul>
  </div>
</template>
