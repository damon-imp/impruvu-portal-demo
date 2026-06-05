/* ──────────────────────────────────────────────────────────────
   IMPRUVU PORTAL - DEMO MODE HELPER
   Wires every interactive element so the demo never breaks.
   Toast on dead links, notifications + account dropdowns,
   demo banner, global link interception.
   ────────────────────────────────────────────────────────────── */
(function(){
  const css = `
    #demo-toast{position:fixed;left:50%;bottom:calc(var(--tabbar-h) + var(--safe-bottom) + 16px);transform:translateX(-50%);background:rgba(22,22,24,.96);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.10);color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:12px 18px;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.5);z-index:200;display:flex;align-items:center;gap:10px;max-width:90vw;opacity:0;transition:opacity .25s,transform .25s;pointer-events:none}
    #demo-toast.show{opacity:1;transform:translateX(-50%) translateY(-6px)}
    #demo-toast .toast-dot{width:8px;height:8px;border-radius:50%;background:#FF8A0A;flex-shrink:0;box-shadow:0 0 12px rgba(255,138,10,.6)}
    @media (min-width:768px){#demo-toast{bottom:24px}}

    #demo-banner{position:fixed;top:0;left:0;right:0;background:linear-gradient(90deg,#FFA209,#FF6A00);color:#fff;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;padding:8px 16px;text-align:center;z-index:55;letter-spacing:.3px;transform:translateY(-100%);transition:transform .35s;display:flex;align-items:center;justify-content:center;gap:12px}
    #demo-banner.show{transform:translateY(0)}
    body.demo-banner-shown .topbar{top:36px}
    .topbar{transition:top .35s ease}
    #demo-banner .dot{width:6px;height:6px;border-radius:50%;background:#fff;animation:pulse 2s infinite}
    #demo-banner button{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);color:#fff;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;margin-left:8px}
    #demo-banner button:hover{background:rgba(255,255,255,.3)}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

    .demo-dropdown{position:fixed;width:320px;max-width:calc(100vw - 24px);background:#161618;border:1px solid rgba(255,255,255,.10);border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.6);z-index:100;opacity:0;transform:translateY(-8px);pointer-events:none;transition:opacity .18s,transform .18s;overflow:hidden}
    .demo-dropdown.show{opacity:1;transform:translateY(0);pointer-events:auto}
    .demo-dropdown-head{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:space-between}
    .demo-dropdown-title{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:#fff;letter-spacing:-.2px}
    .demo-dropdown-action{font-size:11px;font-weight:600;color:#FF8A0A;cursor:pointer}
    .demo-dropdown-list{max-height:380px;overflow-y:auto}
    .demo-notif{display:flex;gap:12px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;transition:background .12s;position:relative;padding-left:24px}
    .demo-notif:last-child{border-bottom:none}
    .demo-notif:hover{background:rgba(255,255,255,.02)}
    .demo-notif.unread{background:rgba(255,138,10,.04)}
    .demo-notif.unread::before{content:'';position:absolute;left:6px;top:50%;transform:translateY(-50%);width:6px;height:6px;border-radius:50%;background:#FF8A0A}
    .demo-notif-icon{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .demo-notif-icon svg{width:15px;height:15px;stroke-width:2}
    .demo-notif-icon.action{background:rgba(229,72,77,.10);color:#E5484D;border:1px solid rgba(229,72,77,.20)}
    .demo-notif-icon.deliverable{background:rgba(48,164,108,.10);color:#30A46C;border:1px solid rgba(48,164,108,.20)}
    .demo-notif-icon.meeting{background:rgba(255,138,10,.10);color:#FF8A0A;border:1px solid rgba(255,138,10,.20)}
    .demo-notif-icon.gate{background:rgba(245,166,35,.10);color:#F5A623;border:1px solid rgba(245,166,35,.20)}
    .demo-notif-body{flex:1;min-width:0}
    .demo-notif-title{font-size:13px;font-weight:600;color:#fff;line-height:1.3;margin-bottom:2px}
    .demo-notif-meta{font-size:11px;color:#7B8190}
    .demo-dropdown-foot{padding:10px 16px;background:rgba(255,255,255,.02);text-align:center;font-size:12px;color:#7B8190;border-top:1px solid rgba(255,255,255,.04);cursor:pointer}

    .demo-menu-item{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;transition:background .12s;color:#E4E7EC;font-size:13px;font-weight:500}
    .demo-menu-item:last-child{border-bottom:none}
    .demo-menu-item:hover{background:rgba(255,255,255,.04)}
    .demo-menu-item svg{width:16px;height:16px;stroke-width:1.8;color:#7B8190;flex-shrink:0}
    .demo-menu-item.danger{color:#E5484D}
    .demo-menu-item.danger svg{color:#E5484D}
    .demo-menu-header{padding:16px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:12px}
    .demo-menu-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#FFA209,#FF6A00);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-weight:700;color:#fff;font-size:14px;letter-spacing:-.5px}
    .demo-menu-name{font-size:14px;font-weight:600;color:#fff;line-height:1.2}
    .demo-menu-email{font-size:11px;color:#7B8190;margin-top:2px}

    .demo-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);z-index:90;opacity:0;pointer-events:none;transition:opacity .2s}
    .demo-backdrop.show{opacity:1;pointer-events:auto}
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── TOAST ───
  const toast = document.createElement('div');
  toast.id = 'demo-toast';
  toast.innerHTML = '<span class="toast-dot"></span><span class="toast-msg"></span>';
  document.body.appendChild(toast);
  let toastTimer = null;
  window.showDemoToast = function(msg){
    toast.querySelector('.toast-msg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove('show'),2400);
  };

  // ─── DEMO BANNER ───
  function showBanner(){
    const banner = document.createElement('div');
    banner.id = 'demo-banner';
    banner.innerHTML = `<span class="dot"></span><span>DEMO MODE · sample client · not wired to backend</span><button id="demoBannerClose">Got it</button>`;
    document.body.appendChild(banner);
    setTimeout(()=>{banner.classList.add('show');document.body.classList.add('demo-banner-shown');},300);
    document.getElementById('demoBannerClose').addEventListener('click',()=>{
      banner.classList.remove('show');document.body.classList.remove('demo-banner-shown');
      setTimeout(()=>banner.remove(),400);
    });
    setTimeout(()=>{if(banner.parentNode){banner.classList.remove('show');document.body.classList.remove('demo-banner-shown');setTimeout(()=>banner.remove(),400);}},6000);
  }
  showBanner();

  // ─── BACKDROP ───
  const backdrop = document.createElement('div');
  backdrop.className = 'demo-backdrop';
  document.body.appendChild(backdrop);

  // ─── NOTIFICATIONS ───
  function buildNotifications(){
    const d = document.createElement('div');
    d.className = 'demo-dropdown'; d.id = 'notifDropdown';
    d.innerHTML = `
      <div class="demo-dropdown-head"><span class="demo-dropdown-title">Notifications</span><span class="demo-dropdown-action" data-mark-read>Mark all read</span></div>
      <div class="demo-dropdown-list">
        <div class="demo-notif unread"><div class="demo-notif-icon action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16v.01"/></svg></div><div class="demo-notif-body"><div class="demo-notif-title">Action needed: upload latest credit report</div><div class="demo-notif-meta">Due in 2 days · Credit</div></div></div>
        <div class="demo-notif unread"><div class="demo-notif-icon meeting"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg></div><div class="demo-notif-body"><div class="demo-notif-title">Strategy Session starts in 3 hours</div><div class="demo-notif-meta">Today · 1:00p · Zoom</div></div></div>
        <div class="demo-notif"><div class="demo-notif-icon deliverable"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12l5 5L20 7"/></svg></div><div class="demo-notif-body"><div class="demo-notif-title">Debt restructure plan delivered to your Vault</div><div class="demo-notif-meta">2 days ago · Debt</div></div></div>
        <div class="demo-notif"><div class="demo-notif-icon gate"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg></div><div class="demo-notif-body"><div class="demo-notif-title">Phase 2 complete · Funding moves underway</div><div class="demo-notif-meta">4 days ago · Day 42</div></div></div>
        <div class="demo-notif"><div class="demo-notif-icon deliverable"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12l5 5L20 7"/></svg></div><div class="demo-notif-body"><div class="demo-notif-title">Capital Score updated · +14 since baseline</div><div class="demo-notif-meta">1 week ago · Now at 71</div></div></div>
      </div>
      <div class="demo-dropdown-foot">View all notifications</div>`;
    document.body.appendChild(d); return d;
  }

  // ─── ACCOUNT MENU ───
  function buildAccountMenu(){
    const d = document.createElement('div');
    d.className = 'demo-dropdown'; d.id = 'menuDropdown';
    d.innerHTML = `
      <div class="demo-menu-header"><div class="demo-menu-avatar">NC</div><div><div class="demo-menu-name">Naomi Castellano</div><div class="demo-menu-email">naomi@castellanobuilt.com</div></div></div>
      <div class="demo-menu-item" data-demo-msg="Profile screen - next build round"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>Your Profile</div>
      <div class="demo-menu-item" data-demo-msg="Billing screen - next build round"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></svg>Billing & Payments</div>
      <div class="demo-menu-item" data-demo-msg="Service Agreement - view your engagement terms"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 13h6M9 17h3"/></svg>Engagement Agreement</div>
      <div class="demo-menu-item" data-demo-msg="Help & contact - next build round"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.5-2.5 1.5-2.5 4M12 18v.01"/></svg>Help & Contact</div>
      <div class="demo-menu-item danger" data-demo-msg="Sign out - would return to login"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>Sign Out</div>`;
    document.body.appendChild(d); return d;
  }

  const notifDropdown = buildNotifications();
  const menuDropdown = buildAccountMenu();
  let openDropdown = null;

  function closeDropdowns(){notifDropdown.classList.remove('show');menuDropdown.classList.remove('show');backdrop.classList.remove('show');openDropdown=null;}
  function positionDropdown(btn,d){const r=btn.getBoundingClientRect();d.style.top=(r.bottom+8)+'px';d.style.right=(window.innerWidth-r.right)+'px';}

  function attachIconButtonHandlers(){
    document.querySelectorAll('.icon-btn').forEach(btn=>{
      const label=(btn.getAttribute('aria-label')||'').toLowerCase();
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        if(label.includes('notif')){
          if(openDropdown===notifDropdown){closeDropdowns();return}
          closeDropdowns();positionDropdown(btn,notifDropdown);notifDropdown.classList.add('show');backdrop.classList.add('show');openDropdown=notifDropdown;
        }else if(label.includes('menu')){
          if(openDropdown===menuDropdown){closeDropdowns();return}
          closeDropdowns();positionDropdown(btn,menuDropdown);menuDropdown.classList.add('show');backdrop.classList.add('show');openDropdown=menuDropdown;
        }
      });
    });
  }
  setTimeout(attachIconButtonHandlers,50);

  backdrop.addEventListener('click',closeDropdowns);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDropdowns()});
  window.addEventListener('resize',()=>{if(openDropdown){const btn=document.querySelector(openDropdown===notifDropdown?'.icon-btn[aria-label*="Notif" i]':'.icon-btn[aria-label*="Menu" i]');if(btn)positionDropdown(btn,openDropdown);}});

  menuDropdown.querySelectorAll('[data-demo-msg]').forEach(item=>{item.addEventListener('click',e=>{e.stopPropagation();closeDropdowns();window.showDemoToast(item.dataset.demoMsg);});});
  notifDropdown.querySelectorAll('.demo-notif').forEach(n=>{n.addEventListener('click',e=>{e.stopPropagation();n.classList.remove('unread');const t=n.querySelector('.demo-notif-title').textContent;closeDropdowns();window.showDemoToast('Opening: '+t.substring(0,40)+(t.length>40?'...':''));});});
  notifDropdown.querySelector('[data-mark-read]')?.addEventListener('click',e=>{e.stopPropagation();notifDropdown.querySelectorAll('.demo-notif.unread').forEach(n=>n.classList.remove('unread'));window.showDemoToast('All notifications marked read');});
  notifDropdown.querySelector('.demo-dropdown-foot')?.addEventListener('click',e=>{e.stopPropagation();closeDropdowns();window.showDemoToast('Full notifications page - next build round');});

  // ─── GLOBAL DEAD-LINK INTERCEPT ───
  document.addEventListener('click',e=>{
    const link=e.target.closest('a, button');
    if(!link) return;
    const skip=['tab','brand-mark','icon-btn','view-switch','action-tab','filter-chip','phase-head','phase-chevron','completed-toggle','pillar-tile','meetings-head-link','demo-menu-item','demo-notif','demo-dropdown-action','demo-dropdown-foot'];
    if(skip.some(c=>link.classList.contains(c))) return;
    if(link.classList.contains('nav-link') && !link.classList.contains('locked')) return;
    if(link.id==='demoBannerClose') return;
    const href=link.getAttribute('href');
    if(href==='#'||href===undefined||href===null){
      e.preventDefault();
      let msg='Demo: this action is not wired yet';
      const text=(link.textContent||'').trim().toLowerCase();
      if(text.includes('join')) msg='Would open Zoom meeting link';
      else if(text.includes('details')) msg='Would open session details';
      else if(text.includes('upload')) msg='Would open file upload dialog';
      else if(text.includes('mark done')||text.includes('mark complete')) msg='Would mark complete and update your Hub';
      else if(text.includes('download')) msg='Would download the file';
      else if(text.includes('view')||text.includes('open')) msg='Would open the document viewer';
      if(msg) window.showDemoToast(msg);
    }
  });
})();
