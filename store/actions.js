import {getBalance, getProfile, getProfileAddressEncrypted, getCoinList, getAddressStakeList, getValidatorList} from "~/api/explorer.js";
// import explorer from "~/api/explorer";

let activeCoinListPromise;
let coinListTime = 0;

export default {
    FETCH_COIN_LIST: () => {
        if (Date.now() - coinListTime > 60 * 1000) {
            activeCoinListPromise = getCoinList();
            coinListTime = Date.now();
        }
        return activeCoinListPromise;
    },
    FETCH_VALIDATOR_LIST({ commit }) {
        return getValidatorList()
            .then((validatorList) => {
                commit('SET_VALIDATOR_LIST', validatorList);
                return validatorList;
            });
    },
};
