import { vite as vidstack } from "vidstack/plugins";

export default defineNuxtConfig({
    modules: ["@nuxt/image", "@nuxt/ui", "@nuxtjs/google-fonts"],
    vue: { compilerOptions: { isCustomElement: (tag) => tag.startsWith("media-") } },
    vite: { plugins: [vidstack({ include: /player\// })] },
    devtools: { enabled: false },
    googleFonts: { families: { Outfit: "100..900" } },
    runtimeConfig: {
        API: process.env.API_URL
    }
});