(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{AP5z:function(e,t,n){"use strict";n.r(t);var l=n("q1tI"),a=n.n(l),i=n("vOnD"),c=n("yBb5"),o=n("vrFN"),r=i.d.ul.withConfig({displayName:"goodies__UnstyledUl",componentId:"sc-1ytjqp0-0"})(["list-style:initial;margin-left:15px;line-height:30px;font-weight:600;"]);t.default=function(){var e=Object(l.useState)(),t=e[0],n=e[1];return Object(l.useEffect)((function(){fetch("https://api.github.com/gists/17793ea33123f0ce4c0200cc734d7889").then((function(e){return e.json()})).then((function(e){n(JSON.parse(e.files["goodies.json"].content))}))}),[]),a.a.createElement(c.a,null,a.a.createElement(o.a,{title:"Moeid heidari - All Links"}),a.a.createElement("h1",null,"Goodies"),a.a.createElement("p",null,"Collection of all of the project, experiment, source-code links at one place."),a.a.createElement("hr",null),!t&&a.a.createElement("p",null,"Loading please wait...."),t&&Object.entries(t).map((function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",null,e[0]),a.a.createElement(r,null,e[1].map((function(e){return a.a.createElement("li",null,a.a.createElement("a",{target:"__blank",href:e[0]},e[1]))}))))})))}}}]);
//# sourceMappingURL=component---src-pages-goodies-js-48d0845de20e5031d551.js.map