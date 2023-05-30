// @ts-check

const { Triggerable } = require('./triggerable')

const VUE_GLOBAL_OBJECT = new WeakMap()
/**
 * example of reactive object from vue2.
 * it pretty simplified. most important simplification: nested proxing ommited.
 * @template {{[key: string]: unknown}} T
 * @param {T} object 
 */
function proxyAllProperties(object) {
    for (const key in object) {
        const propertyTrigger = new Triggerable()
        VUE_GLOBAL_OBJECT.set(object, {
            key,
            value: propertyTrigger
        })
        let propertyValue = object[key]
        Object.defineProperty(object, key, {
            get: () => propertyValue,
            set: value => {
                propertyValue = value
                propertyTrigger.trigger(value)
            }
        })
    }
}

module.exports = {
    proxyAllProperties,
    VUE_GLOBAL_OBJECT
}