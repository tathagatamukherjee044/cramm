import{l,m as c}from"./chunk-YFRHSFJQ.js";import{i as s}from"./chunk-WPN7HE6O.js";import{P as i,U as n}from"./chunk-XTZ6SSCZ.js";import{e as a}from"./chunk-BWG4IORI.js";var h=(()=>{let t=class t{constructor(e){this.toastController=e}presentToast(e="",r="bottom",m=750){return a(this,null,function*(){yield(yield this.toastController.create({message:e,duration:m,position:r})).present()})}};t.\u0275fac=function(r){return new(r||t)(n(c))},t.\u0275prov=i({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();var C=(()=>{let t=class t{constructor(e,r){this.alertController=e,this.router=r}presentLoginAlert(){return a(this,null,function*(){yield(yield this.alertController.create({header:"Login",message:"Please Login to Continue",buttons:[{text:"Cancel",role:"cancel",handler:()=>{console.log("Alert canceled")}},{text:"OK",role:"confirm",handler:()=>{console.log("Alert confirmed"),this.router.navigate(["/auth/login"])}}]})).present()})}presentReloadAlert(){return a(this,null,function*(){yield(yield this.alertController.create({header:"Reload",message:"Please Reload",buttons:[{text:"OK",role:"confirm",handler:()=>{console.log("Alert confirmed"),window.location.reload}}]})).present()})}};t.\u0275fac=function(r){return new(r||t)(n(l),n(s))},t.\u0275prov=i({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();export{h as a,C as b};
