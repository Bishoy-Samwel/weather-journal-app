/* Global Variables */
const baseURL = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';
const apiKey = '96d89e124ba2d4da7fcbc814e612e463';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Event Listener for element id generate
document.getElementById('generate').addEventListener('click', perform_generate_action)

//perform_generate_action
function perform_generate_action(){
  let zip_code = document.getElementById('zip').value
  let user_response = document.getElementById('feeling').value
  let date = newDate
  let temprature =  get_weather(baseURL,zip_code,apiKey)
  let data_object = {
    'temprature': temprature,
    'date' : date,
    'user_response': user_response
  }
  .then(function(data){
    post_data('/add',data_object)
  })
  .then(
    updateUI
  )
}


//async function 
const get_weather = async(url,zipcode,key)=>{
  const response = await fetch(url,apiKey)
  try{
    const weather_data = await response.json();
    console.log(weather_data);
    return weather_data
  }catch(error){
    console.log('error',error);
  }
}

const post_data = async(url, data={}) => {
  const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(data)
    })
  try{
    const data_object = await response.json()
  } catch (error){
    console.log("error", error)
  }
}

const updateUI = async () => {
  const request = await fetch('/get_data')
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData['date']
    document.getElementById('temp').innerHTML = allData['temprature']
    document.getElementById('content').innerHTML = allData['user_response']


  }catch{

  }
}