import './polyfills.server.mjs';
import{O as a}from"./chunk-Z75QX7R2.mjs";var g=(()=>{let r=class r{constructor(){}setStorage(e,t){return typeof t=="object"?t=JSON.stringify(t):t=t.toString(),localStorage.setItem(e,t),!0}getStorage(e){let t;try{t=JSON.parse(localStorage.getItem(e))}catch{t=localStorage.getItem(e)}return t}getStorageString(e){return localStorage.getItem(e)}deleteStorage(e){return localStorage.removeItem(e),!0}};r.\u0275fac=function(t){return new(t||r)},r.\u0275prov=a({token:r,factory:r.\u0275fac,providedIn:"root"});let o=r;return o})();export{g as a};
