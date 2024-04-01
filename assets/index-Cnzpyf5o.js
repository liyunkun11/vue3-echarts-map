import{o as C,a as E,u as m,r as O,b,d as A,c as g,e as f,t as y,F as D,f as S,g as P,h as L,i as k}from"./@vue-G5bJ4rE-.js";import{i as I,g as M,r as j}from"./echarts-ChCb1MUq.js";import{d as x}from"./lodash-es-BMmXVQ06.js";import{a as N}from"./axios-Cm0UX6qg.js";/* empty css                      */import"./zrender-BAl-H0iw.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))d(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();const R=(n,o=!0)=>{let e=null;const d=()=>m(n)?!1:(console.warn("[useECharts]传入的DOM对象为空，请检查DOM对象"),!0),a=()=>{d()||(e=I(m(n)))},r=(t,s)=>{e||a(),e&&e.setOption(t,s)},p=()=>(e||a(),e),c=x(()=>{e==null||e.resize()},100),i=()=>{if(d())return;new ResizeObserver(c).observe(m(n))};return C(()=>{window.addEventListener("resize",c),o&&i()}),E(()=>{window.removeEventListener("resize",c)}),{setOption:r,getInstance:p}},_=N.create({baseURL:"https://geo.datav.aliyun.com",timeout:0});_.interceptors.request.use(n=>n,async n=>await Promise.reject(n));_.interceptors.response.use(async n=>n.status===200?await Promise.resolve(n.data):await Promise.reject(n.data),async n=>{const{response:o}=n;return o?await Promise.reject(o):await Promise.reject(n)});const B=async n=>await _.get(`/areas_v3/bound/geojson?code=${n}_full`),F=(n,o)=>{const e=O({name:"中国",adcode:1e5,navList:[{name:"中国",adcode:1e5,level:"province"}]}),d={},a=t=>{t.forEach(s=>{const{name:l,adcode:u,level:h}=s.properties;d[l]={adcode:u,level:h}})},r=async t=>{const s=t??e;M(s.name)||await B(s.adcode).then(l=>{a(l.features),j(s.name,l)})};return{currentMap:e,adcodeMap:d,registerMap:r,getMapInfo:t=>{const s=t??e.name;return M(s)},handleMapClick:t=>{const{adcode:s,level:l}=d[t.name];l!=="district"&&(o(),r({name:t.name,adcode:s}).then(()=>{e.name=t.name,e.adcode=s,e.navList.push({name:t.name,adcode:s,level:l}),n({geo:{map:t.name,zoom:1,center:void 0},series:[{data:[]},{data:[]}]})}))},handleLevelChange:(t,s)=>{e.navList.splice(s+1,9),e.name=t.name,e.adcode=t.adcode,o(),n({geo:{map:t.name,zoom:1,center:void 0},series:[{data:[]},{data:[]}]})}}},$=n=>{const o=b([]),e=b([]);return{points:o,lines:e,handleAddLine:r=>{const{geoJSON:p}=M(r),c=p.features.filter(u=>u.properties.name).map(u=>({name:u.properties.name,value:u.properties.center}));let i=0,t=0;for(;i===t;)i=Math.floor(Math.random()*c.length),t=Math.floor(Math.random()*c.length);const s=c[i],l=c[t];o.value.find(u=>u.name===s.name)||o.value.push({name:s.name,value:s.value}),o.value.find(u=>u.name===l.name)||o.value.push({name:l.name,value:l.value}),e.value.push({coords:[c[i].value,c[t].value]}),n({series:[{data:o.value},{data:e.value}]})},resetLineData:()=>{o.value=[],e.value=[]}}},q={class:"container"},U={class:"map-info"},V={key:0,class:"info-nav"},W=f("span",null,"层级导航: ",-1),G=["onClick"],K=f("span",{class:"item-arrow"},"->",-1),H="path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",J=A({__name:"App",setup(n){const o=b(),{setOption:e,getInstance:d}=R(o,!0),{points:a,lines:r,handleAddLine:p,resetLineData:c}=$(e),{currentMap:i,registerMap:t,handleMapClick:s,handleLevelChange:l}=F(e,c),u={backgroundColor:"#000000",geo:{map:i.name,roam:!0,scaleLimit:{min:1,max:10},label:{show:!0,color:"#6AD4DD"},itemStyle:{borderColor:"#5089EC",borderWidth:1,areaColor:{type:"radial",x:.5,y:.5,r:.5,colorStops:[{offset:0,color:"rgba(0, 102, 154, 0)"},{offset:1,color:"rgba(18, 64, 118, .5)"}]}},emphasis:{label:{color:"#6AD4DD"},itemStyle:{areaColor:"#378CE7",borderWidth:0}}},series:[{type:"effectScatter",coordinateSystem:"geo",zlevel:1,rippleEffect:{scale:5},data:a.value},{type:"lines",zlevel:2,symbol:["none","arrow"],symbolSize:10,effect:{show:!0,period:5,trailLength:0,symbol:H,symbolSize:15},lineStyle:{color:"#93EBF8",width:2.5,opacity:.6,curveness:.2},data:r.value}]};return C(async()=>{await t();const h=d();h==null||h.on("click",s),e(u)}),(h,w)=>(L(),g("div",q,[f("div",U,[f("p",null,"当前地图: "+y(m(i).name),1),f("p",null,"当前代码: "+y(m(i).adcode),1),m(i).navList.length>1?(L(),g("p",V,[W,(L(!0),g(D,null,S(m(i).navList,(v,z)=>(L(),g("span",{key:v.adcode,class:"nav-item"},[f("span",{class:"item-title",onClick:Q=>m(l)(v,z)},y(v.name),9,G),K]))),128))])):P("",!0),f("p",null,"当前飞线: "+y(m(r).length),1),f("button",{class:"line-btn",onClick:w[0]||(w[0]=v=>m(p)(m(i).name))},"随机添加飞线")]),f("div",{ref_key:"chartRef",ref:o,class:"map-chart"},null,512)]))}});k(J).mount("#app");
