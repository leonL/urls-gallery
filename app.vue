<script setup lang="ts">
  import { useAsyncData } from '#imports';

  interface ApiRecord {
    id: string;
    fields: {
      'TITLE EN': string;
    };
  }

  interface ApiResponse {
    records: ApiRecord[];
  }

  const config = useRuntimeConfig();
  const resources = ref<{ id: string; title: string }[]>([]);

  const { data, error } = await useAsyncData<ApiResponse>('resources', () => 
    $fetch('https://api.airtable.com/v0/app393cel1ZJ5Wi13/RESOURCES', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.airtableApiKey}`
      },
    }) 
  );

  if (error.value) {
    console.error('Error fetching data:', error.value);
  } else if (data.value) {
    resources.value = data.value.records.map((r: ApiRecord) => ({
      id: r.id,
      title: r.fields['TITLE EN'],
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
