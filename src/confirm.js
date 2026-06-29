const confirm = ({
  title = "Xác nhận",
  message = "",
  okText = "Xác nhận",
  cancelText = "Hủy",
  okClass = "btn btn--md btn--primary",
  cancelClass = "btn btn--md btn--normal",
} = {}) =>
  new Promise((resolve) => {
    let isConfirmed = false;

    const modal = new window.Popzy({
      content: `
        <div class="modal-confirm">
            <h2 class="modal-confirm__title">${title}</h2>
            <div class="modal-confirm__message">${message}</div>
        </div>
    `,
      footer: true,
      onClose: () => resolve(isConfirmed),
    });

    modal.addFooterButton(cancelText, cancelClass, function (e) {
      isConfirmed = false;
      modal.close();
    });

    modal.addFooterButton(okText, okClass, function (e) {
      isConfirmed = true;
      modal.close();
    });

    modal.open();
  });

export default confirm;
