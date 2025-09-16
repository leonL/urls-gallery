interface ApiResourceRow {
  id: string,
  fields: {
    ['LANGUAGE ID']: Array<string>,
    ['TITLE EN']: string,
    ['TITLE FR']: string,
    ['DOCUMENT EN']: Array<{url: string}>,
    ['DOCUMENT FR']: Array<{url: string}>,
    ['LINK EN']: string,
    ['LINK FR']: string,
    ['NOTES EN']: string,
    ['NOTES FR']: string,
    ['AUTHOR']: string,
    ['GEOGRAPHIC SCOPE ID']: Array<string>,
    ['PUBLICATION ID']: Array<string>,
    ['CONTENT TYPE IDS']: Array<string>,
    ['ORGANIZATION IDS']: Array<string>,
    ['ISSUE IDS']: Array<string>,
    ['RECORD CREATED DATE']: string
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

interface ApiLookupCategoryRow {
  id: string,
  fields: {
    ['ID']: string,
    ['EN']: string,
    ['FR']: string,
    ['IDS']: Array<string>
  }
}

interface ApiTextRow {
  id: string,
  fields: {
    ['ID']: string,
    ['HOME:SUBTITLE']: string,
    ['ABOUT:LIBRARY']: string,
    ['ABOUT:NBWC']: string,
    ['ABOUT:OPEN CALL']: string
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
  let allRows: ApiLookupRow[] = [];
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

export async function fetchTextRows(table: string  = 'TEXT', view: string = 'API'): Promise<ApiTextRow[]> {
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