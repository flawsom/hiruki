/** @type {import("tailwindcss").Config} */

module.exports = {
    content: [
        "./components/**/*.vue",
        "./layouts/**/*.vue",
        "./pages/**/*.vue"
    ],
    theme: {
        extend: {}
    },
    plugins: [require("vidstack/tailwind.cjs")(
        {
            selector: ".media-player",
            prefix: "media",
            webComponents: true
        }
    )]
}