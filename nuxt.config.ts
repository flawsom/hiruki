export default defineNuxtConfig({
    modules: ["@nuxt/image", "@nuxt/ui", "@nuxtjs/google-fonts"],
    devtools: { enabled: false },
    googleFonts: {
        families: {
            Outfit: "100..900"
        }
    },
    runtimeConfig: {
        API: process.env.API_URL
    }
});