(function(){
  const page = document.documentElement.dataset.page || 'home';
  let seed = 7; const rnd = () => (seed = (seed*16807) % 2147483647) / 2147483647;
  const greens = ['#7FA08C','#9DB8A5','#6A8F7B','#B7CBB9','#587D69','#8EAE9A'];
  const flowers = page==='hindu' ? ['#EFA7BE','#F6C6D5','#E58AA8']
                : page==='christian' ? ['#FFF8E6','#F4E7C8'] : ['#F6C6D5','#FFF8E6'];
  const NS='http://www.w3.org/2000/svg';
  const el=(n,a)=>{ const e=document.createElementNS(NS,n); for(const k in a) e.setAttribute(k,a[k]); return e; };

  function sprig(){ // vertical eucalyptus sprig, base at (0,0), grows up (-y)
    const svg = el('svg',{viewBox:'-170 -440 340 460'});
    const len=400, bend=(rnd()-.5)*70;
    const pt = t => [bend*Math.sin(t*Math.PI), -len*t];
    svg.appendChild(el('path',{d:'M0,0 Q'+bend+','+(-len*.5)+' 0,'+(-len),fill:'none',stroke:'#4E735F','stroke-width':3,'stroke-linecap':'round',opacity:.8}));
    const n=11;
    for(let i=1;i<=n;i++){
      const t=i/(n+1), [x,y]=pt(t), side=i%2?1:-1, r=(11+ (1-t)*14 + rnd()*5);
      const ang = side*(52+rnd()*22) - (side>0?0:0);
      const g=el('g',{transform:'translate('+x+','+y+') rotate('+ang+')'});
      const col=greens[Math.floor(rnd()*greens.length)];
      g.appendChild(el('path',{d:'M0,0 C'+r*.5+','+-r*.95+' '+r*1.7+','+-r*.7+' '+r*1.9+',0 C'+r*1.7+','+r*.7+' '+r*.5+','+r*.95+' 0,0Z',fill:col,opacity:(.62+rnd()*.3).toFixed(2)}));
      g.appendChild(el('path',{d:'M0,0 L'+r*1.7+',0',stroke:'#fff','stroke-opacity':.35,'stroke-width':1}));
      svg.appendChild(g);
    }
    // terminal leaf pair
    const [tx,ty]=pt(1); [[-18,0],[18,0]].forEach(([a])=>{
      const g=el('g',{transform:'translate('+tx+','+ty+') rotate('+(a*3-90+ (a>0?20:-20) +90)+')'});
      g.appendChild(el('path',{d:'M0,0 C8,-14 26,-12 30,0 C26,12 8,14 0,0Z',fill:greens[1],opacity:.8}));
      svg.appendChild(g);
    });
    // a few blossoms near the tip
    const cnt = page==='christian' ? 3 : 5;
    for(let i=0;i<cnt;i++){
      const [x,y]=pt(.45+rnd()*.55), ox=(rnd()-.5)*60, oy=(rnd()-.5)*30, c=flowers[Math.floor(rnd()*flowers.length)];
      const f=el('g',{transform:'translate('+(x+ox)+','+(y+oy)+')',opacity:.9});
      for(let p=0;p<5;p++) f.appendChild(el('ellipse',{cx:0,cy:-7,rx:4.5,ry:7,fill:c,transform:'rotate('+p*72+')'}));
      f.appendChild(el('circle',{r:3,fill:'#E3B75B'}));
      svg.appendChild(f);
    }
    return svg;
  }

  function build(){
    const wrap=document.createElement('div'); wrap.id='plants'; wrap.setAttribute('aria-hidden','true');
    const k = Math.max(.6, Math.min(1, innerWidth/1100));
    // [x%, y%, rotation, width, blur px, opacity]
    const spec=[
      [-2,103, 28,360,0,.95],[8,106, 6,500,5,.55],
      [102,103,-30,380,0,.95],[92,107,-8,520,5,.55],
      [-2,-3, 152,320,1,.85],[102,-3,-148,330,1.5,.85],
      [-3,56, 74,270,3,.6],[103,46,-76,270,3,.6],
      [50,-6, 180,260,4,.4]
    ];
    spec.forEach(([x,y,rot,w,blur,op],i)=>{
      const b=document.createElement('div'); b.className='base'; b.style.left=x+'%'; b.style.top=y+'%';
      const s=sprig(); s.style.setProperty('--w',(w*k)+'px'); s.style.setProperty('--rot',rot+'deg');
      s.style.setProperty('--dur',(5+rnd()*4).toFixed(1)+'s'); s.style.setProperty('--delay',(-rnd()*6).toFixed(1)+'s');
      s.style.transform='rotate('+rot+'deg)'; s.style.filter= blur? 'blur('+blur+'px)':'none'; s.style.opacity=op;
      b.appendChild(s); wrap.appendChild(b);
    });
    document.body.insertBefore(wrap, document.body.firstChild);
  }
  if(document.body) build(); else addEventListener('DOMContentLoaded',build);
})();
