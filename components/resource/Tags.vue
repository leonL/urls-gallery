<script setup lang="ts">
  import type { Resource } from '~/stores/resources';
  import { useLookupStore } from '~/stores/lookups';
  import { isNotEmpty } from '~/utils/base';

  const props = defineProps<{
    r: Resource
  }>();

  const lookupStore = useLookupStore();

  const { locale } = useI18n();

  function formatTagsStr(a: Array<string | undefined>) {
    const filtered = a.filter(item => item !== undefined && item !== '');
    filtered.sort((a, b) => (a ?? '').localeCompare(b ?? '', locale.value));
    return filtered.join("; ");
  }

  const geographicScope = computed(() => {
    const geoScopeId = props.r.geographicScopeId;
    return lookupStore.getLabel('geoScopes', geoScopeId, locale.value);
  });

  const hasContentType = computed(() => {
    const cTypeIds = props.r.contentTypeIds;
    return isNotEmpty(cTypeIds);
  });

  const contentTypesStr = computed(() => {
    const cTypeIds = props.r.contentTypeIds;
    const cTypesArray = lookupStore.getLabels('contentTypes', cTypeIds, locale.value);
    return formatTagsStr(cTypesArray);
  });

  const hasIssues = computed(() => {
    const issuesIds = props.r.issueIds;
    return isNotEmpty(issuesIds);
  });

  const issuesStr = computed(() => {
    const issuesIds = props.r.issueIds;
    const issuesArray = lookupStore.getLabels('issues', issuesIds, locale.value);
    return formatTagsStr(issuesArray);
  });
</script>

<template>
  <div class="tags">
    <div class="tag-list" id="geo-scope">
      <img class="icon" src="~/assets/globe.png" />
      <span>{{ geographicScope }}</span>
    </div>
    <div v-if="hasContentType" class="tag-list" id="content-types">
      <img class="icon" src="~/assets/content-type.png" />
      <span>{{ contentTypesStr }}</span>
    </div>
    <div v-if="hasIssues" class="tag-list" id="issues">
      <img class="icon" src="~/assets/issues.png" />
      <span>{{ issuesStr }}</span>
    </div>
  </div>
</template>