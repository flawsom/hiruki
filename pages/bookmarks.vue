<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
const bookmarks = useStorage("bookmarks", { data: [] });
</script>

<template>
    <div class="space-y-8 m-4">
        <Section :data="bookmarks" :category="6" :explorer="false" :pagination="false" />
    </div>
</template>