<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
import Artplayer from "artplayer";
import Hls from "hls.js";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
const route = useRoute();
const { data } = await useAsyncData("info", async () => {
    const [stream, download, info, episodes] = await Promise.all([
        await $fetch(`/api/stream?id=${route.params.episode}`),
        await $fetch(`/api/download?id=${route.params.episode}`),
        await $fetch(`/api/info?id=${route.params.id}`),
        await $fetch(`/api/episodes?id=${route.params.id}`)
    ]);
    return { stream, download, info, episodes }
});
onMounted(() => {
    new Artplayer({
        container: "#player",
        url: data.value?.stream.sources.default ? data.value?.stream.sources.default : data.value?.stream.sources.backup,
        setting: true,
        volume: 1,
        fullscreen: true,
        theme: "#ADC6FF",
        plugins: [
            artplayerPluginHlsQuality({
                setting: true,
                getResolution: (level: any) => level.height + "P",
                auto: "Auto"
            }),
        ],
        customType: {
            m3u8: function playM3u8(video: any, url: string, art: any) {
                if (Hls.isSupported()) {
                    if (art.hls) art.hls.destroy();
                    const hls = new Hls();
                    hls.loadSource(url);
                    hls.attachMedia(video);
                    art.hls = hls;
                    art.on("destroy", () => hls.destroy());
                } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                    video.src = url;
                } else {
                    art.notice.show = "Unsupported Playback Format (m3u8)";
                }
            }
        }
    });
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
    <div class="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-4 m-4">
        <div class="flex flex-col gap-2">
            <div id="player" class="w-full h-60 md:h-80 lg:h-[450px]" />
        </div>
        <div class="bg-prime/5 space-y-2 rounded-sm p-4">
            <div class="flex justify-between items-center">
                <p class="text-light text-lg font-semibold">Episodes</p>
                <NuxtLink :to="data?.download.link" target="_blank" class="flex items-center text-dark bg-prime 
                outline-none rounded-sm gap-2 py-1 px-2 hover:bg-prime/85">
                    <DownloadIcon size="1.2x" />
                    Download
                </NuxtLink>
            </div>
            <div class="flex flex-col gap-2 max-h-[380px] overflow-y-auto"
                v-if="data?.episodes.episodes.length > 0">
                <NuxtLink v-for="episode in data?.episodes.episodes" :to="`/stream/${data?.info.id}/${episode.id}`"
                    class="flex items-start gap-2 rounded-sm hover:bg-prime/10">
                    <NuxtImg :src="data?.info.cover" :alt="data?.info.title" class="h-24 rounded-sm object-cover" />
                    <div class="flex flex-col gap-1 w-fit md:w-80 p-2 overflow-hidden">
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
        </div>
    </div>
</template>