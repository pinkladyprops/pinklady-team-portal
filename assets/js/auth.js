/* =========================================================
   PinkLady Properties — client-side password gate
   NOTE: this is a convenience lock for an internal training
   site, not real security (the password lives in this file
   and anyone can view page source). Do not put anything in
   this portal you wouldn't want a determined visitor to see.

   To change the team password, edit the line below.
   ========================================================= */

var PLP_PASSWORD = 'PinkLady2026'; // <-- change this to update the shared team password

(function () {
  var STORAGE_KEY = 'plpUnlocked';

  function isUnlocked() {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  }

  function reveal() {
    document.documentElement.classList.remove('plp-locked');
    var gate = document.getElementById('plp-gate');
    if (gate) gate.remove();
  }

  function showGate(basePath) {
    if (document.getElementById('plp-gate')) return;

    var gate = document.createElement('div');
    gate.id = 'plp-gate';
    gate.innerHTML =
      '<div class="plp-gate-box">' +
        '<img class="plp-gate-logo" src="' + basePath + 'assets/images/logo.png" alt="PinkLady Properties">' +
        '<p>Enter the team password to access the SOP &amp; Training Portal.</p>' +
        '<form id="plp-gate-form">' +
          '<input type="password" id="plp-gate-input" placeholder="Password" autocomplete="off" required>' +
          '<button type="submit" class="plp-btn plp-btn-primary">Enter</button>' +
        '</form>' +
        '<p class="plp-gate-error" id="plp-gate-error" hidden>Incorrect password. Please try again.</p>' +
      '</div>';

    document.body.appendChild(gate);

    var form = document.getElementById('plp-gate-form');
    var input = document.getElementById('plp-gate-input');
    var error = document.getElementById('plp-gate-error');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value === PLP_PASSWORD) {
        localStorage.setItem(STORAGE_KEY, 'true');
        reveal();
      } else {
        error.hidden = false;
        input.value = '';
        input.focus();
      }
    });

    input.focus();
  }

  window.plpInitAuth = function (basePath) {
    basePath = basePath || '';
    if (isUnlocked()) {
      reveal();
    } else {
      showGate(basePath);
    }
  };

  window.PLPAuth = {
    lock: function () {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };
})();
