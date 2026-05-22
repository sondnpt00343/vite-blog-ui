export const requiredRule = (errorMessage) => ({
  rule: "required",
  errorMessage,
});

export const emailRule = [
  requiredRule("Vui lòng nhập email."),
  { rule: "email", errorMessage: "Email không hợp lệ." },
];

export const passwordRule = [
  requiredRule("Vui lòng nhập mật khẩu."),
  { rule: "password", errorMessage: "Mật khẩu cần ít nhất 8 ký tự, gồm cả chữ và số." },
];

export const matchRule = (otherSelector, errorMessage) => ({
  validator: (value, context) => value === context[otherSelector].elem.value,
  errorMessage,
});
