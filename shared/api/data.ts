interface ApiRecord {
  id: string,
  fields: {
    'TITLE EN': string;
  };
}

interface ApiResponse {
  offset: string,
  records: ApiRecord[]
}

interface Config {
  public: {
    apiBase: string;
  };
  airtableApiKey: string;
}

export function getResources(config: Config, offset = ''): Promise<ApiResponse> {
  return $fetch<ApiResponse>('/RESOURCES', {
    baseURL: config.public.apiBase,
    headers: {
      Authorization: `Bearer ${config.airtableApiKey}`
    },
    query: { 
      offset,
      view: 'POST'
    }
  })
}