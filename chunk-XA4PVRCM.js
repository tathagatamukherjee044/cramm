import{a as F}from"./chunk-QG4LPTM5.js";import{a as B}from"./chunk-FUCZYSGH.js";import{g as L,i as P}from"./chunk-Q4YVN4S5.js";import{f as T}from"./chunk-DOSPFZDA.js";import{b as w,e as A,h as N,i as z,j as E,k as Q}from"./chunk-IBUPBFAD.js";import{$b as d,Ab as I,Bb as x,Ja as m,Oa as p,Ua as S,Va as v,Y as f,a as h,db as _,ib as y,jb as b,kb as j,lb as r,mb as a,nb as k,qb as c,wb as l,xb as M,zb as C}from"./chunk-RVGU6ECZ.js";function q(o,e){if(o&1&&(r(0,"option",3),l(1),a()),o&2){let g=e.$implicit;_("value",g.key),m(),M(g.courseName)}}var H=(()=>{let e=class e{constructor(t,n,i){this.storageService=t,this.router=n,this.subjectService=i,this.streak="",this.subject="",this.courseList=[]}ngOnInit(){this.streak=this.storageService.getStorage("streak"),this.subject=this.storageService.getStorage("subject"),this.subjectService.getSubjects().subscribe(t=>{console.log(t),t=this.objectToArray(t.courses),console.log(t),this.courseList=t})}objectToArray(t){let n=[];for(let i in t)t.hasOwnProperty(i)&&n.push(h({key:i},t[i]));return n}onSubjectChanged(t){console.log(t),this.storageService.setStorage("subject",this.subject)}onStart(){this.router.navigate(["/quiz"])}onAddQuestion(){console.log("Add Question"),this.router.navigate(["/quiz/add"])}};e.\u0275fac=function(n){return new(n||e)(p(T),p(L),p(B))},e.\u0275cmp=S({type:e,selectors:[["app-learn"]],decls:14,vars:1,consts:[[1,"centerHorizontal",2,"flex-direction","column","align-content","center","height","55vh","max-width","300px"],["placeholder","Select Subject",1,"centerHorizontal","customInput",3,"ngModelChange","ngModel"],["value","","disabled","","selected",""],[3,"value"],[1,"centerHorizontal","customInput","margin1UnitVertical","actionButton",3,"click"],[2,"display","flex","flex-direction","column","height","5vh","position","relative","max-width","2.5em"],[1,"customInput","actionButtonSecondary",3,"click"],[1,"ph","ph-plus"],[2,"display","flex","flex-direction","column","position","relative","width","5em","max-height","0.5em"],[1,"customInput",2,"font-size","0.5em","height","1em",3,"click"]],template:function(n,i){n&1&&(r(0,"div",0)(1,"select",1),x("ngModelChange",function(s){return I(i.subject,s)||(i.subject=s),s}),c("ngModelChange",function(s){return i.onSubjectChanged(s)}),r(2,"option",2),l(3,"Select subject"),a(),b(4,q,2,2,"option",3,y),a(),r(6,"button",4),c("click",function(){return i.onStart()}),l(7,"Start"),a()(),r(8,"div",5)(9,"button",6),c("click",function(){return i.onAddQuestion()}),k(10,"i",7),a()(),r(11,"div",8)(12,"p",9),c("click",function(){return i.onAddQuestion()}),l(13,"Add Question"),a()()),n&2&&(m(),C("ngModel",i.subject),m(3),j(i.courseList))},dependencies:[d,Q,z,E,N,w,A],encapsulation:2});let o=e;return o})();var D=[{path:"",component:H},{path:"lm",component:F}],te=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=v({type:e}),e.\u0275inj=f({imports:[d,P.forChild(D)]});let o=e;return o})();export{te as LearnModule};
