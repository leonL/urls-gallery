interface ApiResource {
  id: string, // get rid of this
  fields: {
    'TITLE EN': string,
    'TITLE FR': string
    // 'LINK EN': string,
    // 'LINK FR': string,
    // 'AUTHOR': string
  };
}


interface ApiResponse {
  offset: string,
  records: ApiResource[]
}

export async function getAllRows(table: string): Promise<ApiResource[]> {
  const config = useRuntimeConfig();
  let allRows = [];
  let allRowsFetched = false;
  let offsetToken = '';

  while (!allRowsFetched) {
    let response = await $fetch<ApiResponse>(`/${table}`, {
      baseURL: config.public.apiBase,
      headers: {
        Authorization: `Bearer ${config.airtableApiKey}`
      },
      query: { 
        offset: offsetToken,
        view: 'POST'
      }
    })

    allRows.push(...response.records);

    if (response.offset === undefined) {
      allRowsFetched = true;
    } else {
      offsetToken = response.offset;
    }
  }

  return allRows;
}