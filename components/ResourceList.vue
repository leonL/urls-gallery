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
      <ClientOnly>
        <UModal title="Filters" v-if="isSmallScreen">
          <button id="open-filter">
            <span id="settings-icon"></span>
          </button>
          
          <template #content>
            <div id="filters-modal">
              <Filters />
            </div>
          </template>
        </UModal>
      </ClientOnly>
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
    margin-right: auto;
    margin-left: 5px;
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

  button#open-filter {
    padding: 3px 6px 0 6px;
    border-radius: 10%;
    background-color: ghostwhite;
    border: 1px solid red;
  }

  #settings-icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='darkred' d='M3.46 5c-.21 0-.42.08-.59.21c-.44.34-.52.97-.18 1.4v.01L8 13.42v5.99l2.29 2.3c.39.39 1.03.39 1.42 0s.39-1.03 0-1.42L10 18.59v-5.86L4.27 5.39A1.01 1.01 0 0 0 3.46 5M16 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.99.99 0 0 1-.29-.83V12h-.03L6.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L16.03 12z'/%3E%3C/svg%3E");
  }
</style>