// @ts-check

const { describe, it } = require('node:test')
const { strictEqual } = require('node:assert')

const { Triggerable } = require('../src/triggerable')
const { watch } = require('../src/watch')

describe('watch', () => {
    it('should invoke method, when triggerable triggers', t => {
        const fn = t.mock.fn()
        const triggerable = new Triggerable()
        watch(() => {
            fn()
        }, [triggerable])
        triggerable.trigger()
        triggerable.trigger()
        strictEqual(fn.mock.calls.length, 2)
    })
})