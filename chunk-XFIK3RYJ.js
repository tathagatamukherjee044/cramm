import{a as g}from"./chunk-4CMWFLKV.js";import{n as r}from"./chunk-PEBYIG66.js";import{c,fa as p,h as a,j as s}from"./chunk-A7CW2YMV.js";var S=(()=>{let o=class o{constructor(t,e){this.http=t,this.storageService=e}authenticateUser(t){return this.http.post(r.api.LOGIN,t).pipe(c(e=>e))}createUser(t){return this.http.post("http://localhost:8080/auth/signup",t).pipe(e=>e)}getToken(){return this.storageService.getStorage("token")}setUser(t){this.storageService.setStorage("token",t.token),this.storageService.setStorage("user",t)}getGoogleOAuthURL(){let t="https://accounts.google.com/o/oauth2/v2/auth",e={redirect_uri:r.googleOauthRedirectUrl,client_id:r.googleClientId,access_type:"offline",response_type:"code",prompt:"consent",scope:["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email"].join(" ")},n=new URLSearchParams(e);console.log(`${t}?${n.toString()}`),window.location.href=`${t}?${n.toString()}`}};o.\u0275fac=function(e){return new(e||o)(s(p),s(g))},o.\u0275prov=a({token:o,factory:o.\u0275fac,providedIn:"root"});let i=o;return i})();export{S as a};
