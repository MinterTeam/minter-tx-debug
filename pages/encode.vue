<script>
    import JSON5 from 'json5';
    import QrcodeVue from 'qrcode.vue';
    import {validationMixin} from 'vuelidate';
    import required from 'vuelidate/lib/validators/required';
    import minValue from 'vuelidate/lib/validators/minValue';
    import minLength from 'vuelidate/lib/validators/minLength';
    import maxLength from 'vuelidate/lib/validators/maxLength';
    import autosize from 'v-autosize';
    import {TX_TYPE, txTypeList} from 'minterjs-tx/src/tx-types';
    import {walletFromMnemonic, isValidMnemonic} from 'minterjs-wallet';
    import {prepareTx, makeSignature, decodeTx} from 'minter-js-sdk/src/tx';
    import {prepareLink} from 'minter-js-sdk/src/link';
    import {ensureNonce} from '~/api/gate.js';
    import checkEmpty from '~/assets/v-check-empty.js';
    import {CHAIN_ID_MAINNET, CHAIN_ID_TESTNET, SIGNATURE_TYPE_SINGLE, SIGNATURE_TYPE_MULTI} from '~/assets/variables.js';
    import FieldCoin from '~/components/common/FieldCoin.vue';
    import ButtonCopyIcon from '~/components/common/ButtonCopyIcon.vue';
    import Loader from '~/components/common/Loader.vue';
    // import SignatureList from '~/components/common/SignatureList.vue';

    export default {
        txTypeList,
        CHAIN_ID_MAINNET,
        CHAIN_ID_TESTNET,
        SIGNATURE_TYPE_SINGLE,
        SIGNATURE_TYPE_MULTI,
        components: {
            QrcodeVue,
            FieldCoin,
            ButtonCopyIcon,
            Loader,
            // SignatureList,
        },
        directives: {
            autosize,
            checkEmpty,
        },
        mixins: [validationMixin],
        fetchOnServer: false,
        fetch() {
            let hashTxParams = window.location.hash ? decodeURI(window.location.hash.substr(1)) : '';
            if (!hashTxParams) {
                return;
            }
            try {
                hashTxParams = JSON5.parse(hashTxParams);
            } catch (e) {
                console.log(e)
                return;
            }
            // restore `form.tx` from hash
            Object.keys(this.form.tx).forEach((key) => {
                if (hashTxParams[key]) {
                    if (key === 'data') {
                        this.form.tx[key] = JSON.stringify(hashTxParams[key], null, 4);
                    } else {
                        this.form.tx[key] = hashTxParams[key];
                    }
                }
            });
        },
        data() {
            return {
                isFormSending: false,
                serverError: '',
                serverSuccess: null,
                form: {
                    tx: {
                        nonce: '',
                        chainId: CHAIN_ID_MAINNET,
                        gasPrice: '',
                        gasCoin: '',
                        type: '',
                        data: '',
                        payload: '',
                        signatureType: SIGNATURE_TYPE_SINGLE,
                    },
                    signatureList: ['', ''],
                    multisigAddress: '',
                    mnemonic: '',
                },
                isModeMultisig: false,
                isSigning: false,
                signature: null,
                resultTx: null,
                resultJson: null,
            };
        },
        validations() {
            const form = {
                tx: {
                    nonce: {
                        // if mnemonic is specified, nonce can be fetched from chain
                        required: this.form.mnemonic ? () => true : required,
                    },
                    chainId: {
                        required,
                    },
                    gasPrice: {
                    },
                    gasCoin: {
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(10),
                    },
                    type: {
                        required,
                    },
                    data: {
                        required,
                        validJson: (val) => !this.dataJson.error,
                    },
                    payload: {
                        maxLength: maxLength(1024),
                    },
                },
                multisigAddress: {
                    required: () => true,
                },
                mnemonic: {
                    validMnemonic: this.form.mnemonic ? isValidMnemonic : () => true,
                },
            };

            return {
                form,
            };
        },
        computed: {
            privateKey() {
                if (!this.form.mnemonic) {
                    return '';
                }
                return walletFromMnemonic(this.form.mnemonic).getPrivateKeyString();
            },
            dataJson() {
                if (!this.form.tx.data) {
                    return {
                        error: '',
                        value: '',
                    };
                }

                try {
                    const json = JSON5.parse(this.form.tx.data);
                    return {
                        error: '',
                        value: json,
                    };
                } catch (e) {
                    console.log(e);
                    return {
                        error: e.message,
                        value: 'Invalid JSON',
                    };
                }
            },
            txParams() {
                return {
                    ...this.form.tx,
                    data: this.dataJson.value,
                }
            },
            json() {
                return JSON.stringify(this.txParams, null, 4);
            },
            docsLink() {
                if (this.form.tx.type) {
                    return {
                        text: txTypeList[Number(this.form.tx.type)].name + ' ',
                        urlHash: txTypeList[Number(this.form.tx.type)].name.replace(/\s/g, '-'),
                    };
                } else {
                    return {
                        text: '',
                        urlHash: 'tx-params',
                    };
                }
            }
        },
        methods: {
            submit() {
                if (this.isFormSending) {
                    return;
                }
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                window.history.replaceState(window.history.state, null, window.location.pathname + '#' + JSON.stringify(this.getTxParams()));
                this.signature = null;
                this.resultTx = null;
                this.serverError = '';
                this.serverSuccess = null;

                this.generateTx();
            },
            async generateTx() {
                let txParams = this.getTxParams();


                let tx;
                if (!this.form.multisigAddress) {
                    const nonce = await ensureNonce(txParams, {privateKey: this.privateKey})
                    // private key to sign
                    tx = prepareTx({...txParams, nonce}, {privateKey: this.privateKey});
                } else {
                    const nonce = await ensureNonce(txParams, {address: this.form.multisigAddress})
                    // address to make proof for RedeemCheck
                    tx = prepareTx(this.getTxParamsMultisigData(nonce), {address: this.form.multisigAddress});
                }
                this.resultTx = '0x' + tx.serialize().toString('hex');
                this.resultJson = JSON.stringify(decodeTx(this.resultTx), null, 4);
                // this.clearForm();
            },
            signTx() {
                if (this.isSigning) {
                    return;
                }
                if (!this.form.multisigAddress) {
                    return;
                }
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }
                this.isSigning = true;
                this.signature = null;

                let txParams = this.getTxParams();

                ensureNonce(txParams, {address: this.form.multisigAddress})
                    .then((nonce) => {
                        // address to make proof for RedeemCheck
                        const tx = prepareTx({...txParams, nonce}, {address: this.form.multisigAddress});
                        const signature = makeSignature(tx, this.privateKey).toString('hex');

                        this.signature = `0x${signature}`;
                        // set first signature item
                        this.form.signatureList[0] = this.signature;
                        this.isSigning = false;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.serverError = e.message;
                        this.isSigning = false;
                    });
            },
            getTxParams(nonce) {
                return clearEmptyFields({
                    ...this.txParams,
                    ...(nonce ? {nonce} : {}),
                });
            },
            getTxParamsMultisigData(nonce) {
                return {
                    ...this.getTxParams(),
                    ...(nonce ? {nonce} : {}),
                    signatureData: {
                        multisig: this.form.multisigAddress,
                        signatures: this.form.signatureList?.filter((item) => !!item),
                    },
                };
            },
            clearForm() {
                this.form.tx.gasCoin = '';
                this.form.tx.payload = '';
                this.form.multisigAddress = '';
                this.form.signatureList = null;
                this.form.tx.nonce = '';
                this.form.tx.gasPrice = '';
                this.$v.$reset();
            },
            $td(v) {
                return v;
            }
        },
    };

    /**
     * Ensure empty fields to be undefined
     * @param {Object} obj
     * @return {Object}
     */
    function clearEmptyFields(obj) {
        let result = {};
        Object.keys(obj).forEach((key) => {
            if (obj[key] || obj[key] === 0 || obj[key] === false) {
                result[key] = obj[key];
            }
        });

        return result;
    }
</script>


<template>
    <main class="u-container">
        <section class="u-section">
            <h2 class="u-h2 u-mb-10">Encode transaction</h2>


            <!-- Form -->
            <form class="u-grid u-grid--small u-grid--vertical-margin" novalidate @submit.prevent="submit">
                    <!-- Tx Data Fields -->


                <div class="u-cell">
                    <label class="form-field" :class="{'is-error': $v.form.tx.nonce.$error}">
                        <input class="form-field__input" v-check-empty
                               v-model="form.tx.nonce"
                               @blur="$v.form.tx.nonce.$touch()"
                        />
                        <span class="form-field__label">Nonce</span>
                    </label>
                    <div class="form-field__error" v-if="$v.form.tx.nonce.$dirty && !$v.form.tx.nonce.required">Nonce is required because no seed phrase is specified and nonce can't be fetched from network</div>
                    <div class="form-field__help" v-else>Leave empty to fetch from blockchain for the address of seed phrase</div>
                </div>
                <div class="u-cell">
                    <div class="form-check-label">Chain ID</div>
                    <label class="form-check u-fw-700">
                        <input type="radio" class="form-check__input" :value="$options.CHAIN_ID_MAINNET" v-model="form.tx.chainId">
                        <span class="form-check__label form-check__label--radio">Mainnet</span>
                    </label>
                    <label class="form-check u-fw-700">
                        <input type="radio" class="form-check__input" :value="$options.CHAIN_ID_TESTNET" v-model="form.tx.chainId">
                        <span class="form-check__label form-check__label--radio">Testnet</span>
                    </label>
                    <div class="form-check-error" v-if="$v.form.tx.chainId.$error">Choose chain ID</div>
                </div>
                <div class="u-cell">
                    <label class="form-field" :class="{'is-error': $v.form.tx.gasPrice.$error}">
                        <input class="form-field__input" v-check-empty
                               v-model="form.tx.gasPrice"
                               @blur="$v.form.tx.gasPrice.$touch()"
                        />
                        <span class="form-field__label">Gas Price</span>
                    </label>
                    <div class="form-field__help">By default: 1</div>
                </div>
                <div class="u-cell">
                    <FieldCoin
                            v-model="form.tx.gasCoin"
                            :$value="$v.form.tx.gasCoin"
                            :label="'Gas coin'"
                    />
                    <span class="form-field__error" v-if="$v.form.tx.gasCoin.$dirty && !$v.form.tx.gasCoin.minLength">Min 3 letters</span>
                    <span class="form-field__error" v-else-if="$v.form.tx.gasCoin.$dirty && !$v.form.tx.gasCoin.maxLength">Max 10 letters</span>
                </div>
                <div class="u-cell">
                    <label class="form-field" :class="{'is-error': $v.form.tx.type.$error}">
                        <select class="form-field__input" v-check-empty
                               v-model="form.tx.type"
                               @blur="$v.form.tx.type.$touch()"
                        >
                            <option value=""></option>
                            <option v-for="typeItem in $options.txTypeList" :value="typeItem.hex" v-if="typeItem">{{ typeItem.hex }} {{ typeItem.name }}</option>
                        </select>
                        <span class="form-field__label">Type</span>
                    </label>
                    <span class="form-field__error" v-if="$v.form.tx.type.$dirty && !$v.form.tx.type.required">Type required</span>
                </div>
                <div class="u-cell">
                    <label class="form-field" :class="{'is-error': $v.form.tx.data.$error}">
                        <textarea class="form-field__input" rows="1" v-check-empty v-autosize
                               v-model="form.tx.data"
                               @blur="$v.form.tx.data.$touch()"
                        ></textarea>
                        <span class="form-field__label">Data</span>
                    </label>
                    <span class="form-field__error" v-if="$v.form.tx.data.$dirty && !$v.form.tx.data.required">Data required</span>
                    <span class="form-field__error" v-else-if="$v.form.tx.data.$dirty && !$v.form.tx.data.validJson">{{ dataJson.error }}</span>
                    <div class="form-field__help">Input JSON here. See
                        <a class="link--default" :href="`https://github.com/MinterTeam/minter-js-sdk#${docsLink.urlHash}`" target="_blank" rel="noopener">{{ docsLink.text }}docs</a> for available fields.</div>
                </div>
                <div class="u-cell">
                    <label class="form-field" :class="{'is-error': $v.form.tx.payload.$error}">
                        <input class="form-field__input" type="text" v-check-empty
                               v-model.trim="form.tx.payload"
                               @blur="$v.form.tx.payload.$touch()"
                        >
                        <span class="form-field__label">Payload</span>
                    </label>
                    <span class="form-field__error" v-if="$v.form.tx.payload.$dirty && !$v.form.tx.payload.maxLength">Max 1024 symbols</span>
                </div>
                <div class="u-cell">
                    <div class="form-check-label">Signature type</div>
                    <label class="form-check u-fw-700">
                        <input type="radio" class="form-check__input" :value="$options.SIGNATURE_TYPE_SINGLE" v-model="form.tx.signatureType">
                        <span class="form-check__label form-check__label--radio">Single</span>
                    </label>
                    <label class="form-check u-fw-700">
                        <input type="radio" class="form-check__input" :value="$options.SIGNATURE_TYPE_MULTI" v-model="form.tx.signatureType">
                        <span class="form-check__label form-check__label--radio">Multi</span>
                    </label>
                </div>
                <div class="u-cell">
                    <label class="form-field" :class="{'is-error': $v.form.mnemonic.$error}">
                        <input class="form-field__input" type="text" v-check-empty
                               v-model.trim="form.mnemonic"
                               @blur="$v.form.mnemonic.$touch()"
                        >
                        <span class="form-field__label">Seed phrase</span>
                    </label>
                    <span class="form-field__error" v-if="$v.form.mnemonic.$error">Invalid mnemonic</span>
                    <span class="form-field__help" v-else>Will be used to sign tx. It will not be stored nor send over the internet.</span>
                </div>
                <div class="u-cell" v-show="isModeMultisig">
                    <label class="form-field" :class="{'is-error': $v.form.multisigAddress.$error}">
                        <input class="form-field__input" v-check-empty
                               v-model="form.multisigAddress"
                               @blur="$v.form.multisigAddress.$touch()"
                        />
                        <span class="form-field__label">Multisig address</span>
                    </label>
                </div>




                <!-- Controls -->
                <div class="u-cell">
                    <button
                            class="button button--ghost-main button--full"
                            type="button"
                            v-show="isModeMultisig"
                            :class="{'is-disabled': $v.form.multisigAddress.$invalid, 'is-loading': isSigning}"
                            @click="signTx"
                    >
                        <span class="button__content">{{ $td('Sign', 'form.tx.multisig-sign') }}</span>
                        <Loader class="button__loader" :isLoading="true"/>
                    </button>
                </div>
                <div class="u-cell">
                    <button class="button button--main button--full" :class="{'is-disabled': $v.$invalid}">
                        Encode
                    </button>
                    <div class="form-field__error" data-test-id="txErrorMessage" v-if="serverError">{{ serverError }}</div>
                </div>


                <div class="u-cell" v-if="signature">
                    <dl>
                        <dt>{{ $td('Signature', 'form.tx.multisig-result-signature') }}</dt>
                        <dd class="u-icon-wrap">
                        <span class="u-select-all u-icon-text">
                            {{ signature }}
                        </span>
                            <ButtonCopyIcon class="u-icon--copy--right" :copy-text="signature"/>
                        </dd>
                    </dl>
                    <!--                    <br>-->
                    <!--                    <qrcode-vue :value="signature" :size="200" level="L"></qrcode-vue>-->
                </div>
            </form>


            <h2 class="u-h3 u-mb-10 u-mt-20" v-if="resultTx">Result:</h2>
            <div class="u-grid u-grid--medium u-grid--vertical-margin" v-if="resultTx">
                <div class="u-cell">
                    <label class="form-field form-field--with-icon">
                        <textarea class="form-field__input is-not-empty" rows="1" readonly v-autosize
                                  :value="resultTx"
                        ></textarea>
                        <ButtonCopyIcon class="form-field__icon form-field__icon--copy" :copy-text="resultTx"/>
                        <span class="form-field__label">Transaction</span>
                    </label>
                    <!--<qrcode-vue :value="resultTx" :size="200" level="L"></qrcode-vue>-->
                </div>
                <div class="u-cell">
                    <label class="form-field">
                            <textarea class="form-field__input is-not-empty" rows="1" readonly v-autosize
                                      :value="resultJson"
                            ></textarea>
                        <span class="form-field__label">Result JSON</span>
                    </label>
                    <!--<span class="form-field__help">Note: coin values converted from pip</span>-->
                </div>
            </div>

<!--
            <h2 class="u-h3 u-mb-10 u-mt-20">Notes</h2>
            <p>
                — <a class="link&#45;&#45;default" href="https://github.com/MinterTeam/minter-js-sdk#decode-transaction" target="_blank">decodeTx</a> method from minter-js-sdk is used under the hood. <br>
                — coin values will be converted from pip
            </p>
-->
        </section>
    </main>
</template>
