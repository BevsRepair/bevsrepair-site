
async function loadJSON(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}
function cleanTel(phone) { return (phone || "").replace(/[^\d+]/g, ""); }
function fmtHours(hours) {
  if (!hours) return "";
  return Object.entries(hours).map(([day,val]) => `<div><b>${day}:</b> ${val}</div>`).join("");
}
function setText(id, value){ const el=document.getElementById(id); if(el) el.textContent=value??""; }
function setHTML(id, value){ const el=document.getElementById(id); if(el) el.innerHTML=value??""; }

async function initBase(){
  const settings = await loadJSON("/content/settings.json");

  // Header brand text
  setText("brandTitle", settings.businessName);
  setText("brandSub", settings.tagline);

  // Call buttons
  const tel = `tel:${cleanTel(settings.phone)}`;
  document.querySelectorAll("[data-call]").forEach(a => a.setAttribute("href", tel));

  // Directions buttons
  document.querySelectorAll("[data-directions]").forEach(a => a.setAttribute("href", settings.mapsUrl));

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Meta line
  setText("metaLine", `${settings.address} • ${settings.city}`);

  return settings;
}

async function initHome(){
  const settings = await initBase();
  const services = await loadJSON("/content/services.json");
  const reviews  = await loadJSON("/content/reviews.json");

  setText("heroTitle", settings.heroTitle);
  setText("heroSubtitle", settings.heroSubtitle);

  setHTML("hoursBlock", fmtHours(settings.hours));
  setHTML("contactBlock",
    `<div><b>Phone:</b> ${settings.phone}</div>
     <div><b>Email:</b> ${settings.email}</div>`
  );

  const ul = document.getElementById("servicesList");
  if (ul) ul.innerHTML = services.highlights.map(x => `<li>${x}</li>`).join("");

  const rg = document.getElementById("reviewGridHome");
  if (rg) rg.innerHTML = reviews.items.slice(0,3).map(r => `
    <div class="review">
      <div class="who"><b>${r.name}</b><span class="stars">${"★★★★★".slice(0, r.stars || 5)}</span></div>
      <p>${r.text}</p>
    </div>
  `).join("");
}

async function initServices(){
  await initBase();
  const services = await loadJSON("/content/services.json");

  setText("servicesIntro", services.intro || "");

  const wrap = document.getElementById("servicesCards");
  if (wrap) wrap.innerHTML = services.cards.map(c => `
    <div class="card">
      <h2>${c.title}</h2>
      <div class="small">${c.desc || ""}</div>
      ${c.items?.length ? `<ul>${c.items.map(i => `<li>${i}</li>`).join("")}</ul>` : ""}
    </div>
  `).join("");
}

async function initGallery(){
  await initBase();
  const gallery = await loadJSON("/content/gallery.json");
  const wrap = document.getElementById("galleryTiles");
  if (wrap) wrap.innerHTML = gallery.items.map(it => `
    <div class="tile">
      <img src="${it.image}" alt="${(it.caption||"Project photo").replace(/"/g,"&quot;")}" loading="lazy" />
      <div class="cap">${it.caption||""}</div>
    </div>
  `).join("");
}

async function initReviews(){
  await initBase();
  const reviews = await loadJSON("/content/reviews.json");
  const wrap = document.getElementById("reviewGrid");
  if (wrap) wrap.innerHTML = reviews.items.map(r => `
    <div class="review">
      <div class="who"><b>${r.name}</b><span class="stars">${"★★★★★".slice(0, r.stars || 5)}</span></div>
      <div class="small">${r.source || ""}</div>
      <p>${r.text}</p>
    </div>
  `).join("");
}

async function initContact(){
  const settings = await initBase();
  setHTML("contactDetails", `
    <div class="kv small">
      <b>Phone</b><div>${settings.phone}</div>
      <b>Email</b><div>${settings.email}</div>
      <b>Address</b><div>${settings.address}, ${settings.city}</div>
    </div>
  `);

  const map = document.getElementById("mapFrame");
  if (map && settings.mapsEmbedUrl) map.setAttribute("src", settings.mapsEmbedUrl);
}
