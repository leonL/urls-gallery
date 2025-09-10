<script setup lang="ts">
  const sortedResources = useResourceSorter();

  const resourcesPerPage = 10;
  const currentPage = ref(1);
  const currentPageIndexRange = computed(() => {
    const rangeEnd = (resourcesPerPage * currentPage.value);
    const rangeStart = rangeEnd - resourcesPerPage;
    return [rangeStart, rangeEnd];
  });
  const paginatedResources = computed(() => sortedResources.value.slice(...currentPageIndexRange.value)); 
  const totalResourcesCount = computed(() => sortedResources.value.length);
  const currentPageResourceCount = computed(() => paginatedResources.value.length);
</script>

<template>
  <div>
    <div id="header">
      <span id='pagination-state'>
        {{ currentPageIndexRange[0] + 1 }} &#8211; {{ currentPageIndexRange[0] + currentPageResourceCount }}
        {{ $t('of') }} {{ totalResourcesCount }} {{ $t('results') }}
      </span>
      <SortOrderInput />
    </div>
    <ul>
      <Resource v-for="resource in paginatedResources" 
        :key="resource.id" 
        :r="resource"
      />
    </ul>
    <div id="pagination-controls">
      <UPagination v-model:page="currentPage" :items-per-page="resourcesPerPage" :total="totalResourcesCount" size="xs" />
    </div>
  </div>
</template>

<style scoped>
  ul {
    padding: 0;
  }
  
  #header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  #pagination-state {
    font-size: 18px;
    font-weight: bold;  
  }

  #pagination-controls {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
</style>