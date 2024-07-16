<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
useStorage("bookmarks", { data: [] });
</script>

<template>
    <NuxtLoadingIndicator color="#4F46E5" />
    <div class="font-outfit select-none">
        <Header />
        <slot />
        <Footer />
    </div>
    <UNotifications />
</template>

<style>
::-webkit-scrollbar { @apply w-0 }
</style>