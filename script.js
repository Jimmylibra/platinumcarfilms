window.addEventListener('DOMContentLoaded',()=>{
  const whyPlatinumFix=document.createElement('style');
  whyPlatinumFix.textContent=`
    .value-section::after{display:block!important}
    .value-card{justify-content:flex-start!important}
    .value-card>span{margin-bottom:28px!important}
    .value-card .card-fa{flex:0 0 auto}
    .value-card h3{align-self:auto}
    .value-card p{margin-top:14px}
    @media(max-width:650px){
      .value-card>span{margin-bottom:14px!important}
      .value-card p{margin-top:12px}
    }
  `;
  document.head.appendChild(whyPlatinumFix);

  requestAnimationFrame(()=>document.body.classList.add('loaded'));

  const nav=document.querySelector('.nav');
  const menuButton=document.querySelector('.menu');
  const closeMenu=()=>{
    if(!nav||!menuButton)return;
    nav.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded','false');
    const icon=menuButton.querySelector('i');
    if(icon){icon.className='fa-solid fa-bars';}
  };
  if(nav&&menuButton){
    menuButton.addEventListener('click',()=>{
      const open=!nav.classList.contains('menu-open');
      nav.classList.toggle('menu-open',open);
      document.body.classList.toggle('menu-open',open);
      menuButton.setAttribute('aria-expanded',String(open));
      const icon=menuButton.querySelector('i');
      if(icon){icon.className=open?'fa-solid fa-xmark':'fa-solid fa-bars';}
    });
    nav.querySelectorAll('nav a,.quote').forEach(link=>link.addEventListener('click',closeMenu));
    window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  }

  const cars=[...document.querySelectorAll('.car-image')];
  const dots=[...document.querySelectorAll('.car-dot')];
  let current=0;
  let timer;
  const showCar=(index)=>{
    current=(index+cars.length)%cars.length;
    cars.forEach((car,i)=>car.classList.toggle('active',i===current));
    dots.forEach((dot,i)=>dot.classList.toggle('active',i===current));
  };
  const startCycle=()=>{
    clearInterval(timer);
    timer=setInterval(()=>showCar(current+1),5000);
  };
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{showCar(i);startCycle();}));
  cars.slice(1).forEach(car=>{const preload=new Image();preload.src=car.src;});
  startCycle();

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
  },{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.scroll-reveal').forEach(el=>observer.observe(el));

  const navLinks=[...document.querySelectorAll('.nav nav a')];
  const sections=[...document.querySelectorAll('main section[id]')];
  const navObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));
      }
    });
  },{threshold:.25,rootMargin:'-25% 0px -60% 0px'});
  sections.forEach(section=>navObserver.observe(section));

  document.querySelectorAll('.faq-list details').forEach(detail=>{
    detail.addEventListener('toggle',()=>{
      if(detail.open){
        document.querySelectorAll('.faq-list details').forEach(other=>{if(other!==detail)other.open=false;});
      }
    });
  });
});
