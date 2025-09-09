export function useResourceSorter() {
  const filteredResources = useResourceFilter();

  const sortOrderState = useState('sortOrderState', () => 'published-desc');

  const sortOrderValues = computed(() => sortOrderState.value.split('-'));

  const sortedResources = computed(() => {
    const resourcesCopy = [...filteredResources.value];
    const sorted = resourcesCopy.sort((aResource, bResource) => {
      let aDate, bDate,
        comparisonResult = sortOrderValues.value[1] === 'asc' ? -1 : 1;
      
      if (sortOrderValues.value[0] === "added") {
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
    return sorted;
  });

  return sortedResources;
}