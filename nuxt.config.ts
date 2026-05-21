export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: ["@pinia/nuxt", "@primevue/nuxt-module",'@nuxtjs/tailwindcss'],

  primevue: {
    options: {
      ripple: true,
    },
  },
});
