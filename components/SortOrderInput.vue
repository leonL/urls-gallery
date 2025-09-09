<script setup lang="ts">
  const { locale } = useI18n();

  const options = [
    {value: 'published-desc', en: "date published (new to old)", fr: "date publiée (nouveau à vieux)"},
    {value: 'published-asc', en: "date published (old to new)", fr: "date publiée (ancien au nouveau)"},
    {value: 'added-desc', en: "date posted (new to old)", fr: "date postée (nouveau à vieux)"},
    {value: 'added-asc', en: "date posted (old to new)", fr: "date postée (ancien au nouveau)"}
  ];

  const state = useState('sortOrderState');
</script>

<template>
  <span id='sort-order'>
    <label>Order by</label>
    <select v-model="state">
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