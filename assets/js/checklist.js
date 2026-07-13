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

/* =========================================================
   Sectioned checklist — for long, multi-week checklists.
   Each section has either `items` directly or `groups`
   (an array of { title, items }) for a second level of
   grouping. Renders a per-section progress line, a per-group
   progress line, and one overall progress bar/counter at the
   top. Same localStorage persistence pattern as
   plpInitChecklist, just with a nested item structure.
   ========================================================= */

function plpInitSectionedChecklist(opts) {
  var container = document.getElementById(opts.containerId);
  if (!container) return;

  var storageKey = opts.storageKey;
  var saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch (e) {
    saved = {};
  }

  function sectionItems(section) {
    var items = section.items ? section.items.slice() : [];
    if (section.groups) {
      section.groups.forEach(function (group) {
        items = items.concat(group.items);
      });
    }
    return items;
  }

  function countChecked(items) {
    var n = 0;
    for (var i = 0; i < items.length; i++) {
      if (saved[items[i].id]) n++;
    }
    return n;
  }

  function renderItems(items) {
    return items.map(function (item) {
      var checked = !!saved[item.id];
      return (
        '<label class="plp-checklist-item' + (checked ? ' is-checked' : '') + '">' +
          '<input type="checkbox" data-id="' + item.id + '"' + (checked ? ' checked' : '') + '>' +
          '<span>' + item.label + '</span>' +
        '</label>'
      );
    }).join('');
  }

  function render() {
    var allItems = [];
    opts.sections.forEach(function (section) {
      allItems = allItems.concat(sectionItems(section));
    });

    var totalChecked = countChecked(allItems);
    var total = allItems.length;
    var pct = total ? Math.round((totalChecked / total) * 100) : 0;

    var html =
      '<div class="plp-checklist-overall">' +
        '<div class="plp-checklist-overall-label">' +
          '<span>Overall progress</span>' +
          '<strong>' + totalChecked + ' of ' + total + ' complete (' + pct + '%)</strong>' +
        '</div>' +
        '<div class="plp-progress-bar"><div class="plp-progress-bar-fill" style="width:' + pct + '%;"></div></div>' +
      '</div>';

    opts.sections.forEach(function (section) {
      var items = sectionItems(section);
      var checked = countChecked(items);

      html += '<div class="plp-checklist-section">' +
        '<div class="plp-checklist-section-header">' +
          '<h2>' + section.title + '</h2>' +
          '<span class="plp-checklist-section-progress">' + checked + ' of ' + items.length + ' complete</span>' +
        '</div>';

      if (section.items) {
        html += '<div class="plp-checklist">' + renderItems(section.items) + '</div>';
      }

      if (section.groups) {
        section.groups.forEach(function (group) {
          var gChecked = countChecked(group.items);
          html += '<div class="plp-checklist-group">' +
            '<div class="plp-checklist-group-header">' +
              '<span class="plp-checklist-group-title">' + group.title + '</span>' +
              '<span class="plp-checklist-group-progress">' + gChecked + ' of ' + group.items.length + '</span>' +
            '</div>' +
            '<div class="plp-checklist">' + renderItems(group.items) + '</div>' +
          '</div>';
        });
      }

      html += '</div>';
    });

    if (total > 0 && totalChecked === total) {
      html += '<p class="plp-checklist-complete">' + opts.completionMessage + '</p>';
    }

    container.innerHTML = html;

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
