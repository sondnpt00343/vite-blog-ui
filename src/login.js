import JustValidate from "just-validate";

export const initLogin = () => {
  const validate = new JustValidate("#login-form", {
    errorFieldCssClass: "invalid",
    errorLabelCssClass: "form-group__error",
    errorLabelStyle: {},
  });

  validate
    .addField("#email", [
      { rule: "required", errorMessage: "Vui lòng nhập email." },
      { rule: "email", errorMessage: "Email không hợp lệ." },
    ])
    .addField("#password", [
      { rule: "required", errorMessage: "Vui lòng nhập mật khẩu." },
      { rule: "password", errorMessage: "Mật khẩu cần ít nhất 8 ký tự, ít nhất một chữ cái và một chữ số." },
    ])
    .onSuccess(() => {
      console.log("Send API...");
    });
};
