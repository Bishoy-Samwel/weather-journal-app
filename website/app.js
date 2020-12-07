/* Global Variables */
const apiKey = '96d89e124ba2d4da7fcbc814e612e463';
let zip_code = 0
let baseURL = `api.openweathermap.org/data/2.5/weather?zip=${zip_code}&appid=${apiKey}&units=metric`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

//Event Listener for element id generate
document.getElementById('generate').addEventListener('click', perform_generate_action)

//perform_generate_action
function perform_generate_action(){
  zip_code = document.getElementById('zip').value
  const user_response = document.getElementById('feelings').value
  baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zip_code}&appid=${apiKey}`;
  // console.log(baseURL)

  get_weather(baseURL)
  .then(function(weather_data){
    console.log(weather_data['main']['temp'])
    const data_object = {
      'temprature':weather_data['main']['temp'],
      'date' : newDate,
      'user_response': user_response
    }
    // console.log(weather_data)
    post_data('/add_data',data_object)
  })
  .then(
    updateUI
  )
}


//async function 
const get_weather = async(url)=>{
  const response = await fetch(url)
  try{
    const weather_data = await response.json();
    // console.log(weather_data);
    return weather_data
  }catch(error){
    console.log('error',error);
  }
}

const post_data = async(url='', data={}) => {
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
    document.getElementById('date').innerHTML = `Date: ${allData['date']}`
    document.getElementById('temp').innerHTML = `Teprature: ${allData['temprature']}`
    document.getElementById('content').innerHTML = `Mode: ${allData['user_response']}`


  }catch{
    alert('Please insert a zip code and your feeling!')
  }
} 