document.getElementById("yil").textContent = new Date().getFullYear();

// Arıza sekmeleri (beyaz eşya / kombi / klima).
document.querySelectorAll(".tabs [role=tab]").forEach(function (b) {
  b.addEventListener("click", function () {
    document.querySelectorAll(".tabs [role=tab]").forEach(function (x) {
      var on = x === b;
      x.setAttribute("aria-selected", on);
      document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
    });
  });
});

// Telefon tıklaması → dataLayer "arama_tiklama" olayı (GTM'de dönüşüm tetikleyicisi olarak kullanılabilir).
// Kod ile tetiklenen (isTrusted=false), sayfa açılır açılmaz ya da hiçbir etkileşim
// olmadan yapılan tıklamalar sayılmaz.
(function () {
  var loadedAt = Date.now();
  var engaged = false;
  ["mousemove", "touchstart", "scroll", "keydown"].forEach(function (t) {
    window.addEventListener(t, function () { engaged = true; }, { passive: true, once: true });
  });

  function pushClean(ev, domEvent) {
    if (domEvent && (!domEvent.isTrusted || !engaged || Date.now() - loadedAt < 3000)) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(ev);
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.getAttribute("data-cf-trap") === "1") return;
    if (a.getAttribute("href").toLowerCase().indexOf("tel:") === 0) pushClean({ event: "arama_tiklama" }, e);
  }, true);
})();
