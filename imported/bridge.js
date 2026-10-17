// Preserve each original case study inside the WHAT IF portfolio.
(()=>{
  if(window.parent===window)return;
  const notify=type=>parent.postMessage({type},location.origin);
  const project=new URLSearchParams(location.search).get('project');
  const style=document.createElement('style');
  style.textContent=`html,body{overscroll-behavior:contain}.imported-story-extras{padding:50px max(6%,24px);background:#fff;color:#17181e;font-family:Arial,sans-serif}.imported-story-extras:empty{display:none}.imported-story-extras .case-chapter{padding:35px 0;border-top:1px solid #ddd}.imported-story-extras h3{font-size:clamp(28px,4vw,44px);letter-spacing:-1px}.imported-story-extras p{white-space:pre-line;line-height:1.85;max-width:780px}.imported-story-extras img{width:100%;height:auto}.imported-story-extras figure{margin:25px 0}.imported-story-extras figcaption{margin-top:12px;font-size:13px}.imported-case-end{display:flex;justify-content:space-between;gap:16px;padding:35px 6%;background:#101522;color:#fff}.imported-case-end button{background:#c1dff5;border:0;border-radius:30px;padding:14px 22px;color:#111;font:14px Arial;cursor:pointer}`;
  document.head.append(style);
  let content=document.querySelector('main')||document.body;
  if(['gluvia','aura','occasio'].includes(project)){
    const d=document.querySelector('#projectDialog');
    style.textContent+=`body>header,body>main,body>aside,.editor-shade,body>.edit-toggle,body>#toast{display:none!important}#projectDialog{width:100vw!important;max-width:100vw!important;height:100dvh!important;max-height:100dvh!important;margin:0!important;border:0!important;border-radius:0!important;padding:0!important}#closeProject{display:none!important}`;
    const views={gluvia:gluviaSourceView,aura:auraView,occasio:occasioView};
    document.querySelector('#projectDetail').innerHTML=views[project]();
    d.classList.add('gluvia-dialog');d.showModal();d.scrollTop=0;
    d.addEventListener('close',()=>notify('portfolio-close'));
    content=document.querySelector('#projectDetail');
  }
  const extras=document.createElement('div');extras.className='imported-story-extras';content.append(extras);
  const end=document.createElement('div');end.className='imported-case-end';end.innerHTML='<button type="button" data-return>← Selected work</button><button type="button" data-next>Next project ↗</button>';content.append(end);
  end.querySelector('[data-return]').onclick=()=>notify('portfolio-close');end.querySelector('[data-next]').onclick=()=>notify('portfolio-next');
  addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent||e.data?.type!=='portfolio-sections')return;extras.innerHTML=e.data.html;});
  document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;const href=a.getAttribute('href')||'';if(a.classList.contains('back')||href.includes('kritshelly.github.io/kritika-design-portfolio/#work')||href==='../#work'){e.preventDefault();notify('portfolio-close');}},true);
})();
