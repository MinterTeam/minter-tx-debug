// register env before other imports @see https://www.npmjs.com/package/dotenv#how-do-i-use-dotenv-with-import-
import 'dotenv/config';
import dotenv from 'dotenv';
// const nodeExternals = require('webpack-node-externals');

const envConfig = dotenv.config();

import {BASE_TITLE, BASE_DESCRIPTION} from "./assets/variables";

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: BASE_TITLE,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: BASE_DESCRIPTION },
            { hid: 'og-title', name: 'og:title', content: BASE_TITLE },
            { hid: 'og-description', name: 'og:description', content: BASE_DESCRIPTION },
            { hid: 'og-image', name: 'og:image', content: '/social-share.png' },
        ],
        link: [
            { rel: 'icon', href: '/favicon.png' },
            { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        ],
    },
    css: [
        './static/css/style.min.css',
    ],
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#cf5c2c' },
    generate: {
        exclude: [
            /profile/,
            /queue/
        ],
        // ssr midleware break auth
        // routes: [
        //     '/auth',
        // ],
    },
    router: {
        linkActiveClass: '',
        linkExactActiveClass: 'is-active',
        middleware: [
            // 'profile',
            // 'auth',
        ],
    },
    plugins: [
        { src: '~/plugins/click-blur.js', ssr: false },
        // { src: '~/plugins/persistedState.js', ssr: false },
        // { src: '~/plugins/seo-gtm.js', ssr: false },
        { src: '~/plugins/base-url-prefix.js' },
    ],
    env: envConfig.error ? {} : envConfig.parsed,
    modules: [
    ],
    /*
    ** Build configuration
    */
    build: {
        extractCSS: true,
        optimizeCSS: false,
        postcss: false,
        // optimization: {
        //     splitChunks: {
        //         name: true
        //     }
        // },
        watch: [
            // './.env',
            './api/',
            `./lang/`,
        ],
        /*
        ** Run ESLint on save
        */
        extend(config, { isDev, isClient, isServer }) {

            if (!config.resolve) {
                config.resolve = {};
            }
            config.resolve.mainFields =  ['module', 'browser', 'main'];
        },
        babel: {
            // presets: [
            //     [
            //         '@nuxt/babel-preset-app',
            //         {
            //             // targets: isServer ? { node: '10' } : { ie: '11' },
            //             corejs: { version: 3 },
            //         },
            //     ],
            // ],
            plugins: [
                // "@babel/plugin-proposal-optional-chaining",
            ],
            // prevent @babel/plugin-transform-runtime from inserting `import` statement into commonjs files (bc. it breaks webpack)
            sourceType: 'unambiguous',
        },
        transpile: [
            '@material/',
            'date-fns/esm',
            'lodash-es',
            'centrifuge/src',
            'autonumeric/src',
            'vue-autonumeric/src',
            'vue-simple-suggest/lib',
            'nuxt-i18n/src',
            'qr-scanner',
            'camelcase-keys/',
            'camelcase/', // camelcase-keys
            'map-obj/', // camelcase-keys
            'quick-lru/', // camelcase-keys
            'v-autosize/src',
            'v-file-input/src',
            'vue-inline-svg/src/',
            'clipbrd/src',
            'pretty-num/src',
            'from-exponential/src',
            'minterjs-util',
            'minterjs-tx',
            'minterjs-wallet',
            'bip39/src', // minterjs-wallet
            'minter-js-sdk',
            'minter-js-org',
        ],
    },
};
