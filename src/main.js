import { initSidebar } from "./sidebar";
import { initSlider } from "./slider";
import { initActiveNav } from "./active-nav";
import { initLogin } from "./login";
import { initRegister } from "./register";
import { initContact } from "./contact";
import { initHome } from "./pages/home";

const initApp = async () => {
  initSidebar();
  initActiveNav();
  initLogin();
  initRegister();
  initContact();

  await initHome();
  initSlider();
};

initApp();
