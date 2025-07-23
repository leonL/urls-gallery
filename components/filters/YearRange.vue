<script setup lang="ts">
  const filterState = useFilterState();
  const filter = filterState.filter;

  const resourceStore = useResourceStore();

  const currentYear = computed(() => {
    return new Date().getFullYear();
  });

  const floor = computed(() => {
    return Math.max(
      filter.value.yearPublishedRange.start + 1,
      resourceStore.earliestPublicationYear + 1
    );
  })

  let isStartYearValid = ref(true);

  const startYear = computed({
    get: () => filter.value.yearPublishedRange.start,
    set: (value: number | null) => {
      if (value === null || value === undefined) {
        isStartYearValid.value = false;
        return;
      }
      if (value >= resourceStore.earliestPublicationYear && value <= (currentYear.value - 1)) {
        isStartYearValid.value = true;
        filter.value.yearPublishedRange.start = value;
      } else {
        isStartYearValid.value = false;
      }
    }
  });

  let isEndYearValid = ref(true);

  const endYear = computed({
    get: () => filter.value.yearPublishedRange.end,
    set: (value: number | null) => {
      if (value === null || value === undefined) {
        isEndYearValid.value = false;
        return;
      };
      if (value >= floor.value && value <= currentYear.value) {
        isEndYearValid.value = true;
        filter.value.yearPublishedRange.end = value;
      } else {
        isEndYearValid.value = false;
      }
    }
  });
</script>

<template>
  <div id="range">
    <input 
      id="startYear"
      type="number" 
      v-model.number="startYear"
      :min="resourceStore.earliestPublicationYear" 
      :max="currentYear - 1"
      :class="{'invalid': !isStartYearValid}"
      placeholder="start "
    />
    <div id='emStop'> – </div>
    <input 
      id="endYear"
      type="number" 
      v-model.number="endYear"
      :min="filter.yearPublishedRange.start + 1" 
      :max="currentYear"
      :class="{'invalid': !isEndYearValid}"
      placeholder="end " 
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

  #range input.invalid {
    border-color: red;
    background-color: pink;
  }

</style>