export interface Filter {
  issueIds: string[],
  contentTypeIds: string[],
  geographicScopeId: string[],
  languageId: string,
  yearPublishedRange: {
    start: number,
    end: number
  }
}

function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function useFilterState() {
  const resourceStore = useResourceStore();
  
  return useState<Filter>('resourceFilter', () => ({
    issueIds: [],
    contentTypeIds: [],
    geographicScopeId: [],
    languageId: "both",
    yearPublishedRange: {
      start: resourceStore.earliestPublicationYear,
      end: getCurrentYear() 
    } 
  }));
}