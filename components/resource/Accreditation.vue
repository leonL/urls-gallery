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
    const orgsArray = lookupStore.getLabels('organizations', orgIds, locale.value);
    return orgsArray.join(", ");
  });

  const hasPublication = computed(() => {
    return isNotBlank(props.r.publicationId);
  });

  const publication = computed(() => {
    const pubId = props.r.publicationId;
    return lookupStore.getLabel('publications', pubId, locale.value);
  });

  const publicationDate = computed(() => {
    const pubYear = props.r.pubYear;
    let pubDateStr = String(pubYear);

    if (props.r.pubMonth !== undefined) {
      let pubDateObj = new Date(pubYear, props.r.pubMonth);
      let dateFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
      let timeFormatLocale = locale.value === 'en' ? 'en-US' : 'fr';

      if (props.r.pubDay !== undefined) {
        dateFormat.day = 'numeric';
        pubDateObj.setDate(props.r.pubDay);
      }

      pubDateStr = new Intl.DateTimeFormat(timeFormatLocale, dateFormat).format(pubDateObj);
    }

    return pubDateStr;
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
    <div class="publication-date">
      <span>{{ $t('published') }} {{ publicationDate }}</span>
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

  /*
  .publication-date {
    No explicit style in old CSS, but you can add spacing if needed 
  }
  */
</style>