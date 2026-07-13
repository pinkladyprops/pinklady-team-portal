/* =========================================================
   PinkLady Properties — shared header & footer
   Edit the PLP_NAV_ITEMS list below to add/remove/rename
   nav links across the ENTIRE site in one place.
   ========================================================= */

var PLP_NAV_ITEMS = [
  { key: 'home', label: 'Home', href: 'index.html' },
  { key: 'start-here', label: 'Start Here', href: 'pages/start-here.html' },
  { key: 'sops', label: 'Book of SOPs', href: 'pages/sops.html' },
  { key: 'engines', label: 'The Engines', href: 'pages/engines.html' },
  { key: 'training', label: 'Training', href: 'pages/training.html' },
  { key: 'resources', label: 'Resources', href: 'pages/resources.html' }
];

function plpRenderHeader(activeKey, basePath) {
  basePath = basePath || '';
  var container = document.getElementById('site-header');
  if (!container) return;

  var links = PLP_NAV_ITEMS.map(function (item) {
    var cls = item.key === activeKey ? ' class="active"' : '';
    return '<a href="' + basePath + item.href + '"' + cls + '>' + item.label + '</a>';
  }).join('');

  // Replace the placeholder div itself (not just its innerHTML) so <header>
  // becomes a direct child of the tall #site-content wrapper instead of being
  // trapped inside a div exactly its own height — a div that short breaks
  // position:sticky, since a sticky element can only stick while its parent
  // still has room left to scroll through.
  container.outerHTML =
    '<header class="plp-header" id="site-header">' +
      '<div class="plp-header-inner">' +
        '<a href="' + basePath + 'index.html" class="plp-brand">' +
          '<img src="' + basePath + 'assets/images/logo.png" alt="PinkLady Properties logo">' +
        '</a>' +
        '<button class="plp-nav-toggle" id="plp-nav-toggle" aria-label="Toggle navigation">&#9776;</button>' +
        '<nav class="plp-nav" id="plp-nav">' + links + '</nav>' +
      '</div>' +
    '</header>';

  var toggle = document.getElementById('plp-nav-toggle');
  var nav = document.getElementById('plp-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }
}

function plpRenderFooter(basePath) {
  basePath = basePath || '';
  var container = document.getElementById('site-footer');
  if (!container) return;

  var year = new Date().getFullYear();

  container.innerHTML =
    '<footer class="plp-footer">' +
      '<div class="plp-footer-inner">' +
        '<span>&copy; ' + year + ' PinkLady Properties &mdash; operating under Real Broker</span>' +
        '<div class="plp-footer-links">' +
          '<a href="' + basePath + 'index.html">Home</a>' +
          '<a href="#" id="plp-lock-link">Lock this device</a>' +
        '</div>' +
      '</div>' +
    '</footer>';

  var lockLink = document.getElementById('plp-lock-link');
  if (lockLink) {
    lockLink.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.PLPAuth && typeof window.PLPAuth.lock === 'function') {
        window.PLPAuth.lock();
      }
    });
  }
}
