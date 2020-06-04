let input = document.querySelector('#name');
let button = document.querySelector('.btn');
let inputContent = null;
let data = null;
let adjustedData = null;
let filteredData = null;

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
    inputContent = event.target.value;
    inputContent === '' ? disableButton() : enableButton();
  });
  pushButton();
  pushEnter();
}

function pushEnter() {
  input.addEventListener('keypress', (event) => {
    let inputKey = event.key;
    if (inputKey === 'Enter') {
      filterData();
    }
  });
}

function pushButton() {
  button.addEventListener('click', () => {
    filterData();
  });
}

function adjustData() {
  adjustedData = data.results.map((person) => {
    const { name, picture, dob, gender } = person;
    const { first, last } = name;
    const { thumbnail } = picture;
    const { age } = dob;
    return {
      name: { first, last },
      picture: { thumbnail },
      dob: { age },
      gender,
    };
  });
}

function filterData() {
  filteredData = adjustedData.filter((person) => {
    let firstName = person.name.first;
    let lastName = person.name.last;
    /** the filter are not case-sensitive */
    inputContent = inputContent.toLocaleLowerCase();
    firstName = firstName.toLocaleLowerCase();
    lastName = lastName.toLocaleLowerCase();

    /** filter is made from the content of the input in the first and last name */
    return firstName.includes(inputContent) || lastName.includes(inputContent);
  });
  console.log(filteredData);
}
