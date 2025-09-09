<script setup lang="ts">
  const { locale } = useI18n();

  const options = [
    {value: 'added', en: "date posted", fr: "date postée"},
    {value: 'published', en: "date published", fr: "date publiée"}
  ];

  const sortBy = useState('sortByDateType');
</script>

<template>
  <span id='sort-order'>
    <label>Sort by</label>
    <select v-model="sortBy">
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt[locale] }}
      </option>
    </select>
  </span>
</template>

<style scoped>
  #sort-order label {
    font-size: 15px;
    font-weight: normal;
  }
  
  #sort-order select {
    font-weight: bold;
    font-size: 17px;
    border: 0;
  }
</style>