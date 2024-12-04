import{S as f,i as a}from"./assets/vendor-BrddEoy-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const p="47406672-32912a9d4734ffdd3d590f70b",m="https://pixabay.com/api/",y=async(s,t=1,o=40)=>{const n=`${m}?key=${p}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${o}`,e=await fetch(n);if(!e.ok)throw new Error("Failed to fetch images");return e.json()},g=s=>s.map(({webformatURL:t,largeImageURL:o,tags:n,likes:e,views:r,comments:i,downloads:u})=>`
    <div class="photo-card">
      <a class="card" href="${o}" >
        <img class="card-imege" src="${t}" alt="${n}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${e}</p>
        <p><b>Views:</b> ${r}</p>
        <p><b>Comments:</b> ${i}</p>
        <p><b>Downloads:</b> ${u}</p>
      </div>
    </div>
  `).join(""),h=()=>new f(".gallery a"),b=document.querySelector("#search-form"),c=document.querySelector(".gallery"),d=document.querySelector(".loader");let L,l=1;const $=()=>d.style.display="block",w=()=>d.style.display="none",q=async s=>{s.preventDefault();const t=s.currentTarget.elements.query.value.trim();if(!t){a.error({title:"Error",message:"Please enter a search query"});return}c.innerHTML="",l=1,$();try{const o=await y(t,l);o.hits.length===0?a.warning({title:"No results",message:"No images found!"}):(c.innerHTML=g(o.hits),L=h())}catch(o){a.error({title:"Error",message:o.message})}finally{w()}};b.addEventListener("submit",q);
//# sourceMappingURL=index.js.map
