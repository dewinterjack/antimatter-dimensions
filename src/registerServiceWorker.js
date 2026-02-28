if ("serviceWorker" in navigator && process.env.VUE_APP_DISABLE_SW !== "true") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").then(registration => {
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          // Only notify on updates, not first install
          if (newWorker.state === "activated" && registration.active !== newWorker) {
            if (window.GameUI) {
              GameUI.notify.info("Game updated — reload for the latest version", 10000);
            }
          }
        });
      });
    }).catch(() => {
      // Registration fails on dev server (no service-worker.js) and file:// protocol.
      // This is expected and safe to ignore.
    });
  });
}
