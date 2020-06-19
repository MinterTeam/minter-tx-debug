<script>
    import {getErrorText} from '~/assets/server-error';

    export default {
        props: ['error'],
        computed: {
            statusCode() {
                if (this.error.response) {
                    return this.error.response.status;
                } else if (this.error.request) {
                    return this.error.request.status;
                } else if (this.error.status) {
                    // custom status
                    return this.error.status;
                } else if (this.error.statusCode !== 500) {
                    // error's statusCode not used, because it shows invalid 500 on network errors
                    return this.error.statusCode;
                } else {
                    return 0;
                }
            },
            statusText() {
                if (this.error.response) {
                    return this.error.response.statusText;
                } else if (this.error.request) {
                    return this.error.request.statusText;
                } else {
                    return 'Error';
                }
            },
            title() {
                if (this.error.title) {
                    return this.error.title;
                }
                if (this.statusCode) {
                    return this.statusCode + ' ' + this.statusText;
                }
                return 'Error';
            },
            description() {
                if (this.error.description) {
                    return this.error.description;
                }
                if (this.statusCode === 404 && this.error.message.indexOf('Request') === -1) {
                    return "We couldn't find the page you're looking for.";
                }
                if (this.statusCode === 504) {
                    return "Request failed with status code 504. Gateway time-out.";
                }
                if (this.statusCode === 503) {
                    return "The webpage is currently unavailable. It may be overloaded or down for maintenance.";
                }
                // if (this.statusCode === 405) {
                //     return 'Unfortunately, this resource is not available to US persons';
                // }
                let errorText = getErrorText(this.error, '');
                //@TODO workaround for https://github.com/axios/axios/issues/2103
                if (errorText === 'timeout of 0ms exceeded') {
                    errorText = 'Network error: request timed out';
                }
                return errorText;
            },
        },
    };
</script>

<template>
    <div class="error__container u-container u-container--small">
        <div class="error__section u-section">
            <p class="error__description" v-if="message">{{ message }}</p>
            <h1 class="u-h1--xl error__title">{{ statusCode ? statusCode : 'Internal' }} error</h1>
            <p class="error__buttons">
                <span class="button-group">
                    <a class="button button--ghost-main" href="" v-if="statusCode !== 404">Refresh page</a>
                    <a class="button button--ghost-main" href="/" v-if="$route.path !== '/'">Return to main page</a>
                </span>
            </p>
        </div>
    </div>

</template>


<template>
    <div class="main-content--error">
        <div class="error__container u-container u-section">
            <div class="error__inner">
                <h1 class="error__title u-h1">{{ title }}</h1>
                <p class="error__description">{{ description }}</p>
                <p class="error__link">
                    <span class="u-display-block">
                    <a class="link--default" href="" v-if="statusCode.toString()[0] !== '4'">Refresh page</a>
                    </span>
                    <a class="link--default" href="/" v-if="$route.path !== '/'">Return to main page</a>
                </p>
            </div>
        </div>
    </div>
</template>
