<script setup lang="ts">
  import { useLookupStore } from '~/stores/lookups';

  const props = defineProps<{ 
    categoryId: string,
    filterId: keyof Filter;
  }>();

  const lookupStore = useLookupStore();
  const filterState = useFilterState();
  const filter = filterState.filter;

  const categories = computed(() => {
    const categories = lookupStore.getAllCategoryLabels(props.categoryId);
    return categories.map(c => ({ id: c.id.toLowerCase(), label: c.name, filterIds: c.lookupIds }));
  });

  function getLabelForFilterId(id: string) {
    return lookupStore.getLabel(props.categoryId, id);
  }
</script>

<template>
  <details v-for="category in categories" :key="category.id" class="category">
    <summary>
      <h3 class="label">{{ category.label }}</h3>
      <Icon v-if="filterState.hasIssues(category.filterIds)" id='clear-button' 
        @click.prevent="filterState.removeIssues(category.filterIds)" name="mdi:filter-remove" />
    </summary>
    <div class="options">
      <label v-for="id in category.filterIds" :key="id">
        <input type="checkbox" :id="id" :value="id" v-model="filter[props.filterId]" />
        {{ getLabelForFilterId(id) }}
      </label>
    </div>
  </details>
</template>

<style scoped>
  details.category {
    margin: 10px 0;
  }
  
  .category > summary {
    list-style: none;
    position: relative;
    cursor: pointer;
    font-weight: bold;
  }
  
  .category .label {
    font-size: 15px;
    display: inline-block;
  }
  
  .category > summary::after {
    content: '+';
    position: absolute;
    right: 0;
  }
  .category[open] > summary::after {
    content: '–';
  }
  
  label {
    display: flex;
    gap: 5px;
    align-items: flex-start;
    margin: 10px 0;
    color: black;
    font-size: 14px;
  }

  input[type='checkbox'] {
    width: 12px;
    position: relative;
    top: 1px;
  }

  #clear-button {
    position: relative;
    left: 5px;
    top: 1px;
    font-size: smaller;
    color: palevioletred;
  }
</style>