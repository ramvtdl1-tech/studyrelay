import {test} from 'node:test';
import assert from 'node:assert/strict';
import {promptFor,sample} from './core.js';
test('rejects empty and oversized input',()=>{for(const text of ['', '  ', 'x'.repeat(16001)])assert.throws(()=>promptFor(text,'guide','English'));});
test('rejects unrecognized options',()=>{assert.throws(()=>promptFor(sample,'unknown','English'));assert.throws(()=>promptFor(sample,'guide','unknown'));});
test('retains source notes and selected learning task',()=>{const prompt=promptFor(sample,'quiz','Hindi');assert.ok(prompt.includes(sample));assert.ok(prompt.includes('five practice questions'));assert.ok(prompt.includes('Respond in Hindi'));});
