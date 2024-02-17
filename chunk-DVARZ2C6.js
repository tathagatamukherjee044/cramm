import{h as w}from"./chunk-ICFSPPOM.js";import{a as E,c as g}from"./chunk-PJTSOPQD.js";import{c,d as f,g as x,h as m,k as b}from"./chunk-WJYIX4TB.js";import{a as I}from"./chunk-MM5QLNJM.js";import{a as p,f as v,g as y,h as A,i as h}from"./chunk-72ZMTLHO.js";import{e as d}from"./chunk-BWG4IORI.js";var C=":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){-webkit-transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{-webkit-transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-expanding) #content-wrapper{overflow:auto}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{-webkit-transition:none !important;transition:none !important}}:host(.accordion-next) ::slotted(ion-item[slot=header]){--border-width:0.55px 0px 0.55px 0px}",k=":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){-webkit-transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{-webkit-transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-expanding) #content-wrapper{overflow:auto}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{-webkit-transition:none !important;transition:none !important}}",S=class{constructor(e){b(this,e),this.updateListener=()=>this.updateState(!1),this.setItemDefaults=()=>{let t=this.getSlottedHeaderIonItem();t&&(t.button=!0,t.detail=!1,t.lines===void 0&&(t.lines="full"))},this.getSlottedHeaderIonItem=()=>{let{headerEl:t}=this;if(!t)return;let o=t.querySelector("slot");if(o&&o.assignedElements!==void 0)return o.assignedElements().find(n=>n.tagName==="ION-ITEM")},this.setAria=(t=!1)=>{let o=this.getSlottedHeaderIonItem();if(!o)return;let i=A(o).querySelector("button");i&&i.setAttribute("aria-expanded",`${t}`)},this.slotToggleIcon=()=>{let t=this.getSlottedHeaderIonItem();if(!t)return;let{toggleIconSlot:o,toggleIcon:n}=this;if(t.querySelector(".ion-accordion-toggle-icon"))return;let s=document.createElement("ion-icon");s.slot=o,s.lazy=!1,s.classList.add("ion-accordion-toggle-icon"),s.icon=n,s.setAttribute("aria-hidden","true"),t.appendChild(s)},this.expandAccordion=(t=!1)=>{let{contentEl:o,contentElWrapper:n}=this;if(t||o===void 0||n===void 0){this.state=4;return}this.state!==4&&(this.currentRaf!==void 0&&cancelAnimationFrame(this.currentRaf),this.shouldAnimate()?h(()=>{this.state=8,this.currentRaf=h(()=>d(this,null,function*(){let i=n.offsetHeight,s=p(o,2e3);o.style.setProperty("max-height",`${i}px`),yield s,this.state=4,o.style.removeProperty("max-height")}))}):this.state=4)},this.collapseAccordion=(t=!1)=>{let{contentEl:o}=this;if(t||o===void 0){this.state=1;return}this.state!==1&&(this.currentRaf!==void 0&&cancelAnimationFrame(this.currentRaf),this.shouldAnimate()?this.currentRaf=h(()=>d(this,null,function*(){let n=o.offsetHeight;o.style.setProperty("max-height",`${n}px`),h(()=>d(this,null,function*(){let i=p(o,2e3);this.state=2,yield i,this.state=1,o.style.removeProperty("max-height")}))})):this.state=1)},this.shouldAnimate=()=>!(typeof window>"u"||matchMedia("(prefers-reduced-motion: reduce)").matches||!E.get("animated",!0)||this.accordionGroupEl&&!this.accordionGroupEl.animated),this.updateState=(t=!1)=>d(this,null,function*(){let o=this.accordionGroupEl,n=this.value;if(!o)return;let i=o.value;if(Array.isArray(i)?i.includes(n):i===n)this.expandAccordion(t),this.isNext=this.isPrevious=!1;else{this.collapseAccordion(t);let r=this.getNextSibling(),a=r==null?void 0:r.value;a!==void 0&&(this.isPrevious=Array.isArray(i)?i.includes(a):i===a);let l=this.getPreviousSibling(),u=l==null?void 0:l.value;u!==void 0&&(this.isNext=Array.isArray(i)?i.includes(u):i===u)}}),this.getNextSibling=()=>{if(!this.el)return;let t=this.el.nextElementSibling;if((t==null?void 0:t.tagName)==="ION-ACCORDION")return t},this.getPreviousSibling=()=>{if(!this.el)return;let t=this.el.previousElementSibling;if((t==null?void 0:t.tagName)==="ION-ACCORDION")return t},this.state=1,this.isNext=!1,this.isPrevious=!1,this.value=`ion-accordion-${N++}`,this.disabled=!1,this.readonly=!1,this.toggleIcon=w,this.toggleIconSlot="end"}valueChanged(){this.updateState()}connectedCallback(){var e;let t=this.accordionGroupEl=(e=this.el)===null||e===void 0?void 0:e.closest("ion-accordion-group");t&&(this.updateState(!0),v(t,"ionValueChange",this.updateListener))}disconnectedCallback(){let e=this.accordionGroupEl;e&&y(e,"ionValueChange",this.updateListener)}componentDidLoad(){this.setItemDefaults(),this.slotToggleIcon(),h(()=>{let e=this.state===4||this.state===8;this.setAria(e)})}toggleExpanded(){let{accordionGroupEl:e,value:t,state:o}=this;if(e){let n=o===1||o===2;e.requestAccordionToggle(t,n)}}render(){let{disabled:e,readonly:t}=this,o=g(this),n=this.state===4||this.state===8,i=n?"header expanded":"header",s=n?"content expanded":"content";return this.setAria(n),c(f,{class:{[o]:!0,"accordion-expanding":this.state===8,"accordion-expanded":this.state===4,"accordion-collapsing":this.state===2,"accordion-collapsed":this.state===1,"accordion-next":this.isNext,"accordion-previous":this.isPrevious,"accordion-disabled":e,"accordion-readonly":t,"accordion-animated":this.shouldAnimate()}},c("div",{onClick:()=>this.toggleExpanded(),id:"header",part:i,"aria-controls":"content",ref:r=>this.headerEl=r},c("slot",{name:"header"})),c("div",{id:"content",part:s,role:"region","aria-labelledby":"header",ref:r=>this.contentEl=r},c("div",{id:"content-wrapper",ref:r=>this.contentElWrapper=r},c("slot",{name:"content"}))))}static get delegatesFocus(){return!0}get el(){return x(this)}static get watchers(){return{value:["valueChanged"]}}},N=0;S.style={ios:C,md:k};var P=":host{display:block}:host(.accordion-group-expand-inset){-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:16px;margin-bottom:16px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanding),:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanded){border-bottom:none}",G=":host{display:block}:host(.accordion-group-expand-inset){-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:16px;margin-bottom:16px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion){-webkit-box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanding),:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanded){margin-left:0;margin-right:0;margin-top:16px;margin-bottom:16px;border-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-previous){border-bottom-right-radius:6px;border-bottom-left-radius:6px}:host-context([dir=rtl]):host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-previous),:host-context([dir=rtl]).accordion-group-expand-inset ::slotted(ion-accordion.accordion-previous){border-bottom-right-radius:6px;border-bottom-left-radius:6px}@supports selector(:dir(rtl)){:host(.accordion-group-expand-inset:dir(rtl)) ::slotted(ion-accordion.accordion-previous){border-bottom-right-radius:6px;border-bottom-left-radius:6px}}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-next){border-top-left-radius:6px;border-top-right-radius:6px}:host-context([dir=rtl]):host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-next),:host-context([dir=rtl]).accordion-group-expand-inset ::slotted(ion-accordion.accordion-next){border-top-left-radius:6px;border-top-right-radius:6px}@supports selector(:dir(rtl)){:host(.accordion-group-expand-inset:dir(rtl)) ::slotted(ion-accordion.accordion-next){border-top-left-radius:6px;border-top-right-radius:6px}}:host(.accordion-group-expand-inset) ::slotted(ion-accordion):first-of-type{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}",V=class{constructor(e){b(this,e),this.ionChange=m(this,"ionChange",7),this.ionValueChange=m(this,"ionValueChange",7),this.animated=!0,this.multiple=void 0,this.value=void 0,this.disabled=!1,this.readonly=!1,this.expand="compact"}valueChanged(){let{value:e,multiple:t}=this;!t&&Array.isArray(e)&&I(`ion-accordion-group was passed an array of values, but multiple="false". This is incorrect usage and may result in unexpected behaviors. To dismiss this warning, pass a string to the "value" property when multiple="false".

  Value Passed: [${e.map(o=>`'${o}'`).join(", ")}]
`,this.el),this.ionValueChange.emit({value:this.value})}disabledChanged(){return d(this,null,function*(){let{disabled:e}=this,t=yield this.getAccordions();for(let o of t)o.disabled=e})}readonlyChanged(){return d(this,null,function*(){let{readonly:e}=this,t=yield this.getAccordions();for(let o of t)o.readonly=e})}onKeydown(e){return d(this,null,function*(){let t=document.activeElement;if(!t||!t.closest('ion-accordion [slot="header"]'))return;let n=t.tagName==="ION-ACCORDION"?t:t.closest("ion-accordion");if(!n||n.closest("ion-accordion-group")!==this.el)return;let s=yield this.getAccordions(),r=s.findIndex(l=>l===n);if(r===-1)return;let a;e.key==="ArrowDown"?a=this.findNextAccordion(s,r):e.key==="ArrowUp"?a=this.findPreviousAccordion(s,r):e.key==="Home"?a=s[0]:e.key==="End"&&(a=s[s.length-1]),a!==void 0&&a!==t&&a.focus()})}componentDidLoad(){return d(this,null,function*(){this.disabled&&this.disabledChanged(),this.readonly&&this.readonlyChanged(),this.valueChanged()})}setValue(e){let t=this.value=e;this.ionChange.emit({value:t})}requestAccordionToggle(e,t){return d(this,null,function*(){let{multiple:o,value:n,readonly:i,disabled:s}=this;if(!(i||s))if(t)if(o){let r=n!=null?n:[],a=Array.isArray(r)?r:[r];a.find(u=>u===e)===void 0&&e!==void 0&&this.setValue([...a,e])}else this.setValue(e);else if(o){let r=n!=null?n:[],a=Array.isArray(r)?r:[r];this.setValue(a.filter(l=>l!==e))}else this.setValue(void 0)})}findNextAccordion(e,t){let o=e[t+1];return o===void 0?e[0]:o}findPreviousAccordion(e,t){let o=e[t-1];return o===void 0?e[e.length-1]:o}getAccordions(){return d(this,null,function*(){return Array.from(this.el.querySelectorAll(":scope > ion-accordion"))})}render(){let{disabled:e,readonly:t,expand:o}=this,n=g(this);return c(f,{class:{[n]:!0,"accordion-group-disabled":e,"accordion-group-readonly":t,[`accordion-group-expand-${o}`]:!0},role:"presentation"},c("slot",null))}get el(){return x(this)}static get watchers(){return{value:["valueChanged"],disabled:["disabledChanged"],readonly:["readonlyChanged"]}}};V.style={ios:P,md:G};export{S as ion_accordion,V as ion_accordion_group};
