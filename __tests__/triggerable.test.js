// @ts-check

const { strictEqual } = require('node:assert')
const { describe, it } = require('node:test')

const { Triggerable } = require('../src/triggerable')

describe('Triggerable', () => {
    it('should notify all subscribers after trigger', t => {
        const triggerable = new Triggerable()
        const func = t.mock.fn()
        triggerable.subscribe(func)
        triggerable.trigger()
        strictEqual(func.mock.calls.length, 1)
    })
})