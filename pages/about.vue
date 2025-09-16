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
  <div id="about-page">
    <MDC :value="aboutLibraryMarkdown" tag="div" class="about library" />
    <div class='double-pane'>
      <div class="about nbwc">
        <MDC :value="aboutNbwcMarkdown" unwrap="div" />
      </div>
      <div class="about open-call">
        <MDC :value="aboutOpenCallMarkdown" />
      </div>
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

  .logos {
    margin-bottom: 30px;
  }

  .logo {
    width: 65px;
    margin-right: 15px;
  }

  @media screen and (max-width: 699px) {
    #about-page {
      margin: 5px;
    }

    #about-page * {
      font-size: 16px;
    }

    .double-pane {
      display: block;
    }

    .logos {
      margin-bottom: 10px;
    }

    .logo {
      width: 40px;
      margin-right: 10px;
    }
  }
</style>