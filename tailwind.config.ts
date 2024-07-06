/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./components/**/*.vue",
        "./layouts/**/*.vue",
        "./pages/**/*.vue"
    ],
    theme: {
        extend: {
            fontFamily: {
                outfit: ["Outfit", "sans-serif"]
            },
            colors: {
                background: "#121317",
                dark: "#09090B",
                light: "#FAFAFA",
                prime: "#ADC6FF"
            }
        }
    },
    plugins: []
}