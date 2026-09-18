document.addEventListener('DOMContentLoaded', () => {
  if (!window.Capacitor?.isNativePlatform()) return;

  const { App } = Capacitor.Plugins;

  let lastBack = 0;

  App.addListener('backButton', () => {
    // 1️⃣ Αν υπάρχει ιστορικό → πίσω
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    // 2️⃣ Double back to exit
    const now = Date.now();
    if (now - lastBack < 2000) {
      App.exitApp();
    } else {
      lastBack = now;
      showExitToast();
    }
  });
});

// απλό toast χωρίς plugin
function showExitToast() {
  const toast = document.createElement('div');
  toast.textContent = 'Πάτησε ξανά για έξοδο';
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,.8);
    color: #fff;
    padding: 10px 16px;
    border-radius: 20px;
    z-index: 9999;
    font-size: 14px;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}
