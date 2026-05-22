import JustValidate from "just-validate";
import { emailRule, passwordRule, requiredRule, matchRule } from "./validators";

export const initRegister = () => {
  const el = document.querySelector("#register-form");
  if (!el) return;

  const validate = new JustValidate(el, {
    errorFieldCssClass: "invalid",
    errorLabelCssClass: "form-group__error",
    errorLabelStyle: {},
  });

  validate
    .addField("#name", [requiredRule("Vui lòng nhập họ tên")])
    .addField("#email", emailRule)
    .addField("#password", passwordRule)
    .addField("#password-confirm", [
      requiredRule("Vui lòng nhập lại mật khẩu"),
      matchRule("#password", "Nhập lại mật khẩu chưa chính xác."),
    ])
    .onSuccess(() => {
      console.log("Send API...");
    });
};
