const ICONS = {
  info: "fa-circle-info",
  success: "fa-circle-check",
  error: "fa-circle-xmark",
  warning: "fa-triangle-exclamation",
};

const getContainer = () => {
  let el = document.querySelector(".toast-container");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast-container";
    document.body.appendChild(el);
  }
  return el;
};

const show = (type, message, duration = 3000) => {
  const el = document.createElement("div");
  el.className = `toast toast--${type}`;
  el.innerHTML = `
        <i class="fa-solid ${ICONS[type] || ICONS.info}"></i>
        <span>${message}</span>
    `;
  el.style.opacity = "0";
  el.style.transform = "translateX(20px)";
  el.style.transition = "opacity ease .25s, transform ease .25s";

  getContainer().appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateX(0)";
  });

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateX(20px)";
    el.addEventListener("transitionend", () => el.remove(), { once: true });
  }, duration);
};

const toast = (...params) => show(...params);

toast.info = (message, duration) => show("info", message, duration);
toast.success = (message, duration) => show("success", message, duration);
toast.error = (message, duration) => show("error", message, duration);
toast.warning = (message, duration) => show("warning", message, duration);

export default toast;
