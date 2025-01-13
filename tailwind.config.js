/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef, @typescript-eslint/no-require-imports
const flowbite = require("flowbite-react/tailwind");

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#ac1616",
                    50: "#fff1f1",
                    100: "#ffe1e1",
                    200: "#ffc7c7",
                    300: "#ffa0a0",
                    400: "#ff6a6a",
                    500: "#f83b3b",
                    600: "#e61c1c",
                    700: "#c11414",
                    800: "#ac1616",
                    900: "#841818",
                    950: "#480707"
                }
            }
        }
    },
    plugins: [flowbite.plugin()]
};
