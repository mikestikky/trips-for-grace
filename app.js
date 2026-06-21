/* ===== Trips for Grace — shared script ===== */
(function(){
  var KEY='graceTripPick';
  var NAMES={baltics:'Helsinki &amp; the Baltics',italy:'Northern Italy &amp; Slovenia',transylvania:'Transylvania Castles'};
  function get(){try{return localStorage.getItem(KEY);}catch(e){return null;}}
  function set(v){try{v?localStorage.setItem(KEY,v):localStorage.removeItem(KEY);}catch(e){}}

  // Pick button (trip pages)
  window.pickTrip=function(id){
    var cur=get();
    set(cur===id?null:id);
    renderPick();
  };
  function renderPick(){
    var cur=get();
    // trip-page button
    document.querySelectorAll('[data-pickbtn]').forEach(function(b){
      var on=b.getAttribute('data-pickbtn')===cur;
      b.classList.toggle('chosen',on);
      b.textContent=on?'✓ Your pick — nice choice':'This is the one for me';
    });
    // banners (any page)
    document.querySelectorAll('[data-pickbanner]').forEach(function(bn){
      if(cur){bn.classList.add('show');bn.innerHTML='✨ <b>Your pick so far:</b> '+(NAMES[cur]||cur)+'. Changed your mind? Just tap another trip’s button.';}
      else{bn.classList.remove('show');}
    });
    // landing cards highlight
    document.querySelectorAll('[data-trip]').forEach(function(c){
      c.style.outline=(c.getAttribute('data-trip')===cur)?'3px solid var(--gold)':'';
      c.style.outlineOffset='-3px';
    });
  }

  // Mobile menu
  window.toggleMenu=function(){var l=document.getElementById('navlinks');if(l)l.classList.toggle('open');};

  // Lightbox
  function buildLightbox(){
    if(document.getElementById('lb'))return;
    var lb=document.createElement('div');lb.className='lightbox';lb.id='lb';
    lb.innerHTML='<span class="x">&times;</span><img alt=""><div class="cap"></div>';
    document.body.appendChild(lb);
    lb.addEventListener('click',function(){lb.classList.remove('open');});
  }
  window.openLightbox=function(src,cap){
    buildLightbox();
    var lb=document.getElementById('lb');
    lb.querySelector('img').src=src;
    lb.querySelector('.cap').textContent=cap||'';
    lb.classList.add('open');
  };

  // Scroll-spy for subnav
  function spy(){
    var links=[].slice.call(document.querySelectorAll('.subnav a[href^="#"]'));
    if(!links.length)return;
    var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'));}).filter(Boolean);
    function onScroll(){
      var y=window.scrollY+120,cur=secs[0];
      secs.forEach(function(s){if(s.offsetTop<=y)cur=s;});
      links.forEach(function(a){a.classList.toggle('active',cur&&a.getAttribute('href')==='#'+cur.id);});
    }
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  }

  document.addEventListener('DOMContentLoaded',function(){
    renderPick();spy();
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){var lb=document.getElementById('lb');if(lb)lb.classList.remove('open');}});
  });
})();
