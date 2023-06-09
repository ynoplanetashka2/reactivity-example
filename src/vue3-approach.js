// @ts-check

const { Triggerable } = require('./triggerable')

const VUE_GLOBAL_OBJECT = new WeakMap()

/**
 * example of reactive object from vue3.
 * it pretty simplified. most important simplification: nested proxing ommited.
 * @template {{[key: string]: unknown}} T
 * @param {T} object 
 * @returns {T}
 */
function proxyObject(object) {
    /**
     * map target properties to corresponding triggerable objects
     * @type {Map<string, InstanceType<typeof Triggerable>>}
     */
    const triggersMapping = new Map()
    VUE_GLOBAL_OBJECT.set(object, triggersMapping)
    for (const key in object) {
        triggersMapping.set(key, new Triggerable())
    }
    return new Proxy(object, {
        get(target, property) {
            return Reflect.get(target, property)
        },
        set(target, property, value) {
            if (typeof property === 'symbol') {
                return Reflect.set(target, property, value)
            }
            let trigger
            if (!triggersMapping.has(property))   {
                trigger = new Triggerable()
                triggersMapping.set(property, trigger)
            }
            else {
                trigger = triggersMapping.get(property)
            }
            const returnValue = Reflect.set(target, property, value)
            trigger?.trigger(value)
            return returnValue
        }
    })
}

module.exports = {
    proxyObject,
    VUE_GLOBAL_OBJECT
}