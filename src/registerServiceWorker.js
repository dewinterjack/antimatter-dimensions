if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // Registration fails on dev server (no service-worker.js) and file:// protocol.
      // This is expected and safe to ignore.
    });
  });
}
