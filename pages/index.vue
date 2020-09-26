<script>
    import {decodeTx} from 'minter-js-sdk';
    import autosize from 'v-autosize';
    import checkEmpty from '~/assets/v-check-empty';
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
            const hashTx = window.location.hash ? window.location.hash.substr(1) : '';
            if (hashTx) {
                this.txRlp = hashTx;
                this.decode();
            }
        },
        head() {
            const title = getTitle('Decode transaction');
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
                txRlp: '',
                error: '',
                tx: null,
            };
        },
        computed: {
            json() {
                return JSON.stringify(this.tx, null, 4);
            },
            editUrl() {
                return '/encode#' + JSON.stringify(this.tx)
            },
        },
        methods: {
            decode() {
                this.tx = null;
                this.error = '';
                window.history.replaceState(window.history.state, null, '#' + this.txRlp);

                try {
                    this.tx = decodeTx(this.txRlp, {decodeCheck: true})
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
            <h2 class="u-h2 u-mb-05">Decode transaction</h2>
            <p class="u-mb-10">
                Input your RLP encoded transaction (hex string).
            </p>

            <form class="u-grid u-grid--medium u-grid--vertical-margin" @submit.prevent="decode">
                <div class="u-cell">
                    <label class="form-field">
                            <textarea class="form-field__input" rows="1" v-check-empty v-autosize
                                      v-model.trim="txRlp"
                                      @keydown.enter.prevent="decode"
                            ></textarea>
                        <span class="form-field__label">Transaction</span>
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
                <h2 class="u-h3 u-mb-10 u-mt-20" v-if="tx">Result:</h2>
                <div class="u-grid u-grid--medium u-grid--vertical-margin" v-if="tx">
                    <!--
                                    <div class="u-cell" v-for="(value, key) in tx">
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
                    <div class="u-cell">
                        <nuxt-link class="button button--ghost-black button--full" :to="editUrl">
                            Edit on the Encode page
                        </nuxt-link>
                    </div>
                </div>
            </client-only>

            <h2 class="u-h3 u-mb-10 u-mt-20">Notes</h2>
            <p>
                — <a class="link--default" href="https://github.com/MinterTeam/minter-js-sdk#decode-transaction" target="_blank">decodeTx</a> method from minter-js-sdk is used under the hood. <br>
                — coin values will be converted from pip
            </p>
        </section>
    </main>
</template>
