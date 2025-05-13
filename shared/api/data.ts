interface ApiResourceRow {
  id: string,
  fields: {
    ['TITLE EN']: string,
    ['TITLE FR']: string,
    ['GEOGRAPHIC SCOPE ID']: Array<string>
  }
}

interface ApiLookupRow {
  id: string,
  fields: {
    ['ID']: string,
    ['EN']: string,
    ['FR']: string
  }
}

interface ApiResponse {
  offset: string,
  records: []
}

export async function fetchResourceRows(table: string = 'RESOURCES', view: string = 'POST'): Promise<ApiResourceRow[]> {
  const path = encodeURI(`/${table}`);
  let allRows: ApiResourceRow[] = [];
  let allRowsFetched = false;
  let offsetToken = '';

  while (!allRowsFetched) {
    let response = await fetchRows(path, view, offsetToken);
    allRows.push(...response.records);

    if (response.offset === undefined) {
      allRowsFetched = true;
    } else {
      offsetToken = response.offset;
    }
  }

  return allRows;
}

export async function fetchLookupRows(table: string, view: string = 'API'): Promise<ApiLookupRow[]> {
  const path = encodeURI(`/${table}`);
  let response = await fetchRows(path, view);

  return response.records;
}

async function fetchRows(path: string, view: string, offset: string = ''): Promise<ApiResponse> {
  const config = useRuntimeConfig();
  let response = await $fetch<ApiResponse>(path, {
    baseURL: config.public.apiBase,
    headers: {
      Authorization: `Bearer ${config.airtableApiKey}`
    },
    query: { 
      offset,
      view
    }
  })
  return response;
}