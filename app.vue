<script setup>
  import { useAsyncData } from '#app';

  const resources = ref([]);

  const { data, error } = await useAsyncData('airtable', () =>
    $fetch('https://api.airtable.com/v0/app393cel1ZJ5Wi13/RESOURCES', {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
      },
    }) 
  );

  if (error.value) {
    console.error('Error fetching Airtable data:', error.value);
  } else {
    resources.value = data.value.records.map(record => ({
      id: record.id,
      title: record.fields['TITLE EN'],
    }));
  }
</script>

<template>
  <div>
    <h1>My Airtable Data</h1>
    <div v-if="error">
      <p>Error loading data: {{ error.message }}</p>
    </div>
    <div v-else-if="data">
      <ul>
        <li v-for="resource in resources" :key="resource.id">{{ resource.title }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
