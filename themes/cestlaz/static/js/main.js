/**
 * C'est la Z Theme Script
 * Copy code button & Theme switching
 */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // --- Copy code button ---
  var copySvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /></svg>';
  var checkSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 14l2 2l4 -4" /></svg>';
  var errorSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M10 12l4 4m0 -4l-4 4" /></svg>';

  function flashButton(btn, svg) {
    btn.innerHTML = svg;
    setTimeout(function () {
      btn.innerHTML = copySvg;
    }, 1000);
  }

  var highlights = document.getElementsByClassName("highlight");
  Array.prototype.forEach.call(highlights, function (wrapper) {
    var btn = document.createElement("button");
    btn.className = "highlight-copy-btn";
    btn.innerHTML = copySvg;
    btn.setAttribute("aria-label", "Copy code");
    
    btn.addEventListener("click", function () {
      var codeElem = wrapper.querySelector("code") || wrapper.querySelector("pre") || wrapper;
      var text = codeElem.innerText;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          flashButton(btn, checkSvg);
        }).catch(function () {
          flashButton(btn, errorSvg);
        });
      } else {
        var textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          flashButton(btn, checkSvg);
        } catch (err) {
          flashButton(btn, errorSvg);
        }
        document.body.removeChild(textarea);
      }
    });

    wrapper.appendChild(btn);
  });

  // --- Table of contents expand/collapse ---
  var toc = document.querySelector(".toc");
  if (toc) {
    toc.addEventListener("click", function (event) {
      if (event.target.tagName !== "A") {
        event.preventDefault();
        if (this.open) {
          this.open = false;
          this.classList.remove("expanded");
        } else {
          this.open = true;
          this.classList.add("expanded");
        }
      }
    });
  }
});
