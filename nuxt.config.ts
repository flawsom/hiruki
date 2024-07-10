export default defineNuxtConfig({
    modules: ["@nuxt/image", "@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "nuxt-icon"],
    devtools: { enabled: true },
    tailwindcss: { viewer: false },
    googleFonts: {
        families: {
            Outfit: "100..900"
        }
    },
    runtimeConfig: {
        apiurl: process.env.API_URL
    }
});