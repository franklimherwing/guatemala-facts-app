if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
  .then(reg => {

    reg.update();

    if (reg.waiting) {
      reg.waiting.postMessage({ type: "SKIP_WAITING" });
    }

    reg.addEventListener("updatefound", () => {
      const newWorker = reg.installing;

      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            console.log("New version available — reloading...");
            window.location.reload();
          }
        }
      });
    });
  });
}
