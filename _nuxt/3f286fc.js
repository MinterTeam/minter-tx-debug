(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{272:function(t,e,r){"use strict";function n(t){return"SELECT"===t.nodeName.toUpperCase()}function o(t){l(t.target)}function l(t){t.value.length?t.classList.add("is-not-empty"):t.classList.remove("is-not-empty")}e.a={bind:function(t,e,r){n(t)?(setTimeout((function(){l(t)}),0),t.addEventListener("change",o)):(l(t),t.addEventListener("input",o)),e.value&&t.addEventListener(e.value,o),r.componentInstance&&r.componentInstance.$on("input",(function(){return l(t)}))},componentUpdated:function(t,e){l(t),e.oldValue!==e.value&&(t.removeEventListener(e.oldValue,o),e.value&&t.addEventListener(e.value,o))},unbind:function(t,e,r){n(t)?t.removeEventListener("change",o):t.removeEventListener("input",o),e.value&&t.removeEventListener(e.value,o)}}},341:function(t,e){},342:function(t,e){},346:function(t,e){},348:function(t,e){},351:function(t,e){},352:function(t,e){},356:function(t,e){},357:function(t,e){},363:function(t,e){},368:function(t,e){},373:function(t,e){},408:function(t,e){},411:function(t,e,r){"use strict";r.d(e,"a",(function(){return h})),r.d(e,"c",(function(){return y})),r.d(e,"b",(function(){return C}));var n=r(263),o=r(258),l=r(261),c=r(260),m=r(264),d=r(257),f=r(247),v=r(65),_=new n.a({apiType:"gate",baseURL:v.g}),h=(Object(o.b)(_),Object(l.a)(_),Object(c.a)(_),Object(o.a)(_)),y=(Object(m.a)(_),Object(d.a)(_),Object(f.e)(_)),C=(Object(f.f)(_),Object(f.c)(_))},467:function(t,e,r){},568:function(t,e,r){"use strict";r(467)},590:function(t,e,r){"use strict";r.r(e);r(12),r(28),r(40);var n=r(582),o=r(6),l=r(19),c=r(3),m=r(37),d=(r(45),r(25),r(22),r(248),r(31),r(26),r(117),r(66),r(54),r(21),r(7),r(20),r(50),r(51),r(27),r(563)),f=r(564),v=r(468),_=r(471),h=r.n(_),y=r(470),C=r.n(y),x=r(338),$=r(249),T=r(280),k=r(369),w=r(250),N=r(376),S=r(271),E=r(411),I=r(272),O=r(65),P=r(585),L=(r(412),r(16),r(581)),A=["input"],j={ideFix:null,MAX_ITEM_COUNT:6,components:{VueSimpleSuggest:L.a},directives:{checkEmpty:I.a},inheritAttrs:!1,props:{value:{type:String,default:""},$value:{type:Object,required:!0},label:{type:String,required:!0},coinList:{type:Array,default:function(){return[]}}},data:function(){return{coinListAll:[]}},computed:{listeners:function(){var t=this.$listeners,e=(t.input,Object(P.a)(t,A));return e},isConListSpecified:function(){return this.coinList&&this.coinList.length},currentCoinList:function(){return this.isConListSpecified?this.coinList:this.coinListAll},maxSuggestions:function(){return this.isConListSpecified?0:6}},watch:{currentCoinList:function(){this.$refs.vss.research()}},mounted:function(){var t=this;this.$store.dispatch("FETCH_COIN_LIST").then((function(e){t.coinListAll=Object.freeze(e.map((function(t){return t.symbol})))})).catch((function(t){console.log(t)}))},methods:{suggestionOrder:function(t){return t?this.currentCoinList.slice(0).sort((function(a,b){return a===t?-1:b===t?1:0})):this.currentCoinList},suggestionFilter:function(t,e){return!e||0===this.getSuggestionCoin(t).indexOf(e)},handleSuggestionClick:function(t,e){e.preventDefault()},getSuggestionCoin:function(t){return t.coin||t}}},M=r(23),D=Object(M.a)(j,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("label",{staticClass:"form-field",class:{"is-error":t.$value.$error}},[r("VueSimpleSuggest",{ref:"vss",attrs:{value:t.value,list:t.suggestionOrder,"max-suggestions":t.maxSuggestions,"min-length":0,"filter-by-query":!0,filter:t.suggestionFilter,"display-attribute":"coin","value-attribute":"coin",destyled:!0,controls:{showList:[38,40]}},on:{input:function(e){return t.$emit("input",e)},blur:function(e){t.$value.$touch(),t.$emit("blur",e)},"suggestion-click":t.handleSuggestionClick},scopedSlots:t._u([{key:"suggestion-item",fn:function(e){var n=e.suggestion;return r("span",{},[t._v("\n            "+t._s(t.getSuggestionCoin(n))+"\n        ")])}}])},[r("input",t._b({directives:[{name:"check-empty",rawName:"v-check-empty"}],staticClass:"form-field__input",attrs:{type:"text"},domProps:{value:t.value}},"input",t.$attrs,!1)),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v(t._s(t.label))])])],1)}),[],!1,null,null,null).exports,J=r(583),U={props:{copyText:{type:String,required:!0}},computed:{isClipboardSupported:function(){return J.b()}},methods:{copy:function(t){J.a(t)&&this.$store.commit("SET_SNACKBAR_ACTIVE")}}},Y={components:{ButtonCopy:Object(M.a)(U,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.isClipboardSupported?r("button",{attrs:{type:"button"},on:{click:function(e){return t.copy(t.copyText)}}},[t._t("default")],2):t._e()}),[],!1,null,null,null).exports},props:{copyText:{type:String,required:!0}}},R=Object(M.a)(Y,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ButtonCopy",{staticClass:"u-icon u-semantic-button link--opacity",attrs:{"aria-label":"Copy","copy-text":t.copyText}},[r("img",{attrs:{src:t.BASE_URL_PREFIX+"/img/icon-copy.svg"}})])}),[],!1,null,null,null).exports,z={props:{isLoading:{type:Boolean,default:!1}}},B=(r(568),Object(M.a)(z,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.isLoading?r("svg",{staticClass:"loader",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 28 28"}},[r("circle",{staticClass:"loader__path",attrs:{cx:"14",cy:"14",r:"12"}})]):t._e()}),[],!1,null,null,null).exports),F=r(469),G=r.n(F);function H(t){return t.map((function(t){return{signature:t}}))}var K={directives:{autosize:x.a,checkEmpty:I.a},mixins:[v.validationMixin],props:{value:{type:Array,required:!0}},data:function(){return{list:H(this.value)}},validations:function(){return{list:{minLength:G()(1),maxLength:C()(32),$each:{signature:{required:h.a}}}}},computed:{listHash:function(){var t=this.list.reduce((function(t,e){return t+e.signature}),"");return this.list.length.toString()+t}},watch:{value:function(t){this.list=H(t)},listHash:function(){this.updateModel()}},methods:{addParticipant:function(){this.list.push({signature:""})},removeParticipant:function(t){var e=this;setTimeout((function(){e.list.splice(t,1)}),100)},updateModel:function(){this.$emit("input",this.list.map((function(t){return t.signature})))}}},V=Object(M.a)(K,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"u-grid u-grid--small u-grid--vertical-margin"},[t._l(t.$v.list.$each.$iter,(function(e,n){return r("div",{key:n,staticClass:"multisig-signature__cell u-cell"},[r("label",{staticClass:"form-field multisig-signature__field",class:{"is-error":e.signature.$error}},[r("textarea",{directives:[{name:"check-empty",rawName:"v-check-empty"},{name:"autosize",rawName:"v-autosize"},{name:"model",rawName:"v-model.trim",value:e.signature.$model,expression:"v.signature.$model",modifiers:{trim:!0}}],staticClass:"form-field__input",attrs:{autocapitalize:"off",spellcheck:"false",rows:"1"},domProps:{value:e.signature.$model},on:{blur:[function(t){return e.signature.$touch()},function(e){return t.$forceUpdate()}],input:function(r){r.target.composing||t.$set(e.signature,"$model",r.target.value.trim())}}}),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Signature #"+t._s(Number(n)+1))])]),t._v(" "),n>0?r("button",{staticClass:"multisig-signature__remove u-semantic-button link--opacity",attrs:{type:"button"},on:{click:function(e){return t.removeParticipant(n)}}},[r("img",{attrs:{src:"/img/icon-remove.svg",alt:"Remove signature"}})]):t._e(),t._v(" "),e.signature.$dirty&&!e.signature.required?r("span",{staticClass:"form-field__error"},[t._v("Enter signature")]):t._e()])})),t._v(" "),r("div",{staticClass:"u-cell u-text-left"},[r("button",{staticClass:"button button--ghost-black",attrs:{type:"button"},on:{click:t.addParticipant}},[t._v("\n            + Add signature\n        ")])])],2)}),[],!1,null,null,null).exports;function X(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function Q(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?X(Object(source),!0).forEach((function(e){Object(m.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):X(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var W="id";var Z={txTypeList:T.c,CHAIN_ID_MAINNET:O.d,CHAIN_ID_TESTNET:O.e,SIGNATURE_TYPE_SINGLE:O.i,SIGNATURE_TYPE_MULTI:O.h,COIN_TYPE_ID:W,COIN_TYPE_SYMBOL:"symbol",components:{QrcodeVue:f.a,FieldCoin:D,ButtonCopyIcon:R,Loader:B,SignatureList:V},directives:{autosize:x.a,checkEmpty:I.a},mixins:[v.validationMixin],fetchOnServer:!1,fetch:function(){var t=this,e=window.location.hash?decodeURI(window.location.hash.substr(1)):"";if(e){try{e=d.a.parse(e)}catch(t){return void console.log(t)}Object.keys(this.form.tx).forEach((function(r){e[r]&&(t.form.tx[r]="data"===r?JSON.stringify(e[r],null,4):e[r])}))}},data:function(){return{isFormSending:!1,serverError:"",serverSuccess:null,form:{tx:{nonce:"",chainId:O.d,gasPrice:"",gasCoin:"",type:"",data:"",payload:"",signatureType:O.i},signatureList:[],multisigAddress:"",mnemonic:"",coinType:W},isSigning:!1,signature:null,resultTx:null,resultJson:null,resultMinterLink:null}},validations:function(){var t=this;return{form:{tx:{nonce:{required:this.form.mnemonic?function(){return!0}:h.a},chainId:{required:h.a},gasPrice:{},gasCoin:{required:h.a},type:{required:h.a},data:{required:h.a,validJson:function(e){return!t.dataJson.error}},payload:{maxLength:C()(1024)}},multisigAddress:{required:this.isModeMultisig?h.a:function(){return!0},validAddress:this.form.multisigAddress?$.c:function(){return!0}},mnemonic:{validMnemonic:this.form.mnemonic?k.a:function(){return!0}}}}},computed:{privateKey:function(){return this.form.mnemonic?Object(k.b)(this.form.mnemonic).getPrivateKeyString():""},isModeMultisig:function(){return this.form.tx.signatureType===O.h},dataJson:function(){if(!this.form.tx.data)return{error:"",value:""};try{return{error:"",value:d.a.parse(this.form.tx.data)}}catch(t){return console.log(t),{error:t.message,value:"Invalid JSON"}}},txParams:function(){return Q(Q({},this.form.tx),{},{data:this.dataJson.value})},json:function(){return JSON.stringify(this.txParams,null,4)},docsLink:function(){return this.form.tx.type?{text:T.c[Number(this.form.tx.type)].name+" ",urlHash:T.c[Number(this.form.tx.type)].name.replace(/\s/g,"-")}:{text:"",urlHash:"tx-params"}}},watch:{"form.tx.type":{handler:function(t){var e=this;if(t){var r=new N.a(void 0,t)._fields,n=Object.fromEntries(r.map((function(t){return[t,""]})));"object"!==Object(c.a)(this.dataJson.value)||this.dataJson.error||Object.entries(this.dataJson.value).forEach((function(t){var o=Object(l.a)(t,2),c=o[0];o[1];r.includes(c)&&e.dataJson.value[c]&&(n[c]=e.dataJson.value[c])})),this.form.tx.data=JSON.stringify(n,null,4)}}}},methods:{submit:function(){var t=this;this.isFormSending||(this.$v.$invalid?this.$v.$touch():(window.history.replaceState(window.history.state,null,window.location.pathname+"#"+JSON.stringify(this.getTxParams())),this.signature=null,this.resultTx=null,this.serverError="",this.serverSuccess=null,this.isFormSending=!0,this.generateTx().then((function(){t.isFormSending=!1})).catch((function(e){t.isFormSending=!1,t.serverError=e.message,console.log(e)}))))},generateTx:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r,n,o,c,m,d,f,v;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.getTxParamsCoinId(),n=t.isModeMultisig?{address:t.form.multisigAddress}:{privateKey:t.privateKey},o=Object(E.a)({nonce:t.txParams.nonce},n),e.next=5,Promise.all([r,o]);case 5:c=e.sent,m=Object(l.a)(c,2),d=m[0],f=m[1],v=t.isModeMultisig?Object(w.d)(t.getTxParamsMultisigData(d,f),{address:t.form.multisigAddress}):Object(w.d)(Q(Q({},d),{},{nonce:f}),{privateKey:t.privateKey}),t.resultTx=v.serializeToString(),t.resultJson=JSON.stringify(Object(w.a)(t.resultTx),null,4),t.resultMinterLink=Object(S.a)(d);case 13:case"end":return e.stop()}}),e)})))()},signTx:function(){var t=this;if(!this.isSigning)if(this.$v.$invalid)this.$v.$touch();else{this.isSigning=!0,this.signature=null;var e=this.getTxParamsCoinId(),r=Object(E.a)({nonce:this.txParams.nonce},{address:this.form.multisigAddress});Promise.all([e,r]).then((function(e){var r=Object(l.a)(e,2),o=r[0],c=r[1],m=Object(w.d)(Q(Q({},o),{},{nonce:c}),{address:t.form.multisigAddress}),d=Object(w.c)(m,t.privateKey).toString("hex");t.signature="0x".concat(d),t.form.signatureList=[].concat(Object(n.a)(t.form.signatureList),[t.signature]),t.isSigning=!1})).catch((function(e){console.log(e),t.serverError=e.message,t.isSigning=!1}))}},getTxParams:function(){return t=this.txParams,e={},Object.keys(t).forEach((function(r){(t[r]||0===t[r]||!1===t[r])&&(e[r]=t[r])})),e;var t,e},getTxParamsCoinId:function(){return this.form.coinType===W?Promise.resolve(this.getTxParams()):Object(E.c)(this.getTxParams())},getTxParamsMultisigData:function(t,e){var r;return Q(Q(Q({},t),e?{nonce:e}:{}),{},{signatureData:{multisig:this.form.multisigAddress,signatures:null===(r=this.form.signatureList)||void 0===r?void 0:r.filter((function(t){return!!t}))}})},clearForm:function(){this.form.tx.gasCoin="",this.form.tx.payload="",this.form.multisigAddress="",this.form.signatureList=null,this.form.tx.nonce="",this.form.tx.gasPrice="",this.$v.$reset()}}},tt=Object(M.a)(Z,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("main",{staticClass:"u-container"},[r("section",{staticClass:"u-section"},[r("h2",{staticClass:"u-h2 u-mb-10"},[t._v("Encode transaction")]),t._v(" "),r("form",{staticClass:"u-grid u-grid--small u-grid--vertical-margin",attrs:{novalidate:""},on:{submit:function(e){return e.preventDefault(),t.submit.apply(null,arguments)}}},[r("div",{staticClass:"u-cell"},[r("label",{staticClass:"form-field",class:{"is-error":t.$v.form.tx.nonce.$error}},[r("input",{directives:[{name:"check-empty",rawName:"v-check-empty"},{name:"model",rawName:"v-model",value:t.form.tx.nonce,expression:"form.tx.nonce"}],staticClass:"form-field__input",domProps:{value:t.form.tx.nonce},on:{blur:function(e){return t.$v.form.tx.nonce.$touch()},input:function(e){e.target.composing||t.$set(t.form.tx,"nonce",e.target.value)}}}),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Nonce")])]),t._v(" "),t.$v.form.tx.nonce.$dirty&&!t.$v.form.tx.nonce.required?r("div",{staticClass:"form-field__error"},[t._v("Nonce is required because no seed phrase is specified and nonce can't be fetched from network")]):r("div",{staticClass:"form-field__help"},[t._v("Leave empty to fetch from blockchain for the address of seed phrase")])]),t._v(" "),r("div",{staticClass:"u-cell"},[r("div",{staticClass:"form-check-label"},[t._v("Chain ID")]),t._v(" "),r("label",{staticClass:"form-check u-fw-700"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.tx.chainId,expression:"form.tx.chainId"}],staticClass:"form-check__input",attrs:{type:"radio"},domProps:{value:t.$options.CHAIN_ID_MAINNET,checked:t._q(t.form.tx.chainId,t.$options.CHAIN_ID_MAINNET)},on:{change:function(e){return t.$set(t.form.tx,"chainId",t.$options.CHAIN_ID_MAINNET)}}}),t._v(" "),r("span",{staticClass:"form-check__label form-check__label--radio"},[t._v("Mainnet")])]),t._v(" "),r("label",{staticClass:"form-check u-fw-700"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.tx.chainId,expression:"form.tx.chainId"}],staticClass:"form-check__input",attrs:{type:"radio"},domProps:{value:t.$options.CHAIN_ID_TESTNET,checked:t._q(t.form.tx.chainId,t.$options.CHAIN_ID_TESTNET)},on:{change:function(e){return t.$set(t.form.tx,"chainId",t.$options.CHAIN_ID_TESTNET)}}}),t._v(" "),r("span",{staticClass:"form-check__label form-check__label--radio"},[t._v("Testnet")])]),t._v(" "),t.$v.form.tx.chainId.$error?r("div",{staticClass:"form-check-error"},[t._v("Choose chain ID")]):t._e()]),t._v(" "),r("div",{staticClass:"u-cell"},[r("label",{staticClass:"form-field",class:{"is-error":t.$v.form.tx.gasPrice.$error}},[r("input",{directives:[{name:"check-empty",rawName:"v-check-empty"},{name:"model",rawName:"v-model",value:t.form.tx.gasPrice,expression:"form.tx.gasPrice"}],staticClass:"form-field__input",domProps:{value:t.form.tx.gasPrice},on:{blur:function(e){return t.$v.form.tx.gasPrice.$touch()},input:function(e){e.target.composing||t.$set(t.form.tx,"gasPrice",e.target.value)}}}),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Gas Price")])]),t._v(" "),r("div",{staticClass:"form-field__help"},[t._v("By default: 1")])]),t._v(" "),r("div",{staticClass:"u-cell"},[r("FieldCoin",{attrs:{$value:t.$v.form.tx.gasCoin,label:"Gas coin"},model:{value:t.form.tx.gasCoin,callback:function(e){t.$set(t.form.tx,"gasCoin",e)},expression:"form.tx.gasCoin"}}),t._v(" "),t.$v.form.tx.gasCoin.$dirty&&!t.$v.form.tx.gasCoin.required?r("span",{staticClass:"form-field__error"},[t._v("Enter gas coin")]):t._e()],1),t._v(" "),r("div",{staticClass:"u-cell"},[r("label",{staticClass:"form-field",class:{"is-error":t.$v.form.tx.type.$error}},[r("select",{directives:[{name:"check-empty",rawName:"v-check-empty"},{name:"model",rawName:"v-model",value:t.form.tx.type,expression:"form.tx.type"}],staticClass:"form-field__input",on:{blur:function(e){return t.$v.form.tx.type.$touch()},change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.form.tx,"type",e.target.multiple?r:r[0])}}},[r("option",{attrs:{value:""}}),t._v(" "),t._l(t.$options.txTypeList,(function(e){return e?r("option",{domProps:{value:e.hex}},[t._v(t._s(e.hex)+" "+t._s(e.name))]):t._e()}))],2),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Type")])]),t._v(" "),t.$v.form.tx.type.$dirty&&!t.$v.form.tx.type.required?r("span",{staticClass:"form-field__error"},[t._v("Type required")]):t._e()]),t._v(" "),r("div",{staticClass:"u-cell"},[r("label",{staticClass:"form-field",class:{"is-error":t.$v.form.tx.data.$error}},[r("textarea",{directives:[{name:"check-empty",rawName:"v-check-empty"},{name:"autosize",rawName:"v-autosize"},{name:"model",rawName:"v-model",value:t.form.tx.data,expression:"form.tx.data"}],staticClass:"form-field__input",attrs:{rows:"1"},domProps:{value:t.form.tx.data},on:{blur:function(e){return t.$v.form.tx.data.$touch()},input:function(e){e.target.composing||t.$set(t.form.tx,"data",e.target.value)}}}),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Data")])]),t._v(" "),t.$v.form.tx.data.$dirty&&!t.$v.form.tx.data.required?r("span",{staticClass:"form-field__error"},[t._v("Data required")]):t.$v.form.tx.data.$dirty&&!t.$v.form.tx.data.validJson?r("span",{staticClass:"form-field__error"},[t._v(t._s(t.dataJson.error))]):t._e(),t._v(" "),r("div",{staticClass:"form-field__help"},[t._v("Input JSON here. See\n                        "),r("a",{staticClass:"link--default",attrs:{href:"https://github.com/MinterTeam/minter-js-sdk#"+t.docsLink.urlHash,target:"_blank",rel:"noopener"}},[t._v(t._s(t.docsLink.text)+"docs")]),t._v(" for available fields.")])]),t._v(" "),r("div",{staticClass:"u-cell"},[r("label",{staticClass:"form-field",class:{"is-error":t.$v.form.tx.payload.$error}},[r("input",{directives:[{name:"check-empty",rawName:"v-check-empty"},{name:"model",rawName:"v-model.trim",value:t.form.tx.payload,expression:"form.tx.payload",modifiers:{trim:!0}}],staticClass:"form-field__input",attrs:{type:"text"},domProps:{value:t.form.tx.payload},on:{blur:[function(e){return t.$v.form.tx.payload.$touch()},function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||t.$set(t.form.tx,"payload",e.target.value.trim())}}}),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Payload")])]),t._v(" "),t.$v.form.tx.payload.$dirty&&!t.$v.form.tx.payload.maxLength?r("span",{staticClass:"form-field__error"},[t._v("Max 1024 symbols")]):t._e()]),t._v(" "),r("div",{staticClass:"u-cell"},[r("div",{staticClass:"form-check-label"},[t._v("Signature type")]),t._v(" "),r("label",{staticClass:"form-check u-fw-700"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.tx.signatureType,expression:"form.tx.signatureType"}],staticClass:"form-check__input",attrs:{type:"radio"},domProps:{value:t.$options.SIGNATURE_TYPE_SINGLE,checked:t._q(t.form.tx.signatureType,t.$options.SIGNATURE_TYPE_SINGLE)},on:{change:function(e){return t.$set(t.form.tx,"signatureType",t.$options.SIGNATURE_TYPE_SINGLE)}}}),t._v(" "),r("span",{staticClass:"form-check__label form-check__label--radio"},[t._v("Single")])]),t._v(" "),r("label",{staticClass:"form-check u-fw-700"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.tx.signatureType,expression:"form.tx.signatureType"}],staticClass:"form-check__input",attrs:{type:"radio"},domProps:{value:t.$options.SIGNATURE_TYPE_MULTI,checked:t._q(t.form.tx.signatureType,t.$options.SIGNATURE_TYPE_MULTI)},on:{change:function(e){return t.$set(t.form.tx,"signatureType",t.$options.SIGNATURE_TYPE_MULTI)}}}),t._v(" "),r("span",{staticClass:"form-check__label form-check__label--radio"},[t._v("Multi")])])]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.isModeMultisig,expression:"isModeMultisig"}],staticClass:"u-cell"},[r("label",{staticClass:"form-field",class:{"is-error":t.$v.form.multisigAddress.$error}},[r("input",{directives:[{name:"check-empty",rawName:"v-check-empty"},{name:"model",rawName:"v-model",value:t.form.multisigAddress,expression:"form.multisigAddress"}],staticClass:"form-field__input",domProps:{value:t.form.multisigAddress},on:{blur:function(e){return t.$v.form.multisigAddress.$touch()},input:function(e){e.target.composing||t.$set(t.form,"multisigAddress",e.target.value)}}}),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Multisig address")])]),t._v(" "),t.$v.form.multisigAddress.$dirty&&!t.$v.form.multisigAddress.required?r("span",{staticClass:"form-field__error"},[t._v('Required for "Multi" signature type')]):t._e(),t._v(" "),t.$v.form.multisigAddress.$dirty&&!t.$v.form.multisigAddress.validAddress?r("span",{staticClass:"form-field__error"},[t._v("Invalid address")]):t._e()]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.isModeMultisig,expression:"isModeMultisig"}],staticClass:"u-cell"},[r("SignatureList",{model:{value:t.form.signatureList,callback:function(e){t.$set(t.form,"signatureList",e)},expression:"form.signatureList"}})],1),t._v(" "),r("div",{staticClass:"u-cell"},[r("label",{staticClass:"form-field",class:{"is-error":t.$v.form.mnemonic.$error}},[r("input",{directives:[{name:"check-empty",rawName:"v-check-empty"},{name:"model",rawName:"v-model.trim",value:t.form.mnemonic,expression:"form.mnemonic",modifiers:{trim:!0}}],staticClass:"form-field__input",attrs:{type:"text"},domProps:{value:t.form.mnemonic},on:{blur:[function(e){return t.$v.form.mnemonic.$touch()},function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||t.$set(t.form,"mnemonic",e.target.value.trim())}}}),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Seed phrase")])]),t._v(" "),t.$v.form.mnemonic.$error?r("span",{staticClass:"form-field__error"},[t._v("Invalid mnemonic")]):r("span",{staticClass:"form-field__help"},[t._v("Will be used to sign tx. It will not be stored nor send over the internet.")])]),t._v(" "),r("div",{staticClass:"u-cell"},[r("div",{staticClass:"form-check-label"},[t._v("Coin arguments specified as:")]),t._v(" "),r("label",{staticClass:"form-check u-fw-700"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.coinType,expression:"form.coinType"}],staticClass:"form-check__input",attrs:{type:"radio"},domProps:{value:t.$options.COIN_TYPE_ID,checked:t._q(t.form.coinType,t.$options.COIN_TYPE_ID)},on:{change:function(e){return t.$set(t.form,"coinType",t.$options.COIN_TYPE_ID)}}}),t._v(" "),r("span",{staticClass:"form-check__label form-check__label--radio"},[t._v("IDs")])]),t._v(" "),r("label",{staticClass:"form-check u-fw-700"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.form.coinType,expression:"form.coinType"}],staticClass:"form-check__input",attrs:{type:"radio"},domProps:{value:t.$options.COIN_TYPE_SYMBOL,checked:t._q(t.form.coinType,t.$options.COIN_TYPE_SYMBOL)},on:{change:function(e){return t.$set(t.form,"coinType",t.$options.COIN_TYPE_SYMBOL)}}}),t._v(" "),r("span",{staticClass:"form-check__label form-check__label--radio"},[t._v("Symbols")])])]),t._v(" "),r("div",{staticClass:"u-cell"},[r("button",{directives:[{name:"show",rawName:"v-show",value:t.isModeMultisig,expression:"isModeMultisig"}],staticClass:"button button--ghost-black button--full",class:{"is-disabled":!1,"is-loading":t.isSigning},attrs:{type:"button"},on:{click:t.signTx}},[r("span",{staticClass:"button__content"},[t._v("Sign")]),t._v(" "),r("Loader",{staticClass:"button__loader",attrs:{isLoading:t.isSigning}})],1)]),t._v(" "),r("div",{staticClass:"u-cell"},[r("button",{staticClass:"button button--main button--full",class:{"is-disabled":t.$v.$invalid,"is-loading":t.isFormSending}},[r("span",{staticClass:"button__content"},[t._v("Encode")]),t._v(" "),r("Loader",{staticClass:"button__loader",attrs:{isLoading:t.isFormSending}})],1),t._v(" "),t.serverError?r("div",{staticClass:"form-field__error",attrs:{"data-test-id":"txErrorMessage"}},[t._v(t._s(t.serverError))]):t._e()])]),t._v(" "),t.signature?r("h2",{staticClass:"u-h3 u-mb-10 u-mt-20"},[t._v("Signature:")]):t._e(),t._v(" "),t.signature?r("div",{staticClass:"u-grid u-grid--medium u-grid--vertical-margin"},[r("div",{staticClass:"u-cell"},[r("label",{staticClass:"form-field form-field--with-icon"},[r("textarea",{directives:[{name:"autosize",rawName:"v-autosize"}],staticClass:"form-field__input is-not-empty",attrs:{rows:"1",readonly:""},domProps:{value:t.signature}}),t._v(" "),r("ButtonCopyIcon",{staticClass:"form-field__icon form-field__icon--copy",attrs:{"copy-text":t.signature}}),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Signature")])],1)])]):t._e(),t._v(" "),t.resultTx?r("h2",{staticClass:"u-h3 u-mb-10 u-mt-20"},[t._v("Result:")]):t._e(),t._v(" "),t.resultTx?r("div",{staticClass:"u-grid u-grid--medium u-grid--vertical-margin"},[r("div",{staticClass:"u-cell"},[r("label",{staticClass:"form-field form-field--with-icon"},[r("textarea",{directives:[{name:"autosize",rawName:"v-autosize"}],staticClass:"form-field__input is-not-empty",attrs:{rows:"1",readonly:""},domProps:{value:t.resultTx}}),t._v(" "),r("ButtonCopyIcon",{staticClass:"form-field__icon form-field__icon--copy",attrs:{"copy-text":t.resultTx}}),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Transaction")])],1)]),t._v(" "),r("div",{staticClass:"u-cell"},[r("label",{staticClass:"form-field"},[r("textarea",{directives:[{name:"autosize",rawName:"v-autosize"}],staticClass:"form-field__input is-not-empty",attrs:{rows:"1",readonly:""},domProps:{value:t.resultJson}}),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Result JSON")])])]),t._v(" "),r("div",{staticClass:"u-cell"},[r("label",{staticClass:"form-field form-field--with-icon"},[r("textarea",{directives:[{name:"autosize",rawName:"v-autosize"}],staticClass:"form-field__input is-not-empty",attrs:{rows:"1",readonly:""},domProps:{value:t.resultMinterLink}}),t._v(" "),r("ButtonCopyIcon",{staticClass:"form-field__icon form-field__icon--copy",attrs:{"copy-text":t.resultMinterLink}}),t._v(" "),r("span",{staticClass:"form-field__label"},[t._v("Minter Link")])],1)])]):t._e()])])}),[],!1,null,null,null);e.default=tt.exports}}]);