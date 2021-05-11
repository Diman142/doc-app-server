const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001;

const db = mysql.createPool({
  host: 'us-cdbr-east-03.cleardb.com',
  user: 'b2c6a111986393',
  password: 'c8ed53dc',
  database: 'heroku_6b69735d4b86f1a',
});

// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'Pr0gresstech00++',
//   database: 'doctors',
// });


function getDocId(doc) {
  if (doc === "Школвский Борис Елизарович") {
    return 1
  }
  else if (doc === "Воронова Тамара Ильевна") {
    return 2
  }
  else if (doc === "Барсова Лилия Олеговна") {
    return 3
  }
  else if (doc === "Крючков Валерий Филипович") {
    return 4
  }
}

function getDate(date) {
  return date.split(".").reverse().join("-")
}

function getTime(time) {
  let t = time.split(":")
  if (t[0].length === 1) {
    t[0] = `0${t[0]}`
  }

  return t.join(":") + ":00"
}





app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
      res.send(result)
    }
  });
});


app.get('/api/gettimes', (req, res) => {

  let date = req.query.date.split('.').reverse().join('-')
  let docName = req.query.doc.split(' ')[0]

  let sqlSelect = `SELECT RecTime FROM doctors.receptions WHERE RecDate = "${date}" AND DocId = (SELECT DocId FROM doctors.doctors WHERE name = "${docName}");`

  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result)
    }
  });
});


app.post('/api/insert', (req, res) => {

  const docId = getDocId(req.body.data.doctor)
  const date = getDate(req.body.data.date)
  const time = getTime(req.body.data.time)
  const recId = Date.now().toString().substr(-5)

  let sqlInsert = `INSERT INTO doctors.receptions (DocId, RecDate, RecTime, Complaints, Patient, RecId) VALUES ("${docId}", "${date}", "${time}", "${req.body.data.complaints}", "${req.body.data.patient}", "${recId}");`

  db.query(sqlInsert, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


app.get('/api/getdocs', (req, res) => {

  const sqlSelect = `SELECT * FROM doctors.doctors;`

  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result)
    }
  });
});


app.get('/api/getreceptions', (req, res) => {

  const date = req.query.date.split('.').reverse().join('-')
  const docName = req.query.doc.split(' ')[0]

  let sqlSelect = `SELECT RecTime, Complaints, Patient, RecId FROM doctors.receptions WHERE RecDate = "${date}" AND DocId = (SELECT DocId FROM doctors.doctors WHERE name = "${docName}");`

  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result)
    }
  });
});


app.get('/api/delete', (req, res) => {

  let sqldelete = `DELETE FROM doctors.receptions WHERE RecId="${req.query.id}";`

  console.log(sqldelete)

  db.query(sqldelete, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result)
    }
  });
})

app.listen(PORT, () => {
  console.log('Server is Running')
})
