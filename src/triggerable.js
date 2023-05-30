// @ts-check

/**
 * @example
 * describe('Triggerable', () => {
 *     it('should notify all subscribers after trigger', t => {
 *         const triggerable = new Triggerable()
 *         const func = t.mock.fn(() => {})
 *         triggerable.subscribe(func)
 *         triggerable.trigger()
 *         strictEqual(func.mock.calls.length, 1)
 *     })
 * })
 */
class Triggerable {
    /**
     * subscribers will be notified, when object is triggered
     * @type {Set<(...args: any[]) => void>}
     */
    #subscribers = new Set()

    /**
     * @param  {...((...args: any[]) => void)} subscribers 
     */
    subscribe(...subscribers) {
        subscribers.forEach(subscriber => this.#subscribers.add(subscriber))
    }
    trigger(...values) {
        this.#subscribers.forEach(subscriber => subscriber(...values))
    }
}

module.exports = {
    Triggerable
}