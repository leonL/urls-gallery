interface ApiResource {
  id: string,
  fields: {
    [key: string]: string;
  };
}

interface ApiResponse {
  offset: string,
  records: ApiResource[]
}

export async function getAllRows(table: string, view: string = 'API'): Promise<ApiResource[]> {
  const config = useRuntimeConfig();
  const path = encodeURI(`/${table}`);
  let allRows = [];
  let allRowsFetched = false;
  let offsetToken = '';

  while (!allRowsFetched) {
    let response = await $fetch<ApiResponse>(path, {
      baseURL: config.public.apiBase,
      headers: {
        Authorization: `Bearer ${config.airtableApiKey}`
      },
      query: { 
        offset: offsetToken,
        view
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