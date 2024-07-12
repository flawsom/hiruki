<script lang="ts" setup>
const { data } = await useAsyncData("categories", async () => {
    const [trending, popular, upcoming] = await Promise.all([
        await $fetch("/api/trending?page=1&per=8"),
        await $fetch("/api/popular?page=1&per=8"),
        await $fetch("/api/upcoming?page=1&per=8")
    ]);
    return { trending, popular, upcoming }
});
</script>

<template>
    <div class="space-y-8 m-4">
        <Section :data="data?.trending" :category="1" :explorer="false" :pagination="false" />
        <Section :data="data?.popular" :category="2" :explorer="false" :pagination="false" />
        <Section :data="data?.upcoming" :category="3" :explorer="false" :pagination="false" />
    </div>
</template>