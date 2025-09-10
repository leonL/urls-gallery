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

  button#open-filter {
    margin-right: auto;
    margin-left: 10px;
    padding: 3px 6px 0 6px;
    border-radius: 10%;
    background-color: whitesmoke;
    border: 1px solid dimgrey;
  }

  #settings-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='red' d='M12 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L8.29 18.7a.99.99 0 0 1-.29-.83V12h-.03L2.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L12.03 12zm3 5h3v-3h2v3h3v2h-3v3h-2v-3h-3z'/%3E%3C/svg%3E");
  }
</style>