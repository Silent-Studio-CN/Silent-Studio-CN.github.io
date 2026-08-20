// 文档代码块复制按钮：为每个 <pre> 右上角添加复制按钮
(function () {
  'use strict';
  function init() {
    if (!navigator.clipboard) return;
    var pres = document.querySelectorAll('.doc-content pre');
    pres.forEach(function (pre) {
      var code = pre.querySelector('code');
      if (!code) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.title = '复制';
      btn.setAttribute('aria-label', '复制代码');
      btn.innerHTML = '<i class="fas fa-copy"></i>';
      btn.addEventListener('click', function () {
        var done = function () {
          btn.innerHTML = '<i class="fas fa-check"></i>';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.innerHTML = '<i class="fas fa-copy"></i>';
            btn.classList.remove('copied');
          }, 1500);
        };
        var fallback = function () {
          var ta = document.createElement('textarea');
          ta.value = code.innerText;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          document.body.removeChild(ta);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(code.innerText).then(done, fallback);
        } else {
          fallback();
        }
      });
      pre.appendChild(btn);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
