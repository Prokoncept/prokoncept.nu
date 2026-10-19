/* Shared desktop/mobile navigation on the home page and every subpage. */
(() => {
  // Keep previously shared AI and screening links working after the page split.
  const redirectLegacyDataLink = () => {
    if (location.pathname.endsWith('/forretningsoptimering.html') && ['#ai', '#datamodenhed'].includes(location.hash)) {
      location.replace('ai-data.html' + (location.hash === '#datamodenhed' ? location.hash : ''));
    }
  };
  redirectLegacyDataLink();
  addEventListener('hashchange', redirectLegacyDataLink);
  const header = document.getElementById('siteHeader');
  const burger = document.getElementById('burgerBtn');
  const menus = [...document.querySelectorAll('.about-menu')];
  const closeMenus = () => menus.forEach(menu => menu.open = false);
  menus.forEach(menu => menu.addEventListener('toggle', () => {
    if (menu.open) menus.forEach(other => { if (other !== menu) other.open = false; });
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.about-menu')) closeMenus();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openMenu = menus.find(menu => menu.open);
    if (openMenu) openMenu.querySelector('summary').focus();
    closeMenus();
    if (header.classList.contains('open')) {
      header.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.focus();
    }
  });
  if (header && burger) {
    burger.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('#mobilePanel a').forEach(link => link.addEventListener('click', () => {
      header.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }));
  const links = [...document.querySelectorAll('#navlinks > a[href^="#"]')];
  const updateActive = () => {
    const active = links.filter(link => {
      const section = document.getElementById(link.hash.slice(1));
      return section && section.getBoundingClientRect().top <= 120;
    }).at(-1);
    links.forEach(link => link.classList.toggle('active', link === active));
  };
  addEventListener('scroll', updateActive, { passive: true });
  updateActive();
  document.querySelectorAll('.about-menu a').forEach(link => {
    if (link.getAttribute('href') === location.pathname.split('/').pop()) link.setAttribute('aria-current', 'page');
  });
})();
