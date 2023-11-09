const fs = require('fs');
const path = require('path');
const express = require("express");

const app = express();
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res) {
  res.sendFile(__dirname + '/admin.html');
});

app.get('/data', (req, res) => {
  // Read data from the JSON file
  const rawData = fs.readFileSync('data.json');
  const data = JSON.parse(rawData);
  res.json(data);
});

app.post('/update_data', (req, res) => {
  const status = req.body;

  // Read data from the JSON file
  const rawData = fs.readFileSync('data.json');
  const data = JSON.parse(rawData);

  // Write the updated data back to the JSON file
  fs.writeFileSync('data.json', JSON.stringify(status));

  res.send('Status updated successfully');
});



// app.listen(port, () => console.log(`Server is running on port ${port}!!`));

const PORT = 3000;
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`);
});
