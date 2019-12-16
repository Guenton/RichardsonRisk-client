const colors = require("vuetify/es5/util/colors").default;
require("dotenv").config();

export default {
  mode: "universal",
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "msapplication-TileColor", content: "#2b5797" },
      { name: "theme-color", content: "#283593" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" }
    ]
  },
  // Customize the progress-bar color
  loading: { color: "#fff" },
  css: [],
  plugins: [],
  // Nuxt.js dev-modules
  buildModules: ["@nuxtjs/vuetify"],
  // Nuxt.js modules
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    // Doc: https://auth.nuxtjs.org/guide/setup.html
    "@nuxtjs/auth",
    // https://www.npmjs.com/package/@nuxtjs/proxy
    "@nuxtjs/proxy"
  ],
  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      home: "/login"
    },
    strategies: {
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        client_id: process.env.AUTH0_CLIENT_ID,
        audience: process.env.AUTH0_AUDIENCE
      }
    }
  },
  env: {
    api: process.env.API_URL || "Api not found at Server Level",
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  },
  // Axios module configuration
  // See https://axios.nuxtjs.org/options
  axios: {
    baseUrl: "https://richardsonrisk-api.herokuapp.com",
    proxyHeaders: true,
    proxy: true
  },
  proxy: {
    "/auth/": {
      target: "https://richardsonrisk-api.herokuapp.com",
      changeOrigin: true
    },
    "/api/": {
      target: "https://richardsonrisk-api.herokuapp.com",
      changeOrigin: true
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.indigo.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.indigo.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  build: {
    // You can extend webpack config here
    extend(config, ctx) {}
  }
};
