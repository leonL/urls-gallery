<script setup lang="ts">
  import { useResourceStore } from '~/stores/resources';
  
  const resourceStore = useResourceStore();

  const page = ref(1);
  const pageSize = 10;
  const paginatedResources = computed(() => {
    const start = (page.value - 1) * pageSize;
    return resourceStore.valid.slice(start, start + pageSize);
  });
</script>

<template>
  <div>
    <ul>
      <Resource v-for="resource in paginatedResources" 
      :key="resource.id" 
      :r="resource"
      />
    </ul>
  </div>
  <UPagination v-model:page="page" :items-per-page="pageSize" :total="resourceStore.validCount" />
</template>
