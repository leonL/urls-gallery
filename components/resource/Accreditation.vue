<script setup lang="ts">
  import type { Resource } from '~/stores/resources';
  import { useLookupStore } from '~/stores/lookups';
  import { isNotBlank, isNotEmpty } from '~/utils/base';

  const props = defineProps<{
    r: Resource
  }>();

  const lookupStore = useLookupStore();

  const { locale } = useI18n();

  const hasAuthor = computed(() => {
    return isNotBlank(props.r.author);
  });

  const hasOrganizations = computed(() => {
    return isNotEmpty(props.r.organizationIds);
  });

  const organizations = computed(() => {
    const orgIds = props.r.organizationIds;
    const orgsArray = lookupStore.getLabels('organizations', orgIds);
    return orgsArray.join(", ");
  });

  const hasPublication = computed(() => {
    return isNotBlank(props.r.publicationId);
  });

  const publication = computed(() => {
    const pubId = props.r.publicationId;
    return lookupStore.getLabel('publications', pubId);
  });
</script>

<template>
  <div class="accreditation">
    <div>
      <span v-if="hasAuthor">{{ props.r.author }}</span>
      <span v-if="hasAuthor && hasOrganizations"> &#8226; </span>
      <span v-if="hasOrganizations">{{ organizations }}</span>
    </div>
    <div v-if="hasPublication" class="publication">
      <span>{{ publication }}</span>
    </div>
  </div>
</template>

<style scoped>
  .accreditation {
    color: #767676;
    font-size: 1.1rem;
  }

  .publication {
    font-style: italic;
  }

  @media screen and (max-width: 799px) {
   .accreditation {
      font-size: max(12px, 2.1vw);
    }
  }
</style>