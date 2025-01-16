import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            keycloakVersionTargets: {
                "all-other-versions": true,
                "22-to-25": false
            },
            themeName: ["keycloakify-public", "keycloakify-government"]
        })
    ]
});
