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
    <label>Sort by </label>
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
    border: 1px dashed grey;
    padding: 1px;
  }

  @media screen and (max-width: 799px) {
    #sort-order label {
      font-size: max(2vw, 10px);
    }
    
    #sort-order select {
      font-size: max(2dvw, 10px);
    }
  }

  @media screen and (max-width: 699px) {
    #sort-order {
      position: relative;
      bottom: 2px;
    }
  }
</style>