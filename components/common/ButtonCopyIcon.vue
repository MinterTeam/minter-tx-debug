<script>
    import ButtonCopy from '~/components/common/ButtonCopy';

    export default {
        components: {
            ButtonCopy,
        },
        props: {
            copyText: {
                type: String,
                required: true,
            },
        },
    };
</script>

<template>
    <ButtonCopy class="u-icon u-semantic-button link--opacity" aria-label="Copy" :copy-text="copyText">
        <img :src="`${BASE_URL_PREFIX}/img/icon-copy.svg`"/>
    </ButtonCopy>
</template>
