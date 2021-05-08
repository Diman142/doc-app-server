const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')

const PORT = process.env.PORT || 3001;

const db = mysql.createPool({
  host: 'us-cdbr-east-03.cleardb.com',
  user: 'b2c6a111986393',
  password: 'c8ed53dc',
  database: 'heroku_6b69735d4b86f1a',
});



app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.end('<h1>Hello Server</h1>');
});

app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM doctors';
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
});


app.get('/api/gettimes', (req, res) => {
  const sqlSelect = 'SELECT * FROM doctors';

  console.log(req.body)
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log('Server is Running')
})
