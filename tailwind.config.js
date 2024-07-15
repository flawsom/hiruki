/** @type {import("tailwindcss").Config} */

module.exports = {
    content: [
        "./components/**/*.vue",
        "./layouts/**/*.vue",
        "./pages/**/*.vue"
    ],
    theme: {
        extend: {
            colors: {
                jade: {
                    50: "#EFFeF7",
                    100: "#DAFEEF",
                    200: "#B8FADD",
                    300: "#81F4C3",
                    400: "#43E5A0",
                    500: "#1ACD81",
                    600: "#0FA968",
                    700: "#108554",
                    800: "#126945",
                    900: "#11563A",
                    950: "#03301F",
                }
            }
        }
    },
    plugins: [require("vidstack/tailwind.cjs")(
        {
            selector: ".media-player",
            prefix: "media",
            webComponents: true
        }
    )]
}