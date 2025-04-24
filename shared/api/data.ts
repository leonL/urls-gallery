interface ApiRecord {
  id: string,
  fields: {
    'TITLE EN': string;
  };
}

interface ApiResponse {
  records: ApiRecord[];
}

export function getResources(): Promise<ApiResponse> {
  const config = useRuntimeConfig();

  return $fetch<ApiResponse>('/RESOURCES', {
    baseURL: config.public.apiBase,
    headers: {
      Authorization: `Bearer ${config.airtableApiKey}`
    }
  })
}