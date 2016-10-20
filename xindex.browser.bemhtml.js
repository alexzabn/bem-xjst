var BEMHTML=function(t,e){return function(n){if("object"==typeof e&&"undefined"!=typeof t)t.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var i;i="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,i.bemhtml=n()}}(function(){return function t(e,n,i){function s(o,h){if(!n[o]){if(!e[o]){var a="function"==typeof require&&require;if(!h&&a)return a(o,!0);if(r)return r(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[o]={exports:{}};e[o][0].call(l.exports,function(t){var n=e[o][1][t];return s(n?n:t)},l,l.exports,t,e,n,i)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}({1:[function(t,e,n){function i(t){this.bemxjst=t,this.jsClass=null,this.tag=new r(this,"tag"),this.attrs=new r(this,"attrs"),this.mix=new r(this,"mix"),this.js=new r(this,"js"),this.mods=new r(this,"mods"),this.elemMods=new r(this,"elemMods"),this.bem=new r(this,"bem"),this.cls=new r(this,"cls"),o.apply(this,arguments)}var s=t("inherits"),r=t("../bemxjst/match").Match,o=t("../bemxjst/entity").Entity;s(i,o),n.Entity=i,i.prototype.init=function(t,e){this.block=t,this.elem=e,this.jsClass=this.bemxjst.classBuilder.build(this.block,this.elem)};var h={tag:!0,content:!0,attrs:!0,mix:!0,js:!0,mods:!0,elemMods:!0,cls:!0,bem:!0};i.prototype._initRest=function(t){"default"===t?this.rest[t]=this.def:h[t]?this.rest[t]=this[t]:this.rest.hasOwnProperty(t)||(this.rest[t]=new r(this,t))},i.prototype.defaultBody=function(t){var e=this.mods.exec(t);t.mods=e;var n;t.ctx.elem&&(n=this.elemMods.exec(t),t.elemMods=n);var i=this.tag.exec(t),s=this.content.exec(t),r=this.attrs.exec(t),o=this.mix.exec(t),h=this.js.exec(t),a=this.bem.exec(t),c=this.cls.exec(t);return this.bemxjst.render(t,this,i,h,a,c,o,r,s,e,n)}},{"../bemxjst/entity":5,"../bemxjst/match":8,inherits:11}],2:[function(t,e,n){function i(t){h.apply(this,arguments);var e="undefined"==typeof t.xhtml?!1:t.xhtml;this._shortTagCloser=e?"/>":">",this._elemJsInstances=t.elemJsInstances,this._omitOptionalEndTags=t.omitOptionalEndTags}var s=t("inherits"),r=t("../bemxjst/utils"),o=t("./entity").Entity,h=t("../bemxjst");s(i,h),e.exports=i,i.prototype.Entity=o,i.prototype.runMany=function(t){var e="",n=this.context,i=n.position,s=n._notNewList;if(s?n._listLength+=t.length-1:(n.position=0,n._listLength=t.length),n._notNewList=!0,this.canFlush)for(var r=0;r<t.length;r++)e+=n._flush(this._run(t[r]));else for(var r=0;r<t.length;r++)e+=this._run(t[r]);return s||(n.position=i),e},i.prototype.render=function(t,e,n,i,s,o,h,a,c,l,u){var p=t.ctx;if(void 0===n&&(n="div"),!n)return this.renderNoTag(c);var f="<"+n;i===!0&&(i={});var d;i&&(d={},d[e.jsClass]=i);var m=s;void 0===m&&(m=void 0===p.bem?e.block||e.elem:p.bem),m=!!m,void 0===o&&(o=p.cls);var y=d&&(this._elemJsInstances?e.block||e.elem:e.block&&!e.elem);if(!m&&!o)return this.renderClose(f,t,n,a,m,p,c);if(f+=' class="',m){if(f+=e.jsClass,f+=this.buildModsClasses(e.block,e.elem,e.elem?u:l),h){var v=this.renderMix(e,h,d,y);f+=v.out,d=v.jsParams,y=v.addJSInitClass}o&&(f+=" "+("string"==typeof o?r.attrEscape(o).trim():o))}else o&&(f+=o.trim?r.attrEscape(o).trim():o);return f+=y?' i-bem"':'"',m&&d&&(f+=" data-bem='"+r.jsAttrEscape(JSON.stringify(d))+"'"),this.renderClose(f,t,n,a,m,p,c)};var a={html:1,head:1,body:1,p:1,ul:1,ol:1,li:1,dt:1,dd:1,colgroup:1,thead:1,tbody:1,tfoot:1,tr:1,th:1,td:1,option:1,rb:1,rt:1,rtc:1,rp:1,optgroup:1};i.prototype.renderClose=function(t,e,n,i,s,o,h){var c=t;return c+=this.renderAttrs(i),r.isShortTag(n)?(c+=this._shortTagCloser,this.canFlush&&(c=e._flush(c))):(c+=">",this.canFlush&&(c=e._flush(c)),(h||0===h)&&(c+=this.renderContent(h,s)),this._omitOptionalEndTags&&a.hasOwnProperty(n)||(c+="</"+n+">")),this.canFlush&&(c=e._flush(c)),c},i.prototype.renderAttrs=function(t){var e="";if(r.isObj(t))for(var n in t){var i=t[n];void 0!==i&&i!==!1&&null!==i&&(e+=i===!0?" "+n:" "+n+'="'+r.attrEscape(r.isSimple(i)?i:this.context.reapply(i))+'"')}return e},i.prototype.renderMix=function(t,e,n,i){var s={},r=this.context,o=n,h=i;s[t.jsClass]=!0,Array.isArray(e)||(e=[e]);for(var a=this.classBuilder,c="",l=0;l<e.length;l++){var u=e[l];if(u){"string"==typeof u&&(u={block:u,elem:void 0});var p=!1;u.elem?p=u.elem!==t.elem&&u.elem!==r.elem||u.block&&u.block!==t.block:u.block&&(p=!(u.block===t.block&&u.mods)||u.mods&&t.elem);var f=u.block||u._block||r.block,d=u.elem||u._elem||r.elem,m=a.build(f,d),y=u.elem||u._elem||(u.block?void 0:r.elem);if(p&&(c+=" "+a.build(f,y)),c+=this.buildModsClasses(f,y,u.elem||!u.block&&(u._elem||r.elem)?u.elemMods:u.mods),u.js&&(o||(o={}),o[a.build(f,u.elem)]=u.js===!0?{}:u.js,h||(h=f&&!u.elem)),p&&!s[m]){s[m]=!0;var v=this.entities[m];if(v){var x=r.block,b=r.elem,g=v.mix.exec(r);if(r.elem=b,r.block=x,g)for(var k=0;k<g.length;k++){var w=g[k];if(w&&(!w.block&&!w.elem||!s[a.build(w.block,w.elem)])){if(w.block)continue;w._block=f,w._elem=d,e=e.slice(0,l+1).concat(w,e.slice(l+1))}}}}}}return{out:c,jsParams:o,addJSInitClass:h}},i.prototype.buildModsClasses=function(t,e,n){if(!n)return"";var i,s="";for(i in n)if(n.hasOwnProperty(i)&&""!==i){var r=n[i];if(r||0===r){"boolean"!=typeof r&&(r+="");var o=this.classBuilder;s+=" "+(e?o.buildElemClass(t,e,i,r):o.buildBlockClass(t,i,r))}}return s},i.prototype.renderNoTag=function(t){return t||0===t?this._run(t):""}},{"../bemxjst":7,"../bemxjst/utils":10,"./entity":1,inherits:11}],3:[function(t,e,n){function i(t){this.modDelim=t.mod||"_",this.elemDelim=t.elem||"__"}n.ClassBuilder=i,i.prototype.build=function(t,e){return e?t+this.elemDelim+e:t},i.prototype.buildModPostfix=function(t,e){var n=this.modDelim+t;return e!==!0&&(n+=this.modDelim+e),n},i.prototype.buildBlockClass=function(t,e,n){var i=t;return n&&(i+=this.buildModPostfix(e,n)),i},i.prototype.buildElemClass=function(t,e,n,i){var s=this.buildBlockClass(t)+this.elemDelim+e;return i&&(s+=this.buildModPostfix(n,i)),s},i.prototype.split=function(t){return t.split(this.elemDelim,2)}},{}],4:[function(t,e,n){function i(t){this._bemxjst=t,this.ctx=null,this.block="",this._currBlock="",this.elem=null,this.mods={},this.elemMods={},this.position=0,this._listLength=0,this._notNewList=!1,this.escapeContent=t.options.escapeContent!==!1,this._onceRef={}}var s=t("./utils");n.Context=i,i.prototype._flush=null,i.prototype.isSimple=s.isSimple,i.prototype.isShortTag=s.isShortTag,i.prototype.extend=s.extend,i.prototype.identify=s.identify,i.prototype.xmlEscape=s.xmlEscape,i.prototype.attrEscape=s.attrEscape,i.prototype.jsAttrEscape=s.jsAttrEscape,i.prototype.isFirst=function(){return 1===this.position},i.prototype.isLast=function(){return this.position===this._listLength},i.prototype.generateId=function(){return s.identify(this.ctx)},i.prototype.reapply=function(t){return this._bemxjst.run(t)}},{"./utils":10}],5:[function(t,e,n){function i(t,e,n,i){this.bemxjst=t,this.block=null,this.elem=null,this.options={},this.canFlush=!0,this.def=new o(this),this.content=new o(this,"content"),this.rest={},this.init(e,n),this.initModes(i)}function s(){return this.ctx.content}var r=t("./utils"),o=t("./match").Match,h=t("./tree"),a=h.Template,c=h.PropertyMatch,l=h.CompilerOptions;n.Entity=i,i.prototype.init=function(t,e){this.block=t,this.elem=e},i.prototype.initModes=function(t){for(var e=0;e<t.length;e++){for(var n=t[e],i=n.predicates.length-1;i>=0;i--){var s=n.predicates[i];if(s instanceof c&&"_mode"===s.key){n.predicates.splice(i,1),this._initRest(s.value),this.rest[s.value].push(n);break}}-1===i&&this.def.push(n);for(var i=n.predicates.length-1;i>=0;i--){var s=n.predicates[i];s instanceof l&&(this.options=r.extend(this.options,s.options))}}},i.prototype.prepend=function(t){for(var e=Object.keys(this.rest),n=0;n<e.length;n++){var i=e[n];t.rest[i]&&this.rest[i].prepend(t.rest[i])}e=Object.keys(t.rest);for(var n=0;n<e.length;n++){var i=e[n];this.rest[i]||(this._initRest(i),this.rest[i].prepend(t.rest[i]))}},i.prototype.run=function(t){return 0!==this.def.count?this.def.exec(t):this.defaultBody(t)},i.prototype.setDefaults=function(){if(0!==this.content.count&&this.content.push(new a([],s)),0!==this.def.count){this.canFlush=this.options.flush||!1;var t=this;this.def.push(new a([],function(){return t.defaultBody(this)}))}}},{"./match":8,"./tree":9,"./utils":10}],6:[function(t,e,n){function i(t,e){this.name="BEMXJSTError",this.message=t,Error.captureStackTrace?Error.captureStackTrace(this,e||this.constructor):this.stack=(new Error).stack}i.prototype=Object.create(Error.prototype),i.prototype.constructor=i,n.BEMXJSTError=i},{}],7:[function(t,e,n){function i(t){this.options=t||{},this.entities=null,this.defaultEnt=null,this.tree=null,this.match=null,this.contextConstructor=function(t){a.call(this,t)},s(this.contextConstructor,a),this.context=null,this.classBuilder=new c(this.options.naming||{}),this.depth=0,this.canFlush=!1,this.oninit=null,this.defaultEnt=new this.Entity(this,"","",[]),this.defaultElemEnt=new this.Entity(this,"","",[])}var s=t("inherits"),r=t("./tree").Tree,o=t("./tree").PropertyMatch,h=t("./tree").AddMatch,a=t("./context").Context,c=t("./class-builder").ClassBuilder,l=t("./utils");e.exports=i,i.prototype.locals=r.methods.concat("local","applyCtx","applyNext","apply"),i.prototype.compile=function(t){function e(){return o._run(o.context.ctx)}function n(t,n){return n?o.local(n,function(){return o.local({ctx:t},e)}):o.local({ctx:t},e)}function i(t,e){return o.applyMode(t,e)}function s(t){return function(e){return o.local(t,e)}}var o=this,h=new r({refs:{applyCtx:n,local:s,apply:i}}),a=this.recompileInput(t),c=h.build(a,[s,n,function u(t){return t?o.local(t,u):o.applyNext()},i]);this.tree&&(c={templates:c.templates.concat(this.tree.templates),oninit:this.tree.oninit.concat(c.oninit)}),this.tree=c;var l=this.groupEntities(c.templates);l=this.transformEntities(l),this.entities=l,this.oninit=c.oninit},i.prototype.recompileInput=function(t){var e=i.prototype.locals;if("function"==typeof t&&t.length===e.length)return t;var n=t.toString();return n=n.replace(/^function[^{]+{|}$/g,""),n=new Function(e.join(", "),n)},i.prototype.groupEntities=function(e){for(var n={},i=0;i<e.length;i++){var s,r=e[i].clone(),a=null;s=void 0;for(var c=0;c<r.predicates.length;c++){var l=r.predicates[c];if(l instanceof o||l instanceof h){if("block"===l.key)a=l.value;else{if("elem"!==l.key)continue;s=l.value}r.predicates.splice(c,1),c--}}if(null===a){for(var u="block(…) subpredicate is not found.\n    See template with subpredicates:\n     * ",c=0;c<r.predicates.length;c++){var l=r.predicates[c];0!==c&&(u+="\n     * "),u+="_mode"===l.key?l.value+"()":Array.isArray(l.key)?l.key[0].replace("mods","mod").replace("elemMods","elemMod")+"('"+l.key[1]+"', '"+l.value+"')":l.value&&l.key?l.key+"('"+l.value+"')":"match(…)"}throw u+="\n    And template body: \n    ("+("function"==typeof r.body?r.body:JSON.stringify(r.body))+")","undefined"==typeof BEMXJSTError&&(BEMXJSTError=t("./error").BEMXJSTError),new BEMXJSTError(u)}var p=this.classBuilder.build(a,s);n[p]||(n[p]=[]),n[p].push(r)}return n},i.prototype.transformEntities=function(t){for(var e=[],n=Object.keys(t),i=0;i<n.length;i++){var s=n[i],r=this.classBuilder.split(s),o=r[0],h=r[1];"*"===h&&e.push(o),t[s]=new this.Entity(this,o,h,t[s])}if(t.hasOwnProperty("*")){for(var a=t["*"],i=0;i<n.length;i++){var s=n[i];"*"!==s&&t[s].prepend(a)}this.defaultEnt.prepend(a),this.defaultElemEnt.prepend(a)}for(var i=0;i<e.length;i++){for(var o=e[i],c=this.classBuilder.build(o,"*"),a=t[c],i=0;i<n.length;i++){var s=n[i];if(s!==c){var l=t[s];l.block===o&&void 0!==l.elem&&t[s].prepend(a)}}this.defaultElemEnt.prepend(a)}for(var i=0;i<n.length;i++){var s=n[i];t[s].setDefaults(),this.defaultEnt.setDefaults(),this.defaultElemEnt.setDefaults()}return t},i.prototype._run=function(t){var e;return e=void 0===t||""===t||null===t?this.runEmpty():Array.isArray(t)?this.runMany(t):"string"!=typeof t.html||t.tag||"undefined"!=typeof t.block||"undefined"!=typeof t.elem||"undefined"!=typeof t.cls||"undefined"!=typeof t.attrs?l.isSimple(t)?this.runSimple(t):this.runOne(t):this.runUnescaped(t.html)},i.prototype.run=function(t){var e=this.match,n=this.context;this.match=null,this.context=new this.contextConstructor(this),this.canFlush=null!==this.context._flush,this.depth=0;var i=this._run(t);return this.canFlush&&(i=this.context._flush(i)),this.match=e,this.context=n,i},i.prototype.runEmpty=function(){return this.context._listLength--,""},i.prototype.runUnescaped=function(t){return this.context._listLength--,""+t},i.prototype.runSimple=function(t){this.context._listLength--;var e="";return(t&&t!==!0||0===t)&&(e+="string"==typeof t&&this.context.escapeContent?l.xmlEscape(t):t),e},i.prototype.runOne=function(t){var e=this.context,n=e.ctx,i=e.block,s=e._currBlock,r=e.elem,o=e.mods,h=e.elemMods;t.block||t.elem?e._currBlock="":e._currBlock=e.block,e.ctx=t,t.block?(e.block=t.block,t.mods?e.mods=t.mods:t.block===i&&t.elem||(e.mods={})):t.elem?s&&(e.block=s):e.block="",e.elem=t.elem,t.elemMods?e.elemMods=t.elemMods:e.elemMods={};var a=e.block||"",c=e.elem;a||c?e.position++:e._listLength--,this.depth++;var l=this.classBuilder.build(a,c),u=!1,p=this.entities[l];p?this.canFlush&&!p.canFlush&&(u=!0,this.canFlush=!1):(p=this.defaultEnt,void 0!==c&&(p=this.defaultElemEnt),p.init(a,c));var f=this.options.production===!0?this.tryRun(e,p):p.run(e);return e.ctx=n,e.block=i,e.elem=r,e.mods=o,e.elemMods=h,e._currBlock=s,this.depth--,u&&(this.canFlush=!0),f},i.prototype.tryRun=function(t,e){try{return e.run(t)}catch(n){return console.error("BEMXJST ERROR: cannot render "+["block "+t.block,"elem "+t.elem,"mods "+JSON.stringify(t.mods),"elemMods "+JSON.stringify(t.elemMods)].join(", "),n),""}},i.prototype.renderContent=function(t,e){var n=this.context,i=n.position,s=n._listLength,r=n._notNewList;n._notNewList=!1,e&&(n.position=0,n._listLength=1);var o=this._run(t);return n.position=i,n._listLength=s,n._notNewList=r,o},i.prototype.local=function(t,e){for(var n=Object.keys(t),i=[],s=0;s<n.length;s++){for(var r=n[s],o=r.split("."),h=this.context,a=0;a<o.length-1;a++)h=h[o[a]];i.push({parts:o,value:h[o[a]]}),h[o[a]]=t[r]}for(var c=e.call(this.context),s=0;s<i.length;s++){for(var o=i[s].parts,h=this.context,a=0;a<o.length-1;a++)h=h[o[a]];h[o[a]]=i[s].value}return c},i.prototype.applyNext=function(){return this.match.exec(this.context)},i.prototype.applyMode=function(t,e){var n=this.match.entity.rest[t];if(!n)return"mods"===t?this.context.mods:"elemMods"===t?this.context.elemMods:this.context.ctx[t];if(!e)return n.exec(this.context);var i=this,s=function(){return n.exec(i.context)};return this.local(e,s)},i.prototype.exportApply=function(t){var e=this;t.apply=function(t){return e.run(t)},t.compile=function(t){return e.compile(t)};var n={};t.BEMContext=this.contextConstructor,n.BEMContext=t.BEMContext;for(var i=0;i<this.oninit.length;i++){var s=this.oninit[i];s(t,n)}}},{"./class-builder":3,"./context":4,"./error":6,"./tree":9,"./utils":10,inherits:11}],8:[function(t,e,n){function i(t,e){this.template=t,this.key=e.key,this.value=e.value}function s(t,e){this.template=t,this.keys=e.key,this.value=e.value}function r(t,e){this.template=t,this.body=e.body}function o(t){this.template=t,this.wrap=null}function h(t){this.template=t,this.wrap=null}function a(t,e){this.template=t,this.key=e.key,this.value=e.value}function c(t,e){this.mode=t,this.predicates=new Array(e.predicates.length),this.body=e.body;for(var n=[],c=0,l=0;c<this.predicates.length;c++,l++){var u=e.predicates[c];u instanceof p?Array.isArray(u.key)?this.predicates[l]=new s(this,u):this.predicates[l]=new i(this,u):u instanceof m?(l--,n.push(new h(this))):u instanceof f?this.predicates[l]=new a(this,u):u instanceof y?this.predicates[l]=new r(this,u):u instanceof d?(l--,n.push(new o(this))):l--}for(var c=0;c<n.length;c++,l++)this.predicates[l]=n[c];this.predicates.length!==l&&(this.predicates.length=l)}function l(t,e){this.entity=t,this.modeName=e,this.bemxjst=this.entity.bemxjst,this.templates=[],this.mask=[0],this.maskSize=0,this.maskOffset=0,this.count=0,this.depth=-1,this.thrownError=null}var u=t("./tree"),p=u.PropertyMatch,f=u.AddMatch,d=u.WrapMatch,m=u.ExtendMatch,y=u.CustomMatch;i.prototype.exec=function(t){return t[this.key]===this.value},s.prototype.exec=function(t){for(var e=t,n=0;n<this.keys.length-1;n++)if(e=e[this.keys[n]],!e)return!1;return e=e[this.keys[n]],this.value===!0?void 0!==e&&""!==e&&e!==!1&&null!==e:String(e)===this.value},r.prototype.exec=function(t){return this.body.call(t,t,t.ctx)},o.prototype.exec=function(t){var e=this.wrap!==t.ctx;return this.wrap=t.ctx,e},h.prototype.exec=function(t){var e=this.ext!==t.ctx;return this.ext=t.ctx,e},a.prototype.exec=function(t){return t[this.key]===this.value},n.MatchTemplate=c,n.Match=l,l.prototype.clone=function(t){var e=new l(t,this.modeName);return e.templates=this.templates.slice(),e.mask=this.mask.slice(),e.maskSize=this.maskSize,e.count=this.count,e},l.prototype.prepend=function(t){for(this.templates=t.templates.concat(this.templates),this.count+=t.count;Math.ceil(this.count/31)>this.mask.length;)this.mask.push(0);this.maskSize=this.mask.length},l.prototype.push=function(t){this.templates.push(new c(this,t)),this.count++,Math.ceil(this.count/31)>this.mask.length&&this.mask.push(0),this.maskSize=this.mask.length},l.prototype.tryCatch=function(t,e){try{return t.call(e,e,e.ctx)}catch(n){this.thrownError=n}},l.prototype.exec=function(t){for(var e,n=this.checkDepth(),i=this.maskOffset,s=this.mask[i],r=1,o=0;o<this.count;o++){if(0===(s&r)){e=this.templates[o];for(var h=0;h<e.predicates.length;h++){var a=e.predicates[h];if(!a.exec(t))break}if(h===e.predicates.length)break}1073741824===r?(i++,s=this.mask[i],r=1):r<<=1}if(o===this.count)return"mods"===this.modeName?t.mods:"elemMods"===this.modeName?t.elemMods:t.ctx[this.modeName];var c=s,l=this.bemxjst.match;this.mask[i]|=r,this.bemxjst.match=this,this.thrownError=null;var u;u="function"==typeof e.body?this.tryCatch(e.body,t):e.body,this.mask[i]=c,this.bemxjst.match=l,this.restoreDepth(n);var p=this.thrownError;if(null!==p)throw this.thrownError=null,p;return u},l.prototype.checkDepth=function(){if(-1===this.depth)return this.depth=this.bemxjst.depth,-1;if(this.bemxjst.depth===this.depth)return this.depth;var t=this.depth;for(this.depth=this.bemxjst.depth,this.maskOffset+=this.maskSize;this.mask.length<this.maskOffset+this.maskSize;)this.mask.push(0);return t},l.prototype.restoreDepth=function(t){-1!==t&&t!==this.depth&&(this.maskOffset-=this.maskSize),this.depth=t}},{"./tree":9}],9:[function(t,e,n){function i(t,e){this.predicates=t,this.body=e}function s(){}function r(t,e){this.conditions=[],this.children=[];for(var n=e.length-1;n>=0;n--){var i=e[n];i instanceof s?this.conditions.push(i):i===t.boundBody?this.children[n]=t.queue.pop():this.children[n]=i}}function o(t){s.call(this),this.refs=t}function h(t){s.call(this),this.refs=t}function a(t){s.call(this),this.refs=t}function c(t,e){s.call(this),this.mode=t,this.refs=e}function l(t){s.call(this),this.options=t}function u(t,e){s.call(this),this.key=t,this.value=e}function p(t){s.call(this),this.body=t}function f(t){this.options=t,this.refs=this.options.refs,this.boundBody=this.body.bind(this);for(var e=this.methods("body"),n=0;n<e.length;n++){var i=e[n];this.boundBody[f.methods[n]]=i}this.queue=[],this.templates=[],this.initializers=[]}function d(t,e,n){var i=t[n],s=t.boundBody;return"body"!==e?"replace"===n||"extend"===n||"wrap"===n?function(){return i.apply(t,arguments)}:function(){return i.apply(t,arguments),s}:function(){var e=i.apply(t,arguments),r=t.queue.pop(),o=t.queue[t.queue.length-1];return o.conditions=o.conditions.concat(r.conditions),o.children=o.children.concat(r.children),"replace"===n||"extend"===n||"wrap"===n?e:s}}var m=t("minimalistic-assert"),y=t("inherits"),v=t("./utils");n.Template=i,i.prototype.wrap=function(){for(var t=this.body,e=0;e<this.predicates.length;e++){var n=this.predicates[e];t=n.wrapBody(t)}this.body=t},i.prototype.clone=function(){return new i(this.predicates.slice(),this.body)},n.MatchBase=s,s.prototype.wrapBody=function(t){return t},y(o,s),n.WrapMatch=o,o.prototype.wrapBody=function(t){var e=this.refs.applyCtx;return"function"!=typeof t?function(){return e(t)}:function(){return e(t.call(this,this,this.ctx))}},y(h,s),n.ReplaceMatch=h,h.prototype.wrapBody=function(t){var e=this.refs.applyCtx;return"function"!=typeof t?function(){return e(t)}:function(){return e(t.call(this,this,this.ctx))}},y(a,s),n.ExtendMatch=a,a.prototype.wrapBody=function(t){var e=this.refs,n=e.applyCtx,i=e.local;return"function"!=typeof t?function(){for(var e={},s=Object.keys(t),r=0;r<s.length;r++)e[s[r]]=t[s[r]];return i(e)(function(){return n(this.ctx)})}:function(){for(var e={},s=t.call(this),r=Object.keys(s),o=0;o<r.length;o++)e[r[o]]=s[r[o]];return i(e)(function(){return n(this.ctx)})}},y(c,s),n.AddMatch=c,c.prototype.wrapBody=function(t){return this[this.mode+"WrapBody"](t)},c.prototype.appendContentWrapBody=function(t){var e=this.refs,n=e.applyCtx,i=e.apply;return"function"!=typeof t?function(){return[i("content"),t]}:function(){return[i("content"),n(t.call(this,this,this.ctx))]}},c.prototype.prependContentWrapBody=function(t){var e=this.refs,n=e.applyCtx,i=e.apply;return"function"!=typeof t?function(){return[t,i("content")]}:function(){return[n(t.call(this,this,this.ctx)),i("content")]}},c.prototype.mixWrapBody=function(t){var e=this.refs.apply;return"function"!=typeof t?function(){var n=e("mix");return Array.isArray(n)||(n=[n]),n.concat(t)}:function(){var n=e("mix");return Array.isArray(n)||(n=[n]),n.concat(t.call(this,this,this.ctx))}},c.prototype.attrsWrapBody=function(t){var e=this.refs.apply;return"function"!=typeof t?function(){return v.extend(e("attrs")||{},t)}:function(){return v.extend(e("attrs")||{},t.call(this,this,this.ctx))}},c.prototype.jsWrapBody=function(t){var e=this.refs.apply;return"function"!=typeof t?function(){return v.extend(e("js")||{},t)}:function(){return v.extend(e("js")||{},t.call(this,this,this.ctx))}},c.prototype.modsWrapBody=function(t){var e=this.refs.apply;return"function"!=typeof t?function(){return this.mods=v.extend(e("mods"),t),this.mods}:function(){return this.mods=v.extend(e("mods"),t.call(this,this,this.ctx)),this.mods}},c.prototype.elemModsWrapBody=function(t){var e=this.refs.apply;return"function"!=typeof t?function(){return this.elemMods=v.extend(e("elemMods"),t),this.elemMods}:function(){return this.elemMods=v.extend(e("elemMods"),t.call(this,this,this.ctx)),this.elemMods}},y(l,s),n.CompilerOptions=l,y(u,s),n.PropertyMatch=u,y(p,s),n.CustomMatch=p,n.Tree=f,f.methods=["match","block","elem","mod","elemMod","oninit","xjstOptions","wrap","replace","extend","mode","def","content","appendContent","prependContent","attrs","addAttrs","js","addJs","mix","addMix","mods","addMods","addElemMods","elemMods","tag","cls","bem"],f.prototype.build=function(t,e){var n=this.methods("global").concat(e);return n[0]=this.match.bind(this),t.apply({},n),{templates:this.templates.slice().reverse(),oninit:this.initializers}},f.prototype.methods=function(t){for(var e=new Array(f.methods.length),n=0;n<e.length;n++){var i=f.methods[n];e[n]=d(this,t,i)}return e},f.prototype.flush=function(t,e){var n;n=e.conditions?t.concat(e.conditions):e.conditions;for(var s=0;s<e.children.length;s++){var o=e.children[s];if(o instanceof r)this.flush(n,e.children[s]);else{var h=new i(t,o);h.wrap(),this.templates.push(h)}}},f.prototype.body=function(){for(var t=new Array(arguments.length),e=0;e<arguments.length;e++)t[e]=arguments[e];var n=new r(this,t);return this.queue[this.queue.length-1].children.push(n),1===this.queue.length&&this.flush([],this.queue.shift()),this.boundBody},f.prototype.match=function(){for(var t=new Array(arguments.length),e=0;e<arguments.length;e++){var n=arguments[e];"function"==typeof n&&(n=new p(n)),m(n instanceof s,"Wrong .match() argument"),t[e]=n}return this.queue.push(new r(this,t)),this.boundBody},f.prototype.applyMode=function(t,e){if(t.length)throw new Error("Predicate should not have arguments but "+JSON.stringify(t)+" passed");return this.mode(e)},f.prototype.xjstOptions=function(t){return this.queue.push(new r(this,[new l(t)])),this.boundBody},f.prototype.block=function(t){return this.match(new u("block",t))},f.prototype.elem=function(t){return this.match(new u("elem",t))},f.prototype.mode=function(t){return this.match(new u("_mode",t))},f.prototype.mod=function(t,e){return this.match(new u(["mods",t],void 0===e?!0:String(e)))},f.prototype.mods=function(){return this.applyMode(arguments,"mods")},f.prototype.addMods=function(){return this.mods.apply(this,arguments).match(new c("mods",this.refs))},f.prototype.elemMod=function(t,e){return this.match(new u(["elemMods",t],void 0===e?!0:String(e)))},f.prototype.elemMods=function(){return this.applyMode(arguments,"elemMods")},f.prototype.addElemMods=function(){return this.elemMods.apply(this,arguments).match(new c("elemMods",this.refs))},f.prototype.def=function(){return this.applyMode(arguments,"default")},f.prototype.tag=function(){return this.applyMode(arguments,"tag")},f.prototype.attrs=function(){return this.applyMode(arguments,"attrs")},f.prototype.addAttrs=function(){return this.attrs.apply(this,arguments).match(new c("attrs",this.refs))},f.prototype.cls=function(){return this.applyMode(arguments,"cls")},f.prototype.js=function(){return this.applyMode(arguments,"js")},f.prototype.addJs=function(){return this.js.apply(this,arguments).match(new c("js",this.refs))},f.prototype.bem=function(){return this.applyMode(arguments,"bem")},f.prototype.addMix=function(){return this.mix.apply(this,arguments).match(new c("mix",this.refs))},f.prototype.mix=function(){return this.applyMode(arguments,"mix")},f.prototype.content=function(){return this.applyMode(arguments,"content")},f.prototype.appendContent=function(){return this.content.apply(this,arguments).match(new c("appendContent",this.refs))},f.prototype.prependContent=function(){return this.content.apply(this,arguments).match(new c("prependContent",this.refs))},f.prototype.wrap=function(){return this.def.apply(this,arguments).match(new o(this.refs))},f.prototype.replace=function(){return this.def.apply(this,arguments).match(new h(this.refs))},f.prototype.extend=function(){return this.def.apply(this,arguments).match(new a(this.refs))},f.prototype.oninit=function(t){this.initializers.push(t)}},{"./utils":10,inherits:11,"minimalistic-assert":12}],10:[function(t,e,n){function i(){return y+ ++f}var s="&amp;",r="&lt;",o="&gt;",h="&quot;",a="&#39;",c=/[&<>]/;n.xmlEscape=function(t){var e=""+t,n=c.exec(e);if(!n)return e;var i,h="",a=0,l=0;for(a=n.index;a<e.length;a++){switch(e.charCodeAt(a)){case 38:i=s;break;case 60:i=r;break;case 62:i=o;break;default:continue}l!==a&&(h+=e.substring(l,a)),l=a+1,h+=i}return l!==a?h+e.substring(l,a):h};var l=/["&]/;n.attrEscape=function(t){var e=""+t,n=l.exec(e);if(!n)return e;var i,r="",o=0,a=0;for(o=n.index;o<e.length;o++){switch(e.charCodeAt(o)){case 34:i=h;break;case 38:i=s;break;default:continue}a!==o&&(r+=e.substring(a,o)),a=o+1,r+=i}return a!==o?r+e.substring(a,o):r};var u=/['&]/;n.jsAttrEscape=function(t){var e=""+t,n=u.exec(e);if(!n)return e;var i,r="",o=0,h=0;for(o=n.index;o<e.length;o++){switch(e.charCodeAt(o)){case 38:i=s;break;case 39:i=a;break;default:continue}h!==o&&(r+=e.substring(h,o)),h=o+1,r+=i}return h!==o?r+e.substring(h,o):r},n.extend=function(t,e){if(!t||!e)return t||e;var n,i={};for(n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);for(n in e)e.hasOwnProperty(n)&&(i[n]=e[n]);return i};var p={area:1,base:1,br:1,col:1,command:1,embed:1,hr:1,img:1,input:1,keygen:1,link:1,meta:1,param:1,source:1,wbr:1};n.isShortTag=function(t){return p.hasOwnProperty(t)},n.isSimple=function v(t){return t&&t!==!0&&(t.block||t.elem||t.tag||t.cls||t.attrs||!t.hasOwnProperty("html")||!v(t.html))?"string"==typeof t||"number"==typeof t:!0},n.isObj=function(t){return t&&"object"==typeof t&&!Array.isArray(t)&&null!==t};var f=0,d=+new Date,m="__"+d,y="uniq"+d;n.getUniq=i,n.identify=function(t,e){if(!t)return i();if(e||t[m])return t[m];var n=i();return t[m]=n,n},n.fnToString=function(t){if(!t)return"";if("function"==typeof t){var e=/^function\s*[^{]+{|}$/g,n=/^(_|\(\w|[^=>]+\))\s=>\s{|}$/g;t=t.toString(),t=t.replace(0===t.indexOf("function")?e:n,"")}return t}},{}],11:[function(t,e,n){"function"==typeof Object.create?e.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},{}],12:[function(t,e,n){function i(t,e){if(!t)throw new Error(e||"Assertion failed")}e.exports=i,i.equal=function(t,e,n){if(t!=e)throw new Error(n||"Assertion failed: "+t+" != "+e)}},{}]},{},[2])(2)}),t.exports||e.BEMHTML}({},{}),api=new BEMHTML({});api.compile(function(t,e,n,i,s,r,o,h,a,c,l,u,p,f,d,m,y,v,x,b,g,k,w,M,E,_,j,C,B,O,S,A){});