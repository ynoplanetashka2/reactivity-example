// @ts-check

/**
 * subscribes to each triggerable passed to it
 * @param {() => void} method 
 * @param {(import('./triggerable').Triggerable)[]} triggerables
 */
function watch(method, triggerables) {
    triggerables.forEach(triggerable => triggerable.subscribe(() => method()))
}

module.exports = {
    watch
}