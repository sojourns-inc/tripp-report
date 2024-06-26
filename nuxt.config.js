require("dotenv").config();
const pkg = require("./package");
const axios = require('axios');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://fonts.googleapis.com/css?family=Titillium+Web:400i,700,700i,400"
      },
      { src: 'https://challenges.cloudflare.com/turnstile/v0/api.js', async: true, defer: true }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#FFFFFF" },

  router: {
    middleware: ['redirect', 'closeNavOnNav']
  },

  serverMiddleware: [{
    path: '/api',
    handler: '~/server/index.js'
  }],

  /*
  ** Global CSS
  */
  css: [],
  telemetry: false,
  auth: {
    redirect: {
      login: "/user/login",
      home: "/"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/users/login",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/api/users/logout", method: "post" },
          user: { url: "/api/users/user", method: "get", propertyName: "user" }
        },
        token: {
          maxAge: 60 * 60 * 24 * 30
        }
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    },
    scopeKey: "permissions"
  },

  workbox: {
    runtimeCaching: [
      {
        urlPattern: "https://fonts.googleapis.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: "https://fonts.gstatic.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      }
    ]
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~/plugins/vue-toasted", mode: 'client' },
    { src: "~/plugins/vue2-touch-events", mode: 'client' },
    { src: "~/plugins/vcode-parse" },
    { src: "~/plugins/vcode" }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/pwa",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/markdownit",
    "@nuxtjs/sitemap",
    ["vue-scrollto/nuxt", { force: true, duration: 500 }],
    "@nuxtjs/dotenv",
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-123348003-1"
      }
    ]
  ],

  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true,
    typographer: true,
    html: true,
    quotes: "“”‘’"
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    browserBaseURL: process.env.BROWSER_BASE_URL || 'http://localhost:3000'
  },

  /*
  ** Build configuration
  */
  build: {
    analyse: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin');
      // if (!ctx.isDev) config.plugins.push(new MinifyPlugin());
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },

  env: {
    cfSiteKey: process.env.CF_SITE_KEY,
  },

  server: {
    port: process.env.PORT || 3000, // Use the PORT environment variable provided by Heroku, default to 3000
    jwtSecret: process.env.jwtSecret,
    sendGridApiKey: process.env.SENDGRID_API_KEY,
    mongooseUri: process.env.MONGOOSE_URI || `mongodb://localhost:27017/${process.env.DATABASE_NAME ? process.env.DATABASE_NAME : 'effectindex'}` // Use an environment variable for MongoDB URI or fallback to the local one
  },

  sitemap: {
    hostname: "https://www.effectindex.com",
    exclude: [
      '/admin/**'
    ],
    routes: async function() {
      try {
        const results = await Promise.all([
          axios.get(process.env.BASE_URL + '/api/effects'), // Using the environment variable
          axios.get(process.env.BASE_URL + '/api/articles'),
          axios.get(process.env.BASE_URL + '/api/blog'),
          axios.get(process.env.BASE_URL + '/api/reports'),
        ]);
  
        const [{ effects }, { articles }, { posts }, { reports }] = results.map(result => result.data);
  
        const routes = [
          ...effects.map(effect => `/effects/${effect.url}`),
          ...reports.map(report => `/reports/${report.slug}`),
          ...posts.map(post => `/blog/${post.slug}`),
          ...articles.map(article => `/articles/${article.slug}`)
        ];
  
        return routes;
      } catch (error) {
        console.log(`Could not generate sitemap. `, error);
        return [];
      }
    }
  }
  
};
