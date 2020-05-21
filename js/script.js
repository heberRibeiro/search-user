let input = document.querySelector('#name');
let button = document.querySelector('.btn');

window.addEventListener('load', () => {
  focusInput();
  disableButton();
  enableButton();
});

function focusInput() {
  input.focus();
}

function disableButton() {
  button.disabled = true;
}

function enableButton() {
  input.addEventListener('keyup', (event) => {
    button.disabled = false;
  });
}
