/* Shared dropdown behavior; the home page keeps its existing mobile handler. */
(() => {
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
  if (document.body.classList.contains('subpage')) {
    burger.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('#mobilePanel a').forEach(link => link.addEventListener('click', () => {
      header.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }
})();
