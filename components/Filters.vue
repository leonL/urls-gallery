<script setup lang="ts">
  import { useLookupStore } from '~/stores/lookups';

  const lookupStore = useLookupStore();
  const { locale } = useI18n();

  const geoScopeOptions = computed(() => {
    const labels = lookupStore.getAllLabels('geoScopes', locale.value);
    return labels.map(label => ({ value: label.toLowerCase(), label }));
  });

  const checkedGeoScopes = ref([]);
</script>

<template>
  <div>
    <h1 class="title">{{ $t('filters') }}</h1>
    <div class="geographic-scopes filter">
      <div class="toggle">
        <img class="globe icon" src="~/assets/globe.png">
        <h2 class='heading'>{{ $t('geographicScope') }}</h2>
      </div>
      <div class="options">
        <label v-for="option in geoScopeOptions" :key="option.value" class="">
          <input type="checkbox" :value="option.value" v-model="checkedGeoScopes" />
          {{ option.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .title {
    font-weight: bold;
    color: black;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .icon {
    float: left;
    margin-right: 5px;
    position: relative;
    top: 2px;
  }

  .icon.globe {
    width: 19px;
    height: 19px;
  }

  .heading {
    margin-right: 30px;
    font-size: 18px;
    font-weight: bold;
  }

  label {
    display: block;
    margin: 10px 0;
    color: black;
    font-size: 18px;
  }
</style>
