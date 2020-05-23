let input = document.querySelector('#name');
let button = document.querySelector('.btn');
let divPeople = document.querySelector('.user-col');
let divStatistic = document.querySelector('.statistic-col');
let inputContent = null;
let data = null;
let adjustedData = null;
let filteredData = '';

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
  applyUsersDiv();
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
      applyUsersDiv();
      applyStatisticDiv();
    }
  });
}

function pushButton() {
  button.addEventListener('click', () => {
    filterData();
    applyUsersDiv();
    applyStatisticDiv();
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
}

function applyInitialDiv() {
  let users = '<div><p>Nenhum usuário filtrado</p></div>';
  let statistic = '<div><p>Nada a ser exibido</p></div>';
  divPeople.innerHTML = users;
  divStatistic.innerHTML = statistic;
}

function applyUsersDiv() {
  if (filteredData == '') {
    applyInitialDiv();
    return;
  }
  divPeople.innerHTML = '';
  let searchSize = filteredData.length;
  let divSearchSize = `<div><p>${searchSize} usuário(s) encontrado(s)</p></div>`;
  divPeople.innerHTML = divSearchSize;

  filteredData.forEach((person) => {
    let div = document.createElement('DIV');
    let img = document.createElement('IMG');
    let span = document.createElement('SPAN');
    let text = document.createTextNode(
      `${person.name.first} ${person.name.last}, ${person.dob.age} anos`
    );

    img.src = `${person.picture.thumbnail}`;
    span.appendChild(text);
    div.appendChild(img);
    div.appendChild(span);

    divPeople.appendChild(div);
  });
}

function applyStatisticDiv() {
  if (filteredData == '') {
    applyInitialDiv();
    return;
  }

  let maleNumber = 0;
  let femaleNumber = 0;
  let ageSum = 0;
  let totalUsers = filteredData.length;

  let statistic = '<div><p>Estatísticas</p></div>';
  divStatistic.innerHTML = statistic;

  filteredData.forEach((person) => {
    ageSum += person.dob.age;
    if (person.gender === 'male') {
      ++maleNumber;
    } else {
      ++femaleNumber;
    }
  });
  let ageAverage = (ageSum / totalUsers).toFixed(2);

  let div = document.createElement('DIV');
  let spanMale = document.createElement('SPAN');
  let spanFemale = document.createElement('SPAN');
  let spanAge = document.createElement('SPAN');
  let spanAverage = document.createElement('SPAN');

  let maleTextNumber = document.createTextNode(`Sexo masculino: ${maleNumber}`);
  let femaleTextNumber = document.createTextNode(
    `Sexo feminino: ${femaleNumber}`
  );
  let ageTextSum = document.createTextNode(`Soma das idades: ${ageSum}`);
  let ageTextAverage = document.createTextNode(
    `Média das idades: ${ageAverage}`
  );

  spanMale.appendChild(maleTextNumber);
  spanFemale.appendChild(femaleTextNumber);
  spanAge.appendChild(ageTextSum);
  spanAverage.appendChild(ageTextAverage);
  div.appendChild(spanMale);
  div.appendChild(spanFemale);
  div.appendChild(spanAge);
  div.appendChild(spanAverage);
  divStatistic.appendChild(div);
}
