<script lang="ts" setup>
const { data } = await useAsyncData("data", async () => {
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
        <Section :data="data.trending" :category="1" />
        <Section :data="data.popular" :category="2" />
        <Section :data="data.upcoming" :category="3" />
    </div>
</template>