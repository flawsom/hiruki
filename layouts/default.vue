<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
useStorage("bookmarks", { data: [] });
</script>

<template>
    <NuxtLoadingIndicator color="#FFFFFF" />
    <Header />
    <div class="space-y-8 transition-all select-none">
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