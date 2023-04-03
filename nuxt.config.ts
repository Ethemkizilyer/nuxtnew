
export default defineNuxtConfig({
  css: [
    "vuetify/styles",
    "@mdi/font/css/materialdesignicons.min.css",
    "@fortawesome/fontawesome-free/css/all.css",
    "@/static/fonts/ValorantFont.ttf",
  ],
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt"],
});
