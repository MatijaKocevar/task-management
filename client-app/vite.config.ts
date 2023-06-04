import { PluginOption, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

const fullReloadAlways: PluginOption = {
	handleHotUpdate({ server }) {
		server.ws.send({ type: "full-reload" });
		return [];
	},
} as PluginOption;

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			include: "**/*.tsx",
		}),
		mkcert(),
		fullReloadAlways,
	],
	server: {
		port: 5001,
		strictPort: true,
		https: false,
		host: true,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
				secure: true,
				// ws: true,
				rewrite: (path) => path.replace(/^\/api/, "/api"),
			},
		},
	},
	esbuild: {
		jsx: "automatic",
	},
});
