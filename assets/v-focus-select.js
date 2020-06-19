
export default {
    bind(el, binding, vnode) {
        el.addEventListener('focus', el.select);
    },
    unbind(el, binding, vnode) {
        el.removeEventListener('focus', el.select)
    },
};
