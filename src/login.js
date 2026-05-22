import JustValidate from "just-validate";
import { emailRule, passwordRule } from "./validators";

export const initLogin = () => {
  const el = document.querySelector("#login-form");
  if (!el) return;

  const validate = new JustValidate(el, {
    errorFieldCssClass: "invalid",
    errorLabelCssClass: "form-group__error",
    errorLabelStyle: {},
  });

  validate
    .addField("#email", emailRule)
    .addField("#password", passwordRule)
    .onSuccess(() => {
      console.log("Send API...");
    });
};
