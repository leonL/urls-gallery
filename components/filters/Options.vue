<script setup lang="ts">
  import { useLookupStore } from '~/stores/lookups';
  import type { Filter } from '~/composables/useFilterState';

  const props = withDefaults(defineProps<{ 
    lookupId: string,
    filterId: keyof Filter;
    isRadio?: boolean
  }>(), {
    isRadio: false
  });

  const lookupStore = useLookupStore();
  const filterState = useFilterState();
  const filter = filterState.filter;

  const options = computed(() => {
    const labels = lookupStore.getAllLabels(props.lookupId);
    return labels.map(label => ({ value: label.id.toLowerCase(), label: label.name }));
  });

  const inputType = computed(() => {
    return props.isRadio ? 'radio' : 'checkbox';
  });

</script>

<template>
  <div class="options">
    <label v-for="option in options" :key="option.value">
      <input :type="inputType" :id="option.value" :value="option.value" v-model="filter[props.filterId]" />
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
    font-size: 15px;
  }

  input[type='checkbox'] {
    position: relative;
    top: 2px;
  }
</style>