/* ──────────────────────────────────────────────────────────────
   IMPRUVU PORTAL - SHARED NAV PARTIAL
   Drop <div id="portal-nav" data-active="hub"></div> on each page.
   Active options: hub | position | roadmap | actions | vault | retain
   ────────────────────────────────────────────────────────────── */
(function(){
  const ACTIVE = document.getElementById('portal-nav')?.dataset.active || 'hub';

  const ICONS = {
    hub:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12L12 4l9 8M5 10v10h14V10"/></svg>',
    position: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    roadmap:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    actions:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 11l3 3 7-7"/><path d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h11"/></svg>',
    vault:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg>',
    retain:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z"/></svg>',
    bell:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 16v-5a6 6 0 10-12 0v5l-2 3h16l-2-3z"/><path d="M10 21a2 2 0 004 0"/></svg>',
    menu:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'
  };

  // Has open action items? (wire to API; static true for demo)
  const HAS_ACTIONS_ALERT = true;
  // Retainer unlocked? (unlocks when engagement completes; static false for demo)
  const RETAIN_UNLOCKED = false;

  const topbarHTML = `
    <header class="topbar">
      <div class="topbar-inner">
        <a href="hub.html" class="brand-mark" aria-label="Impruvu">
          <img src="shared/logo.svg" alt="Impruvu" class="logo-img"
               onerror="this.onerror=null;this.src='shared/logo.png'">
          <span class="pill">Portal</span>
        </a>
        <nav class="topbar-desktop-nav" aria-label="Primary">
          <a href="hub.html"      class="nav-link${ACTIVE==='hub'?' active':''}">${ICONS.hub} Hub</a>
          <a href="position.html" class="nav-link${ACTIVE==='position'?' active':''}">${ICONS.position} Position</a>
          <a href="roadmap.html"  class="nav-link${ACTIVE==='roadmap'?' active':''}">${ICONS.roadmap} Roadmap</a>
          <a href="actions.html"  class="nav-link${ACTIVE==='actions'?' active':''}">${ICONS.actions} Actions${HAS_ACTIONS_ALERT?'<span class="alert-dot"></span>':''}</a>
          <a href="vault.html"    class="nav-link${ACTIVE==='vault'?' active':''}">${ICONS.vault} Vault</a>
          <a href="retain.html"   class="nav-link${ACTIVE==='retain'?' active':RETAIN_UNLOCKED?'':' locked'}" ${ACTIVE==='retain'||RETAIN_UNLOCKED?'':'title="Unlocks when your engagement completes - click to preview"'}>${ICONS.retain} Retain</a>
        </nav>
        <div class="topbar-utility">
          <button class="icon-btn" aria-label="Notifications">${ICONS.bell}<span class="badge"></span></button>
          <button class="icon-btn" aria-label="Menu" id="menuBtn">${ICONS.menu}</button>
        </div>
      </div>
    </header>
  `;

  const tabbarHTML = `
    <nav class="tabbar" aria-label="Primary mobile navigation">
      <div class="tabbar-inner">
        <a href="hub.html"      class="tab${ACTIVE==='hub'?' active':''}">${ICONS.hub}<span>Hub</span></a>
        <a href="position.html" class="tab${ACTIVE==='position'?' active':''}">${ICONS.position}<span>Position</span></a>
        <a href="roadmap.html"  class="tab${ACTIVE==='roadmap'?' active':''}">${ICONS.roadmap}<span>Roadmap</span></a>
        <a href="actions.html"  class="tab${ACTIVE==='actions'?' active':''}">${ICONS.actions}<span>Actions</span>${HAS_ACTIONS_ALERT?'<span class="alert-dot"></span>':''}</a>
        <a href="vault.html"    class="tab${ACTIVE==='vault'?' active':''}">${ICONS.vault}<span>Vault</span></a>
      </div>
    </nav>
  `;

  const mount = document.getElementById('portal-nav');
  if(mount){ mount.outerHTML = topbarHTML + tabbarHTML; }
  else{
    document.body.insertAdjacentHTML('afterbegin', topbarHTML);
    document.body.insertAdjacentHTML('beforeend', tabbarHTML);
  }
})();
