interface StoreResource {
  id: string,
  title: string
}

interface ApiResource {
  id: string,
  fields: {
    'TITLE EN': string;
  };
}

interface ApiResponse {
  offset: string,
  records: ApiResource[]
}

export async function getAllResources(): Promise<StoreResource[]> {
  const config = useRuntimeConfig();
  let allRecords: StoreResource[] = [];
  let allResourcesFetched = false;
  let offsetToken = '';

  while (!allResourcesFetched) {
    let response = await $fetch<ApiResponse>('/RESOURCES', {
      baseURL: config.public.apiBase,
      headers: {
        Authorization: `Bearer ${config.airtableApiKey}`
      },
      query: { 
        offset: offsetToken,
        view: 'POST'
      }
    })

    let records = response.records.map((record) => ({
      id: record.id,
      title: record.fields['TITLE EN'],
    }));

    allRecords.push(...records);

    if (response.offset === undefined) {
      allResourcesFetched = true;
    } else {
      offsetToken = response.offset;
    }
  }

  return allRecords;
}