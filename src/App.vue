<template>
  <div>
    <Header v-if="!shouldHideHeader" />
    <main :class="mainContentClass">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";

const route = useRoute();

const shouldHideHeader = computed(() => {
  return route.meta?.hideHeader === true;
});

const mainContentClass = computed(() => {
  return shouldHideHeader.value
    ? "main-content-area no-header"
    : "main-content-area";
});
</script>

<style>
.main-content-area {
  padding-top: var(--header-height);
}

.main-content-area.no-header {
  padding-top: 0;
}
</style>
