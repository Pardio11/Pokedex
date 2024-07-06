// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	compatibilityDate: "2024-04-03",
	devtools: { enabled: false },
	css: ["@/assets/css/main.css"],
	modules: ["@nuxt/image", "@nuxtjs/google-fonts"],
	image: {
		format: ["webp"],
	},
	googleFonts: {
		families: {
			Rajdhani: [400],
			Exo: [100, 200, 300, 400, 500],
		},
	},
})
