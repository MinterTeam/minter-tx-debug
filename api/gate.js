import MinterApi from "minter-js-sdk/src/api";
import PostTx, {EnsureNonce} from 'minter-js-sdk/src/api/post-tx';
import PostSignedTx from 'minter-js-sdk/src/api/post-signed-tx';
import GetNonce from 'minter-js-sdk/src/api/get-nonce';
import EstimateCoinSell from 'minter-js-sdk/src/api/estimate-coin-sell';
import EstimateCoinBuy from 'minter-js-sdk/src/api/estimate-coin-buy';
import {ReplaceCoinSymbol, ReplaceCoinSymbolByPath, ReplaceCoinId} from 'minter-js-sdk/src/api/replace-coin.js';
import {GATE_API_URL} from '~/assets/variables';

const minterApi = new MinterApi({apiType: 'gate', baseURL: GATE_API_URL});

export const postTx = PostTx(minterApi);

export const postSignedTx = PostSignedTx(minterApi);

export const getNonce = GetNonce(minterApi);

export const ensureNonce = EnsureNonce(minterApi);

export const estimateCoinSell = EstimateCoinSell(minterApi);
export const estimateCoinBuy = EstimateCoinBuy(minterApi);

export const replaceCoinSymbol = ReplaceCoinSymbol(minterApi);
export const replaceCoinSymbolByPath = ReplaceCoinSymbolByPath(minterApi);
export const replaceCoinId = ReplaceCoinId(minterApi);



