const miModulo=(()=>{"use strict";let e=[],t=["C","D","H","S"],a=["A","J","Q","K"],r=[],l=document.querySelector("#btnPedir"),n=document.querySelector("#BtnDetener"),d=document.querySelector("#btnNuevo"),s=document.querySelectorAll(".divCartas"),o=document.querySelectorAll("small"),i=(t=1)=>{e=c(),r=[];for(let a=0;a<t;a++)r.push(0);o.forEach(e=>e.innerText=0),s.forEach(e=>e.innerHTML=""),l.disabled=!1,n.disabled=!1},c=()=>{e=[];for(let r=2;r<=10;r++)for(let l of t)e.push(r+l);for(let n of t)for(let d of a)e.push(d+n);return _.shuffle(e)},u=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},$=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},f=(e,t)=>(r[t]=r[t]+$(e),o[t].innerText=r[t],r[t]),g=(e,t)=>{let a=document.createElement("img");a.src=`assets/cartas/${e}.png`,a.classList.add("carta"),s[t].append(a)},h=()=>{let[e,t]=r;setTimeout(()=>{t===e?alert("Nadie gana"):e<21?alert("Computadora gana"):t>21?alert("jugador gana"):alert("Computadora gana")},600)},b=e=>{let t=0;do{let a=u();t=f(a,r.length-1),g(a,r.length-1)}while(t<e&&e<=21);h()};return l.addEventListener("click",()=>{let e=u(),t=f(e,0);g(e,0),t>21?(console.warn("Mamaste"),l.disabled=!0,n.disabled=!0,b(t)):21===t&&(console.warn("Ganaste"),l.disabled=!0,n.disabled=!0,b(t))}),n.addEventListener("click",()=>{n.disabled=!0,l.disabled=!0,b(r[0])}),d.addEventListener("click",()=>{i()}),{nuevoJuego:i}})();