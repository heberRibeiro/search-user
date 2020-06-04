let input = document.querySelector('#name');
let button = document.querySelector('.btn');
let data = null;
let adjustedData = null;

async function request() {
  const response = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  data = await response.json();
  adjustData();
}

window.addEventListener('load', () => {
  request();
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

    pushButton();
  });
}

function pushButton() {
  button.addEventListener('click', () => {
    filterData();
    console.log(adjustedData);
  });
}

function adjustData() {
  adjustedData = data.results.map((person) => {
    const { name, picture, dob, gender } = person;
    return {
      name,
      picture,
      dob,
      gender,
    };
  });
}

function filterData() {}
