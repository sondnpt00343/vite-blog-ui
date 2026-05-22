import JustValidate from "just-validate";
import { emailRule, requiredRule, formOptions } from "./validators";

export const initContact = () => {
  const el = document.querySelector("#contact-form");
  if (!el) return;

  const validate = new JustValidate(el, formOptions);

  validate
    .addField("#name", [requiredRule("Vui lòng nhập họ tên")])
    .addField("#email", emailRule)
    .addField("#message", [
      requiredRule("Vui lòng nhập nội dung."),
      { rule: "minLength", value: 10, errorMessage: "Nội dung cần ít nhất 10 kí tự." },
    ])
    .onSuccess(() => {
      console.log("Send API...");
    });
};
