import { createRequire } from 'node:module';
globalThis['require'] ??= createRequire(import.meta.url);
var j=Object.create;var e=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames,h=Object.getOwnPropertySymbols,m=Object.getPrototypeOf,i=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;var f=(b,a,c)=>a in b?e(b,a,{enumerable:!0,configurable:!0,writable:!0,value:c}):b[a]=c,p=(b,a)=>{for(var c in a||(a={}))i.call(a,c)&&f(b,c,a[c]);if(h)for(var c of h(a))n.call(a,c)&&f(b,c,a[c]);return b};var q=(b=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(b,{get:(a,c)=>(typeof require<"u"?require:a)[c]}):b)(function(b){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+b+'" is not supported')});var r=(b,a)=>()=>(a||b((a={exports:{}}).exports,a),a.exports),s=(b,a)=>{for(var c in a)e(b,c,{get:a[c],enumerable:!0})},o=(b,a,c,g)=>{if(a&&typeof a=="object"||typeof a=="function")for(let d of l(a))!i.call(b,d)&&d!==c&&e(b,d,{get:()=>a[d],enumerable:!(g=k(a,d))||g.enumerable});return b};var t=(b,a,c)=>(c=b!=null?j(m(b)):{},o(a||!b||!b.__esModule?e(c,"default",{value:b,enumerable:!0}):c,b));var u=(b,a,c)=>f(b,typeof a!="symbol"?a+"":a,c);export{p as a,q as b,r as c,s as d,t as e,u as f};
