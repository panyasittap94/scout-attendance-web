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
  assert.match(html,/if\(!GAS_URL\)/);
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
test('the public frontend connects directly using ContentService JSONP',()=>{
  assert.match(html,/scoutJsonp_/);
  assert.match(html,/document\.head\.appendChild\(script\)/);
  assert.doesNotMatch(html,/function startBridge\(\)|postMessage\(/);
  assert.doesNotMatch(html,/readCapability|scout_capability|#access=/);
  assert.match(config,/window\.SCOUT_GAS_BRIDGE_URL\s*=/);
});

test('one public URL is copied and no account or token is needed',()=>{
  assert.match(html,/data-copy-link/);
  assert.match(html,/function copySiteLink\(\)/);
  assert.match(html,/const link='https:\/\/panyasittap94\.github\.io\/scout-attendance-web\/'/);
  assert.doesNotMatch(html,/readCapability|authState|scout_capability|#access=/);
  assert.match(html,/api\('bootstrap'\)/);
  assert.doesNotMatch(html,/token:authState/);
});
test('mobile header keeps the share-link button accessible',()=>{
  assert.match(html,/\.topactions \[data-copy-link\]\{white-space:nowrap/);
});

test('JSONP client sets random callback, no iframe or authentication',()=>{
 assert.match(html,/url\.searchParams\.set\('api','1'\)/);
 assert.match(html,/url\.searchParams\.set\('action',action\)/);
 assert.match(html,/url\.searchParams\.set\('callback',callback\)/);
 assert.match(html,/script\.onerror=/);
 assert.match(html,/Google Apps Script ไม่ตอบกลับภายในเวลาที่กำหนด/);
 assert.doesNotMatch(html,/createElement\('iframe'\)|#access=|scout_capability/);
});

test('automatically retries bootstrap data loads only, never attendance writes',()=>{
  assert.match(html,/async function bootstrapWithRetry\(loading\)/);
  assert.match(html,/for\(let attempt=1;attempt<=3;attempt\+\+\)/);
  assert.match(html,/try\{return await api\('bootstrap'\)\}/);
  assert.match(html,/const result=await api\('save',request\)/);
  assert.match(html,/const result=await api\('reopen',\{/);
  assert.doesNotMatch(html,/bootstrapWithRetry\(.*save|bootstrapWithRetry\(.*reopen/);
});
test('failed bootstrap offers clear retry button without suggesting different Google accounts',()=>{
  assert.match(html,/function showLoadFailure\(loading,error\)/);
  assert.match(html,/ลองเชื่อมต่ออีกครั้ง/);
  assert.doesNotMatch(html,/Samsung Internet อาจบล็อกคำขอ/);
});
