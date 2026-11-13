import test from 'node:test';
import assert from 'node:assert/strict';
import {advance,doors,nearby,spawn,walkable} from '../app/components/quest-engine.mjs';
const travel=(p,dx,dy,n)=>{for(let i=0;i<n;i++)p=advance(p,dx,dy,.02,800,400);return p;};
test('all doorways can be reached from the hub and stop at entrances',()=>{
 for(const d of doors){
  let p=travel({...spawn},Math.sign(d.x-spawn.x),0,Math.floor(Math.abs(d.x-spawn.x)/2.3));
  p=travel(p,0,-1,200);
  assert.equal(nearby(p),doors.indexOf(d));assert(walkable(p));assert(p.y>=d.y);
 }
});
test('scenery blocks movement and selection clears away from doorways',()=>{
 const p=travel({x:300,y:330},0,-1,200);
 assert(p.y>=305);assert.equal(nearby(p),null);
 assert.equal(nearby({x:735,y:200}),null);
});
test('diagonals and resized viewports preserve physical movement speed',()=>{
 for(const [w,h] of [[800,400],[320,320]]){
 const a=advance(spawn,1,0,.02,w,h),b=advance(spawn,1,1,.02,w,h);
 const dist=p=>Math.hypot((p.x-spawn.x)*w/800,(p.y-spawn.y)*h/400);
 assert(Math.abs(dist(a)-dist(b))<1e-8);
 }
});
