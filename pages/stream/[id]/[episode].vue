<script lang="ts" setup>
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
</script>

<template>
    <div class="flex justify-center items-center w-full">
        <div id="player" class="w-full h-60 md:h-80 lg:h-[450px]" />
    </div>
</template>