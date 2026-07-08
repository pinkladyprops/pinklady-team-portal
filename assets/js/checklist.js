/* =========================================================
   PinkLady Properties — reusable interactive checklist
   Renders a list of checkbox items into a container, saves
   progress to localStorage (so it survives closing the tab),
   and shows a completion message once every item is checked.
   ========================================================= */

function plpInitChecklist(opts) {
  var container = document.getElementById(opts.containerId);
  if (!container) return;

  var storageKey = opts.storageKey;
  var saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch (e) {
    saved = {};
  }

  function render() {
    var checkedCount = 0;

    var itemsHtml = opts.items.map(function (item) {
      var checked = !!saved[item.id];
      if (checked) checkedCount++;
      return (
        '<label class="plp-checklist-item' + (checked ? ' is-checked' : '') + '">' +
          '<input type="checkbox" data-id="' + item.id + '"' + (checked ? ' checked' : '') + '>' +
          '<span>' + item.label + '</span>' +
        '</label>'
      );
    }).join('');

    var progressHtml =
      '<div class="plp-checklist-progress">' + checkedCount + ' of ' + opts.items.length + ' complete</div>';

    var completeHtml = '';
    if (checkedCount === opts.items.length) {
      completeHtml = '<p class="plp-checklist-complete">' + opts.completionMessage + '</p>';
    }

    container.innerHTML = progressHtml + '<div class="plp-checklist">' + itemsHtml + '</div>' + completeHtml;

    var boxes = container.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener('change', function (e) {
        saved[e.target.getAttribute('data-id')] = e.target.checked;
        localStorage.setItem(storageKey, JSON.stringify(saved));
        render();
      });
    }
  }

  render();
}
