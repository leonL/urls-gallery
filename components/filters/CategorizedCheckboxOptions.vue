<script setup lang="ts">
  import { useLookupStore } from '~/stores/lookups';

  const props = defineProps<{ 
    categoryId: string,
    filterId: keyof Filter;
  }>();

  const lookupStore = useLookupStore();
  const filterState = useFilterState();
  const { locale } = useI18n();

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
      <span class="label">{{ category.label }}</span>
    </summary>
    <div class="options">
      <label v-for="id in category.filterIds" :key="id">
        <input type="checkbox" :id="id" :value="id" v-model="filterState[props.filterId]" />
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
    font-weight: bold;
    display: flex;
    align-items: center; 
    justify-content: space-between;
    cursor: pointer;
  }
  
  .category .label {
    margin-right: 20%;
    font-size: 15px;
  }
  
  .category > summary::after {
    content: '+';
  }
  .category[open] > summary::after {
    content: '-';
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
</style>