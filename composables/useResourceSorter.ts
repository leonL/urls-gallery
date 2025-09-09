export function useResourceSorter() {
  const filteredResources = useResourceFilter();

  const sortOrder = { direction: 'asc', byField: 'datePublished' };

  const sortedResources = computed(() => {
    const resources = filteredResources.value.sort((aResource, bResource) => {
      let aDate, bDate,
        comparisonResult = sortOrder.direction === 'asc' ? -1 : 1;
      
      if (sortOrder.byField === "dateAdded") {
        aDate = new Date(aResource.dateAdded),
        bDate = new Date(bResource.dateAdded);
      } else {
        aDate = new Date(aResource.pubYear, aResource.pubMonth || 0, aResource.pubDay || 1),
        bDate = new Date(bResource.pubYear, bResource.pubMonth || 0, bResource.pubDay || 1);
      }

      if (aDate < bDate) {
        return comparisonResult;
      } else if (aDate > bDate) {
        return comparisonResult * -1;
      } else {
        return 0
      }

    });
    return resources;
  });

  return sortedResources;
}