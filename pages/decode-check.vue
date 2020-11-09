<script>
    import {decodeCheck} from 'minter-js-sdk';
    import autosize from 'v-autosize';
    import checkEmpty from '~/assets/v-check-empty.js';
    import getTitle from '~/assets/get-title.js';

    export default {
        components: {
        },
        directives: {
            checkEmpty,
            autosize,
        },
        fetchOnServer: false,
        fetch() {
            const hashCheck = window.location.hash ? window.location.hash.substr(1) : '';
            if (hashCheck) {
                this.checkRlp = hashCheck;
                this.decode();
            }
        },
        head() {
            const title = getTitle('Decode check');
            // const description = this.tt('Get paid in crypto for your digital goods and services', 'index.seo-description');
            // const localeSuffix = this.$i18n.locale === 'en' ? '' : '-' + this.$i18n.locale;

            return {
                // title: title,
                meta: [
                    { hid: 'og-title', name: 'og:title', content: title },
                    // { hid: 'description', name: 'description', content: description },
                    // { hid: 'og-description', name: 'og:description', content: description },
                    // { hid: 'og-image', name: 'og:image', content: `/img/social-share-wallet${localeSuffix}.png` },
                ],
            };
        },
        data() {
            return {
                checkRlp: '',
                error: '',
                check: null,
            };
        },
        computed: {
            json() {
                return JSON.stringify(this.check, null, 4);
            },
            // editUrl() {
            //     return '/encode-check#' + JSON.stringify(this.check)
            // },
        },
        methods: {
            decode() {
                this.check = null;
                this.error = '';
                window.history.replaceState(window.history.state, null, window.location.pathname + '#' + this.checkRlp);

                try {
                    this.check = decodeCheck(this.checkRlp)
                } catch (e) {
                    this.error = e.message;
                    console.log(e)
                }
            },
        },

    };
</script>

<template>
    <main class="u-container">
        <section class="u-section">
            <h2 class="u-h2 u-mb-05">Decode check</h2>
            <p class="u-mb-10">
                Input your RLP encoded check (Mc-prefixed hex string).
            </p>

            <form class="u-grid u-grid--medium u-grid--vertical-margin" @submit.prevent="decode">
                <div class="u-cell">
                    <label class="form-field">
                            <textarea class="form-field__input" rows="1" v-check-empty v-autosize
                                      v-model.trim="checkRlp"
                                      @keydown.enter.prevent="decode"
                            ></textarea>
                        <span class="form-field__label">Check</span>
                    </label>
                </div>

                <div class="u-cell">
                    <button class="button button--green button--full">
                        Decode
                    </button>
                    <client-only>
                        <div class="form__error u-mt-10 u-text-center" v-if="error">
                            {{ error }}
                        </div>
                    </client-only>
                </div>
            </form>

            <client-only>
                <h2 class="u-h3 u-mb-10 u-mt-20" v-if="check">Result:</h2>
                <div class="u-grid u-grid--medium u-grid--vertical-margin" v-if="check">
                    <!--
                                    <div class="u-cell" v-for="(value, key) in check">
                                        <label class="form-field">
                                                <textarea class="form-field__input is-not-empty" rows="1" v-autosize
                                                          :value="value"
                                                ></textarea>
                                            <span class="form-field__label">{{ key }}</span>
                                        </label>
                                    </div>
                    -->
                    <div class="u-cell">
                        <label class="form-field">
                            <textarea class="form-field__input is-not-empty" rows="1" readonly v-autosize
                                      :value="json"
                            ></textarea>
                            <span class="form-field__label">JSON</span>
                        </label>
                        <!--<span class="form-field__help">Note: coin values converted from pip</span>-->
                    </div>
<!--                    <div class="u-cell">-->
<!--                        <nuxt-link class="button button&#45;&#45;ghost-black button&#45;&#45;full" :to="editUrl">-->
<!--                            Edit on the Encode page-->
<!--                        </nuxt-link>-->
<!--                    </div>-->
                </div>
            </client-only>

            <h2 class="u-h3 u-mb-10 u-mt-20">Notes</h2>
            <p>
                — <a class="link--default" href="https://github.com/MinterTeam/minter-js-sdk#decode-check" target="_blank">decodeCheck</a> method from minter-js-sdk is used under the hood. <br>
                — coin values will be converted from pip
            </p>
        </section>
    </main>
</template>
