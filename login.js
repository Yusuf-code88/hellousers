const form = document.querySelector('form');
const submit = document.querySelector("#submit");
const signUp = document.querySelector("#signUp");
const inputs = document.querySelector(".login");
const input2 = document.querySelector(".login");
const h3 = document.querySelector("#h3");
const log = document.querySelector(".log");

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
      document.cookie = `authData=${response.token}; path=/; max-age=172800 ;`
    }
  }
})

signUp.addEventListener("click", (e) => {
  e.preventDefault()
  log.innerHTML = `<h3 class="form__title" id="h3" style="margin-left: -130px;">Sign up</h3>`
  url = `https://reqres.in/api/register`

  const data = new FormData(form)
  const authData = Object.fromEntries(data)

  makeRequestToAuthorization(url, 'POST', authData).then((response) => {
    if (response === null) {
      console.log("something went wrong")
    } else {
      console.log(response)
      if (response.token) {
        document.cookie = `authData=${response.token}; path=/; max-age=172800 ;`
      }
    }
  })
})
