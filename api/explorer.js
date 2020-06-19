import axios from 'axios';
import {EXPLORER_API_URL} from "~/assets/variables";
import addToCamelInterceptor from '~/assets/to-camel.js';

const instance = axios.create({
    baseURL: EXPLORER_API_URL,
});
addToCamelInterceptor(instance);

export default instance;


/**
 * @return {Promise<Array<CoinItem>>}
 */
export function getCoinList() {
    return instance.get('coins')
        .then((response) => response.data.data);
    // don't sort, coins already sorted by reserve
    // .then((response) => response.data.data.sort((a, b) => {
    //     if (a.symbol === COIN_NAME) {
    //         return -1;
    //     } else if (b.symbol === COIN_NAME) {
    //         return 1;
    //     } else {
    //         return a.symbol.localeCompare(b.symbol);
    //     }
    // }));
}

/**
 * @typedef {Object} CoinItem
 * @param {number} crr
 * @param {number|string} volume
 * @param {number|string} reserve_balance
 * @param {string} name
 * @param {string} symbol
 */

/**
 * @return {Promise<Array<Validator>>}
 */
export function getValidatorList() {
    return instance.get(`validators`)
        .then((response) => {
            return response.data.data.sort((a, b) => {
                // Sort by stake descending
                return b.stake - a.stake;
            });
        });
}

/**
 * @typedef {Object} Validator
 * @property {string} [publicKey]
 * @property {ValidatorMeta} meta
 * @property {number} status
 * @property {string|number} stake
 * @property {string|number} part
 * @property {number} delegatorCount
 * @property {Array<{coin: string, value: string, address: string}>} delegatorList
 */

/**
 * @typedef {Object} ValidatorMeta
 * @property {string} name
 * @property {string} description
 * @property {string} icon_url
 * @property {string} site_url
 */

