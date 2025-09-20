// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    // 'nuxt-sweetalert2'
  ],
  runtimeConfig:{
    public: {
      apiBaseUrl: process.env.VITE_API_BASE_URL || 'https://default-api-url.com', 
      defaultLayout: process.env.NUXT_PUBLIC_DEFAULT_LAYOUT,
    }
  },
  devServer: {
		port: 3002,
	},
})
