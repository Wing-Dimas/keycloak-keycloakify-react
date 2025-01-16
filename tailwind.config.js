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
                },
                secondary: {
                    50: "#eff6ff",
                    100: "#dbeafe",
                    200: "#bfdbfe",
                    300: "#93c5fd",
                    400: "#60a5fa",
                    500: "#3b82f6",
                    600: "#2563eb",
                    700: "#1d4ed8",
                    800: "#1e40af",
                    900: "#1e3a8a",
                    950: "#172554"
                }
            }
        }
    },
    plugins: [flowbite.plugin()]
};
