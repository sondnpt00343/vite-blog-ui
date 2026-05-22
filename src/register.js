import JustValidate from "just-validate";
import { emailRule, passwordRule, requiredRule, matchRule, formOptions } from "./validators";

export const initRegister = () => {
  const el = document.querySelector("#register-form");
  if (!el) return;

  const validate = new JustValidate(el, formOptions);

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
