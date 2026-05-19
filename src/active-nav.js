const currentFile = () => location.pathname.split("/").at(-1) || "index.html";

const fileLink = (link) => new URL(link.href).pathname.split("/").at(-1);

export const initActiveNav = () => {
  const current = currentFile();
  document.querySelectorAll(".nav-desktop__link, .nav-mobile__link").forEach((link) => {
    if (current === fileLink(link)) {
      link.setAttribute("aria-current", "page");
    }
  });
};
