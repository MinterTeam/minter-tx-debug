export default {
    SET_VALIDATOR_LIST(state, validatorList) {
        state.validatorList = validatorList;
    },
    /**
     * Show snackbar if it is inactive
     */
    SET_SNACKBAR_ACTIVE(state) {
        state.isSnackbarActive = true;
    },
    /**
     * Set snackbar inactive so it can react to next SET_SNACKBAR_ACTIVE call
     */
    SET_SNACKBAR_INACTIVE(state) {
        state.isSnackbarActive = false;
    },
};
