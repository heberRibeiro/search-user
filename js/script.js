let input = document.querySelector('#name');
let button = document.querySelector('.btn');
let data = [];

async function requisicao() {
  const response = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  data = await response.json();
}

window.addEventListener('load', () => {
  focusInput();
  disableButton();
  inputMonitoring();
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

function inputMonitoring() {
  input.addEventListener('keyup', (event) => {
    let buttonContent = event.target.value;
    buttonContent === '' ? disableButton() : enableButton();
  });
}
