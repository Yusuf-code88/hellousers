const form = document.querySelector('form');
const submit = document.querySelector("#submit");
const signUp = document.querySelector("#signUp");
const input1 = document.querySelector("#login");
const input2 = document.querySelector("#pass");
const h3 = document.querySelector("#h3");
const log = document.querySelector(".log");
const email = document.querySelector(".email")
const q = document.querySelector(".q")

let url = `https://reqres.in/api/login`;

async function makeRequestToAuthorization(url, method, data = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

function identifyToken(){
  let token = document.cookie
   token = token.slice(0, 5)

  if (token === 'token') {
    window.location.pathname = '/index.html'
  }
  return
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const data = new FormData(form)
  const authData = Object.fromEntries(data)


  const response = await makeRequestToAuthorization(url, 'POST', authData)
  if (response === null) {
    console.log("something went wrong")
  } else {
    console.log(response)

    if (response.token) {
      document.cookie = `token=${response.token}; path=/; max-age=172800 ;`
    }
  } 
   identifyToken()
  
   if (input1.value === "eve.holt@reqres.in"){
    console.log("ok")
  }else{
    q.textContent = "Invalid email or password";
    q.classList.toggle('p');
  }

  if (input2.value === "pistol"){
    console.log("ok")
  }else{
    q.textContent = "Invalid email or password";
    q.classList.toggle('p');
  }
})

signUp.addEventListener("click", (e) => {
  e.preventDefault()
  log.innerHTML = `<h3 class="form__title" id="h3" style="margin-left: -130px;">Sign up</h3>`
  url = `https://reqres.in/api/register`

 
})

