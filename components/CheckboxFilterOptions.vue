<script setup lang="ts">
  import { useLookupStore } from '~/stores/lookups';
  import type { ResourceFilterState } from '~/composables/useResourcesFilter';

  const props = defineProps<{ 
    lookupId: string,
    filterId: keyof ResourceFilterState;
  }>();

  const { locale } = useI18n();
  const filterState = useResourcesFilter().filterState;
  const lookupStore = useLookupStore();

  const options = computed(() => {
    const labels = lookupStore.getAllLabels(props.lookupId, locale.value);
    return labels.map(label => ({ value: label.id.toLowerCase(), label: label.name }));
  });

</script>

<template>
  <div class="options">
    <label v-for="option in options" :key="option.value">
      <input type="checkbox" :id="option.value" :value="option.value" v-model="filterState[props.filterId]" />
      {{ option.label }}
    </label>
  </div>
</template>

<style scoped>
  label {
    display: flex;
    gap: 5px;
    align-items: flex-start;
    margin: 10px 0;
    color: black;
    font-size: 16px;
  }

  input[type='checkbox'] {
    position: relative;
    top: 2px;
  }
</style>