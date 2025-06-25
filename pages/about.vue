<script setup lang="ts">
  import { useTextStore } from '~/stores/texts';

  const textStore = useTextStore();

  const { locale } = useI18n();

  const aboutLibraryMarkdown = computed(() => {
    return textStore.getByType('aboutLibrary', locale.value);
  });

  const aboutNbwcMarkdown = computed(() => {
    return textStore.getByType('aboutNbwc', locale.value);
  });

  const aboutOpenCallMarkdown = computed(() => {
    return textStore.getByType('aboutOpenCall', locale.value);
  });
</script>

<template>
  <div>
    <MDC :value="aboutLibraryMarkdown" tag="div" class="about library" />
    <div class='double-pane'>
      <MDC :value="aboutNbwcMarkdown" class="about nbwc" tag="div" />
      <MDC :value="aboutOpenCallMarkdown" class="about open-call" tag="div" />
    </div>
    <div class="logos">
      <a :href="$t('nbwcURL')" target="_blank">
        <img src="~/assets/NBWC_logo_icon.png" class="logo"
          :alt="$t('altTextlogo')">
      </a>
      <a :href="$t('facebookURL')" target="_blank">
        <img src="~/assets/fb_logo.png" class="logo"
          alt="Facebook logo">
      </a>
    </div>
  </div>
</template>

<style scoped>
.double-pane {
  display: flex;
  align-items: flex-start;
  margin: 50px 0 5px 0;
}

.about.nbwc {
  margin-right: 25px;  
}

.about.open-call {
  margin-left: 25px;
}

.logos {
  margin-bottom: 30px;
}

.logo {
  width: 65px;
  margin-right: 15px;
}
</style>