const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started");
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.all("*", function (req, res, next) {
  var origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

var con = mysql.createConnection({
  host: "freedb.tech",
  user: "freedbtech_peproot",
  password: "pedped",
  database: "freedbtech_pepteachers",
});

con.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("connected to mysql");
});

app.post("/addNewTeacher", (req, res) => {
  const teacher = { tname: req.body.tname };
  let sql = "INSERT INTO teacher SET ?";
  let query = con.query(sql, teacher, (err, result) => {
    if (err) throw err;

    res.status(200).json({ result: "Teacher added successfully" });
  });
});

app.get("/getAllTeacher", (req, res) => {
  let sql = "SELECT * FROM teacher";
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ teachers: result });
  });
});

app.post("/addNewEvent", (req, res) => {
  const { tId, start, end, date, heading, info, link, month } = req.body;

  let sql1 = `SELECT * FROM event JOIN teacher ON event.tId = teacher.tId WHERE teacher.tId = ? AND event.start = ${start} AND event.end = ${end} AND event.date = ${date} AND event.month = "${month}"`;

  con.query(sql1, tId, (err, result) => {
    if (err) {
      console.log(err);
    }

    if (!result.length) {
      let event = {
        tId,
        start,
        end,
        date,
        einfo: info,
        elink: link,
        ehead: heading,
        month,
      };
      let sql = "INSERT INTO event SET ?";
      let query = con.query(sql, event, (err, result) => {
        if (err) {
          console.log(err);
        }
        res.send({ result: "Event added successfully" });
      });
    } else {
      res.send({
        err: `${result[0].tname} already has a meeting at this time. Choose different time please!`,
      });
    }
  });
});
app.get("/getAllEvent", (req, res) => {
  let sql =
    "SELECT teacher.tname,event.* FROM event JOIN teacher ON event.tId = teacher.tId";
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.post("/getEventat", (req, res) => {
  const { start, date } = req.body;

  let sql = `SELECT teacher.tname,event.ehead,event.einfo,event.elink FROM event JOIN teacher ON event.tId = teacher.tId WHERE event.start = ${start} AND event.date = ${date}`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
