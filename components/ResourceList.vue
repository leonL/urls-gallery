<script setup lang="ts">
  const { width } = useWindowSize();
  const isSmallScreen = computed(() => width.value < 800);

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
      <ClientOnly>
        <UModal title="Filters" v-if="isSmallScreen">
          <span id='filter-icon'></span>
          
          <template #content>
            <div id="filters-modal">
              <Filters />
            </div>
          </template>
        </UModal>
      </ClientOnly>
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

  #filters-modal {
    margin: 20px;
  }
  
  #filter-icon {
    margin-right: auto;
    margin-left: 10px;
    display: inline-block;
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M6 13h12v-2H6M3 6v2h18V6M10 18h4v-2h-4z'/%3E%3C/svg%3E");
    border: 1px solid black;
    border-radius: 10%;
  }
</style>