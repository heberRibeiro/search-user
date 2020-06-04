let input = document.querySelector('#name');
let button = document.querySelector('.btn');
const data = [];

window.addEventListener('load', () => {
  focusInput();
  disableButton();
  buttonMonitoring();
});

function focusInput() {
  input.focus();
}

function disableButton() {
  button.disabled = true;
}

function enableButton() {
  button.disabled = false;
}

function buttonMonitoring() {
  input.addEventListener('keyup', () => {
    enableButton();
  });
}
