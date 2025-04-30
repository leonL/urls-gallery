<script setup lang="ts">
  import { useResourceStore, useCategoryStore } from './stores/resources';
  
  const resourceStore = useResourceStore();
  const categoryStore = useCategoryStore();
  await callOnce('resources', () => resourceStore.fetch());
  await callOnce('categories', () => categoryStore.fetch());

</script>

<template>
  <div>
    <h1>{{ resourceStore.count }} Resources</h1>
    <ul>
      <li v-for="resource in resourceStore.filtered" :key="resource.id">
        <p>{{ resource.enTitle }}</p>
        <p>{{ categoryStore.getByTypeId('geographicScopes', resource.geographicScopeId, 'fr') }}</p>
      </li>
    </ul>
  </div>
</template>
