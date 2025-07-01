<script setup lang="ts">
  import { useResourceStore } from '~/stores/resources';
  
  const resourceStore = useResourceStore();

  const resourcesPerPage = 10;
  const currentPage = ref(1);
  const currentPageIndexRange = computed(() => {
    const rangeEnd = (resourcesPerPage * currentPage.value);
    const rangeStart = rangeEnd - resourcesPerPage;
    return [rangeStart, rangeEnd];
  });
  const paginatedResources = computed(() => resourceStore.valid.slice(...currentPageIndexRange.value));
  const currentPageResourceCount = computed(() => paginatedResources.value.length);
</script>

<template>
  <div>
    <span class='pagination-state'>
      {{ currentPageIndexRange[0] + 1 }} &#8211; {{ currentPageIndexRange[0] + currentPageResourceCount }}
      {{ $t('of') }} {{ resourceStore.validCount }} {{ $t('results') }}
    </span>
    <ul>
      <Resource v-for="resource in paginatedResources" 
        :key="resource.id" 
        :r="resource"
      />
    </ul>
    <div class="pagination-controls">
      <UPagination v-model:page="currentPage" :items-per-page="resourcesPerPage" :total="resourceStore.validCount" size="xs" />
    </div>
  </div>
</template>

<style scoped>
  ul {
    padding: 0;
  }
  
  .pagination-state {
    font-weight: bold;
    font-size: 18px;
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
</style>