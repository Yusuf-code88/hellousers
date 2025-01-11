const creteBtn = document.querySelector("#creteBtn")
const reg_box = document.querySelector(".reg-box")
const mainBox = document.querySelector(".main_box")
const back = document.querySelector(".button")
const next = document.querySelector(".button2")
const form = document.querySelector('form')
const submit = document.querySelector("#submit")
const reg = document.querySelector(".reg")

// Функция для проверки наличия токена в куки
function checkAuthentication() {
  // Получаем все куки в виде строки
  const cookies = document.cookie;

  // Ищем токен среди куки
  const token = cookies
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];

  // Если токена нет, перенаправляем на login.html
  if (!token) {
    window.location.href = 'login.html';
  }
}

// Вызываем функцию при загрузке страницы
checkAuthentication();


creteBtn.addEventListener('click', () => {
    reg_box.classList.toggle('reg');
  });

async function makeRequest (url, method, data = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - $(response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function renderUsers (page) {
  const url = `https://reqres.in/api/users?page=${page}`

  const { data } = await makeRequest(url, 'GET')

  data.forEach(user => {
    const box = document.createElement("div")
    box.classList.add("boxes")

    box.innerHTML = `
<h3>${user.first_name}</h3>
<p>${user.email}</p>
<img src="${user.avatar}" alt="">
`

    mainBox.appendChild(box)
  })
}

renderUsers(1)

back.addEventListener('click', (e) => {
  e.preventDefault()
  mainBox.innerHTML = ''
  renderUsers(1)
});

next.addEventListener('click', (e) => {
  e.preventDefault()
  mainBox.innerHTML = ''
  renderUsers(2)
});

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const url = `https://reqres.in/api/users`

  const data = new FormData(form)
  
  const authData = Object.fromEntries(data)

  const response = await makeRequest(url, 'POST', authData)

  if (response === null) {
    console.log("something went wrong");
  }
  console.log(response)

})


submit.addEventListener('click', () => {
  reg_box.classList.toggle('reg');
});