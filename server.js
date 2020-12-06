// Setup empty JS object to act as endpoint for all routes
var projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')
const cors = require('cors');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
// Spin up the server
const server = app.listen(port, listening);
// Callback to debug
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
    };

//get function
app.get('/get_Data',get_projectData)
function get_projectData(request,response){
  response.send(projectData)
}

//post function
app.post('/add', addData)
function addData(request, response){
  response.send(projectData)
    // Add -temperature -date -user response to  projectData
    let temperature = request.body.temperature
    let date = request.body.date
    let user_response = request.bod.user_response

    projectData={
      "temperature":temperature,
      "user_response":user_response,
      "date":date
  }
  response.send(projectData)
}