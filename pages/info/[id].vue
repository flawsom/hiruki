<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
const route = useRoute();
const { data } = await useAsyncData("info", async () => {
    const [info, recommendations, episodes] = await Promise.all([
        await $fetch(`/api/info?id=${route.params.id}`),
        await $fetch(`/api/recommendations?id=${route.params.id}`),
        await $fetch(`/api/episodes?id=${route.params.id}`)
    ]);
    return { info, recommendations, episodes }
});
const bookmarks = useStorage("bookmarks", { data: [] });
const isBookmarked = () => {
    return bookmarks.value.data.find((item: any) => item.id == route.params.id) !== undefined
}
const addBookmark = () => {
    const list: any = bookmarks.value
    list.data.push({
        id: data.value?.info.id,
        title: data.value?.info.title,
        cover: data.value?.info.cover,
        season: data.value?.info.season,
        year: data.value?.info.year
    });
}
const removeBookmark = () => {
    const list = bookmarks.value;
    const index = list.data.findIndex((item: any) => item.id == route.params.id);
    list.data.splice(index, 1);
}
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 m-4">
        <div class="hidden lg:flex flex-col gap-2">
            <img :src="data?.info.cover" :alt="data?.info.title" class="w-56 h-80 rounded-sm object-cover">
            <button type="button" @click="removeBookmark" class="flex justify-center items-center text-dark bg-prime 
            text-base font-medium text-center outline-none rounded-sm gap-2 p-2 hover:bg-prime/85"
                v-if="isBookmarked()">
                <BookmarkIcon />Bookmarked
            </button>
            <button type="button" @click="addBookmark" class="flex justify-center items-center text-dark bg-prime 
            text-base font-medium text-center outline-none rounded-sm gap-2 p-2 hover:bg-prime/85" v-else>
                <BookmarkIcon />Bookmark
            </button>
            <NuxtLink :to="'/stream/' + data?.episodes.episodes[0].id" class="text-dark bg-prime text-base 
                font-medium text-center outline-none rounded-sm w-full p-2 hover:bg-prime/85"
                v-if="data?.episodes.episodes.length > 0">Watch Now</NuxtLink>
            <button type="button" class="text-dark bg-prime/50 text-base font-medium text-center outline-none 
                rounded-sm w-full p-2 hover:cursor-not-allowed" v-else>Not Available</button>
        </div>
        <div class="lg:hidden flex flex-col items-center gap-2">
            <img :src="data?.info.cover" :alt="data?.info.title"
                class="w-40 h-60 md:w-48 md:h-72 rounded-sm object-cover">
            <div class="flex flex-col justify-center items-center text-center">
                <p class="text-light text-base font-normal">{{ data?.info.season }} {{ data?.info.year }}</p>
                <p class="text-light text-2xl font-bold line-clamp-3">{{ data?.info.title }}</p>
            </div>
            <button type="button" @click="removeBookmark" class="flex justify-center items-center text-dark bg-prime 
            text-base font-medium text-center w-full outline-none rounded-sm gap-2 p-2 hover:bg-prime/85"
                v-if="isBookmarked()">
                <BookmarkIcon />Bookmarked
            </button>
            <button type="button" @click="addBookmark" class="flex justify-center items-center text-dark bg-prime 
            text-base font-medium text-center w-full outline-none rounded-sm gap-2 p-2 hover:bg-prime/85" v-else>
                <BookmarkIcon />Bookmark
            </button>
            <NuxtLink :to="'/stream/' + data?.episodes.episodes[0].id" class="text-dark bg-prime text-base 
            font-medium text-center w-full outline-none rounded-sm p-2 hover:bg-prime/85"
                v-if="data?.episodes.episodes.length > 0">Watch Now</NuxtLink>
            <button type="button" class="text-dark bg-prime/50 text-base font-medium text-center w-full 
            outline-none rounded-sm p-2 hover:cursor-not-allowed" v-else>Not Available</button>
        </div>
        <div class="flex flex-col gap-2">
            <div class="hidden lg:flex flex-col">
                <p class="text-light text-base font-normal">{{ data?.info.season }} {{ data?.info.year }}</p>
                <p class="text-light text-2xl font-bold line-clamp-2">{{ data?.info.title }}</p>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <button type="button" class="text-dark bg-prime outline-none rounded-sm px-2"
                    v-for="genre in data?.info.genres">{{ genre }}</button>
            </div>
            <div class="bg-prime/5 space-y-2 rounded-sm p-4">
                <p class="text-light text-lg font-semibold">Synopsis</p>
                <div v-html="data?.info.description" class="text-light/75 text-base font-normal" />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div class="space-y-2">
                    <div class="bg-prime/5 space-y-1 rounded-sm p-4">
                        <p class="text-light text-lg font-semibold">Format</p>
                        <p class="text-light/75 text-base font-normal">{{ data?.info.format }}</p>
                    </div>
                    <div class="bg-prime/5 space-y-1 rounded-sm p-4">
                        <p class="text-light text-lg font-semibold">Status</p>
                        <p class="text-light/75 text-base font-normal">{{ data?.info.status }}</p>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="bg-prime/5 space-y-1 rounded-sm p-4">
                        <p class="text-light text-lg font-semibold">Score</p>
                        <p class="text-light/75 text-base font-normal" v-if="data?.info.score">{{ data?.info.score }}
                        </p>
                        <p class="text-light/75 text-base font-normal" v-else>N/A</p>
                    </div>
                    <div class="bg-prime/5 space-y-1 rounded-sm p-4">
                        <p class="text-light text-lg font-semibold">Episodes</p>
                        <p class="text-light/75 text-base font-normal" v-if="data?.info.episodes">
                            {{ data?.info.episodes }} Episode(s)</p>
                        <p class="text-light/75 text-base font-normal" v-else>N/A</p>
                    </div>
                </div>
            </div>
            <div class="bg-prime/5 space-y-1 rounded-sm p-4">
                <p class="text-light text-lg font-semibold">Studio</p>
                <p class="text-light/75 text-base font-normal" v-if="data?.info.studio">{{ data?.info.studio }}</p>
                <p class="text-light/75 text-base font-normal" v-else>N/A</p>
            </div>
            <div class="bg-prime/5 space-y-2 rounded-sm p-4">
                <p class="text-light text-lg font-semibold">Characters</p>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    <div v-for="character in data?.info.characters.slice(0, 9)"
                        class="flex items-center gap-2 rounded-sm">
                        <NuxtImg :src="character.image" :alt="character.name"
                            class="w-24 h-24 rounded-full object-cover" />
                        <div class="flex flex-1 flex-col gap-1 p-2 overflow-hidden">
                            <p class="text-light text-base font-normal line-clamp-2">{{ character.name }}</p>
                            <p class="text-dark bg-prime w-fit outline-none rounded-sm px-2">{{ character.role }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-prime/5 space-y-2 rounded-sm p-4">
                <p class="text-light text-lg font-semibold">Episodes</p>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 max-h-[310px] overflow-y-auto"
                    v-if="data?.episodes.episodes.length > 0">
                    <NuxtLink v-for="episode in data?.episodes.episodes" :to="'/stream/' + episode.id"
                        class="flex items-start gap-2 rounded-sm hover:bg-prime/10">
                        <NuxtImg :src="data?.info.cover" :alt="data?.info.title" class="h-24 rounded-sm object-cover" />
                        <div class="flex flex-col gap-1 p-2">
                            <p class="text-light text-base font-normal line-clamp-2">{{ data?.info.title }}</p>
                            <p class="text-dark bg-prime w-fit outline-none rounded-sm px-2">
                                Episode {{ episode.episode }}</p>
                        </div>
                    </NuxtLink>
                </div>
                <div class="flex justify-center items-center h-32" v-else>
                    <p class="text-prime text-xl font-semibold">Not Available</p>
                </div>
            </div>
        </div>
    </div>
    <div class="space-y-4 m-4" v-if="data?.recommendations.recommendations.length > 0">
        <div class="flex justify-between items-center">
            <p class="text-light text-xl font-bold uppercase">Recommendations</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <NuxtLink v-for="anime in data?.recommendations.recommendations.slice(0, 8)" :to="'/info/' + anime.id"
                class="relative flex flex-col group gap-2">
                <NuxtImg :src="anime.cover" :alt="anime.title" placeholder
                    class="w-full h-full rounded-sm object-cover" />
                <div class="bg-gradient-to-t from-dark to-transparent absolute inset-0 
                    group-hover:from-dark/95" />
                <div class="absolute bottom-0 left-0 p-2">
                    <p class="text-light text-sm font-medium line-clamp-2 group-hover:text-prime">
                        {{ anime.title }}</p>
                    <p class="text-light/75 text-sm font-normal">{{ anime.season }} {{ anime.year }}</p>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>