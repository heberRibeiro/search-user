let input = document.querySelector('#name');
let button = document.querySelector('.btn');

window.addEventListener('load', () => {
  focusInput();
  disableButton();
});

function focusInput() {
  input.focus();
}

function disableButton() {
  button.disabled = true;
}
