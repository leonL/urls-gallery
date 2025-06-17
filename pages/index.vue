<script setup lang="ts">
  import { useResourceStore } from '~/stores/resources';
  
  const resourceStore = useResourceStore();
</script>

<template>
  <div>
    <h1>{{ resourceStore.validCount }} Valid Resources</h1>
    <h5>{{ resourceStore.count }} Resources</h5>
    <ul>
      <Resource v-for="resource in resourceStore.valid" 
        :key="resource.id" 
        :r="resource"
      />
    </ul>
  </div>
</template>
