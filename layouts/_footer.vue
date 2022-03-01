<script>
import footerLinksData from 'minter-footer-links';

export default {
    // first key not handled by webstorm intelliSense
    ideFix: 1,
    footerLinkList: footerLinksData,
    props: {
        containerClass: {
            type: String,
            default: 'u-container--large',
        },
    },
    computed: {
        locale() {
            return (this.$i18n && this.$i18n.locale) || 'en';
        },
    },
    methods: {
        getUrl(link) {
            return link.url;
        },
    },
};
</script>

<template>
    <footer class="footer">
        <div class="u-container u-container--large">
            <div class="footer__container">
                <img class="footer__logo u-hidden-large-down" :src="`${BASE_URL_PREFIX}/img/minter-logo-white.svg`" width="95" height="30" alt="Minter">
                <div class="footer__menu">
                    <div class="footer__menu-item" v-for="link in $options.footerLinkList" :key="link.slug">
                        <a class="footer__link u-h link--hover" :href="getUrl(link)" target="_blank" rel="nofollow noopener">{{ link.title[locale] }}</a>
                    </div>

                    <div class="footer__menu-item">
                        <a class="footer__link u-h link--hover" href="https://github.com/MinterTeam/minter-tx-debug" target="_blank" rel="nofollow noopener">Edit on GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
