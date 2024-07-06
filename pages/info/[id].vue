<script lang="ts" setup>
const route = useRoute();
const { data } = await useAsyncData("info", async () => {
    const [info, recommendations] = await Promise.all([
        await $fetch(`/api/info?id=${route.params.id}`),
        await $fetch(`/api/recommendations?id=${route.params.id}`)
    ]);
    return { info, recommendations }
});
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 m-4">
        <div class="hidden lg:flex flex-col gap-2">
            <img :src="data.info.cover" :alt="data.info.title" class="w-56 h-80 rounded-sm object-cover">
        </div>
        <div class="lg:hidden flex flex-col items-center gap-2">
            <img :src="data.info.cover" :alt="data.info.title"
                class="w-40 h-60 md:w-48 md:h-72 rounded-sm object-cover">
            <div class="flex flex-col justify-center items-center text-center">
                <p class="text-light text-base font-normal">{{ data.info.season }} {{ data.info.year }}</p>
                <p class="text-light text-2xl font-bold line-clamp-3">{{ data.info.title }}</p>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="hidden lg:flex flex-col">
                <p class="text-light text-base font-normal">{{ data.info.season }} {{ data.info.year }}</p>
                <p class="text-light text-2xl font-bold line-clamp-2">{{ data.info.title }}</p>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <button type="button" class="text-dark bg-prime outline-none rounded-sm px-2"
                    v-for="genre in data.info.genres">{{ genre }}</button>
            </div>
            <div class="bg-prime/5 space-y-2 rounded-sm p-4">
                <p class="text-light text-lg font-semibold">Synopsis</p>
                <div v-html="data.info.description" class="text-light/75 text-base font-normal" />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div class="space-y-2">
                    <div class="bg-prime/5 space-y-1 rounded-sm p-4">
                        <p class="text-light text-lg font-semibold">Format</p>
                        <p class="text-light/75 text-base font-normal">{{ data.info.format }}</p>
                    </div>
                    <div class="bg-prime/5 space-y-1 rounded-sm p-4">
                        <p class="text-light text-lg font-semibold">Status</p>
                        <p class="text-light/75 text-base font-normal">{{ data.info.status }}</p>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="bg-prime/5 space-y-1 rounded-sm p-4">
                        <p class="text-light text-lg font-semibold">Score</p>
                        <p class="text-light/75 text-base font-normal" v-if="data.info.score">{{ data.info.score }}</p>
                        <p class="text-light/75 text-base font-normal" v-else>N/A</p>
                    </div>
                    <div class="bg-prime/5 space-y-1 rounded-sm p-4">
                        <p class="text-light text-lg font-semibold">Episodes</p>
                        <p class="text-light/75 text-base font-normal" v-if="data.info.episodes">
                            {{ data.info.episodes }} Episode(s)</p>
                        <p class="text-light/75 text-base font-normal" v-else>N/A</p>
                    </div>
                </div>
            </div>
            <div class="bg-prime/5 space-y-1 rounded-sm p-4">
                <p class="text-light text-lg font-semibold">Studio</p>
                <p class="text-light/75 text-base font-normal" v-if="data.info.studio">{{ data.info.studio }}</p>
                <p class="text-light/75 text-base font-normal" v-else>N/A</p>
            </div>
        </div>
    </div>
    <div class="space-y-4 m-4" v-if="data.recommendations.recommendations.length > 0">
        <div class="flex justify-between items-center">
            <p class="text-light text-xl font-bold uppercase">Recommendations</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <NuxtLink v-for="anime in data.recommendations.recommendations.slice(0, 8)" :to="'/info/' + anime.id"
                class="relative flex flex-col group gap-2">
                <NuxtImg :src="anime.cover" :alt="anime.title" placeholder
                    class="w-full h-full rounded-sm object-cover" />
                <div class="bg-gradient-to-t from-dark to-transparent absolute inset-0 
                    group-hover:from-dark/95" />
                <div class="absolute bottom-0 left-0 p-1">
                    <p class="text-light text-base font-normal line-clamp-2 group-hover:text-prime">
                        {{ anime.title }}</p>
                    <p class="text-light/75 text-sm font-normal">{{ anime.format }} - {{ anime.year }}</p>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>