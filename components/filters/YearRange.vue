<script setup lang="ts">
  const filterState = useFilterState();

  const resourceStore = useResourceStore();

  const currentYear = computed(() => {
    return new Date().getFullYear();
  });
</script>

<template>
  <div id="range">
    <input 
      id="startYear"
      type="number" 
      v-model.number="filterState.yearPublishedRange.start"
      :min="resourceStore.earliestPublicationYear" 
      :max="currentYear - 1"
      placeholder="start"
    />
    <div id='emStop'> – </div>
    <input 
      id="endYear"
      type="number" 
      v-model.number="filterState.yearPublishedRange.end"
      :min="filterState.yearPublishedRange.start + 1" 
      :max="currentYear"
      placeholder="end"
    />
  </div>
</template>

<style scoped>
  #range {
    margin-top: 15px;
    display: flex;
    gap: 6px;
  }

  #range input {
    width: fit-content;
    padding: 2px;
    text-align: right;
  }
</style>