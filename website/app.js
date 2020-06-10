/* Global Variables */
// HTML elements
const button = document.getElementById('generate')
const date = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')
const zip = document.getElementById('zip')
const feelings = document.getElementById('feelings')

// OpenWeatherApi settings global var
const url = 'https://api.openweathermap.org/data/2.5/weather'
const APIKey = 'ab99997adca2bdd127962a607e1c6475'

// Create a new date instance dynamically with JS
let d = new Date()
let nDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

// Listener of click event
button.addEventListener('click', () => {
  fetchWeatherData(url, zip.value, APIKey)
    .then(temp => {
      return {date: nDate, temp, content: feelings.value}
    })
    .then(data => {
      saveData('api/projectdata', data)
      return data
    })
    .then(({temp, date, content}) => updateUI(temp, date, content))
    .catch(e => {});
})

// POST Request to store date, temp and user input
const saveData = async (path, data) => {
  try {
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (e) {}
};

// To update UI with response
const updateUI = async (temperature, nDate, feelings) => {
	temp.innerText = `${temperature} deg`;
  content.innerText = feelings;
  date.innerText = nDate;
}

// To get weather data
const fetchWeatherData = async (URL, zip, APIKey) => {
  try {
    const request = await fetch(
      `${URL}?zip=${zip},in&units=metric&APPID=${APIKey}`,
    )
    const response = await request.json()
    const { main: {temp} } = response;
    return temp
  } catch (e) {}
}