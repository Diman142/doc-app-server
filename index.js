const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')


const db = mysql.createPool({
  host: 'us-cdbr-east-03.cleardb.com',
  user: 'b0e6e1e2011322',
  password: 'cdeace8d',
  database: 'heroku_67d187db369a4a4',
});

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.end('<h1>Hello Server</h1>');
});

app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM names';
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log('Server is Running')
})
