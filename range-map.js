// Broad range centers use longitude/latitude so overlays align with the
// equirectangular NASA Blue Marble base. Values are [lon, lat, lonRadius, latRadius].
const geoRanges=[
  [[-82,30,12,8]],[[119,31,5,4]],[[ -73,8,27,18]],[[ -52,-25,13,20]],[[ -58,-20,14,12]],[[ -63,-5,25,22]],[[ -62,-5,22,20]],[[ -62,1,22,20]],
  [[-6,7,10,15]],[[19,0,12,16]],[[10,2,18,17]],[[ -81,25,5,5],[-76,18,15,8],[-85,12,10,9],[-72,8,9,8]],[[20,0,8,12]],[[ -68,7,12,10]],[[132,-16,18,10]],[[122,12,8,8]],[[ -89,18,10,9]],[[25,-4,28,25]],[[142,-5,10,9]],[[77,20,22,13]],[[80,16,15,12],[108,8,25,16],[137,-16,28,16]],[[ -80,22,5,4]],[[104,13,18,12]],[[0,12,25,18]],[[80,26,18,7]],[[108,2,20,13]]
];
const rangeData=geoRanges.map(ranges=>ranges.map(([lon,lat,lonRadius,latRadius])=>[
  (lon+180)/360*1000,
  (90-lat)/180*500,
  lonRadius/360*1000,
  latRadius/180*500
]));
const archive=document.querySelector('.archive');
const toolbar=archive?.querySelector('.toolbar');
if(archive&&toolbar){
  const section=document.createElement('section');section.className='range-explorer';section.setAttribute('aria-labelledby','map-title');
  section.innerHTML=`<div class="map-head"><div><p class="label">INTERACTIVE RANGE ATLAS</p><h3 id="map-title">Where they live.</h3></div><p id="map-status" aria-live="polite">Select a species name to reveal its broad native range.</p></div><div class="map-layout"><div class="world-map"><svg viewBox="0 0 1000 500" role="img" aria-labelledby="map-title map-description"><desc id="map-description">Simplified world map showing broad crocodilian ranges.</desc><g class="graticule"><path d="M0 125H1000M0 250H1000M0 375H1000M250 0V500M500 0V500M750 0V500"/></g><g class="land"><path d="M45 90l72-42 105 15 73 62-26 50-62 18-34 70-49-24-24-68-55-27z"/><path d="M250 265l69 18 42 78-18 109-42-12-30-87-40-54z"/><path d="M442 96l60-29 95 21 49-22 130 26 86 63-42 54-100 3-54 42-63-34-35 45-63-37-35-70-48-22z"/><path d="M484 235l86 12 49 77-29 139-64-28-35-106z"/><path d="M796 330l79-25 73 49-20 64-88 9-56-47z"/><path d="M894 173l35 16-12 30-38-10z"/></g><g id="range-highlights"></g></svg><div class="map-key"><span><i></i>Broad native range</span><small>Generalized educational map—not a precise boundary.</small></div></div><div class="map-species" aria-label="Choose a species"></div></div>`;
  section.querySelector('svg').setAttribute('preserveAspectRatio','xMidYMid meet');
  toolbar.before(section);
  section.querySelector('.map-key small').innerHTML='Generalized range overlay · Satellite base: <a href="https://visibleearth.nasa.gov/images/57752/blue-marble-land-surface-shallow-water-and-shaded-topography" target="_blank" rel="noreferrer">NASA Blue Marble ↗</a>';
  const names=section.querySelector('.map-species'),highlights=section.querySelector('#range-highlights'),status=section.querySelector('#map-status');
  names.innerHTML=species.map((s,i)=>`<button type="button" data-map-index="${i}">${String(i+1).padStart(2,'0')} · ${s[0]} <small>${redList[i][0]}</small></button>`).join('');
  function showRange(index){const s=species[index],marks=rangeData[index]||[];highlights.innerHTML=marks.map(([cx,cy,rx,ry])=>`<ellipse class="range-mark" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${Math.max(8,rx).toFixed(1)}" ry="${Math.max(6,ry).toFixed(1)}"/>`).join('');names.querySelector('.active')?.classList.remove('active');names.querySelector(`[data-map-index="${index}"]`)?.classList.add('active');status.innerHTML=`<strong>${s[0]}</strong> · <b>${redList[index][0]} ${redList[index][1]}</b><br>${s[3]}`;}
  names.addEventListener('click',event=>{const button=event.target.closest('[data-map-index]');if(button)showRange(Number(button.dataset.mapIndex))});
  showRange(0);
}
