<script>
    import HeaderMenu from '~/assets/header-menu';
    import Snackbar from '~/components/common/Snackbar';
    // import Footer from '~/layouts/_footer';

    let headerMenu;

    export default {
        components: {
            Snackbar,
            // Footer,
        },
        mounted() {
            headerMenu = new HeaderMenu();
        },
        destroyed() {
            if (headerMenu && headerMenu.destroy) {
                headerMenu.destroy();
            }
        },
    };
</script>

<template>
    <div class="main-wrap">
        <header class="header" data-header>
            <div class="header__container u-container u-container--large" data-header-container>
                <nuxt-link class="header__logo" to="/" data-header-logo>
                    <!-- размеры у лого заданы чтобы сразу правильно расчиталось в js -->
                    <img class="header__logo-image" :src="`${BASE_URL_PREFIX}/img/minter-logo-circle.svg`" alt="Minter" width="36" height="36">
                </nuxt-link>
                <nav class="header__menu" data-header-menu>
                    <nuxt-link class="header__link" to="/">Decode Tx</nuxt-link>
                    <nuxt-link class="header__link" to="/encode">Encode Tx</nuxt-link>
                </nav>

                <div class="header__controls">
<!--                    <Language class="header__control-language"/>-->

                    <button class="header__offcanvas-button u-semantic-button" data-header-button>
                        <span class="header__offcanvas-icon-wrap">
                            <span class="header__offcanvas-icon">Menu</span>
                        </span>
                    </button>
                </div>
            </div>
        </header>

        <nuxt class="main-content"/>

<!--        <Footer/>-->
        <Snackbar/>
    </div>
</template>

