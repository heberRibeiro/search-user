let input = document.querySelector('#name');

window.addEventListener('load', () => {
  focusInput();
  disableButton();
});

function focusInput() {
  input.focus();
}
