(function () {
    var STORAGE_KEY = 'preview-auth';
    var PASSWORD = 'taylor-preview';

    if (sessionStorage.getItem(STORAGE_KEY) === 'ok') {
        document.documentElement.classList.remove('auth-pending');
        return;
    }

    document.documentElement.classList.add('auth-pending');

    var style = document.createElement('style');
    style.textContent = [
        'html.auth-pending body { visibility: hidden; }',
        '#preview-auth-gate {',
        '  position: fixed; inset: 0; z-index: 99999;',
        '  display: flex; align-items: center; justify-content: center;',
        '  background: #0f1412; color: #e8ede9; font-family: system-ui, sans-serif;',
        '}',
        '#preview-auth-gate .panel {',
        '  width: min(92vw, 380px); padding: 32px; border-radius: 16px;',
        '  background: #151c19; border: 1px solid rgba(255,255,255,0.1);',
        '  box-shadow: 0 16px 40px rgba(0,0,0,0.35);',
        '}',
        '#preview-auth-gate h1 { margin: 0 0 8px; font-size: 1.25rem; }',
        '#preview-auth-gate p { margin: 0 0 20px; color: #8a9a92; font-size: 0.95rem; line-height: 1.5; }',
        '#preview-auth-gate input {',
        '  width: 100%; box-sizing: border-box; padding: 12px 14px; margin-bottom: 12px;',
        '  border-radius: 10px; border: 1px solid rgba(255,255,255,0.12);',
        '  background: #0f1412; color: #e8ede9; font-size: 1rem;',
        '}',
        '#preview-auth-gate button {',
        '  width: 100%; padding: 12px 14px; border: 0; border-radius: 10px;',
        '  background: #2d2d2d; color: #fff; font-weight: 600; font-size: 0.95rem; cursor: pointer;',
        '}',
        '#preview-auth-gate button:hover { background: #000; }',
        '#preview-auth-gate .error { color: #f87171; font-size: 0.85rem; min-height: 1.2em; margin-top: 10px; }'
    ].join('\n');
    document.head.appendChild(style);

    function showGate() {
        var gate = document.createElement('div');
        gate.id = 'preview-auth-gate';
        gate.innerHTML = [
            '<div class="panel">',
            '  <h1>Preview access</h1>',
            '  <p>This is a private preview of the site redesign. Enter the password to continue.</p>',
            '  <form id="preview-auth-form">',
            '    <input type="password" id="preview-auth-input" autocomplete="current-password" placeholder="Password" required />',
            '    <button type="submit">Continue</button>',
            '    <div class="error" id="preview-auth-error" aria-live="polite"></div>',
            '  </form>',
            '</div>'
        ].join('');
        document.body.appendChild(gate);

        document.getElementById('preview-auth-form').addEventListener('submit', function (event) {
            event.preventDefault();
            var value = document.getElementById('preview-auth-input').value;
            var error = document.getElementById('preview-auth-error');
            if (value === PASSWORD) {
                sessionStorage.setItem(STORAGE_KEY, 'ok');
                gate.remove();
                document.documentElement.classList.remove('auth-pending');
                return;
            }
            error.textContent = 'Incorrect password. Try again.';
        });
    }

    if (document.body) {
        showGate();
    } else {
        document.addEventListener('DOMContentLoaded', showGate);
    }
})();
