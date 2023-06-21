async function t(t){let o=await fetch(`https://www.omdbapi.com/?apikey=f8b853da&t=${t}`);if(o.ok)return o;throw Error("Something went wrong")}!async function(o){try{let n=await t(o),r=await n.json();console.log(r)}catch(t){console.error(t)}}("the lord of the rings");
//# sourceMappingURL=index.d3cf8ec9.js.map
