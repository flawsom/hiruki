<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
useStorage("bookmarks", { data: [] });
</script>

<template>
    <NuxtLoadingIndicator color="#1ACD81" />
    <Header />
    <div class="space-y-8 select-none">
        <slot />
        <Footer />
    </div>
    <UNotifications />
</template>

<style>
* {
    font-family: "Outfit", sans-serif;
}
</style>