(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{PBHM:function(e,t){e.exports=function(e){return e&&e.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((function(e){return e.toLowerCase()})).join("-")}},cgSC:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a("q1tI"),r=a.n(n),o=a("+ZDr"),l=a.n(o),i=a("vOnD"),c=a("IP2g"),u=a("kByy"),d=a("PBHM"),m=a.n(d),s=i.d.article.withConfig({displayName:"BlogCard__PostWrapper",componentId:"sc-4iowlm-0"})(["overflow:auto;margin-bottom:70px;padding:30px 30px;border-top:5px solid ",";border-radius:10px;box-shadow:",";background-color:",";&:hover{box-shadow:0 5px 10px rgba(0,0,0,0.1);}span{font-size:13px;color:gray;}"],(function(e){return e.theme.dark?e.theme.accentColor:e.theme.primaryColor}),(function(e){return e.theme.shadowSmall}),(function(e){return e.theme.secondaryColor})),p=function(e){var t=e.date,a=e.readtime;return r.a.createElement("span",{style:{fontSize:13,color:"gray"}},r.a.createElement("span",{"aria-label":"publish date "+t},r.a.createElement(c.a,{color:"gray",icon:"calendar-alt"}),"  ",t),"   ",r.a.createElement("span",{"aria-label":a+" minutes read"},r.a.createElement(c.a,{color:"gray",icon:"clock"}),"  ",a,"min read"))};t.b=function(e){var t=e.date,a=e.readtime,n=e.title,o=e.excerpt,i=e.slug,c=e.tags;return r.a.createElement(l.a,{to:i,"aria-label":n+" - read time "+a+" minutes"},r.a.createElement(s,null,r.a.createElement(p,{date:t,readtime:a}),r.a.createElement("h2",null,n),r.a.createElement("p",null,o),r.a.createElement("div",{style:{marginTop:20}},c.map((function(e){return r.a.createElement(u.a,{key:e,"aria-label":e+" tag",to:"/blog/tags/"+m()(e)+"/"},e)})))))}},how0:function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),o=a("vOnD").d.section.withConfig({displayName:"SplitLayout__SplitLayoutWrapper",componentId:"sc-ymx62k-0"})(["",";& article:first-of-type{margin-top:15px;}display:grid;grid-template-columns:minmax(750px,1fr) 1fr;grid-column-gap:70px;grid-template-areas:'post side';.layout__content{grid-area:side;}.layout__aside{grid-area:post;}@media ","{grid-template-columns:1fr 1fr;grid-column-gap:0px;grid-row-gap:30px;grid-template-areas:'post post' 'side side';}.sticky__aside{position:sticky;top:100px;}"],(function(e){return e.theme.spacing.sectionBottom}),(function(e){return e.theme.media.fablet}));t.a=function(e){var t=e.aside,a=e.content;return r.a.createElement(o,null,r.a.createElement("section",{className:"layout__aside"},r.a.createElement("aside",{className:"sticky__aside"},t&&t)),r.a.createElement("section",{className:"layout__content"},a&&a))}},kByy:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a("q1tI"),r=a.n(n),o=a("vOnD"),l=a("Wbzz"),i=a("PBHM"),c=a.n(i),u=Object(o.d)(l.Link).withConfig({displayName:"Tags__TagBreadcrumb",componentId:"sc-p98pqd-0"})(["float:left;border:1px solid ",";border-radius:50px;padding:8px 13px;line-height:10px;margin:5px;font-size:12px;&:hover{background:",";color:",";}"],(function(e){return e.theme.dark?e.theme.primaryColor:"#d9e0ff"}),(function(e){return e.theme.dark?e.theme.primaryColor:"#d9e0ff"}),(function(e){return e.theme.dark?"#d9e0ff":"#6D83F2"}));t.b=function(){var e=Object(l.useStaticQuery)("550521386");return r.a.createElement("section",{style:{overflow:"auto"}},e.allMarkdownRemark.group.map((function(e){return r.a.createElement(u,{key:e.fieldValue,to:"/blog/tags/"+c()(e.fieldValue)+"/","aria-label":e.totalCount+" posts tagged with "+e.fieldValue},e.fieldValue,", ",e.totalCount)})))}},u2mt:function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),o=a("+ZDr"),l=a.n(o),i=a("kByy"),c=a("how0"),u=a("Wbzz"),d=function(e,t){return Math.floor(Math.random()*(t-e+1))+e},m=function(){var e=Object(u.useStaticQuery)("3435786681"),t=e.allMarkdownRemark.edges[d(0,e.allMarkdownRemark.totalCount-1)];if("undefined"!=typeof window)for(;t.node.fields.slug===window.location.pathname;){t=e.allMarkdownRemark.edges[d(0,e.allMarkdownRemark.totalCount-1)];break}return{randomSlug:t.node.fields.slug,randomTitle:t.node.frontmatter.title}};t.a=function(e){var t=e.children,a=e.sharerSection,n=m(),o=n.randomSlug,u=n.randomTitle;return r.a.createElement(c.a,{aside:r.a.createElement(r.a.Fragment,null,r.a.createElement("section",null,r.a.createElement("h4",null,"Random post"),r.a.createElement(l.a,{style:{fontSize:"16px"},to:o},u),r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement("section",null,r.a.createElement("h4",null,"Tags"),r.a.createElement(i.b,null),r.a.createElement("br",null)),a&&a),content:t})}},vx99:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),o=a("Wbzz"),l=a("yBb5"),i=a("vrFN"),c=a("cgSC"),u=a("u2mt");t.default=function(){var e=Object(o.useStaticQuery)("1048528189");return r.a.createElement(l.a,null,r.a.createElement(i.a,{title:"Blog | Anurag Hazra"}),r.a.createElement(u.a,null,e.allMarkdownRemark.edges.map((function(e){var t=e.node;return r.a.createElement(c.b,{key:t.id,slug:t.fields.slug,title:t.frontmatter.title,date:t.frontmatter.date,tags:t.frontmatter.tags,readtime:t.timeToRead,excerpt:t.excerpt})}))))}}}]);
//# sourceMappingURL=component---src-pages-blog-js-56191f1dd89d49ea82a5.js.map