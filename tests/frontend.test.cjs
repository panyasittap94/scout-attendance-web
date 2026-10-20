const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html=fs.readFileSync('index.html','utf8');
const config=fs.readFileSync('config.js','utf8');

test('frontend JavaScript parses and no longer uses removed API_BASE',()=>{
  const script=html.match(/<script>\s*([\s\S]+?)<\/script>/);
  assert.ok(script,'expected inline frontend script');
  assert.doesNotThrow(()=>new vm.Script(script[1]));
  assert.doesNotMatch(html,/\b(?:API_BASE|SCOUT_API_BASE)\b/);
  assert.match(html,/if\(!authState\.token\|\|!GAS_URL\)/);
  assert.match(html,/api\('bootstrap'\)/);
});
test('public static assets include no private scout records or credentials',()=>{
  const data=html.match(/<script id="app-data" type="application\/json">([^<]*)<\/script>/);
  assert.ok(data,'expected server-only data placeholder');
  const roster=JSON.parse(data[1]);
  assert.equal(roster.students.length,0);
  assert.equal(roster.transfers.length,0);
  assert.doesNotMatch(html,/https:\/\/(?:drive|docs)\.google\.com/);
  assert.doesNotMatch(html,/google\.script\.run|GAS_BRIDGE_KEY|BRIDGE_SHARED_KEY_SHA256/);
  assert.doesNotMatch(config,/#access=|SCOUT_CAPABILITY_SHA256S|Bearer\s+[a-zA-Z0-9_-]{32}/);
});
test('the public frontend calls Apps Script only through message bridge',()=>{
  assert.match(html,/scout-attendance-gas-bridge-v1/);
  assert.match(html,/readCapability\(\)/);
  assert.match(config,/window\.SCOUT_GAS_BRIDGE_URL\s*=/);
});
