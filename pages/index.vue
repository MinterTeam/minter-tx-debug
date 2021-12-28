<script>
    import {stringify} from 'comment-json';
    import {debounce, get as _get, cloneDeep} from 'lodash-es';
    import {decodeTx} from 'minter-js-sdk';
    import {normalizeTxType, txTypeList} from 'minterjs-util';
    import {Tx} from 'minterjs-tx';
    import autosize from 'v-autosize';
    import {replaceCoinId} from '~/api/gate.js';
    import checkEmpty from '~/assets/v-check-empty';
    import getTitle from '~/assets/get-title.js';

    let microlight;

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
                txWithSymbols: null,
                debouncedReplaceCoinId: null,
            };
        },
        computed: {
            json() {
                const tx = cloneDeep(this.tx);
                if (!tx) {
                    return '';
                }
                addComment(tx, 'chainId', tx.chainId === '1' ? 'mainnet' : 'testnet');
                if (tx.type) {
                    addComment(tx, 'type', txTypeList[Number(normalizeTxType(tx.type))].name);
                }
                addComment(tx, 'signatureType', tx.signatureType === '1' ? 'single' : 'multi');
                if (tx.signatureData) {
                    const senderAddress = new Tx(this.txRlp).getSenderAddressString();
                    addComment(tx, 'signatureData', `senderAddress: ${senderAddress}`, false);
                }

                // comment symbols
                if (this.txWithSymbols) {
                    walkDeep(this.txWithSymbols, (newValue, path, key, rootKey) => {
                        const originalValue = _get(tx, path);
                        if (originalValue && originalValue !== newValue) {
                            if (!rootKey) {
                                addComment(tx, key, newValue);
                            } else {
                                // add comment to nested object
                                addComment(_get(tx, rootKey), key, newValue);
                            }
                        }
                    });
                }

                return stringify(tx, null, 4);
            },
            editUrl() {
                return '/encode#' + JSON.stringify(this.tx)
            },
        },
        watch: {
            tx() {
                this.txWithSymbols = null;
                this.debouncedReplaceCoinId();
            },
            json() {
                if (!microlight) {
                    return;
                }
                setTimeout(microlight.reset, 100);
            },
        },
        mounted() {
            this.debouncedReplaceCoinId = debounce(this.replaceCoinId, 1000);
            (async () => {
                microlight = await import('microlight');
            })();
        },
        methods: {
            decode() {
                this.tx = null;
                this.error = '';
                window.history.replaceState(window.history.state, null, window.location.pathname + '#' + this.txRlp);

                try {
                    this.tx = Object.freeze(decodeTx(this.txRlp, {decodeCheck: true}));
                } catch (e) {
                    this.error = e.message;
                    console.log(e)
                }
            },
            replaceCoinId() {
                replaceCoinId(cloneDeep(this.tx))
                    .then((txParams) => this.txWithSymbols = Object.freeze(txParams));
            },
        },
    };

    /**
     *
     * @param {Object} target
     * @param {string} property
     * @param {string} value
     * @param {boolean} [inline=true]
     */
    function addComment(target, property, value, inline = true) {
        target[Symbol.for(`after:${property}`)] = [{
            type: 'LineComment',
            value: ' ' + value,
            inline,
        }];
    }

    /**
     *
     * @param {Object} obj
     * @param {function(value: any, path: string, key: string, rootKey: string)} callback
     * @param {string} [rootKey]
     */
    function walkDeep(obj, callback, rootKey = '') {
        for (const [key, value] of Object.entries(obj)) {
            const path = rootKey ? rootKey + '.' + key : key;
            if (typeof value === 'object') {
                walkDeep(value, callback, path);
            } else {
                callback(value, path, key, rootKey);
            }
        }
    }
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
                        <div class="form-field">
                            <pre class="form-field__input is-not-empty microlight">{{ json }}</pre>
                            <span class="form-field__label">JSON</span>
                        </div>
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
