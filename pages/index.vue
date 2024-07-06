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
    <div class="space-y-8">
        <div class="space-y-4 select-none m-4">
            <Section value="Trending Now" />
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                <Card v-for="anime in data.trending.data" :data="anime" />
            </div>
        </div>
        <div class="space-y-4 select-none m-4">
            <Section value="All Time Popular" />
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                <Card v-for="anime in data.popular.data" :data="anime" />
            </div>
        </div>
        <div class="space-y-4 select-none m-4">
            <Section value="Upcoming Next Season" />
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                <Card v-for="anime in data.upcoming.data" :data="anime" />
            </div>
        </div>
    </div>
</template>